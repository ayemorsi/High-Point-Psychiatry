"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import {
  animate,
  type AnimationPlaybackControls,
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
} from "motion/react"

import Reveal from "@/components/elements/reveal"
import { type Finder, fits } from "@/components/sections/routine/shared"
import { cn, EASE_SOFT, formatPrice } from "@/lib/utils"

const FRICTION = 3.2
// Degrees the ring turns over one pass of the page, for readers who never drag it. Answering stops it, so the routine stays in front.
const SCROLL_TURN = -150

// The whole range on a ring. Scroll turns it, a drag throws it, and each answer gathers what still fits at the front.
export default function Turntable({
  finder,
  className,
}: {
  finder: Finder
  className?: string
}) {
  const reduceMotion = useReducedMotion()
  const stage = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: stage,
    offset: ["start end", "end start"],
  })
  const rotation = useMotionValue(0)
  const velocity = useRef(0)
  const lastProgress = useRef<number | null>(null)
  const turning = useRef<AnimationPlaybackControls | null>(null)
  const drag = useRef<{
    id: number
    x: number
    time: number
    moved: number
  } | null>(null)
  const transform = useMotionTemplate`translateZ(calc(var(--ring-radius) * -1)) rotateY(${rotation}deg)`

  const range = finder.products.filter((product) => product.image)
  const stepAngle = 360 / range.length
  const fit = fits(finder)
  const picks = finder.done ? finder.result?.picks : undefined
  const answered = finder.answers.skin !== undefined
  const kept = range.filter(fit)
  // Once answering starts, what still fits slides round to sit together, ahead of what doesn't.
  const order = answered
    ? [...kept, ...range.filter((product) => !fit(product))]
    : range
  const group = answered ? kept.map((product) => product.slug).join() : ""

  useEffect(() => {
    if (!group) return
    const middle = ((group.split(",").length - 1) / 2) * stepAngle
    const current = rotation.get()
    const offset = ((((-middle - current) % 360) + 540) % 360) - 180
    velocity.current = 0
    turning.current?.stop()
    turning.current = animate(rotation, current + offset, {
      duration: reduceMotion ? 0 : 1.4,
      ease: EASE_SOFT,
    })
    return () => turning.current?.stop()
  }, [group, reduceMotion, rotation, stepAngle])

  useAnimationFrame((_, delta) => {
    const current = scrollYProgress.get()
    const scrolled =
      lastProgress.current === null ? 0 : current - lastProgress.current
    lastProgress.current = current

    if (drag.current || turning.current?.state === "running") return

    const seconds = Math.min(delta, 48) / 1000
    velocity.current *= Math.exp(-FRICTION * seconds)
    if (Math.abs(velocity.current) < 0.02) velocity.current = 0

    const turn =
      velocity.current * seconds +
      (reduceMotion || answered ? 0 : scrolled * SCROLL_TURN)
    if (turn !== 0) rotation.set(rotation.get() + turn)
  })

  function onPointerDown(event: React.PointerEvent) {
    if (drag.current) return
    turning.current?.stop()
    drag.current = {
      id: event.pointerId,
      x: event.clientX,
      time: event.timeStamp,
      moved: 0,
    }
    velocity.current = 0
  }

  function onPointerMove(event: React.PointerEvent) {
    const current = drag.current
    if (!current || current.id !== event.pointerId) return
    const deltaX = event.clientX - current.x
    const deltaTime = Math.max(event.timeStamp - current.time, 1)
    current.moved += Math.abs(deltaX)
    if (current.moved > 6)
      event.currentTarget.setPointerCapture(event.pointerId)
    rotation.set(rotation.get() + deltaX * 0.18)
    velocity.current = (deltaX * 0.18 * 1000) / deltaTime
    current.x = event.clientX
    current.time = event.timeStamp
  }

  function onPointerUp(event: React.PointerEvent) {
    if (drag.current?.id === event.pointerId) {
      window.setTimeout(() => (drag.current = null), 0)
    }
  }

  // Cards on the far side are still tabbable, so keyboard focus turns the ring to bring them round.
  function bringToFront(event: React.FocusEvent<HTMLElement>, angle: number) {
    if (!event.currentTarget.matches(":focus-visible")) return
    const current = rotation.get()
    const offset = ((((-angle - current) % 360) + 540) % 360) - 180
    if (Math.abs(offset) < 1) return
    velocity.current = 0
    turning.current?.stop()
    turning.current = animate(rotation, current + offset, {
      duration: reduceMotion ? 0 : 0.6,
      ease: EASE_SOFT,
    })
  }

  // A drag that ends on a card would otherwise follow its link.
  function onClickCapture(event: React.MouseEvent) {
    if (drag.current && drag.current.moved > 6) event.preventDefault()
  }

  return (
    <Reveal delay={0.06} className={className}>
      <div
        ref={stage}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={onClickCapture}
        className="relative h-[clamp(17rem,42svh,30rem)] cursor-grab touch-pan-y mask-x-from-72% [--ring-card:11rem] [--ring-radius:calc(var(--ring-card)*3.05)] perspective-[1600px] active:cursor-grabbing md:[--ring-card:13rem] xl:[--ring-card:15rem]"
      >
        <motion.ul
          style={{ transform }}
          className="absolute top-0 left-1/2 h-full w-(--ring-card) -translate-x-1/2 will-change-transform select-none transform-3d"
        >
          {range.map((product, index) => {
            const on = fit(product)
            const pick = picks?.find(
              (item) => item.product.slug === product.slug
            )
            // Kept within half a turn of its home seat, so every move takes the short way round.
            const home = index * stepAngle
            const seat = order.indexOf(product) * stepAngle
            const angle = seat + Math.round((home - seat) / 360) * 360

            return (
              <li
                key={product.slug}
                style={{
                  transform: `rotateY(${angle}deg) translateZ(var(--ring-radius))`,
                }}
                className={cn(
                  "absolute inset-0 transition-[opacity,filter,transform] duration-1000 ease-soft backface-hidden motion-reduce:transition-none",
                  !on && "opacity-25 grayscale"
                )}
              >
                <Link
                  href={`/products/${product.slug}`}
                  draggable={false}
                  tabIndex={on ? undefined : -1}
                  onFocus={(event) => bringToFront(event, angle)}
                  className="group flex size-full flex-col outline-none"
                >
                  <div className="media flex-1 group-focus-visible:ring-3 group-focus-visible:ring-ring">
                    {product.image && (
                      <Image
                        src={product.image.src}
                        alt={product.image.alt}
                        fill
                        draggable={false}
                        sizes="(min-width: 1280px) 15rem, (min-width: 768px) 13rem, 11rem"
                        className="object-cover transition-transform duration-700 ease-soft group-hover:scale-105 group-focus-visible:scale-105"
                      />
                    )}
                    {pick && (
                      <span className="photo-tag swap figures start-3 top-3">
                        {pick.step.number} {pick.step.name}
                      </span>
                    )}
                    <span
                      aria-hidden="true"
                      className="absolute end-2 top-2 grid size-8 scale-90 place-items-center rounded-full bg-background opacity-0 transition-[opacity,scale] duration-200 ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
                    >
                      <ArrowRightIcon className="size-4" />
                    </span>
                  </div>
                  <span className="mt-3 flex items-baseline gap-2.5 text-xs md:text-sm">
                    <span className="min-w-0 truncate font-medium">
                      {product.name}
                    </span>
                    <span className="figures shrink-0 text-muted-foreground">
                      {product.soldOut
                        ? "Sold out"
                        : formatPrice(product.price)}
                    </span>
                  </span>
                </Link>
              </li>
            )
          })}
        </motion.ul>
      </div>
    </Reveal>
  )
}
