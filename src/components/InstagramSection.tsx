import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, ArrowUpRight, Code2, Sparkles, Bot, Rocket } from "lucide-react";

const IG_URL = "https://www.instagram.com/yasowant.dev/";

const topics = [
  { icon: Code2, label: "React & Node tips" },
  { icon: Bot, label: "AI / RAG builds" },
  { icon: Rocket, label: "Behind-the-scenes" },
  { icon: Sparkles, label: "Dev career advice" },
];

/** Follow-on-Instagram banner with the platform's signature gradient. */
const InstagramSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="instagram" className="py-8 md:py-10">
      <div ref={ref} className="container mx-auto px-4 md:px-6">
        <motion.a
          href={IG_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="group relative block overflow-hidden rounded-3xl p-[2px] bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af]"
        >
          <div className="relative rounded-[calc(1.5rem-2px)] bg-card px-6 py-8 md:px-10 md:py-10 overflow-hidden">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-[#f58529]/30 via-[#dd2a7b]/25 to-[#8134af]/30 blur-3xl transition-transform duration-700 group-hover:scale-125" aria-hidden="true" />

            <div className="relative flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#feda75] via-[#dd2a7b] to-[#515bd4] text-white shadow-lg shadow-[#dd2a7b]/30 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
                  <Instagram className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Follow along on Instagram</p>
                  <p className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] bg-clip-text text-transparent">
                    @yasowant.dev
                  </p>
                </div>
              </div>

              <div className="flex-1">
                <p className="text-muted-foreground mb-3">
                  Bite-sized posts and reels on full stack development, AI engineering and what I'm building next.
                </p>
                <div className="flex flex-wrap gap-2">
                  {topics.map(({ icon: Icon, label }) => (
                    <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium">
                      <Icon className="h-3.5 w-3.5 text-[#dd2a7b]" />
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              <span className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] px-6 py-3 font-semibold text-white shadow-lg shadow-[#dd2a7b]/25 transition-transform group-hover:scale-105 whitespace-nowrap">
                Follow
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  );
};

export default InstagramSection;
