import Image from "next/image"
import Link from "next/link"

import ParallaxPhoto from "@/components/elements/parallax-photo"
import Reveal from "@/components/elements/reveal"
import { Button } from "@/components/ui/button"
import { brandImages } from "@/lib/images"

const points = [
  "Unhurried visits, so there's room for your questions",
  "Clear explanations of every option and its trade-offs",
  "Decisions made with you, not for you",
]

export default function Approach() {
  return (
    <section className="section-padding container grid items-center gap-10 md:grid-cols-2 lg:gap-20">
      <Reveal className="media aspect-4/5">
        <ParallaxPhoto className="absolute inset-0">
          <Image
            src={brandImages.lifeSilver.src}
            alt={brandImages.lifeSilver.alt}
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover object-[50%_30%]"
          />
        </ParallaxPhoto>
      </Reveal>
      <Reveal delay={0.06}>
        <p className="eyebrow">Our approach</p>
        <h2 className="mt-4 text-4xl md:text-5xl">
          Time to talk, and a plan that makes sense to you.
        </h2>
        <p className="mt-4 max-w-md text-muted-foreground md:text-lg">
          Good psychiatric care depends on understanding the whole person. We
          take the time to listen before we recommend anything.
        </p>
        <ul className="mt-8 space-y-3 border-t pt-6">
          {points.map((point) => (
            <li key={point} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-2.5 size-1.5 shrink-0 rounded-full bg-foreground"
              />
              {point}
            </li>
          ))}
        </ul>
        <Button asChild variant="secondary" className="mt-8">
          <Link href="/about">About the practice</Link>
        </Button>
      </Reveal>
    </section>
  )
}
