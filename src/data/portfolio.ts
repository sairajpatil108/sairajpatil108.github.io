// Single source of truth for Sairaj Patil's story.
// Voice: first person, plain, metric-led — how a product manager actually writes.

export type Social = { name: string; url: string }

export type Role = {
  id: string
  period: string
  title: string
  company: string
  oneLiner: string
  description: string
  wins: string[]
  technologies: string[]
}

export type Project = {
  id: string
  name: string
  tagline: string
  description: string
  image: string
  url?: string
  period: string
  role: string
  domain: string
}

export type Stat = {
  value: number
  suffix: string
  prefix?: string
  label: string
  detail: string
}

export type SkillGroup = {
  label: string
  items: { name: string; level: string }[]
}

export const personal = {
  name: 'Sairaj Patil',
  location: 'Pune, India',
  portrait: '/assets/profile-color.jpg',
  avatar: '/assets/avatar2.jpg',
  cv: '/sairajpatil_.pdf',
}

export const socials: Social[] = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sairajpatil108/' },
  { name: 'GitHub', url: 'https://github.com/sairajpatil108' },
  { name: 'Google Dev', url: 'https://developers.google.com/profile/u/sairajpatil108' },
  { name: 'LeetCode', url: 'https://leetcode.com/sairajpatil108/' },
  { name: 'Google Cloud', url: 'https://www.cloudskillsboost.google/public_profiles/372a8e89-a961-4e3d-aa55-3311de5c539b' },
  { name: 'Coursera', url: 'https://www.coursera.org/user/cbbcdd32bef60224fd6b86ba12af9fe8' },
]

export const contact = {
  email: 'sairajpatil108@gmail.com',
  phone: '+91 8767069180',
  phoneHref: 'tel:+918767069180',
  linkedin: 'https://www.linkedin.com/in/sairajpatil108/',
}

// Chronological — the experience timeline.
export const journey: Role[] = [
  {
    id: 'scriptanalytica',
    period: 'Aug 2024 – Dec 2024',
    title: 'Product Intern',
    company: 'ScriptAnalytica Technologies',
    oneLiner: 'Owned a mobile product end to end — and cut delivery time 40%.',
    description:
      'I drove the product from initial design through production launch, then extended it to iOS to widen the addressable user base.',
    wins: [
      'Cut development time 40% by introducing reusable component libraries',
      'Tightened the feedback loop between design and engineering',
      'Shipped to production, then extended to iOS to widen reach',
    ],
    technologies: ['Flutter', 'iOS', 'Component Libraries', 'Firebase', 'Design Systems'],
  },
  {
    id: 'venoh',
    period: 'Jan 2025 – Jul 2025',
    title: 'Product Lead (Contract)',
    company: 'Venoh Ventures',
    oneLiner: 'Shipped a two-sided marketplace — both apps — to live alpha in under two months.',
    description:
      'I owned a marketplace connecting users with professionals — therapists, astrologers, teachers — for per-minute paid chat and calls, leading delivery across both the user and professional apps as the founder’s product partner.',
    wins: [
      'Owned a two-sided marketplace for per-minute paid chat and calls',
      'Shipped both apps — user and professional — to live alpha in under 2 months',
      'Owned discovery, roadmap, and the per-minute monetisation model',
      'Drove prioritisation and platform decisions in lockstep with the founder',
    ],
    technologies: ['Product Strategy', 'Two-sided Marketplace', 'Monetisation', 'Discovery', 'Roadmapping'],
  },
  {
    id: 'tellme',
    period: 'Feb 2025 – Present',
    title: 'Product Management Intern → Product Manager',
    company: 'TellMe Digiinfotech',
    oneLiner: 'Led a services-to-product pivot — and shipped the company’s first product.',
    description:
      "I proposed and led DivyaDarshan360, TellMe's first owned product — driving the shift from a services business to a product-led model. I now own the full product surface across consumer and government work, lead national government products, and advise the CEO on technology, AI, and vendor strategy.",
    wins: [
      "Proposed and led DivyaDarshan360 — the company's first owned product (services → product)",
      'Owned the full product surface — discovery, PRDs, UX, GTM — often the only PM in the room',
      'Led org-wide AI adoption: authored the AI usage policy and redefined SOPs around LLM workflows',
      'Advised the CEO on tech stack, AI adoption, automation, and vendor selection',
      'Lead national government products (MP Tourism, NABARD) from concept to deploy',
    ],
    technologies: ['Product Strategy', 'AI / LLM', 'B2G & Gov', 'Go-to-Market', 'Stakeholder Mgmt'],
  },
]

export const projects: Project[] = [
  {
    id: 'divyadarshan',
    name: 'DivyaDarshan360',
    tagline: '10K+ installs in 30 days, at a fifth of the category’s CPI',
    description:
      'A 360° VR devotional app for elderly, Hindi-first users in low-bandwidth contexts. It drove 10K+ installs in 30 days at a ₹2–3 cost-per-install — against a category norm near ₹12 — and retained them into a daily habit averaging nearly 3 minutes per user.',
    image: '/assets/divya_darshan_cover.png',
    period: 'Oct 2025',
    role: 'Product Owner',
    domain: 'VR · Consumer',
  },
  {
    id: 'zylience',
    name: 'ZylienceFit',
    tagline: 'AI wellness coach built on real-time wearable data',
    description:
      'A personal AI wellness coach that ingests real-time wearable data — heart rate, SpO2, sleep — and delivers personalised guidance through a conversational interface, built on a multi-layered architecture for more accurate, transparent decisions.',
    image: '/assets/zylience_fit_mockup.png',
    period: 'Feb 2026',
    role: 'Solo Builder',
    domain: 'AI · Health',
  },
  {
    id: 'mptourism',
    name: 'MP Tourism TFC',
    tagline: 'Digital ticketing that scaled operations from 3 centres to 25',
    description:
      'A digital ticketing system for MP Tourism Facilitation Centres that replaced manual bottlenecks and scaled operations from 3 centres to 25 — owning senior state-government stakeholders through requirements, design, deployment, and training rollout.',
    image: '/assets/mp_tourism_cover.png',
    period: 'Mar 2026',
    role: 'Product Owner',
    domain: 'B2G · Ticketing',
  },
  {
    id: 'nabard',
    name: 'NABARD WMS',
    tagline: 'AI modernisation roadmap for a national WMS',
    description:
      'Advised the National Bank for Agriculture and Rural Development on modernising its Warehouse Management System, with an AI roadmap spanning LLM-assisted QA, ML demand forecasting, inventory optimisation, and IoT-based real-time tracking.',
    image: '/assets/nabard_wms_cover.png',
    period: 'Jan 2026',
    role: 'Advisor',
    domain: 'B2G · AI Strategy',
  },
  {
    id: 'digipanchayat',
    name: 'DigiPanchayat',
    tagline: 'Gram-panchayat governance, brought online',
    description:
      'A digital governance app that brings gram-panchayat services online — letting citizens access government schemes, file complaints, and track local development work.',
    image: '/assets/digipanchayat-cover.jpg',
    url: 'https://github.com/sairajpatil108/digiPanchayat',
    period: '2024',
    role: 'Developer',
    domain: 'GovTech',
  },
  {
    id: 'more',
    name: 'Earlier work',
    tagline: 'NoteIt · VisionaryAI · SkyForecast',
    description:
      'Earlier mobile and AI builds — NoteIt, VisionaryAI, and SkyForecast — where I built the foundation in mobile development and AI integration.',
    image: '/assets/many_more_projects.png',
    url: 'https://github.com/sairajpatil108',
    period: '2023 – 2024',
    role: 'Developer',
    domain: 'Foundations',
  },
]

export const stats: Stat[] = [
  { value: 10, suffix: 'K+', label: 'Installs in 30 days', detail: 'DivyaDarshan360 — at a ₹2–3 cost-per-install' },
  { value: 5, suffix: '×', label: 'Cheaper to acquire', detail: 'CPI cut from a ~₹12 category norm to ₹2–3' },
  { value: 25, suffix: '', label: 'Centres live', detail: 'MP Tourism — scaled up from 3 centres' },
  { value: 40, suffix: '%', label: 'Faster delivery', detail: 'Dev time cut with reusable systems' },
  { value: 2, suffix: ' mo', prefix: '<', label: 'Zero to alpha', detail: 'Two marketplace apps, shipped live' },
  { value: 2, suffix: ' yrs', label: 'In product', detail: 'Building in production since 2024' },
]

export const skills: SkillGroup[] = [
  {
    label: 'Strengths',
    items: [
      { name: '0 → 1 Product', level: 'Experienced' },
      { name: 'Full-surface Ownership', level: 'Experienced' },
      { name: 'AI / LLM Product Work', level: 'Experienced' },
      { name: 'Paid Growth & Retention', level: 'Intermediate' },
      { name: 'Gov & Senior Stakeholders', level: 'Intermediate' },
    ],
  },
  {
    label: 'Craft',
    items: [
      { name: 'Product Discovery', level: 'Experienced' },
      { name: 'Roadmapping & PRDs', level: 'Experienced' },
      { name: 'Go-to-Market', level: 'Experienced' },
      { name: 'User Research', level: 'Intermediate' },
      { name: 'Experimentation', level: 'Intermediate' },
      { name: 'Metrics & Analytics', level: 'Intermediate' },
    ],
  },
  {
    label: 'Technical',
    items: [
      { name: 'Python', level: 'Experienced' },
      { name: 'SQL', level: 'Experienced' },
      { name: 'Flutter', level: 'Experienced' },
      { name: 'REST APIs', level: 'Intermediate' },
      { name: 'Firebase', level: 'Intermediate' },
      { name: 'AWS', level: 'Applied' },
      { name: 'Figma', level: 'Applied' },
    ],
  },
  {
    label: 'Domains',
    items: [
      { name: 'AI / LLM Products', level: 'Experienced' },
      { name: 'Consumer (B2C)', level: 'Experienced' },
      { name: 'B2G & Regulated', level: 'Experienced' },
      { name: 'Mobile (iOS & Android)', level: 'Intermediate' },
      { name: 'Healthtech', level: 'Applied' },
    ],
  },
]

export const education = {
  degree: 'B.E. Computer Science',
  institute: 'Pimpri Chinchwad College of Engineering, Pune',
  duration: '2022 – 2026',
  note: 'Graduated June 2026 · CGPA 7.45 / 10. Building where product, engineering, and AI meet.',
}
