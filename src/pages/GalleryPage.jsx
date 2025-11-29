
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { Upload, Download, Trash2, ArrowLeftCircle } from "lucide-react";

// const BACKEND_URL = "http://localhost:5000";

// export default function GalleryPage() {
//   const { id } = useParams(); // tripId
//   const { token, user } = useAuth();
//   const navigate = useNavigate();
//   const [images, setImages] = useState([]);
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   /* ---------------- FETCH IMAGES ---------------- */
//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const res = await axios.get(`${BACKEND_URL}/api/trips/${id}/gallery`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setImages(res.data || []);
//       } catch (err) {
//         console.error("❌ Error fetching gallery:", err);
//       }
//     };
//     fetchImages();
//   }, [id, token]);

//   /* ---------------- HANDLE UPLOAD ---------------- */
//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!file) return alert("Please select an image first!");

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       setUploading(true);
//       const res = await axios.post(
//         `${BACKEND_URL}/api/trips/${id}/gallery`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setImages((prev) => [res.data, ...prev]);
//       setFile(null);
//       alert("✅ Image uploaded successfully!");
//     } catch (err) {
//       console.error("❌ Upload failed:", err);
//       alert("Upload failed!");
//     } finally {
//       setUploading(false);
//     }
//   };

//   /* ---------------- HANDLE DELETE ---------------- */
//   const handleDelete = async (imageId, e) => {
//     e.stopPropagation(); // Prevent interference from other buttons
//     if (!window.confirm("🗑️ Delete this image permanently?")) return;
//     try {
//       await axios.delete(`${BACKEND_URL}/api/trips/${id}/gallery/${imageId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setImages((prev) => prev.filter((img) => img._id !== imageId));
//       alert("✅ Image deleted successfully!");
//     } catch (err) {
//       console.error("❌ Error deleting image:", err);
//       alert("Failed to delete image!");
//     }
//   };

//   /* ---------------- DOWNLOAD IMAGE ---------------- */
//   const handleDownload = async (url, e) => {
//     e.stopPropagation(); // Prevent overlap
//     try {
//       const fileName = url.split("/").pop();
//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const blob = await response.blob();
//       const link = document.createElement("a");
//       link.href = window.URL.createObjectURL(blob);
//       link.download = fileName;
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (err) {
//       console.error("❌ Error downloading image:", err);
//       alert("Download failed!");
//     }
//   };

//   return (
//     <div className="relative max-w-6xl mx-auto p-6 bg-blue-50 rounded-2xl shadow-lg mt-14 border border-blue-200">
//       {/* 🔙 Back Button */}
//       <button
//         onClick={() => navigate(`/trip/${id}`)}
//         className="absolute top-5 right-5 flex items-center gap-2 bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1.5 rounded-full text-sm font-medium transition-all"
//       >
//         <ArrowLeftCircle size={18} />
//         Back
//       </button>

//       <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">
//         Trip Gallery 📸
//       </h1>

//       {/* Upload Form */}
//       <form
//         onSubmit={handleUpload}
//         className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
//       >
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setFile(e.target.files[0])}
//           className="border border-blue-300 rounded-lg px-4 py-2 w-full sm:w-auto bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         <button
//           type="submit"
//           disabled={uploading}
//           className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
//         >
//           <Upload className="w-5 h-5" />
//           {uploading ? "Uploading..." : "Upload"}
//         </button>
//       </form>

//       {/* Gallery Grid */}
//       {images.length === 0 ? (
//         <p className="text-blue-600 text-center">
//           No images yet. Be the first to upload!
//         </p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {images.map((img) => (
//             <div
//               key={img._id}
//               className="relative group bg-blue-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
//             >
//               <img
//                 src={`${BACKEND_URL}${img.url}`}
//                 alt="Trip"
//                 className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
//               />

//               {/* Hover Action Overlay */}
//               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-6">
//                 {/* Download Button */}
//                 <button
//                   onClick={(e) =>
//                     handleDownload(`${BACKEND_URL}${img.url}`, e)
//                   }
//                   className="bg-white text-blue-600 p-3 rounded-full hover:bg-blue-50 transition"
//                 >
//                   <Download className="w-5 h-5" />
//                 </button>

//                 {/* Delete Button - only if uploader */}
//                 {img.uploadedBy?._id === user?._id && (
//                   <button
//                     onClick={(e) => handleDelete(img._id, e)}
//                     className="bg-white text-red-600 p-3 rounded-full hover:bg-red-50 transition"
//                   >
//                     <Trash2 className="w-5 h-5" />
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Upload, Download, Trash2, ArrowLeftCircle } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // ✅ use env, not localhost

export default function GalleryPage() {
  const { id } = useParams();
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  /* ---------------- FETCH IMAGES ---------------- */
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/trips/${id}/gallery`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setImages(res.data || []);
      } catch (err) {
        console.error("❌ Error fetching gallery:", err);
      }
    };
    if (BACKEND_URL && token) fetchImages();
  }, [id, token]);

  /* ---------------- HANDLE UPLOAD ---------------- */
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image first!");

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const res = await axios.post(
        `${BACKEND_URL}/api/trips/${id}/gallery`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setImages((prev) => [res.data, ...prev]);
      setFile(null);
      alert("✅ Image uploaded successfully!");
    } catch (err) {
      console.error("❌ Upload failed:", err);
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  /* ---------------- HANDLE DELETE ---------------- */
  const handleDelete = async (imageId, e) => {
    e.stopPropagation();
    if (!window.confirm("🗑️ Delete this image permanently?")) return;
    try {
      await axios.delete(
        `${BACKEND_URL}/api/trips/${id}/gallery/${imageId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setImages((prev) => prev.filter((img) => img._id !== imageId));
      alert("✅ Image deleted successfully!");
    } catch (err) {
      console.error("❌ Error deleting image:", err);
      alert("Failed to delete image!");
    }
  };

  /* ---------------- DOWNLOAD IMAGE ---------------- */
  const handleDownload = async (url, e) => {
    e.stopPropagation();
    try {
      const fileName = url.split("/").pop();
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("❌ Error downloading image:", err);
      alert("Download failed!");
    }
  };

  return (
    <div className="relative max-w-6xl mx-auto p-8 mt-20 rounded-2xl shadow-2xl bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#faf8f6] border border-[#d4af37]/30 backdrop-blur-lg">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate(`/trip/${id}`)}
        className="absolute top-5 right-5 flex items-center gap-2 bg-[#d4af37]/15 text-[#d4af37] hover:bg-[#d4af37]/30 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border border-[#d4af37]/40 backdrop-blur-md"
      >
        <ArrowLeftCircle size={18} />
        Back
      </button>

      {/* 🔹 Title */}
      <h1 className="text-4xl font-bold text-center mb-8 font-['Playfair_Display'] bg-gradient-to-r from-[#f9f7e8] to-[#d4af37] bg-clip-text text-transparent">
        Trip Gallery 📸
      </h1>

      {/* Upload Form */}
      <form
        onSubmit={handleUpload}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full sm:w-auto bg-[#faf8f6]/10 border border-[#d4af37]/40 rounded-xl px-4 py-2.5 text-[#f9f7e8] placeholder-[#f9f7e8]/50 focus:ring-2 focus:ring-[#d4af37] outline-none"
        />
        <button
          type="submit"
          disabled={uploading}
          className="flex items-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] px-6 py-2.5 rounded-xl font-semibold shadow-md hover:shadow-lg hover:from-[#e6c85c] hover:to-[#d4af37] transition-all duration-300 disabled:opacity-70"
        >
          <Upload className="w-5 h-5" />
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {/* Gallery Grid */}
      {images.length === 0 ? (
        <p className="text-center text-[#f9f7e8]/80 font-['Poppins'] italic">
          No images yet. Be the first to upload!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img) => (
            <div
              key={img._id}
              className="relative group rounded-2xl overflow-hidden border border-[#d4af37]/30 bg-gradient-to-b from-[#1e293b]/80 to-[#0f172a]/90 shadow-lg hover:shadow-[#d4af37]/30 transition-all duration-300"
            >
              <img
                src={`${BACKEND_URL}${img.url}`}
                alt="Trip"
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#0f172a]/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-6 backdrop-blur-sm">
                {/* Download Button */}
                <button
                  onClick={(e) =>
                    handleDownload(`${BACKEND_URL}${img.url}`, e)
                  }
                  className="bg-[#faf8f6]/10 border border-[#d4af37]/40 text-[#d4af37] p-3 rounded-full hover:bg-[#d4af37]/20 transition"
                >
                  <Download className="w-5 h-5" />
                </button>

                {/* Delete Button */}
                {img.uploadedBy?._id === user?._id && (
                  <button
                    onClick={(e) => handleDelete(img._id, e)}
                    className="bg-[#faf8f6]/10 border border-red-500/40 text-red-400 p-3 rounded-full hover:bg-red-900/30 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Decorative Bottom Line */}
      <div className="mt-14 w-full h-[2px] bg-gradient-to-r from-[#d4af37]/40 via-[#f9f7e8]/20 to-[#d4af37]/40" />
    </div>
  );
}
