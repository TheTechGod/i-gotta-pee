export async function geocodeAddress(address: string) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    address
  )}`;

  const res = await fetch(url, {
    headers: { "User-Agent": "iGottaPeeApp/1.0" },
  });

  const data = await res.json();

  if (!data || data.length === 0) {
    return null; // address not found
  }

  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
  };
}
