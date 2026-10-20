import Image from "next/image"

import Reveal from "@/components/elements/reveal"
import SectionHeading from "@/components/elements/section-heading"
import { getResult, study } from "@/lib/results"
import type { Product, ProductImage } from "@/lib/types"

// Shows the study for the concern this product is bought for first.
export default function ProductResults({ product }: { product: Product }) {
  const result = getResult(product.concerns[0])
  if (!result) return null
  const { findings, before, after, focus } = result
  const [lead, ...rest] = findings

  return (
    <section className="section-padding container">
      <Reveal>
        <SectionHeading
          title="Eight weeks in"
          lede={`${study.women} women used the full routine for eight weeks.`}
        />
      </Reveal>

      <Reveal delay={0.06} className="mt-10 md:mt-14">
        <ul className="grid grid-cols-2 gap-3 md:gap-4 lg:h-160 lg:grid-cols-12 lg:grid-rows-2">
          <li className="media col-span-2 aspect-4/5 md:aspect-3/2 lg:col-span-7 lg:row-span-2 lg:aspect-auto">
            <Photo
              image={after}
              label="Week 8"
              focus={focus}
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
          </li>

          <li className="media col-span-2 grid grid-cols-2 lg:col-span-5">
            <div className="relative min-h-60 md:min-h-64">
              <Photo
                image={before}
                label="Week 0"
                focus={focus}
                sizes="(min-width: 1024px) 20vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-between p-5 md:p-8">
              <h3 className="sans-heading text-base md:text-lg">
                {lead.label}
                <sup className="ml-0.5 text-muted-foreground">*</sup>
              </h3>
              <div>
                <p className="display-type figures text-5xl leading-none md:text-7xl">
                  {lead.percent}%
                </p>
                <p className="mt-4 text-sm text-balance text-muted-foreground">
                  Of the {study.women} women, at week {study.weeks}.
                </p>
              </div>
            </div>
          </li>

          <li className="col-span-2 flex flex-col justify-between gap-8 rounded-2xl bg-card p-5 md:p-8 lg:col-span-5">
            <h3 className="sans-heading text-base md:text-lg">
              Also at week 8
            </h3>
            <ul className="divide-y border-t">
              {rest.map((finding) => (
                <li
                  key={finding.label}
                  className="grid grid-cols-[5rem_1fr] items-baseline gap-4 py-4 last:pb-0 md:grid-cols-[7rem_1fr] md:py-5"
                >
                  <p className="display-type figures text-3xl md:text-4xl">
                    {finding.percent}%
                  </p>
                  <p className="text-lg">
                    {finding.label}
                    <sup className="ml-0.5 text-muted-foreground">*</sup>
                  </p>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </Reveal>

      <p className="mt-6 max-w-md text-xs text-muted-foreground md:mt-8">
        *{study.note}
      </p>
    </section>
  )
}

type PhotoProps = {
  image: ProductImage
  label: string
  focus: number
  sizes: string
}

function Photo({ image, label, focus, sizes }: PhotoProps) {
  return (
    <>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        className="object-cover"
        style={{ objectPosition: `${focus}% 50%` }}
      />
      <span className="figures absolute start-3 top-3 rounded-full bg-background/85 px-3 py-1.5 text-xs font-medium backdrop-blur-sm md:start-4 md:top-4 md:text-sm">
        {label}
      </span>
    </>
  )
}
