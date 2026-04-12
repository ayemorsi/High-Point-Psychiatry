import './globals.css';

import type { Metadata, Viewport } from 'next';

import { Footer } from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://highpointpsychiatry.com'),
  title: {
    default: 'High Point Psychiatry | Flint, MI Psychiatric Care',
    template: '%s | High Point Psychiatry',
  },
  description:
    'High Point Psychiatry — Board-certified psychiatric mental health nurse practitioner serving Genesee County, Michigan. In-person in Flint & Grand Blanc, telehealth statewide. Accepting new patients.',
  keywords: [
    'psychiatrist Flint MI',
    'psychiatric nurse practitioner Michigan',
    'PMHNP Genesee County',
    'mental health care Flint Michigan',
    'anxiety treatment Flint MI',
    'depression treatment Genesee County',
    'ADHD psychiatry Michigan',
    'telehealth psychiatry Michigan',
    'medication management Flint MI',
    'High Point Psychiatry',
    'Ahmed Morsi PMHNP',
    'psychiatric care Grand Blanc MI',
  ],
  authors: [{ name: 'High Point Psychiatry' }],
  creator: 'High Point Psychiatry',
  publisher: 'High Point Psychiatry',
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: '48x48' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: [{ url: '/favicon/favicon.ico' }],
  },
  openGraph: {
    title: 'High Point Psychiatry | Flint, MI Psychiatric Care',
    description:
      'Board-certified psychiatric mental health nurse practitioner serving Genesee County, Michigan. In-person & telehealth appointments available.',
    siteName: 'High Point Psychiatry',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'High Point Psychiatry — Compassionate Psychiatric Care in Michigan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'High Point Psychiatry | Flint, MI Psychiatric Care',
    description:
      'Board-certified psychiatric mental health nurse practitioner serving Genesee County, Michigan. In-person & telehealth available.',
    images: ['/og-image.jpg'],
  },
};

const clinicSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MedicalClinic',
      '@id': 'https://highpointpsychiatry.com/#clinic',
      name: 'High Point Psychiatry',
      url: 'https://highpointpsychiatry.com',
      telephone: '(810) 732-8336',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '4800 S Saginaw St',
        addressLocality: 'Flint',
        addressRegion: 'MI',
        postalCode: '48507',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 42.9634,
        longitude: -83.6924,
      },
      medicalSpecialty: 'Psychiatry',
      availableService: [
        'Psychiatric Evaluation',
        'Medication Management',
        'Telehealth Psychiatry',
        'Anxiety Treatment',
        'Depression Treatment',
        'ADHD Evaluation',
        'OCD Treatment',
      ],
      areaServed: ['Flint, MI', 'Grand Blanc, MI', 'Genesee County, MI', 'Michigan'],
      image: 'https://highpointpsychiatry.com/images/layout/logo.png',
    },
    {
      '@type': 'Person',
      '@id': 'https://highpointpsychiatry.com/#provider',
      name: 'Ahmed Morsi',
      honorificSuffix: 'PMHNP-BC',
      jobTitle: 'Psychiatric Mental Health Nurse Practitioner',
      description:
        'Board-Certified Psychiatric Mental Health Nurse Practitioner (PMHNP-BC) with 14+ years of healthcare experience serving Genesee County, Michigan.',
      worksFor: { '@id': 'https://highpointpsychiatry.com/#clinic' },
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Board Certification',
          name: 'PMHNP-BC',
        },
      ],
      alumniOf: [
        { '@type': 'CollegeOrUniversity', name: 'Herzing University' },
        { '@type': 'CollegeOrUniversity', name: 'University of Michigan–Flint' },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
        />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="w-full flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
