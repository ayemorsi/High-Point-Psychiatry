import type { Metadata } from 'next';
import { HelpCircle } from 'lucide-react';
import Link from 'next/link';

import { Cta1 } from '@/components/cta1';
import { Faq1 } from '@/components/faq1';
import { Hero3 } from '@/components/hero3';
import { Logos1 } from '@/components/logos1';

export const metadata: Metadata = {
  title: 'Insurance & Payment',
  description:
    'High Point Psychiatry accepts Medicare, Providence Health Plan, and many other major insurance plans. Learn more about coverage for psychiatric care in Michigan.',
};

export default function InsurancePage() {
  return (
    <>
      <Hero3
        heading="Insurance & Payment"
        description="We accept most major insurance plans. Our goal is to make high-quality psychiatric care as accessible as possible — regardless of your coverage."
        buttons={{
          primary: { text: 'Verify My Coverage', url: '/contact' },
          secondary: { text: 'Call (810) 732-8336', url: 'tel:8107328336' },
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

      <Logos1 />

      {/* Note about additional plans */}
      <section className="pb-0 pt-0">
        <div className="container">
          <div className="flex items-start gap-4 rounded-2xl bg-[rgba(118,161,194,0.1)] p-6 border border-[rgba(118,161,194,0.2)]">
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

      <Faq1
        heading="Insurance FAQ"
        items={[
          {
            id: 'faq-1',
            question: "What if my insurance isn't listed?",
            answer:
              'Contact our office at (810) 732-8336 or use the contact form. We can verify your benefits directly and let you know if we can accept your plan. We are continually expanding our insurance network.',
          },
          {
            id: 'faq-2',
            question: 'Do you offer self-pay options?',
            answer:
              'Yes. Self-pay rates are available for patients without insurance or whose insurance is not accepted. Contact us for current self-pay rates.',
          },
          {
            id: 'faq-3',
            question: 'Do you accept Medicaid?',
            answer:
              'We are currently working to expand our Medicaid/Healthy Michigan coverage. Please contact our office for the most current information on Medicaid acceptance.',
          },
          {
            id: 'faq-4',
            question: 'How do I verify my psychiatric benefits?',
            answer:
              'Call the member services number on the back of your insurance card and ask about mental health/behavioral health benefits, specifically for outpatient psychiatric services (CPT codes 90792, 99213–99215). You can also contact our office and we will assist with verification.',
          },
          {
            id: 'faq-5',
            question: "What is a 'psychiatric nurse practitioner' for insurance purposes?",
            answer:
              'Ahmed Morsi is a PMHNP-BC — a Psychiatric Mental Health Nurse Practitioner, Board Certified. Most insurance plans cover psychiatric NP services the same as psychiatrist (MD/DO) services for medication management and evaluations. However, coverage specifics vary by plan.',
          },
        ]}
      />

      <Cta1 />
    </>
  );
}
