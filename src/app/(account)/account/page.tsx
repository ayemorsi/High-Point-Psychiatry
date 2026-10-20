import type { Metadata } from "next"

import AccountSignIn from "@/components/sections/account/sign-in"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Sign in",
  description: `Sign in to your ${site.name} account, or create one to track orders and manage subscriptions.`,
  robots: { index: false },
}

export default function AccountPage() {
  return <AccountSignIn />
}
