import Footer from "@/components/layout/footer"
import Navbar from "@/components/layout/navbar"

export default function SiteLayout({
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
    </>
  )
}
