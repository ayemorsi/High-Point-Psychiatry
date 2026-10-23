"use client"

import { useEffect, useRef, useState } from "react"
import { PauseIcon, PlayIcon } from "lucide-react"
import { useReducedMotion } from "motion/react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const PROGRESS_RADIUS = 45
const PROGRESS_CIRCUMFERENCE = 2 * Math.PI * PROGRESS_RADIUS

type Hero126Props = {
  /** Path without the extension; an .mp4 and a .webm sit side by side. */
  src: string
  poster: string
  /** What the video shows, for screen readers. */
  label: string
  className?: string
  videoClassName?: string
}

// Hero126's looping video stage with its play-pause ring. It plays only on screen, never for reduced motion, and a pause stays paused.
export default function Hero126({
  src,
  poster,
  label,
  className,
  videoClassName,
}: Hero126Props) {
  const reduceMotion = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<SVGCircleElement>(null)
  const frame = useRef(0)
  const userPaused = useRef(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video || reduceMotion) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !userPaused.current) void video.play()
      else if (!entry.isIntersecting) video.pause()
    })
    observer.observe(video)
    return () => observer.disconnect()
  }, [reduceMotion])

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  function syncProgress() {
    const video = videoRef.current
    const circle = progressRef.current
    if (!video?.duration || !circle) return
    circle.style.strokeDashoffset = `${PROGRESS_CIRCUMFERENCE * (1 - video.currentTime / video.duration)}`
  }

  function tick() {
    syncProgress()
    frame.current = requestAnimationFrame(tick)
  }

  function toggle() {
    const video = videoRef.current
    if (!video) return
    userPaused.current = !video.paused
    if (video.paused) void video.play()
    else video.pause()
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <video
        ref={videoRef}
        poster={poster}
        aria-label={label}
        muted
        loop
        playsInline
        preload="metadata"
        onPlay={() => {
          setPlaying(true)
          cancelAnimationFrame(frame.current)
          frame.current = requestAnimationFrame(tick)
        }}
        onPause={() => {
          setPlaying(false)
          cancelAnimationFrame(frame.current)
          syncProgress()
        }}
        className={cn("size-full object-cover", videoClassName)}
      >
        <source src={`${src}.mp4`} type="video/mp4" />
        <source src={`${src}.webm`} type="video/webm" />
      </video>
      <div className="absolute right-4 bottom-4 z-10 size-12 md:right-6 md:bottom-6 md:size-14">
        <svg
          viewBox="0 0 100 100"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full -rotate-90"
        >
          <circle
            cx="50"
            cy="50"
            r={PROGRESS_RADIUS}
            fill="none"
            strokeWidth="5"
            className="stroke-background/40"
          />
          <circle
            ref={progressRef}
            cx="50"
            cy="50"
            r={PROGRESS_RADIUS}
            fill="none"
            strokeWidth="5"
            strokeLinecap="round"
            className="stroke-accent"
            strokeDasharray={PROGRESS_CIRCUMFERENCE}
            strokeDashoffset={PROGRESS_CIRCUMFERENCE}
          />
        </svg>
        <Button
          type="button"
          size="icon"
          variant="secondary"
          aria-label={playing ? "Pause video" : "Play video"}
          onClick={toggle}
          className="absolute inset-1.5 size-auto rounded-full"
        >
          {playing ? (
            <PauseIcon className="size-4 fill-current md:size-5" />
          ) : (
            <PlayIcon className="size-4 fill-current md:size-5" />
          )}
        </Button>
      </div>
    </div>
  )
}
