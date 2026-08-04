import { ComingSoonForm } from '@/components/coming-soon-form';

export default function ComingSoonPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 py-24">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-10%] left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-primary/[0.05] blur-3xl" />
        <div className="absolute right-[-10%] bottom-[-15%] h-[420px] w-[420px] rounded-full bg-secondary/[0.08] blur-3xl" />
      </div>

      <div className="relative flex w-full max-w-lg flex-col items-center text-center">
        {/* Wordmark */}
        <p className="text-xs font-medium tracking-[0.4em] text-muted-foreground uppercase">
          Genesee County, Michigan
        </p>

        <h1 className="font-display mt-4 text-5xl leading-none text-primary sm:text-6xl">
          High Point
        </h1>
        <p className="mt-3 text-sm font-medium tracking-[0.55em] text-secondary uppercase">
          Psychiatry
        </p>

        <div className="mt-10 flex items-center gap-4">
          <span className="h-px w-8 bg-primary/25" />
          <span className="text-[11px] font-medium tracking-[0.35em] text-muted-foreground uppercase">
            Coming Soon
          </span>
          <span className="h-px w-8 bg-primary/25" />
        </div>

        {/* Headline */}
        <h2 className="font-display mt-8 text-3xl text-foreground sm:text-4xl">
          A calmer place for your mind is almost here.
        </h2>

        <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
          We&apos;re preparing to welcome new patients across Genesee County — with compassionate,
          board-certified psychiatric care available in person and by telehealth across Michigan.
        </p>

        <ComingSoonForm />

        <p className="mt-16 text-[11px] tracking-[0.15em] text-muted-foreground uppercase">
          &copy; {new Date().getFullYear()} High Point Psychiatry — All Rights Reserved
        </p>
      </div>
    </main>
  );
}
