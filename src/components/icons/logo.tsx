import type { ComponentProps, SVGProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

// The mark is sized in em, so it scales with the wordmark.
const logoVariants = cva(
  "display-type inline-flex items-center gap-[0.32em] leading-none",
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
    <LogoMark className="size-[1.08em]" />
    {site.name}
  </span>
)

// Three rings that share one edge and close on a pearl.
export const LogoMark = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
    <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" />
    <circle
      cx="12.46"
      cy="19.54"
      r="9"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="8.75" cy="23.25" r="4.5" fill="currentColor" />
  </svg>
)
