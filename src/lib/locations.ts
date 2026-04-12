export type Location = {
  slug: string;
  city: string;
  state: string;
  zip: string;
  county: string;
  description: string;
  headline: string;
  intro: string;
};

export const LOCATIONS: Location[] = [
  {
    slug: 'flint',
    city: 'Flint',
    state: 'MI',
    zip: '48507',
    county: 'Genesee County',
    headline: 'Psychiatric Care in Flint, MI',
    description:
      'High Point Psychiatry provides psychiatric care in Flint, Michigan — including medication management, psychiatric evaluations, and telehealth services.',
    intro:
      'High Point Psychiatry is based in Flint, Michigan — the heart of Genesee County. Ahmed Morsi, PMHNP-BC grew up in this community and is deeply committed to expanding access to quality psychiatric care here. Our Flint office at 4800 S Saginaw St offers in-person appointments alongside telehealth for patients across the state.',
  },
  {
    slug: 'grand-blanc',
    city: 'Grand Blanc',
    state: 'MI',
    zip: '48439',
    county: 'Genesee County',
    headline: 'Psychiatric Care in Grand Blanc, MI',
    description:
      'High Point Psychiatry serves Grand Blanc, Michigan with psychiatric care — including medication management, ADHD evaluation, anxiety treatment, and telehealth.',
    intro:
      'Grand Blanc residents have convenient access to High Point Psychiatry\'s psychiatric services, located just minutes away in Flint. Ahmed Morsi, PMHNP-BC also offers telehealth appointments for Grand Blanc patients who prefer to receive care from home. We accept most major insurance plans and are accepting new patients.',
  },
  {
    slug: 'burton',
    city: 'Burton',
    state: 'MI',
    zip: '48509',
    county: 'Genesee County',
    headline: 'Psychiatric Care in Burton, MI',
    description:
      'Psychiatric services for Burton, Michigan residents — anxiety, depression, ADHD treatment, medication management, and telehealth with High Point Psychiatry.',
    intro:
      'Burton, Michigan residents can access quality psychiatric care through High Point Psychiatry, located nearby in Flint. Whether you are seeking an evaluation for anxiety, depression, ADHD, or another condition, Ahmed Morsi, PMHNP-BC is here to help. Telehealth is also available for Burton patients who prefer virtual appointments.',
  },
  {
    slug: 'flushing',
    city: 'Flushing',
    state: 'MI',
    zip: '48433',
    county: 'Genesee County',
    headline: 'Psychiatric Care in Flushing, MI',
    description:
      'Mental health and psychiatric services for Flushing, Michigan — medication management, psychiatric evaluation, telehealth, and more with High Point Psychiatry.',
    intro:
      'Flushing, Michigan residents can receive comprehensive psychiatric care through High Point Psychiatry. Our office in Flint serves the broader Genesee County region, and telehealth appointments are available for Flushing patients who prefer a virtual visit. We are currently accepting new patients.',
  },
  {
    slug: 'davison',
    city: 'Davison',
    state: 'MI',
    zip: '48423',
    county: 'Genesee County',
    headline: 'Psychiatric Care in Davison, MI',
    description:
      'High Point Psychiatry offers psychiatric care for Davison, Michigan residents — including anxiety, depression, ADHD, and medication management.',
    intro:
      'Davison, Michigan residents have access to expert psychiatric care through High Point Psychiatry. Our Flint office serves the Genesee County region, and we also offer secure telehealth appointments for Davison patients. Ahmed Morsi, PMHNP-BC is accepting new patients and most major insurance plans.',
  },
  {
    slug: 'swartz-creek',
    city: 'Swartz Creek',
    state: 'MI',
    zip: '48473',
    county: 'Genesee County',
    headline: 'Psychiatric Care in Swartz Creek, MI',
    description:
      'Psychiatric care for Swartz Creek, Michigan — medication management, anxiety, depression, and ADHD treatment with High Point Psychiatry.',
    intro:
      'High Point Psychiatry is proud to serve Swartz Creek and the greater Genesee County community. Our in-person office is conveniently located in Flint, and telehealth appointments are available for Swartz Creek residents throughout Michigan.',
  },
  {
    slug: 'mount-morris',
    city: 'Mount Morris',
    state: 'MI',
    zip: '48458',
    county: 'Genesee County',
    headline: 'Psychiatric Care in Mount Morris, MI',
    description:
      'Psychiatric services for Mount Morris, Michigan — medication management, psychiatric evaluations, and telehealth with Ahmed Morsi, PMHNP-BC.',
    intro:
      'Mount Morris residents can access quality psychiatric care through High Point Psychiatry. Located in nearby Flint, we serve the full Genesee County region and offer telehealth for patients who prefer virtual appointments. We are accepting new patients.',
  },
  {
    slug: 'clio',
    city: 'Clio',
    state: 'MI',
    zip: '48420',
    county: 'Genesee County',
    headline: 'Psychiatric Care in Clio, MI',
    description:
      'Psychiatric care in Clio, Michigan — anxiety, depression, ADHD, medication management, and telehealth with High Point Psychiatry.',
    intro:
      'Clio, Michigan residents have access to comprehensive psychiatric care through High Point Psychiatry in nearby Flint. Ahmed Morsi, PMHNP-BC offers both in-person and telehealth appointments for Clio-area patients, accepting most major insurance plans.',
  },
];

export function getLocation(slug: string): Location | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}
