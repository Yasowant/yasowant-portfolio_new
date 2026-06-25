import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Globe, MessageSquare, Award } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Full Stack Web Development",
    description:
      "End-to-end web application development using React, Node.js, and modern databases.",
    price: "From ₹40,000",
  },
  {
    icon: Zap,
    title: "API Development & Integration",
    description:
      "Custom REST APIs, third-party integrations, and microservices architecture.",
    price: "From ₹25,000",
  },
  {
    icon: MessageSquare,
    title: "Technical Consultation",
    description:
      "Architecture review, code audits, and technical guidance for your projects.",
    price: "₹1,500/hour",
  },
  {
    icon: Award,
    title: "MVP Development",
    description:
      "Rapid prototyping and MVP development to bring your ideas to life quickly.",
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
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-6 rounded-2xl bg-card border border-border group-hover:border-primary/50 transition-all h-full">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <motion.div
                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center"
                        whileHover={{ rotate: 10 }}
                      >
                        <service.icon className="w-6 h-6 text-primary-foreground" />
                      </motion.div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                        {service.description}
                      </p>
                      <span className="inline-block px-3 py-1 text-sm font-mono text-primary bg-primary/10 rounded-full">
                        {service.price}
                      </span>
                    </div>
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
