"use client";

import { ChangeEvent, KeyboardEvent } from "react";

type Props = {
  value: string;
  onSearch: (zip: string) => void;
};

export default function ZipSearch({ value, onSearch }: Props) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onSearch(e.target.value);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      onSearch(value.trim());
    }
  }

  return (
    <div className="flex gap-2 items-center">
      <input
        type="text"
        value={value}
        placeholder="Filter by ZIP"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        inputMode="numeric"
        className="border rounded px-3 py-2 w-40"
      />

      <button
        type="button"
        onClick={() => onSearch(value.trim())}
        className="px-4 py-2 border rounded hover:bg-gray-200"
      >
        Filter
      </button>
    </div>
  );
}
