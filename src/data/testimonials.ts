/**
 * Real testimonials only — from managers, teammates or freelance clients who
 * agreed to be quoted. The Testimonials section stays hidden while this list
 * is empty.
 *
 * Example shape:
 * {
 *   quote: "Yasowant rebuilt our tenant onboarding in two sprints…",
 *   name: "Full Name",
 *   role: "Engineering Manager",
 *   company: "Company",
 *   url: "https://www.linkedin.com/in/…", // optional — their LinkedIn makes it verifiable
 * }
 */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  url?: string;
}

export const testimonials: Testimonial[] = [];
