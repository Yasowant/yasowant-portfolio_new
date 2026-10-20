import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  User, Code2, Bot, FolderGit2, Github, Briefcase, Route, BookOpen, HelpCircle, Mail,
  Download, Copy, SunMoon, CalendarClock, Newspaper, Clock, Linkedin, Instagram, Twitter,
  ArrowUpRight, Sparkles, Layers,
} from "lucide-react";
import { toast } from "sonner";
import { COMMAND_OPEN_EVENT } from "@/lib/commandBus";
import { cycleThemeFrom } from "@/lib/theme";
import { openAIChat } from "@/lib/aiChatBus";
import { goToSection } from "@/lib/goTo";
import { BOOKING_URL, EMAIL } from "@/lib/booking";
import { projects } from "@/data/projectsData";
import { blogPosts } from "@/data/blogData";
import { hireServices } from "@/data/servicesData";

const sections = [
  { name: "About", hash: "#about", icon: User },
  { name: "Skills", hash: "#skills", icon: Code2 },
  { name: "AI & LLM work", hash: "#ai", icon: Bot },
  { name: "Projects", hash: "#projects", icon: FolderGit2 },
  { name: "GitHub activity", hash: "#github", icon: Github },
  { name: "Freelance services", hash: "#freelance", icon: Briefcase },
  { name: "Experience", hash: "#experience", icon: Route },
  { name: "Blog", hash: "#blog", icon: BookOpen },
  { name: "FAQ", hash: "#faq", icon: HelpCircle },
  { name: "Contact", hash: "#contact", icon: Mail },
];

const socials = [
  { name: "GitHub", url: "https://github.com/Yasowant", icon: Github },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/yasowant-nayak", icon: Linkedin },
  { name: "Instagram @yasowant.dev", url: "https://www.instagram.com/yasowant.dev/", icon: Instagram },
  { name: "X / Twitter", url: "https://x.com/yash2062", icon: Twitter },
  { name: "Medium", url: "https://medium.com/@yasowant1998", icon: Newspaper },
];

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(COMMAND_OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(COMMAND_OPEN_EVENT, onOpen);
    };
  }, []);

  const run = (fn: () => void) => {
    setOpen(false);
    // Let the dialog close before scrolling/navigating.
    setTimeout(fn, 60);
  };

  const external = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[90] bg-background/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed left-1/2 top-[14vh] z-[91] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl shadow-primary/20 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          aria-describedby={undefined}
        >
          <DialogPrimitive.Title className="sr-only">Command menu</DialogPrimitive.Title>
          <Command
            loop
            className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-input]]:h-14 [&_[cmdk-item]]:px-3 [&_[cmdk-item]]:py-2.5 [&_[cmdk-item]]:rounded-lg [&_[cmdk-item]]:gap-3 [&_[cmdk-item]_svg]:h-4 [&_[cmdk-item]_svg]:w-4 [&_[cmdk-item][data-selected=true]]:bg-primary/10 [&_[cmdk-item][data-selected=true]]:text-foreground"
          >
            <div className="flex items-center gap-2 px-4 pt-3 font-mono text-xs text-muted-foreground">
              <span className="text-accent">›</span> yasowant.dev
            </div>
            <CommandInput placeholder="Type a command or search…" />
            <CommandList className="max-h-[min(60vh,420px)] pb-2">
              <CommandEmpty>No results. Try “projects”, “resume” or “contact”.</CommandEmpty>

              <CommandGroup heading="Quick actions">
                <CommandItem onSelect={() => run(() => (BOOKING_URL ? external(BOOKING_URL) : goToSection("#contact", navigate, pathname)))}>
                  <CalendarClock /> Book a 15-min call
                </CommandItem>
                <CommandItem onSelect={() => run(() => openAIChat())}>
                  <Sparkles /> Ask my AI assistant
                </CommandItem>
                <CommandItem
                  onSelect={() =>
                    run(() => {
                      const a = document.createElement("a");
                      a.href = "/resume.pdf";
                      a.download = "Yasowant_Nayak_Full_Stack_Engineer_Resume.pdf";
                      a.click();
                    })
                  }
                >
                  <Download /> Download resume
                </CommandItem>
                <CommandItem
                  onSelect={() =>
                    run(() => {
                      navigator.clipboard?.writeText(EMAIL).then(
                        () => toast.success("Email copied", { description: EMAIL }),
                        () => toast(EMAIL),
                      );
                    })
                  }
                >
                  <Copy /> Copy email address
                </CommandItem>
                <CommandItem onSelect={() => run(() => cycleThemeFrom())}>
                  <SunMoon /> Switch theme
                  <CommandShortcut>light · dark · eye</CommandShortcut>
                </CommandItem>
              </CommandGroup>

              <CommandSeparator />
              <CommandGroup heading="Go to">
                {sections.map(({ name, hash, icon: Icon }) => (
                  <CommandItem key={hash} value={`section ${name}`} onSelect={() => run(() => goToSection(hash, navigate, pathname))}>
                    <Icon /> {name}
                  </CommandItem>
                ))}
                <CommandItem value="page all projects" onSelect={() => run(() => navigate("/projects"))}>
                  <Layers /> All projects page
                </CommandItem>
                <CommandItem value="page blog articles" onSelect={() => run(() => navigate("/blog"))}>
                  <BookOpen /> All articles page
                </CommandItem>
                <CommandItem value="page now" onSelect={() => run(() => navigate("/now"))}>
                  <Clock /> What I'm doing now
                </CommandItem>
              </CommandGroup>

              <CommandSeparator />
              <CommandGroup heading="Projects">
                {projects.map((p) => (
                  <CommandItem key={p.slug} value={`project ${p.shortName} ${p.tagline} ${p.tech.join(" ")}`} onSelect={() => run(() => navigate(`/projects/${p.slug}`))}>
                    <FolderGit2 />
                    <span className="truncate">{p.shortName}</span>
                    <span className="ml-1 truncate text-xs text-muted-foreground">{p.tagline}</span>
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandGroup heading="Articles">
                {blogPosts.map((post) => (
                  <CommandItem key={post.slug} value={`article ${post.title} ${post.tags.join(" ")}`} onSelect={() => run(() => navigate(`/blog/${post.slug}`))}>
                    <Newspaper />
                    <span className="truncate">{post.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandGroup heading="Hire me for">
                {hireServices.map((s) => (
                  <CommandItem key={s.slug} value={`hire ${s.slug.replace(/-/g, " ")}`} onSelect={() => run(() => navigate(`/hire/${s.slug}`))}>
                    <Briefcase />
                    <span>{s.title.split(" — ")[0]}</span>
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandGroup heading="Elsewhere">
                {socials.map(({ name, url, icon: Icon }) => (
                  <CommandItem key={url} value={`social ${name}`} onSelect={() => run(() => external(url))}>
                    <Icon /> {name}
                    <ArrowUpRight className="ml-auto opacity-50" />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-[11px] font-mono text-muted-foreground">
              <span>↑↓ navigate · ↵ open · esc close</span>
              <span className="gradient-text font-bold">›y_</span>
            </div>
          </Command>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default CommandPalette;
