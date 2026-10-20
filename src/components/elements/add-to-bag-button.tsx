"use client"

import { type FormEvent, useId, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { bag } from "@/hooks/use-bag"
import { requestRestockAlert } from "@/lib/actions"
import { getVariants, round, routinePrice, subscribePrice } from "@/lib/pricing"
import { site } from "@/lib/site"
import type { Product, ProductVariant } from "@/lib/types"
import { formatPrice } from "@/lib/utils"

type AddToBagButtonProps = Pick<
  React.ComponentProps<typeof Button>,
  "variant" | "size" | "className"
> & {
  /** Several products go in together, as the routine builder adds them. */
  product: Product | Product[]
  productVariant?: ProductVariant
  subscribe?: boolean
  quantity?: number
  compact?: boolean
  label?: string
}

export default function AddToBagButton({
  product,
  productVariant,
  subscribe,
  quantity = 1,
  variant,
  size,
  className,
  compact,
  label = "Add to bag",
}: AddToBagButtonProps) {
  const products = [product].flat()
  const shown =
    products.length === 1
      ? round(unitPrice(products[0], productVariant, subscribe) * quantity)
      : routinePrice(products).total

  if (products.length === 1 && products[0].soldOut) {
    return (
      <RestockAlert product={products[0]} size={size} className={className} />
    )
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={(event) =>
        bag.add(
          products.map((item) => ({
            product: item,
            variant: productVariant,
            subscribe,
            quantity,
          })),
          event.currentTarget
        )
      }
    >
      {compact ? (
        <>
          <span className="md:hidden">Add</span>
          <span className="hidden md:inline">{label}</span>
        </>
      ) : (
        label
      )}
      <span aria-hidden="true" className="opacity-50">
        ·
      </span>
      <span className="figures">{formatPrice(shown)}</span>
    </Button>
  )
}

function RestockAlert({
  product,
  size,
  className,
}: Pick<AddToBagButtonProps, "size" | "className"> & { product: Product }) {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string>()
  const id = useId()

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return
    const input = event.currentTarget.elements.namedItem(
      "email"
    ) as HTMLInputElement
    if (!input.checkValidity()) {
      setError("Enter an email like you@example.com.")
      input.focus()
      return
    }
    setPending(true)
    const result = await requestRestockAlert(
      input.value.trim(),
      product.slug
    ).catch(() => ({ ok: false }))
    setPending(false)
    if (!result.ok) {
      setError(
        `We couldn't save that. Try again, or write to ${site.email.display}.`
      )
      return
    }
    setOpen(false)
    toast(`We'll email you when ${product.name} is back.`)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        setError(undefined)
      }}
    >
      <DialogTrigger asChild>
        <Button variant="secondary" size={size} className={className}>
          Notify me
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product.name} is sold out</DialogTitle>
          <DialogDescription>
            We&apos;ll email you once, when it&apos;s back.
          </DialogDescription>
        </DialogHeader>
        <form noValidate onSubmit={onSubmit} className="space-y-4">
          <Field data-invalid={error ? true : undefined}>
            <FieldLabel htmlFor={id}>Email</FieldLabel>
            <Input
              id={id}
              name="email"
              type="email"
              required
              autoComplete="email"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? `${id}-error` : undefined}
              onChange={() => setError(undefined)}
            />
            <FieldError id={`${id}-error`}>{error}</FieldError>
          </Field>
          <Button type="submit" disabled={pending} className="w-full">
            {pending && <Spinner data-icon="inline-start" aria-hidden="true" />}
            Notify me
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function unitPrice(
  product: Product,
  productVariant = getVariants(product)[0],
  subscribe?: boolean
) {
  return subscribe ? subscribePrice(productVariant.price) : productVariant.price
}
