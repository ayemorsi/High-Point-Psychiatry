"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeftIcon, ClockIcon, PackageIcon, RepeatIcon } from "lucide-react"

import {
  EmailField,
  KnownEmailField,
  NameField,
  OffersField,
  PasswordField,
} from "@/components/elements/account-fields"
import CheckEmail from "@/components/sections/account/check-email"
import { Button } from "@/components/ui/button"
import { FieldGroup } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { useSwapFocus } from "@/hooks/use-swap-focus"

const benefits = [
  { icon: PackageIcon, label: "Track orders and returns" },
  { icon: RepeatIcon, label: "Skip or cancel a subscription" },
  { icon: ClockIcon, label: "Check out faster next time" },
]

const REQUEST_DELAY = 700

type Step = "email" | "password" | "create" | "reset"

type FieldName = "email" | "password" | "given-name"

const errorMessages: Record<FieldName, string> = {
  email: "Enter an email like you@example.com.",
  password: "Enter your password.",
  "given-name": "Enter your first name.",
}

const steps: Record<Step, { heading: string; line: string }> = {
  email: {
    heading: "Sign in or create an account.",
    line: "Start with your email.",
  },
  password: { heading: "Sign in.", line: "Enter your password." },
  create: { heading: "Create your account.", line: "No card needed." },
  reset: {
    heading: "Reset your password.",
    line: "We'll email you a link to choose a new one.",
  },
}

const sentMessages: Record<
  Exclude<Step, "email">,
  (email: React.ReactNode) => React.ReactNode
> = {
  password: (email) => (
    <>We sent a sign-in link to {email}. Open it on this device.</>
  ),
  create: (email) => (
    <>We sent a link to {email}. Open it to confirm your account.</>
  ),
  reset: (email) => <>If {email} has an account, a reset link is on its way.</>,
}

// One field at a time: email first, then only what that email needs.
export default function AccountSignIn() {
  const [step, setStep] = useState<Step>("email")
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({})
  const [pending, setPending] = useState(false)
  const [headingRef, armFocus] = useSwapFocus(`${step}-${sent}`)
  const timer = useRef<number>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  function go(next: Step, done = false) {
    armFocus()
    setErrors({})
    setStep(next)
    setSent(done)
  }

  // Swap this timeout for a call to your auth provider.
  function request(then: () => void) {
    if (pending) return
    setPending(true)
    timer.current = window.setTimeout(() => {
      setPending(false)
      then()
    }, REQUEST_DELAY)
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const invalid = [...event.currentTarget.elements].filter(
      (element): element is HTMLInputElement =>
        element instanceof HTMLInputElement &&
        element.name in errorMessages &&
        !element.validity.valid
    )
    if (invalid.length > 0) {
      setErrors(
        Object.fromEntries(
          invalid.map((element) => [
            element.name,
            element.name === "password" && step === "create"
              ? "Use at least 8 characters."
              : errorMessages[element.name as FieldName],
          ])
        )
      )
      invalid[0].focus()
      return
    }
    request(() => (step === "email" ? go("password") : go(step, true)))
  }

  function clearError(name: string) {
    if (!errors[name as FieldName]) return
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  return (
    <section className="p-2 [--panel-inset:0.5] md:p-3 md:[--panel-inset:0.75]">
      <div className="relative overflow-hidden rounded-3xl">
        <div className="dark arc-field flex min-h-[max(calc(100svh-1.5rem),44rem)] flex-col items-center justify-center bg-background px-4 pt-28 pb-14 text-foreground [--arc-x:-14%] md:pt-32">
          <div className="w-full max-w-sm">
            {sent ? (
              <CheckEmail
                ref={headingRef}
                email={email}
                message={sentMessages[step as Exclude<Step, "email">]}
                onBack={() => go("email")}
              />
            ) : (
              <>
                <div key={step} className="swap text-center">
                  <h1
                    ref={headingRef}
                    tabIndex={-1}
                    className="text-4xl outline-none md:text-5xl"
                  >
                    {steps[step].heading}
                  </h1>
                  <p className="mt-3 text-muted-foreground md:text-lg">
                    {steps[step].line}
                  </p>
                </div>

                <form
                  key={`${step}-form`}
                  noValidate
                  onSubmit={onSubmit}
                  onInput={(event) =>
                    clearError((event.target as HTMLInputElement).name ?? "")
                  }
                  aria-busy={pending}
                  className="swap mt-10"
                >
                  <FieldGroup>
                    {step === "email" ? (
                      <EmailField
                        value={email}
                        onChange={setEmail}
                        error={errors.email}
                      />
                    ) : (
                      <KnownEmailField
                        email={email}
                        onChange={() => go("email")}
                      />
                    )}
                    {step === "password" && (
                      <PasswordField
                        autoComplete="current-password"
                        error={errors.password}
                        action={
                          <Button
                            type="button"
                            variant="link"
                            onClick={() => go("reset")}
                          >
                            Forgot password?
                          </Button>
                        }
                      />
                    )}
                    {step === "create" && (
                      <>
                        <NameField error={errors["given-name"]} />
                        <PasswordField
                          autoComplete="new-password"
                          description="At least 8 characters."
                          error={errors.password}
                        />
                        <OffersField />
                      </>
                    )}
                  </FieldGroup>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={pending}
                    className="mt-8 w-full"
                  >
                    {pending && (
                      <Spinner data-icon="inline-start" aria-hidden="true" />
                    )}
                    {submitLabel[step]}
                  </Button>

                  <div className="mt-6 flex flex-col items-center gap-2">
                    {step === "password" && (
                      <>
                        <Button
                          type="button"
                          variant="link"
                          onClick={() => request(() => go("password", true))}
                        >
                          Email me a sign-in link instead
                        </Button>
                        <Button
                          type="button"
                          variant="link"
                          onClick={() => go("create")}
                        >
                          New to High Point Psychiatry? Create an account
                        </Button>
                      </>
                    )}
                    {(step === "create" || step === "reset") && (
                      <Button
                        type="button"
                        variant="link"
                        onClick={() => go("password")}
                      >
                        <ArrowLeftIcon data-icon="inline-start" />
                        Back to sign in
                      </Button>
                    )}
                  </div>

                  {step === "create" && (
                    <p className="mt-4 text-center text-xs text-muted-foreground">
                      By creating an account, you agree to our{" "}
                      <Link
                        href="/legal/terms"
                        className="underline underline-offset-4"
                      >
                        terms
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/legal/privacy"
                        className="underline underline-offset-4"
                      >
                        privacy policy
                      </Link>
                      .
                    </p>
                  )}
                </form>
              </>
            )}
          </div>

          <ul
            aria-label="What an account gives you"
            className="enter mt-16 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground delay-300"
          >
            {benefits.map((benefit) => (
              <li key={benefit.label} className="flex items-center gap-2">
                <benefit.icon aria-hidden="true" className="size-4" />
                {benefit.label}
              </li>
            ))}
          </ul>
        </div>

        <div aria-hidden="true" className="nav-notch animate-notch-open" />
      </div>
    </section>
  )
}

const submitLabel: Record<Step, string> = {
  email: "Continue",
  password: "Sign in",
  create: "Create account",
  reset: "Email me a link",
}
