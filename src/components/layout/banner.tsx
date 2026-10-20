"use client"

import { XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useBannerVisibility } from "@/hooks/use-banner-visibility"
import { cn, externalLink } from "@/lib/utils"

export default function Banner({
  url = "https://www.shadcnblocks.com",
}: {
  url?: string
}) {
  const { isBannerVisible, dismissBanner } = useBannerVisibility()

  return (
    <div
      className={cn(
        "relative grid overflow-hidden bg-primary transition-all duration-300 ease-soft",
        isBannerVisible
          ? "grid-rows-[1fr] opacity-100"
          : "pointer-events-none grid-rows-[0fr] opacity-0"
      )}
    >
      <div className="overflow-hidden">
        <div className="container flex items-center justify-center gap-3 py-3 pe-12 sm:gap-4">
          <p className="text-center text-sm text-primary-foreground">
            Purchase this theme on{" "}
            <span className="font-medium">shadcnblocks.com</span>
          </p>
          <Button size="sm" variant="secondary" asChild>
            <a href={url} {...externalLink("Get template")}>
              Get template
            </a>
          </Button>

          <button
            type="button"
            onClick={dismissBanner}
            aria-label="Close banner"
            className="absolute end-4 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-primary-foreground/70 transition-colors duration-200 hover:bg-primary-foreground/10 hover:text-primary-foreground focus-visible:ring-3 focus-visible:ring-primary-foreground/30 focus-visible:outline-none"
          >
            <XIcon className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
