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
      title: "Full Stack Developer",
      company: "Dealdox",
      period: "2022 - Present",
      location: "India",
      description:
        "Building scalable web applications and managing cloud infrastructure. Developing end-to-end solutions using modern technologies.",
      highlights: [
        "Full stack development with React, Node.js, and databases",
        "AWS & Hostinger cloud deployment and management",
        "API development and third-party integrations",
        "Performance optimization and code reviews",
      ],
      icon: Briefcase,
      color: "from-primary to-primary/70",
    },
    {
      type: "work",
      title: "Cloud & DevOps",
      company: "AWS & Hostinger",
      period: "2022 - Present",
      location: "Remote",
      description:
        "Managing cloud infrastructure, deployments, and server configurations for various client projects.",
      highlights: [
        "AWS EC2, S3, Lambda, and RDS management",
        "Hostinger VPS and shared hosting setup",
        "CI/CD pipeline implementation",
        "SSL certificates and domain management",
      ],
      icon: Server,
      color: "from-orange-500 to-yellow-500",
    },
    {
      type: "education",
      title: "3 Years Lateral Entry Electrical Engineering",
      company: "Galgotias College of Engineering & Technology",
      period: "2016 - 2019",
      location: "Greater Noida, India",
      description:
        "Strong foundation in electrical engineering principles and practical problem-solving skills that translate well into software development.",
      highlights: [
        "Electrical Systems & Circuits",
        "Industrial Automation",
        "Technical Problem Solving",
        "Project Management",
      ],
      icon: GraduationCap,
      color: "from-green-500 to-emerald-500",
    },
    {
      type: "education",
      title: "Diploma in Electrical Engineering",
      company: "Utkalmani Gopabandhu Institute of Engineering",
      period: "2013 - 2016",
      location: "Rourkela, India",
      description:
        "Strong foundation in electrical engineering principles and practical problem-solving skills that translate well into software development.",
      highlights: [
        "Electrical Systems & Circuits",
        "Industrial Automation",
        "Technical Problem Solving",
        "Project Management",
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
    <section id="experience" className="py-20 px-4 relative overflow-hidden">
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
            My <span className="text-primary">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            3+ years of experience in full stack development, from electrical
            engineering roots to building modern web applications
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
                    whileHover={{ scale: 1.2 }}
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${exp.color} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>
                </div>

                {/* Content card */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`ml-24 md:ml-0 md:w-[calc(50%-3rem)] ${
                    isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                  }`}
                >
                  <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                    {/* Header */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.period}</span>
                        <span className="mx-2">•</span>
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
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
              whileHover={{ scale: 1.05 }}
              className="text-center p-4 bg-card/30 rounded-xl border border-border/30"
            >
              <div className="text-3xl font-bold text-primary mb-1">
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
