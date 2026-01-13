// app/list/page.tsx

import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";
import AuthHeader from "@/components/AuthHeader";
import PublicBathroomsClient from "@/components/PublicBathroomsClient";

const PAGE_SIZE = 5;

type SearchParams = {
  page?: string;
  zip?: string;
};

export default async function PublicBathroomsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const supabase = await supabaseServer();
  const params = await searchParams;

  // ------------------------------------------------------------
  // Normalize query params
  // ------------------------------------------------------------
  const pageParam = Number(params.page);
  const page =
    Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;

  const zip = (params.zip ?? "").trim();
  const hasZip = zip.length > 0;

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  // ------------------------------------------------------------
  // Build Supabase query (ZIP filter optional)
  // ------------------------------------------------------------
  let query = supabase
    .from("bathrooms")
    .select(
      "id, name, address, zip, neighborhood, accessibility, latitude, longitude",
      { count: "exact" }
    )
    .order("name", { ascending: true });

  if (hasZip) {
    query = query.eq("zip", zip);
  }

  const { data, error, count } = await query.range(from, to);

  if (error) {
    console.error("Bathroom fetch error:", error.message);
  }

  const bathrooms = data ?? [];
  const total = count ?? 0;

  // ------------------------------------------------------------
  // Range display (Showing X–Y of Z)
  // ------------------------------------------------------------
  const start = total === 0 ? 0 : from + 1;
  const end =
    total === 0 ? 0 : Math.min(from + bathrooms.length, total);

  const zipQuery = hasZip
    ? `&zip=${encodeURIComponent(zip)}`
    : "";

  // ------------------------------------------------------------
  // UI
  // ------------------------------------------------------------
  return (
    <div className="bg-gray-100 p-4">
      {/* HEADER */}
      <header className="flex items-center justify-between p-4 bg-white shadow mb-4 border-b border-black">
        <h1 className="text-xl font-bold">iGottaPee</h1>
        <AuthHeader />
      </header>

      {/* TITLE + MAP NAV */}
      <div className="flex justify-between items-center mb-2 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold">Bathroom List</h2>

        <Link
          href="/map"
          className="text-blue-600 hover:underline text-sm"
        >
          ← Map View
        </Link>
      </div>

      {/* RANGE TEXT */}
      <div className="max-w-4xl mx-auto mb-4">
        <p className="text-sm text-gray-600">
          {total === 0 ? (
            <>Showing 0 of 0</>
          ) : (
            <>Showing {start}–{end} of {total}</>
          )}

          {hasZip && (
            <span className="ml-2 text-gray-500">
              (ZIP:{" "}
              <span className="font-semibold">{zip}</span>)
            </span>
          )}
        </p>
      </div>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto">
        {error && (
          <p className="text-red-600 mb-4">
            Failed to load bathrooms
          </p>
        )}

        <PublicBathroomsClient bathrooms={bathrooms} page={page} pageSize={PAGE_SIZE} total={total}/>


        {/* PAGINATION */}
        <div className="flex justify-between items-center mt-8">
          {page > 1 ? (
            <Link
              href={`/list?page=${page - 1}${zipQuery}`}
              className="px-4 py-2 border rounded hover:bg-gray-200"
            >
              ← Previous
            </Link>
          ) : (
            <span />
          )}

          <span className="text-sm text-gray-600">
            Page {page}
          </span>

          {end < total ? (
            <Link
              href={`/list?page=${page + 1}${zipQuery}`}
              className="px-4 py-2 border rounded hover:bg-gray-200"
            >
              Next →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </section>
    </div>
  );
}
