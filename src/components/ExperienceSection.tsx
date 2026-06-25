import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import {
  Briefcase,
  GraduationCap,
  Server,
  Calendar,
  MapPin,
  Award,
  CheckCircle2,
} from "lucide-react";

const experiences = [
  {
    type: "Work Experience",
    title: "Software Developer",
    company: "DealDox Software Pvt Ltd",
    period: "Aug 2023 - Present",
    location: "Bangalore, India",
    description:
      "Owning delivery end-to-end on a multi-tenant SaaS platform serving 8+ enterprise organizations, with a focus on scalability, high availability, and secure data isolation.",
    highlights: [
      "Cut feature dev time 35% with a reusable React component library",
      "Reduced page loads 40% via code splitting, lazy loading & memoization",
      "Accelerated releases 50% with GitHub Actions + Docker CI/CD on AWS",
      "Designed 15+ REST, SOAP & GraphQL endpoints; JWT + RBAC for 5+ roles",
    ],
    icon: Briefcase,
    color: "from-primary to-accent",
  },
  {
    type: "Work Experience",
    title: "Full Stack Developer",
    company: "JSpiders – Training & Development Institute",
    period: "Sep 2022 - Jul 2023",
    location: "Bangalore, India",
    description:
      "Built mobile-first, cross-browser React.js interfaces and scalable backend logic in Java, applying object-oriented design and RESTful API patterns.",
    highlights: [
      "Raised user engagement 20% with responsive, cross-browser UIs",
      "Increased online sales 30% with a full-stack e-commerce app",
      "Designed RESTful APIs and CRUD operations with authentication",
      "Applied OOP design to keep backend modules maintainable",
    ],
    icon: Server,
    color: "from-sky-500 to-cyan-400",
  },
  {
    type: "Education",
    title: "B.Tech, Electrical Engineering",
    company: "Galgotias College of Engineering & Technology",
    period: "2016 - 2019",
    location: "Greater Noida, India",
    description:
      "Strong foundation in engineering principles and analytical problem-solving that translates directly into software system design.",
    highlights: [
      "System & Circuit Design",
      "Analytical Problem Solving",
      "Mathematics & Logic",
      "Project Management",
    ],
    icon: GraduationCap,
    color: "from-indigo-500 to-blue-500",
  },
  {
    type: "Education",
    title: "Diploma, Electrical Engineering",
    company: "Utkalmani Gopabandhu Institute of Engineering",
    period: "2013 - 2016",
    location: "Rourkela, India",
    description:
      "Built core technical fundamentals and a hands-on, practical approach to solving real-world engineering problems.",
    highlights: [
      "Electrical Systems & Circuits",
      "Industrial Automation",
      "Technical Problem Solving",
      "Teamwork & Collaboration",
    ],
    icon: Award,
    color: "from-cyan-500 to-teal-400",
  },
];

const ExperienceSection = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 60%"],
  });
  const lineScaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      className="py-12 md:py-16 lg:py-20 px-4 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="gradient-text">Journey</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6 rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From electrical engineering roots to building modern, scalable SaaS —
            here's the path so far.
          </p>
        </motion.div>

        <div ref={timelineRef} className="relative">
          {/* Base timeline line */}
          <div className="absolute left-8 md:left-1/2 top-2 bottom-2 w-px bg-border md:-translate-x-1/2" />
          {/* Animated fill line */}
          <motion.div
            style={{ scaleY: lineScaleY }}
            className="absolute left-8 md:left-1/2 top-2 bottom-2 w-px origin-top bg-gradient-to-b from-primary via-accent to-primary md:-translate-x-1/2 shadow-[0_0_12px_hsl(var(--primary)/0.6)]"
          />

          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            const isLeft = index % 2 === 0;
            const isCurrent = index === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className={`relative flex items-start mb-10 last:mb-0 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline node */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10 top-1">
                  <motion.div
                    whileHover={{ scale: 1.12, rotate: 6 }}
                    className={`relative w-12 h-12 rounded-full bg-gradient-to-br ${exp.color} flex items-center justify-center shadow-lg shadow-primary/30 ring-4 ring-background`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                    {isCurrent && (
                      <span className="absolute inset-0 rounded-full ring-2 ring-primary/60 animate-ping" />
                    )}
                  </motion.div>
                </div>

                {/* Content card */}
                <motion.div
                  whileHover={{ y: -6 }}
                  className={`ml-24 md:ml-0 md:w-[calc(50%-3rem)] ${
                    isLeft ? "md:mr-auto md:pr-10" : "md:ml-auto md:pl-10"
                  }`}
                >
                  <div className="glass-card rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/15 hover:border-primary/40">
                    {/* Gradient top accent */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${exp.color}`}
                    />

                    {/* Tag row */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">
                        {exp.type}
                      </span>
                      {isCurrent && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-[11px] font-semibold">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                          </span>
                          Currently here
                        </span>
                      )}
                    </div>

                    {/* Title + company */}
                    <h3 className="text-xl font-bold text-foreground leading-snug">
                      {exp.title}
                    </h3>
                    <p
                      className={`text-transparent bg-clip-text bg-gradient-to-r ${exp.color} font-semibold`}
                    >
                      {exp.company}
                    </p>

                    {/* Meta pills */}
                    <div className="flex flex-wrap items-center gap-2 mt-3 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.period}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary/60 text-muted-foreground text-xs font-medium">
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2.5">
                      {exp.highlights.map((highlight, hIndex) => (
                        <motion.li
                          key={hIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: hIndex * 0.08 }}
                          className="flex items-start gap-2.5 text-sm"
                        >
                          <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                          <span className="text-foreground/85">{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {[
            { value: "3+", label: "Years Experience" },
            { value: "8+", label: "Enterprise Orgs Served" },
            { value: "40%", label: "Faster Page Loads" },
            { value: "50%", label: "Faster Releases" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -4 }}
              className="text-center p-5 glass-card rounded-2xl"
            >
              <div className="text-3xl font-bold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
