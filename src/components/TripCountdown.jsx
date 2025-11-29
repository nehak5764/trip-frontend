import { useEffect, useState } from "react";

export default function TripCountdown({ trip }) {
  const [daysLeft, setDaysLeft] = useState(null);

  useEffect(() => {
    if (!trip?.startDate) return;

    const updateCountdown = () => {
      const now = new Date();
      const start = new Date(trip.startDate);
      const diffMs = start - now;
      const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      setDaysLeft(days);
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 60 * 1000); // update every 1 min
    return () => clearInterval(timer);
  }, [trip?.startDate]);

  if (!trip) return null;

  let message = "";
  if (daysLeft > 0) message = `Trip starts in ${daysLeft} day${daysLeft === 1 ? "" : "s"} 🎒`;
  else if (daysLeft === 0) message = "Trip starts today 🎉";
  else message = "Trip already started ⛱️";

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex items-center gap-3 border-l-4 border-blue-500">
      <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-700 font-bold rounded-full text-lg">
        {daysLeft > 0 ? daysLeft : "🎉"}
      </div>
      <div>
        <p className="text-sm text-gray-500">{trip.title}</p>
        <p className="font-semibold text-blue-700">{message}</p>
      </div>
    </div>
  );
}
