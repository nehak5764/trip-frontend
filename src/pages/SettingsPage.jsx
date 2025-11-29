// import { useState } from "react";
// import axios from "axios";
// import { Bell, Moon, Sun, Lock, ArrowLeftCircle } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
// import { useTheme } from "../context/ThemeContext";
// import { useNavigate } from "react-router-dom";

// export default function SettingsPage() {
//   const { token } = useAuth();
//   const { darkMode, setDarkMode } = useTheme(); // 🔥 Global theme
//   const [notifications, setNotifications] = useState(true);
//   const [currentPassword, setCurrentPassword] = useState(""); // 🆕 Added
//   const [newPassword, setNewPassword] = useState(""); // 🆕 Replaced 'password'
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate(); // ✅ for navigation

//   const toggleDarkMode = () => setDarkMode(!darkMode);

//   // ✅ Updated to send both current + new passwords
//   const handlePasswordChange = async () => {
//     if (!currentPassword.trim() || !newPassword.trim()) {
//       setMessage("⚠️ Please fill in both current and new passwords.");
//       return;
//     }

//     try {
//       await axios.put(
//         "http://localhost:5000/api/users/change-password",
//         { currentPassword, newPassword },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setCurrentPassword("");
//       setNewPassword("");
//       setMessage("✅ Password updated successfully!");
//     } catch (err) {
//       console.error("Password update failed:", err);
//       const errorMsg =
//         err.response?.data?.message || "❌ Failed to update password.";
//       setMessage(errorMsg);
//     }
//   };

//   return (
//     <div
//       className={`min-h-screen transition-colors duration-300 mt-15 relative ${
//         darkMode
//           ? "bg-gray-900 text-white"
//           : "bg-gradient-to-br from-purple-50 to-white text-gray-800"
//       } py-12 px-4`}
//     >
//       {/* 🔙 Back Button */}
//       <button
//         onClick={() => navigate(-1)} // ✅ Goes back to the previous page
//         className="absolute top-5 right-5 flex items-center gap-2 bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1.5 rounded-full text-sm font-medium transition-all "
//       >
//         <ArrowLeftCircle size={18} />
//         Back
//       </button>

//       <div
//         className={`max-w-3xl mx-auto rounded-2xl shadow-xl border mt-5 ${
//           darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
//         } p-8`}
//       >
//         <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
//           ⚙️ Settings
//         </h1>

//         {/* Theme */}
//         <div className="flex justify-between items-center py-4 border-b border-gray-300 dark:border-gray-600">
//           <span className="font-medium flex items-center gap-2">
//             {darkMode ? (
//               <Moon className="w-5 h-5 text-yellow-400" />
//             ) : (
//               <Sun className="w-5 h-5 text-yellow-500" />
//             )}
//             Dark Mode
//           </span>
//           <button
//             onClick={toggleDarkMode}
//             className={`px-4 py-1.5 rounded-full font-semibold text-sm transition ${
//               darkMode
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200 text-gray-800 hover:bg-gray-300"
//             }`}
//           >
//             {darkMode ? "On" : "Off"}
//           </button>
//         </div>

//         {/* Password */}
//         <div className="py-6">
//           <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
//             <Lock className="w-5 h-5 text-blue-500" /> Change Password
//           </h2>

//           {/* 🆕 Current Password Field */}
//           <input
//             type="password"
//             placeholder="Enter current password"
//             value={currentPassword}
//             onChange={(e) => setCurrentPassword(e.target.value)}
//             className={`border rounded-lg w-full px-4 py-2 mb-3 focus:ring-2 focus:ring-blue-400 outline-none ${
//               darkMode
//                 ? "bg-gray-700 border-gray-600 text-white"
//                 : "bg-white border-gray-300"
//             }`}
//           />

//           {/* 🆕 New Password Field */}
//           <input
//             type="password"
//             placeholder="Enter new password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             className={`border rounded-lg w-full px-4 py-2 mb-3 focus:ring-2 focus:ring-blue-400 outline-none ${
//               darkMode
//                 ? "bg-gray-700 border-gray-600 text-white"
//                 : "bg-white border-gray-300"
//             }`}
//           />

//           <button
//             onClick={handlePasswordChange}
//             className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
//           >
//             Update Password
//           </button>
//         </div>

//         {message && (
//           <p
//             className={`mt-3 text-center text-sm font-medium ${
//               message.includes("✅")
//                 ? "text-green-500 dark:text-green-400"
//                 : "text-red-500 dark:text-red-400"
//             }`}
//           >
//             {message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import axios from "axios";
import { Bell, Moon, Sun, Lock, ArrowLeftCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // ✅ use env, not localhost

export default function SettingsPage() {
  const { token } = useAuth();
  const { darkMode, setDarkMode } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handlePasswordChange = async () => {
    if (!currentPassword.trim() || !newPassword.trim()) {
      setMessage("⚠️ Please fill in both current and new passwords.");
      return;
    }

    try {
      await axios.put(
        `${BACKEND_URL}/api/users/change-password`,
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCurrentPassword("");
      setNewPassword("");
      setMessage("✅ Password updated successfully!");
    } catch (err) {
      console.error("Password update failed:", err);
      const errorMsg =
        err.response?.data?.message || "❌ Failed to update password.";
      setMessage(errorMsg);
    }
  };

  return (
    <div
      className={`min-h-screen py-16 px-6 mt-15 relative transition-colors duration-300 font-['Poppins'] ${
        darkMode
          ? "bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#faf8f6] text-[#f9f7e8]"
          : "bg-gradient-to-b from-[#f9f7e8] via-[#fefefe] to-[#faf8f6] text-[#0f172a]"
      }`}
    >
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-5 right-5 flex items-center gap-2 bg-[#d4af37]/20 text-[#d4af37] hover:bg-[#d4af37]/30 px-4 py-1.5 rounded-full text-sm font-medium transition-all border border-[#d4af37]/40 backdrop-blur-md"
      >
        <ArrowLeftCircle size={18} />
        Back
      </button>

      {/* ⚙️ Settings Container */}
      <div
        className={`max-w-3xl mx-auto rounded-2xl shadow-2xl p-8 backdrop-blur-xl border transition-all ${
          darkMode
            ? "bg-gradient-to-b from-[#1e293b]/90 to-[#0f172a]/90 border-[#d4af37]/30"
            : "bg-gradient-to-b from-white to-[#faf8f6] border-[#d4af37]/20"
        }`}
      >
        {/* 🟨 Header */}
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2 font-['Playfair_Display'] bg-gradient-to-r from-[#d4af37] to-[#b8860b] bg-clip-text text-transparent">
          ⚙️ Settings
        </h1>

        {/* 🌙 Theme Toggle */}
        <div className="flex justify-between items-center py-4 border-b border-[#d4af37]/30">
          <span className="font-medium flex items-center gap-2 text-[#f9f7e8]/90">
            {darkMode ? (
              <Moon className="w-5 h-5 text-[#d4af37]" />
            ) : (
              <Sun className="w-5 h-5 text-[#d4af37]" />
            )}
            Dark Mode
          </span>
          <button
            onClick={toggleDarkMode}
            className={`px-4 py-1.5 rounded-full font-semibold text-sm transition-all shadow-sm ${
              darkMode
                ? "bg-[#d4af37]/20 text-[#f9f7e8] border border-[#d4af37]/40 hover:bg-[#d4af37]/30"
                : "bg-[#d4af37]/20 text-[#0f172a] border border-[#d4af37]/30 hover:bg-[#d4af37]/30"
            }`}
          >
            {darkMode ? "On" : "Off"}
          </button>
        </div>

        {/* 🔒 Password Change Section */}
        <div className="py-6 border-b border-[#d4af37]/30">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 font-['Playfair_Display'] text-[#d4af37]">
            <Lock className="w-5 h-5" /> Change Password
          </h2>

          <div className="space-y-3">
            <input
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full bg-transparent border border-[#d4af37]/40 text-inherit rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#d4af37] outline-none placeholder-[#f9f7e8]/60"
            />
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-transparent border border-[#d4af37]/40 text-inherit rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#d4af37] outline-none placeholder-[#f9f7e8]/60"
            />
            <button
              onClick={handlePasswordChange}
              className="bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg hover:from-[#e6c85c] hover:to-[#d4af37] transition-all"
            >
              Update Password
            </button>
          </div>
        </div>

        {/* 🔔 Notifications */}
        <div className="py-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-[#d4af37] font-['Playfair_Display']">
            <Bell className="w-5 h-5" /> Notifications
          </h2>
          <div className="flex justify-between items-center">
            <span className="text-[#f9f7e8]/80">Trip updates & reminders</span>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`px-4 py-1.5 rounded-full font-semibold text-sm transition-all ${
                notifications
                  ? "bg-[#34d399]/20 text-[#34d399] border border-[#34d399]/40 hover:bg-[#34d399]/30"
                  : "bg-gray-400/20 text-gray-400 border border-gray-400/30 hover:bg-gray-400/30"
              }`}
            >
              {notifications ? "On" : "Off"}
            </button>
          </div>
        </div>

        {/* ✅ Message */}
        {message && (
          <p
            className={`mt-6 text-center text-sm font-medium transition-all ${
              message.includes("✅")
                ? "text-[#34d399] bg-[#34d399]/10 border border-[#34d399]/30 rounded-lg py-2"
                : "text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg py-2"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
