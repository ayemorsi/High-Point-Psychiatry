"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import {
  animate,
  AnimatePresence,
  motion,
  type MotionValue,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react"

import AddToBagButton from "@/components/elements/add-to-bag-button"
import PreloadImages from "@/components/elements/preload-images"
import Reveal from "@/components/elements/reveal"
import SectionHeading from "@/components/elements/section-heading"
import { useMediaQuery } from "@/hooks/use-media-query"
import { results, study } from "@/lib/results"
import type { Product } from "@/lib/types"
import { cn, EASE_SOFT } from "@/lib/utils"

const SIZES = "(min-width: 1024px) 66vw, 100vw"
const THUMB_SIZES = "96px"
const DESKTOP = "(min-width: 64rem)"
// In concerns: how long a name stays fully lit either side of its centre, then how long it fades.
const PLATEAU = 0.3
const FADE = 0.35

// One face, eight weeks apart, under a divider you drag yourself, beside the product that did the work.
export default function Compare({ products }: { products: Product[] }) {
  const [index, setIndex] = useState(0)
  const indexRef = useRef(0)
  const lockUntil = useRef(0)
  const [ariaValue, setAriaValue] = useState(results[0].divider)
  const [dragging, setDragging] = useState(false)
  const frame = useRef<HTMLDivElement>(null)
  const section = useRef<HTMLElement>(null)
  const inView = useInView(section, { once: true, margin: "-120px" })
  const reduceMotion = useReducedMotion()
  const isDesktop = useMediaQuery(DESKTOP)
  const scrubbed = isDesktop && !reduceMotion

  const raw = useMotionValue(results[0].divider)
  const smooth = useSpring(raw, { stiffness: 320, damping: 36, mass: 0.6 })
  const pos = reduceMotion ? raw : smooth

  const clip = useMotionTemplate`inset(0 0 0 ${pos}%)`
  const left = useMotionTemplate`${pos}%`
  // The labels get out of the way as the divider arrives on top of them.
  const beforeLabel = useTransform(pos, [12, 26], [0, 1])
  const afterLabel = useTransform(pos, [74, 88], [1, 0])

  // On desktop the section pins and each sixth of its scroll length is one concern.
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  })

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!isDesktop || performance.now() < lockUntil.current) return
    const next = Math.min(
      results.length - 1,
      Math.floor(progress * results.length)
    )
    if (next !== indexRef.current) select(next)
  })

  // Where the scroll is, in concerns (2.5 is the middle of the third one).
  const position = useTransform(
    scrollYProgress,
    (progress) => progress * results.length
  )

  const current = results[index]
  const product = products.find((item) => item.slug === current.slug)
  const thumbs = products
    .filter((item) => results.some((result) => result.slug === item.slug))
    .flatMap((item) => (item.image ? [item.image.src] : []))

  // One sweep on first view, so people learn the divider moves.
  useEffect(() => {
    if (!inView || reduceMotion) return
    const rest = raw.get()
    // Sweep towards the middle, so the far label never fades on a divider that rests near it.
    const peak = rest + (rest > 50 ? -13 : 13)
    const controls = animate(raw, [rest, peak, rest], {
      duration: 1.7,
      delay: 0.45,
      ease: EASE_SOFT,
      times: [0, 0.45, 1],
    })
    return () => controls.stop()
  }, [inView, reduceMotion, raw])

  function moveTo(clientX: number) {
    const rect = frame.current?.getBoundingClientRect()
    if (!rect || rect.width === 0) return
    const percent = ((clientX - rect.left) / rect.width) * 100
    raw.set(Math.min(98, Math.max(2, percent)))
  }

  function onPointerDown(event: React.PointerEvent) {
    event.currentTarget.setPointerCapture(event.pointerId)
    setDragging(true)
    moveTo(event.clientX)
  }

  function onPointerMove(event: React.PointerEvent) {
    if (!dragging) return
    moveTo(event.clientX)
  }

  function onPointerUp() {
    setDragging(false)
    setAriaValue(Math.round(raw.get()))
  }

  // Dragging is a pointer gesture, so the handle is a real slider for everyone else.
  function onKeyDown(event: React.KeyboardEvent) {
    const step = event.shiftKey ? 10 : 4
    const next = {
      ArrowLeft: raw.get() - step,
      ArrowRight: raw.get() + step,
      Home: 2,
      End: 98,
    }[event.key]
    if (next === undefined) return
    event.preventDefault()
    const clamped = Math.min(98, Math.max(2, next))
    raw.set(clamped)
    setAriaValue(Math.round(clamped))
  }

  function select(next: number) {
    indexRef.current = next
    setIndex(next)
    const rest = results[next].divider
    animate(raw, rest, { duration: reduceMotion ? 0 : 0.5, ease: EASE_SOFT })
    setAriaValue(rest)
  }

  // A click scrolls to that concern's stretch, so scroll position and selection never disagree.
  function choose(next: number, button: HTMLButtonElement) {
    select(next)
    const element = section.current
    if (!isDesktop || !element) {
      button.scrollIntoView({ inline: "center", block: "nearest" })
      return
    }
    const rect = element.getBoundingClientRect()
    const span = element.offsetHeight - window.innerHeight
    const top =
      window.scrollY + rect.top + ((next + 0.5) / results.length) * span
    // While pinned, jump straight there so the names skip the ones in between.
    if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
      window.scrollTo({ top, behavior: "instant" })
      return
    }
    lockUntil.current = performance.now() + 1000
    window.scrollTo({ top })
  }

  return (
    <section ref={section} className="p-2 md:p-3 lg:h-[400svh]">
      <div className="rounded-3xl bg-card lg:sticky lg:top-3 lg:flex lg:h-[calc(100svh-1.5rem)] lg:flex-col lg:justify-center">
        <div className="section-padding bigger-container w-full lg:py-8!">
          <Reveal>
            <SectionHeading title="Eight weeks on the four steps" />
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-8 md:mt-14 lg:mt-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <Reveal>
              <div
                ref={frame}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                className="media aspect-4/3 w-full cursor-ew-resize touch-none select-none md:aspect-16/10 lg:max-h-[calc(100svh-19rem)]"
              >
                {/* Every pair stays mounted so its photos have loaded before scrolling reaches it. */}
                {results.map((item, itemIndex) => (
                  <motion.div
                    key={item.concern}
                    aria-hidden={itemIndex !== index}
                    initial={false}
                    animate={{ opacity: itemIndex === index ? 1 : 0 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.4,
                      ease: EASE_SOFT,
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={item.before.src}
                      alt={itemIndex === index ? item.before.alt : ""}
                      fill
                      sizes={SIZES}
                      draggable={false}
                      className="object-cover object-[50%_30%]"
                    />
                    <motion.div
                      style={{ clipPath: clip }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={item.after.src}
                        alt=""
                        fill
                        sizes={SIZES}
                        draggable={false}
                        className="object-cover object-[50%_30%]"
                      />
                    </motion.div>
                  </motion.div>
                ))}

                <motion.div
                  aria-hidden="true"
                  style={{ left }}
                  className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-background"
                />

                <motion.button
                  type="button"
                  role="slider"
                  aria-label={`Reveal week 8 for ${current.concern.toLowerCase()}`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={ariaValue}
                  aria-valuetext={`${100 - ariaValue}% of the week 8 photo shown`}
                  onKeyDown={onKeyDown}
                  style={{ left }}
                  animate={{ scale: dragging ? 1.12 : 1 }}
                  transition={{ type: "spring", stiffness: 420, damping: 28 }}
                  className="group absolute top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background md:size-12"
                >
                  <ChevronLeftIcon
                    className="size-4 transition-transform duration-200 ease-soft group-hover:-translate-x-0.5"
                    strokeWidth={1.75}
                  />
                  <ChevronRightIcon
                    className="size-4 transition-transform duration-200 ease-soft group-hover:translate-x-0.5"
                    strokeWidth={1.75}
                  />
                </motion.button>

                <motion.span
                  aria-hidden="true"
                  style={{ opacity: beforeLabel }}
                  className="figures absolute start-3 bottom-3 rounded-full bg-background px-3 py-1.5 text-xs font-medium md:start-5 md:bottom-5 md:text-sm"
                >
                  Week 0
                </motion.span>
                <motion.span
                  aria-hidden="true"
                  style={{ opacity: afterLabel }}
                  className="figures absolute end-3 bottom-3 rounded-full bg-background px-3 py-1.5 text-xs font-medium md:end-5 md:bottom-5 md:text-sm"
                >
                  Week 8
                </motion.span>

                <span className="sr-only">
                  {current.concern} at week 0 and after eight weeks of the four
                  steps.
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.06} className="flex flex-col gap-8">
              <ul className="-mx-4 no-scrollbar flex gap-6 overflow-x-auto px-4 md:mx-0 md:px-0 lg:flex-1 lg:flex-col lg:items-center lg:justify-center lg:gap-1 lg:overflow-visible">
                {results.map((item, itemIndex) => (
                  <li key={item.concern} className="shrink-0">
                    <ConcernName
                      label={item.concern}
                      index={itemIndex}
                      position={position}
                      active={itemIndex === index}
                      scrubbed={scrubbed}
                      onSelect={(button) => choose(itemIndex, button)}
                    />
                  </li>
                ))}
              </ul>

              {product && (
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={product.slug}
                    initial={{ opacity: 0, transform: "translateY(8px)" }}
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    exit={{ opacity: 0, transform: "translateY(-8px)" }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.24,
                      ease: EASE_SOFT,
                    }}
                    className="flex gap-4 rounded-2xl bg-background p-3"
                  >
                    <Link
                      href={`/products/${product.slug}`}
                      tabIndex={-1}
                      aria-hidden="true"
                      className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-card lg:size-16 xl:size-24"
                    >
                      {product.image && (
                        <Image
                          src={product.image.src}
                          alt=""
                          fill
                          sizes={THUMB_SIZES}
                          className="object-cover"
                        />
                      )}
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col items-start py-1">
                      <h3 className="sans-heading line-clamp-2 text-base">
                        <Link
                          href={`/products/${product.slug}`}
                          className="outline-none hover:underline hover:underline-offset-4 focus-visible:underline"
                        >
                          {product.name}
                        </Link>
                      </h3>
                      {/* No price line: the Add button already carries it. */}
                      <p className="w-full truncate text-sm text-muted-foreground">
                        {product.descriptor}
                      </p>
                      <AddToBagButton
                        product={product}
                        size="sm"
                        label="Add"
                        className="mt-auto"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
              <PreloadImages srcs={thumbs} sizes={THUMB_SIZES} />
            </Reveal>
          </div>

          <p className="mt-8 text-xs text-muted-foreground md:mt-10 lg:mt-6">
            {study.note}
          </p>
        </div>
      </div>
    </section>
  )
}

type ConcernNameProps = {
  label: string
  index: number
  position: MotionValue<number>
  active: boolean
  scrubbed: boolean
  onSelect: (button: HTMLButtonElement) => void
}

// A scrubbed word reveal: the current name sharpens, stands up and grows; the rest sit small and tilted.
function ConcernName({
  label,
  index,
  position,
  active,
  scrubbed,
  onSelect,
}: ConcernNameProps) {
  // Overdamped per-name spring, so a click moves only the two names involved and never overshoots.
  const lit = useSpring(
    useTransform(position, (value) => litAt(value, index)),
    { stiffness: 260, damping: 32, mass: 0.6 }
  )
  const opacity = useTransform(lit, [0, 1], [0.3, 1])
  const scale = useTransform(lit, [0, 1], [0.6, 1])
  const tilt = useTransform(lit, [0, 1], [32, 0])
  const blur = useTransform(lit, (value) =>
    Math.max(0, 5 * (1 - Math.abs(2 * value - 1)))
  )
  const transform = useMotionTemplate`perspective(40rem) rotateX(${tilt}deg) scale(${scale})`
  const filter = useMotionTemplate`blur(${blur}px)`

  return (
    <motion.button
      type="button"
      aria-pressed={active}
      onClick={(event) => onSelect(event.currentTarget)}
      style={scrubbed ? { opacity, transform, filter } : undefined}
      className={cn(
        "display-type rounded-lg text-2xl whitespace-nowrap outline-none focus-visible:ring-3 focus-visible:ring-ring/50 lg:text-3xl xl:text-4xl",
        scrubbed
          ? "text-foreground will-change-transform"
          : [
              "transition-[color,scale] duration-300 ease-soft",
              active
                ? "text-foreground"
                : "text-muted-foreground/60 hover:text-muted-foreground lg:scale-60",
            ]
      )}
    >
      {label}
    </motion.button>
  )
}

function litAt(position: number, index: number) {
  const center = index + 0.5
  const pastEdge =
    (index === 0 && position < center) ||
    (index === results.length - 1 && position > center)
  const distance = pastEdge ? 0 : Math.abs(position - center)
  const t = Math.min(1, Math.max(0, (distance - PLATEAU) / FADE))
  return 1 - t * t * (3 - 2 * t)
}
