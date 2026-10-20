"use client"

import { useEffect, useRef, useState } from "react"
import { LeafIcon, RotateCcwIcon, TruckIcon } from "lucide-react"

import AddToBagButton from "@/components/elements/add-to-bag-button"
import Price from "@/components/elements/price"
import QuantityStepper from "@/components/elements/quantity-stepper"
import Rating from "@/components/elements/rating"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { getVariants, subscribePrice } from "@/lib/pricing"
import { site } from "@/lib/site"
import type { Product, ProductVariant, Step } from "@/lib/types"
import { cn, formatPrice } from "@/lib/utils"

type BuyBoxProps = {
  product: Product
  step: Step
  /** Names of the products inside a set, in order. */
  contents?: string[]
  className?: string
}

type Purchase = "subscribe" | "once"

const assurances = [
  {
    icon: TruckIcon,
    label: `Free shipping over ${formatPrice(site.commerce.freeShippingThreshold)}`,
  },
  { icon: RotateCcwIcon, label: `${site.commerce.returnsDays}-day returns` },
  { icon: LeafIcon, label: "Fragrance-free" },
]

// Glass bottles and jars only: tubes, pots and sets have no refill.
const refillable = new Set([
  "oil-cleanser",
  "vitamin-c-serum",
  "hyaluronic-serum",
  "retinal-night-serum",
  "niacinamide-serum",
  "peptide-eye-cream",
  "barrier-cream",
  "gel-cream",
  "face-oil",
  "overnight-mask",
])

export default function BuyBox({
  product,
  step,
  contents,
  className,
}: BuyBoxProps) {
  const sizes = getVariants(product)
  const [size, setSize] = useState(sizes[0])
  const [purchase, setPurchase] = useState<Purchase>("subscribe")
  const [quantity, setQuantity] = useState(1)
  const buy = useRef<HTMLDivElement>(null)
  const [pastBuy, setPastBuy] = useState(false)

  // Sets are already discounted, so they sell one-time only.
  const subscribable = product.step !== "sets" && !product.soldOut
  const subscribed = subscribable && purchase === "subscribe"
  const subscribeAt = subscribePrice(size.price)
  const perUnit = sizes.length > 1 ? unitPrice(size) : undefined
  const isDefaultSize = size.id === sizes[0].id

  // A scroll check, not an observer: an anchor jump skips past without ever crossing an edge.
  useEffect(() => {
    const update = () => {
      const target = buy.current
      if (target) setPastBuy(target.getBoundingClientRect().bottom < 0)
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  return (
    <div className={cn("min-w-0", className)}>
      {/* The entrance leaves a transform behind, which would pin the fixed phone bar to this box. */}
      <div className="enter delay-150 lg:pt-4">
        <p className="eyebrow">
          {step.number && <span className="figures">{step.number}</span>}
          {step.name}
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl">{product.name}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{product.benefit}</p>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <Price
            amount={size.price}
            compareAt={isDefaultSize ? product.compareAtPrice : undefined}
            className="text-xl font-medium"
          />
          <Rating
            value={product.rating}
            count={product.reviews}
            variant="stars"
          />
        </div>

        <div className="mt-8 border-t pt-6">
          <p id="product-size" className="text-sm font-medium">
            Size:{" "}
            <span className="font-normal text-muted-foreground">
              {size.label}
              {perUnit && ` · ${perUnit}`}
            </span>
          </p>
          {sizes.length > 1 && (
            <ToggleGroup
              type="single"
              variant="outline"
              value={size.id}
              onValueChange={(id) => {
                const next = sizes.find((item) => item.id === id)
                if (next) setSize(next)
              }}
              aria-labelledby="product-size"
              className="mt-3 flex-wrap"
            >
              {sizes.map((item) => (
                <ToggleGroupItem key={item.id} value={item.id}>
                  {item.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          )}

          {subscribable && (
            <RadioGroup
              value={purchase}
              onValueChange={(value) => setPurchase(value as Purchase)}
              aria-label="Purchase options"
              className="mt-6"
            >
              <FieldLabel htmlFor="purchase-subscribe">
                <Field orientation="horizontal">
                  <RadioGroupItem value="subscribe" id="purchase-subscribe" />
                  <FieldContent>
                    <FieldTitle>
                      Subscribe and save {site.commerce.subscribeDiscount}%
                    </FieldTitle>
                    <FieldDescription>
                      Sent {site.commerce.subscribeInterval}. Skip or cancel any
                      time.
                    </FieldDescription>
                  </FieldContent>
                  <span className="figures text-sm font-medium">
                    {formatPrice(subscribeAt)}
                  </span>
                </Field>
              </FieldLabel>
              <FieldLabel htmlFor="purchase-once">
                <Field orientation="horizontal">
                  <RadioGroupItem value="once" id="purchase-once" />
                  <FieldContent>
                    <FieldTitle>One-time purchase</FieldTitle>
                  </FieldContent>
                  <span className="figures text-sm font-medium">
                    {formatPrice(size.price)}
                  </span>
                </Field>
              </FieldLabel>
            </RadioGroup>
          )}

          <div ref={buy} className="mt-6 flex flex-wrap gap-3">
            {!product.soldOut && (
              <QuantityStepper
                size="lg"
                value={quantity}
                onValueChange={setQuantity}
              />
            )}
            <AddToBagButton
              product={product}
              productVariant={size}
              subscribe={subscribed}
              quantity={quantity}
              size="lg"
              className="flex-1"
            />
          </div>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
            {assurances.map((item) => (
              <li key={item.label} className="flex items-center gap-1.5">
                <item.icon className="size-3.5" strokeWidth={1.5} />
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <Accordion type="single" collapsible className="mt-8">
          <AccordionItem value="use">
            <AccordionTrigger>How to use</AccordionTrigger>
            <AccordionContent>{product.howToUse}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="ingredients">
            <AccordionTrigger>
              {contents ? "What's in the set" : "Key ingredients"}
            </AccordionTrigger>
            <AccordionContent>
              <p>
                {(
                  contents ??
                  product.keyIngredients.map((ingredient) => ingredient.name)
                ).join(", ")}
                .
              </p>
              <p>
                Fragrance-free. The full list is printed on the box and on the
                label.
              </p>
            </AccordionContent>
          </AccordionItem>
          {refillable.has(product.slug) && (
            <AccordionItem value="refills">
              <AccordionTrigger>Refills</AccordionTrigger>
              <AccordionContent>
                The glass is yours to keep. Refills arrive in a recyclable
                aluminum pod and cost less than the first bottle.
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </div>

      <div
        inert={!pastBuy}
        className={cn(
          "fixed inset-x-3 bottom-3 z-40 flex items-center gap-3 rounded-full bg-background p-2 ps-5 shadow-xl transition duration-500 ease-soft lg:hidden",
          !pastBuy && "pointer-events-none translate-y-4 opacity-0"
        )}
      >
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{product.name}</p>
          <p className="truncate text-xs text-muted-foreground">
            {subscribed
              ? `${size.label}, ${site.commerce.subscribeInterval}`
              : size.label}
          </p>
        </div>
        <AddToBagButton
          product={product}
          productVariant={size}
          subscribe={subscribed}
          quantity={quantity}
          label="Add"
          className="shrink-0"
        />
      </div>
    </div>
  )
}

function unitPrice({ label, price }: ProductVariant) {
  const match = label.match(/^(\d+(?:\.\d+)?)\s*(ml|g)\b/)
  if (!match) return undefined
  return `${formatPrice(price / Number(match[1]))} per ${match[2]}`
}
