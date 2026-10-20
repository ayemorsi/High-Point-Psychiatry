// The copy for each service's own page. General patient education in plain language: no medication names, doses or promised outcomes.

export type ServicePage = {
  /** The search title, before " · High Point Psychiatry". */
  title: string
  description: string
  headline: string
  intro: string
  signsTitle: string
  signs: string[]
  help: { title: string; body: string }[]
  faqs: { question: string; answer: string }[]
  related: string[]
}

export const servicePages: Record<string, ServicePage> = {
  "psychiatric-evaluation": {
    title: "Psychiatric Evaluation in Flint, MI",
    description:
      "Comprehensive psychiatric evaluations in Flint, MI. An unhurried first visit to understand your symptoms and history and agree on a clear plan. In person or telehealth.",
    headline: "Psychiatric evaluations in Flint, Michigan",
    intro:
      "Every new patient starts with an evaluation: a longer first visit to understand what you're experiencing, your history and what you'd like to change. You leave with a clear picture and a plan.",
    signsTitle: "An evaluation can help when",
    signs: [
      "Something has felt off for weeks and isn't getting better",
      "Mood, worry, focus or sleep is affecting work, school or relationships",
      "You're not sure what's going on or who to see",
      "A past diagnosis or treatment no longer seems to fit",
      "Your primary care provider suggested a psychiatric opinion",
    ],
    help: [
      {
        title: "A full conversation",
        body: "We talk through your symptoms, medical and family history, past treatment, and daily life, at a pace that feels comfortable.",
      },
      {
        title: "A clear diagnosis",
        body: "We explain what we think is going on in plain language, and what that means for you.",
      },
      {
        title: "A shared plan",
        body: "We go over the options, including medication, therapy or both, and decide on next steps together.",
      },
    ],
    faqs: [
      {
        question: "How long is a psychiatric evaluation?",
        answer:
          "The first visit is longer than follow-ups so there is time to understand your full history. We'll confirm the length when you schedule.",
      },
      {
        question: "Do I need a referral?",
        answer:
          "Some insurance plans require one and some don't. Tell us your plan when you reach out and we'll let you know.",
      },
      {
        question: "Will I be prescribed medication at the first visit?",
        answer:
          "Not necessarily. Medication is one option. We'll explain what we recommend and why, and the decision is always yours.",
      },
    ],
    related: ["medication-management", "telepsychiatry", "second-opinion"],
  },

  "medication-management": {
    title: "Medication Management in Flint, MI",
    description:
      "Psychiatric medication management in Flint, MI. Careful prescribing, regular check-ins and adjustments for anxiety, depression, ADHD, bipolar disorder and more.",
    headline: "Medication management in Flint, Michigan",
    intro:
      "When medication is part of your plan, we start carefully, explain every option, and check in regularly to see how it's working and how you feel.",
    signsTitle: "Medication management may help if",
    signs: [
      "You're starting psychiatric medication for the first time",
      "Your current medication isn't working as well as it used to",
      "Side effects are getting in the way",
      "You'd like a psychiatric provider to take over your prescriptions",
      "You want to review whether you still need a medication",
    ],
    help: [
      {
        title: "Clear explanations",
        body: "What a medication is for, what to expect, possible side effects, and the alternatives.",
      },
      {
        title: "Careful starts and changes",
        body: "We begin thoughtfully and adjust based on how you respond, never more than you need.",
      },
      {
        title: "Regular follow-up",
        body: "Check-ins to track progress and side effects, in person or by telehealth.",
      },
    ],
    faqs: [
      {
        question: "How often are medication follow-up visits?",
        answer:
          "Usually closer together while starting or changing a medication, then further apart once things are stable.",
      },
      {
        question: "Can you take over medication another provider prescribed?",
        answer:
          "Often, yes. We'll start with an evaluation to understand your history before making any changes.",
      },
      {
        question: "Do I have to take medication to be a patient?",
        answer:
          "No. Medication is one option among several, and the decision is always yours.",
      },
    ],
    related: ["psychiatric-evaluation", "depression", "anxiety"],
  },

  telepsychiatry: {
    title: "Telepsychiatry in Flint & Across Michigan",
    description:
      "Telepsychiatry visits from High Point Psychiatry in Flint, MI. Secure video appointments for evaluations, medication management and follow-ups across Michigan.",
    headline: "Telepsychiatry for Flint and Michigan",
    intro:
      "When a video visit is right for you, you can see us from home through a secure connection, for evaluations, medication management and follow-up care.",
    signsTitle: "Telehealth can be a good fit when",
    signs: [
      "Getting to the office is hard because of work, childcare or transportation",
      "You live outside Flint but within Michigan",
      "You feel more comfortable talking from home",
      "You need a quick follow-up between in-person visits",
    ],
    help: [
      {
        title: "Secure video visits",
        body: "A private connection on your phone, tablet or computer, with no special equipment.",
      },
      {
        title: "The same care",
        body: "Evaluations, medication management and follow-ups, just like an office visit.",
      },
      {
        title: "Flexible mix",
        body: "Combine telehealth with in-person visits at our Flint office when that works best.",
      },
    ],
    faqs: [
      {
        question: "What do I need for a telehealth visit?",
        answer:
          "A phone, tablet or computer with a camera, a reliable internet connection and a quiet, private space.",
      },
      {
        question: "Is telepsychiatry covered by insurance?",
        answer:
          "Many plans cover telehealth visits. Tell us your plan and we'll confirm before your appointment.",
      },
      {
        question: "Can every visit be done by video?",
        answer:
          "Many can, but some situations are best handled in person. We'll talk about what's right for you.",
      },
    ],
    related: ["psychiatric-evaluation", "medication-management", "anxiety"],
  },

  anxiety: {
    title: "Anxiety Treatment in Flint, MI",
    description:
      "Anxiety and panic treatment in Flint, MI. Psychiatric evaluation and care for constant worry, panic attacks and social anxiety. In person or telehealth.",
    headline: "Anxiety and panic care in Flint, Michigan",
    intro:
      "Anxiety is one of the most common reasons people reach out, and one of the most treatable. We help you understand what's driving it and find a plan that eases it.",
    signsTitle: "Anxiety can look like",
    signs: [
      "Constant worry that's hard to switch off",
      "Panic attacks with a racing heart, shortness of breath or dizziness",
      "Avoiding places, people or situations",
      "Trouble sleeping, restlessness or muscle tension",
      "Feeling on edge or easily overwhelmed",
    ],
    help: [
      {
        title: "Understanding your anxiety",
        body: "An evaluation to sort out what kind of anxiety you're facing and what makes it worse.",
      },
      {
        title: "Treatment options",
        body: "Medication when it helps, guidance on proven therapies, and practical steps for daily life.",
      },
      {
        title: "Ongoing support",
        body: "Follow-up visits to adjust the plan as you feel better.",
      },
    ],
    faqs: [
      {
        question: "When should I see a psychiatrist for anxiety?",
        answer:
          "When worry or panic is affecting your work, relationships, sleep or daily life, or isn't improving on its own.",
      },
      {
        question: "Can anxiety be treated without medication?",
        answer:
          "Yes, often. Therapy and lifestyle changes help many people. We'll explain all the options.",
      },
      {
        question: "What if I'm having a panic attack right now?",
        answer:
          "If you feel unsafe or think it may be a medical emergency, call 911. For crisis support, call or text 988.",
      },
    ],
    related: ["ocd", "sleep", "stress"],
  },

  depression: {
    title: "Depression Treatment in Flint, MI",
    description:
      "Depression treatment in Flint, MI. Psychiatric evaluation, medication management and ongoing care for low mood, including depression that hasn't improved with past treatment.",
    headline: "Depression care in Flint, Michigan",
    intro:
      "Depression is more than a bad week. It's a real, treatable condition, and you don't have to push through it alone. We'll work with you to find what helps.",
    signsTitle: "Depression can look like",
    signs: [
      "Low or empty mood most days",
      "Losing interest in things you used to enjoy",
      "Low energy, poor sleep or sleeping too much",
      "Changes in appetite or weight",
      "Trouble concentrating, or feelings of guilt or hopelessness",
    ],
    help: [
      {
        title: "A careful evaluation",
        body: "Understanding your symptoms, history and anything else that might be contributing.",
      },
      {
        title: "Treatment that fits",
        body: "Medication, therapy or both, explained clearly and chosen with you.",
      },
      {
        title: "When past treatment hasn't worked",
        body: "A fresh look at what's been tried and what options remain.",
      },
    ],
    faqs: [
      {
        question: "How do I know if it's depression or just stress?",
        answer:
          "If low mood or loss of interest lasts more than a couple of weeks and affects daily life, it's worth an evaluation.",
      },
      {
        question: "What if treatment hasn't helped before?",
        answer:
          "Many people need more than one try to find what works. We'll review your history and look at other options.",
      },
      {
        question: "What if I'm having thoughts of suicide?",
        answer:
          "Please reach out now: call or text 988 (Suicide & Crisis Lifeline), call 911 or go to the nearest emergency room.",
      },
    ],
    related: ["medication-management", "stress", "bipolar"],
  },

  adhd: {
    title: "ADHD Evaluation & Treatment in Flint, MI",
    description:
      "Adult ADHD evaluation and treatment in Flint, MI. Assessment for attention, focus and impulsivity, and a treatment plan that fits your work and home life.",
    headline: "ADHD care in Flint, Michigan",
    intro:
      "ADHD doesn't always look like the stereotype, and many adults are diagnosed later in life. We assess carefully and build a plan around how your days actually go.",
    signsTitle: "ADHD can look like",
    signs: [
      "Trouble focusing, finishing tasks or staying organized",
      "Losing things, missing deadlines or forgetting appointments",
      "Restlessness or difficulty sitting still",
      "Acting or speaking before thinking",
      "Feeling overwhelmed by everyday demands",
    ],
    help: [
      {
        title: "A thorough assessment",
        body: "Your current symptoms, childhood history and anything else that can look like ADHD, such as anxiety or sleep problems.",
      },
      {
        title: "Treatment options",
        body: "Medication and non-medication approaches, explained clearly so you can choose.",
      },
      {
        title: "Follow-up that fits your life",
        body: "Regular check-ins to fine-tune the plan for work, school and home.",
      },
    ],
    faqs: [
      {
        question: "Can adults be diagnosed with ADHD?",
        answer:
          "Yes. Many people aren't diagnosed until adulthood. An evaluation looks at both current symptoms and your history.",
      },
      {
        question: "Do you offer telehealth for ADHD care?",
        answer:
          "Many ADHD visits can be done by telehealth. We'll talk about what's appropriate for your evaluation and follow-ups.",
      },
      {
        question: "Is medication the only treatment for ADHD?",
        answer:
          "No. Medication helps many people, and there are also practical strategies and therapy approaches. We'll go over the options together.",
      },
    ],
    related: ["psychiatric-evaluation", "anxiety", "medication-management"],
  },

  bipolar: {
    title: "Bipolar Disorder Treatment in Flint, MI",
    description:
      "Bipolar disorder and mood disorder treatment in Flint, MI. Diagnosis and long-term psychiatric care focused on steady, sustainable stability.",
    headline: "Bipolar and mood disorder care in Flint, Michigan",
    intro:
      "Mood disorders like bipolar disorder are lifelong but very manageable with the right care. We focus on an accurate diagnosis and steady, long-term stability.",
    signsTitle: "Mood disorders can look like",
    signs: [
      "Periods of unusually high energy, little need for sleep or racing thoughts",
      "Periods of deep low mood",
      "Big shifts in mood that affect relationships or work",
      "Impulsive decisions you later regret",
      "Mood changes that don't respond to typical depression treatment",
    ],
    help: [
      {
        title: "An accurate diagnosis",
        body: "Mood disorders can be mistaken for depression alone. We take a careful history to get it right.",
      },
      {
        title: "Long-term treatment",
        body: "A plan aimed at stability, adjusted carefully over time.",
      },
      {
        title: "Planning ahead",
        body: "Recognizing early warning signs and knowing what to do when they appear.",
      },
    ],
    faqs: [
      {
        question: "How is bipolar disorder different from depression?",
        answer:
          "Bipolar disorder includes periods of elevated mood or energy as well as lows. Getting the diagnosis right matters because treatment differs.",
      },
      {
        question: "Is bipolar disorder treatable?",
        answer:
          "Yes. With ongoing care, many people with bipolar disorder lead stable, full lives.",
      },
      {
        question: "How often will I need appointments?",
        answer:
          "More often at first and during changes, then on a regular schedule once things are stable.",
      },
    ],
    related: ["depression", "medication-management", "psychiatric-evaluation"],
  },

  trauma: {
    title: "PTSD & Trauma Treatment in Flint, MI",
    description:
      "Trauma-informed PTSD treatment in Flint, MI. Psychiatric care for flashbacks, nightmares, hypervigilance and the lasting effects of difficult experiences.",
    headline: "PTSD and trauma care in Flint, Michigan",
    intro:
      "Difficult experiences can leave lasting effects. Our care is trauma-informed: you set the pace, and we focus on helping you feel safer and more like yourself.",
    signsTitle: "Trauma can look like",
    signs: [
      "Flashbacks or unwanted memories",
      "Nightmares or trouble sleeping",
      "Feeling constantly on guard or easily startled",
      "Avoiding reminders of what happened",
      "Feeling numb, detached or irritable",
    ],
    help: [
      {
        title: "Care at your pace",
        body: "You decide what to share and when. We won't push you to relive details before you're ready.",
      },
      {
        title: "Treatment options",
        body: "Medication to ease symptoms like sleep problems and anxiety, and guidance on trauma-focused therapy.",
      },
      {
        title: "Steady support",
        body: "Regular follow-up as things improve, including coordination with your therapist if you have one.",
      },
    ],
    faqs: [
      {
        question: "Do I have to talk about what happened?",
        answer:
          "Not until you're ready. You can share as much or as little as feels right.",
      },
      {
        question: "Do you see veterans?",
        answer:
          "We accept VA Community Care (CCN) and Tricare. Contact us to confirm your coverage.",
      },
      {
        question: "Can PTSD get better?",
        answer:
          "Yes. With the right treatment, many people see real improvement in symptoms and daily life.",
      },
    ],
    related: ["anxiety", "sleep", "depression"],
  },

  ocd: {
    title: "OCD Treatment in Flint, MI",
    description:
      "OCD treatment in Flint, MI. Psychiatric care for intrusive thoughts and compulsions, with medication options and guidance on proven therapies.",
    headline: "OCD care in Flint, Michigan",
    intro:
      "OCD is more than being tidy. It's a cycle of unwanted thoughts and the urges that follow. With the right treatment, that cycle can loosen.",
    signsTitle: "OCD can look like",
    signs: [
      "Unwanted, distressing thoughts that keep coming back",
      "Repeating actions, checking or counting to ease anxiety",
      'Needing things to feel "just right"',
      "Spending a lot of time on rituals",
      "Avoiding situations that trigger the thoughts",
    ],
    help: [
      {
        title: "A clear diagnosis",
        body: "OCD can overlap with anxiety and other conditions, so we evaluate carefully.",
      },
      {
        title: "Medication options",
        body: "Medication can reduce the intensity of thoughts and urges for many people.",
      },
      {
        title: "Guidance on therapy",
        body: "Help connecting with proven therapy approaches for OCD.",
      },
    ],
    faqs: [
      {
        question: "Is OCD the same as being a perfectionist?",
        answer:
          "No. OCD involves distressing, intrusive thoughts and compulsions that take time and get in the way of life.",
      },
      {
        question: "What is the most effective treatment for OCD?",
        answer:
          "A combination of specialized therapy and, for many people, medication. We'll talk through what fits you.",
      },
      {
        question: "Can OCD be treated by telehealth?",
        answer:
          "Many follow-up visits can be done by video. We'll talk about what's appropriate for you.",
      },
    ],
    related: ["anxiety", "medication-management", "psychiatric-evaluation"],
  },

  sleep: {
    title: "Insomnia & Sleep Care in Flint, MI",
    description:
      "Insomnia and sleep problem care in Flint, MI. Help with trouble falling or staying asleep, and the sleep problems that come with mood and anxiety.",
    headline: "Insomnia and sleep care in Flint, Michigan",
    intro:
      "Sleep and mental health are closely linked. Poor sleep can worsen mood and anxiety, and the reverse is true too. We look at both together.",
    signsTitle: "Sleep problems can look like",
    signs: [
      "Trouble falling asleep or staying asleep",
      "Waking too early and not getting back to sleep",
      "Feeling unrested even after a full night",
      "A racing mind at bedtime",
      "Sleep problems alongside low mood or anxiety",
    ],
    help: [
      {
        title: "Finding the cause",
        body: "Looking at mood, anxiety, habits, medications and health conditions that affect sleep.",
      },
      {
        title: "Practical changes",
        body: "Sleep habits and routines that often make a real difference.",
      },
      {
        title: "Treatment when needed",
        body: "Medication options when appropriate, chosen carefully with you.",
      },
    ],
    faqs: [
      {
        question: "Why see a psychiatric provider for sleep?",
        answer:
          "Sleep problems are often tied to anxiety, depression or stress. Treating those together often improves sleep.",
      },
      {
        question: "Do you treat sleep apnea?",
        answer:
          "Sleep apnea and other breathing-related sleep conditions are treated by your primary care provider or a sleep medicine specialist. We can help with sleep problems related to mental health.",
      },
      {
        question: "Will I need sleep medication?",
        answer:
          "Not always. Many people improve with changes to habits and treating underlying anxiety or mood.",
      },
    ],
    related: ["anxiety", "depression", "stress"],
  },

  stress: {
    title: "Stress & Burnout Support in Flint, MI",
    description:
      "Support for stress, burnout, grief and major life changes in Flint, MI. Psychiatric care when stress starts affecting your mood, sleep or focus.",
    headline: "Stress and life change support in Flint, Michigan",
    intro:
      "Burnout, grief and big transitions can wear anyone down. When stress starts affecting your mood, sleep or focus, it's worth talking to someone.",
    signsTitle: "Stress can look like",
    signs: [
      "Feeling exhausted, irritable or numb",
      "Trouble sleeping or concentrating",
      "Struggling after a loss, move, breakup or job change",
      "Feeling like you can't keep up anymore",
      "Physical symptoms like headaches or stomach problems",
    ],
    help: [
      {
        title: "Room to talk",
        body: "Space to sort out what's weighing on you and how it's affecting your life.",
      },
      {
        title: "Checking for more",
        body: "Making sure depression, anxiety or sleep problems aren't building underneath.",
      },
      {
        title: "A plan that fits",
        body: "Practical steps, therapy referrals or medication when it would help.",
      },
    ],
    faqs: [
      {
        question: "Is stress a reason to see a psychiatric provider?",
        answer:
          "Yes, especially when it lasts or starts affecting your mood, sleep, work or relationships.",
      },
      {
        question: "What's the difference between burnout and depression?",
        answer:
          "They can overlap. An evaluation helps sort out what's going on so treatment fits.",
      },
      {
        question: "Can you help with grief?",
        answer:
          "Yes. Grief is normal, but when it's overwhelming or long-lasting, support can help.",
      },
    ],
    related: ["depression", "anxiety", "sleep"],
  },

  "second-opinion": {
    title: "Psychiatric Second Opinions in Flint, MI",
    description:
      "Psychiatric second opinions in Flint, MI. A fresh review of a diagnosis or treatment plan when something doesn't feel right or progress has stalled.",
    headline: "Psychiatric second opinions in Flint, Michigan",
    intro:
      "Sometimes a diagnosis doesn't feel right, or treatment has stalled. A second opinion gives you a fresh, independent look and clear options.",
    signsTitle: "A second opinion can help when",
    signs: [
      "You're unsure about a diagnosis you were given",
      "Several treatments haven't helped",
      "Side effects outweigh the benefits",
      "You'd like reassurance before a big treatment decision",
    ],
    help: [
      {
        title: "A full review",
        body: "Your history, past treatments and records, with fresh eyes.",
      },
      {
        title: "A clear opinion",
        body: "What we agree with, what we'd do differently, and why.",
      },
      {
        title: "Your choice of next steps",
        body: "Continue with your current provider, transfer your care, or something in between.",
      },
    ],
    faqs: [
      {
        question: "Do I need to switch providers for a second opinion?",
        answer:
          "No. You can share our recommendations with your current provider, or continue care with us. It's your choice.",
      },
      {
        question: "What should I bring?",
        answer:
          "Any past records, a list of medications you've tried and how they worked, and your questions.",
      },
      {
        question: "Is a second opinion covered by insurance?",
        answer:
          "Often, yes. Tell us your plan and we'll confirm before your visit.",
      },
    ],
    related: ["psychiatric-evaluation", "medication-management", "depression"],
  },
}
