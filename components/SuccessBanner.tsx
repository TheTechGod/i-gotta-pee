// components/SuccessBanner.tsx
"use client";

import { useEffect, useState } from "react";

export default function SuccessBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);

    const added = params.get("added") === "1";
    const updated = params.get("updated") === "1";
    const deleted = params.get("deleted") === "1";

    if (added || updated || deleted) {
      setShow(true);

      // Auto-hide after 5 seconds
      const timeout = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(timeout);
    }
  }, []);

  if (!show) return null;

  // Pick message
  const params = new URLSearchParams(window.location.search);
  const added = params.get("added") === "1";
  const updated = params.get("updated") === "1";
  const deleted = params.get("deleted") === "1";

  const message = added
    ? "Bathroom added successfully ✔"
    : updated
    ? "Bathroom updated successfully ✔"
    : deleted
    ? "Bathroom deleted successfully ✔"
    : null;

  return (
    <div
      className={`
        mb-4 p-3 rounded-lg border 
        shadow-md text-white bg-green-700 border-green-800 
        slide-in
      `}
    >
      {message}
    </div>
  );
}


