"use server";

import { supabaseServer } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

export async function deleteBathroom(id: string) {
  const supabase = await supabaseServer();

  await supabase.from("bathrooms").delete().eq("id", id);

  redirect("/admin/bathrooms?deleted=1");
}
