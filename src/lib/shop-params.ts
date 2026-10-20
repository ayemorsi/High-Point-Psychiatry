import {
  createLoader,
  createParser,
  createSerializer,
  type inferParserType,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsStringLiteral,
} from "nuqs/server"

import { steps } from "@/lib/steps"
import type { StepId } from "@/lib/types"

export const CONCERNS = [
  "Dryness",
  "Dullness",
  "Fine lines",
  "Redness",
  "Oiliness",
  "Dark spots",
] as const

export const SKIN_TYPES = ["Dry", "Oily", "Combination", "Sensitive"] as const

const SORTS = [
  "bestselling",
  "newest",
  "price-low",
  "price-high",
  "rating",
] as const

export type Sort = (typeof SORTS)[number]

const toSlug = (label: string) => label.toLowerCase().replaceAll(" ", "-")

// Labels travel as slugs (`?concern=dark-spots`); anything else in the URL is dropped.
function parseAsLabel<T extends string>(labels: readonly T[]) {
  return createParser({
    parse: (value) => labels.find((label) => toSlug(label) === value) ?? null,
    serialize: toSlug,
  })
}

// The shop's filters live in the query string, shared by /shop and every /shop/[step] page.
export const shopParams = {
  concern: parseAsArrayOf(parseAsLabel(CONCERNS)).withDefault([]),
  skin: parseAsArrayOf(parseAsLabel(SKIN_TYPES)).withDefault([]),
  bestsellers: parseAsBoolean.withDefault(false),
  sort: parseAsStringLiteral(SORTS).withDefault("bestselling"),
}

export type ShopFilters = inferParserType<typeof shopParams>

export const defaultFilters = createLoader(shopParams)(new URLSearchParams())

// Builds a typed shop link, leaving defaults out: shopHref("/shop", { bestsellers: true }).
export const shopHref = createSerializer(shopParams)

export const bestsellersHref = shopHref("/shop", { bestsellers: true })

export function isStepId(value: string): value is StepId {
  return steps.some((step) => step.id === value)
}
