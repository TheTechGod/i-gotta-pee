// app/admin/bathrooms/[id]/page.tsx

/**
 * IMPORTANT:
 * This page renders CONTENT ONLY.
 * Layout structure, viewport height, and footer
 * are controlled by app/layout.tsx.
 */

import { supabaseServer } from "@/lib/supabaseServer";
import AdminNav from "@/components/admin/AdminNav";

export default async function BathroomDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await supabaseServer();

  const { data: bathroom, error } = await supabase
    .from("bathrooms")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !bathroom) {
    return (
      <div className="bg-gray-100 flex items-center justify-center py-20">
        <p className="text-gray-700 text-lg">
          Bathroom not found.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100">
      <AdminNav />

      <section className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">
          {bathroom.name}
        </h1>

        <div className="bg-white shadow rounded p-5 space-y-3">
          <p>
            <span className="font-semibold">Address:</span>{" "}
            {bathroom.address}
          </p>
          <p>
            <span className="font-semibold">Zip Code:</span>{" "}
            {bathroom.zip}
          </p>
          <p>
            <span className="font-semibold">Neighborhood:</span>{" "}
            {bathroom.neighborhood}
          </p>
          <p>
            <span className="font-semibold">Accessibility:</span>{" "}
            {bathroom.accessibility || "—"}
          </p>
        </div>

        <div className="flex gap-3 mt-6">
          <a
            href={`/admin/bathrooms/${bathroom.id}/edit`}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Edit
          </a>

          <a
            href="/admin/bathrooms"
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Back
          </a>
        </div>
      </section>
    </div>
  );
}
