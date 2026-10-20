"use client"

import { useEffect, useRef, useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import HushForm from "@/components/sections/intake/hush-form"
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
import { cn } from "@/lib/utils"

type FieldName = "name" | "email" | "phone" | "message"

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
      phone: field("phone") || undefined,
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
            Thanks, {sent.name}. One last step.
          </h3>
          <p className="mt-2 text-muted-foreground">
            We have your message. To get started as a new patient, request your
            secure intake form: enter your email in the box below and click{" "}
            <span className="font-medium text-foreground">Request form</span>.
            We&apos;ll email you a private link.
          </p>
          <CopyEmail email={sent.email} className="mt-5" />
          <HushForm formId="hppmi-intake-form" className="min-h-64 pt-6" />
          <p className="mt-6 text-sm text-muted-foreground">
            Already a patient, or just had a question? You can skip this.
            We&apos;ll reply to {sent.email} as soon as we can.
          </p>
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
          <FieldLabel htmlFor="contact-phone">
            Phone
            <span className="font-normal text-muted-foreground">
              (optional)
            </span>
          </FieldLabel>
          <Input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-describedby="contact-phone-help"
          />
          <FieldDescription id="contact-phone-help">
            If you&apos;d prefer a call back.
          </FieldDescription>
        </Field>

        <Field data-invalid={!!errors.message}>
          <FieldLabel htmlFor="contact-message">Message</FieldLabel>
          <Textarea
            id="contact-message"
            name="message"
            required
            placeholder="Your question, or that you'd like to request an appointment."
            aria-invalid={!!errors.message}
            aria-describedby={
              errors.message
                ? "contact-message-help contact-message-error"
                : "contact-message-help"
            }
            onChange={() => clearError("message")}
          />
          <FieldDescription id="contact-message-help">
            Please don&apos;t include detailed medical information here.
          </FieldDescription>
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

// The intake request runs in HushForms' own secure frame, which the page can't type into, so the email is one tap away instead.
function CopyEmail({
  email,
  className,
}: {
  email: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard can be blocked; the address is on screen to type instead.
    }
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-full border bg-background py-1.5 ps-4 pe-1.5",
        className
      )}
    >
      <span className="min-w-0 truncate text-sm font-medium">{email}</span>
      <Button type="button" size="sm" variant="secondary" onClick={copy}>
        {copied ? (
          <CheckIcon data-icon="inline-start" />
        ) : (
          <CopyIcon data-icon="inline-start" />
        )}
        {copied ? "Copied" : "Copy email"}
      </Button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Email copied" : ""}
      </span>
    </div>
  )
}
