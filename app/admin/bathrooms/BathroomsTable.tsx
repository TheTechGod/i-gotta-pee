"use client";

import { useState } from "react";
import DeleteModal from "@/components/admin/DeleteModal";
import { deleteBathroom } from "./deleteBathroomAction";

export default function BathroomsTable({ bathrooms }: { bathrooms: any[] }) {
  const [selectedBathroom, setSelectedBathroom] = useState<any>(null);

  return (
    <>
      <table className="w-full border-collapse bg-white shadow-sm rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-800">
            <th className="text-left p-3 font-semibold">Name</th>
            <th className="text-left p-3 font-semibold">Address</th>
            <th className="text-left p-3 font-semibold">Type</th>
            <th className="text-left p-3 font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {bathrooms.map((b) => (
            <tr
              key={b.id}
              className="border-b hover:bg-gray-50 transition text-gray-900"
            >
              <td className="p-3">{b.name}</td>
              <td className="p-3">{b.address}</td>
              <td className="p-3">{b.accessibility || "—"}</td>
              <td className="p-3 flex gap-3">
                <a href={`/admin/bathrooms/${b.id}/edit`} className="text-blue-600 hover:underline">
                  Edit
                </a>

                <button
                  onClick={() => setSelectedBathroom(b)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteModal
        bathroom={selectedBathroom}
        onClose={() => setSelectedBathroom(null)}
        onConfirm={async () => {
          if (!selectedBathroom) return;

          await deleteBathroom(selectedBathroom.id);

          window.location.href = "/admin/bathrooms?deleted=1";
        }}
      />
    </>
  );
}
