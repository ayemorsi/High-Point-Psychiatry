import Image from "next/image"
import Link from "next/link"

import AddToBagButton from "@/components/elements/add-to-bag-button"
import Price, { savingsPercent } from "@/components/elements/price"
import Rating from "@/components/elements/rating"
import { LogoMark } from "@/components/icons/logo"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"
import { cn } from "@/lib/utils"

export const PRODUCT_CARD_SIZES =
  "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"

type ProductCardProps = {
  product: Product
  sizes?: string
  /** Off where the section heading already says what the badge would. */
  badge?: boolean
  className?: string
}

export default function ProductCard({
  product,
  sizes = PRODUCT_CARD_SIZES,
  badge = true,
  className,
}: ProductCardProps) {
  const { name, descriptor, price, compareAtPrice, image, hoverImage } = product

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <div className="media aspect-4/5">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            className="object-cover transition-[scale] duration-700 ease-soft group-hover:scale-103"
          />
        ) : (
          <LogoMark className="absolute inset-0 m-auto size-10 text-foreground/15" />
        )}
        {hoverImage && (
          <Image
            src={hoverImage.src}
            alt=""
            fill
            sizes={sizes}
            className="object-cover opacity-0 transition duration-700 ease-soft group-hover:scale-103 group-hover:opacity-100"
          />
        )}
        {badge && <CardBadge product={product} />}
        <AddToBagButton
          product={product}
          size="sm"
          compact
          className="absolute right-3 bottom-3 z-10 md:inset-x-3 md:translate-y-1 md:opacity-0 md:transition md:duration-300 md:ease-soft md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100 md:group-hover:translate-y-0 md:group-hover:opacity-100"
        />
      </div>
      <div className="mt-3 flex items-start justify-between gap-3 text-sm">
        <h3 className="sans-heading">
          <Link
            href={`/products/${product.slug}`}
            className="outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-3 focus-visible:after:ring-ring/50"
          >
            {name}
          </Link>
        </h3>
        <Price amount={price} compareAt={compareAtPrice} />
      </div>
      <p className="mt-0.5 text-sm text-muted-foreground">{descriptor}</p>
      <Rating value={product.rating} count={product.reviews} className="mt-2" />
    </article>
  )
}

function CardBadge({ product }: { product: Product }) {
  const badge = getCardBadge(product)
  if (!badge) return null

  return (
    <Badge variant={badge.variant} className="absolute top-3 left-3">
      {badge.label}
    </Badge>
  )
}

// One badge per card, in priority order: sold out, saving, then merchandising.
function getCardBadge({ soldOut, price, compareAtPrice, badge }: Product) {
  if (soldOut) return { label: "Sold out", variant: "secondary" } as const
  if (compareAtPrice && compareAtPrice > price)
    return {
      label: `Save ${savingsPercent(price, compareAtPrice)}%`,
      variant: "accent",
    } as const
  if (badge)
    return {
      label: badge,
      variant: badge === "New" ? "secondary" : "default",
    } as const
  return null
}
