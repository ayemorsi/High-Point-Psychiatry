"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion, useInView } from "motion/react"

import AutoplayToggle from "@/components/elements/autoplay-toggle"
import { appointmentHref } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { type HeroStep, heroSteps as cards } from "@/lib/hero-steps"
import { site } from "@/lib/site"
import type { SiteImage } from "@/lib/types"
import { cn, EASE_SOFT } from "@/lib/utils"

// Pearls ride the .arc-field rings (centres at --arc-x, 56% down, band 31vw out): steps 01–02 on the left, 03–04 on the right.
const rings = [
  {
    pivot: "left-(--arc-x)",
    arm: "left-[31vw]",
    theta: "-38deg",
    from: "46deg",
    delay: "delay-300",
  },
  {
    pivot: "left-(--arc-x)",
    arm: "left-[31vw]",
    theta: "4deg",
    from: "46deg",
    delay: "delay-420",
  },
  {
    pivot: "left-[calc(100%-var(--arc-x))]",
    arm: "left-[-31vw]",
    theta: "38deg",
    from: "-46deg",
    delay: "delay-300",
  },
  {
    pivot: "left-[calc(100%-var(--arc-x))]",
    arm: "left-[-31vw]",
    theta: "-4deg",
    from: "-46deg",
    delay: "delay-420",
  },
]

const crossfade = {
  initial: { opacity: 0, filter: "blur(4px)", transform: "translateY(8px)" },
  animate: { opacity: 1, filter: "blur(0px)", transform: "translateY(0px)" },
  exit: { opacity: 0, filter: "blur(4px)", transform: "translateY(-8px)" },
  transition: { duration: 0.22, ease: EASE_SOFT },
}

export default function Hero() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [stopped, setStopped] = useState(false)
  const section = useRef<HTMLElement>(null)
  const inView = useInView(section)
  const current = cards[active]

  // The steps start playing once the entrance has settled.
  useEffect(() => {
    const timer = window.setTimeout(() => setPlaying(true), 1800)
    return () => window.clearTimeout(timer)
  }, [])

  const pearlProps = (index: number) => ({
    card: cards[index],
    isActive: active === index,
    isPlaying: playing && !paused && !stopped && inView,
    onSelect: () => setActive(index),
    onDone: () => setActive((index + 1) % cards.length),
  })

  const hold = {
    onPointerEnter: (event: React.PointerEvent) => {
      if (event.pointerType === "mouse") setPaused(true)
    },
    onPointerLeave: () => setPaused(false),
    onFocus: () => setPaused(true),
    onBlur: () => setPaused(false),
  }

  const toggle = {
    stopped,
    onToggle: () => setStopped((value) => !value),
    label: "steps",
  }

  return (
    <section
      ref={section}
      className="p-2 [--panel-inset:0.5] md:p-3 md:[--panel-inset:0.75]"
    >
      <div className="arc-field relative flex min-h-[max(calc(100svh-1.5rem),46rem)] flex-col overflow-hidden rounded-3xl bg-card [--arc-x:-14%]">
        <div className="container flex flex-1 flex-col items-center justify-center pt-24 pb-6 text-center">
          <h1 className="enter max-w-4xl text-5xl leading-none md:text-6xl lg:text-7xl 2xl:text-8xl">
            Care that starts with listening.
          </h1>

          <div className="enter mt-5 flex min-h-6 items-start justify-center delay-75 md:min-h-7">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={current.id}
                {...crossfade}
                className="max-w-xs text-muted-foreground md:max-w-none md:text-lg"
              >
                <span className="figures">{current.number}</span>{" "}
                <span className="font-medium text-foreground">
                  {current.name}.
                </span>{" "}
                {current.line}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="enter mt-8 flex flex-wrap justify-center gap-3 delay-150">
            <Button asChild>
              <Link href={appointmentHref}>Request an appointment</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/services">Our services</Link>
            </Button>
          </div>

          <p className="enter mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-muted-foreground delay-200">
            <span>{site.tagline}</span>
            <span aria-hidden className="hidden sm:inline">
              ·
            </span>
            <span className="hidden sm:inline">In person and telehealth</span>
            <span aria-hidden>·</span>
            <a href={site.phone.href} className="underline underline-offset-4">
              Call {site.phone.display}
            </a>
          </p>

          <div className="enter mt-8 flex items-center gap-4 delay-200 lg:hidden">
            <ul aria-label="Steps" {...hold} className="flex gap-4">
              {cards.map((card, index) => (
                <li key={card.id}>
                  <Pearl {...pearlProps(index)} className="relative size-14" />
                </li>
              ))}
            </ul>
            <AutoplayToggle {...toggle} className="motion-reduce:hidden" />
          </div>
        </div>

        <AutoplayToggle
          {...toggle}
          className="absolute start-4 bottom-4 z-20 hidden motion-reduce:hidden lg:inline-flex"
        />

        <ul aria-label="Steps" {...hold} className="hidden lg:block">
          {cards.map((card, index) => {
            const ring = rings[index]
            const vars = {
              "--theta": ring.theta,
              "--orbit-from": ring.from,
            } as React.CSSProperties

            return (
              <li
                key={card.id}
                style={vars}
                className={cn(
                  "absolute top-[56%] size-0 rotate-(--theta) animate-orbit-in",
                  ring.pivot,
                  ring.delay
                )}
              >
                <div
                  className={cn(
                    "absolute top-0 size-0 rotate-[calc(var(--theta)*-1)] animate-orbit-counter",
                    ring.arm,
                    ring.delay
                  )}
                >
                  <Pearl
                    {...pearlProps(index)}
                    className="absolute size-[7.5vw] max-h-28 max-w-28 -translate-x-1/2 -translate-y-1/2"
                    labelled
                  />
                </div>
              </li>
            )
          })}
        </ul>

        <div
          {...hold}
          className="relative mx-auto flex h-[clamp(16rem,38svh,28rem)] w-full max-w-5xl shrink-0 items-end justify-center"
        >
          <SceneCard className="-me-8 h-[40%] w-32 delay-620 md:hidden lg:block">
            <SceneImages
              cards={cards}
              settled={playing}
              active={(active + cards.length - 1) % cards.length}
              pick={(card) => card.scene.main}
              sizes="8rem"
              decorative
            />
          </SceneCard>

          <SceneCard className="z-5 -me-8 h-[66%] delay-500">
            <SceneImages
              cards={cards}
              settled={playing}
              active={active}
              pick={(card) => card.scene.side}
              sizes="12rem"
            />
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={current.id}
                {...crossfade}
                className="photo-tag start-3 top-3"
              >
                {current.tag}
              </motion.span>
            </AnimatePresence>
          </SceneCard>

          <div className="relative z-10 h-full w-[min(21rem,58vw)] shrink-0 animate-reveal-up overflow-hidden rounded-t-full bg-muted ring-4 ring-card delay-200">
            <SceneImages
              cards={cards}
              settled={playing}
              active={active}
              pick={(card) => card.scene.main}
              sizes="24rem"
              preload
            />
          </div>

          <div className="absolute inset-x-4 bottom-3 z-20 mx-auto max-w-80 md:hidden">
            <StepChip step={current} />
          </div>

          <SceneCard className="z-5 -ms-8 h-[66%] bg-background delay-580">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                {...crossfade}
                className="flex h-full flex-col p-4 ps-12 text-start"
              >
                <p className="flex items-baseline gap-1.5 text-xs font-medium text-muted-foreground">
                  <span className="figures">{current.number}</span>
                  {current.name}
                </p>
                <p className="display-type mt-1 text-2xl leading-tight">
                  {current.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {current.body}
                </p>
                <Button asChild size="sm" className="mt-auto w-full">
                  <Link href={appointmentHref}>Get started</Link>
                </Button>
              </motion.div>
            </AnimatePresence>
          </SceneCard>

          <SceneCard className="-ms-8 h-[40%] w-32 delay-620 md:hidden lg:block">
            <SceneImages
              cards={cards}
              settled={playing}
              active={(active + 1) % cards.length}
              pick={(card) => card.scene.main}
              sizes="8rem"
              decorative
            />
          </SceneCard>
        </div>
        <div aria-hidden="true" className="nav-notch animate-notch-open" />
      </div>
    </section>
  )
}

type PearlProps = {
  card: HeroStep
  isActive: boolean
  isPlaying: boolean
  onSelect: () => void
  onDone: () => void
  className?: string
  labelled?: boolean
}

function Pearl({
  card,
  isActive,
  isPlaying,
  onSelect,
  onDone,
  className,
  labelled,
}: PearlProps) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      aria-label={`Step ${card.number}, ${card.name}`}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") onSelect()
      }}
      onFocus={onSelect}
      onClick={onSelect}
      className={cn("group block outline-none", className)}
    >
      <span className="relative block size-full overflow-hidden rounded-full bg-muted ring-4 ring-card transition-transform duration-500 ease-soft group-focus-visible:ring-ring group-aria-pressed:scale-110">
        <Image
          src={card.scene.pearl.src}
          alt=""
          fill
          sizes="7rem"
          className="object-cover"
        />
      </span>
      {isActive && (
        <svg
          viewBox="0 0 100 100"
          aria-hidden="true"
          className="absolute -inset-[14%] size-[128%] -rotate-90 fill-none stroke-accent"
        >
          <circle
            cx="50"
            cy="50"
            r="48"
            pathLength="1"
            strokeWidth="1.5"
            strokeDasharray="1"
            strokeLinecap="round"
            onAnimationEnd={onDone}
            className={cn("animate-ring-progress", !isPlaying && "paused")}
          />
        </svg>
      )}
      {labelled && (
        <span className="absolute top-full left-1/2 mt-4 flex -translate-x-1/2 items-baseline gap-1.5 text-xs font-medium whitespace-nowrap text-muted-foreground transition-colors duration-300 group-aria-pressed:text-foreground">
          <span className="figures">{card.number}</span>
          {card.name}
        </span>
      )}
    </button>
  )
}

type SceneCardProps = {
  className?: string
  children: React.ReactNode
}

function SceneCard({ className, children }: SceneCardProps) {
  return (
    <div
      className={cn(
        "relative hidden h-[56%] w-48 shrink-0 animate-in overflow-hidden rounded-t-2xl bg-muted ring-4 ring-card duration-1000 ease-soft fill-mode-both fade-in slide-in-from-bottom-16 motion-reduce:slide-in-from-bottom-0 md:block",
        className
      )}
    >
      {children}
    </div>
  )
}

type SceneImagesProps = {
  cards: HeroStep[]
  active: number
  pick: (card: HeroStep) => SiteImage
  sizes: string
  settled: boolean
  preload?: boolean
  decorative?: boolean
}

// A photo mounts when its step is next and then stays; once the entrance settles every photo mounts, so a jump from a pearl crossfades too.
function SceneImages({
  cards,
  settled,
  active,
  pick,
  sizes,
  preload,
  decorative,
}: SceneImagesProps) {
  const [mounted, setMounted] = useState<number[]>([])
  const wanted = settled
    ? cards.map((_, index) => index)
    : [active, (active + 1) % cards.length]
  if (wanted.some((index) => !mounted.includes(index))) {
    setMounted([...new Set([...mounted, ...wanted])])
  }

  return cards.map((card, index) => {
    if (!mounted.includes(index) && !wanted.includes(index)) return null
    const image = pick(card)

    return (
      <Image
        key={card.id}
        src={image.src}
        alt={index === active && !decorative ? image.alt : ""}
        fill
        preload={preload && index === 0}
        sizes={sizes}
        className={cn(
          "scale-105 object-cover opacity-0 transition duration-700 ease-soft",
          index === active && "scale-100 opacity-100"
        )}
      />
    )
  })
}

function StepChip({ step }: { step: HeroStep }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-full bg-background/90 py-1.5 ps-4 pe-1.5 text-start backdrop-blur-md">
      <p className="min-w-0 truncate text-sm font-medium">{step.title}</p>
      <Button asChild size="sm">
        <Link href={appointmentHref}>Get started</Link>
      </Button>
    </div>
  )
}
