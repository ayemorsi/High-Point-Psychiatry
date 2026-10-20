import Image from "next/image"

import SectionHeading from "@/components/elements/section-heading"
import { aboutImages, brandImages } from "@/lib/images"
import type { Principle } from "@/lib/types"
import { cn } from "@/lib/utils"

const principles: Principle[] = [
  {
    title: "One job each",
    body: "Every product does one thing, and the name says what. If two did the same job, one of them would not exist.",
    image: brandImages.productFlatlay,
  },
  {
    title: "Made in batches of 400",
    body: "Small enough to check every batch before it ships, and nothing sits in a warehouse losing strength.",
    image: aboutImages.standardsMixing,
  },
  {
    title: "Shown as it is",
    body: "Women from their 20s to their 60s. Pores, lines and freckles stay where they are.",
    image: { ...brandImages.portraitSilver, className: "object-top" },
  },
]

const offsets = ["md:top-28", "md:top-32", "md:top-36"]

// From md each panel sticks a little lower than the last, so they pile up as you scroll.
export default function AboutPrinciples() {
  return (
    <section className="section-padding container">
      <SectionHeading title="How we make it" />
      <ul className="mt-10 space-y-3 md:mt-14 md:space-y-0">
        {principles.map((principle, index) => (
          <li
            key={principle.title}
            className={cn(
              "md:sticky md:mb-[20svh] md:last:mb-0",
              offsets[index]
            )}
          >
            <div
              className={cn(
                "grid overflow-hidden rounded-3xl bg-card md:h-[min(34rem,70svh)] md:grid-cols-2",
                index === 1 && "dark bg-background text-foreground"
              )}
            >
              <div
                className={cn(
                  "relative aspect-4/3 md:aspect-auto",
                  index % 2 === 1 && "md:order-2"
                )}
              >
                <Image
                  src={principle.image.src}
                  alt={principle.image.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className={cn("object-cover", principle.image.className)}
                />
              </div>
              <div className="flex flex-col justify-end p-6 md:p-10 lg:p-14">
                <h3 className="text-3xl md:text-4xl lg:text-5xl">
                  {principle.title}
                </h3>
                <p className="mt-4 max-w-md text-muted-foreground md:text-lg">
                  {principle.body}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
