import type { Metadata } from 'next';
import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';

import { Cta1 } from '@/components/cta1';
import { Hero3 } from '@/components/hero3';

export const metadata: Metadata = {
  title: 'Mental Health Blog',
  description:
    'Insights on psychiatric care, mental health, medication management, and wellness — from High Point Psychiatry in Flint, Michigan.',
};

const POSTS = [
  {
    slug: 'signs-you-need-psychiatric-evaluation',
    title: 'Signs You May Benefit from a Psychiatric Evaluation',
    excerpt:
      'Many people live with untreated mental health conditions for years because they are unsure whether their symptoms warrant professional care. Here is how to know when to seek a psychiatric evaluation.',
    date: 'April 2025',
    readTime: '5 min read',
    category: 'Mental Health',
  },
  {
    slug: 'adhd-in-adults-michigan',
    title: 'Adult ADHD in Michigan: What You Should Know',
    excerpt:
      'ADHD is frequently undiagnosed in adults across Michigan. Learn the signs, how diagnosis works, and what treatment options are available for adults in Genesee County and statewide.',
    date: 'April 2025',
    readTime: '6 min read',
    category: 'ADHD',
  },
  {
    slug: 'telehealth-psychiatry-michigan',
    title: 'How Telehealth Psychiatry Works in Michigan',
    excerpt:
      'Telehealth has made quality psychiatric care more accessible than ever for Michigan residents. Here is everything you need to know about receiving psychiatric care via video appointment.',
    date: 'March 2025',
    readTime: '4 min read',
    category: 'Telehealth',
  },
  {
    slug: 'anxiety-treatment-flint-mi',
    title: 'Anxiety Treatment in Flint, MI: Your Options',
    excerpt:
      'Anxiety disorders are among the most common mental health conditions — and among the most treatable. Learn about anxiety treatment options available in Flint and Genesee County.',
    date: 'March 2025',
    readTime: '5 min read',
    category: 'Anxiety',
  },
  {
    slug: 'medication-management-what-to-expect',
    title: 'What to Expect at Your First Psychiatric Appointment',
    excerpt:
      'If you have never seen a psychiatric provider before, the first appointment can feel uncertain. Here is exactly what to expect at High Point Psychiatry — and how to prepare.',
    date: 'February 2025',
    readTime: '4 min read',
    category: 'Getting Started',
  },
  {
    slug: 'depression-treatment-genesee-county',
    title: 'Depression Treatment in Genesee County, Michigan',
    excerpt:
      'Depression affects millions of Americans, yet access to quality care remains a challenge in many communities. Here is what you need to know about getting help in Genesee County.',
    date: 'February 2025',
    readTime: '5 min read',
    category: 'Depression',
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  'Mental Health': 'bg-[rgba(26,43,76,0.08)] text-primary',
  ADHD: 'bg-[rgba(118,161,194,0.15)] text-secondary',
  Telehealth: 'bg-[rgba(177,220,255,0.3)] text-[#2A5070]',
  Anxiety: 'bg-[rgba(118,161,194,0.15)] text-secondary',
  'Getting Started': 'bg-[rgba(26,43,76,0.08)] text-primary',
  Depression: 'bg-[rgba(26,43,76,0.08)] text-primary',
};

export default function BlogPage() {
  return (
    <>
      <Hero3
        heading="Mental Health Insights"
        description="Practical information about psychiatric care, mental health conditions, and wellness — from Ahmed Morsi, PMHNP-BC at High Point Psychiatry."
        buttons={{
          primary: { text: 'Book Appointment', url: '/contact' },
          secondary: { text: 'Our Services', url: '/services' },
        }}
        reviews={{
          count: 50,
          rating: 5.0,
          avatars: [
            { src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp', alt: 'Patient' },
            { src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp', alt: 'Patient' },
            { src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp', alt: 'Patient' },
            { src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp', alt: 'Patient' },
            { src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp', alt: 'Patient' },
          ],
        }}
      />

      {/* Blog grid */}
      <section className="section-padding bg-surface">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl bg-surface-lowest shadow-card border border-[rgba(26,43,76,0.06)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
              >
                {/* Color bar */}
                <div className="h-1.5 bg-hero-gradient" />

                <div className="flex flex-1 flex-col p-8">
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${CATEGORY_COLORS[post.category] ?? 'bg-muted text-foreground'}`}
                    >
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="size-3" />
                      {post.date}
                    </span>
                  </div>

                  <h2 className="font-display mb-3 text-xl font-medium leading-snug text-primary group-hover:text-secondary transition-colors">
                    {post.title}
                  </h2>
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-secondary">
                    Read Article
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Cta1 />
    </>
  );
}
