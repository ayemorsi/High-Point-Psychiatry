"use client"

import { useState } from "react"
import { MinusIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type QuantityStepperProps = {
  defaultValue?: number
  value?: number
  onValueChange?: (value: number) => void
  min?: number
  max?: number
  size?: "default" | "sm" | "lg"
  label?: string
  className?: string
}

export default function QuantityStepper({
  defaultValue = 1,
  value,
  onValueChange,
  min = 1,
  max = 10,
  size = "default",
  label = "Quantity",
  className,
}: QuantityStepperProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue)
  const quantity = value ?? uncontrolled
  const set = (next: number) => {
    if (value === undefined) setUncontrolled(next)
    onValueChange?.(next)
  }
  const buttonSize = size === "sm" ? "icon-xs" : "icon-sm"

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "inline-flex items-center rounded-full border border-foreground/25",
        {
          sm: "h-9 px-0.5",
          default: "h-11 px-1",
          lg: "h-13 px-1.5",
        }[size],
        className
      )}
    >
      <Button
        variant="ghost"
        size={buttonSize}
        aria-label="Decrease quantity"
        disabled={quantity <= min}
        onClick={() => set(quantity - 1)}
      >
        <MinusIcon />
      </Button>
      <output
        aria-live="polite"
        className={cn(
          "figures text-center font-medium",
          size === "sm" ? "w-6 text-xs" : "w-8 text-sm"
        )}
      >
        {quantity}
      </output>
      <Button
        variant="ghost"
        size={buttonSize}
        aria-label="Increase quantity"
        disabled={quantity >= max}
        onClick={() => set(quantity + 1)}
      >
        <PlusIcon />
      </Button>
    </div>
  )
}
