import Image from "next/image"

import fullColor from "@/../public/images/brand/logo.png"
import fullWhite from "@/../public/images/brand/logo-white.png"
import markColor from "@/../public/images/brand/mark.png"
import markWhite from "@/../public/images/brand/mark-white.png"
import wordColor from "@/../public/images/brand/wordmark.png"
import wordWhite from "@/../public/images/brand/wordmark-white.png"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

// A horizontal lockup for the menu: the mountains beside the logo's own HIGH POINT / PSYCHIATRY lettering, centred on one line.
export const Logo = ({ className }: { className?: string }) => (
  <span
    className={cn("inline-flex h-9 items-center gap-2.5 md:gap-3", className)}
  >
    <LogoMark className="h-[58%]" />
    <span className="relative inline-flex h-full shrink-0">
      <Image
        src={wordColor}
        alt={site.name}
        sizes="10rem"
        priority
        className="h-full w-auto max-w-none dark:hidden"
      />
      <Image
        src={wordWhite}
        alt={site.name}
        sizes="10rem"
        priority
        className="hidden h-full w-auto max-w-none dark:block"
      />
    </span>
  </span>
)

// The brand's three mountains: in colour on light surfaces, ivory inside a `dark` band.
export const LogoMark = ({ className }: { className?: string }) => (
  <span className={cn("relative inline-flex shrink-0", className)}>
    <Image
      src={markColor}
      alt=""
      sizes="8rem"
      className="h-full w-auto dark:hidden"
    />
    <Image
      src={markWhite}
      alt=""
      sizes="8rem"
      className="hidden h-full w-auto dark:block"
    />
  </span>
)

// The full stacked lockup: mountains over HIGH POINT PSYCHIATRY.
export const LogoFull = ({ className }: { className?: string }) => (
  <span className={cn("inline-flex", className)}>
    <Image
      src={fullColor}
      alt={site.name}
      sizes="20rem"
      className="h-full w-auto dark:hidden"
    />
    <Image
      src={fullWhite}
      alt={site.name}
      sizes="20rem"
      className="hidden h-full w-auto dark:block"
    />
  </span>
)
