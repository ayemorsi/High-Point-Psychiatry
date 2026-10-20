import Footer from "@/components/layout/footer"
import InfoBar from "@/components/layout/info-bar"
import Navbar from "@/components/layout/navbar"

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <InfoBar />
      <Navbar />
      <main id="main-content" className="relative flex-1">
        {children}
      </main>
      <Footer />
    </>
  )
}
