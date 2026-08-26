import { content as accessControlContent } from "./posts/access-control";
import { content as kafkaContent } from "./posts/kafka";
import { content as paginationContent } from "./posts/pagination";

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
    content: accessControlContent,
    date: "2026-05-07",
    readTime: "9 min read",
    category: "System Design",
    image:
      "https://cdn-images-1.medium.com/max/1024/1*Mw_mNuRMlleXqMvBdH73pA.png",
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
    content: kafkaContent,
    date: "2026-02-11",
    readTime: "10 min read",
    category: "Backend",
    image:
      "https://cdn-images-1.medium.com/max/1024/0*UA7QrRRXSyvx7Y7Z.png",
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
    content: paginationContent,
    date: "2026-02-10",
    readTime: "9 min read",
    category: "Frontend",
    image:
      "https://cdn-images-1.medium.com/max/1024/1*adDz_MxCpvO8rCoLq7Ab5Q.png",
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
