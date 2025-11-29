import { useState } from "react";
import { addExpense } from "../api";

export default function AddExpense({ tripId, onAdd }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Get token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first.");
        return;
      }
       console.log("Sending expense:", { tripId, title, amount, token });

      // ✅ Send API request
      const res = await addExpense({ tripId, title, amount: Number(amount), token });


      // ✅ Update UI
      onAdd(res.data);
      setTitle("");
      setAmount("");
    } catch (err) {
      console.error("Error adding expense:", err);
      alert(err.response?.data?.message || "Failed to add expense");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
      <input
        type="text"
        placeholder="Expense"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-1 rounded"
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-1 rounded"
        required
      />
      <button type="submit" className="bg-green-500 text-white px-3 rounded">
        Add
      </button>
    </form>
  );
}
