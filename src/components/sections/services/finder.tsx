"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, type MotionStyle, useScroll, useTransform } from "motion/react"

import {
  type Finder,
  FinderResult,
  lineState,
  questionCopy,
} from "@/components/sections/services/shared"
import Turntable from "@/components/sections/services/turntable"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  finderOptions,
  type FinderQuestion,
  optionFor,
  useServiceFinder,
} from "@/hooks/use-service-finder"
import { cn, EASE_SOFT } from "@/lib/utils"

const morph = { duration: 0.6, ease: EASE_SOFT } as const
// Long enough to see the chip turn ink before it flies up into the sentence.
const PICK_DELAY = 180
const CHIP_STAGGER = 0.04

export default function ServiceFinder() {
  const finder = useServiceFinder()
  const { current, done } = finder
  const section = useRef<HTMLElement>(null)
  const top = useRef<HTMLDivElement>(null)
  const moved = useRef(false)
  // Rests at 0 on arrival and reaches -1 as the panel leaves, so nothing is offset while you answer at the top.
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  })
  const parallax = useTransform(scrollYProgress, [0, 1], [0, -1])

  // Keeps keyboard and screen reader users on the question that just opened, or on the routine once it is done.
  useEffect(() => {
    if (!moved.current) {
      moved.current = true
      return
    }
    const area = top.current
    const target =
      area?.querySelector<HTMLElement>("[data-state=on]") ??
      area?.querySelector<HTMLElement>("button, [data-focus]")
    target?.focus({ preventScroll: true })
  }, [current])

  return (
    <motion.section
      ref={section}
      style={{ "--parallax": parallax } as MotionStyle}
      className="p-2 [--panel-inset:0.5] md:p-3 md:[--panel-inset:0.75]"
    >
      <div className="arc-field hero-padding relative overflow-hidden rounded-3xl bg-card">
        {/* The words sink a little as the page scrolls while the ring keeps pace. */}
        <div className="parallax container flex flex-col items-center text-center [--depth:-2rem] lg:[--depth:-3rem]">
          <h1 className="sr-only">Our services</h1>

          <Breadcrumb className="enter mb-8 md:mb-10">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Services</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Holds its height once the chips go, so the sentence under it never jumps. */}
          <div
            ref={top}
            className="enter flex min-h-20 flex-col items-center justify-end"
          >
            {current ? (
              <AnswerChips key={current} id={current} finder={finder} />
            ) : (
              <p
                data-focus
                tabIndex={-1}
                className="swap text-sm text-muted-foreground outline-none"
              >
                Services that fit
              </p>
            )}
          </div>

          {/* Three fixed lines (the middle one splits on phones), so a long answer widens its line instead of pushing words onto the next. */}
          <p className="display-type mt-6 text-3xl leading-tight sm:text-4xl md:mt-8 md:text-5xl lg:text-6xl">
            <span className="enter block delay-100">
              I&apos;d like help with <br className="sm:hidden" />
              <span className="whitespace-nowrap">
                <Blank id="concern" finder={finder} />,
              </span>
            </span>
            <span className="enter block whitespace-nowrap delay-150">
              starting with <Blank id="start" finder={finder} />,
            </span>
            <span className="enter block whitespace-nowrap delay-200">
              and to meet <Blank id="format" finder={finder} />.
            </span>
          </p>

          {done && <FinderResult finder={finder} className="mt-8 md:mt-10" />}
        </div>

        <Turntable finder={finder} className="mt-10 md:mt-14" />
        <div aria-hidden="true" className="nav-notch animate-notch-open" />
      </div>
    </motion.section>
  )
}

// The chosen chip carries the layout id its blank picks up, which is what flies it into the sentence.
function AnswerChips({ id, finder }: { id: FinderQuestion; finder: Finder }) {
  const options: { value: unknown; label: string }[] = finderOptions[id]
  const selected = finder.answers[id]
  const [picked, setPicked] = useState<unknown>(undefined)
  const timer = useRef<number | undefined>(undefined)
  const chosen = picked ?? selected
  const labelId = `finder-${id}`

  useEffect(() => () => window.clearTimeout(timer.current), [])

  function choose(value: unknown) {
    if (picked !== undefined) return
    setPicked(value)
    timer.current = window.setTimeout(
      () => finder.answer(id, value as never),
      PICK_DELAY
    )
  }

  return (
    <div className="flex flex-col items-center">
      <p id={labelId} className="swap text-sm text-muted-foreground">
        {questionCopy[id].question}
      </p>
      <ToggleGroup
        type="single"
        variant="outline"
        size="sm"
        value={chosen === undefined ? "" : String(chosen)}
        onValueChange={(next) => {
          const option = options.find((item) => String(item.value) === next)
          choose(option ? option.value : selected)
        }}
        aria-labelledby={labelId}
        className="mt-3 flex-wrap justify-center"
      >
        {options.map((option, index) => {
          const isChosen = chosen === option.value
          return (
            <ToggleGroupItem
              key={option.label}
              value={String(option.value)}
              asChild
            >
              {/* The chips rise in one after another; once one is picked the rest step back while it flies. */}
              <motion.button
                layoutId={isChosen ? `answer-${id}` : undefined}
                initial={
                  isChosen ? false : { opacity: 0, y: 6, filter: "blur(2px)" }
                }
                animate={{
                  opacity: picked !== undefined && !isChosen ? 0.35 : 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                whileTap={{ scale: 0.96 }}
                transition={{
                  layout: morph,
                  scale: { duration: 0.15, ease: "easeOut" },
                  default: {
                    ...morph,
                    duration: 0.5,
                    delay: picked === undefined ? index * CHIP_STAGGER : 0,
                  },
                }}
              >
                {option.label}
              </motion.button>
            </ToggleGroupItem>
          )
        })}
      </ToggleGroup>
    </div>
  )
}

// A blank in the sentence: an empty line while it waits, and once answered, the chip that flew in.
function Blank({ id, finder }: { id: FinderQuestion; finder: Finder }) {
  const state = lineState(finder, id)
  const value = optionFor(id, finder.answers[id])?.phrase

  if (state === "answered") {
    return (
      <button
        type="button"
        onClick={() => finder.edit(id)}
        aria-label={`${questionCopy[id].label}: ${value}. Change`}
        className="group inline outline-none"
      >
        <Answer id={id} value={value} />
      </button>
    )
  }

  // The ink line draws across the faint one when its question opens.
  return (
    <span
      aria-hidden="true"
      className="relative inline-block h-[0.9em] w-[3.5em] translate-y-[0.12em] align-baseline"
    >
      <span className="absolute inset-0 border-b-2 border-dashed border-muted-foreground/30" />
      <span
        className={cn(
          "absolute inset-0 border-b-2 border-dashed border-foreground transition-[clip-path] duration-700 ease-soft motion-reduce:transition-none",
          state === "active"
            ? "[clip-path:inset(0_0_0_0)]"
            : "[clip-path:inset(0_100%_0_0)]"
        )}
      />
    </span>
  )
}

// Lands looking like the ink chip it flew from, then the pill fades off and the word settles into the sentence.
function Answer({ id, value }: { id: FinderQuestion; value?: string }) {
  const [landed, setLanded] = useState(false)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setLanded(true))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <motion.span
      layoutId={`answer-${id}`}
      transition={morph}
      className="relative inline-block whitespace-nowrap"
    >
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={morph}
        className="absolute inset-0 rounded-full bg-primary"
      />
      <span
        className={cn(
          "relative underline decoration-2 underline-offset-8 transition-[color,text-decoration-color] duration-500 ease-soft group-hover:decoration-foreground group-focus-visible:decoration-foreground",
          landed
            ? "text-foreground decoration-foreground/25"
            : "text-primary-foreground decoration-transparent"
        )}
      >
        {value}
      </span>
    </motion.span>
  )
}
