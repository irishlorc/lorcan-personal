export type Route = 'home' | 'about' | 'experience' | 'contact';

export const ROUTES: { id: Route; label: string; path: string }[] = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'about', label: 'About', path: '/about' },
  { id: 'experience', label: 'Experience', path: '/experience' },
  { id: 'contact', label: 'Contact', path: '/contact' },
];

export const META: Record<Route, { title: string; description: string }> = {
  home: {
    title: "Lorcan O'Neill — Creative by background. Commercial by instinct.",
    description:
      "Lorcan O'Neill — Irish creative and commercial professional. 10+ years across design, brand, communication and, more recently, enterprise AI with Arkintel in Delft.",
  },
  about: {
    title: "About — Lorcan O'Neill",
    description:
      "Originally from Ireland, close to a decade in the Netherlands. A short profile of Lorcan O'Neill.",
  },
  experience: {
    title: "Experience — Lorcan O'Neill",
    description:
      'A varied background, a connected way of thinking: creative & brand, commercial & communication, technology & AI.',
  },
  contact: {
    title: "Contact — Lorcan O'Neill",
    description: 'Good conversations start somewhere. Get in touch with Lorcan O\'Neill.',
  },
};

export const ROMAN = ['i', 'ii', 'iii', 'iv', 'v', 'vi'];

/**
 * Grid placement per card:
 * [desktop column, desktop row, [tablet colSpan, rowSpan], [mobile colSpan, rowSpan]]
 * Desktop ≥1100px: 12 columns, explicit lines. Tablet 680–1099px: 6 columns. Mobile: 2 columns.
 */
type Place = [string, string, [number, number], [number, number]];
export const L = {
  h_intro: ['1 / 8', '1 / 3', [6, 1], [2, 1]],
  h_portrait: ['8 / 11', '1 / 3', [3, 2], [1, 2]],
  h_social: ['11 / 13', '1', [3, 1], [1, 1]],
  h_current: ['11 / 13', '2', [3, 1], [2, 1]],
  h_threads: ['1 / 6', '3 / 5', [6, 1], [2, 1]],
  h_featured: ['6 / 10', '3 / 5', [3, 2], [2, 2]],
  h_about: ['10 / 13', '3', [3, 1], [2, 1]],
  h_visual: ['10 / 13', '4', [3, 1], [1, 1]],
  h_contact: ['1 / 13', '5', [6, 1], [2, 1]],
  a_title: ['1 / 9', '1 / 3', [6, 1], [2, 1]],
  a_portrait: ['9 / 13', '1 / 4', [3, 2], [2, 2]],
  a_places: ['1 / 5', '3', [3, 1], [2, 1]],
  a_quote: ['5 / 9', '3', [3, 1], [2, 1]],
  a_story: ['1 / 9', '4 / 6', [6, 1], [2, 1]],
  a_now: ['9 / 13', '4', [3, 1], [2, 1]],
  a_teams: ['9 / 13', '5', [3, 1], [2, 1]],
  a_next: ['1 / 13', '6', [6, 1], [2, 1]],
  e_title: ['1 / 9', '1 / 3', [6, 1], [2, 1]],
  e_years: ['9 / 13', '1', [3, 1], [2, 1]],
  e_cv: ['9 / 13', '2', [3, 1], [2, 1]],
  e_areas: ['1 / 13', '3 / 5', [6, 1], [2, 1]],
  e_roles: ['1 / 13', '5 / 7', [6, 1], [2, 1]],
  e_bring: ['1 / 5', '7 / 9', [6, 1], [2, 1]],
  e_b1: ['5 / 9', '7', [3, 1], [2, 1]],
  e_b2: ['9 / 13', '7', [3, 1], [2, 1]],
  e_b3: ['5 / 9', '8', [3, 1], [2, 1]],
  e_b4: ['9 / 13', '8', [3, 1], [2, 1]],
  e_b5: ['1 / 7', '9', [3, 1], [2, 1]],
  e_b6: ['7 / 13', '9', [3, 1], [2, 1]],
  e_next: ['1 / 13', '10', [6, 1], [2, 1]],
  c_main: ['1 / 13', '1 / 3', [6, 1], [2, 1]],
  c_link: ['1 / 5', '3', [3, 1], [1, 1]],
  c_time: ['5 / 9', '3', [3, 1], [1, 1]],
  c_home: ['9 / 13', '3', [6, 1], [2, 1]],
} satisfies Record<string, Place>;

export type CellKey = keyof typeof L;

export const THREADS: { title: string; text: string; tag?: string }[] = [
  {
    title: 'Creative & Brand',
    text: 'Visual communication, brand development, design thinking, content and digital experiences. Where I started, and still how I see things.',
  },
  {
    title: 'Commercial & Communication',
    text: 'Understanding what a business actually needs, presenting ideas, building relationships and turning complex offerings into clear conversations.',
  },
  {
    title: 'Technology & AI',
    text: 'Commercial work with Arkintel, a Delft-based AI company. Enterprise AI, organisational needs and how technology meets everyday work.',
    tag: 'NOW',
  },
];

export const STORY: { title: string; text: string }[] = [
  {
    title: 'A creative foundation',
    text: 'I started on the creative side and it never really left. I notice when something is slightly off: the spacing, the message, the order things happen in. That instinct still shapes how I approach almost everything.',
  },
  {
    title: 'Brands, teams and businesses',
    text: "Working with brands taught me that good creative work never exists on its own. It has to fit a team, a timeline and a business that needs it to do something. I've come to enjoy that part as much as the craft.",
  },
  {
    title: 'The bigger picture',
    text: 'Over time, the questions around the work became more interesting: what a business is really trying to say, and to whom. Communication, technology and commercial strategy sit closer together than most org charts suggest.',
  },
];

export const AREAS: {
  title: string;
  text: string;
  keys: string;
  tag?: string;
  media: string;
  photo: 'exp1' | 'exp2' | 'exp3';
}[] = [
  {
    title: 'Creative & Brand',
    text: 'Where I started. Years of visual communication, brand and digital work taught me how people read things, what they notice first and what they skip.',
    keys: 'Visual communication / Brand development / Design thinking / Content / Digital experiences',
    media: 'Creative work',
    photo: 'exp1',
  },
  {
    title: 'Commercial & Communication',
    text: 'Somewhere along the way the questions got bigger. What does the business need? Who has to be convinced? I learned to present ideas, build relationships and make complex offerings clear.',
    keys: 'Business objectives / Presenting ideas / Relationships / Clear conversations',
    media: 'In the room',
    photo: 'exp2',
  },
  {
    title: 'Technology & AI',
    text: "Working with Arkintel in Delft. I talk with organisations about how they work, where AI could genuinely help, and where it probably shouldn't.",
    keys: 'Arkintel / Enterprise AI / Organisational needs / Technology & everyday work',
    tag: 'NOW',
    media: 'Arkintel',
    photo: 'exp3',
  },
];

export const TRAITS: { cell: CellKey; title: string; text: string }[] = [
  {
    cell: 'e_b1',
    title: 'Creative judgement',
    text: "I can usually tell when something isn't quite right, and why. Useful in a review. Even more useful before one.",
  },
  {
    cell: 'e_b2',
    title: 'Clear communication',
    text: "I'd rather say it simply than say it impressively. If someone can repeat it to a colleague, it worked.",
  },
  {
    cell: 'e_b3',
    title: 'Curiosity',
    text: 'I ask a lot of questions. The second or third answer is usually where the real brief is hiding.',
  },
  {
    cell: 'e_b4',
    title: 'Initiative',
    text: "If something needs doing, I'll usually make a start on it. Small teams don't have much use for waiting rooms.",
  },
  {
    cell: 'e_b5',
    title: 'Commercial awareness',
    text: "Good ideas still have to make sense for the business. One eye on the work, the other on what it's actually for.",
  },
  {
    cell: 'e_b6',
    title: 'Range',
    text: 'A design conversation one day, a sales conversation the next. Comfortable moving between disciplines, and translating between the people in them.',
  },
];

/** Roles, from Lorcan's CV. */
export const ROLES: { role: string; company: string; dates: string; text: string; now?: boolean }[] = [
  {
    role: 'Commercial & Growth Manager',
    company: 'Arkintel',
    dates: 'Sep 2026 – Present',
    text: "Commercial growth and market development, with a focus on Arkintel's expansion into Ireland. Building relationships with senior leaders, public-sector organisations and technology partners.",
    now: true,
  },
  {
    role: 'Creative AI & Visual Designer',
    company: 'Present Savvy / Savvy Lab',
    dates: '2023 – 2026',
    text: 'Managed multiple clients and creative projects across branding, campaigns and digital. Brought AI into creative workflows, ran AI workshops and webinars, and spoke at industry events.',
  },
  {
    role: 'Allround Designer',
    company: 'ATPI.com',
    dates: '2021 – 2023',
    text: 'In-house designer for a global travel business with 100+ locations and around 3,500 staff. Print, digital and campaign work for clients including Heineken, Just Eat, Formula 1 and UEFA.',
  },
  {
    role: 'Lead Graphic Designer',
    company: 'Brandit.ie',
    dates: '2017 – 2020',
    text: "Owned the company's design and marketing output across internal and client work, and introduced a production system that improved how work moved from brief to delivery.",
  },
];
