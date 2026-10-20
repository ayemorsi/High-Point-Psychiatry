"use client"

import { useId, useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

type EmailFieldProps = {
  value: string
  onChange: (value: string) => void
  error?: string
}

export function EmailField({ value, onChange, error }: EmailFieldProps) {
  const id = useId()

  return (
    <Field data-invalid={error ? true : undefined}>
      <FieldLabel htmlFor={id}>Email address</FieldLabel>
      <Input
        id={id}
        type="email"
        name="email"
        required
        autoComplete="username"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </Field>
  )
}

type KnownEmailFieldProps = {
  email: string
  onChange: () => void
}

// Read-only but still submitted, so password managers save the password against this email.
export function KnownEmailField({ email, onChange }: KnownEmailFieldProps) {
  const id = useId()

  return (
    <Field>
      <FieldLabel htmlFor={id}>Email address</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id={id}
          type="email"
          name="email"
          readOnly
          autoComplete="username"
          value={email}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton onClick={onChange}>Change</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}

type PasswordFieldProps = {
  autoComplete: "current-password" | "new-password"
  action?: React.ReactNode
  description?: string
  error?: string
}

export function PasswordField({
  autoComplete,
  action,
  description,
  error,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false)
  const id = useId()
  // The error replaces the hint rather than stacking under it.
  const hint = error ? "error" : description ? "description" : null

  return (
    <Field data-invalid={error ? true : undefined}>
      <div className="flex items-center justify-between gap-4">
        <FieldLabel htmlFor={id}>Password</FieldLabel>
        {action}
      </div>
      <InputGroup>
        <InputGroupInput
          id={id}
          type={visible ? "text" : "password"}
          name="password"
          required
          minLength={autoComplete === "new-password" ? 8 : undefined}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={hint ? `${id}-${hint}` : undefined}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-sm"
            aria-label={visible ? "Hide password" : "Show password"}
            onClick={() => setVisible((current) => !current)}
          >
            {visible ? <EyeOffIcon /> : <EyeIcon />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      {hint === "description" && (
        <FieldDescription id={`${id}-description`}>
          {description}
        </FieldDescription>
      )}
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </Field>
  )
}

type NameFieldProps = {
  error?: string
}

export function NameField({ error }: NameFieldProps) {
  const id = useId()

  return (
    <Field data-invalid={error ? true : undefined}>
      <FieldLabel htmlFor={id}>First name</FieldLabel>
      <Input
        id={id}
        name="given-name"
        required
        autoComplete="given-name"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </Field>
  )
}

export function OffersField() {
  const id = useId()

  return (
    <Field orientation="horizontal">
      <Checkbox id={id} name="offers" />
      <FieldLabel htmlFor={id}>
        Email me about new products and offers
      </FieldLabel>
    </Field>
  )
}
