import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type StruckIconProps = {
  icon: LucideIcon
  className?: string
}

// The slash shares the icon's 24-unit grid, so it keeps the icon's stroke weight at every size.
export const StruckIcon = ({ icon: Icon, className }: StruckIconProps) => (
  <span
    aria-hidden="true"
    className={cn("relative inline-block shrink-0", className)}
  >
    <Icon strokeWidth={1.25} className="slash-cut size-full" />
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      className="absolute inset-0 size-full"
    >
      <path d="M3 21 21 3" />
    </svg>
  </span>
)
