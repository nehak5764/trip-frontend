import { useEffect, useState } from "react";
import axios from "axios";

export default function WeatherToday({ trip }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");

  useEffect(() => {
    // 🌍 Get user's real location
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setLoading(true);

        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(
            `http://localhost:5000/api/weather?lat=${latitude}&lon=${longitude}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          setWeather(res.data);
          setCity(res.data.name);
        } catch (err) {
          console.error("Weather fetch failed:", err.message);
          setWeather(null);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.warn("Location access denied, defaulting to Delhi:", err.message);
        // Fallback: fetch by city
        axios
          .get("http://localhost:5000/api/weather/quick?location=Delhi")
          .then((res) => {
            setWeather(res.data);
            setCity(res.data.name);
          })
          .catch((err) => console.error("Fallback weather fetch failed:", err.message))
          .finally(() => setLoading(false));
      }
    );
  }, []);

  if (loading)
    return (
      <div className="bg-white rounded-xl shadow-md p-4 text-gray-500 text-sm">
        Loading weather info...
      </div>
    );

  if (!weather)
    return (
      <div className="bg-white rounded-xl shadow-md p-4 text-red-600 text-sm">
        Couldn’t fetch weather details.
      </div>
    );

  // ✅ Use returned field names directly
  const temp =
    typeof weather.temp === "number"
      ? Math.round(weather.temp)
      : Math.round(weather.main?.temp ?? 0);

  const desc = weather.description || weather.weather?.[0]?.description || "Clear";

  return (
    <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-yellow-400">
      <div className="text-sm text-gray-500 mb-1">Current Location Weather 🌤️</div>
      <div className="font-semibold text-gray-700">{city}</div>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-2xl font-bold text-yellow-500">
          {isNaN(temp) ? "–" : `${temp}°C`}
        </span>
        <span className="capitalize text-gray-600">{desc}</span>
      </div>
    </div>
  );
}
