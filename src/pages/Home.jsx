// import React from "react";
// import {
//   Box,
//   Container,
//   Typography,
//   Button,
//   Card,
//   useTheme,
// } from "@mui/material";
// import { motion } from "framer-motion";
// import {
//   Users,
//   DollarSign,
//   MessageSquare,
//   Image,
//   Map,
//   CloudSun,
//   Landmark,
//   BarChart3,
// } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import heroImage from "../assets/homeee.jpg";

// export default function Home() {
//   const { user } = useAuth();
//   const theme = useTheme();

//   // 🧭 Features Array
//   const features = [
    
//     {
//       icon: <DollarSign size={40} color={theme.palette.success.main} />,
//       title: "Expense Tracker",
//       desc: "Split and track your expenses easily and transparently.",
//     },
//     {
//       icon: <MessageSquare size={40} color={theme.palette.secondary.main} />,
//       title: "Group Chat",
//       desc: "Stay connected and share live updates in real time.",
//     },
//     {
//       icon: <BarChart3 size={40} color="#7c3aed" />,
//       title: "Polls & Decisions",
//       desc: "Vote on trip ideas, destinations, and activities together.",
//     },
//     {
//       icon: <Image size={40} color="#d946ef" />,
//       title: "Photo Gallery",
//       desc: "Capture and relive your travel memories in one place.",
//     },
//     {
//       icon: <Map size={40} color="#06b6d4" />,
//       title: "Map & Weather",
//       desc: "Check routes and local weather before heading out.",
//     },
//     {
//       icon: <Landmark size={40} color="#f59e0b" />,
//       title: "Currency Converter",
//       desc: "Get real-time currency conversions while traveling abroad.",
//     },
//   ];

//   return (
//     <Box sx={{ overflowX: "hidden", marginTop: "8px", mx: "-16px" }}>
//       {/* ===== Hero Section ===== */}
//       <Box
//         sx={{
//           minHeight: "150vh",
//           backgroundImage: `url(${heroImage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           position: "relative",
//           color: "#fff",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           flexDirection: "column",
//           textAlign: "center",
//           overflow:"hidden"
          
//         }}
//       >
//         {/* Overlay */}
//         <Box
//           sx={{
//             position: "absolute",
//             inset: 0,
//             background:
//               "linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.7))",
//             zIndex: 1,
//           }}
//         />

//         {/* Hero Content */}
//         <Container
//           sx={{
//             position: "relative",
//             zIndex: 2,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: 4,
//             px: 2,
//           }}
//         >
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//           >
//             <Typography
//               variant="h2"
//               sx={{
//                 fontWeight: 600,
//                 fontSize: { xs: "2.5rem", md: "4rem" },
//                 mb: 2,
//                 mt: -18,
//               }}
//             >
//               Because Every Traveler Needs a Mate
//             </Typography>

//             <Typography
//               variant="h6"
//               sx={{
//                 color: "rgba(255,255,255,0.85)",
//                 mb: 6,
//                 maxWidth: 700,
//                 mx: "auto",
//               }}
//             >
//               Plan, explore, and experience — all your trip essentials in one
//               place.
//             </Typography>
//           </motion.div>

//           {/* CTA */}
//           <Box sx={{ mt: 15 }}>
//             {user ? (
//               <Button
//                 component={Link}
//                 to="/dashboard"
//                 variant="contained"
//                 sx={{
//                   borderRadius: "999px",
//                   px: 5,
//                   py: 1.8,
//                   fontWeight: "bold",
//                   fontSize: "1.05rem",
//                   textTransform: "none",
//                   background:
//                     "linear-gradient(90deg, #1976d2, #4f46e5, #7c3aed)",
//                 }}
//               >
//                 Go to Dashboard
//               </Button>
//             ) : (
//               <Button
//                 component={Link}
//                 to="/register"
//                 variant="contained"
//                 sx={{
//                   borderRadius: "999px",
//                   px: 5,
//                   py: 1.8,
//                   fontWeight: "bold",
//                   fontSize: "1.05rem",
//                   textTransform: "none",
//                   background:
//                     "linear-gradient(90deg,  #1976d2, #4f46e5, #7c3aed)",
//                 }}
//               >
//                 Get Started
//               </Button>
//             )}
//           </Box>
//         </Container>
//       </Box>

//       {/* ===== Features Section ===== */}
//       <Container
//         maxWidth="lg"
//         sx={{
//           py: 10,
//           textAlign: "center",
//         }}
//       >
//         <Typography
//           variant="h4"
//           sx={{
//             fontWeight: 700,
//             mb: 6,
//             color: "#1e293b",
//           }}
//         >
//           Explore Our Features
//         </Typography>

//         <Box
//           sx={{
//             display: "grid",
//             gridTemplateColumns: {
//               xs: "1fr",
//               sm: "repeat(2, 1fr)",
//               md: "repeat(3, 1fr)",
//             },
//             gap: 4,
//             justifyItems: "center",
//           }}
//         >
//           {features.map((feature, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               viewport={{ once: true }}
//             >
//               <Card
//                 sx={{
//                   width: 260,
//                   height: 200,
//                   textAlign: "center",
//                   p: 3,
//                   borderRadius: 5,
//                   boxShadow:
//                     "0 8px 24px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.3)",
//                   background: "linear-gradient(180deg, #ffffffcc, #f9fafb)",
//                   backdropFilter: "blur(10px)",
//                   transition: "0.3s ease",
//                   "&:hover": {
//                     transform: "translateY(-10px)",
//                     boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
//                   },
//                 }}
//               >
//                 <Box sx={{ mb: 1 }}>{feature.icon}</Box>
//                 <Typography
//                   variant="subtitle1"
//                   sx={{
//                     fontWeight: "bold",
//                     mb: 0.5,
//                     color: "#1e293b",
//                     fontSize: "1.1rem",
//                   }}
//                 >
//                   {feature.title}
//                 </Typography>
//                 <Typography sx={{ fontSize: "0.9rem", color: "#64748b" }}>
//                   {feature.desc}
//                 </Typography>
//               </Card>
//             </motion.div>
//           ))}
          
//         </Box>
//       </Container>
//     </Box>
//   );
// }
import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  DollarSign,
  MessageSquare,
  Image,
  Map,
  Landmark,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import heroImage from "../assets/homeee.jpg";

export default function Home() {
  const { user } = useAuth();
  const theme = useTheme();

  const features = [
    {
      icon: <DollarSign size={36} color="#d4af37" />,
      title: "Expense Tracker",
      desc: "Manage group expenses with clarity and ease.",
    },
    {
      icon: <MessageSquare size={36} color="#d4af37" />,
      title: "Group Chat",
      desc: "Stay connected with instant group conversations.",
    },
    {
      icon: <BarChart3 size={36} color="#d4af37" />,
      title: "Polls & Votes",
      desc: "Make collective decisions for your luxury adventures.",
    },
    {
      icon: <Image size={36} color="#d4af37" />,
      title: "Photo Gallery",
      desc: "Capture and relive your exclusive travel memories.",
    },
    {
      icon: <Map size={36} color="#d4af37" />,
      title: "Map & Weather",
      desc: "Navigate destinations with live weather insights.",
    },
    {
      icon: <Landmark size={36} color="#d4af37" />,
      title: "Currency Converter",
      desc: "Access live exchange rates anywhere in the world.",
    },
  ];

  return (
    <Box sx={{ overflowX: "hidden", backgroundColor: "#faf8f6" }}>
      {/* ===== HERO SECTION ===== */}
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          width: "100%",
          backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.85), rgba(15,23,42,0.6) 60%, rgba(250,248,246,1) 100%), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          color: "#fff",
        }}
      >
        {/* Gold accent glow for luxury tone */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 20%, rgba(212,175,55,0.25), transparent 70%)",
          }}
        />

        {/* Hero Text */}
        <Container
          component={motion.div}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          sx={{
            zIndex: 2,
            px: 3,
            py: 6,
            borderRadius: "20px",
            backdropFilter: "blur(6px)",
            background: "rgba(255,255,255,0.08)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
            maxWidth: "850px",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontFamily: "'Playfair Display', serif",
              fontSize: { xs: "2.3rem", md: "4rem" },
              mb: 3,
              lineHeight: 1.2,
              background: "linear-gradient(90deg, #f9f7e8, #d4af37)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Experience Travel in Elegance
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "rgba(255,255,255,0.9)",
              mb: 5,
              fontWeight: 400,
              fontSize: { xs: "1rem", md: "1.2rem" },
              maxWidth: 700,
              mx: "auto",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Discover destinations that redefine luxury — plan together, travel
            smarter, and indulge in unforgettable experiences.
          </Typography>

          {user ? (
            <Button
              component={Link}
              to="/dashboard"
              variant="contained"
              sx={{
                borderRadius: "999px",
                px: 5,
                py: 1.8,
                fontWeight: "bold",
                fontSize: "1rem",
                textTransform: "none",
                background:
                  "linear-gradient(90deg, #d4af37, #c3952d, #b8860b)",
                color: "#fff",
                boxShadow: "0 8px 24px rgba(212,175,55,0.35)",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 12px 36px rgba(212,175,55,0.5)",
                },
              }}
            >
              Go to Dashboard
            </Button>
          ) : (
            <Button
              component={Link}
              to="/register"
              variant="contained"
              sx={{
                borderRadius: "999px",
                px: 5,
                py: 1.8,
                fontWeight: "bold",
                fontSize: "1rem",
                textTransform: "none",
                background:
                  "linear-gradient(90deg, #d4af37, #c3952d, #b8860b)",
                color: "#fff",
                boxShadow: "0 8px 24px rgba(212,175,55,0.35)",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 12px 36px rgba(212,175,55,0.5)",
                },
              }}
            >
              Get Started
            </Button>
          )}
        </Container>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          style={{
            marginTop: "70px",
            fontSize: "0.95rem",
            color: "rgba(255,255,255,0.8)",
          }}
        >
          ↓ Scroll to Explore
        </motion.div>
      </Box>

      {/* ===== FEATURES SECTION ===== */}
      <Container
        maxWidth="lg"
        sx={{
          py: 14,
          textAlign: "center",
          background:
            "linear-gradient(to bottom, #faf8f6 0%, #f3f2ed 60%, #e7e5dc 100%)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 600,
            mb: 8,
            color: "#1f2937",
          }}
        >
          Our Exclusive Travel Tools
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 6,
            justifyItems: "center",
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                sx={{
                  width: 280,
                  height: 220,
                  textAlign: "center",
                  p: 4,
                  borderRadius: 6,
                  background:
                    "linear-gradient(180deg, #ffffff, #faf8f6, #f5f3ef)",
                  boxShadow:
                    "0 12px 30px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(255,255,255,0.4)",
                  transition: "all 0.35s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow:
                      "0 16px 30px rgba(212,175,55,0.25), 0 0 8px rgba(212,175,55,0.3)",
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 600,
                    mb: 1,
                    color: "#1e293b",
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography sx={{ fontSize: "0.95rem", color: "#475569" }}>
                  {feature.desc}
                </Typography>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
