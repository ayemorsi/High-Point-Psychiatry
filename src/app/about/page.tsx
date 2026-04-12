import type { Metadata } from 'next';
import { Award, BookOpen, CheckCircle2, Heart, Shield, Users } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import CtaBanner from '@/components/sections/cta-banner';

export const metadata: Metadata = {
  title: 'About Ahmed Morsi, PMHNP-BC',
  description:
    'Meet Ahmed Morsi, PMHNP-BC — Board-Certified Psychiatric Mental Health Nurse Practitioner with 14+ years of healthcare experience serving Genesee County, Michigan.',
};

const TIMELINE = [
  {
    year: '2009',
    title: 'Began Healthcare Career',
    desc: 'Started as a Registered Nurse in psychiatric, medical, and surgical settings in Michigan.',
  },
  {
    year: '2019',
    title: 'University of Michigan–Flint',
    desc: 'Completed Bachelor of Arts, deepening understanding of human behavior and social determinants of health.',
  },
  {
    year: '2023',
    title: 'Herzing University — MSN & PMHNP',
    desc: 'Earned Master of Science in Nursing and Post-Master Certificate as a Psychiatric Mental Health Nurse Practitioner.',
  },
  {
    year: '2023',
    title: 'Board Certification (PMHNP-BC)',
    desc: 'Achieved national board certification as a Psychiatric Mental Health Nurse Practitioner.',
  },
  {
    year: '2025',
    title: 'High Point Psychiatry',
    desc: 'Founded High Point Psychiatry to serve Genesee County and Michigan with independent, personalized psychiatric care.',
  },
];

const VALUES = [
  {
    icon: Heart,
    title: 'Person-Centered Care',
    desc: 'Every treatment plan is built around you — your goals, your circumstances, your life.',
  },
  {
    icon: Shield,
    title: 'Trauma-Informed',
    desc: 'All care is delivered through a trauma-informed lens, prioritizing safety and trust above all.',
  },
  {
    icon: Users,
    title: 'Community Rooted',
    desc: 'Born and raised in Flint, Ahmed is deeply committed to the mental health of Genesee County.',
  },
  {
    icon: BookOpen,
    title: 'Evidence-Based',
    desc: 'Treatment decisions are grounded in current research, clinical guidelines, and best practices.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient relative overflow-hidden pt-36 pb-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, #76A1C2 0%, transparent 60%)' }}
        />
        <div className="container relative z-10 max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#B1DCFF]">Your Provider</p>
          <h1 className="font-display mb-6 text-4xl font-medium leading-tight text-white sm:text-5xl lg:text-6xl">
            Ahmed Morsi,{' '}
            <span className="italic text-[#B1DCFF]">PMHNP-BC</span>
          </h1>
          <p className="text-lg leading-relaxed text-white/70">
            Board-Certified Psychiatric Mental Health Nurse Practitioner serving
            Genesee County, Michigan with compassion, expertise, and a deep
            commitment to community.
          </p>
        </div>
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Bio */}
      <section className="section-padding bg-surface">
        <div className="container">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="font-display mb-6 text-3xl font-medium text-primary sm:text-4xl">
                A Provider Who Knows This Community
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Ahmed Morsi was born and raised in the Flint and Grand Blanc area of Genesee County.
                  That connection runs deep — it shapes how he approaches care, how he listens, and why
                  he chose to plant roots here rather than elsewhere.
                </p>
                <p>
                  With over 14 years in healthcare — more than a decade spent in psychiatric, medical,
                  and surgical nursing — Ahmed brings a breadth of clinical perspective that informs
                  every patient encounter. He understands that mental health intersects with physical
                  health, life circumstances, relationships, and community.
                </p>
                <p>
                  After earning his MSN and Post-Master PMHNP Certificate from Herzing University,
                  Ahmed achieved national board certification. He founded High Point Psychiatry to
                  bring high-quality, independent psychiatric care to Michigan — without the long waits
                  and impersonal systems that too often define mental health access.
                </p>
                <p>
                  Ahmed&apos;s approach blends evidence-based medication management with supportive
                  psychotherapy, CBT techniques, and trauma-informed principles. He believes the
                  provider-patient relationship is the foundation of all effective treatment.
                </p>
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild className="rounded-full bg-primary px-8 font-semibold text-white shadow-soft hover:bg-[#031636]">
                  <Link href="/contact">Book an Appointment</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full border-[rgba(26,43,76,0.2)] px-8 font-semibold text-primary hover:bg-surface-low">
                  <Link href="/services">View Services</Link>
                </Button>
              </div>
            </div>

            {/* Values grid */}
            <div className="grid grid-cols-2 gap-4">
              {VALUES.map((v) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.title}
                    className="rounded-2xl bg-surface-lowest p-6 shadow-card border border-[rgba(26,43,76,0.06)]"
                  >
                    <Icon className="mb-3 size-6 text-secondary" />
                    <h3 className="mb-2 text-sm font-semibold text-primary">{v.title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">{v.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-surface-low">
        <div className="container">
          <div className="mb-12 max-w-xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-secondary">Background</p>
            <h2 className="font-display text-3xl font-medium text-primary sm:text-4xl">Education &amp; Experience</h2>
          </div>
          <div className="space-y-0">
            {TIMELINE.map((item, i) => (
              <div key={item.year} className="flex gap-8">
                <div className="flex flex-col items-center">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary shadow-soft">
                    <Award className="size-4 text-white" />
                  </div>
                  {i < TIMELINE.length - 1 && (
                    <div className="my-1 w-0.5 flex-1 bg-[rgba(26,43,76,0.15)]" style={{ minHeight: '3rem' }} />
                  )}
                </div>
                <div className="pb-10">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-secondary">{item.year}</p>
                  <h3 className="mb-2 text-base font-semibold text-primary">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="section-padding bg-surface">
        <div className="container">
          <div className="mx-auto max-w-2xl rounded-2xl bg-surface-lowest p-10 shadow-card border border-[rgba(26,43,76,0.06)]">
            <h2 className="font-display mb-6 text-2xl font-medium text-primary">Credentials &amp; Licensure</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                'PMHNP-BC (Board Certified)',
                'Advanced Practice Registered Nurse (APRN)',
                'MSN — Herzing University',
                'Post-Master PMHNP Certificate',
                'BA — University of Michigan–Flint',
                'NPI: 1710518352',
                'Michigan License: 4704383923',
                '14+ Years Healthcare Experience',
              ].map((c) => (
                <li key={c} className="flex items-center gap-3 text-sm text-foreground">
                  <CheckCircle2 className="size-4 shrink-0 text-secondary" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
