import { StarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type RatingProps = {
  value: number
  count?: number
  variant?: "compact" | "stars"
  className?: string
}

const STARS = [0, 1, 2, 3, 4]

export default function Rating({
  value,
  count,
  variant = "compact",
  className,
}: RatingProps) {
  const label = `Rated ${value.toFixed(1)} out of 5${count ? ` from ${count.toLocaleString("en-US")} reviews` : ""}`

  return (
    <span
      role="img"
      aria-label={label}
      className={cn(
        "figures inline-flex items-center gap-1.5 text-xs text-muted-foreground",
        className
      )}
    >
      {variant === "compact" ? (
        <StarIcon className="size-3 fill-foreground text-foreground" />
      ) : (
        <span className="relative inline-flex">
          <span className="flex gap-0.5 text-foreground/20">
            {STARS.map((star) => (
              <StarIcon key={star} className="size-3.5 fill-current" />
            ))}
          </span>
          <span
            className="absolute inset-y-0 left-0 flex gap-0.5 overflow-hidden text-foreground"
            style={{ width: `${(value / 5) * 100}%` }}
          >
            {STARS.map((star) => (
              <StarIcon key={star} className="size-3.5 shrink-0 fill-current" />
            ))}
          </span>
        </span>
      )}
      <span className="font-medium text-foreground">{value.toFixed(1)}</span>
      {count !== undefined && <span>({count.toLocaleString("en-US")})</span>}
    </span>
  )
}
