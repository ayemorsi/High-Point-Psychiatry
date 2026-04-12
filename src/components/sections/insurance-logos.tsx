import Link from 'next/link';

const INSURANCES = [
  { name: 'Medicare', abbr: 'Medicare' },
  { name: 'Providence Health Plan', abbr: 'Providence' },
  { name: 'Blue Cross Blue Shield', abbr: 'BCBS' },
  { name: 'Aetna', abbr: 'Aetna' },
  { name: 'Cigna', abbr: 'Cigna' },
  { name: 'United Healthcare', abbr: 'UHC' },
  { name: 'Priority Health', abbr: 'Priority Health' },
  { name: 'HAP', abbr: 'HAP' },
  { name: 'Molina Healthcare', abbr: 'Molina' },
  { name: 'McLaren Health Plan', abbr: 'McLaren' },
];

function LogoCard({ name, abbr }: { name: string; abbr: string }) {
  return (
    <div
      className="flex h-14 min-w-[140px] items-center justify-center rounded-xl bg-surface-lowest px-6 shadow-card border border-[rgba(26,43,76,0.06)]"
      title={name}
    >
      <span className="text-sm font-semibold text-primary/70 whitespace-nowrap">
        {abbr}
      </span>
    </div>
  );
}

export default function InsuranceLogos() {
  return (
    <section className="section-padding bg-surface-low overflow-hidden">
      <div className="container mb-10">
        <div className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-secondary">
            Insurance Accepted
          </p>
          <h2 className="font-display mb-4 text-3xl font-medium text-primary sm:text-4xl">
            We Work With Your Insurance
          </h2>
          <p className="mx-auto max-w-xl text-base text-muted-foreground">
            High Point Psychiatry accepts most major insurance plans. Don&apos;t
            see yours?{' '}
            <Link href="/contact" className="text-secondary underline underline-offset-4 hover:text-primary">
              Contact us
            </Link>{' '}
            — we may still be able to help.
          </p>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-24 bg-gradient-to-r from-surface-low to-transparent" />
        <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-24 bg-gradient-to-l from-surface-low to-transparent" />

        <div
          className="flex gap-4"
          style={
            {
              '--gap': '1rem',
              '--duration': '30s',
            } as React.CSSProperties
          }
        >
          {/* First copy */}
          <div className="flex shrink-0 animate-[marquee_30s_linear_infinite] gap-4">
            {INSURANCES.map((ins) => (
              <LogoCard key={ins.abbr} name={ins.name} abbr={ins.abbr} />
            ))}
          </div>
          {/* Duplicate for seamless loop */}
          <div
            className="flex shrink-0 animate-[marquee_30s_linear_infinite] gap-4"
            aria-hidden
          >
            {INSURANCES.map((ins) => (
              <LogoCard
                key={`dup-${ins.abbr}`}
                name={ins.name}
                abbr={ins.abbr}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="container mt-8 text-center">
        <Link
          href="/insurance"
          className="text-sm font-medium text-secondary underline underline-offset-4 hover:text-primary transition-colors"
        >
          View full insurance list →
        </Link>
      </div>
    </section>
  );
}
