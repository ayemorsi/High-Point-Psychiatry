import type { Metadata } from 'next';
import { Clock, MapPin, Phone, Video } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact & Appointments',
  description:
    'Book an appointment with High Point Psychiatry in Flint, MI. In-person and telehealth psychiatric care available. Call (810) 732-8336 or submit a request online.',
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient relative overflow-hidden pt-36 pb-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, #76A1C2 0%, transparent 60%)' }}
        />
        <div className="container relative z-10 max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#B1DCFF]">Get Started</p>
          <h1 className="font-display mb-6 text-4xl font-medium leading-tight text-white sm:text-5xl lg:text-6xl">
            Book an{' '}
            <span className="italic text-[#B1DCFF]">Appointment</span>
          </h1>
          <p className="text-lg leading-relaxed text-white/70">
            We are accepting new patients. Reach out to schedule your first
            appointment — in-person in Flint or via telehealth anywhere in Michigan.
          </p>
        </div>
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Contact content */}
      <section className="section-padding bg-surface">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact info */}
            <div>
              <h2 className="font-display mb-8 text-2xl font-medium text-primary">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[rgba(118,161,194,0.12)]">
                    <MapPin className="size-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Office Location</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      4800 S Saginaw St<br />
                      Flint, MI 48507
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">Also serving Grand Blanc and Genesee County</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[rgba(118,161,194,0.12)]">
                    <Phone className="size-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Phone</p>
                    <a
                      href="tel:8107328336"
                      className="mt-1 text-sm text-secondary underline underline-offset-4 hover:text-primary transition-colors"
                    >
                      (810) 732-8336
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[rgba(118,161,194,0.12)]">
                    <Video className="size-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Telehealth</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Available statewide across Michigan via secure video appointment.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[rgba(118,161,194,0.12)]">
                    <Clock className="size-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Office Hours</p>
                    <div className="mt-1 space-y-0.5 text-sm text-muted-foreground">
                      <p>Monday – Friday: 9:00 AM – 5:00 PM</p>
                      <p>Saturday – Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 rounded-2xl bg-surface-low p-6 border border-[rgba(26,43,76,0.06)]">
                <p className="text-sm font-semibold text-primary">Online Booking Coming Soon</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Our online booking system is being finalized. In the meantime, please
                  call us or submit the form and we will reach out within one business day.
                </p>
              </div>
            </div>

            {/* Contact form */}
            <div className="rounded-2xl bg-surface-lowest p-8 shadow-card border border-[rgba(26,43,76,0.06)]">
              <h2 className="font-display mb-6 text-2xl font-medium text-primary">Send Us a Message</h2>
              <form className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-primary">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      className="input-ghost w-full px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground"
                      placeholder="Jane"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-primary">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      className="input-ghost w-full px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-primary">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="input-ghost w-full px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground"
                    placeholder="jane@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-primary">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="input-ghost w-full px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground"
                    placeholder="(810) 555-0000"
                  />
                </div>

                <div>
                  <label htmlFor="appointmentType" className="mb-1.5 block text-sm font-medium text-primary">
                    Appointment Type
                  </label>
                  <select
                    id="appointmentType"
                    name="appointmentType"
                    className="input-ghost w-full px-4 py-3 text-sm text-foreground"
                  >
                    <option value="">Select one...</option>
                    <option value="in-person">In-Person (Flint, MI)</option>
                    <option value="telehealth">Telehealth (Michigan)</option>
                    <option value="unsure">Not Sure</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-primary">
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="input-ghost w-full resize-none px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground"
                    placeholder="Briefly describe what brings you in, or any questions you have..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-primary py-3 text-base font-semibold text-white shadow-soft transition-colors hover:bg-[#031636]"
                >
                  Submit Request
                </button>

                <p className="text-center text-xs text-muted-foreground">
                  We respond within one business day. For urgent matters, please call{' '}
                  <a href="tel:8107328336" className="text-secondary underline underline-offset-4">
                    (810) 732-8336
                  </a>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
