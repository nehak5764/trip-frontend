
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { ArrowLeftCircle } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
// import AddExpense from "../components/AddExpense";
// import ExpenseList from "../components/ExpenseList";
// import ExpenseSummary from "../components/ExpenseSummary";

// const BACKEND_URL = "http://localhost:5000";

// export default function ExpensePage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { token, user } = useAuth();
//   const [trip, setTrip] = useState(null);
//   const [expenses, setExpenses] = useState([]);
//   const [loading, setLoading] = useState(true);
  

//   /* ---------------- FETCH DATA ---------------- */
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [tripRes, expensesRes] = await Promise.all([
//           axios.get(`${BACKEND_URL}/api/trips/${id}`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get(`${BACKEND_URL}/api/expenses/${id}`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//         ]);

//         setTrip(tripRes.data);
//         setExpenses(expensesRes.data || []);
//       } catch (err) {
//         console.error("❌ Error fetching trip or expenses:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id, token]);

//   /* ---------------- HANDLE ADD EXPENSE ---------------- */
//   const handleAddExpense = (newExpense) => {
//     const expenseWithUser = {
//       ...newExpense,
//       paidBy: {
//         _id: user._id,
//         name: user.name || "You",
//         email: user.email,
//       },
//     };
//     setExpenses((prev) => [...prev, expenseWithUser]);
//   };

//   if (loading)
//     return <p className="text-center mt-10 text-gray-500">Loading expenses...</p>;

//   if (!trip)
//     return <p className="text-center mt-10 text-red-500">Trip not found.</p>;

//   /* ---------------- UI ---------------- */
//   return (
//     <div className="relative max-w-6xl mx-auto p-6 mt-15 bg-white rounded-2xl shadow-lg border border-blue-100">
//       {/* 🔹 Back Button */}
//       <button
//         onClick={() => navigate(`/trip/${id}`)}
//         className="absolute top-5 right-5 flex items-center gap-2 bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1.5 rounded-full text-sm font-medium transition-all"
//       >
//         <ArrowLeftCircle size={18} />
//         Back
//       </button>

//       {/* Title */}
//       <h1 className="text-3xl font-bold text-blue-700 mb-10 text-center">
//         {trip.title} — Expenses 💰
//       </h1>

//       {/* Layout: Left column stacked, Right sticky summary */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* LEFT SIDE */}
//         <div className="flex flex-col gap-6">
//           {/* Add Expense */}
//           <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-sm border border-blue-200">
//             <h2 className="text-lg font-semibold text-blue-700 mb-4 flex items-center gap-2">
//               ➕ Add New Expense
//             </h2>
//             <AddExpense tripId={id} token={token} onAdd={handleAddExpense} />
//           </div>

//           {/* Active Expenses */}
//           <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-sm border border-blue-200 flex-1">
//             <h2 className="text-lg font-semibold text-blue-700 mb-4 flex items-center gap-2">
//               📋 Active Expenses
//             </h2>
//             <div className="max-h-[420px] overflow-y-auto custom-scrollbar">
//               <ExpenseList tripId={id} token={token} expenses={expenses} />
//             </div>
//           </div>
//         </div>

//         {/* RIGHT SIDE (Sticky Summary) */}
//         <div className="relative">
//           <div className="sticky top-24">
//             <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-md border border-blue-200">
//               <h2 className="text-lg font-semibold text-blue-700 mb-4 flex items-center gap-2">
//                 💸 Expense Summary
//               </h2>
//               <ExpenseSummary expenses={expenses} members={trip.members} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import AddExpense from "../components/AddExpense";
import ExpenseList from "../components/ExpenseList";
import ExpenseSummary from "../components/ExpenseSummary";

const BACKEND_URL = "http://localhost:5000";

export default function ExpensePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [trip, setTrip] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tripRes, expensesRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/trips/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BACKEND_URL}/api/expenses/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setTrip(tripRes.data);
        setExpenses(expensesRes.data || []);
      } catch (err) {
        console.error("❌ Error fetching trip or expenses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  /* ---------------- HANDLE ADD EXPENSE ---------------- */
  const handleAddExpense = (newExpense) => {
    const expenseWithUser = {
      ...newExpense,
      paidBy: {
        _id: user._id,
        name: user.name || "You",
        email: user.email,
      },
    };
    setExpenses((prev) => [...prev, expenseWithUser]);
  };

  /* ---------------- UI ---------------- */
  if (loading)
    return (
      <p className="text-center mt-10 text-[#f9f7e8]/70 font-['Poppins'] italic">
        Loading expenses...
      </p>
    );

  if (!trip)
    return (
      <p className="text-center mt-10 text-red-400 font-['Poppins']">
        Trip not found.
      </p>
    );

  return (
    <div className="relative max-w-6xl mx-auto p-8 mt-20 rounded-2xl shadow-2xl bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#faf8f6] border border-[#d4af37]/30 backdrop-blur-lg">
      {/* 🔹 Back Button */}
      <button
        onClick={() => navigate(`/trip/${id}`)}
        className="absolute top-5 right-5 flex items-center gap-2 bg-[#d4af37]/20 text-[#d4af37] hover:bg-[#d4af37]/30 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm border border-[#d4af37]/40"
      >
        <ArrowLeftCircle size={18} />
        Back
      </button>

      {/* 🔹 Title */}
      <h1 className="text-4xl font-bold text-center font-['Playfair_Display'] mb-10 bg-gradient-to-r from-[#f9f7e8] to-[#d4af37] bg-clip-text text-transparent">
        {trip.title} — Expenses 💰
      </h1>

      {/* 🌟 Layout: Left Column (add/list) + Right (summary) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-6">
          {/* ➕ Add Expense */}
          <div className="bg-gradient-to-br from-[#1e293b]/80 to-[#0f172a]/90 border border-[#d4af37]/30 rounded-2xl p-6 shadow-lg backdrop-blur-xl">
            <h2 className="text-lg font-semibold text-[#d4af37] mb-4 flex items-center gap-2 font-['Poppins']">
              ➕ Add New Expense
            </h2>
            <AddExpense tripId={id} token={token} onAdd={handleAddExpense} />
          </div>

          {/* 📋 Active Expenses */}
          <div className="bg-gradient-to-br from-[#1e293b]/80 to-[#0f172a]/90 border border-[#d4af37]/30 rounded-2xl p-6 shadow-lg backdrop-blur-xl flex-1">
            <h2 className="text-lg font-semibold text-[#d4af37] mb-4 flex items-center gap-2 font-['Poppins']">
              📋 Active Expenses
            </h2>
            <div className="max-h-[420px] overflow-y-auto custom-scrollbar pr-2">
              <ExpenseList tripId={id} token={token} expenses={expenses} />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — Sticky Summary */}
        <div className="relative">
          <div className="sticky top-24">
            <div className="bg-gradient-to-br from-[#1e293b]/80 to-[#0f172a]/90 border border-[#d4af37]/30 rounded-2xl p-6 shadow-lg backdrop-blur-xl">
              <h2 className="text-lg font-semibold text-[#d4af37] mb-4 flex items-center gap-2 font-['Poppins']">
                💸 Expense Summary
              </h2>
              <ExpenseSummary expenses={expenses} members={trip.members} />
            </div>
          </div>
        </div>
      </div>

      {/* ✨ Decorative Bottom Glow */}
      <div className="mt-14 w-full h-[2px] bg-gradient-to-r from-[#d4af37]/40 via-[#f9f7e8]/30 to-[#d4af37]/40" />
    </div>
  );
}
