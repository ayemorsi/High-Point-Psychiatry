import type { Metadata } from 'next';

import CtaBanner from '@/components/sections/cta-banner';
import ServicesGrid from '@/components/sections/services-grid';

export const metadata: Metadata = {
  title: 'Psychiatric Services',
  description:
    'Comprehensive psychiatric services in Flint, MI and statewide via telehealth — medication management, psychiatric evaluations, ADHD, anxiety, depression, and more.',
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient relative overflow-hidden pt-36 pb-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, #76A1C2 0%, transparent 60%)' }}
        />
        <div className="container relative z-10 max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#B1DCFF]">What We Offer</p>
          <h1 className="font-display mb-6 text-4xl font-medium leading-tight text-white sm:text-5xl lg:text-6xl">
            Psychiatric Services{' '}
            <span className="italic text-[#B1DCFF]">Built Around You</span>
          </h1>
          <p className="text-lg leading-relaxed text-white/70">
            From initial evaluations to ongoing medication management, High Point
            Psychiatry provides personalized mental health care — in-person in
            Genesee County and via telehealth across Michigan.
          </p>
        </div>
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      <ServicesGrid />
      <CtaBanner />
    </>
  );
}
