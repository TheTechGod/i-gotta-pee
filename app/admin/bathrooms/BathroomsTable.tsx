"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DeleteModal from "@/components/admin/DeleteModal";
import { deleteBathroom } from "./deleteBathroomAction";

export default function BathroomsTable({ bathrooms }: { bathrooms: any[] }) {
  const router = useRouter();
  const [selectedBathroom, setSelectedBathroom] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleConfirmDelete() {
    if (!selectedBathroom) return;

    try {
      setIsDeleting(true);
      await deleteBathroom(selectedBathroom.id);
      setSelectedBathroom(null);
      router.refresh();
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-800">
              <th className="text-left p-3 font-semibold">Name</th>
              <th className="text-left p-3 font-semibold">Address</th>
              <th className="text-left p-3 font-semibold">Details</th>
              <th className="text-left p-3 font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bathrooms.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500 italic">
                  No bathrooms added yet.
                </td>
              </tr>
            )}

            {bathrooms.map((b) => (
              <tr
                key={b.id}
                className="border-b hover:bg-gray-50 transition text-gray-900"
              >
                <td className="p-3 font-medium">{b.name}</td>
                <td className="p-3">{b.address}</td>
                <td className="p-3 capitalize">{b.accessibility || "—"}</td>

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
