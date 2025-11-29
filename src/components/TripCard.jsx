// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   Trash2,
//   Edit2,
//   CalendarDays,
//   MapPin,
//   Users,
//   Save,
//   X,
//   User,
//   Activity,
//   CheckCircle,
//   Sun,
//   Info,
// } from "lucide-react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";

// export default function TripCard({ trip, onDelete, onUpdate }) {
//   const { token, user } = useAuth();
//   const [isEditing, setIsEditing] = useState(false);
//   const [newTitle, setNewTitle] = useState(trip.title || "");
//   const [newDescription, setNewDescription] = useState(trip.description || "");
//   const [newDestination, setNewDestination] = useState(trip.destination || "");
//   const [weather, setWeather] = useState(null);
//   const [countdown, setCountdown] = useState("");
//   const [hovered, setHovered] = useState(false);
//   const [loading, setLoading] = useState(false);

//   if (!trip) return null;

//   const admin = trip.members?.find((m) => m.role === "admin");
//   const adminName = admin?.user?.name || "You";

//   const formatDate = (date) =>
//     new Date(date).toLocaleDateString("en-US", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });

//   /* Countdown */
//   useEffect(() => {
//     if (!trip.startDate || !trip.endDate) return;
//     const start = new Date(trip.startDate);
//     const end = new Date(trip.endDate);
//     const today = new Date();

//     if (today < start) {
//       const diff = Math.ceil((start - today) / (1000 * 60 * 60 * 24));
//       setCountdown(`Starts in ${diff} day${diff > 1 ? "s" : ""}`);
//     } else if (today >= start && today <= end) {
//       setCountdown("Trip in progress");
//     } else {
//       setCountdown("Trip ended");
//     }
//   }, [trip.startDate, trip.endDate]);

//   /* Weather */
//   useEffect(() => {
//     const fetchWeather = async () => {
//       try {
//         if (!trip.destination) return;
//         const res = await axios.get(
//           `http://localhost:5000/api/weather/quick?location=${encodeURIComponent(
//             trip.destination
//           )}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setWeather(res.data);
//       } catch (err) {
//         console.error("Weather fetch error:", err.message);
//       }
//     };
//     fetchWeather();
//   }, [trip.destination, token]);

//   /* Delete / Leave trip */
//   const handleDelete = async () => {
//     const isAdmin =
//       trip.members?.some(
//         (m) => m.user?._id === user?._id && m.role === "admin"
//       ) || false;

//     const confirmMessage = isAdmin
//       ? "Are you sure you want to permanently delete this trip?"
//       : "Are you sure you want to leave this trip?";
//     if (!window.confirm(confirmMessage)) return;

//     try {
//       const endpoint = isAdmin
//         ? `http://localhost:5000/api/trips/${trip._id}`
//         : `http://localhost:5000/api/trips/${trip._id}/leave`;

//       await axios.delete(endpoint, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       alert(isAdmin ? "Trip deleted successfully!" : "You left the trip!");
//       onDelete(trip._id);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete or leave trip. Please try again.");
//     }
//   };

//   /* Copy invite code */
//   const copyCode = () => {
//     if (trip.inviteCode) {
//       navigator.clipboard.writeText(trip.inviteCode);
//       alert(`Trip code ${trip.inviteCode} copied!`);
//     }
//   };

//   /* Update trip info */
//   const handleUpdate = async () => {
//     if (!newTitle.trim() || !newDestination.trim()) {
//       alert("Title and destination cannot be empty!");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await axios.put(
//         `http://localhost:5000/api/trips/${trip._id}`,
//         {
//           title: newTitle,
//           description: newDescription,
//           destination: newDestination,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert("Trip updated successfully!");
//       setIsEditing(false);
//       onUpdate(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update trip. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* Open Google Maps route */
//   const openRouteToDestination = () => {
//     if (!trip.destination) return alert("Destination not set for this trip.");

//     if (!navigator.geolocation)
//       return alert("Geolocation is not supported by your browser.");

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         const url = `https://www.google.com/maps/dir/${latitude},${longitude}/${encodeURIComponent(
//           trip.destination
//         )}`;
//         window.open(url, "_blank");
//       },
//       () => alert("Failed to get your location.")
//     );
//   };

//   const memberNames =
//     trip.members?.map((m) => m.user?.name || "Unknown") || [];

//   return (
//     <div className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-3xl p-6 shadow-md hover:shadow-2xl transition-transform hover:-translate-y-2 border border-blue-100 overflow-hidden">
//       {/* Floating Gradient Header */}
//       <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-400 to-pink-400 rounded-t-3xl" />

//       {/* Action Buttons */}
//       <div className="absolute top-4 right-4 flex gap-3">
//         <button
//           onClick={handleDelete}
//           className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition"
//           title="Delete Trip"
//         >
//           <Trash2 className="w-5 h-5" />
//         </button>
//         <button
//           onClick={() => setIsEditing(true)}
//           className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
//           title="Edit Trip"
//         >
//           <Edit2 className="w-5 h-5" />
//         </button>
//       </div>

//       {/* Trip Title */}
//       <h2 className="text-2xl font-bold text-gray-800 mb-1 flex items-center gap-2">
//         <Info className="text-blue-500 w-5 h-5" /> {trip.title || "Untitled Trip"}
//       </h2>

//       {/* Creator */}
//       <p className="text-gray-600 mb-2 flex items-center gap-2">
//         <User className="w-4 h-4 text-gray-500" /> Created by:{" "}
//         <span className="font-medium">{adminName}</span>
//       </p>

//       {/* Destination */}
//       {trip.destination && (
//         <div
//           onClick={openRouteToDestination}
//           className="flex items-center gap-2 text-blue-700 font-semibold cursor-pointer hover:underline mb-3"
//         >
//           <MapPin className="w-4 h-4 text-red-500" />
//           {trip.destination}
//         </div>
//       )}

//       {/* Members */}
//       <div
//         className="relative inline-block"
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//       >
//         <p className="text-gray-700 flex items-center gap-2 cursor-default">
//           <Users className="w-4 h-4 text-blue-500" />
//           {trip.members?.length || 0} member
//           {(trip.members?.length || 0) > 1 ? "s" : ""}
//         </p>

//         {hovered && memberNames.length > 0 && (
//           <div className="absolute z-10 mt-3 bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl rounded-xl p-3 text-sm text-gray-700 w-64">
//             <p className="font-semibold mb-2 text-gray-800 flex items-center gap-1">
//               <Users className="w-4 h-4 text-blue-500" /> Members
//             </p>
//             <div className="flex flex-wrap gap-2">
//               {memberNames.map((name, idx) => (
//                 <div
//                   key={idx}
//                   className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition"
//                 >
//                   <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-semibold">
//                     {name.charAt(0).toUpperCase()}
//                   </div>
//                   <span className="text-gray-800 text-xs">{name}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Dates */}
//       {trip.startDate && trip.endDate && (
//         <div className="flex items-center text-gray-600 text-sm mt-3">
//           <CalendarDays size={16} className="mr-2 text-blue-500" />
//           {formatDate(trip.startDate)} → {formatDate(trip.endDate)}
//         </div>
//       )}

//       {/* Countdown */}
//       {countdown && (
//         <p
//           className={`mt-3 text-sm font-medium flex items-center gap-1 ${
//             countdown.includes("ended")
//               ? "text-gray-500"
//               : countdown.includes("progress")
//               ? "text-green-600"
//               : "text-blue-600"
//           }`}
//         >
//           {countdown.includes("progress") ? (
//             <Activity size={16} />
//           ) : countdown.includes("ended") ? (
//             <CheckCircle size={16} />
//           ) : (
//             <CalendarDays size={16} />
//           )}
//           {countdown}
//         </p>
//       )}

//       {/* Weather */}
//       {weather && weather.temp && (
//         <div className="flex items-center text-sm text-gray-700 mt-3">
//           <Sun className="w-4 h-4 text-yellow-500 mr-2" />
//           Today: {weather.temp}°C, {weather.description}
//         </div>
//       )}

//       {/* Description */}
//       {trip.description && (
//         <p className="text-gray-700 text-sm italic mt-3 leading-relaxed">
//           {trip.description}
//         </p>
//       )}

//       {/* Invite Code */}
//       {trip.inviteCode && (
//         <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-xl mt-4 shadow-sm">
//           <span className="text-blue-700 font-mono text-sm flex items-center gap-2">
//             <Info className="w-4 h-4 text-blue-500" /> Code: {trip.inviteCode}
//           </span>
//           <button
//             onClick={copyCode}
//             className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition text-xs"
//           >
//             Copy
//           </button>
//         </div>
//       )}

//       {/* View Trip */}
//       <Link
//         to={`/trip/${trip._id}`}
//         className="block text-center mt-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium shadow hover:opacity-90 transition"
//       >
//         View Trip →
//       </Link>

//       {/* Edit Modal */}
//       {isEditing && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-200">
//             <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
//               <Edit2 className="w-5 h-5 text-blue-500" />
//               Edit Trip Details
//             </h3>

//             <label className="block text-sm mb-1 text-gray-600">Title</label>
//             <input
//               type="text"
//               value={newTitle}
//               onChange={(e) => setNewTitle(e.target.value)}
//               className="border border-gray-300 rounded-lg p-2 w-full mb-3 focus:ring-2 focus:ring-blue-400"
//             />

//             <label className="block text-sm mb-1 text-gray-600">
//               Destination
//             </label>
//             <input
//               type="text"
//               value={newDestination}
//               onChange={(e) => setNewDestination(e.target.value)}
//               className="border border-gray-300 rounded-lg p-2 w-full mb-3 focus:ring-2 focus:ring-blue-400"
//             />

//             <label className="block text-sm mb-1 text-gray-600">
//               Description
//             </label>
//             <textarea
//               value={newDescription}
//               onChange={(e) => setNewDescription(e.target.value)}
//               className="border border-gray-300 rounded-lg p-2 w-full mb-4 focus:ring-2 focus:ring-blue-400"
//               rows={3}
//             />

//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setIsEditing(false)}
//                 className="flex items-center gap-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
//               >
//                 <X className="w-4 h-4" /> Cancel
//               </button>
//               <button
//                 onClick={handleUpdate}
//                 disabled={loading}
//                 className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
//               >
//                 <Save className="w-4 h-4" />
//                 {loading ? "Saving..." : "Save"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Trash2,
  Edit2,
  CalendarDays,
  MapPin,
  Users,
  Save,
  X,
  User,
  Activity,
  CheckCircle,
  Sun,
  Info,
} from "lucide-react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function TripCard({ trip, onDelete, onUpdate }) {
  const { token, user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(trip.title || "");
  const [newDescription, setNewDescription] = useState(trip.description || "");
  const [newDestination, setNewDestination] = useState(trip.destination || "");
  const [weather, setWeather] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [hovered, setHovered] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!trip) return null;

  const admin = trip.members?.find((m) => m.role === "admin");
  const adminName = admin?.user?.name || "You";

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  /* Countdown */
  useEffect(() => {
    if (!trip.startDate || !trip.endDate) return;
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    const today = new Date();

    if (today < start) {
      const diff = Math.ceil((start - today) / (1000 * 60 * 60 * 24));
      setCountdown(`Starts in ${diff} day${diff > 1 ? "s" : ""}`);
    } else if (today >= start && today <= end) {
      setCountdown("Trip in progress");
    } else {
      setCountdown("Trip ended");
    }
  }, [trip.startDate, trip.endDate]);

  /* Weather */
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if (!trip.destination) return;
        const res = await axios.get(
          `http://localhost:5000/api/weather/quick?location=${encodeURIComponent(
            trip.destination
          )}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setWeather(res.data);
      } catch (err) {
        console.error("Weather fetch error:", err.message);
      }
    };
    fetchWeather();
  }, [trip.destination, token]);

  /* Delete / Leave trip */
  const handleDelete = async () => {
    const isAdmin =
      trip.members?.some(
        (m) => m.user?._id === user?._id && m.role === "admin"
      ) || false;

    const confirmMessage = isAdmin
      ? "Are you sure you want to permanently delete this trip?"
      : "Are you sure you want to leave this trip?";
    if (!window.confirm(confirmMessage)) return;

    try {
      const endpoint = isAdmin
        ? `http://localhost:5000/api/trips/${trip._id}`
        : `http://localhost:5000/api/trips/${trip._id}/leave`;

      await axios.delete(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(isAdmin ? "Trip deleted successfully!" : "You left the trip!");
      onDelete(trip._id);
    } catch (err) {
      console.error(err);
      alert("Failed to delete or leave trip. Please try again.");
    }
  };

  /* Copy invite code */
  const copyCode = () => {
    if (trip.inviteCode) {
      navigator.clipboard.writeText(trip.inviteCode);
      alert(`Trip code ${trip.inviteCode} copied!`);
    }
  };

  /* Update trip info */
  const handleUpdate = async () => {
    if (!newTitle.trim() || !newDestination.trim()) {
      alert("Title and destination cannot be empty!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:5000/api/trips/${trip._id}`,
        {
          title: newTitle,
          description: newDescription,
          destination: newDestination,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Trip updated successfully!");
      setIsEditing(false);
      onUpdate(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to update trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* Open Google Maps route */
  const openRouteToDestination = () => {
    if (!trip.destination) return alert("Destination not set for this trip.");

    if (!navigator.geolocation)
      return alert("Geolocation is not supported by your browser.");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://www.google.com/maps/dir/${latitude},${longitude}/${encodeURIComponent(
          trip.destination
        )}`;
        window.open(url, "_blank");
      },
      () => alert("Failed to get your location.")
    );
  };

  const memberNames =
    trip.members?.map((m) => m.user?.name || "Unknown") || [];

  return (
    <div className="relative bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#faf8f6] rounded-3xl p-6 border border-[#d4af37]/20 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden font-['Poppins']">
      {/* 🟨 Decorative Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/10 via-transparent to-[#b8860b]/10 blur-3xl -z-10" />

      {/* Action Buttons */}
      <div className="absolute top-4 right-4 flex gap-3">
        <button
          onClick={handleDelete}
          className="p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
          title="Delete Trip"
        >
          <Trash2 className="w-5 h-5" />
        </button>
        <button
          onClick={() => setIsEditing(true)}
          className="p-2 rounded-full bg-[#d4af37]/20 text-[#d4af37] hover:bg-[#d4af37]/30 transition"
          title="Edit Trip"
        >
          <Edit2 className="w-5 h-5" />
        </button>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold bg-gradient-to-r from-[#f9f7e8] to-[#d4af37] bg-clip-text text-transparent mb-2 flex items-center gap-2 font-['Playfair_Display']">
        <Info className="w-5 h-5 text-[#d4af37]" /> {trip.title || "Untitled Trip"}
      </h2>

      {/* Creator */}
      <p className="text-[#f9f7e8]/80 flex items-center gap-2 mb-2 text-sm">
        <User className="w-4 h-4 text-[#d4af37]" /> Created by:{" "}
        <span className="font-semibold">{adminName}</span>
      </p>

      {/* Destination */}
      {trip.destination && (
        <div
          onClick={openRouteToDestination}
          className="flex items-center gap-2 text-[#d4af37] font-semibold cursor-pointer hover:underline mb-3"
        >
          <MapPin className="w-4 h-4 text-[#d4af37]" />
          {trip.destination}
        </div>
      )}

      {/* Members */}
      <div
        className="relative inline-block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <p className="text-[#f9f7e8]/80 flex items-center gap-2 cursor-default">
          <Users className="w-4 h-4 text-[#d4af37]" />
          {trip.members?.length || 0} member
          {(trip.members?.length || 0) > 1 ? "s" : ""}
        </p>

        {hovered && memberNames.length > 0 && (
          <div className="absolute z-10 mt-3 bg-[#1e293b]/90 backdrop-blur-md border border-[#d4af37]/20 shadow-xl rounded-xl p-3 text-sm text-[#f9f7e8] w-64">
            <p className="font-semibold mb-2 flex items-center gap-1 text-[#d4af37]">
              <Users className="w-4 h-4" /> Members
            </p>
            <div className="flex flex-wrap gap-2">
              {memberNames.map((name, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-[#d4af37]/10 px-3 py-1 rounded-full hover:bg-[#d4af37]/20 transition"
                >
                  <div className="w-6 h-6 rounded-full bg-[#d4af37] text-[#0f172a] text-xs flex items-center justify-center font-semibold">
                    {name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs">{name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Dates & Countdown */}
      {trip.startDate && trip.endDate && (
        <div className="flex items-center text-[#f9f7e8]/70 text-sm mt-3">
          <CalendarDays size={16} className="mr-2 text-[#d4af37]" />
          {formatDate(trip.startDate)} → {formatDate(trip.endDate)}
        </div>
      )}

      {countdown && (
        <p
          className={`mt-3 text-sm font-medium flex items-center gap-1 ${
            countdown.includes("ended")
              ? "text-gray-400"
              : countdown.includes("progress")
              ? "text-green-400"
              : "text-[#d4af37]"
          }`}
        >
          {countdown.includes("progress") ? (
            <Activity size={16} />
          ) : countdown.includes("ended") ? (
            <CheckCircle size={16} />
          ) : (
            <CalendarDays size={16} />
          )}
          {countdown}
        </p>
      )}

      {/* Weather */}
      {weather && weather.temp && (
        <div className="flex items-center text-sm text-[#f9f7e8]/80 mt-3">
          <Sun className="w-4 h-4 text-[#d4af37] mr-2" />
          Today: {weather.temp}°C, {weather.description}
        </div>
      )}

      {/* Description */}
      {trip.description && (
        <p className="text-[#f9f7e8]/80 text-sm italic mt-3 leading-relaxed">
          {trip.description}
        </p>
      )}

      {/* Invite Code */}
      {trip.inviteCode && (
        <div className="flex items-center justify-between bg-[#d4af37]/10 p-3 rounded-xl mt-4 border border-[#d4af37]/30 shadow-sm">
          <span className="text-[#d4af37] font-mono text-sm flex items-center gap-2">
            <Info className="w-4 h-4" /> Code: {trip.inviteCode}
          </span>
          <button
            onClick={copyCode}
            className="bg-[#d4af37] text-[#0f172a] px-3 py-1 rounded-lg hover:bg-[#e6c85c] transition text-xs font-medium"
          >
            Copy
          </button>
        </div>
      )}

      {/* View Trip */}
      <Link
        to={`/trip/${trip._id}`}
        className="block text-center mt-5 py-2 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] font-semibold rounded-full shadow hover:shadow-lg hover:scale-105 transition-all"
      >
        View Trip →
      </Link>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1e293b] rounded-2xl p-6 w-full max-w-md border border-[#d4af37]/20 shadow-2xl">
            <h3 className="text-xl font-semibold mb-4 text-[#d4af37] flex items-center gap-2 font-['Playfair_Display']">
              <Edit2 className="w-5 h-5" /> Edit Trip Details
            </h3>

            <label className="block text-sm mb-1 text-[#f9f7e8]/70">Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="border border-[#d4af37]/30 bg-transparent rounded-lg p-2 w-full mb-3 focus:ring-2 focus:ring-[#d4af37] text-[#f9f7e8]"
            />

            <label className="block text-sm mb-1 text-[#f9f7e8]/70">
              Destination
            </label>
            <input
              type="text"
              value={newDestination}
              onChange={(e) => setNewDestination(e.target.value)}
              className="border border-[#d4af37]/30 bg-transparent rounded-lg p-2 w-full mb-3 focus:ring-2 focus:ring-[#d4af37] text-[#f9f7e8]"
            />

            <label className="block text-sm mb-1 text-[#f9f7e8]/70">
              Description
            </label>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="border border-[#d4af37]/30 bg-transparent rounded-lg p-2 w-full mb-4 focus:ring-2 focus:ring-[#d4af37] text-[#f9f7e8]"
              rows={3}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-1 px-4 py-2 bg-gray-500/30 text-gray-200 rounded-lg hover:bg-gray-500/50"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] rounded-lg font-semibold hover:scale-105 transition-all disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
