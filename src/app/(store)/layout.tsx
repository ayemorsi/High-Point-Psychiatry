import Footer from "@/components/layout/footer"
import Navbar from "@/components/layout/navbar"
import OfferDialog from "@/components/layout/offer-dialog"

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="relative flex-1">
        {children}
      </main>
      <Footer />
      <OfferDialog />
    </>
  )
}
