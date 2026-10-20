import { CheckIcon } from "lucide-react"

import Reveal from "@/components/elements/reveal"
import { insuranceGroups } from "@/lib/insurance"
import { site } from "@/lib/site"

export default function AboutInsurance() {
  return (
    <section id="insurance" className="scroll-mt-24 p-2 md:p-3">
      <div className="section-padding rounded-3xl bg-card">
        <div className="container">
          <Reveal className="grid gap-6 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="eyebrow">Insurance</p>
              <h2 className="mt-4 text-4xl md:text-5xl">Plans we accept</h2>
            </div>
            <p className="max-w-xl text-muted-foreground md:text-lg lg:col-span-7 lg:self-end">
              We work with Medicare, Medicaid and many of their plans in
              Michigan. Coverage can vary by plan, so call us at{" "}
              <a
                href={site.phone.href}
                className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
              >
                {site.phone.display}
              </a>{" "}
              and we&apos;ll confirm yours before your first visit.
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-3 md:mt-14 md:grid-cols-3 md:gap-4">
            {insuranceGroups.map((group, index) => (
              <li key={group.title}>
                <Reveal
                  delay={index * 0.06}
                  className="h-full rounded-2xl bg-background p-6 md:p-8"
                >
                  <h3 className="text-2xl md:text-3xl">{group.title}</h3>
                  <ul className="mt-5 space-y-2.5 text-sm md:text-base">
                    {group.plans.map((plan) => (
                      <li key={plan} className="flex items-start gap-2.5">
                        <CheckIcon
                          aria-hidden="true"
                          className="mt-0.5 size-4 shrink-0 text-accent md:mt-1"
                        />
                        {plan}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
