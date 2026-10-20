import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn, externalLink } from "@/lib/utils"

type SectionHeadingProps = {
  title: string
  lede?: string
  action?: { label: string; href: string }
  align?: "split" | "center"
  className?: string
}

// The one section header: a heading, at most one line under it, at most one action.
export default function SectionHeading({
  title,
  lede,
  action,
  align = "split",
  className,
}: SectionHeadingProps) {
  const label = action && (
    <>
      {action.label}
      <ArrowRightIcon data-icon="inline-end" />
    </>
  )
  const link = action && (
    <Button asChild variant="link">
      {/^https?:/.test(action.href) ? (
        <a href={action.href} {...externalLink(action.label)}>
          {label}
        </a>
      ) : (
        <Link href={action.href}>{label}</Link>
      )}
    </Button>
  )

  if (align === "center") {
    return (
      <header
        className={cn(
          "mx-auto flex max-w-2xl flex-col items-center text-center",
          className
        )}
      >
        <h2 className="text-4xl md:text-5xl">{title}</h2>
        {lede && (
          <p className="mt-3 max-w-md text-muted-foreground md:text-lg">
            {lede}
          </p>
        )}
        {link && <div className="mt-6">{link}</div>}
      </header>
    )
  }

  return (
    <header
      className={cn(
        "flex flex-wrap items-end justify-between gap-x-10 gap-y-4",
        className
      )}
    >
      <div>
        <h2 className="text-4xl md:text-5xl">{title}</h2>
        {lede && (
          <p className="mt-3 max-w-md text-muted-foreground md:text-lg">
            {lede}
          </p>
        )}
      </div>
      {link}
    </header>
  )
}
