// lib/geocodeZip.ts
export async function geocodeZip(zip: string) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&postalcode=${zip}&country=us`
  );

  const data = await res.json();

  if (!data?.length) return null;

  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
  };
}
