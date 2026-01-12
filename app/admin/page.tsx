// app/admin/page.tsx
"use client";

/**
 * IMPORTANT:
 * This page renders CONTENT ONLY.
 * Layout structure, height, and footer are owned by app/layout.tsx.
 * Do NOT add <main>, min-h-screen, or h-screen here.
 */

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminNav from "@/components/admin/AdminNav";

export default function AdminPage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
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
    } catch {
      setMessage("Error fetching coordinates.");
    }
  }

  // ------------------------------------------------------------
  // HANDLE SUBMIT (INSERT + IMAGE UPLOAD)
  // ------------------------------------------------------------
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    let photo_url: string | null = null;

    if (photoFile) {
      const fileExt = photoFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `bathrooms/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("bathroom-images")
        .upload(filePath, photoFile);

      if (uploadError) {
        setMessage("Failed to upload image: " + uploadError.message);
        setLoading(false);
        return;
      }

      const { data } = supabase.storage
        .from("bathroom-images")
        .getPublicUrl(filePath);

      photo_url = data.publicUrl;
    }

    const { error } = await supabase.from("bathrooms").insert([
      {
        name,
        address,
        zip,
        neighborhood,
        latitude,
        longitude,
        photo_url,
      },
    ]);

    setLoading(false);

    if (error) {
      setMessage("Error: " + error.message);
      return;
    }

    setMessage("Bathroom added successfully!");

    setName("");
    setAddress("");
    setZip("");
    setNeighborhood("");
    setLatitude("");
    setLongitude("");
    setPhotoFile(null);
  }

  // ------------------------------------------------------------
  // UI (CONTENT ONLY)
  // ------------------------------------------------------------
  return (
    <div className="bg-gray-100">
      <AdminNav />

      <section className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-lg p-8 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Add New Bathroom
        </h1>

        {message && (
          <p className="mb-4 p-2 rounded bg-blue-100 text-blue-800">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Name">
            <input
              type="text"
              className="p-2 w-full border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Field>

          <Field label="Address">
            <div className="flex gap-3">
              <input
                type="text"
                className="p-2 w-full border rounded"
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
          </Field>

          <Field label="ZIP Code">
            <input
              type="text"
              className="p-2 w-full border rounded"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </Field>

          <Field label="Neighborhood">
            <input
              type="text"
              className="p-2 w-full border rounded"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
            />
          </Field>

          <Field label="Latitude">
            <input
              type="text"
              className="p-2 w-full border rounded"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </Field>

          <Field label="Longitude">
            <input
              type="text"
              className="p-2 w-full border rounded"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </Field>

          <Field label="Upload Photo">
            <input
              type="file"
              accept="image/*"
              className="p-2 border rounded w-full bg-white"
              onChange={(e) => setPhotoFile(e.target.files?.[0] ?? null)}
            />
          </Field>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Add Bathroom"}
          </button>
        </form>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------
   Small helper for consistent form spacing
------------------------------------------------------------ */
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}
