
// import React, { useState, useEffect, useRef } from "react";
// import { Box, TextField, IconButton, Paper } from "@mui/material";
// import { FaSmile, FaPaperPlane } from "react-icons/fa";
// import EmojiPicker from "emoji-picker-react";
// import { getSocket, emitEvent } from "../socket";
// import axios from "axios";

// const MessageInput = ({ tripId, userId }) => {
//   const [text, setText] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [socket, setSocket] = useState(null);
//   const emojiRef = useRef(null);

//   useEffect(() => {
//     setSocket(getSocket());

//     const handleClickOutside = (e) => {
//       if (emojiRef.current && !emojiRef.current.contains(e.target)) {
//         setShowEmojiPicker(false);
//       }
//     };

//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, []);

//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (!tripId || (!text.trim() && !socket)) return;

//     emitEvent("sendMessage", { tripId, senderId: userId, text });
//     setText("");
//   };

//   const handleEmojiClick = (emojiData) => {
//     setText((prev) => prev + emojiData.emoji);
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file || !tripId) return;

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const res = await axios.post("http://localhost:5000/api/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       const imageUrl = res.data.url;

//       emitEvent("sendMessage", {
//         tripId,
//         senderId: userId,
//         text: "",
//         attachments: [{ url: imageUrl, type: "image" }],
//       });
//     } catch (err) {
//       console.error("Image upload failed:", err);
//     }
//   };

//   return (
//     <Paper sx={{ p: 1, display: "flex", alignItems: "center", gap: 1 }}>
//       <div ref={emojiRef} style={{ position: "relative" }}>
//         <IconButton onClick={() => setShowEmojiPicker(prev => !prev)}><FaSmile /></IconButton>
//         {showEmojiPicker && <div style={{ position: "absolute", bottom: "46px", left: 0, zIndex: 50 }}>
//           <EmojiPicker onEmojiClick={handleEmojiClick} theme="light" />
//         </div>}
//       </div>

//       <input type="file" accept="image/*" id="fileInput" style={{ display: "none" }} onChange={handleImageUpload} />
//       <label htmlFor="fileInput">
//         <IconButton component="span"><span role="img" aria-label="camera">📷</span></IconButton>
//       </label>

//       <Box component="form" onSubmit={sendMessage} sx={{ display: "flex", gap: 1, alignItems: "center", flex: 1 }}>
//         <TextField fullWidth placeholder="Type a message..." value={text} onChange={(e) => setText(e.target.value)} size="small" />
//         <IconButton type="submit" color="primary"><FaPaperPlane /></IconButton>
//       </Box>
//     </Paper>
//   );
// };

// export default MessageInput;





import React, { useState, useEffect, useRef } from "react";
import { Box, IconButton, Paper } from "@mui/material";
import { FaSmile, FaPaperPlane } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { getSocket, emitEvent } from "../socket";
import axios from "axios";

export default function MessageInput({ tripId, userId }) {
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [socket, setSocket] = useState(null);
  const emojiRef = useRef(null);

  useEffect(() => {
    setSocket(getSocket());
    const handleClickOutside = (e) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!tripId || !text.trim() || !socket) return;
    emitEvent("sendMessage", { tripId, senderId: userId, text });
    setText("");
  };

  const handleEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !tripId) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const imageUrl = res.data.url;

      emitEvent("sendMessage", {
        tripId,
        senderId: userId,
        text: "",
        attachments: [{ url: imageUrl, type: "image" }],
      });
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  return (
    <div className="mt-2">
      <Paper
        elevation={8}
        sx={{
          p: 1.5,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          borderRadius: "20px",
          background:
            "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.95))",
          border: "1px solid rgba(212,175,55,0.3)",
          boxShadow:
            "0 0 20px rgba(212,175,55,0.1), inset 0 0 10px rgba(255,255,255,0.05)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Emoji Picker */}
        <div ref={emojiRef} style={{ position: "relative" }}>
          <IconButton
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            sx={{
              color: "#d4af37",
              "&:hover": { color: "#f5d76e", transform: "scale(1.1)" },
              transition: "all 0.2s",
            }}
          >
            <FaSmile size={20} />
          </IconButton>

          {showEmojiPicker && (
            <div
              style={{
                position: "absolute",
                bottom: "50px",
                left: "0",
                zIndex: 1000,
                boxShadow: "0 0 20px rgba(212,175,55,0.2)",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
            </div>
          )}
        </div>

        {/* File Upload */}
        <input
          type="file"
          accept="image/*"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
        <label htmlFor="fileInput">
          <IconButton
            component="span"
            sx={{
              color: "#f9f7e8",
              "&:hover": { color: "#d4af37", transform: "scale(1.1)" },
              transition: "all 0.2s",
            }}
          >
            📷
          </IconButton>
        </label>

        {/* Message Input */}
        <Box
          component="form"
          onSubmit={sendMessage}
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
            backgroundColor: "rgba(15,23,42,0.6)",
            borderRadius: "16px",
            border: "1px solid rgba(212,175,55,0.2)",
            padding: "6px 10px",
          }}
        >
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#f9f7e8",
              fontSize: "0.95rem",
              fontFamily: "Poppins, sans-serif",
            }}
          />

          {/* Send Button */}
          <IconButton
            type="submit"
            sx={{
              color: "#0f172a",
              background:
                "linear-gradient(90deg, #d4af37 0%, #b8860b 100%)",
              "&:hover": {
                boxShadow: "0 0 10px rgba(212,175,55,0.6)",
                transform: "scale(1.1)",
              },
              transition: "all 0.3s ease",
              borderRadius: "50%",
              padding: "8px",
            }}
          >
            <FaPaperPlane size={18} />
          </IconButton>
        </Box>
      </Paper>
    </div>
  );
}
