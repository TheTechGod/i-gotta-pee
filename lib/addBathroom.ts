// lib/addBathroom.ts
import { supabase } from "./supabase";

export interface BathroomInput {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  neighborhood?: string | null;
  latitude: number;
  longitude: number;
  accessibility?: string | null;
}

export async function addBathroom(bathroom: BathroomInput) {
  try {
    const { data, error } = await supabase
      .from("bathrooms")
      .insert({
        name: bathroom.name,
        street: bathroom.street,
        city: bathroom.city,
        state: bathroom.state.toUpperCase(),
        zip: bathroom.zip,
        neighborhood: bathroom.neighborhood || null,
        latitude: bathroom.latitude,
        longitude: bathroom.longitude,
        accessibility: bathroom.accessibility || null,
      })
      .select()
      .single(); // ensures one row is returned cleanly

    if (error) {
      console.error("Insert error:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Unexpected addBathroom error:", err);
    return null;
  }
}
