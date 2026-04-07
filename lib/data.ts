export interface Project {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  behanceUrl?: string;
  image?: string;
  color: "red" | "blue" | "green" | "yellow";
  category: "data" | "design";
}

export const PERSONAL_INFO = {
  name: "Ina Louise Magno",
  firstName: "Ina",
  roles: ["Data Analyst", "Designer"],
  tagline: "I turn raw data into decisions — and blank pages into something worth looking at.",
  bio: "I am a creative and data analyst with a background in chemical engineering. I work with complex data and turn it into clear, useful insights, adding a touch of creativity to how they come through. Outside work I'm usually outdoors, in transit, or knee-deep in a book I promised myself I'd finish.",
  email: "cheimlouise@gmail.com",
  github: "https://github.com/chimkeninasal",
  linkedin: "https://linkedin.com/in/ina-louise-magno",
  location: "Philippines",
} as const;

export interface Experience {
  org: string;
  role: string;
  period: string;
  description: string;
  logo?: string;
  logoBg?: string;
  color: "red" | "blue" | "green" | "yellow";
  type: "work" | "education" | "training";
}

export const EXPERIENCES: Experience[] = [
  {
    org: "Eskwelabs",
    role: "Data Analytics Bootcamp",
    period: "Jan 2026 – Mar 2026",
    description: "Intensive bootcamp covering SQL, Tableau, Python, BigQuery, and end-to-end analytics workflows on real-world datasets.",
    logo: "/logos/eskwelabs.jpg",
    logoBg: "bg-[#3abfab]",
    color: "green",
    type: "training",
  },
  {
    org: "University of the Philippines Los Baños",
    role: "BS Chemical Engineering",
    period: "Aug 2019 – Aug 2025",
    description: "5-year engineering degree with coursework in quantitative methods, research design, and process data analysis.",
    logo: "/logos/up.png",
    logoBg: "bg-white",
    color: "green",
    type: "education",
  },
];

export const PROJECTS: Project[] = [
  {
    title: "SalaryIQ",
    subtitle: "Analyst Salary Study",
    description: "Salary intelligence platform built from 2,253 Glassdoor postings. Hypothesis testing to uncover pay gaps across roles and industries — visualized in Tableau.",
    tags: ["Python", "Tableau", "Hypothesis Testing"],
    githubUrl: "https://github.com/chimkeninasal/salaryiq-analyst-salary-study",
    image: "/projects/salaryiq.png",
    color: "blue",
    category: "data",
  },
  {
    title: "SE Asia CO₂",
    subtitle: "Emissions Analysis",
    description: "End-to-end environmental data analytics on CO₂ trends across Southeast Asia. Python QA pipeline + Power BI dashboard via BigQuery.",
    tags: ["Python", "Power BI", "BigQuery"],
    githubUrl: "https://github.com/chimkeninasal/southeast-asia-co2-analysis",
    image: "/projects/emissions.png",
    color: "green",
    category: "data",
  },
  {
    title: "SQL Sprint",
    subtitle: "Analytics Portfolio",
    description: "Introductory SQL portfolio covering conditional queries, aggregations, joins, unions, and subqueries applied to real-world data scenarios.",
    tags: ["SQL", "Data Analysis"],
    githubUrl: "https://github.com/chimkeninasal/data-analytics-sql-sprint",
    image: "/projects/sql.png",
    color: "yellow",
    category: "data",
  },
  {
    title: "Brand Identity",
    subtitle: "Visual Design",
    description: "Full brand identity systems for small businesses — logos, color palettes, typography, and social media templates.",
    tags: ["Branding", "Typography", "Illustrator"],
    image: "/projects/brandidentity.png",
    behanceUrl: "https://behance.com/hyenalouise",
    color: "red",
    category: "design",
  },
  {
    title: "Social Media Kit",
    subtitle: "Content Design",
    description: "Instagram grids, story templates, carousel designs, and brand-consistent content systems.",
    tags: ["Canva", "Illustrator", "Content Design"],
    image: "/projects/socmedkit.png",
    behanceUrl: "https://behance.com/hyenalouise",
    color: "yellow",
    category: "design",
  },
  {
    title: "Graphic Design",
    subtitle: "Print & Digital",
    description: "Posters, layouts, editorial design, and visual communication work across print and digital formats.",
    tags: ["Illustrator", "Photoshop", "Canva"],
    image: "/projects/graphicdesign.png",
    behanceUrl: "https://behance.com/hyenalouise",
    color: "blue",
    category: "design",
  },
];
