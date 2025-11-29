// import React, { useState } from "react";
// import { Box, Container, Typography, TextField, Button, Card } from "@mui/material";
// import { motion } from "framer-motion";
// import { Mail, Phone, MapPin } from "lucide-react";
// import emailjs from "@emailjs/browser";

// export default function Contact() {
//   const [formData, setFormData] = useState({ name: "", email: "", message: "" });
//   const [sent, setSent] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     emailjs
//       .send(
//         "service_lyiz5gp",           // ✅ your EmailJS service ID
//         "template_4q1hbvv",           // ✅ your EmailJS template ID (replace this)
//         {
//           from_name: formData.name,
//           from_email: formData.email,
//           message: formData.message,
//         },
//         "PoVVz6TXTY6zV-Wg3"      // ✅ your EmailJS public key
//       )
//       .then(() => {
//         setSent(true);
//         setLoading(false);
//         setFormData({ name: "", email: "", message: "" });
//       })
//       .catch((err) => {
//         console.error("❌ EmailJS Error:", err);
//         setLoading(false);
//       });
//   };

//   return (
//     <Container sx={{ py: 10, minHeight: "90vh" }}>
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         <Typography
//           variant="h3"
//           align="center"
//           sx={{ fontWeight: 700, mb: 2, color: "#183c77ff" }}
//         >
//           Get in Touch
//         </Typography>
//         <Typography
//           variant="subtitle1"
//           align="center"
//           sx={{ color: "#114081ff", mb: 6 }}
//         >
//           Have questions or feedback? We'd love to hear from you!
//         </Typography>

//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", md: "row" },
//             gap: 5,
//             justifyContent: "center",
//           }}
//         >
//           {/* Left Info Card */}
//           <Card
//             sx={{
//               flex: 1,
//               p: 4,
//               borderRadius: 4,
//               boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
//               textAlign: "left",
//             }}
//           >
//             <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
//               Contact Information
//             </Typography>
//             <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}>
//               <Mail size={20} /> <Typography>nehak5764@gmail.com</Typography>
//             </Box>
//             <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}>
//               <Phone size={20} /> <Typography>+91 8757216981</Typography>
//             </Box>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//               <MapPin size={20} /> <Typography>KIIT, India</Typography>
//             </Box>
//           </Card>

//           {/* Right Contact Form */}
//           <Card
//             component="form"
//             onSubmit={handleSubmit}
//             sx={{
//               flex: 1.5,
//               p: 4,
//               borderRadius: 4,
//               boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
//               background: "linear-gradient(180deg, #ffffffcc, #f9fafb)",
//               backdropFilter: "blur(10px)",
//             }}
//           >
//             <Typography
//               variant="h6"
//               sx={{ fontWeight: 600, mb: 3, color: "#1e293b" }}
//             >
//               Send Us a Message
//             </Typography>

//             <TextField
//               label="Your Name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               fullWidth
//               margin="normal"
//               required
//             />
//             <TextField
//               label="Email Address"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               fullWidth
//               margin="normal"
//               required
//             />
//             <TextField
//               label="Message"
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               fullWidth
//               multiline
//               rows={4}
//               margin="normal"
//               required
//             />

//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               disabled={loading}
//               sx={{
//                 mt: 2,
//                 py: 1.5,
//                 fontWeight: "bold",
//                 borderRadius: "999px",
//                 background:
//                   "linear-gradient(90deg, #1976d2, #4f46e5, #7c3aed)",
//               }}
//             >
//               {loading
//                 ? "Sending..."
//                 : sent
//                 ? "Message Sent ✅"
//                 : "Send Message"}
//             </Button>
//           </Card>
//         </Box>
//       </motion.div>
//     </Container>
//   );
// }



import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
} from "@mui/material";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_lyiz5gp",
        "template_4q1hbvv",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "PoVVz6TXTY6zV-Wg3"
      )
      .then(() => {
        setSent(true);
        setLoading(false);
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((err) => {
        console.error("❌ EmailJS Error:", err);
        setLoading(false);
      });
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #0f172a, #1e293b, #faf8f6)",
        color: "#f9f7e8",
        minHeight: "100vh",
        py: 10,
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Heading */}
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontWeight: 700,
              fontFamily: "'Playfair Display', serif",
              mb: 2,
              background: "linear-gradient(90deg, #f9f7e8, #d4af37)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Get in Touch
          </Typography>

          <Typography
            variant="subtitle1"
            align="center"
            sx={{
              color: "#f9f7e8cc",
              mb: 6,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Have questions or feedback? We'd love to hear from you!
          </Typography>

          {/* Content */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 5,
              justifyContent: "center",
            }}
          >
            {/* Contact Info Card */}
            <Card
              sx={{
                flex: 1,
                p: 4,
                borderRadius: 4,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                backdropFilter: "blur(12px)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                border: "1px solid rgba(212,175,55,0.3)",
                color: "#f9f7e8",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  color: "#d4af37",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Contact Information
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}>
                <Mail color="#d4af37" size={20} />
                <Typography>nehak5764@gmail.com</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}>
                <Phone color="#d4af37" size={20} />
                <Typography>+91 8757216981</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <MapPin color="#d4af37" size={20} />
                <Typography>KIIT, India</Typography>
              </Box>
            </Card>

            {/* Contact Form */}
            <Card
              component="form"
              onSubmit={handleSubmit}
              sx={{
                flex: 1.5,
                p: 4,
                borderRadius: 4,
                background:
                  "linear-gradient(180deg, #faf8f6, #f5f3ef, #ede9d9)",
                boxShadow:
                  "0 8px 24px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.3)",
                border: "1px solid rgba(212,175,55,0.25)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  color: "#1e293b",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Send Us a Message
              </Typography>

              <TextField
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                InputLabelProps={{ style: { color: "#475569" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#d4af37" },
                    "&:hover fieldset": { borderColor: "#b8860b" },
                    "&.Mui-focused fieldset": { borderColor: "#d4af37" },
                  },
                }}
              />

              <TextField
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                InputLabelProps={{ style: { color: "#475569" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#d4af37" },
                    "&:hover fieldset": { borderColor: "#b8860b" },
                    "&.Mui-focused fieldset": { borderColor: "#d4af37" },
                  },
                }}
              />

              <TextField
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                margin="normal"
                required
                InputLabelProps={{ style: { color: "#475569" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#d4af37" },
                    "&:hover fieldset": { borderColor: "#b8860b" },
                    "&.Mui-focused fieldset": { borderColor: "#d4af37" },
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  mt: 3,
                  py: 1.5,
                  fontWeight: "bold",
                  fontFamily: "'Poppins', sans-serif",
                  borderRadius: "999px",
                  background:
                    "linear-gradient(90deg, #d4af37, #c3952d, #b8860b)",
                  color: "#0f172a",
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, #e8c75c, #d4af37, #b8860b)",
                  },
                }}
              >
                {loading
                  ? "Sending..."
                  : sent
                  ? "Message Sent ✅"
                  : "Send Message"}
              </Button>
            </Card>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
