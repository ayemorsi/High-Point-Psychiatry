"use client"

import { useSyncExternalStore } from "react"

import { EmptyBag } from "@/components/layout/bag/summary"
import CheckoutForm, {
  CheckoutFormSkeleton,
} from "@/components/sections/checkout/checkout-form"
import { useBag } from "@/hooks/use-bag"

const subscribeNothing = () => () => {}

export default function Checkout() {
  const { lines } = useBag()
  // The bag lives in localStorage, so the server can't tell a full bag from an empty one.
  const hydrated = useSyncExternalStore(
    subscribeNothing,
    () => true,
    () => false
  )

  return (
    <section className="section-padding container pt-8! md:pt-12!">
      <div className="mx-auto max-w-6xl">
        {hydrated && lines.length === 0 ? (
          <>
            <h1 className="sr-only">Checkout</h1>
            {/* Drawer-width, so the rings keep the proportions they were drawn for. */}
            <div className="mx-auto flex min-h-112 max-w-xl flex-col">
              <EmptyBag />
            </div>
          </>
        ) : (
          <>
            <h1 className="text-4xl md:text-5xl">Checkout</h1>
            {hydrated ? (
              <CheckoutForm />
            ) : (
              <CheckoutFormSkeleton />
            )}
          </>
        )}
      </div>
    </section>
  )
}
