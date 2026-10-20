"use client"

import Link from "next/link"

import { appointmentHref } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import {
  type FinderQuestion,
  useServiceFinder,
} from "@/hooks/use-service-finder"
import type { Service } from "@/lib/services"
import { cn } from "@/lib/utils"

export type Finder = ReturnType<typeof useServiceFinder>

export const questionCopy: Record<
  FinderQuestion,
  { label: string; question: string }
> = {
  concern: { label: "Concern", question: "What would you like help with?" },
  start: { label: "First step", question: "Where would you like to start?" },
  format: { label: "Visits", question: "How would you like to meet?" },
}

// Which services still fit the answers so far: the concern first, then only the picks.
export function fits(finder: Finder) {
  const { answers, done, result } = finder

  return (service: Service) => {
    if (done && result)
      return result.some((pick) => pick.service.slug === service.slug)
    if (answers.concern && answers.concern !== "unsure")
      return (
        service.concerns.length === 0 ||
        service.concerns.includes(answers.concern)
      )
    return true
  }
}

export function lineState(finder: Finder, id: FinderQuestion) {
  if (finder.current === id) return "active"
  return finder.answers[id] === undefined ? "upcoming" : "answered"
}

// The one ink button on the page, once the three answers are in.
export function FinderResult({
  finder,
  className,
}: {
  finder: Finder
  className?: string
}) {
  if (!finder.result) return null

  return (
    <div
      className={cn("swap flex flex-col items-center text-center", className)}
    >
      <Button asChild size="lg">
        <Link href={appointmentHref}>Request an appointment</Link>
      </Button>
      <p className="mt-3 max-w-sm text-sm text-muted-foreground">
        We&apos;ll confirm the right first step with you when we reply.
      </p>
      <div className="mt-4 flex gap-6">
        <Button variant="link" onClick={() => finder.edit("concern")}>
          Change answers
        </Button>
        <Button variant="link" onClick={finder.restart}>
          Start over
        </Button>
      </div>
    </div>
  )
}
