"use client"

import { useRef } from "react"
import Image from "next/image"
import {
  CheckIcon,
  PlusIcon,
  RotateCcwIcon,
  TruckIcon,
  XIcon,
} from "lucide-react"
import { useInView } from "motion/react"

import AddToBagButton from "@/components/elements/add-to-bag-button"
import Price from "@/components/elements/price"
import Reveal from "@/components/elements/reveal"
import SectionHeading from "@/components/elements/section-heading"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useRoutineBuilder } from "@/hooks/use-routine-builder"
import { SKIN_TYPES } from "@/lib/shop-params"
import { site } from "@/lib/site"
import type { Product, Step } from "@/lib/types"
import { cn, formatPrice, spell } from "@/lib/utils"

// The shopper makes the set from photo tiles, or takes one product.
export default function Builder({ products }: { products: Product[] }) {
  const {
    steps,
    groups,
    chosen,
    count,
    covered,
    complete,
    full,
    total,
    matchedSkin,
    hint,
    buttonLabel,
    isPicked,
    toggle,
    clear,
    pickSkin,
  } = useRoutineBuilder(products)
  const action = useRef<HTMLDivElement>(null)
  const actionInView = useInView(action)

  return (
    <section className="p-2 md:p-3">
      <div className="rounded-3xl bg-card">
        <div className="section-padding container">
          <Reveal>
            <SectionHeading
              title="Build your routine"
              lede="Pick one product for each step."
              action={{ label: "Find my routine", href: "/routine" }}
            />
          </Reveal>

          <Reveal
            delay={0.06}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <p id="builder-skin" className="text-sm text-muted-foreground">
              Pick all {spell(steps.length)} for your skin type
            </p>
            <ToggleGroup
              type="single"
              variant="outline"
              size="sm"
              value={matchedSkin}
              onValueChange={pickSkin}
              aria-labelledby="builder-skin"
              className="flex-wrap"
            >
              {SKIN_TYPES.map((skin) => (
                <ToggleGroupItem key={skin} value={skin}>
                  {skin}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 items-start gap-10 md:mt-14 lg:grid-cols-[1fr_22rem] lg:gap-16">
            <div className="min-w-0">
              <ol className="space-y-10">
                {steps.map((step, index) => (
                  <li key={step.id}>
                    <h3
                      id={`builder-step-${step.id}`}
                      className="sans-heading flex flex-wrap items-baseline gap-x-2 text-base"
                    >
                      <span className="figures text-muted-foreground">
                        {step.number}
                      </span>
                      {step.name}
                      <span className="font-normal text-muted-foreground">
                        {step.job}
                      </span>
                    </h3>
                    <ul
                      aria-labelledby={`builder-step-${step.id}`}
                      className="-mx-4 mt-3 no-scrollbar flex gap-3 overflow-x-auto px-4 py-1 md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0 lg:grid-cols-6"
                    >
                      {step.products.map((product) => (
                        <li
                          key={product.slug}
                          className="w-28 shrink-0 md:w-auto"
                        >
                          <Option
                            product={product}
                            selected={isPicked(index, product.slug)}
                            onToggle={() => toggle(index, product.slug)}
                          />
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>

              {count > 0 && (
                <div
                  className={cn(
                    "dark sticky bottom-3 z-10 mt-8 flex items-center justify-between gap-3 rounded-full bg-background py-2 ps-5 pe-2 text-foreground shadow-xl transition-[opacity,visibility] duration-300 lg:hidden",
                    actionInView && "invisible opacity-0"
                  )}
                >
                  <div className="min-w-0 text-sm">
                    <p className="truncate font-medium">
                      {count} {count === 1 ? "product" : "products"} · {covered}{" "}
                      of {steps.length} steps
                    </p>
                    <p
                      className={cn(
                        "truncate text-xs text-muted-foreground",
                        complete && "text-accent"
                      )}
                    >
                      {hint}
                    </p>
                  </div>
                  <AddToBagButton
                    product={chosen}
                    label="Add"
                    className="shrink-0"
                  />
                </div>
              )}
            </div>

            <Reveal className="lg:sticky lg:top-28">
              <aside
                aria-label="Your routine"
                className="rounded-2xl bg-background p-6"
              >
                <h3 className="text-2xl">Your routine</h3>

                <ol className="mt-5 divide-y border-y">
                  {groups.map(({ step, index, products }) => (
                    <StepRow
                      key={step.id}
                      step={step}
                      products={products}
                      onClear={() => clear(index)}
                    />
                  ))}
                </ol>

                <div className="mt-5">
                  <div aria-hidden="true" className="flex gap-1">
                    {steps.map((step, index) => (
                      <span
                        key={step.id}
                        className={cn(
                          "h-1 flex-1 rounded-full bg-muted transition-colors duration-500 ease-soft",
                          index < covered &&
                            (complete ? "bg-accent" : "bg-foreground")
                        )}
                      />
                    ))}
                  </div>
                  <p
                    aria-live="polite"
                    className={cn(
                      "mt-2 text-xs text-muted-foreground",
                      complete && "text-accent"
                    )}
                  >
                    {hint}
                  </p>
                </div>

                <div className="mt-5 flex items-baseline justify-between">
                  <p className="text-sm">Total</p>
                  <Price
                    amount={total}
                    compareAt={complete ? full : undefined}
                    className="text-lg font-medium"
                  />
                </div>

                <div ref={action} className="mt-5">
                  {count === 0 ? (
                    <Button size="lg" disabled className="w-full">
                      Pick a product to start
                    </Button>
                  ) : (
                    <AddToBagButton
                      product={chosen}
                      label={buttonLabel}
                      size="lg"
                      className="w-full"
                    />
                  )}
                </div>

                <ul className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <li className="flex items-center gap-1.5">
                    <TruckIcon className="size-3.5" strokeWidth={1.5} />
                    Free shipping over{" "}
                    {formatPrice(site.commerce.freeShippingThreshold)}
                  </li>
                  <li className="flex items-center gap-1.5">
                    <RotateCcwIcon className="size-3.5" strokeWidth={1.5} />
                    {site.commerce.returnsDays}-day returns
                  </li>
                </ul>
              </aside>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

// The preview opens to the left of the routine column, so it needs a mouse and the desktop layout.
const PREVIEW = "(min-width: 64rem) and (hover: hover)"

// Two or more picks collapse into a stack; hovering fans it out, and the names always wrap in the row for touch and screen readers.
function StepRow({
  step,
  products,
  onClear,
}: {
  step: Step
  products: Product[]
  onClear: () => void
}) {
  const subtotal = products.reduce((sum, product) => sum + product.price, 0)
  const stacked = products.length > 1
  const canPreview = useMediaQuery(PREVIEW)

  const summary = (
    <div className="group/stack flex min-w-0 flex-1 items-center gap-3">
      <div aria-hidden="true" className="flex w-18 shrink-0 -space-x-9">
        {products.length === 0 ? (
          <span className="block size-12 rounded-lg border border-dashed" />
        ) : (
          products.slice(0, 3).map((product, index, shown) => (
            <div
              key={product.slug}
              className={cn(
                "swap relative size-12 shrink-0 overflow-hidden rounded-lg bg-card ring-2 ring-background transition-transform duration-500 ease-soft",
                stacked &&
                  index === 0 &&
                  "group-data-[state=open]/stack:-translate-x-1 group-data-[state=open]/stack:-rotate-6",
                stacked &&
                  index === shown.length - 1 &&
                  "group-data-[state=open]/stack:translate-x-2 group-data-[state=open]/stack:rotate-6",
                shown.length === 3 &&
                  index === 1 &&
                  "group-data-[state=open]/stack:-translate-y-1"
              )}
            >
              {product.image && (
                <Image
                  src={product.image.src}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              )}
            </div>
          ))
        )}
      </div>
      <div className="min-w-0 flex-1 text-sm">
        <p className="figures text-xs text-muted-foreground">
          {step.number} {step.name}
          {stacked && ` · ${products.length} products`}
        </p>
        <p
          className={cn(
            "font-medium text-pretty",
            products.length === 0 && "text-muted-foreground"
          )}
        >
          {products.length === 0
            ? "Not picked"
            : products.map((product) => product.name).join(", ")}
        </p>
      </div>
    </div>
  )

  return (
    <li className="flex min-h-18 items-center gap-3 py-3">
      {stacked && canPreview ? (
        <HoverCard openDelay={100} closeDelay={80}>
          <HoverCardTrigger asChild>{summary}</HoverCardTrigger>
          <HoverCardContent side="left" sideOffset={16}>
            <p className="figures text-xs text-muted-foreground">
              {step.number} {step.name} · {products.length} products
            </p>
            <ul className="mt-3 space-y-2">
              {products.map((product, index) => (
                <li
                  key={product.slug}
                  style={{ animationDelay: `${index * 40}ms` }}
                  className="flex animate-in items-center gap-3 duration-300 ease-soft fill-mode-both fade-in slide-in-from-right-2 motion-reduce:slide-in-from-right-0"
                >
                  <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-card">
                    {product.image && (
                      <Image
                        src={product.image.src}
                        alt=""
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <p className="min-w-0 flex-1 truncate font-medium">
                    {product.name}
                  </p>
                  <Price amount={product.price} />
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-baseline justify-between border-t pt-3">
              <p className="text-muted-foreground">Subtotal</p>
              <Price amount={subtotal} className="font-medium" />
            </div>
          </HoverCardContent>
        </HoverCard>
      ) : (
        summary
      )}
      {products.length > 0 && (
        <>
          <Price amount={subtotal} className="text-sm" />
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label={`Clear ${step.name}`}
            onClick={onClear}
          >
            <XIcon />
          </Button>
        </>
      )}
    </li>
  )
}

function Option({
  product,
  selected,
  onToggle,
}: {
  product: Product
  selected: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={product.soldOut}
      onClick={onToggle}
      className="group w-full cursor-pointer rounded-xl text-start outline-none disabled:cursor-not-allowed"
    >
      <div
        className={cn(
          "media aspect-4/5 rounded-xl ring-2 ring-transparent ring-offset-2 ring-offset-card transition duration-200 ease-out group-focus-visible:ring-ring",
          selected ? "ring-foreground" : "group-hover:ring-foreground/20",
          product.soldOut && "opacity-50"
        )}
      >
        {product.image && (
          <Image
            src={product.image.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 10vw, (min-width: 768px) 18vw, 112px"
            className="object-cover"
          />
        )}
        {!product.soldOut && (
          <span
            aria-hidden="true"
            className={cn(
              "absolute end-2 top-2 flex size-6 items-center justify-center rounded-full bg-background/85 backdrop-blur-sm transition-colors duration-200 ease-out",
              selected && "bg-foreground text-background"
            )}
          >
            {selected ? (
              <CheckIcon className="size-3.5" />
            ) : (
              <PlusIcon className="size-3.5" />
            )}
          </span>
        )}
      </div>
      <p className="mt-2 text-sm leading-snug font-medium">{product.name}</p>
      <p className="figures text-xs text-muted-foreground">
        {product.soldOut ? "Sold out" : formatPrice(product.price)}
      </p>
    </button>
  )
}
