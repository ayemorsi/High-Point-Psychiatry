"use client"

import { PauseIcon, PlayIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

type AutoplayToggleProps = {
  stopped: boolean
  onToggle: () => void
  label: string
  className?: string
}

// Rotations stop for good here; reduced motion never starts them, so the control hides.
export default function AutoplayToggle({
  stopped,
  onToggle,
  label,
  className,
}: AutoplayToggleProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label={stopped ? `Play ${label}` : `Pause ${label}`}
      onClick={onToggle}
      className={className}
    >
      {stopped ? <PlayIcon /> : <PauseIcon />}
    </Button>
  )
}
