import Image from "next/image"
import { Check } from "lucide-react"

import Reveal from "@/components/elements/reveal"
import type { SiteImage } from "@/lib/types"
import { cn } from "@/lib/utils"

// shadcnblocks Feature 7: a checklist beside a square image, on the site's type and tokens.

type Feature7Props = {
  heading: string
  description: string
  image: SiteImage
  features: string[]
  className?: string
}

const MAX_FEATURES = 5

export default function Feature7({
  heading,
  description,
  image,
  features,
  className,
}: Feature7Props) {
  return (
    <section className={cn("section-padding", className)}>
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="media relative order-2 aspect-square w-full lg:order-1">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-[50%_25%]"
            />
          </Reveal>
          <Reveal
            delay={0.06}
            className="order-1 flex flex-col lg:order-2 lg:items-start lg:text-left"
          >
            <h2 className="mb-6 text-4xl text-pretty md:text-5xl">{heading}</h2>
            <p className="mb-8 max-w-xl text-muted-foreground md:text-lg">
              {description}
            </p>
            <ul className="space-y-4 text-left">
              {features.slice(0, MAX_FEATURES).map((item) => (
                <li key={item} className="flex items-start gap-3 md:text-lg">
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 size-5 shrink-0 text-accent md:mt-1"
                  />
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
