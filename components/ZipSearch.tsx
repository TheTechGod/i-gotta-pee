// components/ZipSearch.tsx
"use client";

import { useState } from "react";

type Props = {
  defaultValue?: string;
  onSearch: (zip: string) => void;
};

export default function ZipSearch({
  defaultValue = "",
  onSearch,
}: Props) {
  const [value, setValue] = useState(defaultValue);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch(value.trim());
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 mt-4 items-center"
    >
      <input
        type="text"
        placeholder="Filter by ZIP"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border rounded px-3 py-2 w-32"
        inputMode="numeric"
      />

      <button
        type="submit"
        className="px-4 py-2 border rounded hover:bg-gray-200"
      >
        Filter
      </button>
    </form>
  );
}
