import type { Metadata } from "next"
import { notFound } from "next/navigation"

import Catalog from "@/components/sections/shop/catalog"
import { pageMetadata } from "@/lib/metadata"
import { getProducts, getProductsByStep } from "@/lib/products"
import { isStepId } from "@/lib/shop-params"
import { site } from "@/lib/site"
import { stepCover } from "@/lib/step-cards"
import { getStep, steps } from "@/lib/steps"

export function generateStaticParams() {
  return steps.map((step) => ({ step: step.id }))
}

type StepPageProps = {
  params: Promise<{ step: string }>
}

export async function generateMetadata({
  params,
}: StepPageProps): Promise<Metadata> {
  const { step: id } = await params
  const step = isStepId(id) ? getStep(id) : undefined
  if (!step) return {}

  return pageMetadata({
    title: step.name,
    description: `${step.job} ${(await getProductsByStep(step.id)).length} ${site.name} products.`,
    path: `/shop/${step.id}`,
    image: stepCover(step.id),
  })
}

// No searchParams on purpose: the catalog reads the query on the client, so every step page prerenders.
export default async function StepPage({ params }: StepPageProps) {
  const { step: id } = await params
  const step = isStepId(id) ? getStep(id) : undefined
  if (!step) notFound()

  const products = await getProducts()
  const count = products.filter((product) => product.step === step.id).length

  return (
    <Catalog
      title={step.id === "sets" ? "The sets." : `${step.number} ${step.name}.`}
      lede={`${step.job} ${count} ${count === 1 ? "product" : "products"}.`}
      step={step.id}
      image={stepCover(step.id)}
      products={products}
    />
  )
}
