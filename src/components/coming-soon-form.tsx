'use client';

import { type FormEvent, useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function ComingSoonForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');

    const form = event.currentTarget;

    try {
      const res = await fetch('https://formsubmit.co/ajax/amorsi1992@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });

      if (!res.ok) throw new Error('Request failed');

      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <p className="mt-14 text-sm font-medium tracking-wide text-secondary">
        Thank you — your message is on its way. We&apos;ll be in touch soon.
      </p>
    );
  }

  const fieldClass =
    'w-full border-0 border-b border-border-solid bg-transparent px-0.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none transition-colors';

  return (
    <form onSubmit={handleSubmit} className="mt-14 flex w-full max-w-sm flex-col gap-5">
      <input type="hidden" name="_subject" value="New message from High Point Psychiatry site" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />

      <input
        type="text"
        name="name"
        required
        placeholder="Your name"
        aria-label="Your name"
        className={fieldClass}
      />
      <input
        type="email"
        name="email"
        required
        placeholder="Your email"
        aria-label="Your email"
        className={fieldClass}
      />
      <textarea
        name="message"
        required
        rows={2}
        placeholder="Message"
        aria-label="Message"
        className={`${fieldClass} resize-none`}
      />

      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-3 inline-flex h-12 items-center justify-center rounded-none bg-primary text-xs font-semibold tracking-[0.2em] text-primary-foreground uppercase transition-colors hover:bg-primary-hover disabled:opacity-60"
      >
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>

      {status === 'error' && (
        <p className="text-xs text-destructive">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
