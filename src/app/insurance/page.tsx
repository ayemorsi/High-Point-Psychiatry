import type { Metadata } from 'next';
import { CheckCircle2, HelpCircle, Phone } from 'lucide-react';
import Link from 'next/link';

import CtaBanner from '@/components/sections/cta-banner';

export const metadata: Metadata = {
  title: 'Insurance & Payment',
  description:
    'High Point Psychiatry accepts Medicare, Providence Health Plan, and many other major insurance plans. Learn more about coverage for psychiatric care in Michigan.',
};

const CONFIRMED_INSURANCE = [
  { name: 'Medicare', note: 'Original Medicare accepted' },
  { name: 'Providence Health Plan', note: 'Including Medicare Advantage' },
  { name: 'Headway Network', note: 'Multiple plans via Headway' },
  { name: 'Rula Network', note: 'Multiple plans via Rula' },
];

const ADDITIONAL_PLANS = [
  'Blue Cross Blue Shield of Michigan',
  'Aetna',
  'Cigna',
  'United Healthcare',
  'Priority Health',
  'HAP (Health Alliance Plan)',
  'Molina Healthcare',
  'McLaren Health Plan',
  'Meridian Health Plan',
  'Blue Care Network',
];

const FAQS = [
  {
    q: "What if my insurance isn't listed?",
    a: "Contact our office at (810) 732-8336 or use the contact form. We can verify your benefits directly and let you know if we can accept your plan. We are continually expanding our insurance network.",
  },
  {
    q: 'Do you offer self-pay options?',
    a: 'Yes. Self-pay rates are available for patients without insurance or whose insurance is not accepted. Contact us for current self-pay rates.',
  },
  {
    q: 'Do you accept Medicaid?',
    a: 'We are currently working to expand our Medicaid/Healthy Michigan coverage. Please contact our office for the most current information on Medicaid acceptance.',
  },
  {
    q: 'How do I verify my psychiatric benefits?',
    a: "Call the member services number on the back of your insurance card and ask about mental health/behavioral health benefits, specifically for outpatient psychiatric services (CPT codes 90792, 99213–99215). You can also contact our office and we will assist with verification.",
  },
  {
    q: "What is a 'psychiatric nurse practitioner' for insurance purposes?",
    a: 'Ahmed Morsi is a PMHNP-BC — a Psychiatric Mental Health Nurse Practitioner, Board Certified. Most insurance plans cover psychiatric NP services the same as psychiatrist (MD/DO) services for medication management and evaluations. However, coverage specifics vary by plan.',
  },
];

export default function InsurancePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient relative overflow-hidden pt-36 pb-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, #76A1C2 0%, transparent 60%)' }}
        />
        <div className="container relative z-10 max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#B1DCFF]">Coverage</p>
          <h1 className="font-display mb-6 text-4xl font-medium leading-tight text-white sm:text-5xl lg:text-6xl">
            Insurance &amp;{' '}
            <span className="italic text-[#B1DCFF]">Payment</span>
          </h1>
          <p className="text-lg leading-relaxed text-white/70">
            We accept most major insurance plans. Our goal is to make high-quality
            psychiatric care as accessible as possible — regardless of your coverage.
          </p>
        </div>
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Confirmed plans */}
      <section className="section-padding bg-surface">
        <div className="container">
          <div className="mb-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-secondary">Confirmed Coverage</p>
            <h2 className="font-display text-3xl font-medium text-primary sm:text-4xl">Plans We Accept</h2>
          </div>

          {/* Confirmed */}
          <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CONFIRMED_INSURANCE.map((plan) => (
              <div
                key={plan.name}
                className="rounded-2xl bg-surface-lowest p-6 shadow-card border border-[rgba(26,43,76,0.06)]"
              >
                <CheckCircle2 className="mb-3 size-5 text-secondary" />
                <p className="font-semibold text-primary">{plan.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{plan.note}</p>
              </div>
            ))}
          </div>

          {/* Additional plans marquee row */}
          <div className="rounded-2xl bg-surface-low p-8">
            <p className="mb-6 text-sm font-semibold text-muted-foreground uppercase tracking-widest">
              Also Accepting (Verify with our office)
            </p>
            <div className="flex flex-wrap gap-3">
              {ADDITIONAL_PLANS.map((plan) => (
                <span
                  key={plan}
                  className="rounded-full bg-surface-lowest px-4 py-2 text-sm font-medium text-primary shadow-light border border-[rgba(26,43,76,0.06)]"
                >
                  {plan}
                </span>
              ))}
            </div>
          </div>

          {/* Note */}
          <div className="mt-8 flex items-start gap-4 rounded-2xl bg-[rgba(118,161,194,0.1)] p-6 border border-[rgba(118,161,194,0.2)]">
            <HelpCircle className="mt-0.5 size-5 shrink-0 text-secondary" />
            <div>
              <p className="font-semibold text-primary">Don&apos;t see your insurance?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                We are continuously expanding our network. Contact us at{' '}
                <a href="tel:8107328336" className="text-secondary underline underline-offset-4 hover:text-primary">
                  (810) 732-8336
                </a>{' '}
                or{' '}
                <Link href="/contact" className="text-secondary underline underline-offset-4 hover:text-primary">
                  use our contact form
                </Link>{' '}
                — we may still be able to accept your plan or work with you on self-pay options.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-surface-low">
        <div className="container">
          <div className="mb-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-secondary">Common Questions</p>
            <h2 className="font-display text-3xl font-medium text-primary sm:text-4xl">Insurance FAQ</h2>
          </div>
          <div className="mx-auto max-w-3xl space-y-4">
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl bg-surface-lowest p-8 shadow-card border border-[rgba(26,43,76,0.06)]"
              >
                <h3 className="mb-3 font-semibold text-primary">{faq.q}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick contact */}
      <section className="section-padding bg-surface">
        <div className="container">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-display mb-4 text-2xl font-medium text-primary">Questions About Your Coverage?</h2>
            <p className="mb-8 text-muted-foreground">
              Our team is happy to help you verify your psychiatric benefits and understand your coverage before your first appointment.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="tel:8107328336"
                className="flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-white shadow-soft hover:bg-[#031636] transition-colors"
              >
                <Phone className="size-4" />
                (810) 732-8336
              </a>
              <Link
                href="/contact"
                className="rounded-full border border-[rgba(26,43,76,0.2)] px-8 py-3 font-semibold text-primary hover:bg-surface-low transition-colors"
              >
                Send a Message
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
