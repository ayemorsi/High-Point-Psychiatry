"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import type { OfferStatus } from "@/lib/types"
import { storageKey } from "@/lib/utils"

const STORAGE_KEY = storageKey("offer")
const SESSION_KEY = storageKey("offer-shown")
const SCROLL_DEPTH = 0.55
const DWELL_MS = 8000
const SETTLE_MS = 300
const DISMISS_COOLDOWN_MS = 30 * 24 * 60 * 60 * 1000

function isEligible() {
  try {
    if (window.sessionStorage.getItem(SESSION_KEY)) return false
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return true
    const saved = JSON.parse(raw) as { status: OfferStatus; at: number }
    if (saved.status === "claimed") return false
    return Date.now() - saved.at > DISMISS_COOLDOWN_MS
  } catch {
    // Storage refused: stay quiet rather than risk showing the offer on every page load.
    return false
  }
}

function save(status: OfferStatus) {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ status, at: Date.now() })
    )
  } catch {}
}

export function useScrollOffer() {
  const [open, setOpen] = useState(false)
  const claimed = useRef(false)

  useEffect(() => {
    if (!isEligible()) return

    let dwelled = false
    let settle = 0

    function show() {
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1")
      } catch {}
      setOpen(true)
      stop()
    }

    function onScroll() {
      if (!dwelled) return
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight
      if (scrollable <= 0) return
      if (window.scrollY / scrollable < SCROLL_DEPTH) return
      // Wait for the gesture to settle so the scroll lock never lands mid-flick.
      window.clearTimeout(settle)
      settle = window.setTimeout(show, SETTLE_MS)
    }

    function onMouseOut(event: MouseEvent) {
      if (event.relatedTarget || event.clientY > 0) return
      show()
    }

    const dwell = window.setTimeout(() => {
      dwelled = true
      onScroll()
    }, DWELL_MS)

    function stop() {
      window.clearTimeout(dwell)
      window.clearTimeout(settle)
      window.removeEventListener("scroll", onScroll)
      document.removeEventListener("mouseout", onMouseOut)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    if (window.matchMedia("(pointer: fine)").matches) {
      document.addEventListener("mouseout", onMouseOut)
    }

    return stop
  }, [])

  // Closing after a signup must not downgrade the record back to a 30-day snooze.
  const dismiss = useCallback(() => {
    if (!claimed.current) save("dismissed")
    setOpen(false)
  }, [])

  const claim = useCallback(() => {
    claimed.current = true
    save("claimed")
  }, [])

  return { open, dismiss, claim }
}
