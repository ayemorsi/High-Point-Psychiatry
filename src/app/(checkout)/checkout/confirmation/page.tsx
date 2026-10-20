import type { Metadata } from "next"

import Confirmation from "@/components/sections/checkout/confirmation"

export const metadata: Metadata = {
  title: "Order confirmed",
  description: "Your order number, delivery date and receipt.",
  robots: { index: false, follow: false },
}

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string | string[] }>
}) {
  const { order } = await searchParams
  return <Confirmation number={typeof order === "string" ? order : undefined} />
}
