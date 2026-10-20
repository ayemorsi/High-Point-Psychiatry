import type { ComponentProps, SVGProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

// The mark is sized in em, so it scales with the wordmark.
const logoVariants = cva(
  "display-type inline-flex items-center gap-[0.32em] leading-none whitespace-nowrap",
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

// A ridge line inside a ring, with a point marking the high point.
export const LogoMark = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
    <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M6.5 22 L12.5 14.5 L16 18.5 L20.5 11.5 L25.5 22"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="20.5" cy="7.25" r="1.75" fill="currentColor" />
  </svg>
)
