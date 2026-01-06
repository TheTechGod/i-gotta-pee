import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST() {
  const supabase = await supabaseServer();

  // signs out server-side (clears auth cookies if you're using them)
  await supabase.auth.signOut();

  return NextResponse.json({ ok: true });
}
