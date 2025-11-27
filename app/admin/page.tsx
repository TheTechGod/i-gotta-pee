// app/admin/page.tsx
import { supabaseServer } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";
import AdminForm from "./AdminForm";
import AdminNav from "@/components/admin/AdminNav";
import SuccessBanner from "@/components/SuccessBanner"; // ✅ Corrected import

export default async function AdminPage({ searchParams }: any) {
  const supabase = await supabaseServer();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <AdminNav />

      <div className="p-6 max-w-4xl mx-auto">
        {/* ✅ Success banner (auto-hide, shows ?added=1 or ?updated=1) */}
        <SuccessBanner searchParams={searchParams} />

        <h2 className="text-3xl font-bold mb-6 text-gray-900">
          Admin Dashboard
        </h2>

        <AdminForm />
      </div>
    </main>
  );
}
