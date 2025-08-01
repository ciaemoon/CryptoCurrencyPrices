import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

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

const TomanRate = 845000; // اصلاح شد به 845,000

export default function App() {
  const [page, setPage] = useState("home");
  const [prices, setPrices] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const ids = coinList.map(c => c.id).join(",");
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
        );
        const data = await res.json();
        setPrices(data);
      } catch (error) {
        console.error("خطا در دریافت قیمت‌ها:", error);
      }
    }
    fetchPrices();
    const interval = setInterval(fetchPrices, 10000);
    return () => clearInterval(interval);
  }, []);

  // استایل‌های ساده برای حالت تاریک و روشن
  const theme = {
    background: darkMode ? "#121212" : "#f8f9fa",
    color: darkMode ? "#f1f1f1" : "#212529",
    cardBg: darkMode ? "#1e1e1e" : "#fff",
    borderColor: darkMode ? "#333" : "#dee2e6",
  };

  return (
    <div style={{ backgroundColor: theme.background, color: theme.color, minHeight: "100vh", direction: "rtl" }}>
      {/* Navbar */}
      <nav className={`navbar navbar-expand-lg ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-white"} shadow-sm`}>
        <div className="container-fluid">
          <button className="btn btn-primary me-auto" onClick={() => alert("Sign In کلیک شد")}>Sign In</button>
          <a className="navbar-brand mx-auto fw-bold" href="#">Necoin</a>
          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav mb-2 mb-lg-0">
              {["home", "prices", "news", "contact"].map((p) => {
                const labels = {
                  home: "صفحه اصلی",
                  prices: "قیمت ارزها",
                  news: "اخبار",
                  contact: "ارتباط با ما"
                };
                return (
                  <li className="nav-item" key={p}>
                    <button
                      className={`nav-link btn btn-link ${page === p ? "active fw-bold" : ""}`}
                      onClick={() => setPage(p)}
                      style={{ color: theme.color }}
                    >
                      {labels[p]}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* دکمه حالت تاریک */}
          <button
            className={`btn btn-sm ${darkMode ? "btn-light" : "btn-dark"}`}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "روشن" : "تاریک"}
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main className="container py-4">
        {page === "home" && (
          <div>
            <h2 className="mb-4">معرفی ارزهای دیجیتال</h2>
            <p>
              ارزهای دیجیتال نوعی دارایی دیجیتال هستند که با استفاده از رمزنگاری برای امنیت ساخته شده‌اند.
              این ارزها غیرمتمرکز بوده و بیشتر بر پایه فناوری بلاکچین فعالیت می‌کنند. بیت کوین اولین و شناخته‌شده‌ترین ارز دیجیتال است که در سال ۲۰۰۹ معرفی شد.
              پس از آن صدها ارز دیگر به وجود آمدند که هر کدام کاربردها و ویژگی‌های خاص خود را دارند.
              ارزهای دیجیتال به عنوان ابزارهای مالی جدید، در معاملات بین‌المللی، سرمایه‌گذاری، و توسعه فناوری نقش مهمی ایفا می‌کنند.
              با گسترش این بازار، اطلاع دقیق و به‌روز از قیمت‌ها و روندهای بازار برای سرمایه‌گذاران حیاتی است.
            </p>
            <p>
              در این سایت، می‌توانید قیمت لحظه‌ای ارزهای مختلف را مشاهده کنید، اخبار روز دنیای ارز دیجیتال را دنبال کنید و با تیم پشتیبانی ما در ارتباط باشید.
            </p>
          </div>
        )}

        {page === "prices" && (
          <div className="row justify-content-center">
            {coinList.map((coin) => (
              <div
                key={coin.id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <div
                  className="card p-3 h-100"
                  style={{ backgroundColor: theme.cardBg, borderColor: theme.borderColor, borderWidth: "1px", borderStyle: "solid" }}
                >
                  <div className="d-flex align-items-center mb-2">
                    <img
                      src={coin.icon}
                      alt={coin.name}
                      style={{ width: 30, height: 30, marginLeft: 10 }}
                    />
                    <h5 className="mb-0">{coin.name}</h5>
                  </div>
                  <p>
                    دلار: {prices[coin.id] ? `$${prices[coin.id].usd}` : "بارگذاری..."}
                    <br />
                    ریال: {prices[coin.id]
                      ? `${(prices[coin.id].usd * TomanRate).toLocaleString()} تومان`
                      : "بارگذاری..."}
                  </p>
                  {/* اینجا می‌تونیم دکمه چارت بذاریم (اگر بخوای) */}
                </div>
              </div>
            ))}
          </div>
        )}

        {page === "news" && (
          <div>
            <h2>اخبار و تحلیل‌های روز اینجا نمایش داده می‌شود.</h2>
            <p>به زودی ...</p>
          </div>
        )}

        {page === "contact" && (
          <div>
            <h2>ارتباط با ما</h2>
            <p>برای تماس با ما می‌توانید از ایمیل example@necoin.app استفاده کنید.</p>
          </div>
        )}
      </main>

      {/* خط باریک پایین */}
      <footer style={{ height: "3px", backgroundColor: darkMode ? "#555" : "#6c757d" }}></footer>
    </div>
  );
}
