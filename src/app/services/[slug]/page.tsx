import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Button } from '@/components/ui/button';
import CtaBanner from '@/components/sections/cta-banner';
import { getAllServiceSlugs, getService } from '@/lib/get-service';

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getService(slug);
  if (!data) return {};
  return {
    title: data.frontmatter.title,
    description: data.frontmatter.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getService(slug);
  if (!data) notFound();

  const { frontmatter } = data;

  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient relative overflow-hidden pt-36 pb-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, #76A1C2 0%, transparent 60%)' }}
        />
        <div className="container relative z-10 max-w-3xl">
          <Link
            href="/services"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            All Services
          </Link>
          <h1 className="font-display mb-6 text-4xl font-medium leading-tight text-white sm:text-5xl">
            {frontmatter.title}
          </h1>
          <p className="mb-10 text-lg leading-relaxed text-white/70">
            {frontmatter.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              className="rounded-full bg-white px-8 font-semibold text-primary shadow-soft hover:bg-white/90"
            >
              <Link href={frontmatter.primaryCtaHref ?? '/contact'}>
                {frontmatter.primaryCtaLabel ?? 'Book Appointment'}
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            {frontmatter.secondaryCtaLabel && (
              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/30 bg-white/10 px-8 font-semibold text-white backdrop-blur-sm hover:bg-white/20"
              >
                <Link href={frontmatter.secondaryCtaHref ?? '/about'}>
                  {frontmatter.secondaryCtaLabel}
                </Link>
              </Button>
            )}
          </div>
        </div>
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Content placeholder — MDX body would go here */}
      <section className="section-padding bg-surface">
        <div className="container">
          <div className="mx-auto max-w-2xl rounded-2xl bg-surface-lowest p-10 shadow-card border border-[rgba(26,43,76,0.06)]">
            <p className="text-muted-foreground text-base leading-relaxed">
              For more information about {frontmatter.title.toLowerCase()}, please{' '}
              <Link href="/contact" className="text-secondary underline underline-offset-4 hover:text-primary">
                contact our office
              </Link>{' '}
              or{' '}
              <a href="tel:8107328336" className="text-secondary underline underline-offset-4 hover:text-primary">
                call (810) 732-8336
              </a>
              . We are happy to answer any questions and help you schedule your first appointment.
            </p>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
