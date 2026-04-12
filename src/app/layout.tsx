import './globals.css';

import type { Metadata, Viewport } from 'next';

import { Footer1 } from '@/components/footer1';
import { Navbar1 } from '@/components/navbar1';

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
      ],
      areaServed: ['Flint, MI', 'Grand Blanc, MI', 'Genesee County, MI', 'Michigan'],
    },
    {
      '@type': 'Person',
      '@id': 'https://highpointpsychiatry.com/#provider',
      name: 'Ahmed Morsi',
      honorificSuffix: 'PMHNP-BC',
      jobTitle: 'Psychiatric Mental Health Nurse Practitioner',
      worksFor: { '@id': 'https://highpointpsychiatry.com/#clinic' },
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Board Certification',
          name: 'PMHNP-BC',
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
            <Navbar1
              logo={{
                url: '/',
                src: '/images/layout/logo.svg',
                alt: 'High Point Psychiatry',
                title: 'High Point Psychiatry',
              }}
              menu={[
                { title: 'Home', url: '/' },
                { title: 'Services', url: '/services' },
                { title: 'About', url: '/about' },
                { title: 'Insurance', url: '/insurance' },
                { title: 'Blog', url: '/blog' },
                { title: 'Contact', url: '/contact' },
              ]}
              auth={{
                login: { title: '(810) 732-8336', url: 'tel:8107328336' },
                signup: { title: 'Book Appointment', url: '/contact' },
              }}
            />
          </header>
          <main className="w-full flex-1">{children}</main>
          <Footer1 />
        </div>
      </body>
    </html>
  );
}
