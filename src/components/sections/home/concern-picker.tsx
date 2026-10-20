"use client"

import { useState } from "react"
import Image from "next/image"

import PreloadImages from "@/components/elements/preload-images"
import ProductCard, {
  PRODUCT_CARD_SIZES,
} from "@/components/elements/product-card"
import Reveal from "@/components/elements/reveal"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { homeImages } from "@/lib/images"
import type { Concern, Product } from "@/lib/types"

const concerns = [
  { name: "Dryness", image: homeImages.concernDryness },
  { name: "Dullness", image: homeImages.concernDullness },
  { name: "Fine lines", image: homeImages.concernFineLines },
  { name: "Redness", image: homeImages.concernRedness },
  { name: "Oiliness", image: homeImages.concernOiliness },
  { name: "Dark spots", image: homeImages.concernDarkSpots },
] satisfies { name: Concern; image: { src: string } }[]

const forConcern = (products: Product[], concern: Concern) =>
  products
    .filter(
      (product) => product.step !== "sets" && product.concerns.includes(concern)
    )
    .slice(0, 4)

export default function ConcernPicker({ products }: { products: Product[] }) {
  // Only concerns that fill a whole row, so the row never jumps in height.
  const shown = concerns.filter(
    (concern) => forConcern(products, concern.name).length === 4
  )
  const [active, setActive] = useState<Concern | undefined>(shown[0]?.name)
  if (!active) return null

  const otherPhotos = shown
    .filter((concern) => concern.name !== active)
    .flatMap((concern) => forConcern(products, concern.name))
    .flatMap((product) => (product.image ? [product.image.src] : []))

  return (
    <section className="section-padding container">
      <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-4xl md:text-5xl">Shop by skin concern</h2>
        <ToggleGroup
          type="single"
          variant="image"
          size="image"
          spacing={1}
          value={active}
          onValueChange={(value) => value && setActive(value as Concern)}
          aria-label="Skin concern"
          className="-mx-4 no-scrollbar w-auto overflow-x-auto mask-r-from-85% px-4 py-1 md:mx-0 md:mask-none md:px-0"
        >
          {shown.map((concern) => (
            <ToggleGroupItem key={concern.name} value={concern.name}>
              <span className="relative size-12 overflow-hidden rounded-full bg-card ring-2 ring-transparent ring-offset-2 ring-offset-background transition duration-300 ease-soft group-hover/toggle:ring-border group-focus-visible/toggle:ring-ring group-data-[state=on]/toggle:ring-foreground md:size-14">
                <Image
                  src={concern.image.src}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover transition duration-500 ease-soft group-hover/toggle:scale-105"
                />
              </span>
              {concern.name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </Reveal>

      <ul key={active} className="swap product-row mt-8 md:mt-10">
        {forConcern(products, active).map((product) => (
          <li key={product.slug}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
      <PreloadImages srcs={otherPhotos} sizes={PRODUCT_CARD_SIZES} />
    </section>
  )
}
