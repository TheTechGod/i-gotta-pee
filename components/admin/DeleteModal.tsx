"use client";

type DeleteModalProps = {
  bathroom: any | null;
  onCancel: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
};

export default function DeleteModal({
  bathroom,
  onCancel,
  onConfirm,
  isDeleting = false,
}: DeleteModalProps) {
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
            disabled={isDeleting}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
