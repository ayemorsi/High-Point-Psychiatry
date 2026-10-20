import { routinePrice } from "@/lib/pricing"
import { getStep, routineStepIds } from "@/lib/steps"
import type {
  Concern,
  Product,
  RoutineLength,
  RoutinePick,
  RoutineResult,
  SkinType,
} from "@/lib/types"

// The routine the founder would write for each skin type, in step order.
const routineSlugs: Record<SkinType, string[]> = {
  Dry: ["oil-cleanser", "hyaluronic-serum", "barrier-cream", "daily-spf-40"],
  Oily: ["milk-cleanser", "niacinamide-serum", "gel-cream", "daily-spf-40"],
  Combination: [
    "milk-cleanser",
    "vitamin-c-serum",
    "gel-cream",
    "daily-spf-40",
  ],
  Sensitive: [
    "milk-cleanser",
    "hyaluronic-serum",
    "barrier-cream",
    "daily-spf-40",
  ],
}

const find = (products: Product[], slug: string) =>
  products.find((product) => product.slug === slug)

export function getRoutine(products: Product[], skinType: SkinType) {
  return routineSlugs[skinType]
    .map((slug) => find(products, slug))
    .filter((product) => product !== undefined)
}

// The serum for each concern, best first; the first one that suits the skin type wins.
const treatFor: Record<Concern, string[]> = {
  Dryness: ["hyaluronic-serum"],
  Dullness: ["vitamin-c-serum", "hyaluronic-serum"],
  "Fine lines": ["retinal-night-serum", "hyaluronic-serum"],
  Redness: ["niacinamide-serum", "hyaluronic-serum"],
  Oiliness: ["niacinamide-serum", "hyaluronic-serum"],
  "Dark spots": ["vitamin-c-serum", "retinal-night-serum", "hyaluronic-serum"],
}

const timing: Record<string, Pick<RoutinePick, "time" | "when">> = {
  "vitamin-c-serum": { time: "morning", when: "Mornings" },
  "retinal-night-serum": {
    time: "night",
    when: "Two nights a week to start",
  },
  "daily-spf-40": { time: "morning", when: "Every morning" },
  "tinted-spf-30": { time: "morning", when: "Every morning" },
}

// The skin type's routine, with serum and SPF chosen for the concern, cut to the steps she'll do.
export function buildRoutine(
  products: Product[],
  skin: SkinType,
  concern: Concern,
  length: RoutineLength
): RoutineResult {
  const suits = (product?: Product) =>
    !!product && !product.soldOut && product.skinTypes.includes(skin)
  // A sold-out pick gives way to the most reviewed single in its step that suits the skin.
  const inStock = (product?: Product) => {
    if (!product || suits(product)) return product
    return products
      .filter((item) => item.step === product.step && suits(item))
      .sort((a, b) => b.reviews - a.reviews)[0]
  }

  const [cleanse, baseTreat, moisturize, dailySpf] = routineSlugs[skin].map(
    (slug) => find(products, slug)
  )
  const treat =
    treatFor[concern].map((slug) => find(products, slug)).find(suits) ??
    inStock(baseTreat)
  const tinted = find(products, "tinted-spf-30")
  const protect =
    (concern === "Redness" || concern === "Dark spots") && suits(tinted)
      ? tinted
      : inStock(dailySpf)

  // Two steps are the ones that do the work; a third is the cream when skin is dry, the cleanser otherwise.
  const needsCream =
    skin === "Dry" || skin === "Sensitive" || concern === "Dryness"
  const keep =
    length === 4
      ? [inStock(cleanse), treat, inStock(moisturize), protect]
      : length === 3
        ? needsCream
          ? [treat, inStock(moisturize), protect]
          : [inStock(cleanse), treat, protect]
        : [treat, protect]

  const picks: RoutinePick[] = keep.flatMap((product) => {
    const step = product && getStep(product.step)
    return product && step
      ? [
          {
            step,
            product,
            ...(timing[product.slug] ?? {
              time: "both",
              when: "Morning and night",
            }),
          },
        ]
      : []
  })

  const price = routinePrice(picks.map((pick) => pick.product))
  // The cheapest set that holds the whole routine, to try it first.
  const set =
    picks.length === routineStepIds.length
      ? products
          .filter(
            (product) =>
              product.step === "sets" &&
              !product.soldOut &&
              routineStepIds.every((step) => product.covers.includes(step))
          )
          .sort((a, b) => a.price - b.price)[0]
      : undefined

  return { picks, ...price, set }
}
