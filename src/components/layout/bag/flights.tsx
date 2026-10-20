"use client"

import { useState } from "react"
import { createPortal } from "react-dom"
import { getImageProps } from "next/image"
import { motion } from "motion/react"

import { bag } from "@/hooks/use-bag"
import type { BagFlight } from "@/lib/types"
import { EASE_SOFT } from "@/lib/utils"

type FlightsProps = {
  flights: BagFlight[]
  target: React.RefObject<Element | null>
  onLand: () => void
}

const DURATION = 0.75
const DOT = 12

export default function Flights({ flights, target, onLand }: FlightsProps) {
  if (flights.length === 0) return null

  return createPortal(
    flights.map((flight) => (
      <Flight key={flight.id} flight={flight} target={target} onLand={onLand} />
    )),
    document.body
  )
}

function Flight({
  flight,
  target,
  onLand,
}: { flight: BagFlight } & Omit<FlightsProps, "flights">) {
  const { source, rect, image, delay } = flight
  const [path] = useState(() => {
    const to = target.current?.getBoundingClientRect()
    const side = Math.min(rect.width, rect.height)
    return {
      x: to ? to.x + to.width / 2 - (rect.x + rect.width / 2) : 0,
      y: to ? to.y + to.height / 2 - (rect.y + rect.height / 2) : 0,
      scale: DOT / side,
      radius: side / 2,
    }
  })

  // The card's photo is already loaded at its own size; a button has none on screen, so fetch a small one.
  const url =
    image && source === "button"
      ? getImageProps({ src: image, alt: "", width: 112, height: 140 }).props
          .src
      : image

  const timing = { duration: DURATION, delay }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed z-50 bg-card bg-cover bg-center shadow-lg"
      style={{
        left: rect.x,
        top: rect.y,
        width: rect.width,
        height: rect.height,
        backgroundImage: url ? `url("${url}")` : undefined,
      }}
      initial={{
        x: 0,
        y: 0,
        scale: source === "photo" ? 1 : 0.6,
        borderRadius: rect.radius,
        opacity: source === "photo" ? 1 : 0,
      }}
      animate={{
        x: path.x,
        y: path.y,
        scale: [source === "photo" ? 1 : 0.6, 1.04, path.scale],
        borderRadius: path.radius,
        opacity: [source === "photo" ? 1 : 0, 1, 1, 0],
      }}
      transition={{
        // Sideways eases out and upwards eases in, so the photo arcs into the bag.
        x: { ...timing, ease: [0.5, 1, 0.89, 1] },
        y: { ...timing, ease: [0.11, 0, 0.5, 0] },
        scale: { ...timing, ease: EASE_SOFT, times: [0, 0.18, 1] },
        borderRadius: { ...timing, ease: EASE_SOFT },
        opacity: { ...timing, ease: "linear", times: [0, 0.12, 0.85, 1] },
      }}
      onAnimationComplete={() => {
        bag.land(flight.id)
        onLand()
      }}
    />
  )
}
