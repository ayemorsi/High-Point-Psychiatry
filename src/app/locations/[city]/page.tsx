import type { Metadata } from 'next';
import { ArrowRight, MapPin, Phone, Video } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Button } from '@/components/ui/button';
import CtaBanner from '@/components/sections/cta-banner';
import ServicesGrid from '@/components/sections/services-grid';
import { getLocation, LOCATIONS } from '@/lib/locations';

export function generateStaticParams() {
  return LOCATIONS.map((l) => ({ city: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const loc = getLocation(city);
  if (!loc) return {};
  return {
    title: loc.headline,
    description: loc.description,
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const loc = getLocation(city);
  if (!loc) notFound();

  const localSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'High Point Psychiatry',
    url: `https://highpointpsychiatry.com/locations/${loc.slug}`,
    telephone: '(810) 732-8336',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '4800 S Saginaw St',
      addressLocality: 'Flint',
      addressRegion: 'MI',
      postalCode: '48507',
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'City',
      name: loc.city,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: loc.county,
      },
    },
    medicalSpecialty: 'Psychiatry',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
      />

      {/* Hero */}
      <section className="bg-hero-gradient relative overflow-hidden pt-36 pb-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, #76A1C2 0%, transparent 60%)' }}
        />
        <div className="container relative z-10 max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#B1DCFF]">
            {loc.county}, Michigan
          </p>
          <h1 className="font-display mb-6 text-4xl font-medium leading-tight text-white sm:text-5xl lg:text-6xl">
            {loc.headline}
          </h1>
          <p className="mb-10 text-lg leading-relaxed text-white/70">{loc.intro}</p>
          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              className="rounded-full bg-white px-8 font-semibold text-primary shadow-soft hover:bg-white/90"
            >
              <Link href="/contact">
                Book Appointment
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <a
              href="tel:8107328336"
              className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3 font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              <Phone className="size-4" />
              (810) 732-8336
            </a>
          </div>

          {/* Quick info */}
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/60">
            <span className="flex items-center gap-2">
              <MapPin className="size-4 text-[#76A1C2]" />
              Serving {loc.city} &amp; Genesee County
            </span>
            <span className="flex items-center gap-2">
              <Video className="size-4 text-[#76A1C2]" />
              Telehealth Available Statewide
            </span>
          </div>
        </div>
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Services */}
      <ServicesGrid />

      {/* Location-specific CTA */}
      <section className="section-padding bg-surface">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display mb-4 text-3xl font-medium text-primary">
              Serving {loc.city},{' '}
              <span className="italic text-secondary">Michigan</span>
            </h2>
            <p className="mb-8 text-base text-muted-foreground">
              High Point Psychiatry provides in-person psychiatric care at our
              Flint, MI office and telehealth services across Michigan. We are
              accepting new patients from {loc.city} and {loc.county}.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                asChild
                className="rounded-full bg-primary px-8 font-semibold text-white shadow-soft hover:bg-[#031636]"
              >
                <Link href="/contact">
                  Book Appointment
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Link
                href="/insurance"
                className="text-sm font-medium text-secondary underline underline-offset-4 hover:text-primary transition-colors"
              >
                View Insurance We Accept →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
