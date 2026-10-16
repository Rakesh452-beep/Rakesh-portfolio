/**
 * Every piece of copy on the site lives here.
 * Edit this file only — no need to hunt through components for content.
 */

export const profile = {
  name: "Rakesh Kumar I",
  first: "Rakesh",
  last: "Kumar I",
  role: "Full-Stack Developer & AI Tooling",
  location: "Bengaluru, India",
  timezone: "IST (UTC+5:30)",
  availableFor: "Internships & junior full-stack roles",
  status: "Open to work — graduating 2027",
  resume: "/Rakesh_Kumar_Resume.pdf",
  photo: "/rakesh.jpg",
} as const;

export const contact = {
  email: "rakeshkumarirri28@gmail.com",
  phone: "+91 80746 45082",
  phoneRaw: "+918074645082",
  github: "https://github.com/Rakesh452-beep",
  linkedin: "https://www.linkedin.com/in/rakesh-kumar-726164292",
  links: [
    { label: "GitHub", handle: "@Rakesh452-beep", href: "https://github.com/Rakesh452-beep" },
    { label: "LinkedIn", handle: "in/rakesh-kumar", href: "https://www.linkedin.com/in/rakesh-kumar-726164292" },
  ],
} as const;

export const tagline = "I build web apps, AI tooling, and the automation that keeps them running.";

export const summary =
  "B.Tech Computer Science student at GITAM Deemed University, Bengaluru (class of 2027). " +
  "I work across the full stack — React and Next.js on the front, Node and Supabase behind it — " +
  "and I care about the unglamorous parts most: the pipelines, the APIs, the scheduled jobs. " +
  "Two internships in AI/ML research and graphic design, three shipped projects, and a habit of automating whatever I have done by hand twice.";

export const heroRotating = [
  "Next.js + Supabase",
  "Python automation",
  "Three.js & shaders",
  "REST & JSONP APIs",
  "AI tooling",
] as const;

export const heroHeadline = {
  line1: "Rakesh Kumar I",
  line2: "Full-Stack Developer",
} as const;

export const heroKicker =
  "Building web apps, dashboards and the automation behind them — from the interface down to the scheduled job.";

export type Project = {
  id: string;
  index: string;
  name: string;
  role: string;
  year: string;
  kind: string;
  discipline: string;
  summary: string;
  bullets: string[];
  stack: string[];
  image: string;
  imageWide: string;
  live?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    id: "dhanunjay",
    index: "01",
    name: "Dhanunjay Three Lenses Studio",
    role: "Freelance Frontend Developer",
    year: "2025",
    kind: "Client platform",
    discipline: "Client platform",
    summary:
      "A client website for a photography, cinematography and graphic design studio — built with an interactive portfolio, service pages and a full booking pipeline backed by Supabase.",
    bullets: [
      "Built the responsive studio site: interactive portfolio, services, testimonials and motion throughout.",
      "Implemented end-to-end booking — date/time slot selection, payment receipt tracking, and real-time booking and review management on Supabase.",
      "Automated booking confirmations, owner notifications and contact-form email through Nodemailer + Resend.",
      "Deployed on Vercel with GitHub-based CI/CD.",
    ],
    stack: ["Next.js", "Supabase", "Vercel", "Nodemailer", "Resend"],
    image: "/projects/dhanunjay.png",
    imageWide: "/projects/dhanunjay-wide.png",
  },
  {
    id: "hackathon-dashboard",
    index: "02",
    name: "Hackathon Team Connection Dashboard",
    role: "Full-Stack Developer",
    year: "2024",
    kind: "Hackathon platform",
    discipline: "Hackathon platform",
    summary:
      "A platform where students find teammates by skill and availability instead of scrolling through group chats.",
    bullets: [
      "Designed and built a profile system surfacing each student's skills, experience and availability.",
      "Implemented skill-based search and multi-criteria filtering across the user base.",
      "Wired in messaging so matched students can connect without leaving the platform.",
    ],
    stack: ["React.js", "Supabase"],
    image: "/projects/hackathon-dashboard.png",
    imageWide: "/projects/hackathon-dashboard-wide.png",
  },
  {
    id: "cricket-pipeline",
    index: "03",
    name: "Automated Cricket Statistics Pipeline",
    role: "Automation Engineer",
    year: "2025",
    kind: "Scheduled pipeline",
    discipline: "Scheduled pipeline",
    summary:
      "A daily scheduled pipeline that scrapes KSCA U-19 match data, isolates wicketkeeper figures, and emails a formatted report — no one touches a spreadsheet.",
    bullets: [
      "Scraped KSCA U-19 match data from undocumented JSONP endpoints and normalised it into a usable shape.",
      "Isolated and processed wicketkeeper statistics with Python and Pandas.",
      "Generated formatted Excel reports via openpyxl, then synced to Google Sheets through the Sheets API.",
      "Distributed reports by Gmail SMTP and scheduled daily execution with Windows Task Scheduler — fully hands-off.",
    ],
    stack: ["Python", "Pandas", "openpyxl", "Google Sheets API", "Gmail SMTP", "Windows Task Scheduler"],
    image: "/projects/cricket-pipeline.png",
    imageWide: "/projects/cricket-pipeline-wide.png",
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.id === slug);

export const nextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.id === slug);
  if (i === -1) return projects[0];
  return projects[(i + 1) % projects.length];
};

export type Role = {
  company: string;
  title: string;
  period: string;
  kind: "AI/ML" | "Design";
  bullets: string[];
};

export const experience: Role[] = [
  {
    company: "PathVision Innovations Pvt. Ltd.",
    title: "AI/ML Research Intern",
    period: "Sep 2025 — Oct 2025",
    kind: "AI/ML",
    bullets: [
      "Ran data analysis supporting AI/ML research workflows and experiments.",
      "Assisted with model validation, testing and documentation of research findings.",
    ],
  },
  {
    company: "InAmigos Foundation",
    title: "Graphic Designer Intern",
    period: "Jun 2025 — Jul 2025",
    kind: "Design",
    bullets: [
      "Designed posters, banners and social creatives for campaign work.",
      "Collaborated across teams to keep branding consistent and lift engagement.",
    ],
  },
];

export type Education = {
  school: string;
  degree: string;
  period: string;
  score: string;
};

export const education: Education[] = [
  {
    school: "GITAM Deemed University, Bengaluru",
    degree: "B.Tech — Computer Science & Engineering",
    period: "2023 — 2027",
    score: "CGPA 7.09 / 10",
  },
  {
    school: "Bhashyam IIT JEE Academy",
    degree: "Class XII — Senior Secondary",
    period: "2023",
    score: "84%",
  },
  {
    school: "Orchids High School",
    degree: "Class X — Secondary",
    period: "2021",
    score: "96.6%",
  },
];

export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  { label: "Frontend", items: ["HTML", "CSS", "JavaScript", "React.js", "Next.js", "Tailwind"] },
  { label: "Backend", items: ["Node.js", "Express.js"] },
  { label: "Databases", items: ["MongoDB", "Supabase", "SQL"] },
  { label: "APIs & Testing", items: ["REST APIs", "HTTP Methods", "Postman"] },
  { label: "Languages", items: ["Python", "JavaScript"] },
  { label: "AI Tools", items: ["Generative AI", "Prompt Engineering", "Vibe Coding"] },
  { label: "Design", items: ["Graphic Design", "Canva", "Google Stitch", "UI/Design", "React Bits"] },
  { label: "Automation", items: ["Google Sheets API", "Gmail SMTP", "JSONP Scraping", "Windows Task Scheduler"] },
  { label: "Version Control", items: ["Git", "GitHub"] },
  { label: "Deployment", items: ["Vercel", "Netlify"] },
  { label: "Data & Tools", items: ["MS Excel", "Pivot Tables"] },
  { label: "Soft Skills", items: ["Communication", "Teamwork", "Time Management"] },
];

export const activities = [
  {
    title: "National Service Scheme (NSS)",
    detail: "Active member — community service initiatives on and off campus.",
  },
  {
    title: "Smart India Hackathon 2024",
    detail: "Participated in the internal round; source of the Hackathon Team Connection Dashboard.",
  },
];

export const approach = [
  {
    n: "A",
    title: "Own the whole slice",
    body: "Interface, API, database and deploy pipeline. On the studio site that meant the React pages, the Supabase booking schema and the Vercel CI/CD — one person, end to end.",
  },
  {
    n: "B",
    title: "Automate the second run",
    body: "If I do something by hand twice, it becomes a job. The cricket pipeline went from a spreadsheet I edited daily to a scheduled scrape that emails the report itself.",
  },
  {
    n: "C",
    title: "Boring beats clever",
    body: "REST over GraphQL, Postgres over a clever cache, clear naming over abstraction. The interesting work is the product, not the abstraction layer.",
  },
];

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contacts", href: "/contact" },
] as const;

export const socials = [
  { label: "GitHub", href: contact.github },
  { label: "LinkedIn", href: contact.linkedin },
] as const;

export const statements = [
  "I build web apps, AI tooling, and the automation that keeps them running.",
  "React and Next.js on the front. Node and Supabase behind it. Python where it belongs — on a schedule.",
  "Unglamorous work, done properly: the pipelines, the APIs, the jobs nobody looks at.",
] as const;

export type Service = {
  n: string;
  title: string;
  body: string;
  cta: { label: string; href: string };
};

export const services: Service[] = [
  {
    n: "01",
    title: "Full-Stack Web Apps",
    body: "Next.js and React on the front, Node and Supabase behind it. From interactive marketing sites to booking pipelines that take real details, send real email and never lose a lead.",
    cta: { label: "See the work", href: "/projects" },
  },
  {
    n: "02",
    title: "Dashboards & Portals",
    body: "Data-shaped interfaces: profiles, search and filtering, messaging, real-time updates. Built so the person using them never has to think about the plumbing underneath.",
    cta: { label: "See the work", href: "/projects" },
  },
  {
    n: "03",
    title: "Python Automation",
    body: "If it runs on a schedule, it shouldn't need a human. Scrapers, report generators and API syncs that run themselves and tell you when something breaks.",
    cta: { label: "See the work", href: "/projects" },
  },
  {
    n: "04",
    title: "AI Tooling & APIs",
    body: "Prompt-driven features and the REST and JSONP plumbing around them — research tooling, model validation, and glue between services that were never meant to talk.",
    cta: { label: "Get in touch", href: "/contact" },
  },
];

export const ctaPills = [
  "web app",
  "dashboard",
  "automation",
  "ai tooling",
  "api build",
] as const;
