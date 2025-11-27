"use server";

import { supabaseServer } from "@/lib/supabaseServer";
import { geocodeAddress } from "@/lib/geocode";

export async function addBathroom(formData: FormData) {
  const supabase = await supabaseServer();

  const name = formData.get("name") as string;
  const address = formData.get("address") as string;
  const hours = formData.get("hours") as string;

  // Geocode
  const coords = await geocodeAddress(address);

  const { error } = await supabase.from("bathrooms").insert({
    name,
    address,
    hours,
    latitude: coords?.lat ?? null,
    longitude: coords?.lng ?? null,
  });

  if (error) {
    console.error("Insert error:", error);
    return { success: false };
  }

  return { success: true };
}
