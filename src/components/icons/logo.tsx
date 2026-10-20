import type { ComponentProps } from "react"
import Image from "next/image"
import { cva, type VariantProps } from "class-variance-authority"

import fullColor from "@/../public/images/brand/logo.png"
import fullWhite from "@/../public/images/brand/logo-white.png"
import markColor from "@/../public/images/brand/mark.png"
import markWhite from "@/../public/images/brand/mark-white.png"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

// The mark is sized in em, so it scales with the wordmark.
const logoVariants = cva(
  "display-type inline-flex items-center gap-[0.4em] leading-none whitespace-nowrap",
  {
    variants: {
      size: {
        sm: "text-xl",
        default: "text-2xl",
        lg: "text-4xl",
        fluid: "text-xl md:text-2xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export const Logo = ({
  className,
  size,
  ...props
}: ComponentProps<"span"> & VariantProps<typeof logoVariants>) => (
  <span className={cn(logoVariants({ size, className }))} {...props}>
    <LogoMark className="h-[0.95em]" />
    {site.name}
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
