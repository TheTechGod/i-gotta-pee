// app/admin/bathrooms/[id]/edit/UpdateBathroomForm.tsx
"use client";

import { useState, FormEvent } from "react";
import { updateBathroomAction } from "./updateBathroomAction";
import type { Bathroom } from "@/app/types/Bathroom";

type Props = {
  bathroom: Bathroom;
};

export default function UpdateBathroomForm({ bathroom }: Props) {
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const result = await updateBathroomAction(formData);

    setLoading(false);

    if (!result?.error) {
      alert("Bathroom updated!");
    } else {
      alert(result.error);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-4 bg-white p-6 rounded shadow"
    >
      <input type="hidden" name="id" defaultValue={bathroom.id} />

      <label className="block font-medium">Name</label>
      <input
        name="name"
        defaultValue={bathroom.name}
        className="w-full border rounded p-2"
        required
      />

      <label className="block font-medium">Address</label>
      <input
        name="address"
        defaultValue={bathroom.address}
        className="w-full border rounded p-2"
        required
      />

      <label className="block font-medium">ZIP</label>
      <input
        name="zip"
        defaultValue={bathroom.zip ?? ""}
        className="w-full border rounded p-2"
      />

      <label className="block font-medium">Accessibility</label>
      <input
        name="accessibility"
        defaultValue={bathroom.accessibility ?? ""}
        className="w-full border rounded p-2"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
