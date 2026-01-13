// components/PublicMapClient.tsx
"use client";

import { useMemo, useState } from "react";
import ZipSearch from "@/components/ZipSearch";
import Map from "@/components/UI/Map";

type MapBathroom = {
  id: string;
  name: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  zip: string | null;
};

type Props = {
  bathrooms: MapBathroom[];
};

export default function PublicMapClient({ bathrooms }: Props) {
  const [zipFilter, setZipFilter] = useState<string>("");

  /**
   * ✅ Filter bathrooms in ONE place
   * - ZIP must match (if provided)
   * - latitude + longitude must exist
   * - lat/lng coerced to numbers
   */
  const filteredBathrooms = useMemo(() => {
    return bathrooms
      .filter((b) => {
        if (zipFilter && b.zip !== zipFilter) return false;
        if (b.latitude === null || b.longitude === null) return false;
        return true;
      })
      .map((b) => ({
        ...b,
        latitude: Number(b.latitude),
        longitude: Number(b.longitude),
      }));
  }, [bathrooms, zipFilter]);

  return (
    <>
      {/* ZIP SEARCH */}
      <div className="mb-4">
        <ZipSearch value={zipFilter} onSearch={setZipFilter} />

      </div>

      <p className="text-gray-700 mb-4">
        Find bathrooms near you. Tap a marker to view details.
      </p>

      {/* MAP */}
      <Map bathrooms={filteredBathrooms} />
    </>
  );
}
