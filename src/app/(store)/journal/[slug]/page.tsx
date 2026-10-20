import {
  type ComponentPropsWithoutRef,
  isValidElement,
  type ReactNode,
} from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { compileMDX } from "next-mdx-remote/rsc"
import type { MDXComponents } from "mdx/types"

import ArticleCard from "@/components/elements/article-card"
import ParallaxPhoto from "@/components/elements/parallax-photo"
import ProductCard from "@/components/elements/product-card"
import Reveal from "@/components/elements/reveal"
import SectionHeading from "@/components/elements/section-heading"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getArticle, getArticles } from "@/lib/articles"
import {
  formatMonth,
  getArticleSource,
  getHeadings,
  headingId,
} from "@/lib/journal"
import { pageMetadata } from "@/lib/metadata"
import { getProducts } from "@/lib/products"
import { site } from "@/lib/site"
import type { Article, Product } from "@/lib/types"
import { cn } from "@/lib/utils"

const mdxComponents: MDXComponents = {
  a: MdxLink,
  h2: MdxHeading,
  Note,
}

export const dynamicParams = false

export async function generateStaticParams() {
  return (await getArticles()).map((article) => ({ slug: article.slug }))
}

type ArticlePageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return {}

  return pageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/journal/${article.slug}`,
    image: article.image,
    type: "article",
  })
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticle(slug)
  const source = await getArticleSource(slug)
  if (!article || !source) notFound()

  const { content } = await compileMDX({
    source,
    options: { parseFrontmatter: true },
    components: mdxComponents,
  })

  const headings = getHeadings(source)
  const [products, articles] = await Promise.all([getProducts(), getArticles()])
  const mentioned = (article.products ?? [])
    .map((productSlug) => products.find((item) => item.slug === productSlug))
    .filter((product): product is Product => product !== undefined)
  const related = getRelated(articles, article)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: `${site.url}${article.image.src}`,
    datePublished: article.date,
    articleSection: article.category,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/journal/${article.slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <article className="hero-padding container">
        <header className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Breadcrumb className="enter">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/journal">Journal</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{article.category}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="enter mt-8 text-4xl leading-tight delay-75 md:mt-10 md:text-5xl lg:text-6xl lg:leading-none">
            {article.title}
          </h1>
          <p className="enter mt-5 max-w-xl text-lg text-muted-foreground delay-150">
            {article.excerpt}
          </p>
          <p className="enter mt-6 text-xs text-muted-foreground delay-200">
            {article.category} · {article.readTime} ·{" "}
            <time dateTime={article.date}>{formatMonth(article.date)}</time>
          </p>
        </header>

        <div className="media mx-auto mt-10 aspect-4/3 max-w-6xl animate-reveal-up delay-200 md:mt-14 md:aspect-16/10">
          <ParallaxPhoto className="absolute inset-0">
            <Image
              src={article.image.src}
              alt={article.image.alt}
              fill
              preload
              sizes="(min-width: 1440px) 72rem, 100vw"
              className="animate-settle object-cover delay-200"
              style={{ objectPosition: article.focus }}
            />
          </ParallaxPhoto>
        </div>

        <div className="mx-auto mt-12 max-w-6xl md:mt-16 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,40rem)_minmax(0,1fr)] lg:gap-12">
          {headings.length > 1 && (
            <aside className="hidden lg:block">
              <nav aria-label="In this article" className="sticky top-28">
                <h2 className="sans-heading text-sm">In this article</h2>
                <ol className="mt-3 space-y-2.5 border-l pl-4 text-sm text-muted-foreground">
                  {headings.map((heading) => (
                    <li key={heading.id}>
                      <a
                        href={`#${heading.id}`}
                        className="transition-colors duration-200 hover:text-foreground"
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          )}

          <div
            className={cn(
              "mx-auto prose max-w-2xl lg:col-start-2 lg:mx-0 lg:max-w-none",
              "prose-headings:weight-display prose-headings:text-foreground",
              "prose-h2:mt-14 prose-h2:mb-4 prose-h2:scroll-mt-28 prose-h2:text-3xl",
              "prose-p:leading-relaxed prose-p:text-foreground/85",
              "marker:text-muted-foreground prose-li:my-1.5 prose-li:leading-relaxed prose-li:text-foreground/85",
              "prose-strong:font-medium prose-strong:text-foreground",
              "prose-a:font-normal prose-a:text-foreground prose-a:underline-offset-4 hover:prose-a:decoration-2"
            )}
          >
            {content}
          </div>
        </div>
      </article>

      {mentioned.length > 0 && (
        <section className="section-padding container pt-0!">
          <div className="border-t pt-14 md:pt-20">
            <Reveal>
              <SectionHeading
                title="Products in this article"
                action={{ label: "Shop all", href: "/shop" }}
              />
            </Reveal>
            <Reveal delay={0.06} className="mt-10 md:mt-14">
              <ul
                className={cn(
                  mentioned.length === 4 ? "product-row" : "product-grid"
                )}
              >
                {mentioned.map((product) => (
                  <li key={product.slug}>
                    <ProductCard product={product} />
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      <section className="section-padding container pt-0!">
        <div className="border-t pt-14 md:pt-20">
          <Reveal>
            <SectionHeading
              title="Keep reading"
              action={{ label: "All articles", href: "/journal" }}
            />
          </Reveal>
          <ul className="mt-10 grid gap-x-5 gap-y-10 md:mt-14 md:grid-cols-3">
            {related.map((item, index) => (
              <li key={item.slug}>
                <Reveal delay={index * 0.06}>
                  <ArticleCard article={item} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

// Same category first, then the newest of the rest.
function getRelated(articles: Article[], article: Article) {
  const others = articles.filter((item) => item.slug !== article.slug)
  return [
    ...others.filter((item) => item.category === article.category),
    ...others.filter((item) => item.category !== article.category),
  ].slice(0, 3)
}

function MdxLink({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/")) return <Link href={href} {...props} />
  return <a href={href} {...props} />
}

function MdxHeading({ children, ...props }: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2 id={headingId(textOf(children))} {...props}>
      {children}
    </h2>
  )
}

function Note({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside className="my-10 rounded-2xl bg-card p-6 md:p-8 prose-ul:my-0 prose-ul:mt-3">
      <p className="not-prose text-sm font-medium">{title}</p>
      {children}
    </aside>
  )
}

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return `${node}`
  if (Array.isArray(node)) return node.map(textOf).join("")
  if (isValidElement<{ children?: ReactNode }>(node))
    return textOf(node.props.children)
  return ""
}
