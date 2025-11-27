"use server";

import { supabaseServer } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

export async function deleteBathroom(id: number) {
  const supabase = await supabaseServer();

  const { error } = await supabase
    .from("bathrooms")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Delete error:", error.message);
    return { success: false, error: error.message };
  }

  // Redirect back to list with success flag
  redirect("/admin/bathrooms?deleted=1");
}

