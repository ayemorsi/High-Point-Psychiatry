import Reveal from "@/components/elements/reveal"
import Hero126 from "@/components/shadcnblocks/hero126"
import { cn } from "@/lib/utils"

// shadcnblocks Feature 220b: a stat row over a looping video beside a heading and actions, on the site's type and tokens.

type Feature220bProps = {
  id?: string
  eyebrow?: string
  heading: string
  description: React.ReactNode
  video: { src: string; poster: string; label: string }
  stats: { label: string; value: React.ReactNode }[]
  actions?: React.ReactNode
  className?: string
}

export default function Feature220b({
  id,
  eyebrow,
  heading,
  description,
  video,
  stats,
  actions,
  className,
}: Feature220bProps) {
  return (
    <section id={id} className={cn("section-padding", className)}>
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="media relative order-2 aspect-4/3 w-full lg:order-1 lg:aspect-square">
            <Hero126 {...video} className="absolute inset-0" />
          </Reveal>
          <Reveal delay={0.06} className="order-1 lg:order-2">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2 className="mt-4 text-4xl text-pretty md:text-5xl">{heading}</h2>
            <div className="mt-5 max-w-xl text-muted-foreground md:text-lg">
              {description}
            </div>
            <dl className="mt-8 grid gap-x-6 gap-y-5 border-t pt-6 text-sm sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-muted-foreground">{stat.label}</dt>
                  <dd className="mt-0.5 font-medium">{stat.value}</dd>
                </div>
              ))}
            </dl>
            {actions && (
              <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
