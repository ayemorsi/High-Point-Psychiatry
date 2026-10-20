"use client"

import { motion, useReducedMotion } from "motion/react"

import { EASE_SOFT } from "@/lib/utils"

type RevealProps = {
  children: React.ReactNode
  delay?: number
  className?: string
}

// The initial style never depends on reduced motion, so server and client markup always match.
export default function Reveal({
  children,
  delay = 0,
  className,
}: RevealProps) {
  const reduceMotion = useReducedMotion()
  const move = { duration: reduceMotion ? 0 : 0.7, ease: EASE_SOFT, delay }

  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: "blur(4px)",
        transform: "translateY(16px)",
      }}
      whileInView={{
        opacity: 1,
        filter: "blur(0px)",
        transform: "translateY(0px)",
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        opacity: { duration: 0.7, ease: EASE_SOFT, delay },
        filter: move,
        transform: move,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
