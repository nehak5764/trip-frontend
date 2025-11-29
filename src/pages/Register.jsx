// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function Register() {
//   const [formData, setFormData] = useState({ name: "", email: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
//       if (res.data?.token) {
//         login(res.data.user, res.data.token);
//         navigate("/dashboard");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration failed. Try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
//         <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
//           Create a TripMate Account
//         </h2>

//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-green-300"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-green-300"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-green-300"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-green-700 transition"
//           >
//             Register
//           </button>
//         </form>

//         <p className="text-center mt-4 text-gray-600">
//           Already have an account?{" "}
//           <a href="/login" className="text-blue-600 hover:underline">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }







import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserPlus } from "lucide-react";

export default function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      if (res.data?.token) {
        login(res.data.user, res.data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#faf8f6] px-6 py-10 font-['Poppins']">
      <div className="w-full max-w-md bg-gradient-to-br from-[#1e293b]/90 to-[#0f172a]/90 border border-[#d4af37]/30 backdrop-blur-xl rounded-2xl shadow-2xl p-8 relative">
        {/* 🟨 Header */}
        <div className="text-center mb-6">
          <div className="mx-auto w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] shadow-lg mb-4">
            <UserPlus size={28} />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#f9f7e8] to-[#d4af37] bg-clip-text text-transparent font-['Playfair_Display']">
            Create Your TripMate Account
          </h2>
          <p className="text-[#f9f7e8]/70 mt-2 text-sm">
            Join the journey — plan, travel, and share with your crew!
          </p>
        </div>

        {error && (
          <p className="text-red-400 text-center mb-4 bg-red-500/10 py-2 rounded-lg border border-red-500/30">
            {error}
          </p>
        )}

        {/* 🧾 Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-[#f9f7e8]/80 mb-1 font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full bg-transparent border border-[#d4af37]/40 text-[#f9f7e8] rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#d4af37] outline-none placeholder-[#f9f7e8]/50"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-[#f9f7e8]/80 mb-1 font-medium">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full bg-transparent border border-[#d4af37]/40 text-[#f9f7e8] rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#d4af37] outline-none placeholder-[#f9f7e8]/50"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-[#f9f7e8]/80 mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full bg-transparent border border-[#d4af37]/40 text-[#f9f7e8] rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#d4af37] outline-none placeholder-[#f9f7e8]/50"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-3 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] font-semibold py-2.5 rounded-xl shadow-md hover:shadow-lg hover:from-[#e6c85c] hover:to-[#d4af37] transition-all"
          >
            Register
          </button>
        </form>

        {/* 🔹 Footer */}
        <p className="text-center mt-6 text-[#f9f7e8]/70 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#d4af37] hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
