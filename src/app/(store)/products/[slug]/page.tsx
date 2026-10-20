import type { Metadata } from "next"
import { notFound } from "next/navigation"

import ProductIngredients from "@/components/sections/product/ingredients"
import ProductOverview from "@/components/sections/product/overview"
import ProductPairings from "@/components/sections/product/pairings"
import ProductQuestions from "@/components/sections/product/questions"
import ProductResults from "@/components/sections/product/results"
import { pageMetadata } from "@/lib/metadata"
import { getProduct, getProducts } from "@/lib/products"
import { site } from "@/lib/site"
import { formatPrice } from "@/lib/utils"

export async function generateStaticParams() {
  return (await getProducts()).map((product) => ({ slug: product.slug }))
}

type ProductPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) return {}

  return pageMetadata({
    title: product.name,
    description: `${product.descriptor}. ${product.benefit} ${product.size}, ${formatPrice(product.price)}.`,
    path: `/products/${product.slug}`,
    image: product.image,
  })
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.benefit,
    image: product.image && `${site.url}${product.image.src}`,
    brand: { "@type": "Brand", name: site.name },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: site.commerce.currency,
      availability: product.soldOut
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/InStock",
      url: `${site.url}/products/${product.slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ProductOverview product={product} />
      <ProductIngredients product={product} />
      <ProductResults product={product} />
      <ProductPairings product={product} />
      <ProductQuestions product={product} />
    </>
  )
}
