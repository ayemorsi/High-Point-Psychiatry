"use client"

import { useRef, useState } from "react"
import Image from "next/image"

import type { ProductImage } from "@/lib/types"
import { cn } from "@/lib/utils"

type ProductGalleryProps = {
  images: ProductImage[]
  className?: string
}

// One sizes string for both layouts, so the first photo resolves to the same file and loads once.
const SIZES = "(min-width: 1024px) 50vw, (min-width: 768px) 66vw, 100vw"

export default function ProductGallery({
  images,
  className,
}: ProductGalleryProps) {
  const [active, setActive] = useState(0)
  const row = useRef<HTMLUListElement>(null)

  const onScroll = () => {
    const list = row.current
    const slide = list?.firstElementChild as HTMLElement | null
    if (!list || !slide) return
    const step =
      slide.offsetWidth + parseFloat(getComputedStyle(list).columnGap)
    setActive(Math.round(list.scrollLeft / step))
  }

  const scrollTo = (index: number) => {
    const slide = row.current?.children[index] as HTMLElement | undefined
    slide?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    })
  }

  return (
    <div className={cn("min-w-0 lg:sticky lg:top-24 lg:self-start", className)}>
      <div className="lg:hidden">
        <ul
          ref={row}
          onScroll={onScroll}
          aria-label="Product photos"
          className="-mx-4 no-scrollbar flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 md:-mx-6 md:scroll-px-6 md:px-6"
        >
          {images.map((image, index) => (
            <li
              key={image.src}
              className="media aspect-4/5 shrink-0 basis-full snap-start md:basis-2/3"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                preload={index === 0}
                sizes={SIZES}
                className="object-cover"
              />
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-center gap-1">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              aria-label={`Show photo ${index + 1} of ${images.length}`}
              aria-current={index === active}
              onClick={() => scrollTo(index)}
              className="grid size-6 place-items-center rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <span
                className={cn(
                  "size-1.5 rounded-full bg-foreground/20 transition-colors duration-200",
                  index === active && "bg-foreground"
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="hidden gap-4 lg:flex">
        <ul className="w-18 shrink-0 space-y-3">
          {images.map((image, index) => (
            <li key={image.src}>
              <button
                type="button"
                aria-label={`Show ${image.alt.charAt(0).toLowerCase()}${image.alt.slice(1)}`}
                aria-current={index === active}
                onClick={() => setActive(index)}
                className={cn(
                  "media block aspect-4/5 w-full rounded-xl opacity-60 ring-offset-2 ring-offset-background transition duration-200 outline-none hover:opacity-100 focus-visible:ring-3 focus-visible:ring-ring/50",
                  index === active && "opacity-100 ring-1 ring-foreground"
                )}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="72px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
        <div className="media aspect-4/5 flex-1">
          {images.map((image, index) => (
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              fill
              preload={index === 0}
              sizes={SIZES}
              aria-hidden={index !== active}
              className={cn(
                "object-cover opacity-0 transition-opacity duration-700 ease-soft",
                index === active && "opacity-100"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
