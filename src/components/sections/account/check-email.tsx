import Link from "next/link"
import { MailCheckIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { bestsellersHref } from "@/lib/shop-params"

type CheckEmailProps = {
  ref?: React.Ref<HTMLHeadingElement>
  email: string
  message: (email: React.ReactNode) => React.ReactNode
  onBack: () => void
}

export default function CheckEmail({ ref, email, message, onBack }: CheckEmailProps) {
  return (
    <div className="swap text-center">
      <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-success text-success-foreground">
        <MailCheckIcon aria-hidden="true" className="size-5" />
      </span>
      <h1
        ref={ref}
        tabIndex={-1}
        className="mt-8 text-4xl outline-none md:text-5xl"
      >
        Check your email.
      </h1>
      <p className="mt-3 text-muted-foreground md:text-lg">
        {message(
          <span className="font-medium break-all text-foreground">{email}</span>
        )}
      </p>
      <Button asChild size="lg" className="mt-10 w-full">
        <Link href={bestsellersHref}>Shop bestsellers</Link>
      </Button>
      <div className="mt-6 text-center">
        <Button variant="link" onClick={onBack}>
          Use a different email
        </Button>
      </div>
    </div>
  )
}
