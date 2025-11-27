// components/admin/AdminNav.tsx


"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminNav() {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  return (
    <nav className="w-full bg-gray-900 text-white p-4 flex items-center justify-between shadow-md">
      {/* Left side links */}
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-bold">iGottaPee Admin</h1>

        <a href="/admin" className="hover:text-blue-400 transition">
          Dashboard
        </a>

        <a href="/admin/bathrooms" className="hover:text-blue-400 transition">
          Bathrooms
        </a>

        {/* Add more links later */}
      </div>

      {/* Right side actions */}
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold"
      >
        Logout
      </button>
    </nav>
  );
}
