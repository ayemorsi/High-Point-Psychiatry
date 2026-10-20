"use client"

import { useState } from "react"

import { routinePrice } from "@/lib/pricing"
import { getRoutine } from "@/lib/routines"
import { SKIN_TYPES } from "@/lib/shop-params"
import { site } from "@/lib/site"
import { routineSteps } from "@/lib/steps"
import type { Product, SkinType } from "@/lib/types"
import { formatPrice, spell } from "@/lib/utils"

// How the savings hint names a single missing step.
const stepNouns: Record<string, string> = {
  cleanse: "a cleanser",
  treat: "a treatment",
  moisturize: "a moisturizer",
  protect: "an SPF",
}

// Steps are optional and take several picks; covering every step takes the set discount off everything.
export function useRoutineBuilder(products: Product[]) {
  const [picks, setPicks] = useState<string[][]>(() =>
    routineSteps.map(() => [])
  )

  const steps = routineSteps.map((step) => ({
    ...step,
    products: products.filter((product) => product.step === step.id),
  }))
  const groups = steps.map((step, index) => ({
    step,
    index,
    products: picks[index]
      .map((slug) => products.find((product) => product.slug === slug))
      .filter((product) => product !== undefined),
  }))
  const chosen = groups.flatMap((group) => group.products)
  const count = chosen.length
  const missing = groups.filter((group) => group.products.length === 0)
  const covered = steps.length - missing.length
  const complete = missing.length === 0
  const { full, total, saved } = routinePrice(chosen)

  // A skin type stays selected only while the picks are exactly its routine.
  const matchedSkin =
    SKIN_TYPES.find((skin) =>
      getRoutine(products, skin).every(
        (product, index) =>
          picks[index].length === 1 && picks[index][0] === product.slug
      )
    ) ?? ""

  const hint = complete
    ? `You save ${formatPrice(saved)} on all ${spell(count)}.`
    : count === 0
      ? `Cover all ${spell(steps.length)} steps to save ${site.commerce.setDiscount}%.`
      : missing.length === 1
        ? `Add ${stepNouns[missing[0].step.id]} to save ${site.commerce.setDiscount}%.`
        : `Add ${missing.length} more steps to save ${site.commerce.setDiscount}%.`

  const buttonLabel =
    count === 1
      ? "Add to bag"
      : complete
        ? `Add all ${spell(count)}`
        : `Add ${count} to bag`

  function isPicked(index: number, slug: string) {
    return picks[index].includes(slug)
  }

  function toggle(index: number, slug: string) {
    setPicks((current) =>
      current.map((slugs, i) =>
        i !== index
          ? slugs
          : slugs.includes(slug)
            ? slugs.filter((s) => s !== slug)
            : [...slugs, slug]
      )
    )
  }

  function clear(index: number) {
    setPicks((current) => current.map((s, i) => (i === index ? [] : s)))
  }

  function pickSkin(skin: string) {
    if (!skin) return
    setPicks(
      getRoutine(products, skin as SkinType).map((product) => [product.slug])
    )
  }

  return {
    steps,
    groups,
    chosen,
    count,
    covered,
    complete,
    full,
    total,
    matchedSkin,
    hint,
    buttonLabel,
    bagName: count === 1 ? chosen[0].name : "Your routine",
    isPicked,
    toggle,
    clear,
    pickSkin,
  }
}
