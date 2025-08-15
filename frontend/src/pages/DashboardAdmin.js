import React, { useEffect, useState } from "react";
import "../assets/css/style.css";
import Sidebar from "../components/layout/Sidebar";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";

// Chart.js
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const DashboardAdmin = () => {
  const { darkMode } = useTheme();
  const [stats, setStats] = useState({
    totalUser: 0,
    totalSeller: 0,
    totalBuyer: 0,
    totalDriver: 0,
    totalStore: 0,
    totalProduct: 0,
    totalOrder: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/admin/dashboard"
        );
        setStats(response.data);
      } catch (error) {
        console.error("❌ Gagal mengambil data dashboard:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Warna chart sesuai mode
  const isDark = darkMode;
  const textColor = isDark ? "#e0e0e0" : "#333";
  const gridColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
  const backgroundColors = isDark
    ? [
        "rgba(255, 193, 7, 0.5)",
        "rgba(0, 123, 255, 0.5)",
        "rgba(40, 167, 69, 0.5)",
      ]
    : [
        "rgba(255, 193, 7, 0.6)",
        "rgba(0, 123, 255, 0.6)",
        "rgba(40, 167, 69, 0.6)",
      ];

  const userChartData = {
    labels: ["Penjual", "Pembeli", "Driver"],
    datasets: [
      {
        label: "Jumlah",
        data: [stats.totalSeller, stats.totalBuyer, stats.totalDriver],
        backgroundColor: backgroundColors,
        borderColor: isDark ? "#fff" : "#333",
        borderWidth: 1,
      },
    ],
  };

  const barChartData = {
    labels: ["Produk", "Toko", "Pesanan", "Pengguna"],
    datasets: [
      {
        label: "Jumlah",
        data: [
          stats.totalProduct,
          stats.totalStore,
          stats.totalOrder,
          stats.totalUser,
        ],
        backgroundColor: isDark
          ? "rgba(108, 117, 125, 0.5)"
          : "rgba(108, 117, 125, 0.6)",
        borderColor: isDark ? "#ccc" : "#6c757d",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top", color: textColor },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed} item`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: textColor },
        grid: { color: gridColor },
      },
      y: {
        ticks: { color: textColor },
        grid: { color: gridColor },
      },
    },
  };

  if (loading) {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="content" style={{ padding: "30px" }}>
          <p>📊 Memuat data dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <div className="content-header">
          <h1 className={isDark ? "has-text-light" : "has-text-info"}>
            Dashboard Admin E-Commerce Delivery
          </h1>
          <p style={{ color: textColor }}>
            Kelola produk, pesanan, pengguna, dan laporan penjualan dengan
            mudah.
          </p>
        </div>

        <div className="dashboard-stats">
          {[
            { icon: "box", label: "Total Produk", value: stats.totalProduct },
            {
              icon: "shopping-cart",
              label: "Total Pesanan",
              value: stats.totalOrder,
            },
            { icon: "users", label: "Total Pengguna", value: stats.totalUser },
            { icon: "store", label: "Total Toko", value: stats.totalStore },
          ].map((stat, i) => (
            <div
              key={i}
              className="stat-card"
              style={{
                backgroundColor: isDark ? "#2d2d2d" : "#fff",
                color: textColor,
                border: isDark ? "1px solid #444" : "1px solid #eee",
              }}
            >
              <i className={`fas fa-${stat.icon}`}></i>
              <div>
                <h3>{stat.value.toLocaleString()}</h3>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="chart-container"
          style={{
            display: "flex",
            gap: "30px",
            flexWrap: "wrap",
            marginTop: "30px",
            padding: "20px",
            backgroundColor: isDark ? "#1e1e1e" : "white",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ flex: 1, minWidth: "300px" }}>
            <h3
              style={{
                textAlign: "center",
                marginBottom: "15px",
                color: textColor,
              }}
            >
              🥧 Distribusi Pengguna
            </h3>
            <Pie data={userChartData} options={chartOptions} />
          </div>

          <div style={{ flex: 1, minWidth: "300px" }}>
            <h3
              style={{
                textAlign: "center",
                marginBottom: "15px",
                color: textColor,
              }}
            >
              📊 Ringkasan Sistem
            </h3>
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
