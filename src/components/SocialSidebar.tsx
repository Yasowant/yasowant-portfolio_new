import { Github, Twitter, Linkedin } from 'lucide-react';

const socials = [
  {
    icon: Github,
    href: 'https://github.com/Yasowant',
    label: 'GitHub',
  },
  {
    icon: Twitter,
    href: 'https://twitter.com/Yasowant',
    label: 'Twitter',
  },
  {
    icon: Linkedin,
    href: 'https://linkedin.com/in/yasowant-nayak',
    label: 'LinkedIn',
  },
];

const SocialSidebar = () => {
  return (
    <div className="fixed left-6 bottom-0 z-40 hidden md:flex flex-col items-center gap-6">
      {socials.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all duration-300"
        >
          <Icon className="w-5 h-5" />
        </a>
      ))}
      <div className="w-px h-24 bg-border" />
    </div>
  );
};

export default SocialSidebar;
