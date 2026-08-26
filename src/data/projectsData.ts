/**
 * Single source of truth for projects.
 *
 * Consumed by:
 *   - ProjectsSection  (homepage grid)
 *   - ProjectsIndex    (/projects)
 *   - ProjectDetail    (/projects/:slug)
 *   - scripts/prerender.mjs (routes, JSON-LD, sitemap, llms.txt)
 *
 * `answer` is a deliberately self-contained 40-60 word paragraph that names the
 * entity in full and uses no pronouns or back-references. Answer engines lift
 * this kind of passage cleanly; prose that says "it" or "as described above"
 * gets skipped.
 */

export interface ProjectFaq {
  question: string;
  answer: string;
}

export interface Project {
  slug: string;
  title: string;
  /** Short label used in breadcrumbs, cards and <title>. */
  shortName: string;
  tagline: string;
  /** Liftable answer block. Rendered directly under the H1. */
  answer: string;
  description: string;
  features: string[];
  tech: string[];
  github: string;
  demo: string;
  /** Human-readable host shown instead of the raw URL. */
  demoLabel: string;
  /**
   * Path to a real screenshot in public/projects/, or null.
   * null renders the generated card in ProjectThumb — never a stock photo.
   */
  image: string | null;
  status: "Live in production" | "Live demo";
  category: string;
  featured: boolean;
  faqs: ProjectFaq[];
}

export const projects: Project[] = [
  {
    slug: "esscentra-prep",
    title: "Esscentra Prep – AI Interview & Exam Prep Planner",
    shortName: "Esscentra Prep",
    tagline: "AI study planner that schedules itself around your real day",
    answer:
      "Esscentra Prep is an AI-powered interview and exam preparation planner built by Yasowant Nayak. Esscentra Prep turns a resume or an exam goal into a personalised day-by-day study plan scheduled around the user's real routine, with tasks, streaks, progress analytics and email reminders. Esscentra Prep runs in production at prep.esscentra.in on React, Node.js, Express and MongoDB.",
    description:
      "A full-stack, AI-powered study planner that turns a resume or exam goal into a personalized, day-by-day plan scheduled around your real routine — tasks, streaks, analytics, reminders, and subscriptions included. Designed, built, and deployed end-to-end. Live in production at prep.esscentra.in.",
    features: [
      "AI plan from a resume (PDF/image) or exam goal",
      "Tasks auto-scheduled into your real day & time slots",
      "Multiple roadmaps + auto catch-up for overdue tasks",
      "Streaks, activity heatmap & progress analytics",
      "In-app, desktop & nightly email reminders",
      "JWT auth, 7-day trial & tiered subscriptions",
    ],
    tech: ["React", "Vite", "Node.js", "Express", "MongoDB", "JWT", "OpenAI"],
    github: "https://github.com/Yasowant",
    demo: "https://prep.esscentra.in/",
    demoLabel: "prep.esscentra.in",
    image: "/projects/esscentra-prep.png",
    status: "Live in production",
    category: "AI / SaaS",
    featured: true,
    faqs: [
      {
        question: "What is Esscentra Prep?",
        answer:
          "Esscentra Prep is an AI-powered interview and exam preparation planner that converts a resume or exam goal into a personalised day-by-day study plan, scheduled into the user's real available time slots, with streaks, an activity heatmap and progress analytics.",
      },
      {
        question: "What technology stack is Esscentra Prep built on?",
        answer:
          "Esscentra Prep is built with React and Vite on the frontend, Node.js and Express on the backend, MongoDB for data, JWT for authentication, and the OpenAI API for plan generation.",
      },
      {
        question: "Who built Esscentra Prep?",
        answer:
          "Esscentra Prep was designed, built and deployed end-to-end by Yasowant Nayak, a Full Stack Software Engineer based in Bangalore, India. It is live in production at prep.esscentra.in.",
      },
    ],
  },
  {
    slug: "survesy",
    title: "Survesy – Multi-Tenant Survey SaaS",
    shortName: "Survesy",
    tagline: "Build a survey in minutes, watch responses become live charts",
    answer:
      "Survesy is a multi-tenant survey SaaS platform built by Yasowant Nayak. Survesy provides a drag-and-drop form builder, a visual conditional-logic rules engine, ten or more question types, real-time response analytics, role-based access with full audit logs, and tiered subscriptions. Survesy is built with React, TypeScript, TanStack Router, React Query, Node.js, MongoDB and Recharts.",
    description:
      "A production-ready, all-in-one survey platform: build beautiful forms in minutes, share with a link, and watch responses turn into live charts — no spreadsheets, no setup.",
    features: [
      "Drag-and-drop builder with multi-section surveys",
      "Conditional logic via a visual rules engine",
      "Real-time analytics: trends & completion rates",
      "10+ question types with CSV / JSON export",
      "Role-based access & full audit logs",
      "Tiered subscriptions (Free → Premium)",
    ],
    tech: [
      "React",
      "TypeScript",
      "TanStack Router",
      "React Query",
      "Node.js",
      "MongoDB",
      "Recharts",
    ],
    github: "https://github.com/Yasowant",
    demo: "https://frontend-survey-saas-platform.vercel.app/",
    demoLabel: "frontend-survey-saas-platform.vercel.app",
    // Screenshot needed: save the survey builder or the live analytics view as
    // public/projects/survesy.png, then set image: "/projects/survesy.png".
    image: null,
    status: "Live demo",
    category: "SaaS",
    featured: true,
    faqs: [
      {
        question: "What is Survesy?",
        answer:
          "Survesy is a multi-tenant survey SaaS platform with a drag-and-drop builder, multi-section surveys, a visual conditional-logic rules engine, more than ten question types, CSV and JSON export, and real-time response analytics.",
      },
      {
        question: "What technology stack is Survesy built on?",
        answer:
          "Survesy is built with React, TypeScript, TanStack Router and React Query on the frontend, Node.js and MongoDB on the backend, and Recharts for its real-time analytics dashboards.",
      },
      {
        question: "Who built Survesy?",
        answer:
          "Survesy was built by Yasowant Nayak, a Full Stack Software Engineer based in Bangalore, India, who works remotely with clients in India, the UK, the US and Europe.",
      },
    ],
  },
  {
    slug: "smaartqr",
    title: "SmaartQR – Emergency Response Platform",
    shortName: "SmaartQR",
    tagline: "One scan connects you to verified emergency services, 24/7",
    answer:
      "SmaartQR is a unified emergency-response platform for India, built by Yasowant Nayak. A single SmaartQR scan connects citizens to eleven or more verified emergency services — including police, fire, ambulance and the women's helpline — around the clock, with OTP-based registration. SmaartQR runs in production at smaartqr.com on React, TypeScript, Tailwind CSS and REST APIs.",
    description:
      "India's unified emergency-response platform — one scan connects citizens to verified, life-saving services 24/7, wherever they are. Live in production at smaartqr.com.",
    features: [
      "One scan → 11+ verified emergency services",
      "Police, Fire, Ambulance & Women's helpline",
      "OTP-based secure registration, no long forms",
      "24/7 round-the-clock emergency response",
      "Civic services for subscribed users",
      "Trusted by 50K+ registered users",
    ],
    tech: ["React.js", "TypeScript", "Tailwind CSS", "REST APIs"],
    github: "https://github.com/Yasowant",
    demo: "https://www.smaartqr.com",
    demoLabel: "smaartqr.com",
    // Screenshot needed: save the scan-to-services flow as
    // public/projects/smaartqr.png, then set image: "/projects/smaartqr.png".
    image: null,
    status: "Live in production",
    category: "Civic Tech",
    featured: true,
    faqs: [
      {
        question: "What is SmaartQR?",
        answer:
          "SmaartQR is a unified emergency-response platform for India where a single QR scan connects a citizen to more than eleven verified emergency services, including police, fire, ambulance and the women's helpline, available 24/7.",
      },
      {
        question: "What technology stack is SmaartQR built on?",
        answer:
          "SmaartQR is built with React, TypeScript and Tailwind CSS on the frontend, consuming REST APIs, with OTP-based secure registration instead of long sign-up forms.",
      },
      {
        question: "Who built SmaartQR?",
        answer:
          "SmaartQR was built by Yasowant Nayak, a Full Stack Software Engineer based in Bangalore, India. SmaartQR is live in production at smaartqr.com.",
      },
    ],
  },
  {
    slug: "grandreserve",
    title: "GrandReserve – Hotel Booking Platform",
    shortName: "GrandReserve",
    tagline: "Search to checkout, without the friction",
    answer:
      "GrandReserve is a hotel booking platform built by Yasowant Nayak. GrandReserve offers real-time room availability and search, secure authentication and user accounts, Stripe-powered payments and checkout, and room management with Cloudinary media, in a mobile-first booking flow. GrandReserve is built with React, Redux, Node.js, PostgreSQL, Stripe and Cloudinary.",
    description:
      "A modern hotel booking web application designed for performance, scalability, and a seamless guest experience from search to checkout.",
    features: [
      "Real-time room availability & search",
      "Secure authentication and user accounts",
      "Stripe-powered payments & checkout",
      "Room management with Cloudinary media",
      "Smooth, mobile-first booking flow",
    ],
    tech: ["React", "Redux", "Node.js", "PostgreSQL", "Stripe", "Cloudinary"],
    github: "https://github.com/Yasowant/hotelbooking_FE",
    demo: "https://grandreserve-stays.vercel.app",
    demoLabel: "grandreserve-stays.vercel.app",
    // Screenshot needed: save the room search or checkout step as
    // public/projects/grandreserve.png, then set image: "/projects/grandreserve.png".
    image: null,
    status: "Live demo",
    category: "Web App",
    featured: true,
    faqs: [
      {
        question: "What is GrandReserve?",
        answer:
          "GrandReserve is a hotel booking web application with real-time room availability and search, secure user accounts, Stripe-powered checkout, and room management backed by Cloudinary media storage.",
      },
      {
        question: "What technology stack is GrandReserve built on?",
        answer:
          "GrandReserve is built with React and Redux on the frontend, Node.js on the backend, PostgreSQL for data, Stripe for payments and Cloudinary for room media.",
      },
      {
        question: "Who built GrandReserve?",
        answer:
          "GrandReserve was built by Yasowant Nayak, a Full Stack Software Engineer based in Bangalore, India, available for remote freelance and contract work worldwide.",
      },
    ],
  },
];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
