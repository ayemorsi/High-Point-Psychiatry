"use client"

import { useId, useState, useTransition } from "react"
import { toast } from "sonner"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"
import { subscribe } from "@/lib/actions"
import { site } from "@/lib/site"

type SignupFormProps = {
  className?: string
}

export default function SignupForm({ className }: SignupFormProps) {
  const id = useId()
  const errorId = `${id}-error`
  const [failed, setFailed] = useState(false)
  const [pending, startTransition] = useTransition()

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const email = String(new FormData(form).get("email") ?? "").trim()
    setFailed(false)
    startTransition(async () => {
      const { ok } = await subscribe(email)
      if (!ok) return setFailed(true)
      form.reset()
      toast.success("You're on the list. The code is on its way.")
    })
  }

  return (
    <div className={className}>
      <form onSubmit={onSubmit}>
        <label htmlFor={id} className="sr-only">
          Email address
        </label>
        <InputGroup>
          <InputGroupInput
            id={id}
            name="email"
            type="email"
            placeholder="Email address"
            required
            autoComplete="email"
            aria-invalid={failed || undefined}
            aria-describedby={failed ? errorId : undefined}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              variant="default"
              size="sm"
              type="submit"
              disabled={pending}
            >
              {pending && <Spinner />}
              Get {site.commerce.welcomeDiscount}% off
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </form>
      {failed ? (
        <p id={errorId} role="alert" className="mt-3 text-xs text-destructive">
          We couldn&apos;t sign you up. Try again in a minute.
        </p>
      ) : (
        <p className="mt-3 text-xs text-muted-foreground">
          Unsubscribe any time.
        </p>
      )}
    </div>
  )
}
