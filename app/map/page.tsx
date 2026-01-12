// app/map/page.tsx

import { supabaseServer } from "@/lib/supabaseServer";
import PublicMapClient from "@/components/PublicMapClient";
import AuthHeader from "@/components/AuthHeader";

/**
 * IMPORTANT:
 * This page renders CONTENT ONLY.
 * Do NOT use <main>, min-h-screen, or h-screen here.
 * Layout + footer are owned by app/layout.tsx.
 */

export default async function PublicMapPage() {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("bathrooms")
    .select("id, name, address, latitude, longitude, zip");

  if (error) {
    console.error(error.message);
  }

  const safeBathrooms = data ?? [];

  return (
    <div className="bg-gray-100 p-4">
      {/* Top app header */}
      <header className="flex items-center justify-between p-4 bg-white shadow mb-4">
        <h1 className="text-xl font-bold">iGottaPee</h1>
        <AuthHeader />
      </header>

      {/* Page title + navigation */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Bathroom Map</h2>

        <a href="/" className="text-blue-600 hover:underline text-sm">
          ← List View
        </a>
      </div>
      
      <div className="max-w-4xl mx-auto">
        {/* Map content */}
        <PublicMapClient bathrooms={safeBathrooms}/>
        </div>
          </div>
  );
}
