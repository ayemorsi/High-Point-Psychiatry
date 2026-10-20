"use client"

import { useEffect, useRef } from "react"

// Moves focus to the new heading after a swap the shopper caused, never on first render.
export function useSwapFocus(key: string) {
  const ref = useRef<HTMLHeadingElement>(null)
  const pending = useRef(false)

  useEffect(() => {
    if (!pending.current) return
    pending.current = false
    ref.current?.focus()
  }, [key])

  const arm = () => {
    pending.current = true
  }

  return [ref, arm] as const
}
