import {
  CalendarCheckIcon,
  ClipboardListIcon,
  MonitorSmartphoneIcon,
  PillIcon,
} from "lucide-react"

import Reveal from "@/components/elements/reveal"
import SectionHeading from "@/components/elements/section-heading"

const services = [
  {
    title: "Psychiatric evaluation",
    body: "A thorough first visit to understand your history, symptoms and goals, and to reach a clear diagnosis.",
    icon: ClipboardListIcon,
  },
  {
    title: "Medication management",
    body: "When medication can help, we explain the options, start carefully and adjust based on how you feel.",
    icon: PillIcon,
  },
  {
    title: "Ongoing follow-up",
    body: "Regular check-ins to track progress, manage side effects and change the plan as your needs change.",
    icon: CalendarCheckIcon,
  },
  {
    title: "Telehealth visits",
    body: "Secure video appointments from home, when a virtual visit is right for you.",
    icon: MonitorSmartphoneIcon,
  },
]

export default function Services() {
  return (
    <section id="services" className="section-padding container scroll-mt-24">
      <Reveal>
        <SectionHeading
          title="How we can help"
          lede="Psychiatric care built around you, from the first conversation onward."
          action={{ label: "All services", href: "/services" }}
        />
      </Reveal>
      <Reveal delay={0.06} className="mt-10 md:mt-14">
        <ul className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
          {services.map((service, index) => (
            <li
              key={service.title}
              className={
                index === 1
                  ? "dark flex flex-col rounded-2xl bg-background p-6 text-foreground md:p-8"
                  : "flex flex-col rounded-2xl bg-card p-6 md:p-8"
              }
            >
              <service.icon aria-hidden="true" className="size-6" />
              <h3 className="mt-10 text-2xl md:mt-16 md:text-3xl">
                {service.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                {service.body}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
