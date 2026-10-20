import Link from "next/link"

import { appointmentHref } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="p-2 md:p-3">
      <div className="arc-field hero-padding rounded-3xl bg-card lg:flex lg:min-h-[max(calc(100svh-1.5rem),40rem)] lg:items-center">
        <div className="container flex flex-col items-center text-center">
          <p className="enter eyebrow">{site.tagline}</p>
          <h1
            id="hero-title"
            className="enter mt-6 max-w-4xl text-5xl leading-none delay-75 md:text-7xl lg:text-8xl"
          >
            Care that starts with listening.
          </h1>
          <p className="enter mt-6 max-w-xl text-muted-foreground delay-150 md:text-lg">
            Thoughtful psychiatric evaluation and treatment, with time to talk
            and a plan you shape together with your provider.
          </p>
          <div className="enter mt-9 flex flex-wrap justify-center gap-3 delay-200">
            <Button asChild size="lg">
              <Link href={appointmentHref}>Request an appointment</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/#services">Our services</Link>
            </Button>
          </div>
          <p className="enter mt-8 text-sm text-muted-foreground delay-300">
            Questions first? Email{" "}
            <a
              href={site.email.href}
              className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
            >
              {site.email.display}
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
