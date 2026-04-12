import type { Metadata } from 'next';

import AboutPreview from '@/components/sections/about-preview';
import CtaBanner from '@/components/sections/cta-banner';
import Hero from '@/components/sections/hero';
import InsuranceLogos from '@/components/sections/insurance-logos';
import ServicesGrid from '@/components/sections/services-grid';

export const metadata: Metadata = {
  title: 'High Point Psychiatry | Flint, MI Psychiatric Care',
  description:
    'Ahmed Morsi, PMHNP-BC — Board-certified psychiatric mental health nurse practitioner serving Genesee County, Michigan. In-person in Flint & Grand Blanc, telehealth statewide.',
};

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <AboutPreview />
      <InsuranceLogos />
      <CtaBanner />
    </>
  );
}
