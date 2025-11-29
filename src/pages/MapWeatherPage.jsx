
// import { useNavigate } from "react-router-dom";
// import MapWeatherPanel from "../components/MapWeatherPanel";
// import { ArrowLeftCircle } from "lucide-react";

// export default function MapWeatherPage() {
//   const navigate = useNavigate();

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-15 relative">
//       {/* Header Section with Back Button */}
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-3xl font-bold text-blue-600">Trip Map & Weather 🌍</h1>
//         {/* <button
//           onClick={() => navigate(-1)}
//           className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition"
//         >
//           ⬅ Back
//         </button> */}

//       <button
//               onClick={() => navigate(-1)}
//               className="absolute top-5 right-5 flex items-center gap-2 bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1.5 rounded-full text-sm font-medium transition-all"
//             >
//               <ArrowLeftCircle size={18} />
//               Back
//           </button>

//       </div>

//       <p className="text-gray-600 mb-6">
//         Explore your trip destinations, visualize the route, and check real-time
//         weather updates for all your travel locations.
//       </p>

//       {/* Map and Weather Panel */}
//       <div className="rounded-xl overflow-hidden shadow-inner border border-gray-200 bg-gray-50 p-4">
//         <div className="aspect-[16/9] sm:aspect-[21/9] md:aspect-[18/9] lg:aspect-[16/7]">
//           <MapWeatherPanel />
//         </div>
//       </div>
//     </div>
//   );
// }





import { useNavigate } from "react-router-dom";
import MapWeatherPanel from "../components/MapWeatherPanel";
import { ArrowLeftCircle } from "lucide-react";

export default function MapWeatherPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-y-auto bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-[#f9f7e8] ">
      
      {/* Outer Container */}
      <div className="max-w-6xl mx-auto p-6 mt-15 shadow-2xl rounded-3xl border border-[#d4af37]/25 backdrop-blur-md relative pb-16">
        
        {/* ✨ Decorative Top Glow Line */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#d4af37] via-[#f5d76e] to-[#b8860b] opacity-90 rounded-t-3xl" />

        {/* 🔙 Floating Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 right-5 flex items-center gap-2 bg-[#1e293b]/80 text-[#d4af37] hover:text-[#f5d76e] border border-[#d4af37]/40 hover:bg-[#d4af37]/10 px-3 py-1.5 rounded-full text-sm font-medium shadow-md transition-all hover:scale-105 backdrop-blur-md"
        >
          <ArrowLeftCircle size={20} />
          Back
        </button>

        {/* 🧭 Header Section */}
        <div className="text-center mb-8 mt-3">
          <h1 className="text-4xl font-extrabold text-[#d4af37] mb-3 font-['Playfair_Display'] drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
            Trip Map & Weather 🌍
          </h1>
          <p className="text-[#f9f7e8]/80 max-w-3xl mx-auto text-lg leading-relaxed font-light">
            Explore your trip destinations, visualize routes, and get live weather
            updates — all beautifully integrated.
          </p>
        </div>

        {/* 🗺️ Map and Weather Panel */}
        <div className="rounded-3xl overflow-hidden shadow-2xl bg-[#1e293b]/60 p-6 backdrop-blur-md relative border border-[#d4af37]/30">
          <div className="aspect-[16/9] sm:aspect-[21/9] md:aspect-[18/9] lg:aspect-[16/7] rounded-xl overflow-hidden">
            <MapWeatherPanel />
          </div>
        </div>

        {/* 🌈 Bottom Gold Glow Line */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#b8860b] via-[#d4af37] to-[#f5d76e] opacity-80 rounded-b-3xl" />
      </div>

      {/* 🌟 Subtle Gold Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/10 via-transparent to-[#b8860b]/10 blur-2xl pointer-events-none -z-10" />
    </div>
  );
}
