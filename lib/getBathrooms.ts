// lib/getBathrooms.ts
import { supabase } from "./supabase/client";

export async function getBathrooms() {
  const { data, error } = await supabase
    .from("bathrooms")
    .select("id, name, address, latitude, longitude, accessibility, zip, neighborhood");

  if (error) {
    console.error("Supabase fetch error:", error.message);
    return [];
  }

  return data || [];
}
