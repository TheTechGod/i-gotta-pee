// app/admin/bathrooms/BathroomsTable.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DeleteModal from "@/components/admin/DeleteModal";
import { deleteBathroom } from "./deleteBathroomAction";
import type { Bathroom } from "@/app/types/Bathroom";

type Props = {
  bathrooms: Bathroom[];
};

export default function BathroomsTable({ bathrooms }: Props) {
  const router = useRouter();
  const [selectedBathroom, setSelectedBathroom] = useState<Bathroom | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleConfirmDelete() {
    if (!selectedBathroom) return;

    try {
      setIsDeleting(true);

      // ✅ UUID string
      const res = await deleteBathroom(selectedBathroom.id);

      if (res?.error) {
        alert("Delete failed: " + res.error);
        return;
      }

      setSelectedBathroom(null);
      router.refresh();
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">Details</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bathrooms.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center italic text-gray-500">
                  No bathrooms found.
                </td>
              </tr>
            )}

            {bathrooms.map((b) => (
              <tr
                key={b.id}
                className="bathroom-row border-b hover:bg-gray-50"
                data-zip={b.zip ?? ""}
                data-hood={b.neighborhood ?? ""}
              >
                <td className="p-3 font-medium">{b.name}</td>
                <td className="p-3">{b.address}</td>
                <td className="p-3">{b.accessibility || "—"}</td>

                <td className="p-3">
                  <div className="flex gap-3">
                    <a
                      href={`/admin/bathrooms/${b.id}/edit`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </a>

                    <button
                      onClick={() => setSelectedBathroom(b)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteModal
        bathroom={selectedBathroom}
        onCancel={() => setSelectedBathroom(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </>
  );
}
