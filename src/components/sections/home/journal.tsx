import ArticleCard from "@/components/elements/article-card"
import Reveal from "@/components/elements/reveal"
import SectionHeading from "@/components/elements/section-heading"
import { getArticles } from "@/lib/articles"

export default async function Journal() {
  const articles = await getArticles()

  return (
    <section className="section-padding container">
      <Reveal>
        <SectionHeading
          title="From the journal"
          action={{ label: "All articles", href: "/journal" }}
        />
      </Reveal>

      <ul className="mt-10 grid gap-x-5 gap-y-10 md:mt-14 md:grid-cols-3">
        {articles.slice(0, 3).map((article, index) => (
          <li key={article.slug}>
            <Reveal delay={index * 0.06}>
              <ArticleCard article={article} excerpt={false} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
