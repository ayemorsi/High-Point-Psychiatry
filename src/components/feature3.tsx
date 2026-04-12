import { Brain, Heart, Pill, Shield, Video, Zap } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: <Pill className="size-5" strokeWidth={1.5} />,
    title: "Medication Management",
    description:
      "Expert evaluation and ongoing management of psychiatric medications tailored to your individual needs, history, and treatment response.",
  },
  {
    icon: <Brain className="size-5" strokeWidth={1.5} />,
    title: "Psychiatric Evaluation",
    description:
      "Comprehensive initial assessments to accurately diagnose mental health conditions and build a personalized, evidence-based treatment plan.",
  },
  {
    icon: <Video className="size-5" strokeWidth={1.5} />,
    title: "Telehealth Psychiatry",
    description:
      "Secure HIPAA-compliant video appointments available to all Michigan residents — quality psychiatric care from the comfort of home.",
  },
  {
    icon: <Heart className="size-5" strokeWidth={1.5} />,
    title: "Anxiety & Depression",
    description:
      "Evidence-based treatment for anxiety disorders, major depression, panic disorder, and related conditions affecting your daily life.",
  },
  {
    icon: <Zap className="size-5" strokeWidth={1.5} />,
    title: "ADHD Evaluation & Treatment",
    description:
      "Thorough adult ADHD evaluation, accurate diagnosis, and individualized medication and behavioral management strategies.",
  },
  {
    icon: <Shield className="size-5" strokeWidth={1.5} />,
    title: "Mood & Trauma Care",
    description:
      "Trauma-informed psychiatric care for mood disorders, PTSD, OCD, and other complex mental health conditions requiring specialized attention.",
  },
];

interface Feature3Props {
  className?: string;
}

const Feature3 = ({ className }: Feature3Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            What We Treat
          </p>
          <h2 className="mb-4 text-4xl font-semibold text-pretty lg:text-5xl">
            Specialized Care for Every Mind
          </h2>
          <p className="max-w-2xl text-muted-foreground lg:text-lg">
            From comprehensive psychiatric evaluations to ongoing medication
            management, High Point Psychiatry offers evidence-based care for a
            full range of mental health conditions.
          </p>

          <div className="mt-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Card key={i} className="text-left">
                <CardHeader className="pb-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-primary">{service.icon}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="mb-2 text-lg font-semibold">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature3 };
