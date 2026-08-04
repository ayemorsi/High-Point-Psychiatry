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
      <p className="mt-10 text-sm font-medium text-secondary">
        Thanks — your message is on its way. We&apos;ll be in touch soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 flex w-full max-w-sm flex-col gap-3">
      <input type="hidden" name="_subject" value="New message from High Point Psychiatry site" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />

      <input
        type="text"
        name="name"
        required
        placeholder="Your name"
        aria-label="Your name"
        className="input-ghost h-11 w-full px-4 text-sm text-foreground placeholder:text-muted-foreground"
      />
      <input
        type="email"
        name="email"
        required
        placeholder="Your email"
        aria-label="Your email"
        className="input-ghost h-11 w-full px-4 text-sm text-foreground placeholder:text-muted-foreground"
      />
      <textarea
        name="message"
        required
        rows={3}
        placeholder="Message"
        aria-label="Message"
        className="input-ghost w-full resize-none px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground"
      />

      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-1 inline-flex h-11 items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-60"
      >
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>

      {status === 'error' && (
        <p className="text-xs text-destructive">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
