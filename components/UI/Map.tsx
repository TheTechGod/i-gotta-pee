// components/UI/Map.tsx
"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import { supabase } from "@/lib/supabase/client";

export default function Map() {
  const [bathrooms, setBathrooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBathrooms() {
      const { data, error } = await supabase
        .from("bathrooms")
        .select("*");

      if (error) {
        console.error("Supabase error:", error.message);
      } else {
        const valid = data.filter(
          (b) =>
            b.latitude !== null &&
            b.longitude !== null &&
            !isNaN(Number(b.latitude)) &&
            !isNaN(Number(b.longitude))
        );

        setBathrooms(valid);
      }

      setLoading(false);
    }

    loadBathrooms();
  }, []);

  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden shadow">
      <MapContainer
        center={[41.8781, -87.6298]}
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {!loading &&
          bathrooms.map((bathroom) => (
            <Marker
              key={bathroom.id}
              position={[
                Number(bathroom.latitude),
                Number(bathroom.longitude),
              ]}
            >
              <Popup>
  <div className="text-sm space-y-1">
    <p className="font-bold">{bathroom.name}</p>
    <p>{bathroom.address}</p>

    {bathroom.accessibility && (
      <p className="text-gray-700 text-xs italic">
        {bathroom.accessibility}
      </p>
    )}

    <a
      href={`/admin/bathrooms/${bathroom.id}`}
      className="text-blue-600 underline text-xs"
    >
      View details →
    </a>
  </div>
</Popup>

            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
