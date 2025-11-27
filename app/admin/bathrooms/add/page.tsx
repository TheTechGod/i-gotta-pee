
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminNav from "@/components/admin/AdminNav";

export default function AddBathroomPage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ------------------------------------------------------------
  // AUTO-GEOCODE LOOKUP
  // ------------------------------------------------------------
  async function handleAutoGeocode() {
    if (!address) {
      setMessage("Enter an address first.");
      return;
    }

    setMessage("Locating address...");
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}`;

      const res = await fetch(url);
      const data = await res.json();

      if (!data?.length) {
        setMessage("Address not found.");
        return;
      }

      setLatitude(data[0].lat);
      setLongitude(data[0].lon);
      setMessage("Coordinates found ✔");
    } catch (err) {
      setMessage("Error fetching coordinates.");
    }
  }

  // ------------------------------------------------------------
  // SUBMIT NEW BATHROOM
  // ------------------------------------------------------------
  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("bathrooms").insert([
      {
        name,
        address,
        zip,
        neighborhood,
        latitude,
        longitude,
      },
    ]);

    setLoading(false);

    if (error) {
      setMessage("Error: " + error.message);
      return;
    }

    setMessage("Bathroom added successfully!");

    // Reset form
    setName("");
    setAddress("");
    setZip("");
    setNeighborhood("");
    setLatitude("");
    setLongitude("");
  }

  // ------------------------------------------------------------
  // UI
  // ------------------------------------------------------------
  return (
    <main className="min-h-screen bg-gray-100">
      <AdminNav />

      <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-lg p-8 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Add New Bathroom
        </h1>

        {message && (
          <p className="mb-4 p-2 rounded bg-blue-100 text-blue-800">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* NAME */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Bathroom name"
              className="p-2 w-full border rounded text-gray-900 placeholder-gray-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* ADDRESS */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Address
            </label>

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Full street address"
                className="p-2 w-full border rounded text-gray-900 placeholder-gray-500"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={handleAutoGeocode}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Auto-Locate
              </button>
            </div>
          </div>

          {/* ZIP */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              ZIP Code
            </label>
            <input
              type="text"
              placeholder="60601"
              className="p-2 w-full border rounded text-gray-900 placeholder-gray-500"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </div>

          {/* NEIGHBORHOOD */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Neighborhood
            </label>
            <input
              type="text"
              placeholder="Bronzeville"
              className="p-2 w-full border rounded text-gray-900 placeholder-gray-500"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
            />
          </div>

          {/* LATITUDE */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Latitude
            </label>
            <input
              type="text"
              placeholder="Auto-filled or enter manually"
              className="p-2 w-full border rounded text-gray-900 placeholder-gray-500"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </div>

          {/* LONGITUDE */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Longitude
            </label>
            <input
              type="text"
              placeholder="Auto-filled or enter manually"
              className="p-2 w-full border rounded text-gray-900 placeholder-gray-500"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Save Bathroom"}
          </button>
        </form>
      </div>
    </main>
  );
}
