import type { LucideIcon } from "lucide-react"

import type { CONCERNS, SKIN_TYPES } from "@/lib/shop-params"

export type StepId = "cleanse" | "treat" | "moisturize" | "protect" | "sets"

export type Step = {
  id: StepId
  number?: string
  name: string
  job: string
}

export type Concern = (typeof CONCERNS)[number]

export type SkinType = (typeof SKIN_TYPES)[number]

export type ProductBadge = "Bestseller" | "New"

export type ProductImage = {
  src: string
  alt: string
}

export type Ingredient = {
  name: string
  job: string
  image?: ProductImage
}

export type ProductVariant = {
  id: string
  label: string
  price: number
  available?: boolean
}

export type Product = {
  slug: string
  name: string
  descriptor: string
  benefit: string
  step: StepId
  price: number
  compareAtPrice?: number
  size: string
  rating: number
  reviews: number
  badge?: ProductBadge
  bestseller?: boolean
  soldOut?: boolean
  concerns: Concern[]
  skinTypes: SkinType[]
  keyIngredients: Ingredient[]
  /** Slugs of the products inside a set, in the order they go on. */
  contains?: string[]
  /** The routine steps it fills: its own, or everything inside a set. */
  covers: StepId[]
  /** Sizes and refills. Without them the product sells in `size` at `price`. */
  variants?: ProductVariant[]
  howToUse: string
  image?: ProductImage
  hoverImage?: ProductImage
  /** Extra gallery photos after the pack and texture shots. */
  images?: ProductImage[]
}

export type ResultFinding = {
  label: string
  percent: number
}

export type Result = {
  findings: ResultFinding[]
  before: ProductImage
  after: ProductImage
  /** Where the change shows most on the photo, in % of its width. */
  focus: number
}

export type FeaturedFeature = {
  icon: LucideIcon
  label: string
  struck?: boolean
}

export type Featured = {
  slug: string
  features: FeaturedFeature[]
}

export type Article = ArticleFrontmatter & { slug: string }

export type ShopCoverProps = {
  title: string
  lede: string
  image: ProductImage
}

export type BagItem = {
  product: Product
  variant?: ProductVariant
  subscribe?: boolean
  quantity?: number
}

// What the bag shows, copied from the product when it was added, so the bag never needs the catalog.
export type BagSnapshot = {
  name: string
  descriptor: string
  image?: ProductImage
  size: string
  unit: number
  compareAt?: number
  step: StepId
  covers: StepId[]
}

export type StoredBagLine = BagSnapshot & {
  key: string
  slug: string
  variantId: string
  subscribed: boolean
  quantity: number
}

export type BagLine = StoredBagLine & {
  total: number
}

// A product photo on its way from where it was added to the navbar bag button.
export type BagFlight = {
  id: number
  source: "photo" | "button"
  rect: { x: number; y: number; width: number; height: number; radius: number }
  image?: string
  delay: number
}

export type RoutineLength = 2 | 3 | 4

export type RoutineAnswers = {
  skin?: SkinType
  concern?: Concern
  length?: RoutineLength
}

export type StepCard = {
  step: Step
  product: Product
  image: ProductImage
  href: string
  scene: { skin: ProductImage; texture: ProductImage; pack: ProductImage }
}

export type RoutinePick = {
  step: Step
  product: Product
  time: "morning" | "night" | "both"
  /** When it goes on, as the esthetician would say it. */
  when: string
}

export type RoutineResult = {
  picks: RoutinePick[]
  full: number
  total: number
  saved: number
  /** A cheaper way to try the same routine first. */
  set?: Product
}

export type LegalFrontmatter = {
  title: string
  description: string
  /** ISO date, e.g. 2026-09-29. */
  updated: string
}

export type LegalDoc = {
  slug: string
  source: string
  frontmatter: LegalFrontmatter
}

export type FinderQuestion = keyof RoutineAnswers

export type StepFilter = StepId | "all"

export type OfferStatus = "dismissed" | "claimed"

export type Point = { x: number; y: number }
export type Ring = Point[]

export type Review = {
  id: string
  image: ProductImage
  portrait: string
  name: string
  age: number
  skinType: SkinType
  rating: number
  title: string
  body: string
  productSlug: string
}

export type Totals = {
  subtotal: number
  saving: number
  discount?: { code: string; amount: number }
  shipping: number
  total: number
}

export type PlacedOrder = {
  number: string
  email: string
  firstName: string
  address: string[]
  shipping: { label: string; arrives: string }
  lines: BagLine[]
  totals: Totals
}

export type ArticleFrontmatter = {
  title: string
  excerpt: string
  category: string
  readTime: string
  /** ISO date, e.g. 2026-09-22. */
  date: string
  image: ProductImage
  products?: string[]
  /** object-position for the cover photo, for portraits cropped to a banner. */
  focus?: string
}

export type ArticleHeading = {
  id: string
  text: string
}

export type ConcernResult = Result & {
  concern: Concern
  /** The product that does most of the work on this concern. */
  slug: string
  /** Where the comparison divider rests, in % of the width: the middle of the face or the concern on it. */
  divider: number
}

export type TeamMember = {
  name: string
  role: string
  line: string
  image: ProductImage
}

export type Principle = {
  title: string
  body: string
  image: ProductImage & { className?: string }
}
