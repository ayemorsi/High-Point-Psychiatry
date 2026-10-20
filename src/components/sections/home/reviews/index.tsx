"use client"

import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import PreloadImages from "@/components/elements/preload-images"
import Rating from "@/components/elements/rating"
import Reveal from "@/components/elements/reveal"
import ReviewCard, {
  AVATAR_WIDTH,
  PRODUCT_THUMB_SIZES,
} from "@/components/sections/home/reviews/review-card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { reviews } from "@/lib/reviews"
import { SKIN_TYPES } from "@/lib/shop-params"
import { site } from "@/lib/site"
import type { Product, SkinType } from "@/lib/types"
import { EASE_SOFT } from "@/lib/utils"

type SkinFilter = "All" | SkinType

const filters: SkinFilter[] = ["All", ...SKIN_TYPES]

const LIMIT = 6

export default function Reviews({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<SkinFilter>("All")
  const reduceMotion = useReducedMotion()
  const rise = reduceMotion ? "0px" : "8px"

  const matching = forFilter(filter)
  const others = filters
    .filter((option) => option !== filter)
    .flatMap(forFilter)

  return (
    <section className="section-padding container overflow-x-clip">
      <Reveal>
        <header className="flex items-baseline-last justify-between gap-10">
          <h2 className="text-4xl md:text-5xl">What our customers say</h2>
          <Rating
            value={site.rating.score}
            count={site.rating.count}
            variant="stars"
            className="hidden shrink-0 md:inline-flex"
          />
        </header>
      </Reveal>

      <Reveal delay={0.06}>
        <ToggleGroup
          type="single"
          variant="outline"
          value={filter}
          onValueChange={(value) => value && setFilter(value as SkinFilter)}
          aria-label="Skin type"
          className="mt-8 flex-wrap"
        >
          {filters.map((option) => (
            <ToggleGroupItem key={option} value={option}>
              {option}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </Reveal>

      <Reveal delay={0.12} className="mt-10 min-h-64">
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={filter}
            initial={{
              opacity: 0,
              filter: "blur(4px)",
              transform: `translateY(${rise})`,
            }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              transform: "translateY(0px)",
            }}
            exit={{
              opacity: 0,
              filter: "blur(4px)",
              transform: `translateY(-${rise})`,
            }}
            transition={{ duration: 0.22, ease: EASE_SOFT }}
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {matching.map((review) => (
              <li key={review.id} className="grid max-md:nth-[n+4]:hidden">
                <ReviewCard
                  review={review}
                  product={products.find(
                    (product) => product.slug === review.productSlug
                  )}
                />
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
        <PreloadImages
          srcs={others.map((review) => review.image.src)}
          width={AVATAR_WIDTH}
        />
        <PreloadImages
          srcs={others.flatMap((review) => {
            const product = products.find(
              (item) => item.slug === review.productSlug
            )
            return product?.image ? [product.image.src] : []
          })}
          sizes={PRODUCT_THUMB_SIZES}
        />
      </Reveal>
    </section>
  )
}

function forFilter(filter: SkinFilter) {
  return reviews
    .filter((review) => filter === "All" || review.skinType === filter)
    .slice(0, LIMIT)
}
