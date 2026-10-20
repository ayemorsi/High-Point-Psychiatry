import Navbar from "@/components/layout/navbar"

// Sign-in stands alone: no footer or offer popup to pull focus from its one task.
export default function AccountLayout({
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
    </>
  )
}
