// app/map/page.tsx
import { supabaseServer } from "@/lib/supabaseServer";
import PublicMapClient from "@/components/PublicMapClient";
import AuthHeader from "@/components/AuthHeader";
import PublicBathroomsClient from "@/components/PublicBathroomsClient";


export default async function PublicMapPage() {
  const supabase = await supabaseServer();

  const { data = [], error } = await supabase
    .from("bathrooms")
    .select("id, name, address, latitude, longitude, zip");

  if (error) {
    console.error(error.message);
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <header className="flex items-center justify-between p-4 bg-white shadow">
              <h1 className="text-xl font-bold">iGottaPee</h1>
              <AuthHeader />
            </header>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Bathroom Map</h1>

        <a href="/" className="text-blue-600 hover:underline text-sm">
          ← List View
        </a>
      </header>

      <PublicMapClient bathrooms={data} />
    </main>
  );
}
