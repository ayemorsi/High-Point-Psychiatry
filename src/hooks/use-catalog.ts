"use client"

import { type Nullable, useQueryStates } from "nuqs"

import {
  type ShopFilters,
  shopHref,
  shopParams,
  type Sort,
} from "@/lib/shop-params"
import type { Concern, Product, SkinType, StepFilter } from "@/lib/types"

type SetFilters = (patch: Partial<Nullable<ShopFilters>>) => unknown

function sortProducts(list: Product[], sort: Sort) {
  const by = [...list]
  switch (sort) {
    case "newest":
      return by.sort(
        (a, b) => Number(b.badge === "New") - Number(a.badge === "New")
      )
    case "price-low":
      return by.sort((a, b) => a.price - b.price)
    case "price-high":
      return by.sort((a, b) => b.price - a.price)
    case "rating":
      return by.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
    default:
      return by.sort((a, b) => b.reviews - a.reviews)
  }
}

const toggle = <T>(list: T[], value: T) =>
  list.includes(value) ? list.filter((it) => it !== value) : [...list, value]

// The step is the route; concerns, skin types, bestsellers and sort live in the query string.
export function useCatalog(products: Product[], step: StepFilter) {
  const [filters, setFilters] = useQueryStates(shopParams)
  return catalogFor(products, step, filters, setFilters)
}

// The same model without the URL, so a prerendered step page still paints its full grid.
export function catalogFor(
  products: Product[],
  step: StepFilter,
  filters: ShopFilters,
  setFilters: SetFilters
) {
  const { concern: concerns, skin: skinTypes, bestsellers, sort } = filters

  const matches = (
    product: Product,
    overrides: {
      step?: StepFilter
      concerns?: Concern[]
      skinTypes?: SkinType[]
    } = {}
  ) => {
    const byStep = overrides.step ?? step
    const byConcern = overrides.concerns ?? concerns
    const bySkin = overrides.skinTypes ?? skinTypes
    return (
      (byStep === "all" || product.step === byStep) &&
      (!bestsellers || product.bestseller) &&
      (byConcern.length === 0 ||
        byConcern.some((concern) => product.concerns.includes(concern))) &&
      (bySkin.length === 0 ||
        bySkin.some((skin) => product.skinTypes.includes(skin)))
    )
  }

  // How many products a filter would leave, with every other filter as it is now.
  const countWith = (overrides: Parameters<typeof matches>[1]) =>
    products.filter((product) => matches(product, overrides)).length

  const applied = [
    ...(bestsellers
      ? [
          {
            key: "bestsellers",
            label: "Bestsellers",
            clear: () => setFilters({ bestsellers: null }),
          },
        ]
      : []),
    ...concerns.map((value) => ({
      key: `concern-${value}`,
      label: value,
      clear: () =>
        setFilters({ concern: concerns.filter((it) => it !== value) }),
    })),
    ...skinTypes.map((value) => ({
      key: `skin-${value}`,
      label: `${value} skin`,
      clear: () => setFilters({ skin: skinTypes.filter((it) => it !== value) }),
    })),
  ]

  return {
    step,
    // Switching step is a navigation, so the link carries the other filters with it.
    stepHref: (id: StepFilter) =>
      shopHref(id === "all" ? "/shop" : `/shop/${id}`, filters),
    concerns,
    toggleConcern: (value: Concern) =>
      setFilters({ concern: toggle(concerns, value) }),
    skinTypes,
    toggleSkinType: (value: SkinType) =>
      setFilters({ skin: toggle(skinTypes, value) }),
    sort,
    setSort: (value: Sort) => setFilters({ sort: value }),
    matching: sortProducts(
      products.filter((product) => matches(product)),
      sort
    ),
    countWith,
    applied,
    clearAll: () =>
      setFilters({ concern: null, skin: null, bestsellers: null }),
  }
}

export type CatalogState = ReturnType<typeof catalogFor>
