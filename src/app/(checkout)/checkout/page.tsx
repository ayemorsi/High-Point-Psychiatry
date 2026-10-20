import type { Metadata } from "next"

import Checkout from "@/components/sections/checkout/checkout"

export const metadata: Metadata = {
  title: "Checkout",
  description: "Pay for the products in your bag.",
  robots: { index: false, follow: false },
}

export default function CheckoutPage() {
  return <Checkout />
}
