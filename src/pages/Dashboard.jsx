// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import TripCard from "../components/TripCard";
// import { useAuth } from "../context/AuthContext";
// import TripCountdown from "../components/TripCountdown";
// import WeatherToday from "../components/WeatherToday";

// export default function Dashboard() {
//   const { user, token } = useAuth();
//   const [trips, setTrips] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTrips = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/trips", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setTrips(res.data);
//       } catch (err) {
//         console.error("Error fetching trips:", err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (token) fetchTrips();
//   }, [token]);

//   // ✅ Handle delete for UI update
//   const handleDeleteTrip = (tripId) => {
//     setTrips((prevTrips) => prevTrips.filter((t) => t._id !== tripId));
//   };

//   const handleTripUpdate = (updatedTrip) => {
//     setTrips((prev) =>
//       prev.map((t) => (t._id === updatedTrip._id ? updatedTrip : t))
//     );
//   };

//   // ✅ Pick nearest upcoming trip for countdown & weather
//   const nearestUpcomingTrip =
//     trips
//       .filter((t) => new Date(t.startDate) >= new Date())
//       .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))[0] || null;

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-15">
//       {/* ---- Header Section ---- */}
//       <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
//         <h1 className="text-3xl font-bold text-blue-600">Your Trips</h1>

//         <div className="flex gap-3">
//           <button
//             onClick={() => navigate("/join-trip")}
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
//           >
//             🔗 Join a Trip
//           </button>

//           <Link
//             to="/create-trip"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//           >
//             + Create New Trip
//           </Link>
//         </div>
//       </div>

//       {/* 🌟 NEW FEATURE SECTION — Countdown + Weather */}
//       {nearestUpcomingTrip && (
//         <div className="grid md:grid-cols-2 gap-4 mb-8">
//           <TripCountdown trip={nearestUpcomingTrip} />
//           <WeatherToday trip={nearestUpcomingTrip} />
//         </div>
//       )}

//       {/* ---- Trips Section ---- */}
//       {loading ? (
//         <p className="text-gray-600">Loading trips...</p>
//       ) : trips.length === 0 ? (
//         <p className="text-gray-600">
//           No trips found. Create or join one to get started!
//         </p>
//       ) : (
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {trips.map((trip) => (
//             <TripCard
//               key={trip._id}
//               trip={trip}
//               onDelete={handleDeleteTrip}
//               onUpdate={handleTripUpdate}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import TripCard from "../components/TripCard";
// import { useAuth } from "../context/AuthContext";
// import TripCountdown from "../components/TripCountdown";
// import WeatherToday from "../components/WeatherToday";

// export default function Dashboard() {
//   const { user, token } = useAuth();
//   const [trips, setTrips] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTrips = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/trips", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setTrips(res.data);
//       } catch (err) {
//         console.error("Error fetching trips:", err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (token) fetchTrips();
//   }, [token]);

//   const handleDeleteTrip = (tripId) => {
//     setTrips((prevTrips) => prevTrips.filter((t) => t._id !== tripId));
//   };

//   const handleTripUpdate = (updatedTrip) => {
//     setTrips((prev) =>
//       prev.map((t) => (t._id === updatedTrip._id ? updatedTrip : t))
//     );
//   };

//   const nearestUpcomingTrip =
//     trips
//       .filter((t) => new Date(t.startDate) >= new Date())
//       .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))[0] || null;

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-20 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#faf8f6] min-h-screen rounded-2xl shadow-xl">
//       {/* ---- Header Section ---- */}
//       <div className="flex flex-wrap justify-between items-center mb-10 gap-3">
//         <h1 className="text-4xl font-bold font-['Playfair_Display'] bg-gradient-to-r from-[#f9f7e8] to-[#d4af37] bg-clip-text text-transparent">
//           ✈️ Your Trips
//         </h1>

//         <div className="flex gap-4">
//           <button
//             onClick={() => navigate("/join-trip")}
//             className="bg-gradient-to-r from-[#b8860b]/90 to-[#d4af37]/90 text-[#0f172a] font-semibold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
//           >
//             🔗 Join a Trip
//           </button>

//           <Link
//             to="/create-trip"
//             className="bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] font-semibold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
//           >
//             + Create New Trip
//           </Link>
//         </div>
//       </div>

//       {/* 🌟 FEATURE SECTION — Countdown + Weather */}
//       {nearestUpcomingTrip && (
//         <div className="grid md:grid-cols-2 gap-6 mb-10">
//           <div className="rounded-2xl bg-gradient-to-br from-[#1e293b]/90 to-[#0f172a]/95 border border-[#d4af37]/30 shadow-lg backdrop-blur-xl p-6">
//             <TripCountdown trip={nearestUpcomingTrip} />
//           </div>

//           <div className="rounded-2xl bg-gradient-to-br from-[#1e293b]/90 to-[#0f172a]/95 border border-[#d4af37]/30 shadow-lg backdrop-blur-xl p-6">
//             <WeatherToday trip={nearestUpcomingTrip} />
//           </div>
//         </div>
//       )}

//       {/* ---- Trips Section ---- */}
//       {loading ? (
//         <p className="text-[#f9f7e8]/80 text-center italic font-['Poppins']">
//           Loading your trips...
//         </p>
//       ) : trips.length === 0 ? (
//         <div className="text-center text-[#f9f7e8]/70 mt-10">
//           <p className="text-lg font-['Poppins']">
//             No trips found. Start by creating or joining one below.
//           </p>
//           <Link
//             to="/create-trip"
//             className="inline-block mt-4 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition"
//           >
//             + Create Trip
//           </Link>
//         </div>
//       ) : (
//         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//           {trips.map((trip) => (
//             <div
//               key={trip._id}
//               className="rounded-2xl bg-gradient-to-b from-[#1e293b]/80 to-[#0f172a]/90 border border-[#d4af37]/20 shadow-xl hover:shadow-[#d4af37]/30 transition-all duration-300"
//             >
//               <TripCard
//                 trip={trip}
//                 onDelete={handleDeleteTrip}
//                 onUpdate={handleTripUpdate}
//               />
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Bottom Glow Divider */}
//       <div className="mt-14 w-full h-[2px] bg-gradient-to-r from-[#d4af37]/40 via-[#f9f7e8]/20 to-[#d4af37]/40" />
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import TripCard from "../components/TripCard";
import { useAuth } from "../context/AuthContext";
import TripCountdown from "../components/TripCountdown";
import WeatherToday from "../components/WeatherToday";

const BACKEND_URL = import.meta.env.VITE_API_URL; // ✅ use env-based API URL

export default function Dashboard() {
  const { user, token } = useAuth();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/trips`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTrips(res.data);
      } catch (err) {
        console.error("Error fetching trips:", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token && BACKEND_URL) fetchTrips();
  }, [token]);

  const handleDeleteTrip = (tripId) => {
    setTrips((prevTrips) => prevTrips.filter((t) => t._id !== tripId));
  };

  const handleTripUpdate = (updatedTrip) => {
    setTrips((prev) =>
      prev.map((t) => (t._id === updatedTrip._id ? updatedTrip : t))
    );
  };

  const nearestUpcomingTrip =
    trips
      .filter((t) => new Date(t.startDate) >= new Date())
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))[0] || null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#faf8f6] min-h-screen rounded-2xl shadow-xl">
      {/* ---- Header Section ---- */}
      <div className="flex flex-wrap justify-between items-center mb-10 gap-3">
        <h1 className="text-4xl font-bold font-['Playfair_Display'] bg-gradient-to-r from-[#f9f7e8] to-[#d4af37] bg-clip-text text-transparent">
          ✈️ Your Trips
        </h1>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/join-trip")}
            className="bg-gradient-to-r from-[#b8860b]/90 to-[#d4af37]/90 text-[#0f172a] font-semibold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
          >
            🔗 Join a Trip
          </button>

          <Link
            to="/create-trip"
            className="bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] font-semibold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
          >
            + Create New Trip
          </Link>
        </div>
      </div>

      {/* 🌟 FEATURE SECTION — Countdown + Weather */}
      {nearestUpcomingTrip && (
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="rounded-2xl bg-gradient-to-br from-[#1e293b]/90 to-[#0f172a]/95 border border-[#d4af37]/30 shadow-lg backdrop-blur-xl p-6">
            <TripCountdown trip={nearestUpcomingTrip} />
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-[#1e293b]/90 to-[#0f172a]/95 border border-[#d4af37]/30 shadow-lg backdrop-blur-xl p-6">
            <WeatherToday trip={nearestUpcomingTrip} />
          </div>
        </div>
      )}

      {/* ---- Trips Section ---- */}
      {loading ? (
        <p className="text-[#f9f7e8]/80 text-center italic font-['Poppins']">
          Loading your trips...
        </p>
      ) : trips.length === 0 ? (
        <div className="text-center text-[#f9f7e8]/70 mt-10">
          <p className="text-lg font-['Poppins']">
            No trips found. Start by creating or joining one below.
          </p>
          <Link
            to="/create-trip"
            className="inline-block mt-4 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition"
          >
            + Create Trip
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
            <div
              key={trip._id}
              className="rounded-2xl bg-gradient-to-b from-[#1e293b]/80 to-[#0f172a]/90 border border-[#d4af37]/20 shadow-xl hover:shadow-[#d4af37]/30 transition-all duration-300"
            >
              <TripCard
                trip={trip}
                onDelete={handleDeleteTrip}
                onUpdate={handleTripUpdate}
              />
            </div>
          ))}
        </div>
      )}

      {/* Bottom Glow Divider */}
      <div className="mt-14 w-full h-[2px] bg-gradient-to-r from-[#d4af37]/40 via-[#f9f7e8]/20 to-[#d4af37]/40" />
    </div>
  );
}
