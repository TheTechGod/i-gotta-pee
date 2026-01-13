// app/page.tsx
import { supabaseServer } from "@/lib/supabaseServer";
import AuthHeader from "@/components/AuthHeader";
import PublicBathroomsClient from "@/components/PublicBathroomsClient";

const PAGE_SIZE = 5;

export default async function PublicBathroomsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const supabase = await supabaseServer();

  const page = Number(searchParams.page ?? "1");
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error } = await supabase
    .from("bathrooms")
    .select(
      "id, name, address, zip, neighborhood, accessibility, latitude, longitude"
    )
    .order("name")
    .range(from, to);

  if (error) {
    console.error(error.message);
  }

  const safeBathrooms = data ?? [];

  return (
    <div className="bg-gray-100 p-4">
      {/* TOP APP HEADER */}
      <header className="flex items-center justify-between p-4 bg-white shadow mb-4">
        <h1 className="text-xl font-bold">iGottaPee</h1>
        <AuthHeader />
      </header>

      {/* Page title + navigation */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Bathroom List</h2>
        <a
          href="/map"
          className="text-blue-600 hover:underline text-sm"
        >
          ← Map View
        </a>
      </div>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto">
        {error && (
          <p className="text-red-600 mb-4">
            Failed to load bathrooms
          </p>
        )}

        <PublicBathroomsClient bathrooms={safeBathrooms} />

        {/* PAGINATION CONTROLS */}
        <div className="flex justify-between items-center mt-8">
          {/* Previous */}
          {page > 1 ? (
            <a
              href={`/?page=${page - 1}`}
              className="px-4 py-2 border rounded hover:bg-gray-200"
            >
              ← Previous
            </a>
          ) : (
            <span />
          )}

          <span className="text-sm text-gray-600">
            Page {page}
          </span>

          {/* Next */}
          {safeBathrooms.length === PAGE_SIZE ? (
            <a
              href={`/?page=${page + 1}`}
              className="px-4 py-2 border rounded hover:bg-gray-200"
            >
              Next →
            </a>
          ) : (
            <span />
          )}
        </div>
      </section>
    </div>
  );
}
