// app/admin/AdminForm.tsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { zipNeighborhoodMap } from "@/lib/neighborhoods";

export default function AdminForm() {
  // Address fields
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  // Coordinates
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // Bathroom fields
  const [name, setName] = useState("");
  const [accessibility, setAccessibility] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Auto-geocode on address change
  useEffect(() => {
    async function autoGeocode() {
      if (!street || !city || !state) return;

      const cleanedStreet = street
        .replace(/\be\b/gi, "East")
        .replace(/\bw\b/gi, "West")
        .replace(/\bn\b/gi, "North")
        .replace(/\bs\b/gi, "South")
        .trim();

      const normalizedState = state.toUpperCase();

      const query = `${cleanedStreet}, ${city}, ${normalizedState}`;
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}&limit=1&addressdetails=1`;

      try {
        const res = await fetch(url, {
          headers: {
            "User-Agent": "iGottaPeeApp/1.0 (Integrity Programming)",
            "Accept-Language": "en",
          },
        });

        const data = await res.json();

        if (data && data.length > 0) {
          setLatitude(data[0].lat);
          setLongitude(data[0].lon);
        }
      } catch (err) {
        console.error("Geocoding error:", err);
      }
    }

    autoGeocode();
  }, [street, city, state]);

  // Submit form
  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);

  if (!name || !lat || !lng) {
    setMessage("Name and full address (auto-geocoded) are required.");
    setLoading(false);
    return;
  }

  const fullAddress = `${street}, ${city}, ${state.toUpperCase()} ${zip}`;

  // Build object for insertion
  const payload = {
    name,
    address: fullAddress,
    zip,
    neighborhood: zipNeighborhoodMap[zip] || null,
    latitude: lat,
    longitude: lng,
    accessibility: accessibility || null,
    created_at: new Date().toISOString(),
  };

  try {
    const res = await fetch("/api/admin/bathrooms/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage("Error: " + data.error);
    } else {
      setMessage("Bathroom added successfully!");

      // Reset fields
      setName("");
      setStreet("");
      setCity("");
      setState("");
      setZip("");
      setLatitude("");
      setLongitude("");
      setAccessibility("");
    }
  } catch (err) {
    setMessage("Unexpected error submitting form.");
  }

  setLoading(false);
}


  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-xl font-bold text-white mb-4">Add New Bathroom</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 border p-4 rounded-lg bg-white shadow"
      >
        {/* Bathroom name */}
        <div>
          <label className="font-semibold block text-black">Bathroom Name *</label>
          <input
            type="text"
            className="border p-2 rounded w-full text-black"
            value={name}
            placeholder="Walgreens Bathroom"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Street */}
        <div>
          <label className="font-semibold block text-black">Street Address *</label>
          <input
            type="text"
            className="border p-2 rounded w-full text-black"
            value={street}
            placeholder="123 Main St"
            onChange={(e) => setStreet(e.target.value)}
            required
          />
        </div>

        {/* City */}
        <div>
          <label className="font-semibold block text-black">City *</label>
          <input
            type="text"
            className="border p-2 rounded w-full text-black"
            value={city}
            placeholder="Chicago"
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>

        {/* ZIP */}
        <div>
          <label className="font-semibold block text-black">ZIP Code *</label>
          <input
            type="text"
            className="border p-2 rounded w-full text-black"
            value={zip}
            placeholder="60653"
            onChange={(e) => setZip(e.target.value)}
            required
          />
        </div>

        {/* State */}
        <div>
          <label className="font-semibold block text-black">State *</label>
          <select
            className="border p-2 rounded w-full text-black"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          >
            <option value="">Select State</option>
            <option value="IL">IL</option>
            <option value="IN">IN</option>
            <option value="WI">WI</option>
          </select>
        </div>

        {/* Coordinates */}
        <div>
          <label className="font-semibold block text-black">Latitude (auto)</label>
          <input
            type="text"
            className="border p-2 rounded w-full bg-gray-200 text-black"
            value={latitude}
            readOnly
          />
        </div>

        <div>
          <label className="font-semibold block text-black">Longitude (auto)</label>
          <input
            type="text"
            className="border p-2 rounded w-full bg-gray-200 text-black"
            value={longitude}
            readOnly
          />
        </div>

        {/* Accessibility */}
        <div>
          <label className="font-semibold block text-black">Accessibility</label>
          <input
            type="text"
            className="border p-2 rounded w-full text-black"
            value={accessibility}
            placeholder="Wheelchair Accessible"
            onChange={(e) => setAccessibility(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700"
        >
          {loading ? "Saving…" : "Add Bathroom"}
        </button>

        {message && (
          <p className="text-green-700 text-center font-semibold mt-2">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
