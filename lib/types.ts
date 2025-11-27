// lib/types.ts

export interface Bathroom {
  id: string;
  name: string;
  address: string | null;
  latitude: number;
  longitude: number;
  accessibility: string | null;
  created_at: string;
}
