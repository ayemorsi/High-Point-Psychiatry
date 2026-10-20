"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBagIcon } from "lucide-react"
import { animate } from "motion/react"

import AddToBagButton from "@/components/elements/add-to-bag-button"
import Price from "@/components/elements/price"
import QuantityStepper from "@/components/elements/quantity-stepper"
import Flights from "@/components/layout/bag/flights"
import {
  BagTotals,
  CheckoutButton,
  EmptyBag,
  ShippingProgress,
} from "@/components/layout/bag/summary"
import Tray from "@/components/layout/bag/tray"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { bag, useBag } from "@/hooks/use-bag"
import type { BagLine, Product, StepId } from "@/lib/types"
import { EASE_SOFT } from "@/lib/utils"

// `bestsellers` come from the server, so the drawer can suggest without loading the catalog.
export default function BagDrawer({ bestsellers }: { bestsellers: Product[] }) {
  const { open, lines, count, flights, notice, covered, has } = useBag()
  const [active, setActive] = useState<string | null>(null)
  const icon = useRef<SVGSVGElement>(null)

  return (
    <>
      <Sheet open={open} onOpenChange={bag.setOpen}>
        <SheetTrigger asChild>
          <Button
            size="sm"
            aria-label={`Bag, ${count} ${count === 1 ? "item" : "items"}`}
          >
            <ShoppingBagIcon ref={icon} data-icon="inline-start" />
            Bag
            {count > 0 && <span className="figures opacity-60">{count}</span>}
          </Button>
        </SheetTrigger>
        <SheetContent size="lg">
          <SheetHeader className="pb-4">
            <SheetTitle>
              Your bag{" "}
              {count > 0 && (
                <span className="figures text-muted-foreground">({count})</span>
              )}
            </SheetTitle>
            <SheetDescription className="sr-only">
              The products in your bag, their quantities and your total.
            </SheetDescription>
          </SheetHeader>

          {lines.length === 0 ? (
            <div className="flex flex-1 flex-col px-6 pb-6">
              <EmptyBag />
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-6">
                <Tray lines={lines} active={active} />
                <ul
                  className="divide-y sm:mt-4"
                  onMouseLeave={() => setActive(null)}
                  onBlur={(event) => {
                    if (
                      !event.currentTarget.contains(
                        event.relatedTarget as Node | null
                      )
                    ) {
                      setActive(null)
                    }
                  }}
                >
                  {lines.map((line) => (
                    <BagRow
                      key={line.key}
                      line={line}
                      onActive={() => setActive(line.key)}
                    />
                  ))}
                </ul>
                <PairsWell
                  suggestions={suggest(bestsellers, covered, has).slice(0, 2)}
                />
              </div>
              <footer className="space-y-5 border-t p-6">
                <ShippingProgress />
                <BagTotals />
                <CheckoutButton />
              </footer>
            </>
          )}
        </SheetContent>
      </Sheet>
      <Flights
        flights={flights}
        target={icon}
        onLand={() =>
          icon.current &&
          animate(
            icon.current,
            { scale: [1, 1.3, 1] },
            { duration: 0.35, ease: EASE_SOFT }
          )
        }
      />
      <span role="status" className="sr-only">
        {notice}
      </span>
    </>
  )
}

function BagRow({ line, onActive }: { line: BagLine; onActive: () => void }) {
  const { quantity } = line

  return (
    <li
      onMouseEnter={onActive}
      onFocusCapture={onActive}
      className="flex items-start gap-4 py-4"
    >
      {/* Phones skip the tray, so each row carries its own photo. */}
      <div className="media aspect-4/5 w-16 shrink-0 rounded-xl sm:hidden">
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
      <div className="min-w-0 flex-1">
        <Link
          href={`/products/${line.slug}`}
          onClick={() => bag.setOpen(false)}
          className="text-sm font-medium underline-offset-4 hover:underline"
        >
          {line.name}
        </Link>
        <p className="text-sm text-muted-foreground">
          {line.size} · {line.descriptor}
        </p>
        <div className="mt-3 flex items-center gap-3">
          <QuantityStepper
            size="sm"
            value={quantity}
            onValueChange={(value) => bag.setQuantity(line.key, value)}
            label={`${line.name} quantity`}
          />
          <Button
            variant="link"
            size="xs"
            aria-label={`Remove ${line.name}`}
            onClick={() => bag.remove(line.key)}
          >
            Remove
          </Button>
        </div>
      </div>
      <Price
        amount={line.total}
        compareAt={line.compareAt && line.compareAt * quantity}
        className="text-sm"
      />
    </li>
  )
}

function PairsWell({ suggestions }: { suggestions: Product[] }) {
  if (suggestions.length === 0) return null

  return (
    <section className="mt-2 border-t py-6">
      <h3 className="sans-heading text-sm">Pairs well with</h3>
      <ul className="mt-4 grid grid-cols-2 gap-3">
        {suggestions.map((product) => (
          <li key={product.slug} className="flex gap-3">
            <div className="media aspect-4/5 w-14 shrink-0 rounded-xl">
              {product.image && (
                <Image
                  src={product.image.src}
                  alt={product.image.alt}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              )}
            </div>
            <div className="min-w-0 space-y-2">
              <p className="truncate text-sm font-medium">{product.name}</p>
              <AddToBagButton
                product={product}
                variant="secondary"
                size="xs"
                label="Add"
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

// The bestseller for each step the bag is missing, then the other bestsellers.
function suggest(
  bestsellers: Product[],
  covered: StepId[],
  has: (slug: string) => boolean
) {
  const missing = bestsellers.filter(
    (product) => product.step !== "sets" && !covered.includes(product.step)
  )
  return [...new Set([...missing, ...bestsellers])].filter(
    (product) => !product.soldOut && !has(product.slug)
  )
}
