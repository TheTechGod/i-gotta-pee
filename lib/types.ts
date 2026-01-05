// lib/types.ts

// This matches what Supabase can realistically return.
// (Often lat/lng come back as string depending on your column type)
export type BathroomRow = {
  id: string;
  name: string;
  address: string;
  zip: string | null;
  neighborhood: string | null;
  accessibility: string | null;
  latitude: number | string | null;
  longitude: number | string | null;
};

// This is the “map-safe” version (no null coords)
export type MapBathroom = Omit<BathroomRow, "latitude" | "longitude"> & {
  latitude: number;
  longitude: number;
};
