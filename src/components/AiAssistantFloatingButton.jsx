// import { Link } from "react-router-dom";
// import { Bot } from "lucide-react"; // Lucide AI icon

// export default function AiAssistantFloatingButton() {
//   return (
//     <Link
//       to="/ai-assistant"
//       className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50"
//       title="Open AI Assistant"
//     >
//       <Bot className="w-6 h-6" />
//     </Link>
//   );
// }



import { Link } from "react-router-dom";
import { Bot } from "lucide-react";

export default function AiAssistantFloatingButton() {
  return (
    <Link
      to="/ai-assistant"
      title="Open AI Assistant"
      className="fixed bottom-6 right-6 bg-gradient-to-br from-[#d4af37] to-[#b8860b] text-[#0f172a] 
                 p-4 rounded-full shadow-lg border border-[#d4af37]/40 
                 hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] hover:scale-110 
                 transition-all duration-300 flex items-center justify-center z-50"
    >
      <Bot className="w-6 h-6" />
    </Link>
  );
}
