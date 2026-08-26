import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { projects } from '@/data/projectsData';
import { hireServices } from '@/data/servicesData';

/**
 * The footer is also the site's internal link graph. Every indexable route is
 * reachable from every page through it, so nothing depends on the homepage
 * being crawled first.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-4 md:px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          <div className="flex flex-col items-start gap-3">
            <Logo height={26} />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Yasowant Nayak is a Full Stack Software Engineer in Bangalore,
              India, available for remote freelance and contract work worldwide.
            </p>
            <div className="flex items-center gap-4 mt-1">
              <a
                href="https://github.com/Yasowant"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/yasowant-nayak"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:yasowant1998@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <nav aria-label="Projects">
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
              Projects
            </h2>
            <ul className="space-y-2.5">
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="text-sm text-foreground/80 hover:text-primary transition-colors"
                  >
                    {project.shortName}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/projects"
                  className="text-sm text-primary font-medium hover:underline"
                >
                  All case studies
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Services">
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
              Hire
            </h2>
            <ul className="space-y-2.5">
              {hireServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/hire/${service.slug}`}
                    className="text-sm text-foreground/80 hover:text-primary transition-colors"
                  >
                    {service.heading}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/#contact"
                  className="text-sm text-foreground/80 hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="More">
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
              More
            </h2>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/blog"
                  className="text-sm text-foreground/80 hover:text-primary transition-colors"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  to="/now"
                  className="text-sm text-foreground/80 hover:text-primary transition-colors"
                >
                  What I'm doing now
                </Link>
              </li>
              <li>
                <a
                  href="/resume.pdf"
                  className="text-sm text-foreground/80 hover:text-primary transition-colors"
                >
                  Resume (PDF)
                </a>
              </li>
              <li>
                <Link
                  to="/#faq"
                  className="text-sm text-foreground/80 hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 border-t border-border">
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>by</span>
            <span className="text-primary font-semibold">Yasowant Nayak</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © {currentYear} Yasowant Nayak. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
