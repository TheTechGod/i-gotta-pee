// app/admin/bathrooms/FilterBar.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import type { Bathroom } from "@/app/types/Bathroom";

type Props = {
  bathrooms: Bathroom[];
};

export default function FilterBar({ bathrooms }: Props) {
  const [query, setQuery] = useState("");
  const [zipFilter, setZipFilter] = useState("");
  const [hoodFilter, setHoodFilter] = useState("");

  const uniqueZips = useMemo(() => {
    return Array.from(
      new Set(bathrooms.map((b) => b.zip).filter((v): v is string => !!v))
    ).sort();
  }, [bathrooms]);

  const uniqueHoods = useMemo(() => {
    return Array.from(
      new Set(
        bathrooms
          .map((b) => b.neighborhood)
          .filter((v): v is string => !!v)
      )
    ).sort();
  }, [bathrooms]);

  function applyFilters(
    nextQuery = query,
    nextZip = zipFilter,
    nextHood = hoodFilter
  ) {
    const q = nextQuery.trim().toLowerCase();

    document.querySelectorAll<HTMLTableRowElement>(".bathroom-row").forEach(
      (row) => {
        const text = (row.innerText || "").toLowerCase();
        const rowZip = row.getAttribute("data-zip") || "";
        const rowHood = row.getAttribute("data-hood") || "";

        const matchesQuery = !q || text.includes(q);
        const matchesZip = !nextZip || rowZip === nextZip;
        const matchesHood = !nextHood || rowHood === nextHood;

        row.style.display =
          matchesQuery && matchesZip && matchesHood ? "" : "none";
      }
    );
  }

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bathrooms.length]);

  return (
    <section className="mb-6 bg-white border border-gray-200 rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Filters</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Search (name or address)
          </label>
          <input
            type="text"
            placeholder="Target, Library, Main St..."
            className="p-2 border rounded-lg w-full"
            value={query}
            onChange={(e) => {
              const next = e.target.value;
              setQuery(next);
              applyFilters(next, zipFilter, hoodFilter);
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">ZIP Code</label>
          <select
            className="p-2 border rounded-lg w-full"
            value={zipFilter}
            onChange={(e) => {
              const next = e.target.value;
              setZipFilter(next);
              applyFilters(query, next, hoodFilter);
            }}
          >
            <option value="">All ZIPs</option>
            {uniqueZips.map((zip) => (
              <option key={zip} value={zip}>
                {zip}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Neighborhood
          </label>
          <select
            className="p-2 border rounded-lg w-full"
            value={hoodFilter}
            onChange={(e) => {
              const next = e.target.value;
              setHoodFilter(next);
              applyFilters(query, zipFilter, next);
            }}
          >
            <option value="">All Neighborhoods</option>
            {uniqueHoods.map((hood) => (
              <option key={hood} value={hood}>
                {hood}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
