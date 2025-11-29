// // import { Bus } from "lucide-react";

// // export default function Footer() {
// //   return (
// //     <footer className="relative bg-gradient-to-r from-blue-500/70 via-indigo-600/70 to-purple-700/70 backdrop-blur-md text-white shadow-lg border-b border-white/10">
// //       <div className="container mx-auto flex flex-col items-center justify-center px-6 py-4 text-center space-y-3">
    
// //         {/* Copyright */}
// //         <p className="text-sm text-white/80 tracking-wide">
// //           © {new Date().getFullYear()} TripMate. All rights reserved.
// //         </p>
// //       </div>

// //       {/* Subtle top gradient glow line */}
// //       <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 opacity-70" />
// //     </footer>
// //   );
// // }



// import { Bus } from "lucide-react";

// export default function Footer() {
//   return (
//     <footer className="relative bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-[#f9f7e8] border-t border-[#d4af37]/20 shadow-inner mt-10">
//       {/* Top glowing divider */}
//       <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#d4af37]/80 via-[#e6c85c]/60 to-[#b8860b]/70 blur-[1px]" />

//       <div className="container mx-auto flex flex-col items-center justify-center px-6 py-6 text-center space-y-3">
//         {/* Logo + Name */}
//         <div className="flex items-center justify-center gap-2">
//           <div className="p-2 bg-gradient-to-br from-[#d4af37]/30 to-[#b8860b]/30 rounded-full border border-[#d4af37]/20">
//             <Bus className="w-5 h-5 text-[#d4af37]" />
//           </div>
//           <h1 className="text-lg font-semibold tracking-wide text-[#f9f7e8] font-['Playfair_Display']">
//             TripMate
//           </h1>
//         </div>

//         {/* Divider Line */}
//         <div className="w-16 h-[1px] bg-gradient-to-r from-[#d4af37] via-[#e6c85c] to-[#b8860b] opacity-80 rounded-full" />

//         {/* Copyright */}
//         <p className="text-sm text-[#f9f7e8]/70 font-light tracking-wide">
//           © {new Date().getFullYear()} <span className="text-[#d4af37] font-medium">TripMate</span>. All rights reserved.
//         </p>
//       </div>

//       {/* Bottom Glow */}
//       <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[60%] h-[60px] bg-[#d4af37]/10 blur-[60px] rounded-full pointer-events-none" />
//     </footer>
//   );
// }





import { Bus } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-[#f9f7e8] border-t border-[#d4af37]/20 shadow-inner mt-10">
      {/* Top glowing divider */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#d4af37]/80 via-[#e6c85c]/60 to-[#b8860b]/70 blur-[1px]" />

      <div className="container mx-auto flex flex-col items-center justify-center px-6 py-3 text-center space-y-2">
        {/* Logo + Name */}
        <div className="flex items-center justify-center gap-2">
          <div className="p-1.5 bg-gradient-to-br from-[#d4af37]/30 to-[#b8860b]/30 rounded-full border border-[#d4af37]/20">
            <Bus className="w-4 h-4 text-[#d4af37]" />
          </div>
          <h1 className="text-base font-semibold tracking-wide text-[#f9f7e8] font-['Playfair_Display']">
            TripMate
          </h1>
        </div>

        {/* Divider Line */}
        <div className="w-12 h-[1px] bg-gradient-to-r from-[#d4af37] via-[#e6c85c] to-[#b8860b] opacity-80 rounded-full" />

        {/* Copyright */}
        <p className="text-xs text-[#f9f7e8]/70 font-light tracking-wide">
          © {new Date().getFullYear()} <span className="text-[#d4af37] font-medium">TripMate</span>. All rights reserved.
        </p>
      </div>

      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[50%] h-[35px] bg-[#d4af37]/10 blur-[40px] rounded-full pointer-events-none" />
    </footer>
  );
}
