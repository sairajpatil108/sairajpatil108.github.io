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
  cv: '/sairajpatil108_PM.pdf',
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
    title: 'Product & Engineering Intern',
    company: 'ScriptAnalytica Technologies',
    oneLiner: 'Owned a mobile product end to end — and cut delivery time 40%.',
    description:
      'I owned the product from design and architecture through production, then scaled it to iOS to widen the addressable market.',
    wins: [
      'Built a reusable component library that cut development time 40%',
      'Shipped to iOS, expanding the addressable user base',
      'Owned the full lifecycle: design, architecture, and release',
    ],
    technologies: ['Flutter', 'iOS', 'Firebase', 'Design Systems', 'Payments'],
  },
  {
    id: 'venoh',
    period: 'Jan 2025 – Jul 2025',
    title: 'Product & Engineering Lead',
    company: 'Venoh Ventures',
    oneLiner: 'Shipped a production app from zero to the Play Store in under two months.',
    description:
      'I ran cross-functional delivery — setting timelines, unblocking engineers, and owning launch quality — while advising the CEO on architecture and platform choices.',
    wins: [
      'Took a production app from empty repo to Play Store in under 2 months',
      'Set timelines, unblocked engineers, and owned quality at launch',
      'Advised the CEO on architecture and platform decisions',
    ],
    technologies: ['Kotlin', 'Jetpack Compose', 'Product Management', 'Play Store', 'Payments'],
  },
  {
    id: 'tellme',
    period: 'Feb 2025 – Present',
    title: 'Product Manager & Tech Advisor to the CEO',
    company: 'TellMe Digiinfotech',
    oneLiner: 'Led a services-to-product pivot that helped the company raise its first round.',
    description:
      "I proposed and led TellMe's first owned product — a pivot from services to product that launched and supported the company's first fundraise. I now lead national government products and advise the CEO on technology, AI, and vendor strategy.",
    wins: [
      "Proposed and led the company's first owned product (services → product)",
      'The product launched and supported the company raising its first round',
      'Lead national government products (MP Tourism, NABARD) from concept to deploy',
      'Built software that scaled offline operations 3×',
    ],
    technologies: ['Product Strategy', 'B2G', 'AI / ML', 'Mobile', 'Stakeholder Mgmt'],
  },
]

export const projects: Project[] = [
  {
    id: 'divyadarshan',
    name: 'DivyaDarshan360',
    tagline: '360° VR temple-darshan streaming for elderly users',
    description:
      'A 360° VR streaming app that brings live temple rituals and aartis from sacred sites across India to users who can no longer travel to them.',
    image: '/assets/divya_darshan_cover.png',
    period: 'Oct 2025',
    role: 'Product Owner',
    domain: 'VR · Streaming',
  },
  {
    id: 'zylience',
    name: 'Zylience Fit',
    tagline: 'AI wellness coach built on real-time wearable data',
    description:
      'A personal AI wellness coach that ingests real-time wearable data — heart rate, SpO2, sleep — to deliver personalised guidance, with HIPAA-compliant handling of clinical-grade data.',
    image: '/assets/zylience_fit_mockup.png',
    period: 'Feb 2026',
    role: 'Solo Builder',
    domain: 'AI · Health',
  },
  {
    id: 'mptourism',
    name: 'MP Tourism TFC',
    tagline: 'Digital ticketing that scaled TFC operations 3×',
    description:
      'A digital ticketing system for MP Tourism Facilitation Centres that replaced manual bottlenecks and scaled centre operations 3× across Madhya Pradesh.',
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
      'Advised on modernising a Warehouse Management System for NABARD, with an AI roadmap spanning quality assurance, demand forecasting, inventory optimisation, and IoT-based tracking.',
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
  { value: 3, suffix: '×', label: 'Operations scaled', detail: 'Offline government operations, digitised' },
  { value: 1, suffix: '', label: 'Funding round', detail: 'Supported by a pivot I proposed and led' },
  { value: 3, suffix: '', label: 'National products', detail: 'Concept to deploy — MP Govt. & NABARD' },
  { value: 40, suffix: '%', label: 'Faster delivery', detail: 'Dev time cut with reusable systems' },
  { value: 2, suffix: ' mo', prefix: '<', label: 'Zero to Play Store', detail: 'A full production app, shipped' },
  { value: 2, suffix: ' yrs', label: 'In product', detail: 'Building in production since 2024' },
]

export const skills: SkillGroup[] = [
  {
    label: 'Product',
    items: [
      { name: 'Roadmapping', level: 'Experienced' },
      { name: 'PRD Writing', level: 'Experienced' },
      { name: 'Agile / Sprint', level: 'Experienced' },
      { name: 'Stakeholder Mgmt', level: 'Experienced' },
      { name: 'Go-to-Market', level: 'Experienced' },
      { name: 'User Research', level: 'Intermediate' },
    ],
  },
  {
    label: 'Engineering',
    items: [
      { name: 'Kotlin', level: 'Experienced' },
      { name: 'Jetpack Compose', level: 'Experienced' },
      { name: 'Flutter', level: 'Intermediate' },
      { name: 'Java', level: 'Experienced' },
      { name: 'Python', level: 'Intermediate' },
      { name: 'REST APIs', level: 'Experienced' },
      { name: 'SQL', level: 'Intermediate' },
      { name: 'Git', level: 'Experienced' },
    ],
  },
  {
    label: 'Domains',
    items: [
      { name: 'AI / ML', level: 'Applied' },
      { name: 'Cloud', level: 'Applied' },
      { name: 'Mobile (iOS & Android)', level: 'Experienced' },
      { name: 'B2G / GovTech', level: 'Experienced' },
      { name: 'UX & Design', level: 'Intermediate' },
      { name: 'Security', level: 'Intermediate' },
    ],
  },
]

export const education = {
  degree: 'B.E. Computer Science',
  institute: 'Pimpri Chinchwad College of Engineering, Pune',
  duration: '2022 – 2026',
  note: 'Graduated. Building at the intersection of product, engineering, and AI.',
}
