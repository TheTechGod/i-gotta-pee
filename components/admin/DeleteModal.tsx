"use client";
import { useState } from "react";

export default function DeleteModal({
  bathroom,
  onConfirm,
  onCancel,
}: {
  bathroom: any;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!bathroom) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Confirm Delete</h2>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete <strong>{bathroom.name}</strong>?  
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
