// app/login/page.tsx
"use client";

/**
 * IMPORTANT:
 * This page renders CONTENT ONLY.
 * Layout structure, viewport height, and footer
 * are controlled by app/layout.tsx.
 */

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    // Redirect to public map after login
    window.location.href = "/";
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center py-20">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow w-full max-w-sm space-y-4"
      >
        <h1 className="text-xl font-bold">Log In</h1>

        <input
          type="email"
          className="w-full border p-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="w-full border p-2 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
}
