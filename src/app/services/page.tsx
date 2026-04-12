import type { Metadata } from 'next';

import { Cta1 } from '@/components/cta1';
import { Feature3 } from '@/components/feature3';
import { Hero3 } from '@/components/hero3';

export const metadata: Metadata = {
  title: 'Psychiatric Services',
  description:
    'Comprehensive psychiatric services in Flint, MI and statewide via telehealth — medication management, psychiatric evaluations, ADHD, anxiety, depression, and more.',
};

export default function ServicesPage() {
  return (
    <>
      <Hero3
        heading="Psychiatric Services Built Around You"
        description="From initial evaluations to ongoing medication management, High Point Psychiatry provides personalized mental health care — in-person in Genesee County and via telehealth across Michigan."
        buttons={{
          primary: { text: 'Book Appointment', url: '/contact' },
          secondary: { text: 'Meet Ahmed', url: '/about' },
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
      <Feature3 />
      <Cta1 />
    </>
  );
}
