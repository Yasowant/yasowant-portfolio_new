import type { NavigateFunction } from "react-router-dom";
import { scrollToTarget } from "@/lib/smoothScroll";

/** Scroll to a homepage section from any route. */
export function goToSection(hash: string, navigate: NavigateFunction, pathname: string) {
  if (pathname !== "/") {
    navigate("/");
    setTimeout(() => scrollToTarget(hash), 120);
  } else {
    scrollToTarget(hash);
  }
}
