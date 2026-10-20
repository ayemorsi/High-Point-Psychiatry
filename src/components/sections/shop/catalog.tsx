"use client"

import { Fragment, Suspense } from "react"
import Link from "next/link"
import {
  ArrowRightIcon,
  ChevronDownIcon,
  SlidersHorizontalIcon,
  XIcon,
} from "lucide-react"

import ProductCard from "@/components/elements/product-card"
import Reveal from "@/components/elements/reveal"
import ShopCover from "@/components/sections/shop/cover"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Toggle } from "@/components/ui/toggle"
import { catalogFor, type CatalogState, useCatalog } from "@/hooks/use-catalog"
import {
  bestsellersHref,
  CONCERNS,
  defaultFilters,
  SKIN_TYPES,
  type Sort,
} from "@/lib/shop-params"
import { steps } from "@/lib/steps"
import type { Product, ProductImage, StepFilter } from "@/lib/types"
import { cn } from "@/lib/utils"

// Labels only. The union itself lives in lib/shop-params, which the URL is parsed against.
const SORTS: { value: Sort; label: string }[] = [
  { value: "bestselling", label: "Bestselling" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price, low to high" },
  { value: "price-high", label: "Price, high to low" },
  { value: "rating", label: "Top rated" },
]

// Below xl the rail's routine link is hidden, so the grid carries it after this many products.
const ROUTINE_TILE_AFTER = 8

type CatalogProps = {
  title: string
  lede: string
  image: ProductImage
  products: Product[]
  step?: StepFilter
}

export default function Catalog({
  title,
  lede,
  image,
  products,
  step = "all",
}: CatalogProps) {
  return (
    <>
      <ShopCover title={title} lede={lede} image={image} />
      <Suspense
        fallback={
          <Directory
            catalog={catalogFor(products, step, defaultFilters, () => {})}
          />
        }
      >
        <LiveDirectory products={products} step={step} />
      </Suspense>
    </>
  )
}

// Reads the URL, so a prerendered step page paints the unfiltered fallback until it hydrates.
function LiveDirectory({
  products,
  step,
}: {
  products: Product[]
  step: StepFilter
}) {
  return <Directory catalog={useCatalog(products, step)} />
}

function Directory({ catalog }: { catalog: CatalogState }) {
  const tileAt = Math.min(ROUTINE_TILE_AFTER, catalog.matching.length)

  return (
    <section className="section-padding container pt-8! md:pt-10!">
      <div className="xl:grid xl:grid-cols-[14rem_minmax(0,1fr)] xl:gap-14">
        <aside aria-label="Filters" className="hidden xl:block">
          <div className="sticky top-28 space-y-10">
            <StepFacet catalog={catalog} />
            <CheckFacet
              legend="Concern"
              options={CONCERNS.map((concern) => ({
                value: concern,
                label: concern,
                checked: catalog.concerns.includes(concern),
                count: catalog.countWith({ concerns: [concern] }),
                onChange: () => catalog.toggleConcern(concern),
              }))}
            />
            <CheckFacet
              legend="Skin type"
              options={SKIN_TYPES.map((skin) => ({
                value: skin,
                label: skin,
                checked: catalog.skinTypes.includes(skin),
                count: catalog.countWith({ skinTypes: [skin] }),
                onChange: () => catalog.toggleSkinType(skin),
              }))}
            />
            <p className="text-sm text-muted-foreground">
              Not sure where to start?{" "}
              <Link
                href="/routine"
                className="text-foreground underline underline-offset-4"
              >
                Find my routine
              </Link>
            </p>
          </div>
        </aside>

        <div className="min-w-0">
          <div className="flex items-center gap-3 xl:hidden">
            <StepTabs catalog={catalog} />
            <FiltersSheet catalog={catalog} />
          </div>
          <div className="mt-4 flex items-center gap-4 xl:mt-0">
            <AppliedFilters catalog={catalog} />
            <SortMenu catalog={catalog} />
          </div>

          {catalog.matching.length === 0 ? (
            <NoResults catalog={catalog} />
          ) : (
            <ul className="product-grid mt-6">
              {catalog.matching.map((product, index) => (
                <Fragment key={product.slug}>
                  {index === tileAt && <RoutineTile />}
                  <li>
                    <Reveal delay={Math.min(index, 3) * 0.05}>
                      <ProductCard product={product} />
                    </Reveal>
                  </li>
                </Fragment>
              ))}
              {tileAt === catalog.matching.length && <RoutineTile />}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

function RoutineTile() {
  return (
    <li className="xl:hidden">
      <Link
        href="/routine"
        className="flex aspect-4/5 flex-col justify-end rounded-2xl bg-secondary p-4 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 md:p-6"
      >
        <h3 className="text-2xl leading-tight md:text-3xl">
          Not sure where to start?
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Answer a few questions, get a routine.
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium">
          Find my routine
          <ArrowRightIcon aria-hidden="true" className="size-4" />
        </span>
      </Link>
    </li>
  )
}

function StepFacet({ catalog }: { catalog: CatalogState }) {
  const options = [{ id: "all" as const, name: "All products" }, ...steps]

  return (
    <nav aria-label="Step">
      <p className="text-sm font-medium">Step</p>
      <ul className="mt-3 space-y-1">
        {options.map((option) => {
          const active = catalog.step === option.id
          return (
            <li key={option.id}>
              <Link
                href={catalog.stepHref(option.id)}
                scroll={false}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex w-full items-baseline justify-between gap-3 rounded-full py-1 text-start text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground",
                  active && "font-medium text-foreground"
                )}
              >
                {option.name}
                <span className="figures text-xs text-muted-foreground">
                  {catalog.countWith({ step: option.id })}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

type CheckFacetProps = {
  legend: string
  options: {
    value: string
    label: string
    checked: boolean
    count: number
    onChange: () => void
  }[]
}

function CheckFacet({ legend, options }: CheckFacetProps) {
  return (
    <fieldset>
      <legend className="text-sm font-medium">{legend}</legend>
      <ul className="mt-3 space-y-2.5">
        {options.map((option) => (
          <li key={option.value}>
            <label
              className={cn(
                "flex cursor-pointer items-center gap-3 text-sm",
                option.count === 0 && !option.checked && "opacity-50"
              )}
            >
              <Checkbox
                checked={option.checked}
                onCheckedChange={option.onChange}
              />
              <span className="flex-1">{option.label}</span>
              <span className="figures text-xs text-muted-foreground">
                {option.count}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  )
}

// Below xl the rail folds away: steps become tabs and the rest moves into a bottom sheet.
function StepTabs({ catalog }: { catalog: CatalogState }) {
  const { step, stepHref } = catalog

  return (
    <div className="-my-1 no-scrollbar min-w-0 flex-1 overflow-x-auto py-1">
      <ul className="flex w-max gap-2">
        {[{ id: "all" as const, number: undefined, name: "All" }, ...steps].map(
          (option) => (
            <li key={option.id}>
              <Button
                asChild
                variant={step === option.id ? "secondary" : "outline"}
                size="sm"
              >
                <Link
                  href={stepHref(option.id)}
                  scroll={false}
                  aria-current={step === option.id ? "page" : undefined}
                >
                  {option.number && (
                    <span
                      className={cn(
                        "figures",
                        step !== option.id && "text-muted-foreground"
                      )}
                    >
                      {option.number}
                    </span>
                  )}
                  {option.name}
                </Link>
              </Button>
            </li>
          )
        )}
      </ul>
    </div>
  )
}

function FiltersSheet({ catalog }: { catalog: CatalogState }) {
  const { concerns, skinTypes, toggleConcern, toggleSkinType } = catalog

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="shrink-0">
          <SlidersHorizontalIcon data-icon="inline-start" />
          Filters
          {catalog.applied.length > 0 && (
            <span className="figures">{catalog.applied.length}</span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[85svh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="space-y-6 px-4 pb-8">
          <fieldset>
            <legend className="text-sm font-medium">Concern</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {CONCERNS.map((concern) => (
                <Toggle
                  key={concern}
                  variant="outline"
                  size="sm"
                  pressed={concerns.includes(concern)}
                  onPressedChange={() => toggleConcern(concern)}
                >
                  {concern}
                </Toggle>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="text-sm font-medium">Skin type</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {SKIN_TYPES.map((skin) => (
                <Toggle
                  key={skin}
                  variant="outline"
                  size="sm"
                  pressed={skinTypes.includes(skin)}
                  onPressedChange={() => toggleSkinType(skin)}
                >
                  {skin}
                </Toggle>
              ))}
            </div>
          </fieldset>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function SortMenu({ catalog }: { catalog: CatalogState }) {
  const current = SORTS.find((option) => option.value === catalog.sort)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="shrink-0">
          <span className="sr-only">Sort by </span>
          {current?.label}
          <ChevronDownIcon data-icon="inline-end" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup
          value={catalog.sort}
          onValueChange={(value) => catalog.setSort(value as Sort)}
        >
          {SORTS.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function AppliedFilters({ catalog }: { catalog: CatalogState }) {
  const { matching, applied, clearAll } = catalog

  return (
    <div className="flex flex-1 flex-wrap items-center gap-x-4 gap-y-2">
      <p aria-live="polite" className="figures text-sm text-muted-foreground">
        {matching.length} {matching.length === 1 ? "product" : "products"}
      </p>
      {applied.map((filter) => (
        <Button
          key={filter.key}
          variant="secondary"
          size="xs"
          onClick={filter.clear}
        >
          {filter.label}
          <XIcon data-icon="inline-end" />
          <span className="sr-only">Remove filter</span>
        </Button>
      ))}
      {applied.length > 0 && (
        <Button variant="link" size="sm" onClick={clearAll}>
          Clear filters
        </Button>
      )}
    </div>
  )
}

function NoResults({ catalog }: { catalog: CatalogState }) {
  return (
    <Empty className="mt-10">
      <EmptyHeader>
        <EmptyTitle>No products match these filters.</EmptyTitle>
        <EmptyDescription>
          Try one filter at a time, or start from the bestsellers.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex flex-wrap justify-center gap-3">
          <Button onClick={catalog.clearAll}>Clear filters</Button>
          <Button asChild variant="secondary">
            <Link href={bestsellersHref}>Show bestsellers</Link>
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  )
}
