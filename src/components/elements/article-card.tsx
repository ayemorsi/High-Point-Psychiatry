import Image from "next/image"
import Link from "next/link"

import type { Article } from "@/lib/types"

type ArticleCardProps = {
  article: Article
  excerpt?: boolean
}

export default function ArticleCard({
  article,
  excerpt = true,
}: ArticleCardProps) {
  return (
    <Link
      href={`/journal/${article.slug}`}
      className="group block rounded-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      <div className="media aspect-4/3">
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-700 ease-soft group-hover:scale-103"
        />
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        {article.category} · {article.readTime}
      </p>
      <h3 className="mt-2 text-2xl underline decoration-transparent underline-offset-4 transition-colors duration-200 group-hover:decoration-foreground/40">
        {article.title}
      </h3>
      {excerpt && (
        <p className="mt-2 text-sm text-muted-foreground">{article.excerpt}</p>
      )}
    </Link>
  )
}
