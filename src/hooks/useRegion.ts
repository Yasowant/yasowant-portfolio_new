import { useCallback, useEffect, useState } from "react";
import { DEFAULT_REGION, detectRegion, REGIONS, type RegionCode } from "@/lib/pricing";

const STORAGE_KEY = "pricing-region";

export function useRegion() {
  const [region, setRegionState] = useState<RegionCode>(DEFAULT_REGION);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* storage unavailable */
    }
    if (saved && REGIONS.some((r) => r.code === saved)) {
      setRegionState(saved as RegionCode);
      setAuto(false);
    } else {
      setRegionState(detectRegion());
      setAuto(true);
    }
  }, []);

  const setRegion = useCallback((code: RegionCode) => {
    setRegionState(code);
    setAuto(false);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
  }, []);

  return { region, setRegion, auto };
}
