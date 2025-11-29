
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const BACKEND_URL = "http://localhost:5000";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false); // ✅ Loader state
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setError("");
//     setLoading(true); // ✅ Start loader

//     try {
//       const res = await axios.post(`${BACKEND_URL}/api/auth/forgot-password`, { email });
//       setMessage(res.data.message);

//       // ✅ Stop loader before redirect
//       setLoading(false);

//       // Redirect to reset password page with email
//       setTimeout(() => navigate("/reset-password", { state: { email } }), 2000);
//     } catch (err) {
//       setLoading(false); // ✅ Stop loader on error
//       setError(err.response?.data?.message || "Error sending OTP");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6">
//       <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">Forgot Password</h2>

//         {message && <p className="text-green-600 text-center mb-3">{message}</p>}
//         {error && <p className="text-red-600 text-center mb-3">{error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-gray-700 mb-1">Email Address</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full flex justify-center items-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition ${
//               loading ? "opacity-70 cursor-not-allowed" : ""
//             }`}
//           >
//             {loading ? (
//               <>
//                 <svg
//                   className="animate-spin h-5 w-5 mr-2 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//                   ></path>
//                 </svg>
//                 Sending OTP...
//               </>
//             ) : (
//               "Send OTP"
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_API_URL; // ✅ use env, not localhost

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/auth/forgot-password`,
        { email }
      );
      setMessage(res.data.message);
      setLoading(false);
      setTimeout(
        () => navigate("/reset-password", { state: { email } }),
        2000
      );
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Error sending OTP");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#faf8f6] px-6">
      <div className="w-full max-w-md bg-gradient-to-b from-[#1e293b]/90 to-[#0f172a]/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#d4af37]/30 p-8">
        {/* 🔹 Title */}
        <h2 className="text-3xl font-bold text-center mb-6 font-['Playfair_Display'] bg-gradient-to-r from-[#f9f7e8] to-[#d4af37] bg-clip-text text-transparent">
          Forgot Password
        </h2>

        {/* ✅ Success & Error Messages */}
        {message && (
          <p className="text-center text-[#d4af37] font-medium mb-3 bg-[#d4af37]/10 py-2 rounded-lg border border-[#d4af37]/30">
            {message}
          </p>
        )}
        {error && (
          <p className="text-center text-red-400 font-medium mb-3 bg-red-900/30 py-2 rounded-lg border border-red-500/30">
            {error}
          </p>
        )}

        {/* 🔹 Form */}
        <form onSubmit={handleSubmit} className="space-y-5 font-['Poppins']">
          <div>
            <label className="block text-[#f9f7e8]/90 mb-1 font-medium">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#faf8f6]/10 text-[#f9f7e8] border border-[#d4af37]/40 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#d4af37] outline-none placeholder-[#f9f7e8]/50"
              placeholder="Enter your registered email"
              required
            />
          </div>

          {/* 🔹 Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] font-semibold py-2.5 rounded-xl shadow-md hover:shadow-lg hover:from-[#e6c85c] hover:to-[#d4af37] transition-all duration-200 ${
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
                Sending OTP...
              </>
            ) : (
              "Send OTP"
            )}
          </button>
        </form>

        {/* 🔹 Decorative Line */}
        <div className="mt-10 h-[2px] w-full bg-gradient-to-r from-[#d4af37]/40 via-[#f9f7e8]/30 to-[#d4af37]/40" />

        {/* 🔹 Footer Text */}
        <p className="text-center text-[#f9f7e8]/70 mt-4 text-sm">
          Remembered your password?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#d4af37] font-semibold cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}
