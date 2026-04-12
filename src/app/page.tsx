import { Cta1 } from '@/components/cta1';
import { Feature1 } from '@/components/feature1';
import { Feature3 } from '@/components/feature3';
import { Hero3 } from '@/components/hero3';
import { Logos1 } from '@/components/logos1';
import { Stats5 } from '@/components/stats5';
import { Testimonial1 } from '@/components/testimonial1';

export default function HomePage() {
  return (
    <>
      <Hero3
        heading="Compassionate Psychiatric Care Across Michigan"
        description="Ahmed Morsi, PMHNP-BC — Board-Certified Psychiatric Mental Health Nurse Practitioner serving Genesee County in-person and Michigan statewide via telehealth. Accepting new patients."
        buttons={{
          primary: { text: 'Book Appointment', url: '/contact' },
          secondary: { text: 'Meet Ahmed', url: '/about' },
        }}
        reviews={{
          count: 50,
          rating: 5.0,
          avatars: [
            {
              src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp',
              alt: 'Patient',
            },
            {
              src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp',
              alt: 'Patient',
            },
            {
              src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp',
              alt: 'Patient',
            },
            {
              src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp',
              alt: 'Patient',
            },
            {
              src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp',
              alt: 'Patient',
            },
          ],
        }}
      />

      <Feature3 />

      <Stats5 />

      <Feature1
        title="Meet Ahmed Morsi, PMHNP-BC"
        description="Ahmed Morsi is a Board-Certified Psychiatric Mental Health Nurse Practitioner with 14+ years of healthcare experience. A University of Michigan–Flint alumnus who grew up in Genesee County, Ahmed is deeply committed to expanding access to quality psychiatric care in his home community. He offers both in-person appointments at our Flint office and telehealth visits across Michigan."
        imageSrc="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
        imageAlt="Ahmed Morsi, PMHNP-BC — High Point Psychiatry"
        buttonPrimary={{ text: 'Full Bio & Background', href: '/about' }}
        buttonSecondary={{ text: 'Book Appointment', href: '/contact' }}
      />

      <Logos1 />

      <Testimonial1 />

      <Cta1 />
    </>
  );
}
