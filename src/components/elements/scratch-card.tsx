"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { cn, EASE_SOFT } from "@/lib/utils"

const PROGRESS_SAMPLE_STRIDE = 32
const PROGRESS_CHECK_EVERY_N_MOVES = 10
const MAX_PARTICLES = 120
const PARTICLE_GRAVITY = 0.18

type DustParticle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  life: number
  maxLife: number
}

type ScratchCardProps = {
  children: React.ReactNode
  /** Fires once, when the cleared area passes `revealThreshold`. */
  onReveal?: () => void
  /** Cleared ratio, 0 to 1, that triggers the reveal. */
  revealThreshold?: number
  /** Brush diameter in pixels. */
  brushSize?: number
  label?: string
  ariaLabel?: string
  revealAnnouncement?: string
  className?: string
}

// Canvas accepts the oklch tokens directly, so the foil stays on-palette in both themes.
function readToken(element: Element, name: string, fallback: string) {
  const value = getComputedStyle(element).getPropertyValue(name).trim()
  return value || fallback
}

export default function ScratchCard({
  children,
  onReveal,
  revealThreshold = 0.45,
  brushSize = 34,
  label = "Scratch to reveal your code",
  ariaLabel = "Scratch to reveal your code. Press Enter to reveal it without scratching.",
  revealAnnouncement = "Your code is revealed.",
  className,
}: ScratchCardProps) {
  const reduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const scratchCanvasRef = useRef<HTMLCanvasElement>(null)
  const particleCanvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<DustParticle[]>([])
  const particleRafRef = useRef(0)
  const lastPointRef = useRef<{ x: number; y: number } | null>(null)
  const isScratchingRef = useRef(false)
  const moveCountRef = useRef(0)
  const revealedRef = useRef(false)
  const [isRevealed, setIsRevealed] = useState(false)

  // The form underneath must not be tabbable or announced while the foil covers it.
  useEffect(() => {
    const node = contentRef.current
    if (!node) return
    if (isRevealed) node.removeAttribute("inert")
    else node.setAttribute("inert", "")
  }, [isRevealed])

  const paintOverlay = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number) => {
      const ctx = canvas.getContext("2d")
      const container = containerRef.current
      if (!ctx || !container) return

      const dpr = window.devicePixelRatio || 1
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      ctx.scale(dpr, dpr)

      const ink = readToken(container, "--foreground", "#151210")
      const ivory = readToken(container, "--background", "#faf9f3")

      ctx.fillStyle = ink
      ctx.fillRect(0, 0, width, height)

      // A faint brushed grain, so the foil reads as foil rather than a flat panel.
      ctx.strokeStyle = "rgba(255, 255, 255, 0.045)"
      ctx.lineWidth = 1
      for (let x = -height; x < width; x += 8) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x + height, height)
        ctx.stroke()
      }

      if (label) {
        const family = getComputedStyle(container).fontFamily
        ctx.fillStyle = ivory
        ctx.globalAlpha = 0.6
        ctx.font = `500 14px ${family}`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(label, width / 2, height / 2)
        ctx.globalAlpha = 1
      }
    },
    [label]
  )

  useEffect(() => {
    const container = containerRef.current
    const scratchCanvas = scratchCanvasRef.current
    const particleCanvas = particleCanvasRef.current
    if (!container || !scratchCanvas || !particleCanvas) return

    let lastWidth = 0
    let lastHeight = 0

    const resize = () => {
      const { width, height } = container.getBoundingClientRect()
      if (width === lastWidth && height === lastHeight) return
      lastWidth = width
      lastHeight = height
      // Repainting after the reveal would put the foil back.
      if (revealedRef.current) return
      const dpr = window.devicePixelRatio || 1
      paintOverlay(scratchCanvas, width, height)
      particleCanvas.width = Math.max(1, Math.round(width * dpr))
      particleCanvas.height = Math.max(1, Math.round(height * dpr))
      particleCanvas.getContext("2d")?.scale(dpr, dpr)
    }

    const observer = new ResizeObserver(resize)
    observer.observe(container)
    resize()

    return () => observer.disconnect()
  }, [paintOverlay])

  useEffect(() => () => cancelAnimationFrame(particleRafRef.current), [])

  const reveal = useCallback(() => {
    if (revealedRef.current) return
    revealedRef.current = true
    setIsRevealed(true)
    onReveal?.()
  }, [onReveal])

  const checkProgress = useCallback(() => {
    const canvas = scratchCanvasRef.current
    if (!canvas || revealedRef.current) return
    const ctx = canvas.getContext("2d")
    if (!ctx || canvas.width === 0 || canvas.height === 0) return

    // Every 32nd pixel's alpha is enough to know roughly how much foil is left.
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let cleared = 0
    let sampled = 0
    for (let i = 3; i < data.length; i += 4 * PROGRESS_SAMPLE_STRIDE) {
      if (data[i] < 128) cleared++
      sampled++
    }
    if (sampled === 0) return
    if (cleared / sampled >= revealThreshold) reveal()
  }, [revealThreshold, reveal])

  const runParticleLoop = useCallback(() => {
    const canvas = particleCanvasRef.current
    const ctx = canvas?.getContext("2d")
    const container = containerRef.current
    if (!canvas || !ctx || !container) return

    cancelAnimationFrame(particleRafRef.current)
    const color = readToken(container, "--foreground", "#151210")

    const tick = () => {
      const { width, height } = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, width, height)

      const alive: DustParticle[] = []
      for (const particle of particlesRef.current) {
        particle.vy += PARTICLE_GRAVITY
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life -= 1
        if (particle.life <= 0) continue
        ctx.globalAlpha = particle.life / particle.maxLife
        ctx.fillStyle = color
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size)
        alive.push(particle)
      }
      ctx.globalAlpha = 1
      particlesRef.current = alive

      if (alive.length > 0) {
        particleRafRef.current = requestAnimationFrame(tick)
      } else {
        ctx.clearRect(0, 0, width, height)
      }
    }

    particleRafRef.current = requestAnimationFrame(tick)
  }, [])

  const spawnParticles = useCallback(
    (x: number, y: number) => {
      if (reduceMotion) return
      if (particlesRef.current.length >= MAX_PARTICLES) return
      for (let i = 0; i < 2; i++) {
        const maxLife = 24 + Math.random() * 20
        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * brushSize * 0.6,
          y: y + (Math.random() - 0.5) * brushSize * 0.6,
          vx: (Math.random() - 0.5) * 1.6,
          vy: -Math.random() * 1.4,
          size: 1.5 + Math.random() * 2,
          life: maxLife,
          maxLife,
        })
      }
      runParticleLoop()
    },
    [reduceMotion, brushSize, runParticleLoop]
  )

  const getPoint = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      const rect = event.currentTarget.getBoundingClientRect()
      return { x: event.clientX - rect.left, y: event.clientY - rect.top }
    },
    []
  )

  const scratchLine = useCallback(
    (from: { x: number; y: number }, to: { x: number; y: number }) => {
      const ctx = scratchCanvasRef.current?.getContext("2d")
      if (!ctx) return
      ctx.globalCompositeOperation = "destination-out"
      ctx.lineWidth = brushSize
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.beginPath()
      ctx.moveTo(from.x, from.y)
      ctx.lineTo(to.x, to.y)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(to.x, to.y, brushSize / 2, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalCompositeOperation = "source-over"
    },
    [brushSize]
  )

  function onPointerDown(event: React.PointerEvent<HTMLCanvasElement>) {
    event.currentTarget.setPointerCapture(event.pointerId)
    isScratchingRef.current = true
    const point = getPoint(event)
    scratchLine(point, point)
    spawnParticles(point.x, point.y)
    lastPointRef.current = point
  }

  function onPointerMove(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!isScratchingRef.current) return
    const point = getPoint(event)
    scratchLine(lastPointRef.current ?? point, point)
    lastPointRef.current = point

    moveCountRef.current += 1
    if (moveCountRef.current % 2 === 0) spawnParticles(point.x, point.y)
    if (moveCountRef.current % PROGRESS_CHECK_EVERY_N_MOVES === 0)
      checkProgress()
  }

  function onPointerUp() {
    isScratchingRef.current = false
    lastPointRef.current = null
    checkProgress()
  }

  // Scratching is a pointer gesture, so the keyboard gets a plain way through.
  function onKeyDown(event: React.KeyboardEvent<HTMLCanvasElement>) {
    if (event.key !== "Enter" && event.key !== " ") return
    event.preventDefault()
    reveal()
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden rounded-2xl select-none",
        className
      )}
    >
      <div ref={contentRef}>{children}</div>

      <AnimatePresence>
        {!isRevealed && (
          <motion.div
            key="foil"
            className="absolute inset-0 z-10"
            initial={false}
            exit={{ opacity: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.4,
              ease: EASE_SOFT,
            }}
          >
            <canvas
              ref={scratchCanvasRef}
              role="button"
              tabIndex={0}
              aria-label={ariaLabel}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onKeyDown={onKeyDown}
              className="block size-full cursor-crosshair touch-none rounded-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset"
            />
            <canvas
              ref={particleCanvasRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 size-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <span className="sr-only" aria-live="polite">
        {isRevealed ? revealAnnouncement : ""}
      </span>
    </div>
  )
}
