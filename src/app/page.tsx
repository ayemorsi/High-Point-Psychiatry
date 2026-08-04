import { Mail, Phone } from 'lucide-react';

export default function ComingSoonPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 py-24">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-10%] left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-3xl" />
        <div className="absolute right-[-10%] bottom-[-15%] h-[420px] w-[420px] rounded-full bg-secondary/[0.10] blur-3xl" />
      </div>

      <div className="relative flex w-full max-w-xl flex-col items-center text-center">
        {/* Mark */}
        <svg
          width="56"
          height="56"
          viewBox="0 0 38 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M28.1875 33.25C32.7709 33.1566 36.4563 29.4077 36.4563 24.799C36.4563 22.5576 35.5665 20.408 33.9826 18.8232L19.9188 4.75V13.4974C19.9188 14.9603 20.4995 16.3634 21.5334 17.3979L24.8279 20.6946L24.8369 20.7034L30.361 26.2312C30.5404 26.4106 30.5404 26.7017 30.361 26.8812C30.1816 27.0607 29.8907 27.0607 29.7114 26.8812L27.8072 24.9758H10.1928L8.28868 26.8812C8.10928 27.0607 7.81842 27.0607 7.63903 26.8812C7.45963 26.7017 7.45963 26.4106 7.63902 26.2312L13.1631 20.7034L13.1721 20.6946L16.4666 17.3979C17.5005 16.3634 18.0812 14.9603 18.0812 13.4974V4.75L4.01738 18.8232C2.43355 20.408 1.54376 22.5576 1.54376 24.799C1.54376 29.4077 5.22918 33.1566 9.81254 33.25H28.1875Z"
            fill="var(--primary)"
          />
          <path
            d="M19.9188 13.4974V4.75L13.1631 20.7034L16.4666 17.3979C17.5005 16.3634 18.0812 14.9603 18.0812 13.4974H19.9188Z"
            fill="var(--secondary)"
          />
        </svg>

        {/* Wordmark */}
        <div className="mt-5">
          <p className="font-display text-3xl text-primary sm:text-4xl">High Point</p>
          <p className="mt-1 text-xs font-medium tracking-[0.35em] text-secondary uppercase">
            Psychiatry
          </p>
        </div>

        {/* Eyebrow */}
        <span className="mt-10 rounded-full border border-border bg-surface-low px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
          Coming Soon
        </span>

        {/* Headline */}
        <h1 className="font-display mt-6 text-3xl text-foreground sm:text-4xl">
          A calmer place for your mind is almost here.
        </h1>

        <p className="mt-4 max-w-md text-base text-muted-foreground sm:text-lg">
          We&apos;re preparing to welcome new patients in Flint, Michigan — with compassionate,
          board-certified psychiatric care available in person and by telehealth across the
          state.
        </p>

        <div className="mt-10 h-px w-16 bg-border-solid" />

        {/* Contact */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-8">
          <a
            href="tel:8107328336"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-secondary"
          >
            <Phone className="size-4 text-secondary" />
            (810) 732-8336
          </a>
          <a
            href="mailto:hello@highpointpsychiatry.com"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-secondary"
          >
            <Mail className="size-4 text-secondary" />
            hello@highpointpsychiatry.com
          </a>
        </div>

        <p className="mt-16 text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} High Point Psychiatry. All rights reserved.
        </p>
      </div>
    </main>
  );
}
