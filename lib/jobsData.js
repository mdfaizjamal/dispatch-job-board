// Seed listings shown on first visit. Once a person posts a job or saves one,
// real state moves into localStorage (see lib/useJobs.js).
export const seedJobs = [
  {
    id: "REQ-1042",
    title: "Senior Frontend Engineer",
    company: "Northwind Labs",
    location: "Remote — India",
    type: "Full-time",
    category: "Engineering",
    salary: "₹28L – ₹38L",
    posted: "2026-07-08",
    tags: ["React", "TypeScript", "Design systems"],
    description:
      "Northwind Labs is looking for a senior frontend engineer to own our design system and lead a small team rebuilding our customer dashboard in React and TypeScript.",
    responsibilities: [
      "Lead the rebuild of the customer dashboard in React and TypeScript",
      "Maintain and extend the shared component library",
      "Pair with design on interaction details and accessibility",
      "Mentor two mid-level engineers",
    ],
    requirements: [
      "5+ years building production frontend applications",
      "Deep knowledge of React, TypeScript, and accessible markup",
      "Experience owning a design system or component library",
    ],
    applyEmail: "careers@northwindlabs.example",
  },
  {
    id: "REQ-1043",
    title: "Product Designer",
    company: "Harbor & Co.",
    location: "Bengaluru, IN",
    type: "Full-time",
    category: "Design",
    salary: "₹18L – ₹26L",
    posted: "2026-07-06",
    tags: ["Figma", "UX research", "B2B SaaS"],
    description:
      "Shape the core workflows of a B2B logistics platform used by warehouse teams across the country. You'll work closely with engineering and support to ship changes that are tested with real operators.",
    responsibilities: [
      "Run lightweight research with warehouse operators",
      "Design and prototype core logistics workflows in Figma",
      "Partner with engineering on implementation details",
    ],
    requirements: [
      "3+ years of product design experience",
      "A portfolio showing end-to-end workflow design",
      "Comfort presenting research findings to stakeholders",
    ],
    applyEmail: "jobs@harborandco.example",
  },
  {
    id: "REQ-1044",
    title: "Backend Engineer (Node.js)",
    company: "Fielding Systems",
    location: "Remote — Global",
    type: "Contract",
    category: "Engineering",
    salary: "$60 – $85 / hr",
    posted: "2026-07-05",
    tags: ["Node.js", "PostgreSQL", "AWS"],
    description:
      "6-month contract to build out event-processing services for a fleet-tracking product. Greenfield service work with an experienced platform team.",
    responsibilities: [
      "Design and build event-processing services in Node.js",
      "Own schema design in PostgreSQL",
      "Set up monitoring and alerting on AWS",
    ],
    requirements: [
      "Strong Node.js and PostgreSQL experience",
      "Comfortable working independently on a contract basis",
      "AWS experience (ECS, RDS, CloudWatch)",
    ],
    applyEmail: "contracts@fielding.example",
  },
  {
    id: "REQ-1045",
    title: "Marketing Associate",
    company: "Kettleworth",
    location: "Mumbai, IN",
    type: "Part-time",
    category: "Marketing",
    salary: "₹35,000 / mo",
    posted: "2026-07-09",
    tags: ["Content", "Social", "Early career"],
    description:
      "Help a small consumer-goods brand grow its social presence and write weekly content. Great first role for someone starting out in marketing.",
    responsibilities: [
      "Plan and write weekly social content",
      "Track engagement and report on what's working",
      "Coordinate with a freelance designer on assets",
    ],
    requirements: [
      "Strong, clear writing",
      "Familiarity with Instagram and LinkedIn as brand channels",
      "No prior professional experience required",
    ],
    applyEmail: "hello@kettleworth.example",
  },
  {
    id: "REQ-1046",
    title: "DevOps Engineer",
    company: "Northwind Labs",
    location: "Pune, IN",
    type: "Full-time",
    category: "Engineering",
    salary: "₹22L – ₹32L",
    posted: "2026-07-03",
    tags: ["Kubernetes", "CI/CD", "Terraform"],
    description:
      "Own the CI/CD pipelines and Kubernetes infrastructure behind our core product. You'll be the primary point of contact for build, release, and infrastructure reliability.",
    responsibilities: [
      "Maintain and improve CI/CD pipelines across services",
      "Manage Kubernetes clusters and Terraform infrastructure",
      "Set up and tune monitoring and on-call alerting",
    ],
    requirements: [
      "Experience running production Kubernetes clusters",
      "Strong grasp of CI/CD tooling (GitHub Actions or similar)",
      "Terraform or equivalent infrastructure-as-code experience",
    ],
    applyEmail: "careers@northwindlabs.example",
  },
  {
    id: "REQ-1047",
    title: "Customer Support Specialist",
    company: "Harbor & Co.",
    location: "Remote — India",
    type: "Full-time",
    category: "Support",
    salary: "₹8L – ₹11L",
    posted: "2026-07-01",
    tags: ["Zendesk", "B2B SaaS", "Night shift"],
    description:
      "Front-line support for our logistics platform's warehouse customers. Night-shift role covering US business hours.",
    responsibilities: [
      "Resolve customer tickets in Zendesk within SLA",
      "Escalate product bugs to engineering with clear repro steps",
      "Maintain the internal help-center articles",
    ],
    requirements: [
      "1+ years in a customer support role",
      "Comfortable working night shift (US hours)",
      "Clear written communication",
    ],
    applyEmail: "jobs@harborandco.example",
  },
];

export const categories = [
  "All categories",
  "Engineering",
  "Design",
  "Marketing",
  "Support",
];

export const jobTypes = ["All types", "Full-time", "Part-time", "Contract"];
