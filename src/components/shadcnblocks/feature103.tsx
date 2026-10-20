import Link from "next/link"
import { ArrowRight } from "lucide-react"

import Reveal from "@/components/elements/reveal"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// shadcnblocks Feature 103: a badge and heading over bordered link cards with circular arrows.

type Feature103Props = {
  badge: string
  heading: string
  items: { title: string; description: string; href: string }[]
  className?: string
}

export default function Feature103({
  badge,
  heading,
  items,
  className,
}: Feature103Props) {
  return (
    <section className={cn("section-padding", className)}>
      <div className="container">
        <Reveal className="flex flex-col gap-3">
          <Badge variant="outline" className="w-fit uppercase">
            {badge}
          </Badge>
          <h2 className="text-4xl md:text-5xl">{heading}</h2>
        </Reveal>
        <Reveal
          delay={0.06}
          className={cn(
            "mt-10 grid gap-4 md:gap-6",
            items.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
          )}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col gap-4 rounded-2xl border p-6 transition-colors duration-200 hover:border-accent"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-2xl">{item.title}</h3>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                  <ArrowRight aria-hidden="true" className="h-auto w-4" />
                </span>
              </div>
              <p className="text-muted-foreground">{item.description}</p>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
