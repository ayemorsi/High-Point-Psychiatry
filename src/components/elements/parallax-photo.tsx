"use client"

import { useRef } from "react"
import { motion, type MotionStyle, useScroll, useTransform } from "motion/react"

import { cn } from "@/lib/utils"

type ParallaxPhotoProps = {
  children: React.ReactNode
  /** For a photo at the top of the page: still on arrival, drifting only as it leaves. */
  hero?: boolean
  className?: string
}

// The photo drifts against the scroll inside its frame, as the founder photos do on the home page.
// The layer overhangs the frame by the drift, so no edge ever shows.
export default function ParallaxPhoto({
  children,
  hero = false,
  className,
}: ParallaxPhotoProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: hero ? ["start start", "end start"] : ["start end", "end start"],
  })
  const parallax = useTransform(
    scrollYProgress,
    [0, 1],
    hero ? [0, -1] : [1, -1]
  )

  return (
    <motion.div
      ref={ref}
      style={{ "--parallax": parallax } as MotionStyle}
      className={cn(
        "overflow-hidden [--drift:1.5rem] lg:[--drift:2.5rem]",
        className
      )}
    >
      <div className="parallax absolute inset-x-0 -inset-y-(--drift) [--depth:calc(var(--drift)*-1)]">
        {children}
      </div>
    </motion.div>
  )
}
