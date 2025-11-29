
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import { ArrowLeftCircle, Plus, User } from "lucide-react";
// import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from "recharts";

// const BACKEND_URL = "http://localhost:5000";

// export default function PollsPage() {
//   const { id } = useParams();
//   const { token, user } = useAuth();
//   const navigate = useNavigate();
//   const [polls, setPolls] = useState([]);
//   const [newPoll, setNewPoll] = useState({ question: "", options: ["", ""] });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPolls = async () => {
//       try {
//         const res = await axios.get(`${BACKEND_URL}/api/polls/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setPolls(Array.isArray(res.data) ? res.data : []);
//       } catch (err) {
//         console.error("Error fetching polls:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPolls();
//   }, [id, token]);

//   const addOption = () =>
//     setNewPoll((prev) => ({ ...prev, options: [...prev.options, ""] }));

//   const handleOptionChange = (idx, value) => {
//     const options = [...newPoll.options];
//     options[idx] = value;
//     setNewPoll((prev) => ({ ...prev, options }));
//   };

//   const createPollHandler = async () => {
//     if (!newPoll.question.trim()) return alert("Poll question cannot be empty");
//     if (newPoll.options.some((opt) => !opt.trim()))
//       return alert("All poll options must be filled");

//     try {
//       const res = await axios.post(
//         `${BACKEND_URL}/api/polls`,
//         { tripId: id, question: newPoll.question, options: newPoll.options },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setPolls((prev) => [...prev, res.data]);
//       setNewPoll({ question: "", options: ["", ""] });
//     } catch (err) {
//       console.error("Error creating poll:", err);
//       alert(err.response?.data?.message || "Error creating poll");
//     }
//   };

//   const vote = async (pollId, optionIndex) => {
//     try {
//       const res = await axios.post(
//         `${BACKEND_URL}/api/polls/${pollId}/vote`,
//         { optionIndex },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setPolls((prev) => prev.map((p) => (p._id === pollId ? res.data : p)));
//     } catch (err) {
//       alert(err.response?.data?.message || "Error voting");
//     }
//   };

//   if (loading)
//     return (
//       <p className="text-center mt-10 text-blue-500 text-lg">
//         Loading polls...
//       </p>
//     );

//   return (
//     <div className="min-h-screen bg-blue-50 text-blue-900 p-10 mt-8">
//       {/* Header */}
//       <div className="max-w-7xl mx-auto mb-10 relative bg-white rounded-2xl shadow-md p-6 border border-blue-200">
//         <button
//           onClick={() => navigate(`/trip/${id}`)}
//           className="absolute top-5 right-5 flex items-center gap-2 bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1.5 rounded-full text-sm font-medium transition-all"
//         >
//           <ArrowLeftCircle size={18} />
//           Back
//         </button>

//         <h1 className="text-4xl font-bold text-center text-blue-700 mb-1">
//           Trip Polls 🗳️
//         </h1>
//         <p className="text-center text-blue-500">
//           Create and vote on trip-related polls
//         </p>
//       </div>

//       {/* Two-Column Layout */}
//       <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
//         {/* Create Poll Section */}
//         <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-md">
//           <h2 className="text-2xl font-semibold mb-4 text-blue-600">
//             Create a New Poll
//           </h2>

//           <input
//             type="text"
//             placeholder="Enter poll question..."
//             value={newPoll.question}
//             onChange={(e) =>
//               setNewPoll({ ...newPoll, question: e.target.value })
//             }
//             className="w-full bg-blue-50 border border-blue-300 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />

//           {newPoll.options.map((opt, idx) => (
//             <input
//               key={idx}
//               type="text"
//               placeholder={`Option ${idx + 1}`}
//               value={opt}
//               onChange={(e) => handleOptionChange(idx, e.target.value)}
//               className="w-full bg-blue-50 border border-blue-300 rounded-lg p-3 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           ))}

//           <div className="flex justify-between items-center mt-4">
//             <button
//               onClick={addOption}
//               className="flex items-center gap-1 bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-lg text-sm font-medium text-blue-700 transition"
//             >
//               <Plus size={16} /> Add Option
//             </button>
//             <button
//               onClick={createPollHandler}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"
//             >
//               Create Poll
//             </button>
//           </div>
//         </div>

//         {/* Active Polls Section */}
//         <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-md overflow-y-auto max-h-[80vh]">
//           <h2 className="text-2xl font-semibold mb-6 text-blue-600">
//             Active Polls
//           </h2>

//           {polls.length === 0 ? (
//             <p className="text-blue-500 italic text-center mt-10">
//               No polls yet. Create one!
//             </p>
//           ) : (
//             <div className="space-y-8">
//               {polls.map((poll) => {
//                 const hasVoted = poll.options.some((o) =>
//                   o.votes?.includes(user?._id)
//                 );
//                 const totalVotes = poll.options.reduce(
//                   (sum, o) => sum + (o.votes?.length || 0),
//                   0
//                 );

//                 const data = poll.options.map((opt, index) => ({
//                   name: opt.text,
//                   votes: opt.votes?.length || 0,
//                   color: [
//                     "#34d399",
//                     "#60a5fa",
//                     "#fbbf24",
//                     "#f87171",
//                     "#a78bfa",
//                     "#ec4899",
//                   ][index % 6],
//                 }));

//                 return (
//                   <div
//                     key={poll._id}
//                     className="border border-blue-200 rounded-xl p-5 bg-blue-50 hover:shadow-lg transition"
//                   >
//                     <h3 className="text-lg font-semibold text-blue-700 mb-4">
//                       {poll.question}
//                     </h3>

//                     {/* Chart */}
//                     {totalVotes > 0 ? (
//                       <div className="flex flex-col items-center">
//                         <ResponsiveContainer width="100%" height={200}>
//                           <BarChart data={data}>
//                             <XAxis dataKey="name" tick={{ fontSize: 12 }} />
//                             <Bar dataKey="votes" radius={[10, 10, 0, 0]}>
//                               {data.map((entry, index) => (
//                                 <Cell key={index} fill={entry.color} />
//                               ))}
//                             </Bar>
//                           </BarChart>
//                         </ResponsiveContainer>

//                         <div className="flex justify-between w-full mt-3 px-3">
//                           {data.map((entry, idx) => (
//                             <div key={idx} className="flex flex-col items-center">
//                               <User
//                                 size={18}
//                                 color={entry.color}
//                                 className="opacity-80"
//                               />
//                               <span className="text-xs text-blue-700 mt-1">
//                                 {entry.votes}
//                               </span>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     ) : (
//                       <p className="text-blue-400 text-sm italic">
//                         No votes yet
//                       </p>
//                     )}

//                     {/* Vote Buttons */}
//                     <div className="mt-4 flex flex-wrap gap-2">
//                       {poll.options.map((opt, idx) => {
//                         const optionText =
//                           typeof opt === "string" ? opt : opt.text;
//                         return (
//                           <button
//                             key={idx}
//                             onClick={() => vote(poll._id, idx)}
//                             disabled={hasVoted}
//                             className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
//                               hasVoted
//                                 ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
//                                 : "bg-blue-100 border-blue-200 text-blue-700 hover:bg-blue-200"
//                             }`}
//                           >
//                             {optionText}
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { ArrowLeftCircle, Plus, User } from "lucide-react";
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from "recharts";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // ✅ use env, not localhost

export default function PollsPage() {
  const { id } = useParams();
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [polls, setPolls] = useState([]);
  const [newPoll, setNewPoll] = useState({ question: "", options: ["", ""] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/polls/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPolls(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching polls:", err);
      } finally {
        setLoading(false);
      }
    };
    if (BACKEND_URL && token) fetchPolls();
  }, [id, token]);

  const addOption = () =>
    setNewPoll((prev) => ({ ...prev, options: [...prev.options, ""] }));

  const handleOptionChange = (idx, value) => {
    const options = [...newPoll.options];
    options[idx] = value;
    setNewPoll((prev) => ({ ...prev, options }));
  };

  const createPollHandler = async () => {
    if (!newPoll.question.trim()) return alert("Poll question cannot be empty");
    if (newPoll.options.some((opt) => !opt.trim()))
      return alert("All poll options must be filled");

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/polls`,
        { tripId: id, question: newPoll.question, options: newPoll.options },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPolls((prev) => [...prev, res.data]);
      setNewPoll({ question: "", options: ["", ""] });
    } catch (err) {
      console.error("Error creating poll:", err);
      alert(err.response?.data?.message || "Error creating poll");
    }
  };

  const vote = async (pollId, optionIndex) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/polls/${pollId}/vote`,
        { optionIndex },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPolls((prev) => prev.map((p) => (p._id === pollId ? res.data : p)));
    } catch (err) {
      alert(err.response?.data?.message || "Error voting");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-[#d4af37] text-lg font-['Poppins']">
        Loading polls...
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#faf8f6] text-[#f9f7e8] px-6 py-12 font-['Poppins']">
      {/* 🟨 Header */}
      <div className="max-w-7xl mx-auto mb-10 relative bg-gradient-to-br from-[#1e293b]/90 to-[#0f172a]/90 border border-[#d4af37]/30 rounded-2xl shadow-2xl p-8 backdrop-blur-xl">
        <button
          onClick={() => navigate(`/trip/${id}`)}
          className="absolute top-5 right-5 flex items-center gap-2 bg-[#d4af37]/20 text-[#d4af37] hover:bg-[#d4af37]/30 px-4 py-1.5 rounded-full text-sm font-medium transition-all border border-[#d4af37]/40"
        >
          <ArrowLeftCircle size={18} />
          Back
        </button>

        <h1 className="text-4xl font-bold text-center mb-2 font-['Playfair_Display'] bg-gradient-to-r from-[#f9f7e8] to-[#d4af37] bg-clip-text text-transparent">
          Trip Polls 🗳️
        </h1>
        <p className="text-center text-[#f9f7e8]/80">
          Create and vote on trip-related decisions
        </p>
      </div>

      {/* Layout */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Create Poll Section */}
        <div className="bg-gradient-to-b from-[#1e293b]/80 to-[#0f172a]/90 border border-[#d4af37]/30 rounded-2xl p-6 shadow-lg backdrop-blur-xl">
          <h2 className="text-2xl font-semibold mb-5 text-[#d4af37] font-['Playfair_Display']">
            Create a New Poll
          </h2>

          <input
            type="text"
            placeholder="Enter poll question..."
            value={newPoll.question}
            onChange={(e) =>
              setNewPoll({ ...newPoll, question: e.target.value })
            }
            className="w-full bg-[#faf8f6]/10 text-[#f9f7e8] border border-[#d4af37]/40 rounded-xl px-4 py-2.5 mb-3 placeholder-[#f9f7e8]/50 focus:ring-2 focus:ring-[#d4af37] outline-none"
          />

          {newPoll.options.map((opt, idx) => (
            <input
              key={idx}
              type="text"
              placeholder={`Option ${idx + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
              className="w-full bg-[#faf8f6]/10 text-[#f9f7e8] border border-[#d4af37]/40 rounded-xl px-4 py-2.5 mb-2 placeholder-[#f9f7e8]/50 focus:ring-2 focus:ring-[#d4af37] outline-none"
            />
          ))}

          <div className="flex justify-between items-center mt-5">
            <button
              onClick={addOption}
              className="flex items-center gap-2 bg-[#d4af37]/20 hover:bg-[#d4af37]/30 text-[#d4af37] px-4 py-2 rounded-lg text-sm font-medium border border-[#d4af37]/40 transition"
            >
              <Plus size={16} /> Add Option
            </button>
            <button
              onClick={createPollHandler}
              className="bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] font-semibold px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:from-[#e6c85c] hover:to-[#d4af37] transition-all"
            >
              Create Poll
            </button>
          </div>
        </div>

        {/* Active Polls Section */}
        <div className="bg-gradient-to-b from-[#1e293b]/80 to-[#0f172a]/90 border border-[#d4af37]/30 rounded-2xl p-6 shadow-lg backdrop-blur-xl overflow-y-auto max-h-[80vh]">
          <h2 className="text-2xl font-semibold mb-6 text-[#d4af37] font-['Playfair_Display']">
            Active Polls
          </h2>

          {polls.length === 0 ? (
            <p className="text-[#f9f7e8]/70 italic text-center mt-10">
              No polls yet. Create one!
            </p>
          ) : (
            <div className="space-y-8">
              {polls.map((poll) => {
                const hasVoted = poll.options.some((o) =>
                  o.votes?.includes(user?._id)
                );
                const totalVotes = poll.options.reduce(
                  (sum, o) => sum + (o.votes?.length || 0),
                  0
                );

                const data = poll.options.map((opt, index) => ({
                  name: opt.text,
                  votes: opt.votes?.length || 0,
                  color: [
                    "#34d399",
                    "#60a5fa",
                    "#fbbf24",
                    "#f87171",
                    "#a78bfa",
                    "#ec4899",
                  ][index % 6],
                }));

                return (
                  <div
                    key={poll._id}
                    className="border border-[#d4af37]/40 rounded-2xl p-5 bg-[#faf8f6]/5 hover:bg-[#faf8f6]/10 transition-all shadow-md"
                  >
                    <h3 className="text-lg font-semibold text-[#f9f7e8] mb-4">
                      {poll.question}
                    </h3>

                    {/* Chart */}
                    {totalVotes > 0 ? (
                      <div className="flex flex-col items-center">
                        <ResponsiveContainer width="100%" height={200}>
                          <BarChart data={data}>
                            <XAxis
                              dataKey="name"
                              tick={{ fontSize: 12, fill: "#f9f7e8" }}
                            />
                            <Bar dataKey="votes" radius={[10, 10, 0, 0]}>
                              {data.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>

                        <div className="flex justify-between w-full mt-3 px-3">
                          {data.map((entry, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                              <User
                                size={18}
                                color={entry.color}
                                className="opacity-80"
                              />
                              <span className="text-xs text-[#f9f7e8] mt-1">
                                {entry.votes}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-[#f9f7e8]/60 text-sm italic">
                        No votes yet
                      </p>
                    )}

                    {/* Vote Buttons */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {poll.options.map((opt, idx) => {
                        const optionText =
                          typeof opt === "string" ? opt : opt.text;
                        return (
                          <button
                            key={idx}
                            onClick={() => vote(poll._id, idx)}
                            disabled={hasVoted}
                            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                              hasVoted
                                ? "bg-[#faf8f6]/10 border-[#f9f7e8]/10 text-[#f9f7e8]/40 cursor-not-allowed"
                                : "bg-[#d4af37]/20 border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37]/30"
                            }`}
                          >
                            {optionText}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
