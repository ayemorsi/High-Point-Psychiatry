import { homeImages } from "@/lib/images"
import { routineSteps } from "@/lib/steps"
import type { Concern, ConcernResult } from "@/lib/types"
import { spell } from "@/lib/utils"

const women = 112
const ages = "24 to 67"
const weeks = 8

export const study = {
  women,
  ages,
  weeks,
  note: `Consumer perception study, ${women} women aged ${ages}, ${weeks} weeks, full ${spell(routineSteps.length)}-step routine. Photos are illustrative.`,
}

// Findings lead with the headline figure the product page shows large.
export const results: ConcernResult[] = [
  {
    concern: "Dryness",
    slug: "barrier-cream",
    findings: [
      { label: "Skin felt less tight", percent: 91 },
      { label: "Skin felt softer", percent: 88 },
      { label: "Fewer dry patches", percent: 83 },
    ],
    before: homeImages.concernDryness,
    after: homeImages.concernDrynessAfter,
    focus: 75,
    divider: 68,
  },
  {
    concern: "Dullness",
    slug: "vitamin-c-serum",
    findings: [
      { label: "Tone looked more even", percent: 87 },
      { label: "Skin looked brighter", percent: 85 },
      { label: "Skin looked more rested", percent: 79 },
    ],
    before: homeImages.concernDullness,
    after: homeImages.concernDullnessAfter,
    focus: 50,
    divider: 47,
  },
  {
    concern: "Fine lines",
    slug: "retinal-night-serum",
    findings: [
      { label: "Lines looked softer", percent: 78 },
      { label: "Skin looked smoother", percent: 81 },
      { label: "Skin felt firmer", percent: 74 },
    ],
    before: homeImages.concernFineLines,
    after: homeImages.concernFineLinesAfter,
    focus: 80,
    divider: 72,
  },
  {
    concern: "Redness",
    slug: "milk-cleanser",
    findings: [
      { label: "Redness looked calmer", percent: 84 },
      { label: "Skin felt more comfortable", percent: 89 },
      { label: "Skin felt less reactive", percent: 80 },
    ],
    before: homeImages.concernRedness,
    after: homeImages.concernRednessAfter,
    focus: 55,
    divider: 45,
  },
  {
    concern: "Oiliness",
    slug: "niacinamide-serum",
    findings: [
      { label: "Less shine by midday", percent: 82 },
      { label: "Makeup lasted longer", percent: 76 },
      { label: "Pores looked smaller", percent: 71 },
    ],
    before: homeImages.concernOiliness,
    after: homeImages.concernOilinessAfter,
    focus: 45,
    divider: 44,
  },
  {
    concern: "Dark spots",
    slug: "daily-spf-40",
    findings: [
      { label: "Spots looked lighter", percent: 76 },
      { label: "Tone looked more even", percent: 83 },
      { label: "Skin looked brighter", percent: 80 },
    ],
    before: homeImages.concernDarkSpots,
    after: homeImages.concernDarkSpotsAfter,
    focus: 38,
    divider: 60,
  },
]

export function getResult(concern: Concern) {
  return results.find((result) => result.concern === concern)
}
