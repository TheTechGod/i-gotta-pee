// app/admin/bathrooms/deleteBathroomAction.ts
"use server";

import { supabaseServer } from "@/lib/supabaseServer";

export async function deleteBathroom(id: string) {
  const supabase = await supabaseServer();

  const { error } = await supabase
    .from("bathrooms")
    .delete()
    .eq("id", id);

  if (error) return { error: error.message };

  return { success: true };
}
