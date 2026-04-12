import { Award, CheckCircle2, GraduationCap } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const CREDENTIALS = [
  'PMHNP-BC — Board Certified',
  'MSN, Herzing University',
  'BA, University of Michigan–Flint',
  '14+ Years Healthcare Experience',
  '10+ Years Psychiatric Nursing',
  'NPI: 1710518352 | MI Lic: 4704383923',
];

export default function AboutPreview() {
  return (
    <section className="section-padding bg-surface">
      <div className="container">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left — text */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-secondary">
              Your Provider
            </p>
            <h2 className="font-display mb-6 text-3xl font-medium text-primary sm:text-4xl lg:text-5xl">
              Ahmed Morsi,{' '}
              <span className="italic text-secondary">PMHNP-BC</span>
            </h2>
            <p className="mb-6 text-base leading-relaxed text-muted-foreground">
              Born and raised in the Flint/Grand Blanc area, Ahmed brings over
              14 years of healthcare experience to High Point Psychiatry. As a
              Board-Certified Psychiatric Mental Health Nurse Practitioner, he
              combines deep clinical knowledge with a compassionate,
              person-centered approach.
            </p>
            <p className="mb-8 text-base leading-relaxed text-muted-foreground">
              Ahmed&apos;s philosophy is rooted in partnership — working alongside
              each patient to understand their full story and build a treatment
              plan that genuinely fits their life. Whether you are seeking
              medication management, a psychiatric evaluation, or ongoing
              support, you will always be treated with dignity and respect.
            </p>

            {/* Credentials */}
            <ul className="mb-10 space-y-3">
              {CREDENTIALS.map((c) => (
                <li key={c} className="flex items-center gap-3 text-sm text-foreground">
                  <CheckCircle2 className="size-4 shrink-0 text-secondary" />
                  {c}
                </li>
              ))}
            </ul>

            <Button
              asChild
              className="rounded-full bg-primary px-8 py-3 font-semibold text-white shadow-soft hover:bg-[#031636]"
            >
              <Link href="/about">Full Bio &amp; Background</Link>
            </Button>
          </div>

          {/* Right — credential cards */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Card 1 */}
              <div className="col-span-2 rounded-2xl bg-hero-gradient p-8 shadow-soft">
                <GraduationCap className="mb-4 size-8 text-[#B1DCFF]" />
                <p className="font-display text-2xl font-medium text-white">
                  MSN &amp; PMHNP
                </p>
                <p className="mt-1 text-sm text-white/60">
                  Post-Graduate Certificate · Herzing University
                </p>
              </div>

              {/* Card 2 */}
              <div className="rounded-2xl bg-surface-lowest p-6 shadow-card border border-[rgba(26,43,76,0.06)]">
                <p className="font-display text-4xl font-medium text-primary">14+</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Years in healthcare
                </p>
              </div>

              {/* Card 3 */}
              <div className="rounded-2xl bg-surface-lowest p-6 shadow-card border border-[rgba(26,43,76,0.06)]">
                <Award className="mb-2 size-7 text-secondary" />
                <p className="text-sm font-semibold text-primary">PMHNP-BC</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Board Certified
                </p>
              </div>
            </div>

            {/* Decorative blob */}
            <div
              className="pointer-events-none absolute -right-8 -bottom-8 size-48 rounded-full opacity-10"
              style={{
                background: 'radial-gradient(circle, #76A1C2 0%, transparent 70%)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
