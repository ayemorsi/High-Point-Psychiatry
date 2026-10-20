import Reveal from "@/components/elements/reveal"
import SignupForm from "@/components/sections/shared/newsletter/signup-form"
import { site } from "@/lib/site"

export default function Newsletter() {
  return (
    <section className="p-2 md:p-3">
      <div className="rounded-3xl bg-card">
        <div className="section-padding container">
          <Reveal className="mx-auto max-w-xl text-center">
            <h2 className="text-4xl md:text-5xl">
              Join the {site.name} email list
            </h2>
            <p className="mt-3 text-muted-foreground md:text-lg">
              {site.commerce.welcomeDiscount}% off your first order, and a first
              look at new products.
            </p>
            <SignupForm className="mx-auto mt-8 max-w-md" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
