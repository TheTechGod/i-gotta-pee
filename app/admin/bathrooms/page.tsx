// app/admin/bathrooms/page.tsx

import { supabaseServer } from "@/lib/supabaseServer";
import AdminNav from "@/components/admin/AdminNav";
import FilterBar from "./FilterBar";
import BathroomsTable from "./BathroomsTable";
import SuccessBanner from "@/components/SuccessBanner";

export default async function BathroomsListPage() {
  const supabase = await supabaseServer();

  // Check user session
  const { data: sessionData } = await supabase.auth.getSession();
  const session = sessionData?.session;

  if (!session) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-800 text-lg font-semibold">
          Unauthorized – please log in.
        </p>
      </main>
    );
  }

  // Fetch bathrooms safely
  const { data, error } = await supabase
    .from("bathrooms")
    .select("*")
    .order("name", { ascending: true });

  // Ensure bathrooms is always an array to satisfy FilterBar & BathroomsTable
  const bathrooms = data ?? [];

  return (
    <main className="min-h-screen bg-gray-100">
      <AdminNav />

      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Bathrooms</h1>

          <a
            href="/admin/bathrooms/add"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700"
          >
            + Add Bathroom
          </a>
        </div>

        {/* Client-side success banner */}
        <SuccessBanner />

        {error && (
          <p className="mb-4 p-2 rounded bg-red-100 text-red-800">
            {error.message}
          </p>
        )}

        {/* Pass guaranteed arrays */}
        <FilterBar bathrooms={bathrooms} />
        <BathroomsTable bathrooms={bathrooms} />
      </div>
    </main>
  );
}
