// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";

// export default function AiAssistant({ embedded = false }) {
//   const { token } = useAuth();
//   const [messages, setMessages] = useState([
//     {
//       role: "assistant",
//       content: "👋 Hi! I’m TripMate AI — how can I help plan your next adventure?",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const chatEndRef = useRef(null);

//   // ✅ Auto-scroll to bottom on new message
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // ✅ Send message to backend
//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { role: "user", content: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/ai/chat",
//         { message: input, context: messages },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const aiReply = { role: "assistant", content: res.data.reply };
//       setMessages((prev) => [...prev, aiReply]);
//     } catch (err) {
//       console.error("AI Chat Error:", err);
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content: "⚠ Sorry, I couldn’t process that request. Please try again.",
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Handle Enter key
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   return (
//     <div
//       className={`flex flex-col bg-gray-100 ${
//         embedded
//           ? "h-full w-full bg-white rounded-b-2xl"
//           : "h-[90vh] max-w-3xl mx-auto p-4 bg-gray-50 rounded-lg shadow-md mt-15"
//       }`}
//     >
//       {/* Header (only show in standalone mode) */}
//       {!embedded && (
//         <h1 className="text-2xl font-bold text-blue-600 mb-4">
//           🤖 TripMate AI Assistant
//         </h1>
//       )}

//       {/* Chat window */}
//       {/* <div
//         className={`flex-1 overflow-y-auto rounded-lg p-4 border border-gray-200 mb-3 space-y-3 ${
//           embedded ? "bg-gray-50" : "bg-white"
//         }`}
//       >
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`p-2 rounded-lg max-w-[80%] ${
//               msg.role === "user"
//                 ? "ml-auto bg-blue-100 text-right"
//                 : "mr-auto bg-gray-100 text-left"
//             }`}
//           >
//             {msg.content}
//           </div>
//         ))}

//         {loading && (
//           <p className="text-gray-400 italic">TripMate AI is thinking...</p>
//         )}

//         <div ref={chatEndRef} />
//       </div> */}


//       {/* Chat window */}
// <div
//   className={`flex-1 overflow-y-auto rounded-lg p-4 border border-gray-200 mb-3 space-y-3 ${
//     embedded ? "bg-gray-50" : "bg-white"
//   }`}
// >
//   {messages.map((msg, i) => (
//     <div
//       key={i}
//       className={`flex ${
//         msg.role === "user" ? "justify-end" : "justify-start"
//       }`}
//     >
//       <div
//         className={`p-3 rounded-2xl shadow-sm max-w-[75%] leading-relaxed text-sm sm:text-base ${
//           msg.role === "user"
//             ? "bg-blue-600 text-white rounded-br-none"
//             : "bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200"
//         }`}
//         style={{
//           whiteSpace: "pre-wrap",
//           lineHeight: "1.6",
//           fontFamily: "Inter, sans-serif",
//         }}
//       >
//         {msg.content}
//       </div>
//     </div>
//   ))}

//   {loading && (
//     <div className="flex items-center gap-2 text-gray-400 italic">
//       <span className="animate-bounce">●</span>
//       <span className="animate-bounce delay-150">●</span>
//       <span className="animate-bounce delay-300">●</span>
//       <span>TripMate AI is thinking...</span>
//     </div>
//   )}

//   <div ref={chatEndRef} />
// </div>


//       {/* Input box */}
//       <div className="flex gap-2 items-end">
//         <textarea
//           rows="1"
//           className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-blue-400 resize-none"
//           placeholder="Ask about destinations, plans, budgets..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={handleKeyPress}
//           disabled={loading}
//         />
//         <button
//           onClick={sendMessage}
//           disabled={loading}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }



import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const BACKEND_URL = import.meta.env.VITE_API_URL; // ✅ use env, not localhost

export default function AiAssistant({ embedded = false }) {
  const { token } = useAuth();
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Hi! I’m TripMate AI — how can I help plan your next adventure?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // ✅ Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Send message
  const sendMessage = async () => {
    if (!input.trim() || !BACKEND_URL) return;

    const userMessage = { role: "user", content: input };
    const previousMessages = [...messages, userMessage];

    setMessages(previousMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/ai/chat`,
        { message: input, context: previousMessages },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const aiReply = { role: "assistant", content: res.data.reply };
      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      console.error("AI Chat Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠ Sorry, I couldn’t process that request. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className={`flex flex-col ${
        embedded
          ? "h-full w-full bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#faf8f6] rounded-b-2xl"
          : "h-[90vh] max-w-3xl mx-auto p-6 mt-20 rounded-2xl shadow-2xl bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#faf8f6]"
      }`}
    >
      {/* Header */}
      {!embedded && (
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#f9f7e8] to-[#d4af37] bg-clip-text text-transparent font-['Playfair_Display']">
            🤖 TripMate AI Assistant
          </h1>
          <p className="text-[#f9f7e8]/70 text-sm mt-1 font-['Poppins']">
            Ask about destinations, budgets, and travel ideas — your luxury trip
            companion.
          </p>
        </div>
      )}

      {/* Chat Window */}
      <div
        className={`flex-1 overflow-y-auto rounded-2xl p-5 mb-4 backdrop-blur-lg border border-[#d4af37]/20 shadow-inner space-y-3 ${
          embedded
            ? "bg-[#0f172a]/40"
            : "bg-gradient-to-b from-[#1e293b]/60 to-[#0f172a]/70"
        }`}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-2xl shadow-md max-w-[75%] leading-relaxed text-sm sm:text-base font-['Poppins'] ${
                msg.role === "user"
                  ? "bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] rounded-br-none"
                  : "bg-[#f9f7e8]/90 text-[#0f172a] rounded-bl-none border border-[#d4af37]/10"
              }`}
              style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-[#f9f7e8]/70 italic">
            <span className="animate-bounce">●</span>
            <span className="animate-bounce delay-150">●</span>
            <span className="animate-bounce delay-300">●</span>
            <span>TripMate AI is thinking...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <div className="flex gap-2 items-end">
        <textarea
          rows="1"
          className="flex-1 bg-[#f9f7e8]/90 border border-[#d4af37]/30 text-[#0f172a] placeholder-[#6b7280] rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#d4af37] font-['Poppins']"
          placeholder="Ask about destinations, plans, budgets..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] font-semibold px-5 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60 font-['Poppins']"
        >
          Send
        </button>
      </div>
    </div>
  );
}
