import { useId } from "react";

interface LogoProps {
  /** Rendered height in pixels. Width scales with the aspect ratio. */
  height?: number;
  className?: string;
  /** Show the "Yasowant Nayak" name next to the mark. */
  showName?: boolean;
}

/**
 * <YN/> developer wordmark.
 * The angle brackets are stroked paths (font-independent), the "YN" is bold
 * text, all filled with the site's blue→green brand gradient.
 */
const Logo = ({ height = 30, className = "", showName = false }: LogoProps) => {
  const id = useId();
  const gradId = `logo-grad-${id}`;
  const width = (height / 48) * 132;

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 132 48"
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

        {/* Left angle bracket  < */}
        <path
          d="M22 13 L9 24 L22 35"
          stroke={`url(#${gradId})`}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* YN */}
        <text
          x="66"
          y="33"
          textAnchor="middle"
          fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
          fontSize="27"
          fontWeight="800"
          letterSpacing="0.5"
          fill={`url(#${gradId})`}
        >
          YN
        </text>

        {/* Slash + right angle bracket  /> */}
        <path
          d="M95 36 L103 12"
          stroke={`url(#${gradId})`}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M110 13 L123 24 L110 35"
          stroke={`url(#${gradId})`}
          strokeWidth="4.5"
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
