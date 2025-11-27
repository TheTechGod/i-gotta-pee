// app/admin/bathrooms/FilterBar.tsx
"use client";

import { useState, useEffect } from "react";

type Bathroom = {
  id: number;
  name: string;
  address: string;
  zip: string | null;
  neighborhood: string | null;
};

export default function FilterBar({ bathrooms }: { bathrooms: Bathroom[] }) {
  const [query, setQuery] = useState("");
  const [zipFilter, setZipFilter] = useState("");
  const [hoodFilter, setHoodFilter] = useState("");

  const uniqueZips = [...new Set(bathrooms.map((b) => b.zip).filter(Boolean))];
  const uniqueHoods = [
    ...new Set(bathrooms.map((b) => b.neighborhood).filter(Boolean)),
  ];

  function applyFilters(
    nextQuery = query,
    nextZip = zipFilter,
    nextHood = hoodFilter
  ) {
    const q = nextQuery.toLowerCase();

    document.querySelectorAll<HTMLTableRowElement>(".bathroom-row").forEach(
      (row) => {
        const text = row.innerText.toLowerCase();
        const rowZip = row.getAttribute("data-zip");
        const rowHood = row.getAttribute("data-hood");

        const matchesQuery = !q || text.includes(q);
        const matchesZip = !nextZip || rowZip === nextZip;
        const matchesHood = !nextHood || rowHood === nextHood;

        row.style.display =
          matchesQuery && matchesZip && matchesHood ? "" : "none";
      }
    );
  }

  // Re-apply filters whenever list changes (hot reload / new items)
  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bathrooms.length]);

  return (
    <section className="mb-6 bg-white border border-gray-200 rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">
        Filters
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Search (name or address)
          </label>
          <input
            type="text"
            placeholder="Walgreens, Target, 35th St..."
            className="p-2 border rounded-lg w-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={query}
            onChange={(e) => {
              const next = e.target.value;
              setQuery(next);
              applyFilters(next, zipFilter, hoodFilter);
            }}
          />
        </div>

        {/* ZIP */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            ZIP Code
          </label>
          <select
            className="p-2 border rounded-lg w-full text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={zipFilter}
            onChange={(e) => {
              const next = e.target.value;
              setZipFilter(next);
              applyFilters(query, next, hoodFilter);
            }}
          >
            <option value="">All ZIPs</option>
            {uniqueZips.map((zip) => (
              <option key={zip as string} value={zip as string}>
                {zip}
              </option>
            ))}
          </select>
        </div>

        {/* Neighborhood */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Neighborhood
          </label>
          <select
            className="p-2 border rounded-lg w-full text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={hoodFilter}
            onChange={(e) => {
              const next = e.target.value;
              setHoodFilter(next);
              applyFilters(query, zipFilter, next);
            }}
          >
            <option value="">All Neighborhoods</option>
            {uniqueHoods.map((hood) => (
              <option key={hood as string} value={hood as string}>
                {hood}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
