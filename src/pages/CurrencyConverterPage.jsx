
// import { useNavigate } from "react-router-dom";
// import { ArrowLeftCircle } from "lucide-react";
// import CurrencyConverter from "../components/CurrencyConverter";

// export default function CurrencyConverterPage() {
//   const navigate = useNavigate();

//   return (
//     <div className="relative max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-15 border border-blue-100">
//       {/* 🔹 Back Button (Top-Right Corner) */}
//       <button
//         onClick={() => navigate(-1)}
//         className="absolute top-5 right-5 flex items-center gap-2 bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1.5 rounded-full text-sm font-medium transition-all"
//       >
//         <ArrowLeftCircle size={18} />
//         Back
//       </button>

//       {/* 🔹 Title Section */}
//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold text-blue-700 mb-2">
//           Currency Converter 💱
//         </h1>
//         <p className="text-gray-600 max-w-2xl mx-auto">
//           Instantly convert between currencies to manage your trip expenses and stay on budget.
//         </p>
//       </div>

//       {/* 🔹 Currency Converter Panel */}
//       <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-inner border border-blue-200">
//         <CurrencyConverter />
//       </div>
//     </div>
//   );
// }




import { useNavigate } from "react-router-dom";
import { ArrowLeftCircle } from "lucide-react";
import CurrencyConverter from "../components/CurrencyConverter";

export default function CurrencyConverterPage() {
  const navigate = useNavigate();

  return (
    <div className="relative max-w-4xl mx-auto p-8 mt-20 rounded-2xl shadow-2xl border border-[#d4af37]/30 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#faf8f6] backdrop-blur-md">
      {/* 🔹 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-5 right-5 flex items-center gap-2 bg-[#d4af37]/15 text-[#d4af37] hover:bg-[#d4af37]/25 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-md border border-[#d4af37]/30"
      >
        <ArrowLeftCircle size={18} />
        Back
      </button>

      {/* 🔹 Title Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-['Playfair_Display'] bg-gradient-to-r from-[#f9f7e8] to-[#d4af37] bg-clip-text text-transparent mb-3">
          Currency Converter 💱
        </h1>
        <p className="text-[#f9f7e8]/80 font-['Poppins'] max-w-2xl mx-auto">
          Instantly convert between global currencies to manage your trip expenses — 
          elegantly and efficiently.
        </p>
      </div>

      {/* 🔹 Currency Converter Card */}
      <div className="rounded-2xl p-8 bg-gradient-to-br from-[#1e293b]/90 to-[#0f172a]/95 border border-[#d4af37]/25 shadow-[0_8px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl">
        <CurrencyConverter />
      </div>

      {/* 🔹 Subtle Glow Line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#d4af37]/40 via-[#f9f7e8]/30 to-[#d4af37]/40" />
    </div>
  );
}
