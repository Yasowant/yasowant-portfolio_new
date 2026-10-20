import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { scrollToTopInstant } from "@/lib/smoothScroll";

/** Start every new route at the top of the page (hash jumps are left alone). */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    scrollToTopInstant();
  }, [pathname]);
  return null;
};

export default ScrollToTop;
