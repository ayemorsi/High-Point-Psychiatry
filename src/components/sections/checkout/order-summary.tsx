"use client"

import { useId, useState } from "react"
import Image from "next/image"
import { ChevronDownIcon } from "lucide-react"

import Price from "@/components/elements/price"
import Tray from "@/components/layout/bag/tray"
import { Badge } from "@/components/ui/badge"
import { site } from "@/lib/site"
import type { BagLine, Totals } from "@/lib/types"
import { cn, formatPrice } from "@/lib/utils"

type OrderSummaryProps = {
  lines: BagLine[]
  totals: Totals
  // Below lg the lines fold behind a toggle so the form starts on the first screen.
  collapsible?: boolean
  tray?: boolean
  children?: React.ReactNode
  className?: string
}

export default function OrderSummary({
  lines,
  totals,
  collapsible = false,
  tray = false,
  children,
  className,
}: OrderSummaryProps) {
  const [open, setOpen] = useState(false)
  const id = useId()
  const count = lines.reduce((sum, line) => sum + line.quantity, 0)

  return (
    <div
      className={cn(
        "rounded-3xl bg-card p-5 md:p-8",
        collapsible && "max-lg:py-2.5",
        className
      )}
    >
      {collapsible && (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((value) => !value)}
          className="flex min-h-11 w-full items-center justify-between gap-4 rounded-full text-sm font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50 lg:hidden"
        >
          <span className="flex items-center gap-1.5">
            {open ? "Hide" : "Show"} your bag
            <span className="figures text-muted-foreground">({count})</span>
            <ChevronDownIcon
              aria-hidden="true"
              className={cn(
                "size-4 transition-transform duration-200 ease-out",
                open && "rotate-180"
              )}
            />
          </span>
          <span className="figures text-base">{formatPrice(totals.total)}</span>
        </button>
      )}

      <div
        id={id}
        className={cn(
          collapsible &&
            "max-lg:mt-2.5 max-lg:border-t max-lg:pt-2 max-lg:pb-2.5",
          collapsible && !open && "max-lg:hidden"
        )}
      >
        <h2 className={cn("text-2xl", collapsible && "max-lg:sr-only")}>
          Your bag{" "}
          <span className="figures text-muted-foreground">({count})</span>
        </h2>
        {tray && (
          <div className="mt-4">
            <Tray lines={lines} active={null} />
          </div>
        )}
        <ul className={cn("divide-y", !collapsible && "mt-2", "lg:mt-2")}>
          {lines.map((line) => (
            <SummaryLine key={line.key} line={line} />
          ))}
        </ul>
        {children}
        <SummaryTotals totals={totals} />
      </div>
    </div>
  )
}

function SummaryLine({ line }: { line: BagLine }) {
  const { quantity } = line

  return (
    <li className="flex items-center gap-4 py-4">
      <div className="relative shrink-0">
        <div className="media aspect-4/5 w-16 rounded-xl bg-background">
          {line.image && (
            <Image
              src={line.image.src}
              alt=""
              fill
              sizes="64px"
              className="object-cover"
            />
          )}
        </div>
        {quantity > 1 && (
          <Badge aria-hidden="true" className="absolute -top-2 -right-2">
            <span className="figures">{quantity}</span>
          </Badge>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{line.name}</p>
        <p className="truncate text-sm text-muted-foreground">
          {line.size}
          {quantity > 1 && (
            <span className="sr-only">, quantity {quantity}</span>
          )}
        </p>
      </div>
      <Price
        amount={line.total}
        compareAt={line.compareAt && line.compareAt * quantity}
        className="text-sm"
      />
    </li>
  )
}

function SummaryTotals({ totals }: { totals: Totals }) {
  const { subtotal, saving, discount, shipping, total } = totals

  return (
    <dl className="mt-6 space-y-2 border-t pt-6 text-sm">
      <Row label="Subtotal" value={formatPrice(subtotal)} />
      {saving > 0 && (
        <Row
          label={`Every step, ${site.commerce.setDiscount}% off`}
          value={`−${formatPrice(saving)}`}
          className="text-accent"
        />
      )}
      {discount && (
        <Row
          label={`${discount.code}, ${site.commerce.welcomeDiscount}% off`}
          value={`−${formatPrice(discount.amount)}`}
          className="text-accent"
        />
      )}
      <Row
        label="Shipping"
        value={shipping === 0 ? "Free" : formatPrice(shipping)}
      />
      <div className="mt-4 flex items-baseline justify-between gap-4 border-t pt-4">
        <dt className="text-base font-medium">Total</dt>
        <dd className="figures text-2xl font-medium">
          <span className="me-1.5 text-xs font-normal text-muted-foreground">
            {site.commerce.currency}
          </span>
          {formatPrice(total)}
        </dd>
      </div>
    </dl>
  )
}

function Row({
  label,
  value,
  className,
}: {
  label: string
  value: string
  className?: string
}) {
  return (
    <div className={cn("flex justify-between gap-4", className)}>
      <dt className={cn(!className && "text-muted-foreground")}>{label}</dt>
      <dd className="figures">{value}</dd>
    </div>
  )
}
