import { useState } from "react";
import { fetchWeather } from "../services/weatherService";

export function useWeather() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const getWeather = async (city) => {
    try {
      const weather = await fetchWeather(city);
      setData(weather);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  };

  return { data, error, getWeather };
}
