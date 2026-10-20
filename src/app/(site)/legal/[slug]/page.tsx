import type { ComponentPropsWithoutRef } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { compileMDX } from "next-mdx-remote/rsc"
import type { MDXComponents } from "mdx/types"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getLegalDoc, getLegalSlugs, legalScope } from "@/lib/legal"
import { pageMetadata } from "@/lib/metadata"
import { cn } from "@/lib/utils"

const mdxComponents: MDXComponents = {
  a: MdxLink,
}

export const dynamic = "force-static"
export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = await getLegalSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const doc = await getLegalDoc(slug)
  if (!doc) return {}

  const { title, description } = doc.frontmatter
  return pageMetadata({ title, description, path: `/legal/${slug}` })
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const doc = await getLegalDoc(slug)
  if (!doc) notFound()

  const { content } = await compileMDX({
    source: doc.source,
    // The policies read {store.*} values, so expressions stay on; the files are your own, never user input.
    options: { parseFrontmatter: true, scope: legalScope, blockJS: false },
    components: mdxComponents,
  })

  const { title, description, updated } = doc.frontmatter
  const updatedLabel = new Date(updated).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })

  return (
    <article className="hero-padding">
      <div className="container">
        <div className="mx-auto max-w-2xl">
          <Breadcrumb className="enter">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <header className="mt-10 md:mt-12">
            <h1 className="enter text-5xl leading-none delay-75 md:text-6xl">
              {title}
            </h1>
            <p className="enter mt-5 max-w-md text-muted-foreground delay-150 md:text-lg">
              {description}
            </p>
            <p className="enter mt-6 text-xs text-muted-foreground delay-200">
              Last updated{" "}
              <time dateTime={updated} className="figures">
                {updatedLabel}
              </time>
            </p>
          </header>

          <div
            className={cn(
              "prose mt-12 max-w-none border-t pt-4 md:mt-16",
              "prose-headings:weight-display prose-headings:text-foreground",
              "prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-2xl",
              "prose-p:leading-relaxed prose-p:text-muted-foreground",
              "marker:text-muted-foreground prose-li:my-1.5 prose-li:text-muted-foreground",
              "prose-strong:font-medium prose-strong:text-foreground",
              "prose-a:font-normal prose-a:text-foreground prose-a:underline-offset-4 hover:prose-a:decoration-2"
            )}
          >
            {content}
          </div>
        </div>
      </div>
    </article>
  )
}

function MdxLink({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/")) return <Link href={href} {...props} />
  return <a href={href} {...props} />
}
