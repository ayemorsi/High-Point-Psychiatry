"use client"

import { useEffect, useRef, useState } from "react"
import { CheckIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { sendMessage } from "@/lib/actions"
import { site } from "@/lib/site"

type FieldName = "name" | "email" | "order" | "message"

const errorMessages: Partial<Record<FieldName, string>> = {
  name: "Tell us your name.",
  email: "Enter an email like you@example.com.",
  message: "Write your message first.",
}

type ContactFormProps = {
  className?: string
}

export default function ContactForm({ className }: ContactFormProps) {
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({})
  const [pending, setPending] = useState(false)
  const [failed, setFailed] = useState(false)
  const [sent, setSent] = useState<{ name: string; email: string } | null>(null)
  const heading = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (sent) heading.current?.focus({ preventScroll: true })
  }, [sent])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return
    const form = event.currentTarget
    const next: Partial<Record<FieldName, string>> = {}

    for (const name of Object.keys(errorMessages) as FieldName[]) {
      const input = form.elements.namedItem(name) as HTMLInputElement | null
      if (input && !input.checkValidity()) next[name] = errorMessages[name]
    }

    setErrors(next)
    const firstInvalid = Object.keys(next)[0]
    if (firstInvalid) {
      ;(form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus()
      return
    }

    const data = new FormData(form)
    const field = (name: FieldName) => String(data.get(name) ?? "").trim()
    setPending(true)
    setFailed(false)
    const result = await sendMessage({
      name: field("name"),
      email: field("email"),
      order: field("order") || undefined,
      body: field("message"),
    }).catch(() => ({ ok: false }))
    setPending(false)
    if (result.ok) {
      setSent({ name: field("name").split(/\s+/)[0], email: field("email") })
    } else {
      setFailed(true)
    }
  }

  function clearError(name: FieldName) {
    if (errors[name])
      setErrors((current) => ({ ...current, [name]: undefined }))
  }

  if (sent) {
    return (
      <div role="status" className={className}>
        <div className="swap rounded-2xl bg-card p-6 md:p-8">
          <span className="flex size-11 items-center justify-center rounded-full bg-success text-success-foreground">
            <CheckIcon aria-hidden="true" className="size-5" />
          </span>
          <h3
            ref={heading}
            tabIndex={-1}
            className="mt-6 text-3xl outline-none"
          >
            Thanks, {sent.name}. We have your message.
          </h3>
          <p className="mt-2 text-muted-foreground">
            We&apos;ll reply to {sent.email} within a day.
          </p>
          <Button
            variant="outline"
            className="mt-8"
            onClick={() => {
              setErrors({})
              setSent(null)
            }}
          >
            Send another message
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={onSubmit} className={className}>
      <FieldGroup>
        <div className="grid gap-7 sm:grid-cols-2 sm:gap-5">
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="contact-name">Name</FieldLabel>
            <Input
              id="contact-name"
              name="name"
              autoComplete="name"
              required
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              onChange={() => clearError("name")}
            />
            <FieldError id="contact-name-error">{errors.name}</FieldError>
          </Field>

          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="contact-email">Email</FieldLabel>
            <Input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              aria-invalid={!!errors.email}
              aria-describedby={
                errors.email ? "contact-email-error" : undefined
              }
              onChange={() => clearError("email")}
            />
            <FieldError id="contact-email-error">{errors.email}</FieldError>
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="contact-order">
            Order number
            <span className="font-normal text-muted-foreground">
              (optional)
            </span>
          </FieldLabel>
          <Input
            id="contact-order"
            name="order"
            autoCapitalize="characters"
            placeholder="NC-123456"
            aria-describedby="contact-order-help"
          />
          <FieldDescription id="contact-order-help">
            It&apos;s in your confirmation email.
          </FieldDescription>
        </Field>

        <Field data-invalid={!!errors.message}>
          <FieldLabel htmlFor="contact-message">Message</FieldLabel>
          <Textarea
            id="contact-message"
            name="message"
            required
            placeholder="Your question, and your skin type if it's about a product."
            aria-invalid={!!errors.message}
            aria-describedby={
              errors.message ? "contact-message-error" : undefined
            }
            onChange={() => clearError("message")}
          />
          <FieldError id="contact-message-error">{errors.message}</FieldError>
        </Field>

        <div>
          <Button type="submit" disabled={pending} className="max-sm:w-full">
            {pending && <Spinner data-icon="inline-start" aria-hidden="true" />}
            {pending ? "Sending" : "Send message"}
          </Button>
          {failed && (
            <p role="alert" className="mt-3 text-sm text-destructive">
              We couldn&apos;t send that. Try again, or write to{" "}
              {site.email.display}.
            </p>
          )}
        </div>
      </FieldGroup>
    </form>
  )
}
