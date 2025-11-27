import { supabaseServer } from "@/lib/supabaseServer";
import UpdateBathroomForm from "./UpdateBathroomForm";

export default async function EditBathroomPage(props: any) {
  // params is a Promise → must await it
  const { id } = await props.params;

  const supabase = await supabaseServer();

  const { data: bathroom, error } = await supabase
    .from("bathrooms")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !bathroom) {
    return (
      <div className="p-6 text-red-600 font-bold">
        Bathroom not found.
      </div>
    );
  }

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Bathroom</h1>
      <UpdateBathroomForm bathroom={bathroom} />
    </main>
  );
}
