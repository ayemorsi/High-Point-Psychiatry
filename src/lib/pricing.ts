import { site } from "@/lib/site"
import { routineStepIds } from "@/lib/steps"
import type { Product, ProductVariant, StepId, Totals } from "@/lib/types"

// Every price rule the store applies. A real checkout recomputes these on the server.
const { commerce } = site

export type ShippingMethodId = (typeof commerce.shipping)[number]["id"]

export const round = (value: number) => Math.round(value * 100) / 100

const percentOf = (amount: number, percent: number) =>
  round((amount * percent) / 100)

// A product without variants sells in one size at its own price.
export function getVariants(product: Product): ProductVariant[] {
  return product.variants?.length
    ? product.variants
    : [{ id: "default", label: product.size, price: product.price }]
}

export function subscribePrice(price: number) {
  return round(price - percentOf(price, commerce.subscribeDiscount))
}

// Single products that fill every routine step between them take the set discount. Sets are already discounted.
export function routineSaving(lines: { step: StepId; total: number }[]) {
  const singles = lines.filter((line) => line.step !== "sets")
  const complete = routineStepIds.every((step) =>
    singles.some((line) => line.step === step)
  )
  if (!complete) return 0
  const full = singles.reduce((sum, line) => sum + line.total, 0)
  return percentOf(full, commerce.setDiscount)
}

// The price of several products bought together, as the routine builder and finder add them.
export function routinePrice(products: Product[]) {
  const full = round(products.reduce((sum, product) => sum + product.price, 0))
  const saved = routineSaving(
    products.map((product) => ({ step: product.step, total: product.price }))
  )
  return { full, saved, total: round(full - saved) }
}

export function freeShipping(amount: number) {
  const threshold = commerce.freeShippingThreshold
  return {
    free: amount >= threshold,
    remaining: Math.max(0, round(threshold - amount)),
    progress: Math.min(100, (amount / threshold) * 100),
  }
}

export function getShippingMethod(id: ShippingMethodId) {
  return (
    commerce.shipping.find((method) => method.id === id) ?? commerce.shipping[0]
  )
}

export function deliveryTime(id: ShippingMethodId = "standard") {
  const [from, to] = getShippingMethod(id).days
  return `${from} to ${to} business days`
}

// The welcome code comes off after the routine saving, and free shipping is judged on what's left.
export function orderTotals({
  subtotal,
  saving,
  code,
  method,
}: {
  subtotal: number
  saving: number
  code: string | null
  method: ShippingMethodId
}): Totals {
  const afterSaving = round(subtotal - saving)
  const discount = code
    ? { code, amount: percentOf(afterSaving, commerce.welcomeDiscount) }
    : undefined
  const merchandise = round(afterSaving - (discount?.amount ?? 0))
  const shipping =
    method === "standard" && freeShipping(merchandise).free
      ? 0
      : getShippingMethod(method).price

  return {
    subtotal,
    saving,
    discount,
    shipping,
    total: round(merchandise + shipping),
  }
}
