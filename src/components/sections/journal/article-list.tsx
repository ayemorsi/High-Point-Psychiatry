import Image from "next/image"
import Link from "next/link"

import ArticleCard from "@/components/elements/article-card"
import Reveal from "@/components/elements/reveal"
import { getArticles } from "@/lib/articles"

export default async function ArticleList() {
  const [lead, ...rest] = await getArticles()
  if (!lead) return null

  return (
    <section className="hero-padding container">
      <h1 className="sr-only">The journal</h1>

      <Reveal>
        <Link
          href={`/journal/${lead.slug}`}
          className="group grid items-center gap-8 rounded-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-offset-4 focus-visible:ring-offset-background lg:grid-cols-2 lg:gap-16"
        >
          <div className="media aspect-4/3">
            <Image
              src={lead.image.src}
              alt={lead.image.alt}
              fill
              preload
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-soft group-hover:scale-103"
            />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">
              Latest · {lead.category} · {lead.readTime}
            </p>
            <h2 className="mt-3 text-4xl underline decoration-transparent underline-offset-4 transition-colors duration-200 group-hover:decoration-foreground/40 md:text-5xl">
              {lead.title}
            </h2>
            <p className="mt-4 max-w-md text-lg text-muted-foreground">
              {lead.excerpt}
            </p>
          </div>
        </Link>
      </Reveal>

      <ul className="mt-14 grid gap-x-5 gap-y-10 border-t pt-14 md:mt-20 md:grid-cols-3 md:pt-20">
        {rest.map((article, index) => (
          <li key={article.slug}>
            <Reveal delay={(index % 3) * 0.06}>
              <ArticleCard article={article} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
