import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const sections = [
  {
    title: "Navigate",
    links: [
      { name: "Home", href: "/" },
      { name: "Services", href: "/services" },
      { name: "About", href: "/about" },
      { name: "Insurance", href: "/insurance" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "Medication Management", href: "/services/medication-management" },
      { name: "Psychiatric Evaluation", href: "/services/psychiatric-evaluation" },
      { name: "Telehealth Psychiatry", href: "/services/telehealth-psychiatry" },
      { name: "Anxiety & Depression", href: "/services/anxiety-depression" },
      { name: "ADHD Treatment", href: "/services/adhd-treatment" },
      { name: "Mood & Trauma", href: "/services/mood-trauma" },
    ],
  },
  {
    title: "Service Areas",
    links: [
      { name: "Flint, MI", href: "/locations/flint" },
      { name: "Grand Blanc, MI", href: "/locations/grand-blanc" },
      { name: "Burton, MI", href: "/locations/burton" },
      { name: "Flushing, MI", href: "/locations/flushing" },
      { name: "Davison, MI", href: "/locations/davison" },
      { name: "Telehealth — All of Michigan", href: "/contact" },
    ],
  },
];

interface Footer1Props {
  className?: string;
}

const Footer1 = ({ className }: Footer1Props) => {
  return (
    <section className={cn("py-16", className)}>
      <div className="container">
        <footer>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div className="max-w-xs">
              <div className="flex items-center gap-2">
                <img
                  src="/images/layout/logo.svg"
                  alt="High Point Psychiatry"
                  className="h-8"
                />
                <span className="font-semibold text-primary">High Point Psychiatry</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Board-Certified Psychiatric Mental Health Nurse Practitioner
                serving Genesee County in-person and Michigan statewide via
                telehealth.
              </p>
              <div className="mt-4 space-y-1 text-sm text-muted-foreground">
                <p>4800 S Saginaw St, Flint, MI 48507</p>
                <a
                  href="tel:8107328336"
                  className="block font-medium text-primary hover:underline"
                >
                  (810) 732-8336
                </a>
              </div>
            </div>
          </div>

          <Separator className="my-10" />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-3 text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="font-medium hover:text-primary">
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h3 className="mb-4 font-bold">Connect</h3>
              <ul className="flex items-center space-x-5 text-muted-foreground">
                <li className="hover:text-primary">
                  <a href="#" aria-label="Facebook">
                    <FaFacebook className="size-5" />
                  </a>
                </li>
                <li className="hover:text-primary">
                  <a href="#" aria-label="Instagram">
                    <FaInstagram className="size-5" />
                  </a>
                </li>
                <li className="hover:text-primary">
                  <a href="#" aria-label="LinkedIn">
                    <FaLinkedin className="size-5" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-10" />

          <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:justify-between">
            <p>© {new Date().getFullYear()} High Point Psychiatry. All rights reserved.</p>
            <p>Ahmed Morsi, PMHNP-BC · NPI: 1710518352 · MI License: 4704383923</p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer1 };
