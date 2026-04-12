import { ArrowRight, MapPin, Phone, Video } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      {/* Subtle texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25% 50%, #76A1C2 0%, transparent 60%), radial-gradient(circle at 75% 20%, #B1DCFF 0%, transparent 50%)',
        }}
      />

      <div className="container relative z-10 hero-padding pt-36 lg:pt-44">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-sm">
            <span className="size-2 rounded-full bg-[#76A1C2]" />
            Accepting New Patients in Flint, MI &amp; Telehealth Statewide
          </div>

          {/* Headline */}
          <h1 className="font-display mb-6 text-4xl leading-[1.08] font-medium text-white sm:text-5xl lg:text-6xl lg:leading-[1.06]">
            Compassionate Psychiatric Care{' '}
            <span className="italic text-[#B1DCFF]">Across Michigan</span>
          </h1>

          {/* Subheading */}
          <p className="mb-10 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Ahmed Morsi, PMHNP-BC — Board-Certified Psychiatric Mental Health
            Nurse Practitioner offering in-person appointments in Genesee County
            and telehealth care throughout Michigan.
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button
              asChild
              className="rounded-full bg-white px-8 py-3 text-base font-semibold text-primary shadow-soft transition-all duration-200 hover:bg-white/90"
            >
              <Link href="/contact">
                Book Appointment
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/30 bg-white/10 px-8 py-3 text-base font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
            >
              <Link href="/about">Meet Ahmed</Link>
            </Button>
          </div>

          {/* Trust signals */}
          <div className="mt-12 flex flex-wrap gap-6 text-sm text-white/60">
            <span className="flex items-center gap-2">
              <MapPin className="size-4 text-[#76A1C2]" />
              4800 S Saginaw St, Flint, MI
            </span>
            <span className="flex items-center gap-2">
              <Video className="size-4 text-[#76A1C2]" />
              Telehealth Available Statewide
            </span>
            <span className="flex items-center gap-2">
              <Phone className="size-4 text-[#76A1C2]" />
              (810) 732-8336
            </span>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
