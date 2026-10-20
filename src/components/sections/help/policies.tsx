import { TruckIcon, Undo2Icon } from "lucide-react"

import Reveal from "@/components/elements/reveal"
import SectionHeading from "@/components/elements/section-heading"
import { deliveryTime } from "@/lib/pricing"
import { site } from "@/lib/site"
import { formatPrice } from "@/lib/utils"

const { freeShippingThreshold, returnsDays } = site.commerce
const town = site.city
const threshold = formatPrice(freeShippingThreshold)

const policies = [
  {
    id: "shipping",
    icon: TruckIcon,
    title: "Shipping",
    line: `Free over ${threshold}, sent within one business day.`,
    rows: [
      { label: "Where we ship", value: "The US and Canada." },
      {
        label: "What it costs",
        value: `Free on orders over ${threshold}. Under that, the rate shows at checkout before you pay.`,
      },
      {
        label: "When it leaves",
        value: `Within one business day, from ${town}.`,
      },
      { label: "How long it takes", value: `Usually ${deliveryTime()}.` },
      { label: "Tracking", value: "A link by email as soon as it ships." },
      {
        label: "Lost or broken",
        value: "Write to us and we send a new one, free.",
      },
    ],
  },
  {
    id: "returns",
    icon: Undo2Icon,
    title: "Returns",
    line: `${returnsDays} days, and opened bottles come back too.`,
    rows: [
      {
        label: "How long you have",
        value: `${returnsDays} days from delivery.`,
      },
      { label: "What comes back", value: "Any product, even opened and used." },
      {
        label: "How to send it",
        value: (
          <>
            Email{" "}
            <a
              href={site.email.href}
              className="underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
            >
              {site.email.display}
            </a>{" "}
            with your order number. We send a free return label.
          </>
        ),
      },
      {
        label: "Your refund",
        value:
          "To the card you paid with, within 10 days of the parcel reaching us.",
      },
      {
        label: "What can't come back",
        value: "Gift cards and anything bought on final sale.",
      },
    ],
  },
]

export default function HelpPolicies() {
  return (
    <section className="section-padding container">
      <Reveal>
        <SectionHeading
          title="Shipping and returns"
          action={{ label: "Read our terms", href: "/legal/terms" }}
        />
      </Reveal>

      <div className="mt-10 grid gap-3 md:mt-14 md:gap-4 lg:grid-cols-2">
        {policies.map((policy, index) => (
          <Reveal key={policy.id} delay={index * 0.06}>
            <article
              id={policy.id}
              className="h-full rounded-3xl bg-card p-6 md:p-10"
            >
              <span className="flex size-11 items-center justify-center rounded-full bg-background">
                <policy.icon
                  aria-hidden="true"
                  className="size-5"
                  strokeWidth={1.5}
                />
              </span>
              <h3 className="mt-6 text-3xl md:mt-8 md:text-4xl">
                {policy.title}
              </h3>
              <p className="mt-2 text-muted-foreground md:text-lg">
                {policy.line}
              </p>

              <dl className="mt-8 divide-y border-y md:mt-10">
                {policy.rows.map((row) => (
                  <div
                    key={row.label}
                    className="grid gap-1 py-4 text-sm sm:grid-cols-[10rem_1fr] sm:gap-6"
                  >
                    <dt className="text-muted-foreground">{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
