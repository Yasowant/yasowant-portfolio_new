import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Zap,
  Globe,
  MessageSquare,
  Award,
  Layout,
  Cloud,
  Check,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Full Stack Web Development",
    description:
      "End-to-end web applications built with React, Node.js, and modern databases — from schema to deployment.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    features: [
      "React + Node.js architecture",
      "Database design & REST/GraphQL APIs",
      "Auth, payments & third-party integrations",
    ],
    tags: ["React", "Node.js", "PostgreSQL", "TypeScript"],
    price: "From ₹40,000",
  },
  {
    icon: Zap,
    title: "API Development & Integration",
    description:
      "Robust REST & GraphQL APIs, third-party integrations, and clean microservices that scale.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    features: [
      "REST, SOAP & GraphQL endpoints",
      "Secure JWT + role-based access",
      "Stripe, payment & webhook integrations",
    ],
    tags: ["REST", "GraphQL", "Microservices", "JWT"],
    price: "From ₹25,000",
  },
  {
    icon: Layout,
    title: "Frontend & UI Engineering",
    description:
      "Pixel-perfect, responsive, and accessible interfaces with smooth animations and fast load times.",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
    features: [
      "Responsive, mobile-first layouts",
      "Reusable, typed component libraries",
      "40% faster loads via code splitting",
    ],
    tags: ["React", "Tailwind", "Framer Motion", "UI/UX"],
    price: "From ₹30,000",
  },
  {
    icon: Cloud,
    title: "Cloud, DevOps & CI/CD",
    description:
      "Dockerized deployments and automated pipelines on AWS that ship features faster and more reliably.",
    image:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80",
    features: [
      "Docker + GitHub Actions pipelines",
      "AWS deployment & configuration",
      "50% faster, repeatable releases",
    ],
    tags: ["AWS", "Docker", "GitHub Actions", "CI/CD"],
    price: "From ₹35,000",
  },
  {
    icon: MessageSquare,
    title: "Technical Consultation",
    description:
      "Architecture reviews, code audits, and hands-on technical guidance to keep your project healthy.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    features: [
      "Architecture & scalability review",
      "Code audit & performance profiling",
      "Best-practice & tech-stack guidance",
    ],
    tags: ["Architecture", "Code Review", "Performance"],
    price: "₹1,500/hour",
  },
  {
    icon: Award,
    title: "MVP Development",
    description:
      "Rapid prototyping to launch your idea fast — a production-ready MVP without cutting corners on quality.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    features: [
      "Idea to launch in weeks",
      "Scalable, production-ready foundation",
      "Clean handoff & documentation",
    ],
    tags: ["MVP", "Startup", "Rapid Dev", "Scalable"],
    price: "From ₹65,000",
  },
];

const FreelancerSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="freelance"
      className="section-padding bg-background relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="gradient-text">Freelance Services</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-6">
            Available for freelance projects and collaborations. Let's build
            something amazing together!
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-10 rounded-full" />

          {/* Services Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/15 transition-all duration-300 flex flex-col"
              >
                {/* Image banner */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                  {/* Icon badge */}
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    className="absolute bottom-3 left-4 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30 ring-2 ring-background"
                  >
                    <service.icon className="w-6 h-6 text-primary-foreground" />
                  </motion.div>
                  {/* Price badge */}
                  <span className="absolute top-3 right-3 px-3 py-1 text-xs font-mono font-semibold text-primary bg-background/80 backdrop-blur-sm border border-primary/30 rounded-full">
                    {service.price}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-2 min-h-[3.5rem] flex items-start group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed min-h-[5rem]">
                    {service.description}
                  </p>

                  {/* Feature list */}
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-foreground/85"
                      >
                        <Check className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto pt-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-[11px] font-medium text-muted-foreground bg-secondary/60 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-full hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1"
            >
              <MessageSquare className="w-5 h-5" />
              Let's Work Together
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FreelancerSection;
