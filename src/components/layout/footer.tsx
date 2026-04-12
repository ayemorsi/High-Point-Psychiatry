import Image from 'next/image';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Insurance', href: '/insurance' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const SERVICE_LINKS = [
  { label: 'Medication Management', href: '/services/medication-management' },
  { label: 'Psychiatric Evaluation', href: '/services/psychiatric-evaluation' },
  { label: 'Telehealth Psychiatry', href: '/services/telehealth-psychiatry' },
  { label: 'Anxiety & Depression', href: '/services/anxiety-depression' },
  { label: 'ADHD Treatment', href: '/services/adhd-treatment' },
  { label: 'Mood & Trauma', href: '/services/mood-trauma' },
];

const LOCATIONS = [
  { label: 'Flint, MI', href: '/locations/flint' },
  { label: 'Grand Blanc, MI', href: '/locations/grand-blanc' },
  { label: 'Burton, MI', href: '/locations/burton' },
  { label: 'Flushing, MI', href: '/locations/flushing' },
  { label: 'Davison, MI', href: '/locations/davison' },
];

export function Footer() {
  return (
    <footer className="bg-primary text-white/70">
      <div className="container py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" aria-label="High Point Psychiatry home">
              <Image
                src="/images/layout/logo.svg"
                alt="High Point Psychiatry"
                width={140}
                height={44}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Board-certified psychiatric mental health nurse practitioner
              serving Genesee County and Michigan statewide.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <p className="flex items-start gap-2">
                <span className="mt-0.5 text-[#76A1C2]">📍</span>
                4800 S Saginaw St, Flint, MI 48507
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#76A1C2]">📞</span>
                <a
                  href="tel:8107328336"
                  className="transition-colors hover:text-white"
                >
                  (810) 732-8336
                </a>
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white">
              Navigation
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white">
              Services
            </h4>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white">
              Service Areas
            </h4>
            <ul className="space-y-3">
              {LOCATIONS.map((loc) => (
                <li key={loc.href}>
                  <Link
                    href={loc.href}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {loc.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services/telehealth-psychiatry"
                  className="text-sm transition-colors hover:text-white"
                >
                  Telehealth — All Michigan
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} High Point Psychiatry. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Ahmed Morsi, PMHNP-BC · NPI: 1710518352 · Michigan License: 4704383923
          </p>
        </div>
      </div>
    </footer>
  );
}
