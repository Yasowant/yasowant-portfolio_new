const EMAIL = "yasowant1998@gmail.com";

/**
 * Fixed vertical email on the right edge — mirrors the left SocialSidebar.
 * The address is rotated 90° with a short line beneath it.
 */
const EmailSidebar = () => {
  return (
    <div className="fixed right-6 bottom-0 z-40 hidden md:flex flex-col items-center gap-6">
      <a
        href={`mailto:${EMAIL}`}
        className="text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all duration-300 tracking-widest text-sm"
        style={{ writingMode: "vertical-rl" }}
      >
        {EMAIL}
      </a>
      <div className="w-px h-24 bg-border" />
    </div>
  );
};

export default EmailSidebar;
