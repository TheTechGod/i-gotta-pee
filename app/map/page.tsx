// app/map/page.tsx

"use client";
  
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/UI/Map"), {
  ssr: false, // Required because Leaflet is client-only
});

export default function PublicMapPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">
        Bathroom Map
      </h1>

      <p className="text-gray-700 mb-4">
        Find bathrooms near you. Tap a marker to view the details.
      </p>

      <div className="w-full h-[600px]">
        <Map />
      </div>
    </main>
  );
}