// components/UI/Map.tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

type MapBathroom = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

type Props = {
  bathrooms: MapBathroom[];
};

export default function Map({ bathrooms }: Props) {
  if (!bathrooms.length) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No bathrooms to display
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden shadow">
      <MapContainer
        center={[41.8781, -87.6298]} // Chicago
        zoom={12}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {bathrooms.map((b) => (
          <Marker key={b.id} position={[b.latitude, b.longitude]}>
            <Popup>
              <div className="text-sm space-y-1">
                <p className="font-bold">{b.name}</p>
                <p>{b.address}</p>

                <a
                  href={`/admin/bathrooms/${b.id}`}
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
