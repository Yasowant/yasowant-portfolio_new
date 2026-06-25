export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  author: string;
  tags: string[];
  externalUrl?: string;
}

const MEDIUM_PROFILE = "https://medium.com/@yasowant1998";

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "access-control-models-every-backend-developer-should-know",
    title:
      "Understanding Access Control Models Every Backend Developer Should Know",
    excerpt:
      "Building secure and scalable applications with RBAC, ABAC, PBAC, FGAC, and ReBAC — with real-world examples and backend use cases for authentication and authorization.",
    content: `
## Building Secure and Scalable Applications with RBAC, ABAC, PBAC, FGAC, and ReBAC

In modern software systems, security is not just about login functionality. A secure application must also ensure that users can only access the resources and actions they are permitted to use. This is where authentication, authorization, and access control models become critical.

The article walks through Authentication, Authorization, RBAC, Fine-Grained Access Control (FGAC), ABAC, PBAC, and ReBAC — each with backend code examples and the use cases they fit best, from simple role checks to enterprise policy engines and relationship-based sharing.

> Read the full article on Medium for all code samples and the recommended hybrid architecture.
    `,
    date: "2026-05-07",
    readTime: "4 min read",
    category: "System Design",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop",
    author: "Yasowant Nayak",
    tags: ["RBAC", "ABAC", "Security", "Authorization", "Node.js"],
    externalUrl:
      "https://javascript.plainenglish.io/understanding-access-control-models-every-backend-developer-should-know-c14cd9a87e9d",
  },
  {
    id: 2,
    slug: "apache-kafka-explained-clearly",
    title:
      "Apache Kafka Explained Clearly: Why, Where, and How It Is Used",
    excerpt:
      "A clear, real-world walkthrough of Apache Kafka — producers, topics, partitions, consumer groups, and how event streaming powers scalable, fault-tolerant backend systems.",
    content: `
## Why Kafka, and Where It Fits

Modern applications generate massive amounts of data every second — clicks, payments, orders, notifications, and logs. Handling this reliably, at scale, and in real time is one of the biggest challenges in backend engineering.

This article breaks down Kafka as a distributed event-streaming platform: producers, topics, partitions, offsets, and consumer groups, how it stores data as an append-only log, how it stays fault tolerant through replication, and when you should — and shouldn't — reach for it.

> Read the full article on Medium for diagrams, code, and interview questions.
    `,
    date: "2026-02-11",
    readTime: "7 min read",
    category: "Backend",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
    author: "Yasowant Nayak",
    tags: ["Apache Kafka", "Backend", "Node.js", "Event Streaming"],
    externalUrl:
      "https://javascript.plainenglish.io/apache-kafka-explained-clearly-why-where-and-how-it-is-used-with-real-world-architecture-efc59ae6c0fa",
  },
  {
    id: 3,
    slug: "understanding-pagination-complete-guide",
    title:
      "Understanding Pagination: A Complete Guide for Developers",
    excerpt:
      "Pagination looks simple but is key to performance, usability, and scalability. A step-by-step guide covering frontend vs backend pagination, slice(), Math.ceil(), and dynamic page buttons in React.",
    content: `
## Pagination, Step by Step

Pagination divides a large dataset into smaller, manageable pages instead of loading everything at once. It improves user experience, performance, SEO, and mobile usability.

This guide covers frontend vs backend pagination, managing page state in React, the slice() method, the page calculation formula, computing total pages with Math.ceil(), rendering dynamic page buttons, and the common mistakes developers make.

> Read the full article on Medium for the complete React implementation.
    `,
    date: "2026-02-10",
    readTime: "6 min read",
    category: "Frontend",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    author: "Yasowant Nayak",
    tags: ["React", "Pagination", "Frontend", "Web Development"],
    externalUrl:
      "https://javascript.plainenglish.io/understanding-pagination-a-complete-guide-for-developers-beginner-to-intermediate-fa5163149b31",
  },
];

export const mediumProfileUrl = MEDIUM_PROFILE;

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};
