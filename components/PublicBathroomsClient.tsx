"use client";

import ZipSearch from "./ZipSearch";
import { useZipFilter } from "@/app/hooks/useZipFilter";
import type { MapBathroom } from "@/lib/types";

type Props = {
  bathrooms: MapBathroom[];
};

export default function PublicBathroomsClient({ bathrooms }: Props) {
  const { zip, setZip, filtered } = useZipFilter(bathrooms);

  return (
    <>
    
    <div className="flex justify-between items-center mb-4">
        
      </div>

      {/* ZIP SEARCH */}
      <ZipSearch onSearch={setZip} />

      {/* Empty-state feedback */}
      {zip && filtered.length === 0 && (
        <p className="mt-3 text-sm text-gray-500">
          No bathrooms found for ZIP {zip}
        </p>
      )}

      <ul className="space-y-3 mt-4">
        {filtered.map((b) => (
          <li
            key={b.id}
            className="bg-white p-4 rounded shadow"
          >
            <div className="font-semibold">{b.name}</div>
            <div className="text-sm text-gray-600">
              {b.address}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
