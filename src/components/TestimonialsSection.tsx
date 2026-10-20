import { motion } from "framer-motion";
import { Quote, Linkedin } from "lucide-react";
import { testimonials } from "@/data/testimonials";

const initials = (name: string) =>
  name.split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase();

const TestimonialsSection = () => {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="eyebrow mb-4">› cat reviews.md</span>
          <h2 className="text-3xl md:text-4xl font-bold">
            Kind <span className="gradient-text">words</span>
          </h2>
        </motion.div>

        <div className={`grid gap-5 ${testimonials.length > 1 ? "md:grid-cols-2" : ""} ${testimonials.length > 2 ? "lg:grid-cols-3" : ""}`}>
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card card-glow rounded-3xl p-7 flex flex-col"
            >
              <Quote className="w-8 h-8 text-primary/60 mb-4" />
              <blockquote className="text-foreground/90 leading-relaxed flex-1">“{t.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent font-bold text-white">
                  {initials(t.name)}
                </span>
                <span className="flex-1">
                  <span className="block font-semibold">{t.name}</span>
                  <span className="block text-sm text-muted-foreground">
                    {t.role}, {t.company}
                  </span>
                </span>
                {t.url && (
                  <a href={t.url} target="_blank" rel="noopener noreferrer" aria-label={`${t.name} on LinkedIn`} className="text-muted-foreground hover:text-primary">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
