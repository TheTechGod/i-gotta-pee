"use client";

import { useMemo, useState } from "react";
import type { MapBathroom } from "@/lib/types";

export function useZipFilter(bathrooms: MapBathroom[]) {
  const [zip, setZip] = useState<string>("");

  const filtered = useMemo(() => {
    if (!zip) return bathrooms;

    return bathrooms.filter(
      (b) => b.zip === zip
    );
  }, [bathrooms, zip]);

  return {
    zip,
    setZip,
    filtered,
  };
}
