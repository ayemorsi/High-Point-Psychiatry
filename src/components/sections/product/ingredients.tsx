import Image from "next/image"

import ProductCard from "@/components/elements/product-card"
import Reveal from "@/components/elements/reveal"
import SectionHeading from "@/components/elements/section-heading"
import { getProducts } from "@/lib/products"
import type { Ingredient, Product } from "@/lib/types"
import { cn } from "@/lib/utils"

// A set lists the products inside it; everything else shows what does the work.
export default async function ProductIngredients({
  product,
}: {
  product: Product
}) {
  if (!product.contains) return <Diagram product={product} />

  const products = await getProducts()
  const inside = product.contains
    .map((slug) => products.find((item) => item.slug === slug))
    .filter((item) => item !== undefined)

  return (
    <section className="section-padding container">
      <Reveal>
        <SectionHeading
          title="What's in the set"
          lede="In the order they go on."
        />
      </Reveal>
      <Reveal delay={0.06} className="mt-10 md:mt-14">
        <ul className="product-grid">
          {inside.map((item) => (
            <li key={item.slug}>
              <ProductCard product={item} />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}

// Where each callout sits around the bottle on desktop: two on the left, one on the right.
const placements = [
  "lg:col-start-1 lg:row-start-1",
  "lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:self-center",
  "lg:col-start-1 lg:row-start-2",
]

function Diagram({ product }: { product: Product }) {
  const found = product.keyIngredients.slice(0, placements.length)
  if (found.length === 0) return null

  return (
    <section className="p-2 md:p-3">
      <div className="section-padding container rounded-3xl bg-card">
        <Reveal>
          <SectionHeading title="What's in it" align="center" />
        </Reveal>
        <Reveal
          delay={0.06}
          className="mt-10 grid items-center gap-10 md:mt-14 lg:grid-cols-[1fr_minmax(0,22rem)_1fr] lg:gap-0"
        >
          <div className="media mx-auto aspect-4/5 w-full max-w-sm bg-background lg:col-start-2 lg:row-start-1">
            {product.image && (
              <Image
                src={product.image.src}
                alt={product.image.alt}
                fill
                sizes="(min-width: 1024px) 22rem, 90vw"
                className="object-cover"
              />
            )}
          </div>
          <ul className="grid gap-6 lg:col-span-3 lg:col-start-1 lg:row-start-1 lg:grid-cols-subgrid lg:gap-x-0 lg:gap-y-28">
            {found.map((ingredient, index) => (
              <Callout
                key={ingredient.name}
                ingredient={ingredient}
                side={index === 1 ? "right" : "left"}
                className={placements[index]}
              />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

// The leader line runs from the photo to a pearl on the bottle's edge; phones drop it and stack.
function Callout({
  ingredient,
  side,
  className,
}: {
  ingredient: Ingredient
  side: "left" | "right"
  className?: string
}) {
  return (
    <li
      className={cn(
        "flex items-center gap-4",
        side === "left" && "lg:flex-row-reverse lg:text-right",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "relative hidden h-px flex-1 bg-foreground/25 after:absolute after:top-1/2 after:size-2 after:-translate-y-1/2 after:rounded-full after:bg-foreground lg:block",
          side === "left" ? "after:-right-1" : "after:-left-1"
        )}
      />
      <span className="relative size-20 shrink-0 overflow-hidden rounded-full bg-background md:size-24">
        {ingredient.image && (
          <Image
            src={ingredient.image.src}
            alt={ingredient.image.alt}
            fill
            sizes="96px"
            className="object-cover"
          />
        )}
      </span>
      <div className="min-w-0 lg:max-w-52">
        <h3 className="text-2xl">{ingredient.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{ingredient.job}.</p>
      </div>
    </li>
  )
}
