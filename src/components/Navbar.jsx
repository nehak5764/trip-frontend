// import { Link, useLocation } from "react-router-dom";
// import { Bus } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
// import ProfileDropdown from "./ProfileDropdown";

// export default function Navbar() {
//   const { user } = useAuth();
//   const location = useLocation(); // 👈 Detect current route

//   // ✅ Show Contact Us only on Home page
//   const isHomePage = location.pathname === "/";

//   return (
//     <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-500/70 via-indigo-600/70 to-purple-700/70 backdrop-blur-md text-white shadow-lg border-b border-white/10">
//       <div className="container mx-auto flex justify-between items-center px-5 py-2">
//         {/* ✅ Logo Section */}
//         <Link
//           to="/"
//           className="flex items-center gap-2 text-2xl font-bold tracking-tight hover:opacity-90 transition"
//         >
//           <Bus className="w-7 h-7" />
//           <span>TripMate</span>
//         </Link>

//         {/* ✅ Navigation Links */}
//         <div className="flex items-center gap-6 text-sm font-medium">
//           {/* 👇 Show Contact Us link only on Home page */}
//           {isHomePage && (
//             <Link
//               to="/contact"
//               className="hover:underline underline-offset-4 decoration-white/70 transition"
//             >
//               Contact Us
//             </Link>
//           )}

//           {user ? (
//             <>
//               {/* Dashboard link visible only when logged in */}
//               <Link
//                 to="/dashboard"
//                 className="hover:underline underline-offset-4 decoration-white/70 transition"
//               >
//                 Dashboard
//               </Link>

//               {/* Gmail-style Profile Dropdown */}
//               <ProfileDropdown />
//             </>
//           ) : (
//             <>
//               {/* Login & Register links when not logged in */}
//               <Link
//                 to="/login"
//                 className="hover:underline underline-offset-4 decoration-white/70 transition"
//               >
//                 Login
//               </Link>

//               <Link
//                 to="/register"
//                 className="bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-full transition"
//               >
//                 Register
//               </Link>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Subtle bottom glow line for aesthetic touch */}
//       <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 opacity-50" />
//     </nav>
//   );
// }


import { Link, useLocation } from "react-router-dom";
import { Bus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";

export default function Navbar() {
  const { user } = useAuth();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 
      bg-gradient-to-r from-[#0f172a]/90 via-[#1e293b]/80 to-[#0f172a]/90
      backdrop-blur-lg text-[#f9f7e8] shadow-[0_4px_30px_rgba(0,0,0,0.25)]
      border-b border-[#d4af37]/20 transition-all duration-500"
    >
      <div className="container mx-auto flex justify-between items-center px-5 py-3">
        {/* ✅ Logo Section */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold tracking-tight 
            bg-gradient-to-r from-[#f9f7e8] to-[#d4af37] bg-clip-text text-transparent
            hover:opacity-90 transition"
        >
          <Bus className="w-7 h-7 text-[#d4af37]" />
          <span>TripMate</span>
        </Link>

        {/* ✅ Navigation Links */}
        <div className="flex items-center gap-6 text-[0.95rem] font-medium">
          {/* 👇 Show Contact Us only on Home page */}
          {isHomePage && (
            <Link
              to="/contact"
              className="text-[#f9f7e8]/90 hover:text-[#d4af37] transition-colors duration-200"
            >
              Contact Us
            </Link>
          )}

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-[#f9f7e8]/90 hover:text-[#d4af37] transition-colors duration-200"
              >
                Dashboard
              </Link>

              <ProfileDropdown />
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-[#f9f7e8]/90 hover:text-[#d4af37] transition-colors duration-200"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-1.5 rounded-full bg-gradient-to-r 
                  from-[#d4af37]/70 to-[#b8860b]/80 text-[#0f172a] font-semibold 
                  hover:from-[#d4af37] hover:to-[#b8860b] hover:text-black 
                  shadow-[0_0_10px_rgba(212,175,55,0.4)] transition-all duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Elegant gold glow line at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] 
        bg-gradient-to-r from-[#d4af37]/60 via-[#f9f7e8]/40 to-[#d4af37]/60" />
    </nav>
  );
}
