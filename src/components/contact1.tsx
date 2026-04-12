"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Clock, LoaderIcon, MapPin, Phone, Video } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const contactFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  appointmentType: z.string().optional(),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface Contact1Props {
  className?: string;
  onSubmit?: (data: ContactFormData) => Promise<void>;
}

const Contact1 = ({ className, onSubmit }: Contact1Props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      appointmentType: "",
      message: "",
    },
  });

  const handleFormSubmit = async (data: ContactFormData) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setIsSubmitted(true);
      setShowSuccess(true);
      form.reset();
      setTimeout(() => setShowSuccess(false), 4500);
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch {
      form.setError("root", {
        message: "Something went wrong. Please try again or call us directly.",
      });
    }
  };

  return (
    <section className={cn("relative py-32", className)}>
      <div className="pointer-events-none absolute inset-x-0 -top-20 -bottom-20 bg-[radial-gradient(ellipse_35%_15%_at_40%_55%,hsl(var(--accent))_0%,transparent_100%)] lg:bg-[radial-gradient(ellipse_12%_20%_at_60%_45%,hsl(var(--accent))_0%,transparent_100%)]"></div>
      <div className="pointer-events-none absolute inset-x-0 -top-20 -bottom-20 bg-[radial-gradient(ellipse_35%_20%_at_70%_75%,hsl(var(--accent))_0%,transparent_80%)] lg:bg-[radial-gradient(ellipse_15%_30%_at_70%_65%,hsl(var(--accent))_0%,transparent_80%)]"></div>
      <div className="pointer-events-none absolute inset-x-0 -top-20 -bottom-20 bg-[radial-gradient(hsl(var(--accent-foreground)/0.1)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_60%_at_65%_50%,#000_0%,transparent_80%)] [background-size:8px_8px]"></div>

      <div className="container grid w-full grid-cols-1 gap-x-32 overflow-hidden lg:grid-cols-2">
        {/* Left: info */}
        <div className="w-full pb-10 md:space-y-10 md:pb-0">
          <div className="space-y-4 md:max-w-[40rem]">
            <h1 className="text-4xl font-medium lg:text-5xl">
              Book an Appointment
            </h1>
            <p className="text-muted-foreground md:text-base lg:text-lg lg:leading-7">
              We are accepting new patients. Fill out the form and we will reach
              out within one business day — or call us directly at{" "}
              <a href="tel:8107328336" className="font-semibold text-primary underline underline-offset-4">
                (810) 732-8336
              </a>
              .
            </p>
          </div>

          <div className="hidden md:block">
            <div className="space-y-8 pb-20 pt-10 lg:pb-0">
              <div className="flex overflow-hidden">
                <Avatar className="size-11 border border-border">
                  <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp" />
                  <AvatarFallback>P</AvatarFallback>
                </Avatar>
                <Avatar className="-ml-4 size-11 border border-border">
                  <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp" />
                  <AvatarFallback>P</AvatarFallback>
                </Avatar>
                <Avatar className="-ml-4 size-11 border border-border">
                  <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp" />
                  <AvatarFallback>P</AvatarFallback>
                </Avatar>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-semibold">What to expect:</p>
                <div className="flex items-start space-x-2.5">
                  <Check className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                  <p className="text-sm">We respond within one business day</p>
                </div>
                <div className="flex items-start space-x-2.5">
                  <Check className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                  <p className="text-sm">No referral needed to get started</p>
                </div>
                <div className="flex items-start space-x-2.5">
                  <Check className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                  <p className="text-sm">In-person and telehealth appointments available</p>
                </div>
                <div className="flex items-start space-x-2.5">
                  <Check className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                  <p className="text-sm">Most major insurance plans accepted</p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <MapPin className="size-4 shrink-0" />
                  <span>4800 S Saginaw St, Flint, MI 48507</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="size-4 shrink-0" />
                  <a href="tel:8107328336" className="font-medium text-primary hover:underline">
                    (810) 732-8336
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Video className="size-4 shrink-0" />
                  <span>Telehealth available statewide in Michigan</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="size-4 shrink-0" />
                  <span>Mon–Fri 9:00 AM – 5:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="flex w-full justify-center lg:mt-2.5">
          <div className="relative flex w-full max-w-[30rem] min-w-[20rem] flex-col items-center overflow-visible md:min-w-[24rem]">
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="z-10 w-full"
            >
              <div className="w-full rounded-xl border border-border bg-card px-6 py-8 shadow-sm">
                {isSubmitted && (
                  <div
                    className={cn(
                      "mb-6 rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-center transition-opacity duration-500",
                      showSuccess ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <p className="text-sm font-medium text-green-600">
                      Thank you! We&apos;ll be in touch within one business day.
                    </p>
                  </div>
                )}

                <FieldGroup className="gap-6">
                  <Controller
                    control={form.control}
                    name="fullName"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Full Name <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Jane Smith"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="phone"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Phone Number <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          type="tel"
                          aria-invalid={fieldState.invalid}
                          placeholder="(810) 555-0000"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Email <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          type="email"
                          aria-invalid={fieldState.invalid}
                          placeholder="jane@example.com"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="appointmentType"
                    render={({ field }) => (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          Appointment Type
                        </FieldLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger id={field.name} className="w-full">
                            <SelectValue placeholder="Select one..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="in-person">In-Person (Flint, MI)</SelectItem>
                            <SelectItem value="telehealth">Telehealth (Michigan)</SelectItem>
                            <SelectItem value="unsure">Not Sure</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          Message (Optional)
                        </FieldLabel>
                        <textarea
                          {...field}
                          id={field.name}
                          rows={3}
                          className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                          placeholder="Briefly describe what brings you in, or any questions you have..."
                        />
                      </Field>
                    )}
                  />

                  {form.formState.errors.root && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.root.message}
                    </p>
                  )}

                  <div className="flex w-full flex-col justify-end space-y-3 pt-2">
                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                      className="w-full"
                    >
                      {form.formState.isSubmitting ? (
                        <>
                          <LoaderIcon className="mr-2 size-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Submit Request"
                      )}
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                      For urgent matters, call{" "}
                      <a href="tel:8107328336" className="font-medium underline">
                        (810) 732-8336
                      </a>{" "}
                      directly.
                    </p>
                  </div>
                </FieldGroup>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Contact1 };
