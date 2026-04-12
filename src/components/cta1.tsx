import { ArrowRight, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Cta1Props {
  className?: string;
}

const Cta1 = ({ className }: Cta1Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-8 rounded-2xl bg-primary p-10 text-center md:flex-row md:text-left md:p-16">
          <div className="md:max-w-lg">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-white/60">
              Start Your Journey
            </p>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Ready to Take the{" "}
              <span className="italic text-[#B1DCFF]">First Step?</span>
            </h2>
            <p className="text-white/70">
              We are accepting new patients. Book your first appointment —
              in-person in Flint or via telehealth anywhere in Michigan. Most
              insurance accepted.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="bg-white font-semibold text-primary hover:bg-white/90"
            >
              <a href="/contact">
                Book Appointment
                <ArrowRight className="ml-2 size-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/30 bg-transparent font-semibold text-white hover:bg-white/10"
            >
              <a href="tel:8107328336">
                <Phone className="mr-2 size-4" />
                (810) 732-8336
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta1 };
