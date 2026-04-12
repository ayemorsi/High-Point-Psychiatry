import { ArrowRight, Phone } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function CtaBanner() {
  return (
    <section className="section-padding bg-hero-gradient relative overflow-hidden">
      {/* Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 30% 50%, #76A1C2 0%, transparent 60%)',
        }}
      />

      <div className="container relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#B1DCFF]">
            Start Your Journey
          </p>
          <h2 className="font-display mb-6 text-3xl font-medium text-white sm:text-4xl lg:text-5xl lg:leading-[1.1]">
            Ready to Take the{' '}
            <span className="italic text-[#B1DCFF]">First Step?</span>
          </h2>
          <p className="mb-10 text-base leading-relaxed text-white/70 sm:text-lg">
            Accepting new patients in Flint &amp; Grand Blanc, MI. Same-week
            appointments often available. Telehealth available statewide.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              className="rounded-full bg-white px-8 py-3 text-base font-semibold text-primary shadow-soft transition-all hover:bg-white/90"
            >
              <Link href="/contact">
                Book Appointment
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <a
              href="tel:8107328336"
              className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              <Phone className="size-4" />
              (810) 732-8336
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
