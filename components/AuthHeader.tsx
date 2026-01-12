// components/Authheader
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function AuthHeader() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  return (
    <nav className="space-x-4 text-sm">
      {user ? (
        <>
          <span className="text-gray-700">Welcome, {user.email}</span>
          <button
            onClick={logout}
            className="text-red-600 hover:underline"
          >
            Log out
          </button>
        </>
      ) : (
        <>
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </>
      )}
    </nav>
  );
}
