import { useId } from "react";

interface LogoProps {
  /** Rendered height of the mark in pixels. */
  height?: number;
  className?: string;
  /** Show the "Yasowant.dev" wordmark next to the mark (same lockup as the reels). */
  showName?: boolean;
}

/**
 * Brand mark for Yasowant.dev — a terminal prompt "›y_" inside a dark rounded
 * tile, painted with the blue→green brand gradient. The underscore cursor
 * blinks, the same as the logo ending used in the @yasowant.dev reels.
 */
const Logo = ({ height = 32, className = "", showName = true }: LogoProps) => {
  const id = useId().replace(/:/g, "");
  const gradId = `logo-grad-${id}`;

  return (
    <span className={`group/logo inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={height}
        height={height}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Yasowant.dev"
        className="shrink-0 drop-shadow-[0_4px_14px_hsl(var(--glow)/0.35)] transition-transform duration-300 group-hover/logo:-rotate-6"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#388bfd" />
            <stop offset="100%" stopColor="#3fb950" />
          </linearGradient>
        </defs>

        {/* Tile */}
        <rect x="1.5" y="1.5" width="45" height="45" rx="12" fill="#0d1117" />
        <rect x="1.5" y="1.5" width="45" height="45" rx="12" stroke={`url(#${gradId})`} strokeWidth="2" />

        {/* › prompt */}
        <path
          d="M11 16.5 L18 24 L11 31.5"
          stroke={`url(#${gradId})`}
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* y */}
        <path
          d="M22 18 L27.5 27 M33 18 L25.5 34"
          stroke={`url(#${gradId})`}
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* _ cursor */}
        <rect x="34" y="31" width="6" height="3.4" rx="1.2" fill="#3fb950" className="logo-cursor" />
      </svg>

      {showName && (
        <span className="font-mono font-bold text-[1.05rem] tracking-tight leading-none">
          <span className="text-foreground">Yasowant</span>
          <span className="gradient-text">.dev</span>
        </span>
      )}
    </span>
  );
};

export default Logo;
