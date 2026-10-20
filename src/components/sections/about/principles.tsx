import SectionHeading from "@/components/elements/section-heading"
import { cn } from "@/lib/utils"

const principles = [
  {
    title: "We listen first",
    body: "Your first visit is about understanding your story: what you're experiencing, what you've tried and what matters to you.",
  },
  {
    title: "We explain everything",
    body: "Every diagnosis, medication and alternative is explained in plain language, including the benefits, the risks and what to expect.",
  },
  {
    title: "We stay with you",
    body: "Treatment is rarely one appointment. We follow up, adjust and keep working with you until the plan fits your life.",
  },
]

const offsets = ["md:top-28", "md:top-32", "md:top-36"]

// From md each panel sticks a little lower than the last, so they pile up as you scroll.
export default function AboutPrinciples() {
  return (
    <section className="section-padding container">
      <SectionHeading title="What guides our care" />
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
                "arc-field flex flex-col justify-end rounded-3xl bg-card p-6 md:h-[min(26rem,60svh)] md:p-10 lg:p-14",
                index === 1 && "dark bg-background text-foreground"
              )}
            >
              <span className="figures text-sm text-muted-foreground">
                0{index + 1}
              </span>
              <h3 className="mt-3 text-3xl md:text-4xl lg:text-5xl">
                {principle.title}
              </h3>
              <p className="mt-4 max-w-xl text-muted-foreground md:text-lg">
                {principle.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
