import Link from "next/link"

import BuyBox from "@/components/sections/product/buy-box"
import ProductGallery from "@/components/sections/product/gallery"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getProducts } from "@/lib/products"
import { getStep } from "@/lib/steps"
import type { Product } from "@/lib/types"

export default async function ProductOverview({
  product,
}: {
  product: Product
}) {
  const step = getStep(product.step)
  if (!step) return null
  const products = await getProducts()
  const contents = product.contains?.flatMap(
    (slug) => products.find((item) => item.slug === slug)?.name ?? []
  )
  const images = [
    product.image,
    product.hoverImage && {
      src: product.hoverImage.src,
      alt: `Texture of ${product.name}`,
    },
    ...(product.images ?? []),
  ].filter((image) => image !== undefined)

  return (
    <section className="hero-padding container">
      <Breadcrumb className="enter">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/shop">Shop</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/shop/${step.id}`}>{step.name}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-6 grid gap-10 md:mt-8 lg:grid-cols-12 lg:gap-16">
        <ProductGallery
          images={images}
          className="enter delay-75 lg:col-span-7"
        />
        <BuyBox
          product={product}
          step={step}
          contents={contents}
          className="lg:col-span-5"
        />
      </div>
    </section>
  )
}
