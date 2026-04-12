import type { Metadata } from 'next';

import { Contact1 } from '@/components/contact1';
import { Cta1 } from '@/components/cta1';

export const metadata: Metadata = {
  title: 'Contact & Appointments',
  description:
    'Book an appointment with High Point Psychiatry in Flint, MI. In-person and telehealth psychiatric care available. Call (810) 732-8336 or submit a request online.',
};

export default function ContactPage() {
  return (
    <>
      <Contact1 />
      <Cta1 />
    </>
  );
}
