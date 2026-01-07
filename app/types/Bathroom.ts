// app/types/Bathroom.ts
export type Bathroom = {
  id: string; // UUID from Supabase
  name: string;
  address: string;

  zip: string | null;
  neighborhood: string | null;

  accessibility: string | null;

  latitude: number | null;
  longitude: number | null;

  created_at?: string | null;
};
