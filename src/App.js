import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const coinList = [
  { id: "bitcoin", name: "بیت‌کوین", icon: "/icons/bitcoin.png" },
  { id: "ethereum", name: "اتریوم", icon: "/icons/ethereum.png" },
  { id: "tether", name: "تتر", icon: "/icons/tether.png" },
  { id: "dogecoin", name: "دوج‌کوین", icon: "/icons/dogecoin.png" },
  { id: "tron", name: "ترون", icon: "/icons/tron.png" },
  { id: "solana", name: "سولانا", icon: "/icons/solana.png" },
  { id: "shiba-inu", name: "شیبا اینو", icon: "/icons/shiba.png" }
];

const TomanRate = 84500;

function App() {
  const [prices, setPrices] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const ids = coinList.map((coin) => coin.id).join(",");
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
        );
        const data = await res.json();
        setPrices(data);
      } catch (error) {
        console.error("خطا در دریافت قیمت‌ها:", error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 5000);
    return () => clearInterval(interval);
  }, []);

  const theme = {
    background: darkMode ? "#121212" : "#ffffff",
    color: darkMode ? "#f1f1f1" : "#222222",
    card: darkMode ? "#1e1e1e" : "#f9f9f9",
    border: darkMode ? "#333" : "#ccc"
  };

  return (
    <div
      style={{
        backgroundColor: theme.background,
        color: theme.color,
        minHeight: "100vh",
        padding: "30px",
        fontFamily: "Tahoma",
        direction: "rtl"
      }}
    >
      {/* دکمه حالت تاریک */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          padding: "8px 14px",
          borderRadius: "8px",
          cursor: "pointer",
          backgroundColor: darkMode ? "#f1f1f1" : "#333",
          color: darkMode ? "#333" : "#f1f1f1",
          border: "none"
        }}
      >
        {darkMode ? "☀️ روشن" : "🌙 تاریک"}
      </button>

      <h1 style={{ textAlign: "center" }}>💰 قیمت لحظه‌ای ارزهای دیجیتال</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {coinList.map((coin) => (
          <li
            key={coin.id}
            style={{
              margin: "20px auto",
              padding: "10px",
              border: `1px solid ${theme.border}`,
              borderRadius: "12px",
              width: "300px",
              backgroundColor: theme.card
            }}
          >
            <img
              src={coin.icon}
              alt={coin.name}
              style={{ width: 30, verticalAlign: "middle" }}
            />
            <span style={{ marginRight: "10px", fontWeight: "bold" }}>
              {coin.name}
            </span>
            <div style={{ marginTop: "5px", fontSize: "14px" }}>
              دلار: {prices[coin.id] ? `$${prices[coin.id].usd}` : "بارگذاری..."}
              <br />
              ریال:{" "}
              {prices[coin.id]
                ? `${(prices[coin.id].usd * TomanRate).toLocaleString()} تومان`
                : "بارگذاری..."}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
