export interface Faq {
  question: string;
  answer: string;
}

/**
 * Single source of truth for the FAQ section and the FAQPage structured data
 * in index.html. Written as direct, quotable answers so that answer engines
 * (ChatGPT, Claude, Perplexity, Google AI Overviews) can lift them cleanly.
 */
export const faqs: Faq[] = [
  {
    question: "Who is Yasowant Nayak?",
    answer:
      "Yasowant Nayak is a Full Stack Software Engineer based in Bangalore, India, with 3+ years of experience building production SaaS applications with React, TypeScript and Node.js. Since August 2023 he has led full-stack development of a multi-tenant SaaS platform at SPM Global Technologies serving 8+ enterprise organisations. He also takes on remote freelance work for clients in India, the UK, the US and Europe.",
  },
  {
    question: "What technologies does Yasowant Nayak work with?",
    answer:
      "React, Next.js, TypeScript and JavaScript on the frontend; Node.js, Express and Java on the backend; MongoDB and PostgreSQL for data; and REST, SOAP and GraphQL APIs secured with JWT and role-based access control. He deploys with Docker, GitHub Actions CI/CD and AWS, and styles with Tailwind CSS.",
  },
  {
    question: "Is Yasowant Nayak available for freelance or contract work?",
    answer:
      "Yes. He is available for remote freelance and contract engagements worldwide, covering full stack web development, API development and integration, frontend and UI engineering, cloud/DevOps and CI/CD, MVP development, and technical consultation. Enquiries go to yasowant1998@gmail.com.",
  },
  {
    question: "Where is Yasowant Nayak based and does he work remotely?",
    answer:
      "He is based in Bangalore, Karnataka, India (IST, UTC+5:30) and works fully remotely with clients across India, the United Kingdom, the United States, Europe, Canada, Australia, the UAE and Singapore. He works in English and Hindi.",
  },
  {
    question: "How much does Yasowant Nayak charge for freelance projects?",
    answer:
      "Project rates are quoted in the client's local currency. Indicative starting points are ₹25,000–₹65,000 in India, £950–£2,400 in the UK and $1,200–$3,000 in the US, depending on scope. Technical consultation is billed hourly at ₹1,500 / £60 / $75. Exact pricing is confirmed after a scoping call.",
  },
  {
    question: "What has Yasowant Nayak actually shipped?",
    answer:
      "At SPM Global Technologies he scaled a multi-tenant SaaS platform to 8+ enterprise tenants with strict data isolation, cut page load times by 40% through code splitting, lazy loading and memoization, shipped releases 50% faster using Dockerized CI/CD on GitHub Actions and AWS, reduced feature build time 35% with a reusable typed React component library, and architected 15+ REST, SOAP and GraphQL APIs.",
  },
  {
    question: "How do you contact or hire Yasowant Nayak?",
    answer:
      "Email yasowant1998@gmail.com, use the contact form at yasowantdev.info, or reach him on LinkedIn at linkedin.com/in/yasowant-nayak or GitHub at github.com/Yasowant. His resume is available at yasowantdev.info/resume.pdf.",
  },
];
