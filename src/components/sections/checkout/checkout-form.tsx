"use client"

import { type FormEvent, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  CreditCardIcon,
  LockIcon,
  RotateCcwIcon,
  TruckIcon,
} from "lucide-react"

import { saveOrder } from "@/components/sections/checkout/confirmation"
import OrderSummary from "@/components/sections/checkout/order-summary"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { useBag } from "@/hooks/use-bag"
import {
  deliveryTime,
  getShippingMethod,
  orderTotals,
  type ShippingMethodId,
} from "@/lib/pricing"
import { site } from "@/lib/site"
import type { PlacedOrder } from "@/lib/types"
import { cn, formatPrice } from "@/lib/utils"

const countries = {
  US: {
    name: "United States",
    region: {
      label: "State",
      options: {
        AL: "Alabama",
        AK: "Alaska",
        AZ: "Arizona",
        AR: "Arkansas",
        CA: "California",
        CO: "Colorado",
        CT: "Connecticut",
        DE: "Delaware",
        DC: "District of Columbia",
        FL: "Florida",
        GA: "Georgia",
        HI: "Hawaii",
        ID: "Idaho",
        IL: "Illinois",
        IN: "Indiana",
        IA: "Iowa",
        KS: "Kansas",
        KY: "Kentucky",
        LA: "Louisiana",
        ME: "Maine",
        MD: "Maryland",
        MA: "Massachusetts",
        MI: "Michigan",
        MN: "Minnesota",
        MS: "Mississippi",
        MO: "Missouri",
        MT: "Montana",
        NE: "Nebraska",
        NV: "Nevada",
        NH: "New Hampshire",
        NJ: "New Jersey",
        NM: "New Mexico",
        NY: "New York",
        NC: "North Carolina",
        ND: "North Dakota",
        OH: "Ohio",
        OK: "Oklahoma",
        OR: "Oregon",
        PA: "Pennsylvania",
        RI: "Rhode Island",
        SC: "South Carolina",
        SD: "South Dakota",
        TN: "Tennessee",
        TX: "Texas",
        UT: "Utah",
        VT: "Vermont",
        VA: "Virginia",
        WA: "Washington",
        WV: "West Virginia",
        WI: "Wisconsin",
        WY: "Wyoming",
      },
    },
    postal: { label: "ZIP code", pattern: "\\d{5}(-\\d{4})?" },
  },
  CA: {
    name: "Canada",
    region: {
      label: "Province",
      options: {
        AB: "Alberta",
        BC: "British Columbia",
        MB: "Manitoba",
        NB: "New Brunswick",
        NL: "Newfoundland and Labrador",
        NS: "Nova Scotia",
        NT: "Northwest Territories",
        NU: "Nunavut",
        ON: "Ontario",
        PE: "Prince Edward Island",
        QC: "Quebec",
        SK: "Saskatchewan",
        YT: "Yukon",
      },
    },
    postal: {
      label: "Postal code",
      pattern: "[A-Za-z]\\d[A-Za-z] ?\\d[A-Za-z]\\d",
    },
  },
} as const

type Country = keyof typeof countries

const cardBrands = [
  {
    name: "Visa",
    number: { prefix: /^4/, lengths: [13, 16, 19], gaps: [4, 8, 12, 16] },
    cvc: 3,
  },
  {
    name: "Mastercard",
    number: {
      prefix: /^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)/,
      lengths: [16],
      gaps: [4, 8, 12],
    },
    cvc: 3,
  },
  {
    name: "Amex",
    number: { prefix: /^3[47]/, lengths: [15], gaps: [4, 10] },
    cvc: 4,
  },
  {
    name: "Discover",
    number: {
      prefix: /^(6011|64[4-9]|65)/,
      lengths: [16, 19],
      gaps: [4, 8, 12, 16],
    },
    cvc: 3,
  },
]

const messages: Record<string, { missing: string; invalid?: string }> = {
  email: {
    missing: "Enter your email",
    invalid: "Enter an email like you@example.com",
  },
  firstName: { missing: "Enter your first name" },
  lastName: { missing: "Enter your last name" },
  address: { missing: "Enter your street address" },
  city: { missing: "Enter your city" },
  region: { missing: "Choose your state or province" },
  postalCode: {
    missing: "Enter your ZIP or postal code",
    invalid: "Check the ZIP or postal code",
  },
  cardNumber: {
    missing: "Enter the card number",
    invalid: "Check the card number",
  },
  expiry: {
    missing: "Enter the expiry date",
    invalid: "Enter the expiry date as MM / YY",
  },
  cvc: {
    missing: "Enter the security code",
    invalid: "Enter the 3 digits on the back, or 4 on the front for Amex",
  },
  cardName: { missing: "Enter the name on the card" },
  billingAddress: { missing: "Enter the billing street address" },
  billingCity: { missing: "Enter the billing city" },
  billingRegion: { missing: "Choose the billing state or province" },
  billingPostalCode: {
    missing: "Enter the billing ZIP or postal code",
    invalid: "Check the billing ZIP or postal code",
  },
}

// Checks the browser's own validity can't express, run once the field passes it.
const checks: Record<string, (value: string) => string | undefined> = {
  email: (value) =>
    /\.[^.@\s]+$/.test(value) ? undefined : messages.email.invalid,
  cardNumber: (value) =>
    validCardNumber(value) ? undefined : messages.cardNumber.invalid,
  expiry: (value) =>
    expired(value) ? "This card has expired. Use a different card" : undefined,
}

type Control = HTMLInputElement | HTMLSelectElement

// A front-end demo: there is no payment backend, so nothing leaves the browser.
const PAYMENT_DELAY = 1200

export default function CheckoutForm() {
  const router = useRouter()
  const { lines, subtotal, saving } = useBag()
  const [methodId, setMethodId] = useState<ShippingMethodId>("standard")
  const [code, setCode] = useState<string | null>(null)
  const [billingSame, setBillingSame] = useState(true)
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [pending, setPending] = useState(false)
  const payment = useRef<number>(undefined)

  useEffect(() => () => window.clearTimeout(payment.current), [])

  const method = getShippingMethod(methodId)
  const totalsFor = (id: ShippingMethodId) =>
    orderTotals({ subtotal, saving, code, method: id })
  const totals = totalsFor(methodId)
  const freeStandard = totalsFor("standard").shipping === 0
  const brand = cardBrand(card.number)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return
    const form = event.currentTarget
    const found = [...form.elements].filter(isControl).flatMap((element) => {
      const error = fieldError(element)
      return error ? [[element.name, error] as const] : []
    })
    if (found.length > 0) {
      setErrors(Object.fromEntries(found))
      document.getElementById(`checkout-${found[0][0]}`)?.focus()
      return
    }

    const data = new FormData(form)
    const field = (name: string) => String(data.get(name) ?? "").trim()
    const order: PlacedOrder = {
      number: `NC-${Math.floor(100000 + Math.random() * 900000)}`,
      email: field("email"),
      firstName: field("firstName"),
      address: [
        `${field("firstName")} ${field("lastName")}`,
        [field("address"), field("apartment")].filter(Boolean).join(", "),
        `${field("city")}, ${field("region")} ${field("postalCode").toUpperCase()}`,
        countries[field("country") as Country].name,
      ],
      shipping: {
        label: method.label,
        arrives: deliveryWindow(method.days[0], method.days[1]),
      },
      lines,
      totals,
    }

    // Demo: a real store swaps the card inputs for its provider's hosted fields and charges server-side.
    setPending(true)
    payment.current = window.setTimeout(() => {
      saveOrder(order)
      router.push(`/checkout/confirmation?order=${order.number}`)
    }, PAYMENT_DELAY)
  }

  // Errors update live once shown; a new one waits until you leave a filled field.
  function recheck(target: EventTarget, leaving = false) {
    if (!isControl(target)) return
    if (!errors[target.name] && !(leaving && target.value)) return
    const error = fieldError(target)
    setErrors((current) => {
      if (current[target.name] === error) return current
      const next = { ...current }
      if (error) next[target.name] = error
      else delete next[target.name]
      return next
    })
  }

  return (
    <div className="checkout-grid mt-6 md:mt-10">
      <aside
        aria-label="Order summary"
        className="lg:sticky lg:top-8 lg:col-start-2 lg:row-start-1 lg:self-start"
      >
        <OrderSummary collapsible lines={lines} totals={totals}>
          <DiscountCode code={code} onApply={setCode} />
        </OrderSummary>
      </aside>

      <form
        noValidate
        onSubmit={submit}
        onChange={(event) => recheck(event.target)}
        onBlur={(event) => recheck(event.target, true)}
        aria-busy={pending}
        className="divide-y lg:col-start-1 lg:row-start-1"
      >
        <FormSection title="Contact" className="pt-2 lg:pt-0">
          <div className="grid gap-5">
            <TextField
              name="email"
              type="email"
              label="Email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              error={errors.email}
            />
            <Field orientation="horizontal">
              <Checkbox id="checkout-news" name="news" />
              <FieldLabel htmlFor="checkout-news">
                Email me about new products and offers
              </FieldLabel>
            </Field>
          </div>
        </FormSection>

        <FormSection title="Delivery">
          <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-x-5">
            <AddressFields kind="shipping" errors={errors}>
              <TextField
                name="firstName"
                label="First name"
                autoComplete="shipping given-name"
                required
                error={errors.firstName}
              />
              <TextField
                name="lastName"
                label="Last name"
                autoComplete="shipping family-name"
                required
                error={errors.lastName}
              />
            </AddressFields>
            <TextField
              name="phone"
              type="tel"
              label="Phone (optional)"
              autoComplete="shipping tel"
              hint="Only used if the courier needs to reach you."
              className="col-span-2"
            />
          </div>
        </FormSection>

        <FormSection title="Shipping" id="checkout-shipping">
          <RadioGroup
            aria-labelledby="checkout-shipping"
            value={methodId}
            onValueChange={(value) => setMethodId(value as ShippingMethodId)}
          >
            {site.commerce.shipping.map((item) => {
              const cost = totalsFor(item.id).shipping
              return (
                <FieldLabel key={item.id} htmlFor={`method-${item.id}`}>
                  <Field orientation="horizontal">
                    <RadioGroupItem value={item.id} id={`method-${item.id}`} />
                    <FieldContent>
                      <FieldTitle>{item.label}</FieldTitle>
                      <FieldDescription>
                        {deliveryTime(item.id)}
                        {item.id === "standard" &&
                          !freeStandard &&
                          `, free over ${formatPrice(site.commerce.freeShippingThreshold)}`}
                      </FieldDescription>
                    </FieldContent>
                    <span className="figures text-sm font-medium">
                      {cost === 0 ? "Free" : formatPrice(cost)}
                    </span>
                  </Field>
                </FieldLabel>
              )
            })}
          </RadioGroup>
        </FormSection>

        <FormSection
          title="Payment"
          description="This is a demo store, so no card is charged."
        >
          <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-x-5">
            <Field
              data-invalid={errors.cardNumber ? true : undefined}
              className="col-span-2"
            >
              <FieldLabel htmlFor="checkout-cardNumber">Card number</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="checkout-cardNumber"
                  name="cardNumber"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="1234 5678 9012 3456"
                  required
                  value={card.number}
                  onChange={(event) =>
                    setCard({
                      ...card,
                      number: formatCard(event.target.value),
                    })
                  }
                  aria-invalid={errors.cardNumber ? true : undefined}
                  aria-describedby={
                    errors.cardNumber ? "checkout-cardNumber-error" : undefined
                  }
                />
                <InputGroupAddon align="inline-end">
                  {brand?.name ?? <CreditCardIcon aria-hidden="true" />}
                </InputGroupAddon>
              </InputGroup>
              {errors.cardNumber && (
                <FieldError id="checkout-cardNumber-error">
                  {errors.cardNumber}
                </FieldError>
              )}
            </Field>
            <TextField
              name="expiry"
              label="Expiry date"
              inputMode="numeric"
              autoComplete="cc-exp"
              placeholder="MM / YY"
              pattern="(0[1-9]|1[0-2]) / \d{2}"
              required
              value={card.expiry}
              onChange={(event) =>
                setCard({ ...card, expiry: formatExpiry(event.target.value) })
              }
              error={errors.expiry}
            />
            <TextField
              name="cvc"
              label="Security code"
              inputMode="numeric"
              autoComplete="cc-csc"
              placeholder="CVC"
              pattern={`\\d{${brand?.cvc ?? "3,4"}}`}
              required
              value={card.cvc}
              onChange={(event) =>
                setCard({
                  ...card,
                  cvc: event.target.value
                    .replace(/\D/g, "")
                    .slice(0, brand?.cvc ?? 4),
                })
              }
              error={errors.cvc}
            />
            <TextField
              name="cardName"
              label="Name on card"
              autoComplete="cc-name"
              required
              error={errors.cardName}
              className="col-span-2"
            />
            <Field orientation="horizontal" className="col-span-2">
              <Checkbox
                id="checkout-billing"
                checked={billingSame}
                onCheckedChange={(checked) => setBillingSame(checked === true)}
              />
              <FieldLabel htmlFor="checkout-billing">
                Billing address is the same as delivery
              </FieldLabel>
            </Field>
            {!billingSame && (
              <div className="swap col-span-2 grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-x-5">
                <AddressFields kind="billing" errors={errors} />
              </div>
            )}
          </div>
        </FormSection>

        <div className="pt-10">
          <Button type="submit" size="lg" disabled={pending} className="w-full">
            {pending ? (
              <>
                <Spinner data-icon="inline-start" aria-hidden="true" />
                Paying
              </>
            ) : (
              <>
                <LockIcon data-icon="inline-start" />
                Pay
                <span aria-hidden="true" className="opacity-50">
                  ·
                </span>
                <span className="figures">{formatPrice(totals.total)}</span>
              </>
            )}
          </Button>
          <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            {assurances.map((item) => (
              <li key={item.label} className="flex items-center gap-1.5">
                <item.icon className="size-3.5" strokeWidth={1.5} />
                {item.label}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            By paying you agree to our{" "}
            <Link
              href="/legal/terms"
              className="underline decoration-foreground/30 underline-offset-4 hover:text-foreground"
            >
              terms
            </Link>{" "}
            and{" "}
            <Link
              href="/legal/privacy"
              className="underline decoration-foreground/30 underline-offset-4 hover:text-foreground"
            >
              privacy policy
            </Link>
            .
          </p>
        </div>
      </form>
    </div>
  )
}

export function CheckoutFormSkeleton() {
  return (
    <div aria-hidden="true" className="checkout-grid mt-6 md:mt-10">
      <Skeleton className="h-21 rounded-3xl lg:col-start-2 lg:row-start-1 lg:h-112" />
      <div className="space-y-4 pt-2 lg:col-start-1 lg:row-start-1 lg:pt-0">
        <Skeleton className="h-7 w-28" />
        <Skeleton className="h-11 rounded-full" />
        <Skeleton className="mt-12 h-7 w-28" />
        <Skeleton className="h-11 rounded-full" />
        <Skeleton className="h-11 rounded-full" />
      </div>
    </div>
  )
}

const assurances = [
  {
    icon: TruckIcon,
    label: `Free shipping over ${formatPrice(site.commerce.freeShippingThreshold)}`,
  },
  { icon: RotateCcwIcon, label: `${site.commerce.returnsDays}-day returns` },
]

function FormSection({
  title,
  description,
  id,
  className,
  children,
}: {
  title: string
  description?: string
  id?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section className={cn("py-10 first:pt-0", className)}>
      <h2 id={id} className="text-2xl">
        {title}
      </h2>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}
      <div className="mt-6">{children}</div>
    </section>
  )
}

function AddressFields({
  kind,
  errors,
  children,
}: {
  kind: "shipping" | "billing"
  errors: Record<string, string>
  children?: React.ReactNode
}) {
  const [country, setCountry] = useState<Country>("US")
  const place = countries[country]
  const name = (field: string) =>
    kind === "billing"
      ? `billing${field[0].toUpperCase()}${field.slice(1)}`
      : field
  const regionId = `checkout-${name("region")}`
  const regionError = errors[name("region")]

  return (
    <>
      <Field className="col-span-2">
        <FieldLabel htmlFor={`checkout-${name("country")}`}>Country</FieldLabel>
        <Select
          name={name("country")}
          autoComplete={`${kind} country`}
          value={country}
          onValueChange={(value) => setCountry(value as Country)}
        >
          <SelectTrigger id={`checkout-${name("country")}`} className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(countries).map(([value, item]) => (
              <SelectItem key={value} value={value}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      {children}
      <TextField
        name={name("address")}
        label={kind === "billing" ? "Billing address" : "Address"}
        autoComplete={`${kind} address-line1`}
        required
        error={errors[name("address")]}
        className="col-span-2"
      />
      <TextField
        name={name("apartment")}
        label="Apartment or suite (optional)"
        autoComplete={`${kind} address-line2`}
        className="col-span-2"
      />
      <div className="col-span-2 grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 sm:gap-x-5">
        <TextField
          name={name("city")}
          label="City"
          autoComplete={`${kind} address-level2`}
          required
          error={errors[name("city")]}
          className="col-span-2 sm:col-span-1"
        />
        <Field data-invalid={regionError ? true : undefined}>
          <FieldLabel htmlFor={regionId}>{place.region.label}</FieldLabel>
          <Select
            key={country}
            name={name("region")}
            autoComplete={`${kind} address-level1`}
            required
          >
            <SelectTrigger
              id={regionId}
              aria-invalid={regionError ? true : undefined}
              aria-describedby={regionError ? `${regionId}-error` : undefined}
              className="w-full"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(place.region.options).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {regionError && (
            <FieldError id={`${regionId}-error`}>{regionError}</FieldError>
          )}
        </Field>
        <TextField
          name={name("postalCode")}
          label={place.postal.label}
          autoComplete={`${kind} postal-code`}
          pattern={place.postal.pattern}
          required
          error={errors[name("postalCode")]}
        />
      </div>
    </>
  )
}

type TextFieldProps = React.ComponentProps<typeof Input> & {
  name: string
  label: string
  hint?: string
  error?: string
}

function TextField({
  label,
  hint,
  error,
  className,
  ...props
}: TextFieldProps) {
  const id = `checkout-${props.name}`
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  return (
    <Field data-invalid={error ? true : undefined} className={className}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...props}
      />
      {error ? (
        <FieldError id={`${id}-error`}>{error}</FieldError>
      ) : (
        hint && <FieldDescription id={`${id}-hint`}>{hint}</FieldDescription>
      )}
    </Field>
  )
}

function DiscountCode({
  code,
  onApply,
}: {
  code: string | null
  onApply: (code: string | null) => void
}) {
  const [value, setValue] = useState("")
  const [error, setError] = useState(false)

  if (code) {
    return (
      <p className="mt-2 flex items-center justify-between gap-4 border-t pt-4 text-sm">
        <span>
          <span className="font-medium">{code}</span> applied,{" "}
          {site.commerce.welcomeDiscount}% off
        </span>
        <Button
          variant="link"
          size="xs"
          onClick={() => {
            onApply(null)
            setValue("")
          }}
        >
          Remove
        </Button>
      </p>
    )
  }

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault()
        const entered = value.trim().toUpperCase()
        if (entered === site.commerce.welcomeCode) onApply(entered)
        else setError(true)
      }}
      className="mt-2 border-t pt-4"
    >
      <Field data-invalid={error ? true : undefined}>
        <FieldLabel htmlFor="checkout-code">Discount code</FieldLabel>
        <InputGroup>
          <InputGroupInput
            id="checkout-code"
            name="code"
            autoComplete="off"
            value={value}
            onChange={(event) => {
              setValue(event.target.value)
              setError(false)
            }}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "checkout-code-error" : undefined}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              type="submit"
              variant="secondary"
              size="sm"
              disabled={!value.trim()}
            >
              Apply
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        {error && (
          <FieldError id="checkout-code-error">
            We don&apos;t recognize that code. Check the spelling
          </FieldError>
        )}
      </Field>
    </form>
  )
}

function isControl(element: unknown): element is Control {
  return (
    (element instanceof HTMLInputElement ||
      element instanceof HTMLSelectElement) &&
    Object.hasOwn(messages, element.name)
  )
}

function fieldError(element: Control) {
  const message = messages[element.name]
  if (!element.value.trim()) return message.missing
  if (!element.validity.valid) return message.invalid ?? message.missing
  return checks[element.name]?.(element.value)
}

function cardBrand(value: string) {
  const digits = value.replace(/\D/g, "")
  return cardBrands.find((brand) => brand.number.prefix.test(digits))
}

function formatCard(value: string) {
  const digits = value.replace(/\D/g, "")
  const { lengths, gaps } = cardBrand(digits)?.number ?? {
    lengths: [19],
    gaps: [4, 8, 12, 16],
  }
  const trimmed = digits.slice(0, Math.max(...lengths))
  return [0, ...gaps]
    .map((start, index, starts) => trimmed.slice(start, starts[index + 1]))
    .filter(Boolean)
    .join(" ")
}

function validCardNumber(value: string) {
  const digits = value.replace(/\D/g, "")
  const brand = cardBrand(digits)
  return !!brand && brand.number.lengths.includes(digits.length) && luhn(digits)
}

// The card-number checksum: catches a mistyped digit and most swapped pairs.
function luhn(digits: string) {
  const sum = [...digits].reverse().reduce((total, char, index) => {
    const digit = index % 2 ? Number(char) * 2 : Number(char)
    return total + (digit > 9 ? digit - 9 : digit)
  }, 0)
  return sum % 10 === 0
}

// Accepts typed digits and autofilled MM/YY, MM/YYYY or MMYYYY.
function formatExpiry(value: string) {
  const [first, second] = value
    .split("/")
    .map((part) => part.replace(/\D/g, ""))
  const digits = first.replace(/^[2-9]/, "0$&")
  const month = digits.slice(0, 2)
  const rest = second ?? digits.slice(2)
  const year = rest.length === 4 ? rest.slice(2) : rest.slice(0, 2)
  return year ? `${month} / ${year}` : month
}

// A card works through the last day of its expiry month.
function expired(value: string) {
  const [month, year] = value.split(" / ").map(Number)
  return new Date(2000 + year, month) <= new Date()
}

// Counts weekdays only, the way couriers quote delivery.
function deliveryWindow(from: number, to: number) {
  const format = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })
  return `${format.format(addBusinessDays(from))} to ${format.format(addBusinessDays(to))}`
}

function addBusinessDays(days: number) {
  const date = new Date()
  let added = 0
  while (added < days) {
    date.setDate(date.getDate() + 1)
    if (date.getDay() !== 0 && date.getDay() !== 6) added++
  }
  return date
}
