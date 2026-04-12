import type { Metadata } from 'next';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import CtaBanner from '@/components/sections/cta-banner';

type BlogPost = {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
};

const POSTS: BlogPost[] = [
  {
    slug: 'signs-you-need-psychiatric-evaluation',
    title: 'Signs You May Benefit from a Psychiatric Evaluation',
    date: 'April 2025',
    readTime: '5 min read',
    category: 'Mental Health',
    content: `
Many people live with untreated mental health conditions for years — not because they don't want help, but because they're unsure whether what they're experiencing is "serious enough" to see a professional. The truth is: if your mental health is affecting your quality of life, a psychiatric evaluation is worth pursuing.

## What Is a Psychiatric Evaluation?

A psychiatric evaluation is a comprehensive clinical assessment conducted by a licensed psychiatric professional — in our case, Ahmed Morsi, PMHNP-BC. It is designed to identify mental health conditions accurately and build a personalized treatment plan. It typically takes 60–90 minutes and covers your symptoms, history, and goals.

## Signs You May Benefit from an Evaluation

**Persistent mood changes.** Feeling sad, empty, or hopeless for more than two weeks, or experiencing dramatic mood swings that are difficult to explain or control.

**Anxiety that interferes with daily life.** Excessive worry, avoidance of activities, physical symptoms like racing heart or shortness of breath — especially when these are affecting work, relationships, or routines.

**Difficulty concentrating or completing tasks.** Chronic difficulty with focus, organization, or following through — particularly if it's been this way since childhood.

**Sleep disturbances.** Ongoing insomnia, sleeping too much, or non-restorative sleep can be both a symptom and a cause of mental health conditions.

**Feeling disconnected from yourself or others.** A persistent sense of numbness, unreality, or disconnection from the people and activities you used to enjoy.

**Thoughts of self-harm or hopelessness.** Any thoughts of harming yourself or ending your life are a clear signal to seek help immediately.

**Prior diagnosis without follow-up.** If you've been previously diagnosed with a mental health condition but haven't received care recently, an updated evaluation can determine whether your current treatment (or lack thereof) is appropriate.

## Taking the First Step

Reaching out for help is often the hardest part. At High Point Psychiatry, we make the first appointment as straightforward and welcoming as possible. You don't need a referral. You can reach us by phone or through our contact form.

If you're in Genesee County, Flint, Grand Blanc, or anywhere in Michigan, we are here to help.
    `,
  },
  {
    slug: 'adhd-in-adults-michigan',
    title: 'Adult ADHD in Michigan: What You Should Know',
    date: 'April 2025',
    readTime: '6 min read',
    category: 'ADHD',
    content: `
Adult ADHD is one of the most underdiagnosed and misunderstood conditions in psychiatric care. Millions of adults across Michigan are living with ADHD without knowing it — many of whom were never evaluated as children, or were told their struggles were simply personality traits.

## ADHD Doesn't Look the Same in Adults

The hyperactive child bouncing off the walls is the stereotype most people picture when they hear "ADHD." But in adults — especially women, who have historically been underdiagnosed — ADHD often presents very differently:

- **Chronic disorganization** — desks, homes, and digital files in constant chaos
- **Time blindness** — perpetually late, consistently underestimating how long tasks take
- **Emotional dysregulation** — quick to frustration, sensitive to criticism, difficulty managing intense emotions
- **Impulsivity** — making decisions quickly without fully thinking them through
- **Hyperfocus** — the ability to intensely concentrate on interesting topics, which can mask the broader pattern of attention difficulties

## Why So Many Adults Go Undiagnosed

Several factors contribute to late or missed ADHD diagnosis in adults:

1. Symptoms are often misattributed to anxiety, depression, or personality
2. High-achieving individuals may have compensated for years through sheer effort
3. Women are more likely to internalize symptoms, presenting as anxiety rather than hyperactivity
4. Many providers are not trained to identify adult ADHD presentations

## Getting Evaluated in Michigan

If you're in Genesee County or elsewhere in Michigan and suspect you may have ADHD, the first step is a comprehensive psychiatric evaluation. At High Point Psychiatry, Ahmed Morsi, PMHNP-BC conducts thorough adult ADHD evaluations, including a careful review of your history, validated screening tools, and — critically — ruling out other conditions that can mimic ADHD symptoms.

Treatment, when appropriate, can include stimulant or non-stimulant medications, behavioral strategies, and collaborative support. For many adults, getting the right diagnosis and treatment is life-changing.
    `,
  },
  {
    slug: 'telehealth-psychiatry-michigan',
    title: 'How Telehealth Psychiatry Works in Michigan',
    date: 'March 2025',
    readTime: '4 min read',
    category: 'Telehealth',
    content: `
Telehealth has transformed access to psychiatric care across Michigan. Whether you live in a rural community with limited local options, have a demanding work schedule, or simply prefer the convenience and privacy of home-based appointments, telehealth psychiatry is now a clinically sound and widely accepted form of care.

## Is Telehealth as Effective as In-Person Psychiatry?

For the majority of psychiatric services — including initial evaluations, medication management, and follow-up appointments — research consistently shows that telehealth is clinically equivalent to in-person care. The key is having a secure, reliable video connection and a private space for your appointment.

## How a Telehealth Appointment Works at High Point Psychiatry

1. **Schedule your appointment** — Call us at (810) 732-8336 or use our contact form. We will confirm your appointment and send you connection details.
2. **Receive your link** — Before your appointment, you will receive a link to a secure, HIPAA-compliant video platform.
3. **Join from any device** — All you need is a smartphone, tablet, or computer with a camera and microphone. No special software is required.
4. **Your appointment** — Your visit with Ahmed Morsi, PMHNP-BC will feel like a regular appointment. You can discuss symptoms, review medications, and ask any questions.
5. **Prescription delivery** — Prescriptions can be sent electronically to your preferred pharmacy.

## Who Qualifies for Telehealth in Michigan?

High Point Psychiatry is licensed to provide telehealth services to patients throughout Michigan. Whether you're in Flint, Detroit, Grand Rapids, Traverse City, or the Upper Peninsula — if you're in Michigan, you can receive care.

## Getting Started

Telehealth is available for new patients as well as established patients. Contact us to schedule your first appointment.
    `,
  },
  {
    slug: 'anxiety-treatment-flint-mi',
    title: 'Anxiety Treatment in Flint, MI: Your Options',
    date: 'March 2025',
    readTime: '5 min read',
    category: 'Anxiety',
    content: `
Anxiety disorders are the most common mental health conditions in the United States, affecting more than 40 million adults. In Genesee County and across Flint, Michigan, access to quality anxiety treatment has historically been limited — but that is changing.

## Types of Anxiety Disorders

"Anxiety" is an umbrella term that covers several distinct conditions:

- **Generalized Anxiety Disorder (GAD)** — chronic, excessive worry about everyday concerns
- **Panic Disorder** — recurrent panic attacks and fear of future attacks
- **Social Anxiety Disorder** — intense fear of social situations or embarrassment
- **Specific Phobias** — intense, irrational fear of specific objects or situations
- **Agoraphobia** — fear of situations where escape might be difficult

Each of these requires a different clinical approach, which is why accurate diagnosis is the essential first step.

## Treatment Options in Flint, MI

**Medication management.** Several classes of medications are highly effective for anxiety disorders, including SSRIs, SNRIs, and in some cases, non-habit-forming options. Ahmed Morsi, PMHNP-BC provides careful psychiatric evaluation and medication management for anxiety at High Point Psychiatry.

**Supportive psychotherapy.** Integrated brief therapy, including CBT-based techniques, is available alongside psychiatric medication management.

**Telehealth.** For Flint and Genesee County residents who prefer to receive care at home — or who have difficulty accessing in-person appointments — telehealth psychiatric care is available.

## Getting Help in Genesee County

High Point Psychiatry serves Flint, Grand Blanc, Burton, Flushing, Davison, and the broader Genesee County area. Call us at (810) 732-8336 or use our contact form to schedule your first appointment.

You don't have to manage anxiety alone. Effective treatment exists, and it can make a profound difference.
    `,
  },
  {
    slug: 'medication-management-what-to-expect',
    title: 'What to Expect at Your First Psychiatric Appointment',
    date: 'February 2025',
    readTime: '4 min read',
    category: 'Getting Started',
    content: `
If you have never seen a psychiatric provider before, the first appointment can feel uncertain. What will they ask? Will I be judged? What if I don't know how to describe what I'm feeling? These concerns are normal — and this guide is designed to help you walk in feeling prepared.

## Before Your Appointment

**Gather your history.** If you have any prior psychiatric diagnoses, it helps to know what they were and what treatments you've tried. Similarly, bring a list of any current medications, including supplements.

**Think about your main concerns.** You don't need a perfectly organized explanation. Just being able to say "I've been struggling with [this] and it's affecting [that]" is enough to get started.

**Be honest.** Your provider's job is to help you, not judge you. The more openly you can share, the more accurately Ahmed can assess your situation.

## During the Appointment

Your first appointment at High Point Psychiatry is an initial psychiatric evaluation, which typically lasts 60–90 minutes. Ahmed will ask questions about:

- What's bringing you in today
- Your history of mental health symptoms and treatment
- Your medical history and current medications
- Your family history
- Your life situation — work, relationships, lifestyle

You'll also have plenty of time to ask questions.

## After the Appointment

At the end of your evaluation, Ahmed will share his clinical impressions, discuss potential diagnoses, and collaboratively outline next steps — which may include a medication recommendation, follow-up appointment, or referral to a therapist.

You will never be handed a prescription and rushed out the door. Every decision is made with your active participation.
    `,
  },
  {
    slug: 'depression-treatment-genesee-county',
    title: 'Depression Treatment in Genesee County, Michigan',
    date: 'February 2025',
    readTime: '5 min read',
    category: 'Depression',
    content: `
Depression is one of the leading causes of disability worldwide — and in Genesee County, Michigan, its impact is deeply felt. The combination of economic challenges, community trauma, and limited access to mental health services has meant that too many residents go without the care they need. High Point Psychiatry is here to help change that.

## Understanding Depression

Depression is more than feeling sad. Major Depressive Disorder is a clinical condition characterized by persistent low mood, loss of interest in activities, changes in sleep and appetite, difficulty concentrating, fatigue, and in severe cases, thoughts of hopelessness or self-harm.

It is not a character flaw. It is not something you can simply "snap out of." And it is highly treatable.

## Depression Treatment at High Point Psychiatry

**Comprehensive evaluation.** Before recommending any treatment, Ahmed Morsi, PMHNP-BC conducts a thorough psychiatric evaluation to understand the nature and severity of your depression, rule out other contributing factors, and ensure the right diagnosis.

**Medication management.** Antidepressant medications — including SSRIs, SNRIs, and other options — are highly effective for many people. Medication selection is individualized based on your history, symptoms, and preferences.

**Supportive care.** Medication alone isn't always enough. Ahmed incorporates supportive psychotherapy techniques and, where appropriate, coordinates care with therapists and other providers.

**Follow-up and monitoring.** Depression treatment requires ongoing monitoring and adjustment. High Point Psychiatry provides consistent, attentive follow-up to ensure your treatment is working.

## Serving Genesee County

High Point Psychiatry provides depression treatment for patients in Flint, Grand Blanc, Burton, Flushing, Davison, Swartz Creek, and the broader Genesee County area. Telehealth is available for patients across Michigan.

If you or someone you love is struggling with depression, please reach out. Help is available, and recovery is possible.
    `,
  },
];

function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.content.slice(0, 160).replace(/[#*\n]/g, ' ').trim(),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  // Simple markdown-to-HTML conversion for headings and paragraphs
  const paragraphs = post.content.trim().split('\n\n');

  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient relative overflow-hidden pt-36 pb-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, #76A1C2 0%, transparent 60%)' }}
        />
        <div className="container relative z-10 max-w-3xl">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            All Articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-white/50">
              <Calendar className="size-3" />
              {post.date}
            </span>
            <span className="flex items-center gap-1 text-xs text-white/50">
              <Clock className="size-3" />
              {post.readTime}
            </span>
          </div>
          <h1 className="font-display text-3xl font-medium leading-tight text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
        </div>
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Article body */}
      <section className="section-padding bg-surface">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <article className="prose prose-lg max-w-none">
              {paragraphs.map((block, i) => {
                const trimmed = block.trim();
                if (trimmed.startsWith('## ')) {
                  return (
                    <h2
                      key={i}
                      className="font-display mt-10 mb-4 text-2xl font-medium text-primary"
                    >
                      {trimmed.replace('## ', '')}
                    </h2>
                  );
                }
                if (trimmed.startsWith('**') && trimmed.includes('**')) {
                  const parts = trimmed.split(/\*\*(.*?)\*\*/g);
                  return (
                    <p key={i} className="mb-4 text-base leading-relaxed text-muted-foreground">
                      {parts.map((part, j) =>
                        j % 2 === 1 ? (
                          <strong key={j} className="font-semibold text-primary">{part}</strong>
                        ) : (
                          part
                        )
                      )}
                    </p>
                  );
                }
                if (trimmed.startsWith('- ')) {
                  const items = trimmed.split('\n').filter((l) => l.startsWith('- '));
                  return (
                    <ul key={i} className="mb-4 space-y-2 pl-4">
                      {items.map((item, j) => (
                        <li key={j} className="text-base text-muted-foreground list-disc">
                          {item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '$1')}
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (trimmed.startsWith('1. ')) {
                  const items = trimmed.split('\n').filter((l) => /^\d+\. /.test(l));
                  return (
                    <ol key={i} className="mb-4 space-y-2 pl-4">
                      {items.map((item, j) => (
                        <li key={j} className="text-base text-muted-foreground list-decimal">
                          {item.replace(/^\d+\. /, '')}
                        </li>
                      ))}
                    </ol>
                  );
                }
                if (!trimmed) return null;
                return (
                  <p key={i} className="mb-4 text-base leading-relaxed text-muted-foreground">
                    {trimmed}
                  </p>
                );
              })}
            </article>

            {/* Author card */}
            <div className="mt-12 rounded-2xl bg-surface-lowest p-8 shadow-card border border-[rgba(26,43,76,0.06)]">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-secondary">Written by</p>
              <p className="font-display text-xl font-medium text-primary">Ahmed Morsi, PMHNP-BC</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Board-Certified Psychiatric Mental Health Nurse Practitioner at High Point Psychiatry,
                serving Genesee County and Michigan statewide.
              </p>
              <Link
                href="/about"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-secondary underline underline-offset-4 hover:text-primary transition-colors"
              >
                Learn more about Ahmed
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
