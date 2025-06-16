import { useEffect, useState } from "react";
import { useWeather } from "./hooks/useWeather";
import WeatherCard from "./components/WeatherCard";
import { searchCities } from "./services/cityService";
import { FaGithub, FaTelegramPlane } from "react-icons/fa";

function App() {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { data, error, getWeather } = useWeather();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    const delay = setTimeout(() => {
      searchCities(city).then(setSuggestions);
    }, 300);
    return () => clearTimeout(delay);
  }, [city]);

  const handleSelect = (value) => {
    setCity(value);
    setSuggestions([]);
    getWeather(value.split(",")[0]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 px-6 py-3 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <img src="/logo-transparent.png" alt="Zakitech Logo" className="h-20 w-auto" />
        </div>

        <div className="flex items-center space-x-4">
          {/* Dark Mode Switch */}
          <div
            onClick={() => setIsDark(!isDark)}
            className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full p-1 flex items-center cursor-pointer transition"
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                isDark ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </div>
          <a
            href="https://github.com/Lopekys/Weather-UI.git"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            <FaGithub className="text-xl" />
          </a>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow">
        <div className="bg-cyan-400 dark:bg-gray-800 py-10 text-center text-white">
          <h1 className="text-4xl font-bold">Weather forecast</h1>
          <p className="mt-2">Current weather forecast for the city you are looking for</p>

          <div className="mt-6 relative max-w-md mx-auto">
            <input
              type="text"
              className="w-full p-3 rounded-full text-black focus:outline-none"
              placeholder="Search for a city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 bg-white dark:bg-gray-700 border w-full max-h-48 overflow-y-auto rounded shadow-md top-full mt-1 text-black dark:text-white">
                {suggestions.map((s, i) => (
                  <li
                    key={i}
                    className="p-2 hover:bg-blue-100 dark:hover:bg-gray-600 cursor-pointer"
                    onClick={() => handleSelect(s)}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow">
          {error && <p className="text-red-500 text-center">{error}</p>}
          {data && <WeatherCard data={data} />}
        </div>
      </main>

      {/* Footer */}
      <footer className="backdrop-blur-md bg-white/70 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-4 px-6 flex items-center justify-between text-sm">
        <div className="flex space-x-4">
          <a
            href="https://github.com/Lopekys/Weather-UI.git"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center border rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <FaGithub className="text-xl" />
          </a>
          <a
            href="https://t.me/test261122_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center border rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <FaTelegramPlane className="text-xl" />
          </a>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-xs text-right">
          © {new Date().getFullYear()} Tudor Frumuzachi. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
