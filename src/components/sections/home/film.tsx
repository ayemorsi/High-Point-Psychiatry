"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import Link from "next/link"
import { PauseIcon, PlayIcon } from "lucide-react"
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react"

import { Button } from "@/components/ui/button"
import { useFilmPlayback } from "@/hooks/use-film-playback"
import {
  align,
  area,
  centroid,
  rectRing,
  resample,
  traceRings,
} from "@/lib/outline"
import { site } from "@/lib/site"
import { routineSteps } from "@/lib/steps"
import type { Ring } from "@/lib/types"
import { EASE_SOFT, spell } from "@/lib/utils"

const film = {
  src: "/videos/home/serum-drop.mp4",
  poster: "/images/home/serum-drop-poster.jpg",
  label: "A dropper releasing a bead of serum onto an open palm",
}

const WORD = "Layers."
const CHARS = [...WORD]
const SAMPLE = 0.5
const OUTER = 96
const HOLE = 32
const SQUARE = [0, 0.6] as const
const STAGGER = 0.04
const ARRIVE = 0.62

// The copy runs on its own clock once the letters land: scrubbed half way it reads as a broken fade.
const arrival = {
  hidden: { opacity: 0 },
  shown: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: EASE_SOFT,
      delayChildren: 0.05,
      staggerChildren: 0.06,
    },
  },
}

const line = {
  hidden: { opacity: 0, filter: "blur(4px)", transform: "translateY(16px)" },
  shown: { opacity: 1, filter: "blur(0px)", transform: "translateY(0px)" },
}

const enter = { duration: 0.6, ease: EASE_SOFT }

const clamp = (value: number) => Math.min(1, Math.max(0, value))
// Ease out, not in-out: a slow start reads as a dead zone at the top of the pin.
const ease = (t: number) => 1 - (1 - t) ** 3

type Morph = { from: Ring; to: Ring }

export default function Film() {
  const band = useRef<HTMLElement>(null)
  const word = useRef<SVGTextElement>(null)
  const letters = useRef<(SVGPathElement | null)[]>([])
  const morphs = useRef<Morph[][]>([])
  const maskId = useId()

  const [arrived, setArrived] = useState(false)
  const { playing, toggle, videoProps } = useFilmPlayback()
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: band,
    offset: ["start start", "end end"],
  })

  // Written by hand: Motion can't drive `d`, and inside a sticky pin its scroll range isn't this section's.
  const paint = useCallback(
    (progress: number) => {
      if (!morphs.current.length) return
      morphs.current.forEach((rings, index) => {
        const path = letters.current[index]
        if (!path) return
        const t = reduceMotion
          ? 1
          : ease(
              clamp(
                ((progress - SQUARE[0]) / (SQUARE[1] - SQUARE[0])) *
                  (1 + STAGGER * CHARS.length) -
                  index * STAGGER
              )
            )
        let d = ""
        for (const { from, to } of rings) {
          for (let i = 0; i < from.length; i++) {
            const x = from[i].x + (to[i].x - from[i].x) * t
            const y = from[i].y + (to[i].y - from[i].y) * t
            d += `${i ? "L" : "M"}${Math.round(x * 10) / 10} ${Math.round(y * 10) / 10}`
          }
          d += "Z"
        }
        path.setAttribute("d", d)
      })
    },
    [reduceMotion]
  )

  useEffect(() => {
    const text = word.current
    const svg = text?.ownerSVGElement
    if (!text || !svg) return

    // Trace the word as rendered, so the outlines match this font at this size.
    const build = () => {
      const box = svg.getBoundingClientRect()
      const width = Math.round(box.width * SAMPLE)
      const height = Math.round(box.height * SAMPLE)
      if (width < 8 || height < 8) return

      const canvas = document.createElement("canvas")
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext("2d", { willReadFrequently: true })
      if (!ctx) return

      const style = getComputedStyle(text)
      ctx.font = `${style.fontWeight} ${parseFloat(style.fontSize) * SAMPLE}px ${style.fontFamily}`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillStyle = "#000"
      ctx.fillText(WORD, width / 2, height / 2)

      const rings = traceRings(
        ctx.getImageData(0, 0, width, height).data,
        width,
        height
      ).map((ring) => ring.map((p) => ({ x: p.x / SAMPLE, y: p.y / SAMPLE })))
      if (!rings.length) return

      const column = box.width / CHARS.length
      morphs.current = CHARS.map((_, index) => {
        let bounds: { x: number; width: number }
        try {
          const extent = text.getExtentOfChar(index)
          bounds = { x: extent.x, width: extent.width }
        } catch {
          bounds = { x: index * column, width: column }
        }
        const mine = rings.filter((ring) => {
          const middle = centroid(ring).x
          return middle >= bounds.x && middle < bounds.x + bounds.width
        })
        if (!mine.length) return []

        // The biggest ring is the letter; any other is a counter, which collapses onto itself.
        const sorted = [...mine].sort(
          (a, b) => Math.abs(area(b)) - Math.abs(area(a))
        )
        const target = rectRing(index * column, 0, column, box.height, OUTER)
        return sorted.map((ring, depth) => {
          if (depth > 0) {
            const from = resample(ring, HOLE)
            const middle = centroid(from)
            return { from, to: from.map(() => middle) }
          }
          const from = resample(ring, OUTER)
          const wind = area(from) < 0 ? [...target].reverse() : target
          return { from, to: align(from, wind) }
        })
      })
      paint(scrollYProgress.get())
    }

    let live = true
    let frame = 0
    let width = 0
    document.fonts.ready.then(() => live && build())
    // Tracing reads back a canvas, so it runs at most once a frame and only when the width really changed.
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width === width) return
      width = entry.contentRect.width
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(build)
    })
    observer.observe(svg)
    return () => {
      live = false
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [paint, scrollYProgress])

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    paint(value)
    // React bails when the flag is unchanged, so this is not a per-frame render.
    setArrived(value > ARRIVE)
  })

  // Clears the hairlines left between the columns once the letters have opened.
  const plate = useTransform(scrollYProgress, [0.58, 0.66], [1, 0])
  const plateFade = useMotionTemplate`${plate}`
  const zoom = useTransform(scrollYProgress, [0, 0.8], [1.12, 1])
  const settle = useMotionTemplate`scale(${zoom})`

  return (
    <section ref={band} className="relative h-[170svh] motion-reduce:h-svh">
      <div className="sticky top-0 h-svh p-2 md:p-3">
        <div className="relative h-full overflow-hidden rounded-3xl bg-background">
          <h2 className="sr-only">{site.tagline}</h2>

          <motion.div
            style={{ transform: settle }}
            className="absolute inset-0 motion-reduce:transform-none!"
          >
            <FilmVideo
              {...videoProps}
              className="size-full object-cover object-center"
            />
          </motion.div>

          {/* Ivory plate with the word cut out; each letter deforms into its own column of the frame. */}
          <motion.div
            style={{ opacity: plateFade }}
            aria-hidden="true"
            className="absolute inset-0 motion-reduce:opacity-0!"
          >
            <svg className="size-full">
              <defs>
                <mask id={maskId}>
                  {/* Mask luminance: white keeps the plate, black punches through. */}
                  <rect width="100%" height="100%" fill="white" />
                  <text
                    ref={word}
                    x="50%"
                    y="50%"
                    fill="none"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="display-type"
                    style={{ fontSize: "clamp(4rem, 19vw, 17rem)" }}
                  >
                    {WORD}
                  </text>
                  {CHARS.map((char, index) => (
                    <path
                      key={`${char}-${index}`}
                      ref={(node) => {
                        letters.current[index] = node
                      }}
                      fill="black"
                      fillRule="evenodd"
                    />
                  ))}
                </mask>
              </defs>
              <rect
                width="100%"
                height="100%"
                mask={`url(#${maskId})`}
                className="fill-background"
              />
            </svg>
          </motion.div>

          {/* An ivory scrim so ink copy reads over whatever frame is playing. */}
          <motion.div
            inert={arrived || reduceMotion ? undefined : true}
            initial="hidden"
            animate={arrived || reduceMotion ? "shown" : "hidden"}
            variants={arrival}
            className="absolute inset-x-0 bottom-0 flex flex-col items-start bg-linear-to-t from-background via-background/75 to-transparent p-6 pt-28 md:p-10 md:pt-36 lg:p-14 lg:pt-44"
          >
            <motion.p
              variants={line}
              transition={enter}
              aria-hidden="true"
              className="display-type max-w-lg text-4xl leading-tight md:text-5xl lg:text-6xl"
            >
              {site.tagline}
            </motion.p>
            <motion.p
              variants={line}
              transition={enter}
              className="mt-4 max-w-md text-lg text-balance text-muted-foreground"
            >
              Cleanse, treat, moisturize, protect. In that order.
            </motion.p>
            <motion.div variants={line} transition={enter} className="mt-8">
              <Button asChild variant="secondary">
                <Link href="/shop">Shop the {spell(routineSteps.length)} steps</Link>
              </Button>
            </motion.div>
          </motion.div>

          <FilmControl
            playing={playing}
            onToggle={toggle}
            className="absolute end-6 bottom-6 md:end-10 md:bottom-10 lg:end-14 lg:bottom-14"
          />
        </div>
      </div>
    </section>
  )
}

type FilmVideoProps = {
  ref: React.Ref<HTMLVideoElement>
  onPlay: () => void
  onPause: () => void
  className?: string
}

function FilmVideo({ className, ...props }: FilmVideoProps) {
  return (
    <video
      {...props}
      src={film.src}
      poster={film.poster}
      loop
      muted
      playsInline
      preload="none"
      aria-label={film.label}
      className={className}
    />
  )
}

type FilmControlProps = {
  playing: boolean
  onToggle: () => void
  className?: string
}

function FilmControl({ playing, onToggle, className }: FilmControlProps) {
  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={onToggle}
      aria-label={playing ? "Pause the video" : "Play the video"}
      className={className}
    >
      {playing ? <PauseIcon /> : <PlayIcon />}
    </Button>
  )
}
