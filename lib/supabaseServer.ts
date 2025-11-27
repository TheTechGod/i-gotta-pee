// lib/supabaseServer.ts
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function supabaseServer() {
  // NEXT.JS 16 FIX → cookies() must be awaited
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },

        // Prevent write errors inside Server Components
        set() {
          /* no-op */
        },

        remove() {
          /* no-op */
        },
      },
    }
  );
}
