// components/ZipSearch.tsx
"use client";

import { useState } from "react";

type Props = {
  onSearch: (zip: string) => void;
};

export default function ZipSearch({ onSearch }: Props) {
  const [zip, setZip] = useState("");

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={zip}
        onChange={(e) => setZip(e.target.value)}
        placeholder="Enter ZIP code"
        className="border rounded px-3 py-2 w-40"
      />

      <button
        onClick={() => onSearch(zip)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
}
