
// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import MessageList from "../components/MessageList";
// import MessageInput from "../components/MessageInput";
// import { ArrowLeftCircle } from "lucide-react";

// export default function GroupChatPage() {
//   const { id } = useParams(); // trip ID
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [showChat, setShowChat] = useState(true);

//   return (
//     <div className="relative max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-16">
//       {/* 🔝 Top Action Bar (Back + Hide Chat) */}
//       <div className="absolute top-5 left-0 w-full flex justify-between items-center px-5">
//         {/* 🟦 Hide/Open Chat Button (Left) */}
//         <button
//           onClick={() => setShowChat((prev) => !prev)}
//           className="flex items-center gap-2 bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1.5 rounded-full text-sm font-medium transition-all"
//         >
//           {showChat ? "Hide Chat" : "Open Chat"}
//         </button>

//         {/* 🔙 Back Button (Right) */}
//         <button
//           onClick={() => navigate(`/trip/${id}`)}
//           className="flex items-center gap-2 bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1.5 rounded-full text-sm font-medium transition-all"
//         >
//           <ArrowLeftCircle size={18} />
//           Back
//         </button>
//       </div>

//       {/* 🟦 Header */}
//       <h1 className="text-3xl font-bold text-blue-600 mb-2 text-center mt-4">
//         Group Chat 💬
//       </h1>

//       <p className="text-gray-600 mb-6 text-center">
//         Chat with your trip members and plan your adventures together in real-time!
//       </p>

//       {/* 💬 Chat Section */}
//       {showChat && (
//         <div className="bg-gray-50 p-4 rounded-xl shadow-inner border border-gray-200 mt-6">
//           <MessageList tripId={id} userId={user?._id || user?.id} />
//           <MessageInput tripId={id} userId={user?._id || user?.id} />
//         </div>
//       )}
//     </div>
//   );
// }





import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import { ArrowLeftCircle } from "lucide-react";

export default function GroupChatPage() {
  const { id } = useParams(); // trip ID
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showChat, setShowChat] = useState(true);

  return (
    <div className="relative max-w-5xl mx-auto p-8 mt-20 rounded-2xl shadow-2xl bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#faf8f6] border border-[#d4af37]/30 backdrop-blur-lg">
      {/* 🔝 Top Action Bar */}
      <div className="absolute top-5 left-0 w-full flex justify-between items-center px-5">
        {/* Hide/Open Chat */}
        <button
          onClick={() => setShowChat((prev) => !prev)}
          className="flex items-center gap-2 bg-[#d4af37]/20 text-[#d4af37] hover:bg-[#d4af37]/30 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border border-[#d4af37]/40 backdrop-blur-md"
        >
          {showChat ? "Hide Chat" : "Open Chat"}
        </button>

        {/* Back Button */}
        <button
          onClick={() => navigate(`/trip/${id}`)}
          className="flex items-center gap-2 bg-[#d4af37]/20 text-[#d4af37] hover:bg-[#d4af37]/30 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border border-[#d4af37]/40 backdrop-blur-md"
        >
          <ArrowLeftCircle size={18} />
          Back
        </button>
      </div>

      {/* 🟨 Header */}
      <h1 className="text-4xl font-bold text-center mb-3 mt-10 font-['Playfair_Display'] bg-gradient-to-r from-[#f9f7e8] to-[#d4af37] bg-clip-text text-transparent">
        Group Chat 💬
      </h1>

      <p className="text-center text-[#f9f7e8]/80 mb-8 font-['Poppins']">
        Chat with your trip members and plan your adventures together in real-time.
      </p>

      {/* 💬 Chat Section */}
      {showChat && (
        <div className="bg-gradient-to-br from-[#1e293b]/90 to-[#0f172a]/90 rounded-2xl shadow-inner border border-[#d4af37]/30 p-5 backdrop-blur-xl">
          <div className="max-h-[60vh] overflow-y-auto custom-scrollbar rounded-xl bg-[#faf8f6]/5 p-3 border border-[#d4af37]/10">
            <MessageList tripId={id} userId={user?._id || user?.id} />
          </div>

          <div className="mt-4 border-t border-[#d4af37]/20 pt-4">
            <MessageInput tripId={id} userId={user?._id || user?.id} />
          </div>
        </div>
      )}

      {/* ✨ Bottom Decorative Line */}
      <div className="mt-10 w-full h-[2px] bg-gradient-to-r from-[#d4af37]/40 via-[#f9f7e8]/20 to-[#d4af37]/40" />
    </div>
  );
}
