
// // src/components/MapWeatherPanel.jsx
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Polyline,
//   Popup,
//   useMap,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// const BACKEND = import.meta.env.VITE_BACKEND_URL;

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//   iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
// });

// function haversine([lat1, lon1], [lat2, lon2]) {
//   const R = 6371;
//   const toRad = (v) => (v * Math.PI) / 180;
//   const dLat = toRad(lat2 - lat1);
//   const dLon = toRad(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
//   return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
// }

// function Recenter({ position }) {
//   const map = useMap();
//   useEffect(() => {
//     if (position) map.setView(position, 10, { animate: true });
//   }, [position]);
//   return null;
// }

// export default function MapWeatherPanel() {
//   const [source, setSource] = useState("");
//   const [dest, setDest] = useState("");
//   const [sourceCoords, setSourceCoords] = useState(null);
//   const [destCoords, setDestCoords] = useState(null);
//   const [distanceKm, setDistanceKm] = useState(null);
//   const [etaMinutes, setEtaMinutes] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const mapRef = useRef(null);

//   // ✅ Updated geocodeCity to use backend /quick route
//   const geocodeCity = async (city) => {
//     try {
//       const res = await axios.get(
//         `${BACKEND}/api/weather/quick?location=${encodeURIComponent(city)}`
//       );
//       if (!res.data.coord) throw new Error("City not found");
//       const { lat, lon } = res.data.coord;
//       return [lat, lon];
//     } catch (err) {
//       console.error("Geocoding failed:", err);
//       throw err;
//     }
//   };

//   const handleRouteSearch = async (e) => {
//     e.preventDefault();
//     if (!source || !dest) return alert("Enter both source and destination");
//     try {
//       setLoading(true);
//       setError(null);
//       const src = await geocodeCity(source);
//       const dst = await geocodeCity(dest);
//       setSourceCoords(src);
//       setDestCoords(dst);
//       const d = haversine(src, dst);
//       setDistanceKm(d);
//       setEtaMinutes(Math.round((d / 50) * 60));
//       setSource("");
//       setDest("");
//     } catch (err) {
//       console.error(err);
//       setError("Failed to find route. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClearRoute = () => {
//     setSourceCoords(null);
//     setDestCoords(null);
//     setDistanceKm(null);
//     setEtaMinutes(null);
//     setError(null);
//     if (mapRef.current) mapRef.current.setView([20.5937, 78.9629], 5);
//   };

//   const copyRouteLink = () => {
//     if (!sourceCoords || !destCoords) return alert("Search route first!");
//     const link = `https://www.google.com/maps/dir/?api=1&origin=${sourceCoords[0]},${sourceCoords[1]}&destination=${destCoords[0]},${destCoords[1]}&travelmode=driving`;
//     navigator.clipboard.writeText(link);
//     alert("✅ Google Maps route link copied!");
//   };

//   // 🌤 Weather Section
//   const [weatherCity, setWeatherCity] = useState("");
//   const [weatherData, setWeatherData] = useState(null);
//   const [weatherLoading, setWeatherLoading] = useState(false);

//   const handleWeatherCheck = async (e) => {
//     e.preventDefault();
//     if (!weatherCity.trim()) return;
//     try {
//       setWeatherLoading(true);
//       const res = await axios.get(
//         `${BACKEND}/api/weather/quick?location=${encodeURIComponent(weatherCity)}`
//       );
//       setWeatherData(res.data);
//       setWeatherCity("");
//     } catch (err) {
//       console.error(err);
//       setWeatherData(null);
//       alert("City not found or weather unavailable.");
//     } finally {
//       setWeatherLoading(false);
//     }
//   };

//   const safeIcon = (w) =>
//     w?.icon
//       ? w.icon
//       : w?.weather?.[0]?.icon
//       ? `https://openweathermap.org/img/wn/${w.weather[0].icon}@2x.png`
//       : null;

//   return (
//     <div className="p-4 bg-gray-50 rounded-lg shadow flex flex-col lg:flex-row gap-6">
//       {/* 🗺 LEFT SIDE - Map & Route Planner */}
//       <div className="lg:w-2/3 space-y-6">
//         <h2 className="text-2xl font-bold text-blue-700 text-center">
//           🗺 Route Planner
//         </h2>

//         <form
//           onSubmit={handleRouteSearch}
//           className="flex flex-wrap gap-2 justify-center"
//         >
//           <input
//             type="text"
//             placeholder="Enter Source City"
//             value={source}
//             onChange={(e) => setSource(e.target.value)}
//             className="border px-3 py-2 rounded-md w-52"
//           />
//           <input
//             type="text"
//             placeholder="Enter Destination City"
//             value={dest}
//             onChange={(e) => setDest(e.target.value)}
//             className="border px-3 py-2 rounded-md w-52"
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             {loading ? "Finding..." : "Show Route"}
//           </button>
//         </form>

//         {error && <p className="text-red-600 text-center">{error}</p>}

//         <div className="relative h-[420px] border rounded-md overflow-hidden">
//           <MapContainer
//             center={[20.5937, 78.9629]}
//             zoom={5}
//             style={{ height: "100%", width: "100%" }}
//             whenCreated={(m) => (mapRef.current = m)}
//           >
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution="© OpenStreetMap"
//             />
//             {sourceCoords && (
//               <Marker position={sourceCoords}>
//                 <Popup>Source</Popup>
//               </Marker>
//             )}
//             {destCoords && (
//               <Marker position={destCoords}>
//                 <Popup>Destination</Popup>
//               </Marker>
//             )}
//             {sourceCoords && destCoords && (
//               <Polyline positions={[sourceCoords, destCoords]} color="blue" />
//             )}
//             {sourceCoords && <Recenter position={sourceCoords} />}
//           </MapContainer>

//           {sourceCoords && destCoords && (
//             <button
//               onClick={handleClearRoute}
//               className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition-transform hover:scale-105 z-[1000]"
//             >
//               🧹 Clear Route
//             </button>
//           )}
//         </div>

//         <div className="bg-white p-4 rounded-md border shadow flex flex-wrap justify-between items-center">
//           <div>
//             <p className="text-gray-500 text-sm">Distance</p>
//             <p className="text-lg font-semibold">
//               {distanceKm ? `${distanceKm.toFixed(2)} km` : "—"}
//             </p>
//           </div>
//           <div>
//             <p className="text-gray-500 text-sm">ETA (approx)</p>
//             <p className="text-lg font-semibold">
//               {etaMinutes ? `${etaMinutes} min` : "—"}
//             </p>
//           </div>
//           <button
//             onClick={copyRouteLink}
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           >
//             📍 Copy Route
//           </button>
//         </div>
//       </div>

//       {/* 🌤 RIGHT SIDE - Weather Checker */}
//       <div className="lg:w-1/3 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 rounded-2xl border border-blue-200 p-6 text-center shadow-inner">
//         <h3 className="text-2xl font-bold mb-5 text-blue-800 flex justify-center items-center gap-2">
//           🌤 Live Weather Checker
//         </h3>

//         <form
//           onSubmit={handleWeatherCheck}
//           className="flex justify-center gap-3 flex-wrap mb-5"
//         >
//           <input
//             type="text"
//             placeholder="🔍 Enter city name..."
//             value={weatherCity}
//             onChange={(e) => setWeatherCity(e.target.value)}
//             className="border border-blue-300 bg-white/70 px-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 transition-all duration-300"
//           />
//           <button
//             type="submit"
//             className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-6 py-2 rounded-lg hover:scale-105 transition-transform duration-300 shadow-md"
//             disabled={weatherLoading}
//           >
//             {weatherLoading ? "☁ Checking..." : "☀ Check Weather"}
//           </button>
//         </form>

//         {weatherData && (
//           <div className="mt-6 flex flex-col items-center gap-2 animate-fadeIn">
//             <div className="bg-white/70 backdrop-blur-md border border-blue-200 rounded-2xl shadow-lg px-8 py-6 w-[280px] sm:w-[320px] transition-all hover:shadow-xl">
//               <div className="flex flex-col items-center">
//                 <h4 className="text-2xl font-bold text-blue-800 mb-2">
//                   {weatherData.name}
//                 </h4>
//                 {safeIcon(weatherData) && (
//                   <img
//                     src={safeIcon(weatherData)}
//                     alt="weather icon"
//                     width={80}
//                     className="drop-shadow-lg my-2"
//                   />
//                 )}
//                 <p className="capitalize text-gray-600">
//                   {weatherData.description ||
//                     weatherData.weather?.[0]?.description}
//                 </p>
//                 <p className="text-4xl font-extrabold text-blue-700 mt-3">
//                   🌡 {Math.round(weatherData.temp || weatherData.main?.temp)}°C
//                 </p>
//                 <div className="mt-3 flex justify-between gap-4 text-gray-700 text-sm">
//                   <div className="flex flex-col items-center">
//                     💨
//                     <span>
//                       {weatherData.wind?.speed
//                         ? `${weatherData.wind.speed} m/s`
//                         : "—"}
//                     </span>
//                     <p className="text-xs text-gray-500">Wind</p>
//                   </div>
//                   <div className="flex flex-col items-center">
//                     💧
//                     <span>
//                       {weatherData.main?.humidity
//                         ? `${weatherData.main.humidity}%`
//                         : "—"}
//                     </span>
//                     <p className="text-xs text-gray-500">Humidity</p>
//                   </div>
//                   <div className="flex flex-col items-center">
//                     🌬
//                     <span>
//                       {weatherData.main?.feels_like
//                         ? `${weatherData.main.feels_like.toFixed(1)}°C`
//                         : "—"}
//                     </span>
//                     <p className="text-xs text-gray-500">Feels like</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




// src/components/MapWeatherPanel.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

// ✅ Marker setup
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ✅ Haversine distance calculation
function haversine([lat1, lon1], [lat2, lon2]) {
  const R = 6371;
  const toRad = (v) => (v * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function Recenter({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.setView(position, 10, { animate: true });
  }, [position]);
  return null;
}

export default function MapWeatherPanel() {
  const [source, setSource] = useState("");
  const [dest, setDest] = useState("");
  const [sourceCoords, setSourceCoords] = useState(null);
  const [destCoords, setDestCoords] = useState(null);
  const [distanceKm, setDistanceKm] = useState(null);
  const [etaMinutes, setEtaMinutes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);

  // 🔍 City geocoding via backend
  const geocodeCity = async (city) => {
    const res = await axios.get(
      `${BACKEND}/api/weather/quick?location=${encodeURIComponent(city)}`
    );
    if (!res.data.coord) throw new Error("City not found");
    const { lat, lon } = res.data.coord;
    return [lat, lon];
  };

  const handleRouteSearch = async (e) => {
    e.preventDefault();
    if (!source || !dest) return alert("Please enter both source and destination");
    try {
      setLoading(true);
      setError(null);
      const src = await geocodeCity(source);
      const dst = await geocodeCity(dest);
      setSourceCoords(src);
      setDestCoords(dst);
      const d = haversine(src, dst);
      setDistanceKm(d);
      setEtaMinutes(Math.round((d / 50) * 60));
    } catch {
      setError("Failed to find route. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearRoute = () => {
    setSourceCoords(null);
    setDestCoords(null);
    setDistanceKm(null);
    setEtaMinutes(null);
    setError(null);
    if (mapRef.current) mapRef.current.setView([20.5937, 78.9629], 5);
  };

  const copyRouteLink = () => {
    if (!sourceCoords || !destCoords) return alert("Search route first!");
    const link = `https://www.google.com/maps/dir/?api=1&origin=${sourceCoords[0]},${sourceCoords[1]}&destination=${destCoords[0]},${destCoords[1]}&travelmode=driving`;
    navigator.clipboard.writeText(link);
    alert("✅ Google Maps route link copied!");
  };

  // 🌤 Weather Section
  const [weatherCity, setWeatherCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);

  const handleWeatherCheck = async (e) => {
    e.preventDefault();
    if (!weatherCity.trim()) return;
    try {
      setWeatherLoading(true);
      const res = await axios.get(
        `${BACKEND}/api/weather/quick?location=${encodeURIComponent(weatherCity)}`
      );
      setWeatherData(res.data);
    } catch {
      alert("City not found or weather unavailable.");
    } finally {
      setWeatherLoading(false);
    }
  };

  const safeIcon = (w) =>
    w?.icon
      ? w.icon
      : w?.weather?.[0]?.icon
      ? `https://openweathermap.org/img/wn/${w.weather[0].icon}@2x.png`
      : null;

  // 🌌 UI Rendering
  return (
    <div className="p-6 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-3xl shadow-xl border border-[#d4af37]/20 text-[#f9f7e8] flex flex-col lg:flex-row gap-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/10 via-transparent to-[#b8860b]/10 blur-3xl -z-10" />

      {/* 🗺 LEFT SIDE - Route Planner */}
      <div className="lg:w-2/3 space-y-6">
        <h2 className="text-2xl font-bold text-[#d4af37] text-center font-['Playfair_Display']">
          🗺 Route Planner
        </h2>

        <form
          onSubmit={handleRouteSearch}
          className="flex flex-wrap justify-center gap-3"
        >
          <input
            type="text"
            placeholder="Enter Source City"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="bg-[#1e293b]/80 border border-[#d4af37]/30 rounded-lg px-4 py-2 text-[#f9f7e8] placeholder-[#f9f7e8]/40 focus:ring-2 focus:ring-[#d4af37]/60 outline-none"
          />
          <input
            type="text"
            placeholder="Enter Destination City"
            value={dest}
            onChange={(e) => setDest(e.target.value)}
            className="bg-[#1e293b]/80 border border-[#d4af37]/30 rounded-lg px-4 py-2 text-[#f9f7e8] placeholder-[#f9f7e8]/40 focus:ring-2 focus:ring-[#d4af37]/60 outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] font-semibold px-6 py-2 rounded-lg hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all duration-300"
          >
            {loading ? "Finding..." : "Show Route"}
          </button>
        </form>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="relative h-[420px] border border-[#d4af37]/30 rounded-xl overflow-hidden">
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            style={{ height: "100%", width: "100%" }}
            whenCreated={(m) => (mapRef.current = m)}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap"
            />
            {sourceCoords && <Marker position={sourceCoords}><Popup>Source</Popup></Marker>}
            {destCoords && <Marker position={destCoords}><Popup>Destination</Popup></Marker>}
            {sourceCoords && destCoords && (
              <Polyline positions={[sourceCoords, destCoords]} color="#d4af37" />
            )}
            {sourceCoords && <Recenter position={sourceCoords} />}
          </MapContainer>

          {sourceCoords && destCoords && (
            <button
              onClick={handleClearRoute}
              className="absolute top-4 right-4 bg-[#b8860b] text-[#0f172a] px-4 py-2 rounded-full hover:bg-[#d4af37] shadow-lg transition-all duration-300"
            >
              🧹 Clear Route
            </button>
          )}
        </div>

        <div className="bg-[#1e293b]/70 border border-[#d4af37]/30 p-4 rounded-xl flex justify-between items-center shadow-inner text-[#f9f7e8]">
          <div>
            <p className="text-sm opacity-70">Distance</p>
            <p className="text-lg font-semibold text-[#d4af37]">
              {distanceKm ? `${distanceKm.toFixed(2)} km` : "—"}
            </p>
          </div>
          <div>
            <p className="text-sm opacity-70">ETA (approx)</p>
            <p className="text-lg font-semibold text-[#d4af37]">
              {etaMinutes ? `${etaMinutes} min` : "—"}
            </p>
          </div>
          <button
            onClick={copyRouteLink}
            className="bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] font-semibold px-5 py-2 rounded-lg hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all duration-300"
          >
            📍 Copy Route
          </button>
        </div>
      </div>

      {/* 🌤 RIGHT SIDE - Weather Checker */}
      <div className="lg:w-1/3 bg-[#1e293b]/70 border border-[#d4af37]/30 rounded-2xl p-6 text-center shadow-inner">
        <h3 className="text-2xl font-bold mb-5 text-[#d4af37] font-['Playfair_Display']">
          🌤 Live Weather
        </h3>

        <form
          onSubmit={handleWeatherCheck}
          className="flex flex-wrap justify-center gap-3 mb-6"
        >
          <input
            type="text"
            placeholder="Enter city name..."
            value={weatherCity}
            onChange={(e) => setWeatherCity(e.target.value)}
            className="bg-[#0f172a]/70 border border-[#d4af37]/30 px-4 py-2 rounded-lg text-[#f9f7e8] placeholder-[#f9f7e8]/40 focus:ring-2 focus:ring-[#d4af37]/60 outline-none"
          />
          <button
            type="submit"
            disabled={weatherLoading}
            className="bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] font-semibold px-6 py-2 rounded-lg hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all duration-300"
          >
            {weatherLoading ? "☁ Checking..." : "☀ Check"}
          </button>
        </form>

        {weatherData && (
          <div className="bg-[#0f172a]/60 rounded-2xl border border-[#d4af37]/30 shadow-md px-6 py-5 w-[280px] mx-auto">
            <h4 className="text-xl font-bold text-[#e6c85c] mb-2">{weatherData.name}</h4>
            {safeIcon(weatherData) && (
              <img
                src={safeIcon(weatherData)}
                alt="Weather"
                width={80}
                className="mx-auto my-2"
              />
            )}
            <p className="capitalize text-[#f9f7e8]/70">
              {weatherData.description || weatherData.weather?.[0]?.description}
            </p>
            <p className="text-4xl font-extrabold text-[#d4af37] mt-3">
              🌡 {Math.round(weatherData.temp || weatherData.main?.temp)}°C
            </p>
            <div className="mt-4 flex justify-between text-sm text-[#f9f7e8]/70">
              <p>💨 {weatherData.wind?.speed || "—"} m/s</p>
              <p>💧 {weatherData.main?.humidity || "—"}%</p>
              <p>🌬 {weatherData.main?.feels_like?.toFixed(1) || "—"}°C</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
