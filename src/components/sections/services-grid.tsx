import {
  Brain,
  Heart,
  Pill,
  Shield,
  Sparkles,
  Video,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

const SERVICES = [
  {
    icon: Pill,
    title: 'Medication Management',
    description:
      'Comprehensive psychiatric medication evaluation, prescribing, and ongoing management tailored to your individual needs.',
    href: '/services/medication-management',
    accent: '#1A2B4C',
  },
  {
    icon: Brain,
    title: 'Psychiatric Evaluation',
    description:
      'Thorough diagnostic evaluations to accurately identify conditions and build a personalized treatment roadmap.',
    href: '/services/psychiatric-evaluation',
    accent: '#76A1C2',
  },
  {
    icon: Video,
    title: 'Telehealth Psychiatry',
    description:
      'Convenient, secure video appointments available statewide across Michigan — care from the comfort of home.',
    href: '/services/telehealth-psychiatry',
    accent: '#1A2B4C',
  },
  {
    icon: Heart,
    title: 'Anxiety & Depression',
    description:
      'Evidence-based treatment combining medication management and supportive therapy for lasting relief.',
    href: '/services/anxiety-depression',
    accent: '#76A1C2',
  },
  {
    icon: Zap,
    title: 'ADHD Treatment',
    description:
      'Accurate ADHD evaluation and personalized treatment plans for adults seeking clarity and focus.',
    href: '/services/adhd-treatment',
    accent: '#1A2B4C',
  },
  {
    icon: Shield,
    title: 'Mood & Trauma Care',
    description:
      'Specialized care for mood disorders, OCD, PTSD, and trauma using trauma-informed, person-centered approaches.',
    href: '/services/mood-trauma',
    accent: '#76A1C2',
  },
];

export default function ServicesGrid() {
  return (
    <section className="section-padding bg-surface-low">
      <div className="container">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-secondary">
            What We Treat
          </p>
          <h2 className="font-display mb-4 text-3xl font-medium text-primary sm:text-4xl lg:text-5xl">
            Specialized Care for{' '}
            <span className="italic">Every Mind</span>
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            High Point Psychiatry offers comprehensive psychiatric services
            for adults across Genesee County and Michigan.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.href}
                href={service.href}
                className={cn(
                  'group relative rounded-2xl bg-surface-lowest p-8 shadow-card transition-all duration-300',
                  'hover:-translate-y-1 hover:shadow-soft',
                  'border border-[rgba(26,43,76,0.06)]',
                )}
              >
                {/* Icon */}
                <div
                  className="mb-6 flex size-12 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor:
                      i % 2 === 0
                        ? 'rgba(26,43,76,0.08)'
                        : 'rgba(118,161,194,0.12)',
                  }}
                >
                  <Icon
                    className="size-5"
                    style={{ color: service.accent }}
                  />
                </div>

                <h3 className="mb-3 text-lg font-semibold text-primary">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                {/* Hover arrow */}
                <span className="mt-6 inline-flex items-center text-sm font-medium text-secondary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  Learn more →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
