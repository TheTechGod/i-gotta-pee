// admin/bathrooms/[id]/edit/updateBathroomAction.ts
"use server";

import { supabaseServer } from "@/lib/supabaseServer";

export async function updateBathroomAction(formData: FormData) {
  const id = formData.get("id") as string;

  const updates = {
    name: formData.get("name"),
    address: formData.get("address"),
    zip: formData.get("zip"),
    neighborhood: formData.get("neighborhood"),
    accessibility: formData.get("accessibility"),
  };

  const supabase = await supabaseServer();

  const { error } = await supabase
    .from("bathrooms")
    .update(updates)
    .eq("id", id);

  return { error };
}
