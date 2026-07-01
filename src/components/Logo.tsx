import { useId } from "react";

interface LogoProps {
  /** Rendered height in pixels. Width scales with the aspect ratio. */
  height?: number;
  className?: string;
  /** Show the "Yasowant Nayak" name next to the mark. */
  showName?: boolean;
}

/**
 * Hexagon monogram logo for Yasowant Nayak.
 * A thin geometric hexagon frames a stroked "Y" mark, all painted with
 * the site's blue→green brand gradient.
 */
const Logo = ({ height = 30, className = "", showName = false }: LogoProps) => {
  const id = useId();
  const gradId = `logo-grad-${id}`;

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={height}
        height={height}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Yasowant Nayak — home"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#388bfd" />
            <stop offset="100%" stopColor="#3fb950" />
          </linearGradient>
        </defs>

        {/* Hexagon frame */}
        <path
          d="M24 3 L42 13.5 L42 34.5 L24 45 L6 34.5 L6 13.5 Z"
          stroke={`url(#${gradId})`}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Y monogram */}
        <path
          d="M16 16 L24 25 L32 16 M24 25 L24 34"
          stroke={`url(#${gradId})`}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {showName && (
        <span className="font-semibold text-lg tracking-tight gradient-text">
          Yasowant Nayak
        </span>
      )}
    </span>
  );
};

export default Logo;
