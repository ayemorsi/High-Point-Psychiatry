"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

import AddToBagButton from "@/components/elements/add-to-bag-button"
import Rating from "@/components/elements/rating"
import Reveal from "@/components/elements/reveal"
import { LogoMark } from "@/components/icons/logo"
import { StruckIcon } from "@/components/icons/struck-icon"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { featured } from "@/lib/featured"
import { getVariants } from "@/lib/pricing"
import type { FeaturedFeature, Product } from "@/lib/types"

// The jar's own label, printed large: name, descriptor, who it suits and what's in it, then size and add.
export default function Featured({ product }: { product: Product }) {
  const sizes = getVariants(product)
  const [size, setSize] = useState(sizes[0])

  return (
    <section className="section-padding container">
      <Reveal className="relative grid overflow-hidden rounded-3xl bg-card lg:grid-cols-2">
        <div className="relative aspect-4/5 lg:aspect-auto">
          {product.image && (
            <Image
              src={product.image.src}
              alt={product.image.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          )}
        </div>

        <div className="p-3 md:p-6 lg:p-10">
          <article className="h-full rounded-2xl bg-background p-6 md:p-8 lg:p-10">
            <header className="flex items-start justify-between gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl">{product.name}</h2>
                <p className="mt-2 text-lg text-muted-foreground">
                  {product.descriptor}
                </p>
              </div>
              <LogoMark className="size-8 shrink-0" aria-hidden="true" />
            </header>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {featured.features.map((feature) => (
                <li
                  key={feature.label}
                  className="flex items-center gap-3 text-sm font-medium"
                >
                  <FeatureIcon feature={feature} />
                  {feature.label}
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl bg-card px-5 py-4">
              <p className="text-sm font-medium">What&apos;s in it</p>
              <ul className="mt-1 divide-y">
                {product.keyIngredients.map((ingredient) => (
                  <li
                    key={ingredient.name}
                    className="flex flex-col gap-1 py-2.5 text-sm last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <span className="font-medium">{ingredient.name}</span>
                    <span className="text-muted-foreground sm:text-end">
                      {ingredient.job}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t pt-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p id="featured-size" className="text-sm font-medium">
                    Size:{" "}
                    <span className="text-muted-foreground">{size.label}</span>
                  </p>
                  <ToggleGroup
                    type="single"
                    variant="outline"
                    value={size.id}
                    onValueChange={(id) => {
                      const next = sizes.find((item) => item.id === id)
                      if (next) setSize(next)
                    }}
                    aria-labelledby="featured-size"
                    className="mt-3 flex-wrap"
                  >
                    {sizes.map((item) => (
                      <ToggleGroupItem key={item.id} value={item.id}>
                        {item.label}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
                <Rating value={product.rating} count={product.reviews} />
              </div>
              <AddToBagButton
                product={product}
                productVariant={size}
                size="lg"
                className="mt-6 w-full"
              />
              <Button asChild variant="link" className="mt-4">
                <Link href={`/products/${product.slug}`}>
                  View full details
                </Link>
              </Button>
            </div>
          </article>
        </div>
      </Reveal>
    </section>
  )
}

function FeatureIcon({ feature }: { feature: FeaturedFeature }) {
  return (
    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-card">
      {feature.struck ? (
        <StruckIcon icon={feature.icon} className="size-5" />
      ) : (
        <feature.icon
          aria-hidden="true"
          strokeWidth={1.25}
          className="size-5"
        />
      )}
    </span>
  )
}
