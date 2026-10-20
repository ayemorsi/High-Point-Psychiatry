"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"

import AddToBagButton from "@/components/elements/add-to-bag-button"
import Price from "@/components/elements/price"
import Rating from "@/components/elements/rating"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { Product, Review } from "@/lib/types"
import { cn, EASE_SOFT } from "@/lib/utils"

type ReviewCardProps = {
  review: Review
  product?: Product
}

type FaceProps = {
  review: Review
  product?: Product
}

export const AVATAR_WIDTH = 40
export const PRODUCT_THUMB_SIZES = "44px"

const TURN = { type: "spring", duration: 0.7, bounce: 0 } as const

// Hover turns it over to the reviewer's photo; on touch a tap anywhere but a control does.
export default function ReviewCard({ review, product }: ReviewCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch") setFlipped(true)
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "touch") setFlipped(false)
      }}
      onPointerUp={(event) => {
        if (event.pointerType !== "touch") return
        if ((event.target as Element).closest("a, button")) return
        setFlipped((value) => !value)
      }}
      className="h-full perspective-distant"
    >
      <motion.div
        initial={false}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={TURN}
        className="relative h-full transform-3d"
      >
        {/* The face turned away is inert, so its controls can't be clicked or tabbed to */}
        <div inert={flipped} className="relative h-full backface-hidden">
          <ReviewFront review={review} product={product} />
        </div>
        <div
          inert={!flipped}
          className="absolute inset-0 rotate-y-180 backface-hidden"
        >
          <PortraitBack review={review} product={product} developed={flipped} />
        </div>
      </motion.div>
    </div>
  )
}

function ReviewFront({ review, product }: FaceProps) {
  return (
    <figure className="flex h-full flex-col rounded-2xl bg-card p-6 md:p-8">
      <Rating value={review.rating} variant="stars" className="self-start" />
      <blockquote className="display-type mt-5 text-2xl leading-snug text-balance">
        “{review.title}”
      </blockquote>
      <p className="mt-3 text-sm text-muted-foreground">{review.body}</p>

      <figcaption className="mt-auto pt-6">
        <div className="flex items-center gap-3 border-t pt-5">
          <Avatar size="lg">
            {/* not AvatarImage: Radix hides the photo until it has loaded */}
            <Image
              src={review.image.src}
              alt={review.image.alt}
              width={AVATAR_WIDTH}
              height={AVATAR_WIDTH}
              className="size-full rounded-full object-cover"
            />
          </Avatar>
          <div>
            <p className="text-sm font-medium">{review.name}</p>
            <p className="text-xs text-muted-foreground">
              {review.age} · {review.skinType} skin
            </p>
          </div>
        </div>

        {product && <ProductRow product={product} className="mt-4" />}
      </figcaption>
    </figure>
  )
}

// The product row sits where the front has it, so the Add button never moves under the pointer.
function PortraitBack({
  review,
  product,
  developed,
}: FaceProps & { developed: boolean }) {
  return (
    <div className="media h-full">
      <motion.div
        initial={false}
        animate={
          developed
            ? { opacity: 1, filter: "blur(0px) saturate(1) brightness(1)" }
            : {
                opacity: 0.85,
                filter: "blur(4px) saturate(0.6) brightness(1.15)",
              }
        }
        transition={
          developed
            ? { duration: 0.8, ease: EASE_SOFT, delay: 0.15 }
            : { duration: 0.2, ease: EASE_SOFT }
        }
        className="absolute inset-0"
      >
        <Image
          src={review.portrait}
          alt={review.image.alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </motion.div>
      <Badge
        variant="secondary"
        className="absolute start-6 top-6 md:start-8 md:top-8"
      >
        {review.name}, {review.age}
      </Badge>
      {product && (
        <ProductRow
          product={product}
          className="absolute inset-x-6 bottom-6 md:inset-x-8 md:bottom-8"
        />
      )}
    </div>
  )
}

// A reader convinced by the quote shouldn't have to go and find the bottle.
function ProductRow({
  product,
  className,
}: {
  product: Product
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl bg-background p-2",
        className
      )}
    >
      <Link
        href={`/products/${product.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-muted"
      >
        {product.image && (
          <Image
            src={product.image.src}
            alt=""
            fill
            sizes={PRODUCT_THUMB_SIZES}
            className="object-cover"
          />
        )}
      </Link>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">
          <Link
            href={`/products/${product.slug}`}
            className="outline-none hover:underline hover:underline-offset-4 focus-visible:underline"
          >
            {product.name}
          </Link>
        </p>
        <Price
          amount={product.price}
          compareAt={product.compareAtPrice}
          className="text-xs text-muted-foreground"
        />
      </div>
      <AddToBagButton
        product={product}
        size="xs"
        label="Add"
        className="shrink-0"
      />
    </div>
  )
}
