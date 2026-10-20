"use client"

import Link from "next/link"

import AddToBagButton from "@/components/elements/add-to-bag-button"
import { Button } from "@/components/ui/button"
import { useRoutineFinder } from "@/hooks/use-routine-finder"
import { buildRoutine } from "@/lib/routines"
import type { FinderQuestion, Product } from "@/lib/types"
import { cn, formatPrice, spell } from "@/lib/utils"

export type Finder = ReturnType<typeof useRoutineFinder>

export const questionCopy: Record<
  FinderQuestion,
  { label: string; question: string }
> = {
  skin: { label: "Skin", question: "What is your skin like most days?" },
  concern: { label: "Concern", question: "What would you change first?" },
  length: { label: "Steps", question: "How many steps do you want each day?" },
}

// Which products still fit the answers so far: skin type first, then the concern, then only the picks.
export function fits(finder: Finder) {
  const { answers, done, result } = finder
  const likely =
    answers.skin && answers.concern
      ? buildRoutine(finder.products, answers.skin, answers.concern, 4).picks
      : []

  return (product: Product) => {
    if (done && result)
      return result.picks.some((pick) => pick.product.slug === product.slug)
    if (answers.skin && !product.skinTypes.includes(answers.skin)) return false
    if (answers.concern)
      return (
        product.concerns.includes(answers.concern) ||
        likely.some((pick) => pick.product.slug === product.slug)
      )
    return true
  }
}

export function lineState(finder: Finder, id: FinderQuestion) {
  if (finder.current === id) return "active"
  return finder.answers[id] === undefined ? "upcoming" : "answered"
}

// The one ink button on the page, with the saving and the cheaper set under it.
export function RoutineBuy({
  finder,
  align = "center",
  className,
}: {
  finder: Finder
  align?: "center" | "start"
  className?: string
}) {
  const { result } = finder
  if (!result) return null

  return (
    <div
      className={cn(
        "swap flex flex-col",
        align === "center" ? "items-center text-center" : "items-start",
        className
      )}
    >
      <AddToBagButton
        product={result.picks.map((pick) => pick.product)}
        label={
          result.picks.length === 2
            ? "Add both"
            : `Add all ${spell(result.picks.length)}`
        }
        size="lg"
      />
      {result.saved > 0 && (
        <p className="mt-3 text-sm text-muted-foreground">
          You save {formatPrice(result.saved)} with every step.
        </p>
      )}
      {result.set && (
        <p className="mt-1 text-sm text-muted-foreground">
          Or start smaller:{" "}
          <Link
            href={`/products/${result.set.slug}`}
            className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
          >
            {result.set.name}
          </Link>
          , {result.set.size.toLowerCase()} for {formatPrice(result.set.price)}.
        </p>
      )}
      <div className="mt-4 flex gap-6">
        <Button variant="link" onClick={() => finder.edit("skin")}>
          Change answers
        </Button>
        <Button variant="link" onClick={finder.restart}>
          Start over
        </Button>
      </div>
    </div>
  )
}
