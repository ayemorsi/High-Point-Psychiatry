"use client"

import { useEffect, useRef, useState } from "react"

// Plays only while the band is on screen, never under reduced motion; a manual pause sticks.
export function useFilmPlayback() {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const paused = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // Watch the band, not the video: a clipped frame shrinks the video's own rect and it would never start.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) element.pause()
        else if (!paused.current) element.play().catch(() => {})
      },
      { threshold: 0.25 }
    )
    observer.observe(element.closest("section") ?? element)
    return () => observer.disconnect()
  }, [])

  function toggle() {
    const element = ref.current
    if (!element) return
    paused.current = !element.paused
    if (element.paused) element.play().catch(() => {})
    else element.pause()
  }

  const videoProps = {
    ref,
    onPlay: () => setPlaying(true),
    onPause: () => setPlaying(false),
  }

  return { playing, toggle, videoProps }
}
