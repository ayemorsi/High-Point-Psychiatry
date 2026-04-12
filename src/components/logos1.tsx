import { cn } from "@/lib/utils";

const insurers = [
  "Medicare",
  "Providence Health Plan",
  "Blue Cross Blue Shield",
  "Aetna",
  "Cigna",
  "UnitedHealthcare",
  "Priority Health",
  "HAP",
  "Molina Healthcare",
  "McLaren Health Plan",
  "Headway Network",
  "Rula Network",
];

interface Logos1Props {
  className?: string;
}

const Logos1 = ({ className }: Logos1Props) => {
  return (
    <section className={cn("py-24", className)}>
      <div className="container">
        <p className="mb-10 text-center text-lg font-semibold text-primary">
          We accept most major insurance plans
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {insurers.map((name, i) => (
            <span
              key={i}
              className="rounded-full border border-border bg-muted/50 px-5 py-2 text-sm font-medium text-muted-foreground"
            >
              {name}
            </span>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Don&apos;t see your plan?{" "}
          <a
            href="/contact"
            className="font-medium text-primary underline underline-offset-4"
          >
            Contact us
          </a>{" "}
          — we may still be able to help.
        </p>
      </div>
    </section>
  );
};

export { Logos1 };
