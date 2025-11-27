// app/admin/bathrooms/BathroomsClient.tsx
"use client";

import { useMemo, useState } from "react";

type Bathroom = {
  id: string | number;
  name: string;
  address: string;
  zip: string | null;
  neighborhood: string | null;
  latitude: number | string | null;
  longitude: number | string | null;
};

type Props = {
  bathrooms: Bathroom[];
};

type ViewMode = "table" | "cards";

export default function BathroomsClient({ bathrooms }: Props) {
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [search, setSearch] = useState("");
  const [zipFilter, setZipFilter] = useState("");
  const [hoodFilter, setHoodFilter] = useState("");

  const zips = useMemo(
    () =>
      Array.from(
        new Set(
          bathrooms
            .map((b) => (b.zip ?? "").toString().trim())
            .filter((z) => z.length > 0)
        )
      ).sort(),
    [bathrooms]
  );

  const neighborhoods = useMemo(
    () =>
      Array.from(
        new Set(
          bathrooms
            .map((b) => (b.neighborhood ?? "").toString().trim())
            .filter((h) => h.length > 0)
        )
      ).sort(),
    [bathrooms]
  );

  const filteredBathrooms = useMemo(() => {
    const q = search.toLowerCase().trim();

    return bathrooms.filter((b) => {
      const matchesSearch =
        q.length === 0 ||
        b.name.toLowerCase().includes(q) ||
        b.address.toLowerCase().includes(q);

      const matchesZip =
        zipFilter === "" || (b.zip ?? "").toString() === zipFilter;

      const matchesHood =
        hoodFilter === "" ||
        (b.neighborhood ?? "").toString() === hoodFilter;

      return matchesSearch && matchesZip && matchesHood;
    });
  }, [bathrooms, search, zipFilter, hoodFilter]);

  return (
    <div className="space-y-6">
      {/* Filter card */}
      <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 md:p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>

          {/* View toggle */}
          <div className="inline-flex rounded-full bg-gray-100 p-1 text-sm font-medium">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`px-3 py-1 rounded-full transition ${
                viewMode === "table"
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Table
            </button>
            <button
              type="button"
              onClick={() => setViewMode("cards")}
              className={`px-3 py-1 rounded-full transition ${
                viewMode === "cards"
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Cards
            </button>
          </div>
        </div>

        {/* Filter inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="search"
              className="text-xs font-semibold uppercase tracking-wide text-gray-600"
            >
              Search (Name or Address)
            </label>
            <input
              id="search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Type to search…"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 shadow-inner focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* ZIP */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="zipFilter"
              className="text-xs font-semibold uppercase tracking-wide text-gray-600"
            >
              Filter by ZIP
            </label>
            <select
              id="zipFilter"
              value={zipFilter}
              onChange={(e) => setZipFilter(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 shadow-inner focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All ZIP Codes</option>
              {zips.map((zip) => (
                <option key={zip} value={zip}>
                  {zip}
                </option>
              ))}
            </select>
          </div>

          {/* Neighborhood */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="hoodFilter"
              className="text-xs font-semibold uppercase tracking-wide text-gray-600"
            >
              Filter by Neighborhood
            </label>
            <select
              id="hoodFilter"
              value={hoodFilter}
              onChange={(e) => setHoodFilter(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 shadow-inner focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All Neighborhoods</option>
              {neighborhoods.map((hood) => (
                <option key={hood} value={hood}>
                  {hood}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Results summary */}
      <p className="text-sm text-gray-600">
        Showing{" "}
        <span className="font-semibold text-gray-900">
          {filteredBathrooms.length}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900">
          {bathrooms.length}
        </span>{" "}
        bathrooms
      </p>

      {/* View */}
      {viewMode === "table" ? (
        <TableView bathrooms={filteredBathrooms} />
      ) : (
        <CardView bathrooms={filteredBathrooms} />
      )}
    </div>
  );
}

function TableView({ bathrooms }: { bathrooms: Bathroom[] }) {
  if (bathrooms.length === 0) {
    return (
      <div className="bg-white border border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-500">
        No bathrooms match these filters yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm">
      <table className="min-w-full text-sm text-gray-900">
        <thead className="bg-gray-900 text-white text-left">
          <tr>
            <th className="px-4 py-3 font-semibold">Name</th>
            <th className="px-4 py-3 font-semibold">Address</th>
            <th className="px-4 py-3 font-semibold">ZIP</th>
            <th className="px-4 py-3 font-semibold">Neighborhood</th>
            <th className="px-4 py-3 font-semibold">Latitude</th>
            <th className="px-4 py-3 font-semibold">Longitude</th>
          </tr>
        </thead>
        <tbody>
          {bathrooms.map((b, idx) => (
            <tr
              key={b.id}
              className={`border-t border-gray-200 ${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-blue-50 transition`}
            >
              <td className="px-4 py-3 font-medium">{b.name}</td>
              <td className="px-4 py-3">{b.address}</td>
              <td className="px-4 py-3">{b.zip}</td>
              <td className="px-4 py-3">{b.neighborhood}</td>
              <td className="px-4 py-3">{b.latitude}</td>
              <td className="px-4 py-3">{b.longitude}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CardView({ bathrooms }: { bathrooms: Bathroom[] }) {
  if (bathrooms.length === 0) {
    return (
      <div className="bg-white border border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-500">
        No bathrooms match these filters yet.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {bathrooms.map((b) => (
        <article
          key={b.id}
          className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col gap-2 hover:shadow-md transition"
        >
          <h3 className="text-base font-semibold text-gray-900">{b.name}</h3>

          <p className="text-sm text-gray-700">{b.address}</p>

          <div className="flex flex-wrap gap-2 text-xs text-gray-600 mt-1">
            {b.zip && (
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5">
                <span className="font-semibold mr-1">ZIP:</span> {b.zip}
              </span>
            )}
            {b.neighborhood && (
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5">
                <span className="font-semibold mr-1">Neighborhood:</span>{" "}
                {b.neighborhood}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-2">
            <span>
              <span className="font-semibold">Lat:</span> {b.latitude}
            </span>
            <span>
              <span className="font-semibold">Lng:</span> {b.longitude}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
