/**
 * Hire pages (/hire/:slug).
 *
 * These exist because "hire a react developer" is a query people actually
 * type, and a homepage section cannot rank for it — only a URL can. Every
 * claim here is drawn from the same source material as the homepage FAQ and
 * experience section; nothing new is asserted.
 *
 * `answer` follows the same rule as projectsData: 40-60 words, entity named in
 * full, no pronouns, readable as a standalone extract.
 */

import type { ServiceKey } from "@/lib/pricing";

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface HireService {
  slug: string;
  /** <h1> on the page. */
  heading: string;
  /** <title> / og:title. */
  title: string;
  metaDescription: string;
  tagline: string;
  answer: string;
  /** Drives the regional price widget. */
  priceKey: ServiceKey;
  whatYouGet: string[];
  stack: string[];
  process: { step: string; detail: string }[];
  goodFit: string[];
  faqs: ServiceFaq[];
}

export const hireServices: HireService[] = [
  {
    slug: "react-developer",
    heading: "Hire a React Developer",
    title: "Hire a Freelance React Developer — Yasowant Nayak",
    metaDescription:
      "Hire Yasowant Nayak, a freelance React and TypeScript developer in Bangalore working remotely with clients in India, the UK, the US and Europe. Responsive interfaces, typed component libraries, measurable performance gains.",
    tagline:
      "Typed, responsive React interfaces that load fast and stay maintainable.",
    answer:
      "Yasowant Nayak is a freelance React developer based in Bangalore, India, with 3+ years building production interfaces in React, TypeScript and Tailwind CSS. Yasowant Nayak builds responsive mobile-first layouts, reusable typed component libraries, and performance work that cut page load times by 40% through code splitting, lazy loading and memoization.",
    priceKey: "frontend",
    whatYouGet: [
      "Responsive, mobile-first layouts that hold up on real devices",
      "A reusable, typed React component library your team can extend",
      "Code splitting, lazy loading and memoization applied where they measurably help",
      "Accessible markup and keyboard-navigable interactive components",
      "Smooth animation with Framer Motion, used where it aids comprehension",
    ],
    stack: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "React Query",
      "Vite",
    ],
    process: [
      {
        step: "Scoping call",
        detail:
          "A short call to understand the product, the users and the constraints. You get a written scope and a fixed quote before anything starts.",
      },
      {
        step: "Component architecture",
        detail:
          "Shared primitives and typed props first, screens second. This is what keeps feature build time down later — it cut ours by 35% on a multi-tenant SaaS.",
      },
      {
        step: "Build and review",
        detail:
          "Work lands in small reviewable pull requests against your repo, with a deployed preview for each one.",
      },
      {
        step: "Handoff",
        detail:
          "Documented components, a clean commit history and a walkthrough. No black boxes.",
      },
    ],
    goodFit: [
      "You have a design or a Figma file and need it built properly in React",
      "Your existing React app has grown slow and needs measured performance work",
      "You need a component library your in-house team can build on",
    ],
    faqs: [
      {
        question: "Can I hire Yasowant Nayak as a freelance React developer?",
        answer:
          "Yes. Yasowant Nayak is available for remote freelance and contract React work with clients in India, the United Kingdom, the United States, Europe, Canada, Australia, the UAE and Singapore. Enquiries go to yasowant1998@gmail.com.",
      },
      {
        question: "What React experience does Yasowant Nayak have?",
        answer:
          "Yasowant Nayak has 3+ years building production React applications, including a multi-tenant SaaS platform serving 8+ enterprise organisations at SPM Global Technologies, where a reusable typed React component library reduced feature build time by 35%.",
      },
      {
        question: "How much does a React project cost?",
        answer:
          "Frontend and UI engineering projects are quoted in the client's local currency, starting from ₹30,000 in India, £1,150 in the UK and $1,450 in the US. Exact pricing is confirmed after a scoping call.",
      },
      {
        question: "What time zone does Yasowant Nayak work in?",
        answer:
          "Yasowant Nayak works from Bangalore, India (IST, UTC+5:30), and overlaps daily with UK and European working hours and with US mornings. Communication is in English or Hindi.",
      },
    ],
  },
  {
    slug: "nodejs-developer",
    heading: "Hire a Node.js & API Developer",
    title: "Hire a Freelance Node.js & API Developer — Yasowant Nayak",
    metaDescription:
      "Hire Yasowant Nayak for freelance Node.js and API work: REST, SOAP and GraphQL endpoints, JWT and role-based access control, MongoDB and PostgreSQL, deployed with Docker and GitHub Actions on AWS.",
    tagline:
      "REST, SOAP and GraphQL APIs that are secure, documented and load-tested.",
    answer:
      "Yasowant Nayak is a freelance Node.js and API developer based in Bangalore, India. Yasowant Nayak has architected 15+ REST, SOAP and GraphQL APIs secured with JWT and role-based access control, backed by MongoDB and PostgreSQL, and deployed with Docker and GitHub Actions CI/CD on AWS.",
    priceKey: "api",
    whatYouGet: [
      "REST, SOAP or GraphQL endpoints designed around how your clients actually consume them",
      "JWT authentication with role-based access control, applied per route",
      "Schema design for MongoDB or PostgreSQL, including the indexes you will need at scale",
      "Third-party and payment integrations — Stripe, webhooks, external provider APIs",
      "Dockerized deployment and a GitHub Actions pipeline you can run yourself",
    ],
    stack: [
      "Node.js",
      "Express",
      "TypeScript",
      "PostgreSQL",
      "MongoDB",
      "GraphQL",
      "Docker",
      "AWS",
    ],
    process: [
      {
        step: "Contract first",
        detail:
          "Endpoints, payloads and error shapes agreed in writing before implementation, so your frontend team is never blocked waiting to find out.",
      },
      {
        step: "Data model",
        detail:
          "Schema, access patterns and indexes designed together. Multi-tenant work gets strict data isolation from day one, not retrofitted.",
      },
      {
        step: "Build and secure",
        detail:
          "Implementation with authentication, authorization and input validation on every route — not added at the end.",
      },
      {
        step: "Ship",
        detail:
          "Dockerized, deployed through GitHub Actions to AWS, with the pipeline handed over documented.",
      },
    ],
    goodFit: [
      "You have a frontend and need a backend built to match it",
      "Your API works but has no auth story, no validation, or no deployment pipeline",
      "You need a multi-tenant backend with real data isolation between customers",
    ],
    faqs: [
      {
        question: "Can I hire Yasowant Nayak for Node.js backend work?",
        answer:
          "Yes. Yasowant Nayak takes on remote freelance and contract Node.js and API engagements worldwide, covering API development and integration, backend architecture, and cloud deployment. Enquiries go to yasowant1998@gmail.com.",
      },
      {
        question: "What backend experience does Yasowant Nayak have?",
        answer:
          "Yasowant Nayak has architected 15+ REST, SOAP and GraphQL APIs and led full-stack development of a multi-tenant SaaS platform serving 8+ enterprise organisations with strict data isolation, shipping releases 50% faster using Dockerized CI/CD on GitHub Actions and AWS.",
      },
      {
        question: "Which databases does Yasowant Nayak work with?",
        answer:
          "Yasowant Nayak works with MongoDB and PostgreSQL, including schema design, indexing and the access patterns needed for multi-tenant applications.",
      },
      {
        question: "How much does an API project cost?",
        answer:
          "API development and integration is quoted in the client's local currency, starting from ₹25,000 in India, £950 in the UK and $1,200 in the US, depending on scope. Exact pricing is confirmed after a scoping call.",
      },
    ],
  },
  {
    slug: "mvp-development",
    heading: "MVP Development for Founders",
    title: "Freelance MVP Development — Yasowant Nayak",
    metaDescription:
      "Yasowant Nayak builds production-ready MVPs for founders: idea to launch in weeks on React, Node.js and PostgreSQL or MongoDB, with auth, payments, deployment and a clean, documented handoff.",
    tagline:
      "Idea to launched product in weeks, on a foundation you can keep building on.",
    answer:
      "Yasowant Nayak builds production-ready MVPs for founders, taking an idea from scope to launch in weeks on React, Node.js and MongoDB or PostgreSQL. Every Yasowant Nayak MVP ships with authentication, payments, a deployment pipeline and documented handoff, on a scalable foundation rather than a throwaway prototype.",
    priceKey: "mvp",
    whatYouGet: [
      "A scoped feature set — what ships in v1, and what deliberately waits",
      "A working, deployed product, not a clickable prototype",
      "Authentication, subscriptions and payments wired up from the start",
      "A scalable, production-ready foundation you can hire against later",
      "Clean handoff: documented code, commit history and a walkthrough call",
    ],
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "PostgreSQL",
      "Stripe",
      "AWS",
    ],
    process: [
      {
        step: "Cut the scope",
        detail:
          "The most valuable hour of the project. We agree the smallest version that is genuinely usable, and write down what is explicitly out.",
      },
      {
        step: "Foundation",
        detail:
          "Auth, data model, deployment pipeline. Boring, and the reason the next eight weeks stay fast.",
      },
      {
        step: "Weekly shipping",
        detail:
          "A deployed build you can click every week, so scope decisions are made against something real.",
      },
      {
        step: "Launch and hand over",
        detail:
          "Production deployment, documentation and a walkthrough. You own the repo and the infrastructure throughout.",
      },
    ],
    goodFit: [
      "You have a validated idea and need a first version in front of users",
      "You have paying customers waiting on a product that does not exist yet",
      "You need a technical co-founder's output without giving away equity",
    ],
    faqs: [
      {
        question: "How long does an MVP take to build?",
        answer:
          "Scope determines the timeline. Yasowant Nayak builds MVPs in weeks rather than months by cutting scope to the smallest genuinely usable version first and shipping a deployed build every week.",
      },
      {
        question: "How much does MVP development cost?",
        answer:
          "MVP development is quoted in the client's local currency, starting from ₹65,000 in India, £2,400 in the UK and $3,000 in the US. Exact pricing is confirmed after a scoping call.",
      },
      {
        question: "Who owns the code?",
        answer:
          "You do. Work happens in your repository and on your infrastructure from the first commit, and the engagement ends with documented code, a clean commit history and a walkthrough call.",
      },
      {
        question: "Has Yasowant Nayak shipped MVPs before?",
        answer:
          "Yes. Esscentra Prep, an AI interview and exam preparation planner, was designed, built and deployed end-to-end by Yasowant Nayak and runs in production at prep.esscentra.in with authentication, a free trial and tiered subscriptions.",
      },
    ],
  },
];

export const getHireServiceBySlug = (slug: string): HireService | undefined =>
  hireServices.find((s) => s.slug === slug);
