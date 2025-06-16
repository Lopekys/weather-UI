import {
  WiThermometer,
  WiHumidity,
  WiBarometer,
  WiSunrise,
  WiSunset,
  WiTime4,
  WiCloud,
} from "react-icons/wi";

export default function WeatherCard({ data }) {
  const {
    name,
    sys,
    main,
    weather,
    wind,
    dt,
    timezone,
  } = data;

  const temp = Math.round(main.temp - 273.15);
  const feels = Math.round(main.feels_like - 273.15);
  const sunrise = new Date((sys.sunrise + timezone) * 1000).toUTCString().slice(17, 25);
  const sunset = new Date((sys.sunset + timezone) * 1000).toUTCString().slice(17, 25);
  const currentTime = new Date((dt + timezone) * 1000).toUTCString().slice(17, 25);

  return (
    <div className="text-gray-800 dark:text-gray-100">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <WiCloud className="text-2xl text-gray-700 dark:text-gray-100" />
        City: {name} ({sys.country})
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-100">
          <WiThermometer className="text-xl" />
          Temperature: {temp}°C (feels like {feels}°C)
        </div>

        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-100">
          <WiBarometer className="text-xl" />
          Pressure: {main.pressure} hPa
        </div>

        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-100">
          <WiHumidity className="text-xl" />
          Humidity: {main.humidity}%
        </div>

        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-100">
          <WiCloud className="text-xl" />
          Info: {weather[0].description}
        </div>

        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-100">
          <WiTime4 className="text-xl" />
          Current time: {currentTime}
        </div>

        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-100">
          <WiSunrise className="text-xl" />
          Sunrise: {sunrise}
        </div>

        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-100">
          <WiSunset className="text-xl" />
          Sunset: {sunset}
        </div>
      </div>
    </div>
  );
}