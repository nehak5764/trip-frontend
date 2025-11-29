// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import { useAuth } from "../context/AuthContext";

// export default function ExpenseSummary({ expenses, members = [] }) {
//   const { user } = useAuth();

//   // ✅ Only trip members can view this
//   const isMember = members?.some(
//     (m) => m.user._id === user.id || m.user._id === user._id
//   );

//   console.log("User ID:", user.id || user._id);
//   console.log("Trip members user IDs:", members.map((m) => m.user._id));
//   console.log("Is Member:", isMember);
//   console.log("Expenses data:", expenses);

//   if (!isMember) return null;

//   if (!expenses || expenses.length === 0)
//     return (
//       <div className="mt-6 p-4 text-center text-gray-600 italic">
//         No expenses recorded yet 💰
//       </div>
//     );

//   // 🧮 Calculate totals per payer
//   const totals = {};
//   expenses.forEach((e) => {
//     const name = e.paidBy?.name || "Unknown";
//     totals[name] = (totals[name] || 0) + Number(e.amount || 0);
//   });

//   const membersList = Object.keys(totals);
//   const totalAmount = Object.values(totals).reduce((a, b) => a + b, 0);
//   const share = totalAmount / membersList.length;

//   const balances = membersList.map((name) => ({
//     name,
//     paid: totals[name],
//     balance: totals[name] - share,
//   }));

//   const payers = balances.filter((b) => b.balance > 0);
//   const debtors = balances.filter((b) => b.balance < 0);
//   const transactions = [];

//   // 💸 Simple settlement logic
//   let i = 0,
//     j = 0;
//   while (i < payers.length && j < debtors.length) {
//     const payer = payers[i];
//     const debtor = debtors[j];
//     const amount = Math.min(payer.balance, -debtor.balance);

//     transactions.push({
//       from: debtor.name,
//       to: payer.name,
//       amount: amount.toFixed(2),
//     });

//     payer.balance -= amount;
//     debtor.balance += amount;

//     if (payer.balance === 0) i++;
//     if (debtor.balance === 0) j++;
//   }

//   // 🧾 Generate PDF
//   const generatePDF = () => {
//     const doc = new jsPDF();
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(20);
//     doc.text("Trip Expense Report", 70, 20);

//     doc.setFontSize(12);
//     doc.text(`Total Expense: ₹${totalAmount}`, 14, 35);
//     doc.text(`Per Person Share: ₹${share.toFixed(2)}`, 14, 42);

//     // Expense table using paidBy.name
//     const expenseTable = expenses.map((e) => [
//       e.paidBy?.name || "Unknown",
//       `₹${e.amount}`,
//       e.title || "-"
//     ]);

//     autoTable(doc, {
//       startY: 50,
//       head: [["Paid By", "Amount Paid", "Expense Title"]],
//       body: expenseTable,
//     });

//     // Balances table
//     const balanceTable = balances.map((b) => [
//       b.name,
//       `₹${b.paid}`,
//       `₹${b.balance.toFixed(2)}`,
//     ]);

//     autoTable(doc, {
//       startY: doc.lastAutoTable.finalY + 10,
//       head: [["Member", "Paid", "Balance"]],
//       body: balanceTable,
//     });

//     // Transactions
//     doc.text("Settlements:", 14, doc.lastAutoTable.finalY + 20);
//     transactions.forEach((t, i) => {
//       doc.text(
//         `${i + 1}. ${t.from} pays ₹${t.amount} to ${t.to}`,
//         18,
//         doc.lastAutoTable.finalY + 30 + i * 8
//       );
//     });

//     doc.save("Trip_Expense_Report.pdf");
//   };

//   return (
//     <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl shadow-md border border-gray-200">
//       <h2 className="text-xl font-bold text-purple-700 mb-3">
//         💸 Trip Expense Summary
//       </h2>

//       <div className="flex flex-col sm:flex-row justify-between items-center text-gray-700 mb-4">
//         <p>
//           <strong>Total Expense:</strong> ₹{totalAmount.toFixed(2)}
//         </p>
//         <p>
//           <strong>Each Member Pays:</strong> ₹{share.toFixed(2)}
//         </p>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
//         <h3 className="text-lg font-semibold text-gray-800 mb-2">
//           Settlement Summary
//         </h3>
//         {transactions.length === 0 ? (
//           <p className="text-green-600 font-medium">All settled up! 🎉</p>
//         ) : (
//           <ul className="space-y-1">
//             {transactions.map((t, i) => (
//               <li key={i} className="text-gray-700">
//                 <span className="font-medium">{t.from}</span> pays{" "}
//                 <span className="text-blue-600 font-semibold">₹{t.amount}</span>{" "}
//                 to <span className="font-medium">{t.to}</span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       <button
//         onClick={generatePDF}
//         className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg transition-all shadow-md"
//       >
//         📄 Download Trip Report
//       </button>
//     </div>
//   );
// }





import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useAuth } from "../context/AuthContext";

export default function ExpenseSummary({ expenses, members = [] }) {
  const { user } = useAuth();

  // ✅ Member validation
  const isMember = members?.some(
    (m) => m.user._id === user.id || m.user._id === user._id
  );

  if (!isMember) return null;

  if (!expenses || expenses.length === 0)
    return (
      <div className="mt-6 p-4 text-center text-gray-400 italic">
        No expenses recorded yet 💰
      </div>
    );

  // 🧮 Totals per payer
  const totals = {};
  expenses.forEach((e) => {
    const name = e.paidBy?.name || "Unknown";
    totals[name] = (totals[name] || 0) + Number(e.amount || 0);
  });

  const membersList = Object.keys(totals);
  const totalAmount = Object.values(totals).reduce((a, b) => a + b, 0);
  const share = totalAmount / membersList.length;

  const balances = membersList.map((name) => ({
    name,
    paid: totals[name],
    balance: totals[name] - share,
  }));

  const payers = balances.filter((b) => b.balance > 0);
  const debtors = balances.filter((b) => b.balance < 0);
  const transactions = [];

  // 💸 Settlement logic
  let i = 0,
    j = 0;
  while (i < payers.length && j < debtors.length) {
    const payer = payers[i];
    const debtor = debtors[j];
    const amount = Math.min(payer.balance, -debtor.balance);

    transactions.push({
      from: debtor.name,
      to: payer.name,
      amount: amount.toFixed(2),
    });

    payer.balance -= amount;
    debtor.balance += amount;

    if (payer.balance === 0) i++;
    if (debtor.balance === 0) j++;
  }

  // 🧾 Generate PDF Report
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Trip Expense Report", 65, 20);

    doc.setFontSize(12);
    doc.text(`Total Expense: ₹${totalAmount}`, 14, 35);
    doc.text(`Per Person Share: ₹${share.toFixed(2)}`, 14, 42);

    const expenseTable = expenses.map((e) => [
      e.paidBy?.name || "Unknown",
      `₹${e.amount}`,
      e.title || "-",
    ]);

    autoTable(doc, {
      startY: 50,
      head: [["Paid By", "Amount Paid", "Expense Title"]],
      body: expenseTable,
    });

    const balanceTable = balances.map((b) => [
      b.name,
      `₹${b.paid}`,
      `₹${b.balance.toFixed(2)}`,
    ]);

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Member", "Paid", "Balance"]],
      body: balanceTable,
    });

    doc.text("Settlements:", 14, doc.lastAutoTable.finalY + 20);
    transactions.forEach((t, i) => {
      doc.text(
        `${i + 1}. ${t.from} pays ₹${t.amount} to ${t.to}`,
        18,
        doc.lastAutoTable.finalY + 30 + i * 8
      );
    });

    doc.save("Trip_Expense_Report.pdf");
  };

  return (
    <div className="mt-10 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-3xl p-8 border border-[#d4af37]/20 shadow-xl text-[#f9f7e8] relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/10 via-transparent to-[#b8860b]/10 blur-2xl -z-10" />

      <h2 className="text-2xl font-bold text-[#d4af37] mb-4 flex items-center gap-2 font-['Playfair_Display']">
        💸 Trip Expense Summary
      </h2>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <p>
          <span className="text-[#f9f7e8]/70 font-medium">Total Expense:</span>{" "}
          <span className="text-[#d4af37] font-semibold">₹{totalAmount.toFixed(2)}</span>
        </p>
        <p>
          <span className="text-[#f9f7e8]/70 font-medium">Each Member Pays:</span>{" "}
          <span className="text-[#d4af37] font-semibold">₹{share.toFixed(2)}</span>
        </p>
      </div>

      {/* Settlement Summary Card */}
      <div className="bg-[#1e293b]/60 border border-[#d4af37]/30 rounded-2xl p-5 shadow-inner">
        <h3 className="text-lg font-semibold text-[#e6c85c] mb-3">Settlement Summary</h3>
        {transactions.length === 0 ? (
          <p className="text-green-400 font-medium">All settled up! 🎉</p>
        ) : (
          <ul className="space-y-1 text-sm">
            {transactions.map((t, i) => (
              <li key={i} className="text-[#f9f7e8]/80">
                <span className="font-medium text-[#e6c85c]">{t.from}</span>{" "}
                pays <span className="text-[#d4af37] font-semibold">₹{t.amount}</span>{" "}
                to <span className="font-medium text-[#e6c85c]">{t.to}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* PDF Download Button */}
      <button
        onClick={generatePDF}
        className="mt-6 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] 
                   font-semibold px-6 py-2.5 rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.5)]
                   transition-all duration-300 hover:scale-105"
      >
        📄 Download Trip Report
      </button>
    </div>
  );
}
