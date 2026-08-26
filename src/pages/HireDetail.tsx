import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowUpRight, MapPin } from "lucide-react";
import { getHireServiceBySlug, hireServices } from "@/data/servicesData";
import { useRegion } from "@/hooks/useRegion";
import { formatPrice, getRegion } from "@/lib/pricing";
import PageShell from "@/components/PageShell";
import { usePageMeta, SITE_URL, PERSON_ID } from "@/hooks/usePageMeta";

const HireDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getHireServiceBySlug(slug) : undefined;
  const { region } = useRegion();

  if (!service) return <Navigate to="/404" replace />;

  const canonical = `${SITE_URL}/hire/${service.slug}`;
  const currentRegion = getRegion(region);
  const price = formatPrice(service.priceKey, region);
  const others = hireServices.filter((s) => s.slug !== service.slug);

  usePageMeta({
    title: service.title,
    description: service.metaDescription,
    canonical,
    type: "profile",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: service.heading,
        description: service.answer,
        url: canonical,
        serviceType: service.heading,
        provider: { "@id": PERSON_ID },
        areaServed: [
          "India",
          "United Kingdom",
          "United States",
          "Europe",
          "Canada",
          "Australia",
          "United Arab Emirates",
          "Singapore",
        ].map((name) => ({ "@type": "Country", name })),
        availableLanguage: ["English", "Hindi"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${service.heading} — what is included`,
          itemListElement: service.whatYouGet.map((item) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: item },
          })),
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        mainEntity: service.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Hire", item: `${SITE_URL}/#freelance` },
          { "@type": "ListItem", position: 3, name: service.heading, item: canonical },
        ],
      },
    ],
  });

  return (
    <PageShell
      crumbs={[
        { label: "Home", to: "/" },
        { label: "Hire", to: "/#freelance" },
        { label: service.heading },
      ]}
    >
      <article>
        <header className="max-w-3xl mb-14">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{service.heading}</span>
          </h1>
          <p className="text-xl text-foreground/80 mb-6">{service.tagline}</p>

          {/* Answer block — self-contained, entity named, no pronouns. */}
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            {service.answer}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="mailto:yasowant1998@gmail.com"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              Start a project <ArrowUpRight className="w-4 h-4" />
            </a>
            <div className="text-sm">
              <span className="block font-mono text-primary text-base">{price}</span>
              <span className="flex items-center gap-1 text-muted-foreground text-xs">
                <MapPin className="w-3 h-3" />
                priced for {currentRegion.label} · adjust on the homepage
              </span>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-[1fr_320px] gap-12 items-start">
          <div className="space-y-14">
            <section>
              <h2 className="text-2xl font-bold mb-5">What you get</h2>
              <ul className="space-y-3">
                {service.whatYouGet.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border"
                  >
                    <Check className="w-4 h-4 mt-1 text-primary shrink-0" />
                    <span className="text-foreground/85">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-5">How the work runs</h2>
              <ol className="space-y-4">
                {service.process.map((phase, i) => (
                  <motion.li
                    key={phase.step}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="flex gap-4"
                  >
                    <span className="shrink-0 w-9 h-9 rounded-full bg-primary/10 text-primary font-mono text-sm flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold mb-1">{phase.step}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {phase.detail}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-5">
                Frequently asked questions
              </h2>
              <div className="space-y-4">
                {service.faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="p-5 rounded-xl bg-card border border-border"
                  >
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28">
            <div className="bg-card rounded-xl p-6 border border-border">
              <h2 className="text-lg font-bold mb-3">This is a good fit if</h2>
              <ul className="space-y-2.5">
                {service.goodFit.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-3.5 h-3.5 mt-1 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <h2 className="text-lg font-bold mb-4">Stack</h2>
              <div className="flex flex-wrap gap-2">
                {service.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm font-mono text-primary bg-primary/10 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <h2 className="text-lg font-bold mb-4">Other services</h2>
              <ul className="space-y-3">
                {others.map((other) => (
                  <li key={other.slug}>
                    <Link to={`/hire/${other.slug}`} className="group block">
                      <span className="font-medium text-sm group-hover:text-primary transition-colors">
                        {other.heading}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {other.tagline}
                      </span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/projects" className="group block">
                    <span className="font-medium text-sm group-hover:text-primary transition-colors">
                      See shipped work
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      Four production applications
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </article>
    </PageShell>
  );
};

export default HireDetail;
