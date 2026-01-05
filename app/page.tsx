// app/page.tsx
import { supabaseServer } from "@/lib/supabaseServer";
import AuthHeader from "@/components/AuthHeader";
import PublicBathroomsClient from "@/components/PublicBathroomsClient";

export default async function PublicBathroomsPage() {
  const supabase = await supabaseServer();

  const { data = [], error } = await supabase
    .from("bathrooms")
    .select("id, name, address, zip")
    .order("name");

  if (error) {
    console.error(error.message);
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      {/* TOP APP HEADER — matches /map */}
      <header className="flex items-center justify-between p-4 bg-white shadow mb-4">
        <h1 className="text-xl font-bold">iGottaPee</h1>
        <AuthHeader />
      </header>

      {/* PAGE HEADER — matches /map but opposite link */}
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Public Bathrooms Near You</h1>

        <a href="/map" className="text-blue-600 hover:underline text-sm">
          View Map →
        </a>
      </header>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto">
        {error && (
          <p className="text-red-600 mb-4">Failed to load bathrooms</p>
        )}

        <PublicBathroomsClient bathrooms={data} />
      </section>
    </main>
  );
}
