export async function fetchWeather(city) {
  const res = await fetch(`http://localhost:8000/weather?city=${city}`);
  if (!res.ok) throw new Error("City not found or API error");
  const json = await res.json();
  return json.weather_data;
}
