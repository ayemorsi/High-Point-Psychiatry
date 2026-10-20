import Link from "next/link"

import Reveal from "@/components/elements/reveal"
import { appointmentHref } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"

export default function Cta() {
  return (
    <section className="p-2 pb-14 md:p-3 md:pb-20 lg:pb-24">
      <Reveal className="dark arc-field rounded-3xl bg-background px-6 py-16 text-center text-foreground [--arc-strength:6%] md:py-24">
        <h2 className="mx-auto max-w-2xl text-4xl md:text-6xl">
          Ready when you are.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground md:text-lg">
          Send us a message to ask a question or request your first appointment.
        </p>
        <Button asChild size="lg" variant="secondary" className="mt-8">
          <Link href={appointmentHref}>Request an appointment</Link>
        </Button>
        <p className="mx-auto mt-10 max-w-md text-sm text-muted-foreground">
          If you are in crisis, call or text{" "}
          <a
            href={site.crisis.href}
            className="font-medium text-foreground underline underline-offset-4"
          >
            {site.crisis.line}
          </a>{" "}
          (Suicide &amp; Crisis Lifeline) or call 911.
        </p>
      </Reveal>
    </section>
  )
}
