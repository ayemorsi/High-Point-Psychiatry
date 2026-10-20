import Link from "next/link"

import Reveal from "@/components/elements/reveal"
import { Button } from "@/components/ui/button"

const conditions = [
  "Depression",
  "Anxiety",
  "Panic attacks",
  "ADHD",
  "Bipolar disorder",
  "PTSD and trauma",
  "OCD",
  "Sleep problems",
  "Mood changes",
  "Stress and burnout",
]

export default function Conditions() {
  return (
    <section id="conditions" className="scroll-mt-24 p-2 md:p-3">
      <div className="section-padding rounded-3xl bg-card">
        <div className="container grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">What we treat</p>
            <h2 className="mt-4 text-4xl md:text-5xl">
              You don&apos;t need the right words to reach out.
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground md:text-lg">
              These are some of the concerns we see most. If yours isn&apos;t
              listed, ask us. We&apos;ll tell you honestly whether we&apos;re
              the right fit.
            </p>
            <Button asChild variant="secondary" className="mt-8">
              <Link href="/contact#contact">Ask a question</Link>
            </Button>
          </Reveal>
          <Reveal delay={0.06} className="lg:col-span-7 lg:self-center">
            <ul className="flex flex-wrap gap-2 md:gap-3">
              {conditions.map((condition) => (
                <li
                  key={condition}
                  className="rounded-full border bg-background px-4 py-2.5 text-sm md:px-5 md:py-3 md:text-base"
                >
                  {condition}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
