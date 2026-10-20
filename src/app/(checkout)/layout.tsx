import CheckoutFooter from "@/components/layout/checkout-footer"
import CheckoutHeader from "@/components/layout/checkout-header"

// Checkout drops the nav, the bag drawer and the footer so nothing pulls the shopper away mid-payment.
export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <CheckoutHeader />
      <main id="main-content" className="relative flex-1">
        {children}
      </main>
      <CheckoutFooter />
    </>
  )
}
