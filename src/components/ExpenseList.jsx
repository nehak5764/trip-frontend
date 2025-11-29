import { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_API_URL; // 🔥 use env, not localhost

export default function ExpenseList({ tripId, token, expenses: parentExpenses }) {
  const [expenses, setExpenses] = useState(parentExpenses || []);
  const [loading, setLoading] = useState(!parentExpenses || parentExpenses.length === 0);

  useEffect(() => {
    // Use parentExpenses if passed
    if (parentExpenses && parentExpenses.length > 0) {
      setExpenses(parentExpenses);
      setLoading(false);
      return;
    }

    if (!tripId || !BACKEND_URL) return;

    const fetchExpenses = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/expenses/${tripId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching expenses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [tripId, token, parentExpenses]);

  // Update expenses if parentExpenses change (e.g., after adding new expense)
  useEffect(() => {
    if (parentExpenses) setExpenses(parentExpenses);
  }, [parentExpenses]);

  if (loading) return <p className="text-gray-500 mt-2">Loading expenses...</p>;
  if (expenses.length === 0) return <p className="text-gray-500 mt-2">No expenses yet.</p>;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">Expenses</h2>
      {expenses.map((e) => (
        <div
          key={e._id || `${e.title}-${e.amount}-${Math.random()}`}
          className="flex justify-between p-2 border rounded mb-2"
        >
          <span>{e.title}</span>
          <span>₹ {e.amount}</span>
        </div>
      ))}
    </div>
  );
}
