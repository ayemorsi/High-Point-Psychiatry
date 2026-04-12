import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Flint Patient",
    role: "Genesee County, MI",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar1.webp",
    content:
      "Ahmed truly listens. After years of struggling with anxiety, I finally have a medication plan that works. The whole process from scheduling to follow-up has been seamless and professional.",
  },
  {
    name: "Grand Blanc Patient",
    role: "Genesee County, MI",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar2.webp",
    content:
      "I was hesitant about telehealth but the experience was better than I expected. Ahmed is thorough, compassionate, and actually explains everything. I feel heard for the first time in years.",
  },
  {
    name: "Burton Patient",
    role: "Genesee County, MI",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar3.webp",
    content:
      "Getting diagnosed with ADHD as an adult changed my life. Ahmed took my concerns seriously and walked me through every step. My productivity and relationships have improved dramatically.",
  },
  {
    name: "Flushing Patient",
    role: "Genesee County, MI",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar4.webp",
    content:
      "High Point Psychiatry is the most patient-centered practice I've encountered. Ahmed doesn't rush appointments, answers all my questions, and genuinely cares about outcomes.",
  },
  {
    name: "Davison Patient",
    role: "Genesee County, MI",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar5.webp",
    content:
      "The scheduling was easy, the telehealth link worked perfectly, and Ahmed was warm and professional. After struggling with depression for two years, I finally feel like I'm on the right track.",
  },
  {
    name: "Swartz Creek Patient",
    role: "Genesee County, MI",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar6.webp",
    content:
      "I appreciated that Ahmed spent real time understanding my history before making any recommendations. The medication adjustment he suggested made a noticeable difference within weeks.",
  },
  {
    name: "Mount Morris Patient",
    role: "Genesee County, MI",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar7.jpg",
    content:
      "As someone who was nervous about seeing a psychiatric provider, Ahmed made me feel completely at ease. No judgment, just honest, thoughtful care. I recommend him to everyone I know.",
  },
  {
    name: "Clio Patient",
    role: "Genesee County, MI",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar8.jpg",
    content:
      "The telehealth option is a game changer for those of us who can't easily get to an office. Same quality care, same attentive provider — just from my living room. Worth every bit.",
  },
];

interface Testimonial1Props {
  className?: string;
}

const Testimonial1 = ({ className }: Testimonial1Props) => {
  const getColumns = (count: number) => {
    return Array.from({ length: count }, (_, colIdx) =>
      testimonials.filter((_, i) => i % count === colIdx),
    );
  };

  const mobileColumns = getColumns(2);
  const tabletColumns = getColumns(3);
  const desktopColumns = getColumns(4);

  return (
    <section className={cn("overflow-hidden border-b pt-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center gap-6">
          <Badge variant="outline">Patient Experiences</Badge>
          <h2 className="text-center text-3xl tracking-tight lg:text-5xl">
            What Our Patients Are Saying
          </h2>
          <p className="text-center text-muted-foreground lg:text-lg">
            Real experiences from patients across Genesee County and Michigan.
          </p>
        </div>
      </div>

      <div className="container mt-10 h-[450px] md:h-[500px] lg:h-[522px]">
        {/* Mobile: 2 columns */}
        <div className="flex gap-4 md:hidden">
          {mobileColumns.map((column, colIdx) => (
            <div
              key={colIdx}
              className={cn(
                "flex w-1/2 flex-col gap-4",
                colIdx === 1 && "mt-8",
              )}
            >
              {column.map((testimonial, idx) => (
                <Card key={idx}>
                  <CardContent className="px-4 text-sm leading-6 text-muted-foreground">
                    <q>{testimonial.content}</q>
                  </CardContent>
                  <CardFooter className="px-4">
                    <div className="flex gap-3 leading-5">
                      <Avatar className="size-8 rounded-full ring-1 ring-input">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>P</AvatarFallback>
                      </Avatar>
                      <div className="text-xs">
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ))}
        </div>

        {/* Tablet: 3 columns */}
        <div className="hidden gap-4 md:flex lg:hidden">
          {tabletColumns.map((column, colIdx) => (
            <div
              key={colIdx}
              className={cn(
                "flex w-1/3 flex-col gap-4",
                colIdx === 1 && "mt-10",
                colIdx === 2 && "mt-20",
              )}
            >
              {column.map((testimonial, idx) => (
                <Card key={idx}>
                  <CardContent className="px-6 leading-7 text-muted-foreground">
                    <q>{testimonial.content}</q>
                  </CardContent>
                  <CardFooter>
                    <div className="flex gap-4 leading-5">
                      <Avatar className="size-9 rounded-full ring-1 ring-input">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>P</AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ))}
        </div>

        {/* Desktop: 4 columns */}
        <div className="hidden gap-4 lg:flex">
          {desktopColumns.map((column, colIdx) => (
            <div
              key={colIdx}
              className={cn(
                "flex w-1/4 flex-col gap-4",
                colIdx === 1 && "mt-10",
                colIdx === 2 && "mt-20",
              )}
            >
              {column.map((testimonial, idx) => (
                <Card key={idx}>
                  <CardContent className="px-6 leading-7 text-muted-foreground">
                    <q>{testimonial.content}</q>
                  </CardContent>
                  <CardFooter>
                    <div className="flex gap-4 leading-5">
                      <Avatar className="size-9 rounded-full ring-1 ring-input">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>P</AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Testimonial1 };
