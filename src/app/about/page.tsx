import type { Metadata } from 'next';
import { Award, CheckCircle2 } from 'lucide-react';

import { Cta1 } from '@/components/cta1';
import { Feature1 } from '@/components/feature1';
import { Hero3 } from '@/components/hero3';
import { Stats5 } from '@/components/stats5';

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

export default function AboutPage() {
  return (
    <>
      <Hero3
        heading="Ahmed Morsi, PMHNP-BC"
        description="Board-Certified Psychiatric Mental Health Nurse Practitioner serving Genesee County, Michigan with compassion, expertise, and a deep commitment to community."
        buttons={{
          primary: { text: 'Book Appointment', url: '/contact' },
          secondary: { text: 'View Services', url: '/services' },
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

      <Feature1
        title="A Provider Who Knows This Community"
        description="Ahmed Morsi was born and raised in the Flint and Grand Blanc area of Genesee County. With over 14 years in healthcare — more than a decade in psychiatric, medical, and surgical nursing — Ahmed brings clinical breadth that informs every patient encounter. After earning his MSN and PMHNP-BC certification from Herzing University, he founded High Point Psychiatry to bring high-quality, independent psychiatric care to Michigan — without the long waits that too often define mental health access. His approach blends evidence-based medication management with supportive psychotherapy, CBT techniques, and trauma-informed principles."
        imageSrc="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
        imageAlt="Ahmed Morsi, PMHNP-BC — High Point Psychiatry"
        buttonPrimary={{ text: 'Book an Appointment', href: '/contact' }}
        buttonSecondary={{ text: 'View Services', href: '/services' }}
      />

      <Stats5 />

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

      <Cta1 />
    </>
  );
}
