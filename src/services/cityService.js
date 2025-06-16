export async function searchCities(query) {
  if (!query) return [];

  const res = await fetch(`https://photon.komoot.io/api/?q=${query}&limit=5`);
  const json = await res.json();

  return json.features.map(f => {
    const city = f.properties.name;
    const country = f.properties.country;
    return `${city}, ${country}`;
  });
}
