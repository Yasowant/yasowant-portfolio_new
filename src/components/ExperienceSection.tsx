import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Server,
  Calendar,
  MapPin,
  Award,
} from "lucide-react";

const ExperienceSection = () => {
  const experiences = [
    {
      type: "work",
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
      color: "from-primary to-primary/70",
    },
    {
      type: "work",
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
      color: "from-orange-500 to-yellow-500",
    },
    {
      type: "education",
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
      color: "from-green-500 to-emerald-500",
    },
    {
      type: "education",
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
      color: "from-blue-500 to-cyan-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section id="experience" className="py-12 md:py-16 lg:py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="gradient-text">Journey</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6 rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            3+ years of experience in full stack development, from electrical
            engineering roots to building modern, scalable web applications
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent transform md:-translate-x-1/2" />

          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative flex items-start mb-12 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 6 }}
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${exp.color} flex items-center justify-center shadow-lg shadow-primary/30 ring-4 ring-background`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                    {index === 0 && (
                      <span className="absolute inset-0 rounded-full ring-2 ring-primary/50 animate-ping" />
                    )}
                  </motion.div>
                </div>

                {/* Content card */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`ml-24 md:ml-0 md:w-[calc(50%-3rem)] ${
                    isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                  }`}
                >
                  <div className="glass-card rounded-2xl p-6 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
                    {/* Header */}
                    <div className="mb-4">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                          <Calendar className="w-3.5 h-3.5" />
                          {exp.period}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary/60 text-muted-foreground text-xs font-medium">
                          <MapPin className="w-3.5 h-3.5" />
                          {exp.location}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground">
                        {exp.title}
                      </h3>
                      <p
                        className={`text-transparent bg-clip-text bg-gradient-to-r ${exp.color} font-semibold`}
                      >
                        {exp.company}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2">
                      {exp.highlights.map((highlight, hIndex) => (
                        <motion.div
                          key={hIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: hIndex * 0.1 }}
                          className="flex items-center gap-2 text-sm"
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${exp.color}`}
                          />
                          <span className="text-foreground/80">
                            {highlight}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Summary stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "3+", label: "Years Experience" },
            { value: "50+", label: "Projects Completed" },
            { value: "2", label: "Degrees/Diplomas" },
            { value: "∞", label: "Learning Never Stops" },
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
