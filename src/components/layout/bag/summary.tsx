"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { CheckIcon } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { bag, useBag } from "@/hooks/use-bag"
import { round } from "@/lib/pricing"
import { bestsellersHref } from "@/lib/shop-params"
import { site } from "@/lib/site"
import { cn, EASE_SOFT, formatPrice } from "@/lib/utils"

// What the shopper last saw, so opening the bag grows the bar from there instead of from zero.
let seen = 0

const OPEN_DELAY = 250
const FILL = 700

// Fixed rather than random so the burst renders the same on every pass.
const sparks = [
  { x: 6, rise: 12, drift: -4, size: "size-1" },
  { x: 14, rise: 18, drift: 3, size: "size-1.5" },
  { x: 23, rise: 10, drift: -2, size: "size-1" },
  { x: 31, rise: 16, drift: 5, size: "size-1" },
  { x: 40, rise: 20, drift: -5, size: "size-1.5" },
  { x: 49, rise: 11, drift: 2, size: "size-1" },
  { x: 57, rise: 17, drift: -3, size: "size-1" },
  { x: 66, rise: 13, drift: 4, size: "size-1.5" },
  { x: 74, rise: 19, drift: -2, size: "size-1" },
  { x: 83, rise: 12, drift: 5, size: "size-1" },
  { x: 91, rise: 16, drift: -4, size: "size-1.5" },
  { x: 97, rise: 10, drift: 2, size: "size-1" },
]

export function ShippingProgress() {
  const { shipping } = useBag()
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(seen)
  const [landed, setLanded] = useState(seen)
  const [bursts, setBursts] = useState(0)
  const opening = useRef(true)

  useEffect(() => {
    const target = shipping.progress
    const delay = reduce ? 0 : opening.current ? OPEN_DELAY : 0
    const fill = setTimeout(() => {
      opening.current = false
      setShown(target)
    }, delay)
    const land = setTimeout(
      () => {
        if (seen < 100 && target >= 100 && !reduce) setBursts((n) => n + 1)
        seen = target
        setLanded(target)
      },
      reduce ? 0 : delay + FILL
    )
    return () => {
      clearTimeout(fill)
      clearTimeout(land)
    }
  }, [shipping.progress, reduce])

  const free = shipping.free && landed >= 100
  // Until the bar reaches the end, keep asking for what was left before this add.
  const remaining = shipping.free
    ? round((site.commerce.freeShippingThreshold * (100 - landed)) / 100)
    : shipping.remaining

  return (
    <div className="space-y-2">
      <AnimatePresence mode="wait" initial={false}>
        {free ? (
          <motion.p
            key="free"
            initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
            transition={{ duration: 0.25, ease: EASE_SOFT }}
            className="flex items-center gap-1.5 text-sm"
          >
            <motion.span
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                bounce: 0.6,
                duration: 0.5,
                delay: 0.1,
              }}
              className="grid size-4 place-items-center rounded-full bg-success text-success-foreground"
            >
              <CheckIcon className="size-3" strokeWidth={3} />
            </motion.span>
            Free shipping on this order
          </motion.p>
        ) : (
          <motion.p
            key="spend"
            exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
            transition={{ duration: 0.15 }}
            className="text-sm"
          >
            Spend{" "}
            <motion.span
              key={remaining}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="figures inline-block font-medium"
            >
              {formatPrice(remaining)}
            </motion.span>{" "}
            more for free shipping
          </motion.p>
        )}
      </AnimatePresence>
      <div className="relative">
        <Progress value={shown} aria-label="Progress to free shipping" />
        {bursts > 0 && <Burst key={bursts} />}
      </div>
    </div>
  )
}

function Burst() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "300%" }}
          transition={{ duration: 0.8, ease: [0.45, 0, 0.55, 1] }}
          className="h-full w-1/3 bg-linear-to-r from-transparent via-primary-foreground/80 to-transparent"
        />
      </div>
      {sparks.map((spark) => (
        <motion.span
          key={spark.x}
          initial={{ opacity: 0, scale: 0, y: 0, x: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0.4],
            y: -spark.rise,
            x: spark.drift,
          }}
          transition={{
            duration: 0.7,
            delay: (spark.x / 100) * 0.55,
            ease: EASE_SOFT,
          }}
          style={{ left: `${spark.x}%` }}
          className={cn(
            "absolute top-1/2 -mt-0.5 rounded-full bg-success",
            spark.size
          )}
        />
      ))}
    </div>
  )
}

export function BagTotals() {
  const { subtotal, saving, shipping } = useBag()

  return (
    <div className="space-y-1.5 text-sm">
      <dl className="space-y-1.5">
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd className="figures">{formatPrice(subtotal)}</dd>
        </div>
        {saving > 0 && (
          <div className="flex justify-between gap-4 text-accent">
            <dt>Every step, {site.commerce.setDiscount}% off</dt>
            <dd className="figures">−{formatPrice(saving)}</dd>
          </div>
        )}
      </dl>
      {!shipping.free && (
        <p className="text-xs text-muted-foreground">
          Shipping calculated at checkout
        </p>
      )}
    </div>
  )
}

export function CheckoutButton() {
  const { total } = useBag()

  return (
    <Button asChild size="lg" className="w-full">
      <Link href="/checkout" onClick={() => bag.setOpen(false)}>
        Checkout
        <span aria-hidden="true" className="opacity-50">
          ·
        </span>
        <span className="figures">{formatPrice(total)}</span>
      </Link>
    </Button>
  )
}

export function EmptyBag() {
  return (
    <div className="@container relative isolate flex flex-1 flex-col items-center justify-center overflow-hidden rounded-3xl bg-card px-6 py-16 text-center">
      {/* Sized to the panel, not the viewport, so the rings keep their shape in a narrow drawer. */}
      <div
        aria-hidden="true"
        className="arc-field absolute inset-0 -z-10 [--arc-inner:56cqw] [--arc-outer:64cqw] [--arc-strength:2%] [--arc-x:-30%]"
      />
      <h2 className="text-3xl">Your bag is empty</h2>
      <p className="mt-2 max-w-xs text-sm text-muted-foreground">
        Most people start with one of our bestsellers.
      </p>
      <Button asChild variant="secondary" className="mt-6">
        <Link href={bestsellersHref} onClick={() => bag.setOpen(false)}>
          Shop bestsellers
        </Link>
      </Button>
    </div>
  )
}
