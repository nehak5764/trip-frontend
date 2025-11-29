// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FiRefreshCcw } from "react-icons/fi"; // 🔁 Reset icon

// const countries = [
//   { name: "India", code: "INR" },
//   { name: "United States", code: "USD" },
//   { name: "United Kingdom", code: "GBP" },
//   { name: "Eurozone", code: "EUR" },
//   { name: "Japan", code: "JPY" },
//   { name: "Australia", code: "AUD" },
//   { name: "Canada", code: "CAD" },
//   { name: "China", code: "CNY" },
//   { name: "Singapore", code: "SGD" },
//   { name: "Switzerland", code: "CHF" },
//   { name: "Russia", code: "RUB" },
//   { name: "Brazil", code: "BRL" },
//   { name: "South Africa", code: "ZAR" },
//   { name: "Saudi Arabia", code: "SAR" },
//   { name: "UAE", code: "AED" },
//   { name: "Mexico", code: "MXN" },
//   { name: "New Zealand", code: "NZD" },
//   { name: "South Korea", code: "KRW" },
//   { name: "Turkey", code: "TRY" },
//   { name: "Sweden", code: "SEK" },
//   { name: "Norway", code: "NOK" },
//   { name: "Denmark", code: "DKK" },
//   { name: "Poland", code: "PLN" },   
//   { name: "Thailand", code: "THB" },
//   { name: "Indonesia", code: "IDR" },
//   { name: "Vietnam", code: "VND" },  
//   { name: "Philippines", code: "PHP" },
//   { name: "Argentina", code: "ARS" },
//   { name: "Chile", code: "CLP" },   
//   { name: "Colombia", code: "COP" },    
//   { name: "Egypt", code: "EGP" },
//   { name: "Nigeria", code: "NGN" },   
//   { name: "Kenya", code: "KES" },   
//   { name: "Ghana", code: "GHS" }, 
//   { name: "Czech Republic", code: "CZK" },  
//   { name: "Hungary", code: "HUF" },   
//   { name: "Pakistan", code: "PKR" },  
//   { name: "Bangladesh", code: "BDT" },
//   { name: "Sri Lanka", code: "LKR" }, 
//   { name: "Nepal", code: "NPR" },
//   { name: "Iceland", code: "ISK" }, 
//   { name: "Croatia", code: "HRK" },
//   { name: "Romania", code: "RON" },
//   { name: "Bulgaria", code: "BGN" },
//   { name: "Slovakia", code: "SKK" },
//   { name: "Lithuania", code: "LTL" },
//   { name: "Latvia", code: "LVL" },
//   { name: "Estonia", code: "EEK" }, 
//   { name: "Ukraine", code: "UAH" },
//   { name: "Belarus", code: "BYN" },
//   { name: "Kazakhstan", code: "KZT" },
//   { name: "Uzbekistan", code: "UZS" },
//   { name: "Argentina", code: "ARS" },
//   { name: "Peru", code: "PEN" },
//   { name: "Venezuela", code: "VES" },
//   { name: "Iraq", code: "IQD" },
//   { name: "Jordan", code: "JOD" },
//   { name: "Lebanon", code: "LBP" },
//   { name: "Morocco", code: "MAD" },
//   { name: "Tunisia", code: "TND" },
//   { name: "Algeria", code: "DZD" },
//   { name: "Ethiopia", code: "ETB" },
//   { name: "Uganda", code: "UGX" },
//   { name: "Tanzania", code: "TZS" },
//   { name: "Zimbabwe", code: "ZWL" },
//   { name: "Cambodia", code: "KHR" },
//   { name: "Myanmar", code: "MMK" },
//   { name: "Laos", code: "LAK" },
//   { name: "Mongolia", code: "MNT" },
//   { name: "Sri Lanka", code: "LKR" },
//   { name: "Maldives", code: "MVR" },
//   { name: "Brunei", code: "BND" },
//   { name: "Fiji", code: "FJD" },
//   { name: "Papua New Guinea", code: "PGK" },
//   { name: "Botswana", code: "BWP" },
//   { name: "Namibia", code: "NAD" },
//   { name: "Zambia", code: "ZMW" },
//   { name: "Mozambique", code: "MZN" },
//   { name: "Greece", code: "EUR" },
//   { name: "Portugal", code: "EUR" },
//   { name: "Italy", code: "EUR" },
//   { name: "Spain", code: "EUR" },
//   { name: "France", code: "EUR" },
//   { name: "Germany", code: "EUR" },
//   { name: "Netherlands", code: "EUR" },
//   { name: "Belgium", code: "EUR" },
//   { name: "Austria", code: "EUR" },
//   { name: "Finland", code: "EUR" },
//   { name: "Ireland", code: "EUR" },
//   { name: "Luxembourg", code: "EUR" },
//   { name: "Malta", code: "EUR" },
//   { name: "Cyprus", code: "EUR" },
//   { name: "Slovenia", code: "EUR" },
//   { name: "Croatia", code: "HRK" },
//   { name: "Serbia", code: "RSD" },
//   { name: "Bosnia and Herzegovina", code: "BAM" },
//   { name: "North Macedonia", code: "MKD" },
//   { name: "Albania", code: "ALL" },
//   { name: "Montenegro", code: "EUR" },
//   { name: "Kosovo", code: "EUR" },
//   { name: "Iceland", code: "ISK" },
//   { name: "Faroe Islands", code: "DKK" },
//   { name: "Greenland", code: "DKK" },
//   { name: "Liechtenstein", code: "CHF" },
//   { name: "Monaco", code: "EUR" },
//   { name: "San Marino", code: "EUR" },
//   { name: "Vatican City", code: "EUR" },
//   { name: "Andorra", code: "EUR" },
//   { name: "Gibraltar", code: "GIP" },
//   { name: "Jersey", code: "GBP" },
//   { name: "Guernsey", code: "GBP"},

// ];

// const CurrencyConverter = () => {
//   const [fromCountry, setFromCountry] = useState("INR");
//   const [toCountry, setToCountry] = useState("USD");
//   const [amount, setAmount] = useState(1);
//   const [convertedAmount, setConvertedAmount] = useState(null);
//   const [rates, setRates] = useState({});

//   // ✅ Fetch exchange rates
//   useEffect(() => {
//     const fetchRates = async () => {
//       try {
//         const res = await axios.get("https://api.exchangerate-api.com/v4/latest/USD");
//         setRates(res.data.rates);
//       } catch (err) {
//         console.error("Error fetching rates", err);
//       }
//     };
//     fetchRates();
//   }, []);

//   // ✅ Convert Currency
//   const convertCurrency = () => {
//     if (!rates[fromCountry] || !rates[toCountry]) {
//       alert("Exchange rate not available for selected countries.");
//       return;
//     }
//     const usdAmount = amount / rates[fromCountry];
//     const result = (usdAmount * rates[toCountry]).toFixed(2);
//     setConvertedAmount(result);
//   };

//   // ✅ Reset all fields
//   const resetConverter = () => {
//     setFromCountry("INR");
//     setToCountry("USD");
//     setAmount(1);
//     setConvertedAmount(null);
//   };

//   return (
//     <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-6 text-center mt-6">
//       <h2 className="text-2xl font-semibold mb-4">🌍 Currency Converter</h2>

//       <div className="grid grid-cols-2 gap-4 mb-4">
//         <div>
//           <label className="block mb-1 text-sm font-medium">From Country</label>
//           <select
//             value={fromCountry}
//             onChange={(e) => setFromCountry(e.target.value)}
//             className="border border-gray-300 rounded-md p-2 w-full"
//           >
//             {countries.map((c) => (
//               <option key={c.code} value={c.code}>
//                 {c.name} ({c.code})
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block mb-1 text-sm font-medium">To Country</label>
//           <select
//             value={toCountry}
//             onChange={(e) => setToCountry(e.target.value)}
//             className="border border-gray-300 rounded-md p-2 w-full"
//           >
//             {countries.map((c) => (
//               <option key={c.code} value={c.code}>
//                 {c.name} ({c.code})
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className="mb-4">
//         <label className="block mb-1 text-sm font-medium">Amount</label>
//         <input
//           type="number"
//           className="border border-gray-300 rounded-md p-2 w-full"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           placeholder="Enter amount"
//         />
//       </div>

//       <div className="flex justify-center gap-4">
//         <button
//           onClick={convertCurrency}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//         >
//           Convert
//         </button>

//         <button
//           onClick={resetConverter}
//           className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
//         >
//           <FiRefreshCcw className="text-gray-600" />
//           Reset
//         </button>
//       </div>

//       {convertedAmount && (
//         <p className="mt-4 text-lg font-semibold text-green-600">
//           {amount} {fromCountry} = {convertedAmount} {toCountry}
//         </p>
//       )}
//     </div>
//   );
// };

// export default CurrencyConverter;




import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiRefreshCcw } from "react-icons/fi";

const countries = [
  { name: "India", code: "INR" },
  { name: "United States", code: "USD" },
  { name: "United Kingdom", code: "GBP" },
  { name: "Eurozone", code: "EUR" },
  { name: "Japan", code: "JPY" },
  { name: "Australia", code: "AUD" },
  { name: "Canada", code: "CAD" },
  { name: "Singapore", code: "SGD" },
  { name: "Switzerland", code: "CHF" },
  { name: "United Arab Emirates", code: "AED" },
  { name: "Saudi Arabia", code: "SAR" },
  { name: "China", code: "CNY" },
  { name: "Brazil", code: "BRL" },
  { name: "South Africa", code: "ZAR" },
];

export default function CurrencyConverter() {
  const [fromCountry, setFromCountry] = useState("INR");
  const [toCountry, setToCountry] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [rates, setRates] = useState({});

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await axios.get("https://api.exchangerate-api.com/v4/latest/USD");
        setRates(res.data.rates);
      } catch (err) {
        console.error("Error fetching exchange rates", err);
      }
    };
    fetchRates();
  }, []);

  const convertCurrency = () => {
    if (!rates[fromCountry] || !rates[toCountry]) {
      alert("Exchange rate not available for selected countries.");
      return;
    }
    const usdAmount = amount / rates[fromCountry];
    const result = (usdAmount * rates[toCountry]).toFixed(2);
    setConvertedAmount(result);
  };

  const resetConverter = () => {
    setFromCountry("INR");
    setToCountry("USD");
    setAmount(1);
    setConvertedAmount(null);
  };

  return (
    <div className="max-w-lg mx-auto mt-12 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-3xl shadow-xl border border-[#d4af37]/30 p-8 text-center text-[#f9f7e8] relative overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/10 via-transparent to-[#b8860b]/10 blur-2xl -z-10" />

      <h2 className="text-3xl font-bold text-[#d4af37] mb-6 font-['Playfair_Display']">
        🌍 Currency Converter
      </h2>

      <div className="grid grid-cols-2 gap-5 mb-6">
        {/* From Country */}
        <div className="text-left">
          <label className="block text-sm mb-1 text-[#f9f7e8]/70 font-medium">
            From Currency
          </label>
          <select
            value={fromCountry}
            onChange={(e) => setFromCountry(e.target.value)}
            className="w-full bg-[#1e293b]/70 border border-[#d4af37]/30 text-[#f9f7e8] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#d4af37]/60 outline-none"
          >
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name} ({c.code})
              </option>
            ))}
          </select>
        </div>

        {/* To Country */}
        <div className="text-left">
          <label className="block text-sm mb-1 text-[#f9f7e8]/70 font-medium">
            To Currency
          </label>
          <select
            value={toCountry}
            onChange={(e) => setToCountry(e.target.value)}
            className="w-full bg-[#1e293b]/70 border border-[#d4af37]/30 text-[#f9f7e8] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#d4af37]/60 outline-none"
          >
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name} ({c.code})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Amount Input */}
      <div className="mb-6 text-left">
        <label className="block text-sm mb-1 text-[#f9f7e8]/70 font-medium">
          Amount
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-[#1e293b]/70 border border-[#d4af37]/30 text-[#f9f7e8] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#d4af37]/60 outline-none"
          placeholder="Enter amount"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-5 mb-6">
        <button
          onClick={convertCurrency}
          className="bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] font-semibold px-6 py-2.5 rounded-lg shadow-md hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all duration-300 hover:scale-105"
        >
          Convert
        </button>

        <button
          onClick={resetConverter}
          className="flex items-center gap-2 bg-[#1e293b]/70 border border-[#d4af37]/30 text-[#f9f7e8] px-5 py-2.5 rounded-lg hover:bg-[#d4af37]/10 transition-all duration-300"
        >
          <FiRefreshCcw className="text-[#d4af37]" />
          Reset
        </button>
      </div>

      {/* Result Display */}
      {convertedAmount && (
        <div className="bg-[#0f172a]/60 border border-[#d4af37]/40 rounded-2xl py-4 px-6 shadow-inner">
          <p className="text-lg font-medium text-[#f9f7e8]/70 mb-1">
            Conversion Result:
          </p>
          <p className="text-2xl font-extrabold text-[#d4af37]">
            {amount} {fromCountry} = {convertedAmount} {toCountry}
          </p>
        </div>
      )}
    </div>
  );
}
