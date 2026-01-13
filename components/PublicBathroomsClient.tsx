// components/PublicBathroomsClient.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ZipSearch from "./ZipSearch";
import type { MapBathroom } from "@/lib/types";

type Props = {
  bathrooms: MapBathroom[];
  page: number;
  pageSize: number;
  total: number;
};

export default function PublicBathroomsClient({
  bathrooms,
  page,
  pageSize,
  total,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const zip = searchParams.get("zip") ?? "";

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(from + pageSize - 1, total);

  function setZip(nextZip: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (nextZip) {
      params.set("zip", nextZip);
      params.set("page", "1"); // reset pagination on new filter
    } else {
      params.delete("zip");
    }
    router.push(`/list?${params.toString()}`);
  }

  function goToPage(nextPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));
    router.push(`/list?${params.toString()}`);
  }

  return (
    <>
      {/* ZIP SEARCH */}
      <ZipSearch value={zip} onSearch={setZip} />


      {/* RESULT COUNT */}
      <p className="mt-4 text-sm text-gray-600">
        Showing {from}–{to} of {total}
      </p>

      {/* LIST */}
      <ul className="space-y-3 mt-4">
        {bathrooms.map((b) => (
          <li key={b.id} className="bg-white p-4 rounded shadow">
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
