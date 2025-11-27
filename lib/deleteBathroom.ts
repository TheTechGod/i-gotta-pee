"use server";

import { supabaseServer } from "@/lib/supabaseServer";

export async function deleteBathroom(id: number) {
  const supabase = await supabaseServer();

  const { error } = await supabase
    .from("bathrooms")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Delete error:", error);
    return { success: false, message: error.message };
  }

  return { success: true };
}
