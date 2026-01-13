// components/ZipSearch.tsx
"use client";

import { useState, useEffect } from "react";

type Props = {
  value: string;
  onSearch: (zip: string) => void;
};

export default function ZipSearch({ value, onSearch }: Props) {
  const [input, setInput] = useState(value);

  // Keep input synced with URL changes
  useEffect(() => {
    setInput(value);
  }, [value]);

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Filter by ZIP"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border rounded px-3 py-2 w-40"
      />

      <button
        onClick={() => onSearch(input.trim())}
        className="px-4 py-2 border rounded hover:bg-gray-200"
      >
        Filter
      </button>
    </div>
  );
}
