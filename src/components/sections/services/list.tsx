import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import Reveal from "@/components/elements/reveal"
import SectionHeading from "@/components/elements/section-heading"
import { appointmentHref } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { services } from "@/lib/services"

export default function ServiceList() {
  return (
    <section className="section-padding container">
      <Reveal>
        <SectionHeading
          title="All services"
          lede="Every service starts with a conversation about what you need."
          action={{ label: "Request an appointment", href: appointmentHref }}
        />
      </Reveal>
      <ul className="mt-10 grid gap-3 sm:grid-cols-2 md:mt-14 md:gap-4 lg:grid-cols-3">
        {services.map((service, index) => (
          <li key={service.slug} id={service.slug} className="scroll-mt-28">
            <Reveal
              delay={(index % 3) * 0.06}
              className="flex h-full gap-4 rounded-2xl bg-card p-4 md:p-5"
            >
              <div className="media relative size-20 shrink-0 md:size-24">
                <Image
                  src={service.image.src}
                  alt=""
                  fill
                  sizes="6rem"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-muted-foreground">
                  {service.kind}
                </p>
                <h3 className="mt-1 text-2xl">{service.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
      <Reveal className="mt-10 flex justify-center md:mt-14">
        <Button asChild variant="secondary">
          <Link href="/contact#faq">
            Questions about getting started
            <ArrowRightIcon data-icon="inline-end" />
          </Link>
        </Button>
      </Reveal>
    </section>
  )
}
