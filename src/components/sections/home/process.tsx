import Reveal from "@/components/elements/reveal"
import SectionHeading from "@/components/elements/section-heading"

const steps = [
  {
    title: "Reach out",
    body: "Send a message through our contact form or by email. We'll reply to answer questions and find a time.",
  },
  {
    title: "First evaluation",
    body: "A longer first visit to talk through what's going on, your history and what you hope will change.",
  },
  {
    title: "Your plan",
    body: "We explain what we found and agree on next steps together, which may include medication, therapy or both.",
  },
  {
    title: "Follow-up care",
    body: "Regular visits to see how you're doing and adjust the plan until it's working for you.",
  },
]

export default function Process() {
  return (
    <section id="process" className="section-padding container scroll-mt-24">
      <Reveal>
        <SectionHeading
          title="What to expect"
          lede="Starting care can feel like a big step. Here's how it works."
          align="center"
        />
      </Reveal>
      <Reveal delay={0.06} className="mt-10 md:mt-14">
        <ol className="grid gap-x-6 gap-y-10 border-t pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span className="figures text-sm text-muted-foreground">
                0{index + 1}
              </span>
              <h3 className="mt-3 text-2xl md:text-3xl">{step.title}</h3>
              <p className="mt-3 max-w-xs text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  )
}
