/**
 * Knowledge base for the "Ask my portfolio" assistant.
 *
 * Built from the same data files that render the site, so the assistant can
 * never drift out of date with the pages. Add a chunk below for anything the
 * site does not already say.
 */
import type { KnowledgeChunk } from "../lib/rag";
import { faqs } from "./faqData";
import { projects } from "./projectsData";
import { hireServices } from "./servicesData";

const SITE = "https://www.yasowantdev.info";

const profile: KnowledgeChunk[] = [
  {
    id: "profile",
    title: "About Yasowant Nayak — profile summary",
    text: "Yasowant Nayak is a Full Stack Software Engineer in Bangalore, India with 3+ years of experience building production SaaS with React, TypeScript, Node.js and Express. He scaled a multi-tenant SaaS platform to 8+ enterprise organisations, cut page loads 40% and release time 50%. He is available for full-time roles and remote freelance work.",
    url: `${SITE}/#about`,
  },
  {
    id: "exp-spm",
    title: "Work experience — Software Developer at SPM Global Technologies (Aug 2023 – present)",
    text: "Leads full-stack development of a multi-tenant SaaS platform serving 8+ enterprise organisations. Scaled tenants with strict data isolation, cut page load times 40% via code splitting, lazy loading and memoization, shipped releases 50% faster with Dockerized CI/CD on GitHub Actions and AWS, reduced feature build time 35% with a typed React component library, and architected 15+ REST, SOAP and GraphQL APIs secured with JWT and RBAC.",
    url: `${SITE}/#experience`,
  },
  {
    id: "exp-jspiders",
    title: "Work experience — Full Stack Developer at JSpiders (Sep 2022 – Jul 2023)",
    text: "Built mobile-first, cross-browser React.js interfaces and Java backend logic with RESTful APIs. Raised user engagement 20% with responsive UIs and increased online sales 30% with a full-stack e-commerce app.",
    url: `${SITE}/#experience`,
  },
  {
    id: "education",
    title: "Education",
    text: "B.Tech in Electrical Engineering from Galgotias College of Engineering & Technology, Greater Noida (2016–2019). Diploma in Electrical Engineering from Utkalmani Gopabandhu Institute of Engineering, Rourkela (2013–2016).",
    url: `${SITE}/#experience`,
  },
  {
    id: "skills",
    title: "Skills and tech stack",
    text: "Frontend: React, Next.js, TypeScript, JavaScript, Redux, Tailwind CSS. Backend: Node.js, Express, REST, SOAP, GraphQL, Socket.IO, JWT and RBAC. Databases: PostgreSQL, MongoDB, MySQL, Redis. DevOps: AWS, Docker, GitHub Actions, CI/CD, system design, microservices.",
    url: `${SITE}/#skills`,
  },
  {
    id: "ai",
    title: "AI, LLM and RAG experience",
    text: "Yasowant builds AI features with LLMs (OpenAI, Gemini): retrieval-augmented generation (RAG) chatbots over company data, embeddings and semantic or hybrid search with vector databases like pgvector, Pinecone and MongoDB Atlas Vector Search, AI agents with tool/function calling, prompt engineering, and streaming AI user interfaces. He shipped AI plan generation from resumes in Esscentra Prep using OpenAI. This assistant itself is a small RAG system: it retrieves passages from the portfolio and asks an LLM to answer only from them.",
    url: `${SITE}/#ai`,
  },
  {
    id: "contact",
    title: "Contact, social links, Instagram and X (Twitter)",
    text: "Email: yasowant1998@gmail.com. Instagram: @yasowant.dev (instagram.com/yasowant.dev) for dev tips and build updates. X (Twitter): @yash2062 (x.com/yash2062). LinkedIn: linkedin.com/in/yasowant-nayak. GitHub: github.com/Yasowant. Medium: medium.com/@yasowant1998. Resume: yasowantdev.info/resume.pdf. Or use the contact form on the site.",
    url: `${SITE}/#contact`,
  },
];

const projectChunks: KnowledgeChunk[] = projects.map((p) => ({
  id: `project-${p.slug}`,
  title: `Project — ${p.title}`,
  text: `${p.answer} Tech: ${p.tech.join(", ")}. Features: ${p.features.join("; ")}. Live: ${p.demo}`,
  url: `${SITE}/projects/${p.slug}`,
}));

const serviceChunks: KnowledgeChunk[] = hireServices.map((s) => ({
  id: `hire-${s.slug}`,
  title: `Freelance service — ${s.heading}`,
  text: `${s.answer} Stack: ${s.stack.join(", ")}.`,
  url: `${SITE}/hire/${s.slug}`,
}));

const faqChunks: KnowledgeChunk[] = faqs.map((f, i) => ({
  id: `faq-${i}`,
  title: f.question,
  text: f.answer,
  url: `${SITE}/#faq`,
}));

export const knowledge: KnowledgeChunk[] = [
  ...profile,
  ...projectChunks,
  ...serviceChunks,
  ...faqChunks,
];

export const suggestedQuestions = [
  "What AI / RAG work has Yasowant done?",
  "What's his tech stack?",
  "Tell me about Esscentra Prep",
  "Is he available for freelance?",
];
