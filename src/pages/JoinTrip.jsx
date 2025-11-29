// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const BACKEND_URL = "http://localhost:5000";

// export default function JoinTrip() {
//   const [code, setCode] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleJoinTrip = async (e) => {
//     e.preventDefault();
//     if (!code.trim()) return alert("Please enter a trip code");

//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("Please login first");
//         return;
//       }

//       // ✅ Send inviteCode to backend
//       const res = await axios.post(
//         `${BACKEND_URL}/api/trips/join`,
//         { code }, // <--- key must match backend
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert("Joined trip successfully!");
//       // ✅ Navigate to trip detail page
//       navigate(`/trip/${res.data.trip._id}`);
//     } catch (err) {
//       console.error("Join trip error:", err);
//       alert(err.response?.data?.message || "Failed to join trip. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
//       <div className="bg-white p-6 rounded-xl shadow-lg w-80">
//         <h1 className="text-2xl font-semibold text-center mb-4 text-blue-600">
//           Join Trip
//         </h1>
//         <form onSubmit={handleJoinTrip}>
//           <input
//             type="text"
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//             placeholder="Enter trip code"
//             className="border p-2 rounded w-full mb-3"
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full transition"
//           >
//             {loading ? "Joining..." : "Join Trip"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }





import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = "http://localhost:5000";

export default function JoinTrip() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleJoinTrip = async (e) => {
    e.preventDefault();
    if (!code.trim()) return alert("Please enter a trip code");

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        return;
      }

      const res = await axios.post(
        `${BACKEND_URL}/api/trips/join`,
        { code },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Joined trip successfully!");
      navigate(`/trip/${res.data.trip._id}`);
    } catch (err) {
      console.error("Join trip error:", err);
      alert(err.response?.data?.message || "Failed to join trip. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#faf8f6] px-6">
      <div className="w-full max-w-md bg-gradient-to-b from-[#1e293b]/90 to-[#0f172a]/90 backdrop-blur-xl border border-[#d4af37]/30 rounded-2xl shadow-2xl p-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6 font-['Playfair_Display'] bg-gradient-to-r from-[#f9f7e8] to-[#d4af37] bg-clip-text text-transparent">
          Join a Trip ✈️
        </h1>

        {/* Form */}
        <form onSubmit={handleJoinTrip} className="space-y-5 font-['Poppins']">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter trip code"
            className="w-full bg-[#faf8f6]/10 text-[#f9f7e8] border border-[#d4af37]/40 rounded-xl px-4 py-2.5 placeholder-[#f9f7e8]/50 focus:ring-2 focus:ring-[#d4af37] outline-none transition-all"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] font-semibold py-2.5 rounded-xl shadow-md hover:shadow-lg hover:from-[#e6c85c] hover:to-[#d4af37] transition-all duration-300 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-[#0f172a]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Joining...
              </>
            ) : (
              "Join Trip"
            )}
          </button>
        </form>

        {/* Subtle Divider */}
        <div className="mt-8 w-full h-[2px] bg-gradient-to-r from-[#d4af37]/40 via-[#f9f7e8]/20 to-[#d4af37]/40" />

        {/* Footer */}
        <p className="text-center text-[#f9f7e8]/70 mt-4 text-sm">
          Don’t have a trip code?{" "}
          <span
            onClick={() => navigate("/create-trip")}
            className="text-[#d4af37] font-semibold cursor-pointer hover:underline"
          >
            Create a new trip
          </span>
        </p>
      </div>
    </div>
  );
}
