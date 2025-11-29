

// import React, { useEffect, useState, useRef } from "react";
// import { getSocket } from "../socket";
// import axios from "axios";

// const MessageList = ({ tripId, userId }) => {
//   const [messages, setMessages] = useState([]);
//   const [socket, setSocket] = useState(null);
//   const chatBoxRef = useRef(null);

//   // Initialize socket
//   useEffect(() => {
//     setSocket(getSocket());
//   }, []);

//   // Join trip room + Fetch old messages
//   useEffect(() => {
//     if (!tripId || !socket) return;

//     const joinTrip = () => socket.emit("joinTrip", { tripId });
//     if (socket.connected) joinTrip();
//     else socket.on("connect", joinTrip);

//     const fetchMessages = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get(`http://localhost:5000/api/messages/${tripId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setMessages(res.data);
//       } catch (err) {
//         console.error("Error fetching messages:", err);
//       }
//     };
//     fetchMessages();

//     const handleNewMessage = (msg) => setMessages((prev) => [...prev, msg]);
//     socket.on("newMessage", handleNewMessage);

//     return () => {
//       socket.off("newMessage", handleNewMessage);
//       socket.off("connect", joinTrip);
//     };
//   }, [tripId, socket]);

//   // Auto scroll to bottom when new message arrives
//   useEffect(() => {
//     if (chatBoxRef.current)
//       chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//   }, [messages]);

//   return (
//     <div className="flex flex-col bg-gray-50 rounded-lg shadow-lg overflow-hidden">
//       {/* Chat messages */}
//       <div
//         ref={chatBoxRef}
//         className="flex flex-col h-[450px] p-4 overflow-y-auto bg-gradient-to-b from-gray-100 to-gray-200 rounded-t-lg scroll-smooth shadow-inner"
//       >
//         {messages.length === 0 ? (
//           <p className="text-center text-gray-400 italic mt-4">
//             No messages yet. Start chatting 💬
//           </p>
//         ) : (
//           messages.map((msg) => (
//             <div
//               key={msg._id}
//               className={`flex flex-col mb-2 ${
//                 msg.sender._id === userId ? "items-end" : "items-start"
//               }`}
//             >
//               <div
//                 className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm break-words shadow ${
//                   msg.sender._id === userId
//                     ? "bg-blue-500 text-white rounded-br-none"
//                     : "bg-white text-gray-800 rounded-bl-none"
//                 }`}
//               >
//                 {msg.sender._id !== userId && (
//                   <p className="font-semibold text-xs mb-1 text-gray-600">
//                     {msg.sender.name}
//                   </p>
//                 )}

//                 {/* 📝 Text Message */}
//                 {msg.text && <p>{msg.text}</p>}

//                 {/* 🖼️ Image Attachments */}
//                 {msg.attachments?.length > 0 &&
//                   msg.attachments.map((file, index) => (
//                     <img
//                       key={index}
//                       src={file.url}
//                       alt="Attachment"
//                       className="max-w-[200px] rounded-lg mt-2 shadow-md"
//                     />
//                   ))}

//                 {/* ⏰ Time */}
//                 <span className="text-[10px] block mt-1 text-right opacity-70">
//                   {new Date(msg.createdAt).toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </span>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default MessageList;




import React, { useEffect, useState, useRef } from "react";
import { getSocket } from "../socket";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // ✅ use env, not localhost

export default function MessageList({ tripId, userId }) {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const chatBoxRef = useRef(null);

  // Initialize socket
  useEffect(() => {
    setSocket(getSocket());
  }, []);

  // Join trip room + fetch messages
  useEffect(() => {
    if (!tripId || !socket || !BACKEND_URL) return;

    const joinTrip = () => socket.emit("joinTrip", { tripId });
    if (socket.connected) joinTrip();
    else socket.on("connect", joinTrip);

    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${BACKEND_URL}/api/messages/${tripId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();

    const handleNewMessage = (msg) => setMessages((prev) => [...prev, msg]);
    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("connect", joinTrip);
    };
  }, [tripId, socket]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (chatBoxRef.current)
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="flex flex-col bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-3xl border border-[#d4af37]/30 shadow-xl overflow-hidden relative">
      {/* Golden soft glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/10 via-transparent to-[#b8860b]/10 blur-2xl -z-10" />

      {/* Header */}
      <div className="px-6 py-3 border-b border-[#d4af37]/30 bg-[#1e293b]/60 backdrop-blur-md text-[#d4af37] font-semibold text-lg flex justify-center items-center">
        💬 Trip Group Chat
      </div>

      {/* Chat messages */}
      <div
        ref={chatBoxRef}
        className="flex flex-col h-[480px] p-5 overflow-y-auto scroll-smooth bg-[#0f172a]/60 backdrop-blur-md"
      >
        {messages.length === 0 ? (
          <p className="text-center text-[#f9f7e8]/50 italic mt-4">
            No messages yet. Start chatting ✨
          </p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`flex flex-col mb-3 ${
                msg.sender._id === userId ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm leading-relaxed shadow-md ${
                  msg.sender._id === userId
                    ? "bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] rounded-br-none"
                    : "bg-[#1e293b]/70 text-[#f9f7e8] border border-[#d4af37]/30 rounded-bl-none"
                }`}
              >
                {/* Sender name (for others) */}
                {msg.sender._id !== userId && (
                  <p className="font-semibold text-xs mb-1 text-[#d4af37]/80">
                    {msg.sender.name}
                  </p>
                )}

                {/* Text Message */}
                {msg.text && <p>{msg.text}</p>}

                {/* Attachments */}
                {msg.attachments?.length > 0 &&
                  msg.attachments.map((file, i) => (
                    <img
                      key={i}
                      src={file.url}
                      alt="Attachment"
                      className="max-w-[200px] rounded-lg mt-2 border border-[#d4af37]/30 shadow-lg"
                    />
                  ))}

                {/* Timestamp */}
                <span
                  className={`text-[10px] block mt-1 text-right ${
                    msg.sender._id === userId
                      ? "text-[#0f172a]/70"
                      : "text-[#f9f7e8]/50"
                  }`}
                >
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer note */}
      <div className="py-2 text-center text-xs text-[#f9f7e8]/50 border-t border-[#d4af37]/20 bg-[#1e293b]/60">
        Messages are end-to-end encrypted 🔒
      </div>
    </div>
  );
}
