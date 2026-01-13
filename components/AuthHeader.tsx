// components/AuthHeader.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";

export default function AuthHeader() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getUser().then(({ data }) => {
      if (!isMounted) return;
      setUser(data.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    // Prefer a soft refresh in Next apps
    window.location.href = "/";
  }

  return (
    <nav className="flex items-center gap-4 text-sm">
      {user ? (
        <>
          <span className="text-gray-700 hidden sm:inline">
            Welcome, {user.email}
          </span>

          <button onClick={logout} className="text-red-600 hover:underline">
            Log out
          </button>
        </>
      ) : (
        <>
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </>
      )}
    </nav>
  );
}
