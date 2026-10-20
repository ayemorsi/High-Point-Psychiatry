import { cn, formatPrice } from "@/lib/utils"

type PriceProps = {
  amount: number
  compareAt?: number
  className?: string
}

export default function Price({ amount, compareAt, className }: PriceProps) {
  const onSale = compareAt !== undefined && compareAt > amount

  return (
    <span
      className={cn("figures inline-flex items-baseline gap-1.5", className)}
    >
      <span className={cn(onSale && "text-accent")}>
        {onSale && <span className="sr-only">Sale price </span>}
        {formatPrice(amount)}
      </span>
      {onSale && (
        <s className="text-muted-foreground">
          <span className="sr-only">Regular price </span>
          {formatPrice(compareAt)}
        </s>
      )}
    </span>
  )
}

export function savingsPercent(amount: number, compareAt: number) {
  return Math.round(((compareAt - amount) / compareAt) * 100)
}
