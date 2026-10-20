import { techIcons, type TechIconName } from "@/lib/techIcons";

interface TechIconProps {
  name: TechIconName;
  className?: string;
  /** "brand" uses the official colour (near-black brands fall back to text colour). */
  tone?: "brand" | "current";
}

const DARK_BRANDS = new Set(["#000000", "#181717", "#1C3C3C", "#232F3E"]);

const TechIcon = ({ name, className = "w-4 h-4", tone = "brand" }: TechIconProps) => {
  const icon = techIcons[name];
  const fill =
    tone === "current" || DARK_BRANDS.has(icon.hex.toUpperCase()) ? "currentColor" : icon.hex;
  return (
    <svg viewBox="0 0 24 24" className={className} role="img" aria-label={icon.title} fill={fill}>
      <path d={icon.path} />
    </svg>
  );
};

export default TechIcon;
