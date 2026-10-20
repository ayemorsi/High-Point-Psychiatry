import type { ReactNode } from "react"

import Reveal from "@/components/elements/reveal"
import { cn } from "@/lib/utils"

// shadcnblocks Feature 76: a bordered row of up to four columns, each with an icon tile sitting on the top border.

type Feature76Props = {
  heading: string
  features: { title: string; description: string; icon: ReactNode }[]
  className?: string
}

const MAX_FEATURES = 4

export default function Feature76({
  heading,
  features,
  className,
}: Feature76Props) {
  const items = features.slice(0, MAX_FEATURES)

  return (
    <section className={cn("section-padding relative", className)}>
      <div className="relative z-10 container">
        <div className="flex flex-col gap-14">
          <Reveal>
            <h2 className="px-6 text-4xl md:mb-4 md:text-5xl lg:mb-6 lg:max-w-md lg:px-10">
              {heading}
            </h2>
          </Reveal>
          <Reveal delay={0.06} className="relative mt-6 md:mt-10">
            <div className="absolute top-0 right-0 left-0 h-px bg-border" />
            <div
              className={cn(
                "grid divide-border md:divide-x",
                items.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4"
              )}
            >
              {items.map((feature) => (
                <div
                  key={feature.title}
                  className="relative px-6 pb-14 md:pb-10 lg:px-10"
                >
                  <div className="absolute top-0 right-0 left-0 h-px bg-border md:hidden" />
                  <div className="relative -mt-6 mb-8 flex aspect-square w-12 items-center justify-center bg-background text-accent md:-mt-10 md:mb-10 md:w-20">
                    {feature.icon}
                  </div>
                  <h3 className="mb-3 max-w-56 text-2xl md:mb-4 md:text-3xl">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
            <div className="absolute right-0 bottom-0 left-0 h-px bg-border" />
          </Reveal>
        </div>
      </div>
      <div className="absolute inset-0 container hidden h-full md:block">
        <div className="relative h-full">
          <div className="absolute inset-y-0 left-0 h-full w-px bg-border" />
          <div className="absolute inset-y-0 right-0 h-full w-px bg-border" />
        </div>
      </div>
    </section>
  )
}
