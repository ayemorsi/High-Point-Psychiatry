"use client"

import { useEffect, useMemo, useRef, useSyncExternalStore } from "react"
import Link from "next/link"
import { CheckIcon } from "lucide-react"

import OrderSummary from "@/components/sections/checkout/order-summary"
import { Button } from "@/components/ui/button"
import { bag } from "@/hooks/use-bag"
import { site } from "@/lib/site"
import type { PlacedOrder } from "@/lib/types"
import { storageKey } from "@/lib/utils"

const STORAGE_KEY = storageKey("order")

type StoredOrder = { order: PlacedOrder; cleared: boolean }

const subscribeNothing = () => () => {}

// Demo: a real store reads the order back from its commerce API by number instead of the browser session.
export function saveOrder(order: PlacedOrder) {
  write({ order, cleared: false })
}

export default function Confirmation({ number }: { number?: string }) {
  const raw = useSyncExternalStore(subscribeNothing, read, () => undefined)
  const stored = useMemo(
    () => (raw && number ? parse(raw, number) : null),
    [raw, number]
  )

  // Emptied here rather than at payment, so the checkout never flashes an empty bag on the way out. Once only, so a revisit keeps a new bag.
  useEffect(() => {
    if (!stored || stored.cleared) return
    bag.clear()
    write({ ...stored, cleared: true })
  }, [stored])

  if (raw === undefined) return null
  if (!stored) return <OrderMissing />
  return <OrderPlaced order={stored.order} />
}

function OrderPlaced({ order }: { order: PlacedOrder }) {
  const heading = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    heading.current?.focus({ preventScroll: true })
  }, [])

  return (
    <section className="section-padding container pt-8! md:pt-12!">
      <div className="checkout-grid mx-auto max-w-6xl">
        <div className="enter">
          <span className="grid size-10 place-items-center rounded-full bg-success text-success-foreground">
            <CheckIcon className="size-5" strokeWidth={2} />
          </span>
          <p className="figures mt-6 text-sm text-muted-foreground">
            Order {order.number}
          </p>
          <h1
            ref={heading}
            tabIndex={-1}
            className="mt-2 text-4xl outline-none md:text-5xl"
          >
            Thank you, {order.firstName}.
          </h1>
          <p className="mt-3 max-w-md text-lg text-muted-foreground">
            Your order is confirmed. The receipt is on its way to{" "}
            <span className="text-foreground">{order.email}</span>.
          </p>

          <dl className="mt-10 grid gap-8 border-t pt-8 text-sm sm:grid-cols-2 md:mt-12">
            <div className="space-y-1">
              <dt className="text-muted-foreground">Arrives</dt>
              <dd className="font-medium">{order.shipping.arrives}</dd>
              <dd className="text-muted-foreground">
                {order.shipping.label} shipping
              </dd>
            </div>
            <div className="space-y-1">
              <dt className="text-muted-foreground">Delivery to</dt>
              {order.address.map((line) => (
                <dd key={line}>{line}</dd>
              ))}
            </div>
            <div className="space-y-1 sm:col-span-2">
              <dt className="text-muted-foreground">Questions</dt>
              <dd>
                Reply to the receipt or write to{" "}
                <a
                  href={site.email.href}
                  className="underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
                >
                  {site.email.display}
                </a>
                . Returns are free for {site.commerce.returnsDays} days.
              </dd>
            </div>
          </dl>

          <Button asChild variant="secondary" className="mt-10">
            <Link href="/shop">Keep shopping</Link>
          </Button>
        </div>

        <aside aria-label="Order summary" className="lg:self-start">
          <OrderSummary tray lines={order.lines} totals={order.totals} />
        </aside>
      </div>
    </section>
  )
}

function OrderMissing() {
  return (
    <section className="section-padding container pt-8! md:pt-12!">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl">We can&apos;t show this order</h1>
        <p className="mt-3 max-w-md text-lg text-muted-foreground">
          Your receipt email has the full order. Questions go to{" "}
          <a
            href={site.email.href}
            className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
          >
            {site.email.display}
          </a>
          .
        </p>
        <Button asChild variant="secondary" className="mt-8">
          <Link href="/shop">Keep shopping</Link>
        </Button>
      </div>
    </section>
  )
}

function read() {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function write(stored: StoredOrder) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
  } catch {}
}

function parse(raw: string, number: string): StoredOrder | null {
  try {
    const stored = JSON.parse(raw)
    return stored?.order?.number === number ? stored : null
  } catch {
    return null
  }
}
