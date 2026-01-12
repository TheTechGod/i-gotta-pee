// app/components/BodyFix.tsx
"use client";

import { useEffect } from "react";

export default function BodyFix() {
  useEffect(() => {
    // Remove any injected dev-overlay styles
    document.body.style.paddingRight = "0px";
    document.body.style.overflow = "auto";
  }, []);

  return null; // It doesn't render UI
}
