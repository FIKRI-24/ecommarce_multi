import React, { useEffect, useState } from "react";
import "../assets/css/style.css";
import Sidebar from "../components/layout/Sidebar";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";

// Chart.js
import { Pie, Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement
);

const DashboardAdmin = () => {
  const { darkMode } = useTheme();
  const [stats, setStats] = useState({
    totalUser: 24,
    totalSeller: 0,
    totalBuyer: 0,
    totalDriver: 7,
    totalStore: 7,
    totalProduct: 7,
    totalOrder: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");

  const timeOptions = [
    { value: "all", label: "Semua Waktu" },
    { value: "today", label: "Hari Ini" },
    { value: "week", label: "Minggu Ini" },
    { value: "month", label: "Bulan Ini" },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError("");

        // Uncomment when API is ready
        const res = await axios.get("http://localhost:5500/admin/dashboard", {
          params: { filter: timeFilter },
        });

        setStats({
          totalUser: Number(res.data.totalUser) || 0,
          totalSeller: Number(res.data.totalSeller) || 0,
          totalBuyer: Number(res.data.totalBuyer) || 0,
          totalDriver: Number(res.data.totalDriver) || 0,
          totalStore: Number(res.data.totalStore) || 0,
          totalProduct: Number(res.data.totalProduct) || 0,
          totalOrder: Number(res.data.totalOrder) || 0,
        });

        // Temporary: Using provided backend data
        // const backendData = {
        //   totalUser: 24,
        //   totalSeller: 0,
        //   totalBuyer: 0,
        //   totalDriver: 7,
        //   totalStore: 7,
        //   totalProduct: 7,
        //   totalOrder: 1,
        // };

        // Simulate API delay
        // await new Promise((resolve) => setTimeout(resolve, 800));

        // setStats({
        //   totalUser: Number(backendData.totalUser) || 0,
        //   totalSeller: Number(backendData.totalSeller) || 0,
        //   totalBuyer: Number(backendData.totalBuyer) || 0,
        //   totalDriver: Number(backendData.totalDriver) || 0,
        //   totalStore: Number(backendData.totalStore) || 0,
        //   totalProduct: Number(backendData.totalProduct) || 0,
        //   totalOrder: Number(backendData.totalOrder) || 0,
        // });
      } catch (err) {
        console.error("❌ Gagal mengambil data dashboard:", err);
        setError(err.response?.data?.message || "Gagal terhubung ke server.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [timeFilter]);

  // ✅ Fix: Jika data kosong → tampilkan 0
  const safeValue = (val) => (val === null || val === undefined ? 0 : val);

  // Warna chart
  const isDark = darkMode;
  const textColor = isDark ? "#e0e0e0" : "#333";
  const gridColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
  const cardBg = isDark ? "#374151" : "#ffffff";

  // ✅ User Distribution Chart - Updated with real data
  const userChartData = {
    labels: ["Penjual", "Pembeli", "Driver"],
    datasets: [
      {
        label: "Jumlah Pengguna",
        data: [
          safeValue(stats.totalSeller),
          safeValue(stats.totalBuyer),
          safeValue(stats.totalDriver),
        ],
        backgroundColor: [
          "rgba(255, 193, 7, 0.8)", // Orange - Penjual
          "rgba(0, 123, 255, 0.8)", // Blue - Pembeli
          "rgba(40, 167, 69, 0.8)", // Green - Driver
        ],
        borderColor: isDark ? "#fff" : "#333",
        borderWidth: 2,
      },
    ],
  };

  // ✅ System Overview Chart - Updated with real data
  const systemChartData = {
    labels: ["Produk", "Toko", "Pesanan", "Pengguna"],
    datasets: [
      {
        label: "Jumlah",
        data: [
          safeValue(stats.totalProduct),
          safeValue(stats.totalStore),
          safeValue(stats.totalOrder),
          safeValue(stats.totalUser),
        ],
        backgroundColor: [
          "rgba(139, 92, 246, 0.8)", // Purple - Produk
          "rgba(245, 158, 11, 0.8)", // Amber - Toko
          "rgba(59, 130, 246, 0.8)", // Blue - Pesanan
          "rgba(16, 185, 129, 0.8)", // Emerald - Pengguna
        ],
        borderColor: isDark ? "#fff" : "#333",
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  // Mock growth data for trend visualization
  const growthData = {
    labels: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"],
    datasets: [
      {
        label: "Pengguna Baru",
        data: [5, 8, 6, 5], // Based on current 24 total users
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Pesanan",
        data: [0, 0, 1, 0], // Based on current 1 total order
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: textColor,
          font: { size: 12 },
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed.y || context.parsed;
            return `${context.dataset.label}: ${value.toLocaleString()} item`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: textColor, font: { size: 11 } },
        grid: { color: gridColor },
      },
      y: {
        ticks: { color: textColor, font: { size: 11 } },
        grid: { color: gridColor },
      },
    },
  };

  // Enhanced Stat Card Component
  const StatCard = ({
    icon,
    label,
    value,
    color = "#3b82f6",
    gradient,
    description,
  }) => (
    <div
      className={`stat-card`}
      style={{
        background: gradient || cardBg,
        borderRadius: "16px",
        padding: "24px",
        boxShadow: isDark
          ? "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)"
          : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        border: isDark ? "1px solid #4b5563" : "1px solid #e5e7eb",
        transition: "all 0.3s ease",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px) scale(1.02)";
        e.currentTarget.style.boxShadow = isDark
          ? "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)"
          : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = isDark
          ? "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)"
          : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
      }}
    >
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "12px",
              backgroundColor: color + "20",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 4px 8px ${color}30`,
            }}
          >
            <i
              className={`fas fa-${icon}`}
              style={{ color, fontSize: "22px" }}
            ></i>
          </div>
        </div>

        <h3
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: gradient ? "#ffffff" : textColor,
            margin: "0 0 4px 0",
            lineHeight: "1.2",
          }}
        >
          {typeof value === "number" ? value.toLocaleString("id-ID") : value}
        </h3>

        <p
          style={{
            fontSize: "16px",
            color: gradient ? "rgba(255, 255, 255, 0.9)" : "#6b7280",
            margin: "0 0 4px 0",
            fontWeight: "500",
          }}
        >
          {label}
        </p>

        {description && (
          <p
            style={{
              fontSize: "12px",
              color: gradient ? "rgba(255, 255, 255, 0.7)" : "#9ca3af",
              margin: "0",
              fontStyle: "italic",
            }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Decorative background element */}
      <div
        style={{
          position: "absolute",
          top: "-20px",
          right: "-20px",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          backgroundColor: gradient ? "rgba(255, 255, 255, 0.1)" : color + "10",
          zIndex: 0,
        }}
      />
    </div>
  );

  return (
    <div className="dashboard">
      <Sidebar />

      <div
        className="content"
        style={{
          padding: "32px",
          minHeight: "100vh",
          backgroundColor: isDark ? "#111827" : "#f8fafc",
        }}
      >
        {/* Header */}
        <div className="mb-6">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <div>
              <h1
                className={isDark ? "has-text-light" : "has-text-primary"}
                style={{
                  fontSize: "36px",
                  fontWeight: "800",
                  margin: "0",
                  letterSpacing: "-0.02em",
                }}
              >
                📊 Dashboard Admin
              </h1>
              <p
                className="subtitle is-6 has-text-grey"
                style={{ fontSize: "16px", margin: "8px 0 0 0" }}
              >
                Kelola sistem secara real-time: pengguna, toko, produk, pesanan,
                dan laporan.
              </p>
            </div>

            {/* Time Filter */}
            <div className="field has-addons">
              <p className="control">
                <span className="select">
                  <select
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value)}
                    style={{
                      background: isDark ? "#374151" : "#fff",
                      color: textColor,
                      border: isDark
                        ? "1px solid #4b5563"
                        : "1px solid #d1d5db",
                      borderRadius: "8px",
                      padding: "8px 12px",
                      fontSize: "14px",
                    }}
                  >
                    {timeOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </span>
              </p>
              <p className="control">
                <button
                  className="button is-small"
                  onClick={() => setTimeFilter("all")}
                  style={{
                    background: "#3b82f6",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  Reset
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="notification is-danger is-light mb-5">
            <button className="delete" onClick={() => setError("")}></button>
            <strong>⚠️ Kesalahan:</strong> {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="has-text-centered my-6">
            <div
              style={{
                width: "48px",
                height: "48px",
                border: "4px solid #e5e7eb",
                borderTop: "4px solid #3b82f6",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 16px auto",
              }}
            ></div>
            <p className="is-size-5 has-text-grey">Memuat data dashboard...</p>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Enhanced Stat Cards */}
            <div className="columns is-multiline is-variable is-4 mb-6">
              <div className="column is-3-desktop is-6-tablet">
                <StatCard
                  icon="users"
                  label="Total Pengguna"
                  value={safeValue(stats.totalUser)}
                  color="#10b981"
                  gradient="linear-gradient(135deg, #10b981 0%, #059669 100%)"
                  description="Pengguna terdaftar"
                />
              </div>
              <div className="column is-3-desktop is-6-tablet">
                <StatCard
                  icon="shopping-cart"
                  label="Total Pesanan"
                  value={safeValue(stats.totalOrder)}
                  color="#3b82f6"
                  gradient="linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
                  description="Pesanan masuk"
                />
              </div>
              <div className="column is-3-desktop is-6-tablet">
                <StatCard
                  icon="store"
                  label="Total Toko"
                  value={safeValue(stats.totalStore)}
                  color="#f59e0b"
                  gradient="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                  description="Toko terdaftar"
                />
              </div>
              <div className="column is-3-desktop is-6-tablet">
                <StatCard
                  icon="box"
                  label="Total Produk"
                  value={safeValue(stats.totalProduct)}
                  color="#8b5cf6"
                  gradient="linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
                  description="Produk tersedia"
                />
              </div>
            </div>

            {/* Secondary Stats */}
            <div className="columns is-multiline is-variable is-3 mb-6">
              <div className="column is-4-desktop is-6-tablet">
                <StatCard
                  icon="user-tie"
                  label="Penjual Aktif"
                  value={safeValue(stats.totalSeller)}
                  color="#ef4444"
                  description={
                    stats.totalSeller === 0
                      ? "Belum ada penjual"
                      : "Penjual terdaftar"
                  }
                />
              </div>
              <div className="column is-4-desktop is-6-tablet">
                <StatCard
                  icon="user-friends"
                  label="Pembeli Aktif"
                  value={safeValue(stats.totalBuyer)}
                  color="#06b6d4"
                  description={
                    stats.totalBuyer === 0
                      ? "Belum ada pembeli"
                      : "Pembeli aktif"
                  }
                />
              </div>
              <div className="column is-4-desktop is-6-tablet">
                <StatCard
                  icon="motorcycle"
                  label="Driver Aktif"
                  value={safeValue(stats.totalDriver)}
                  color="#84cc16"
                  description="Driver siap"
                />
              </div>
            </div>

            {/* Charts Section */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px",
                marginBottom: "32px",
              }}
            >
              {/* User Distribution */}
              <div
                style={{
                  backgroundColor: cardBg,
                  padding: "24px",
                  borderRadius: "16px",
                  border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
                  boxShadow: isDark
                    ? "0 4px 6px -1px rgba(0, 0, 0, 0.3)"
                    : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: textColor,
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  👥 Distribusi Pengguna
                </h3>
                <div style={{ height: "300px", position: "relative" }}>
                  {stats.totalSeller === 0 &&
                  stats.totalBuyer === 0 &&
                  stats.totalDriver > 0 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        color: textColor,
                      }}
                    >
                      <i
                        className="fas fa-motorcycle"
                        style={{
                          fontSize: "48px",
                          color: "#84cc16",
                          marginBottom: "16px",
                        }}
                      ></i>
                      <p style={{ fontSize: "16px", fontWeight: "600" }}>
                        Hanya Driver yang Aktif
                      </p>
                      <p style={{ fontSize: "14px", color: "#6b7280" }}>
                        {stats.totalDriver} driver terdaftar
                      </p>
                    </div>
                  ) : (
                    <Pie
                      data={userChartData}
                      options={{ ...chartOptions, maintainAspectRatio: false }}
                    />
                  )}
                </div>
              </div>

              {/* System Overview */}
              <div
                style={{
                  backgroundColor: cardBg,
                  padding: "24px",
                  borderRadius: "16px",
                  border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
                  boxShadow: isDark
                    ? "0 4px 6px -1px rgba(0, 0, 0, 0.3)"
                    : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: textColor,
                    marginBottom: "20px",
                  }}
                >
                  📊 Ringkasan Sistem
                </h3>
                <div style={{ height: "300px" }}>
                  <Bar
                    data={systemChartData}
                    options={{ ...chartOptions, maintainAspectRatio: false }}
                  />
                </div>
              </div>
            </div>

            {/* Growth Trend Chart */}
            <div
              style={{
                backgroundColor: cardBg,
                padding: "24px",
                borderRadius: "16px",
                border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
                boxShadow: isDark
                  ? "0 4px 6px -1px rgba(0, 0, 0, 0.3)"
                  : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                marginBottom: "32px",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: textColor,
                  marginBottom: "20px",
                }}
              >
                📈 Tren Pertumbuhan (Estimasi Mingguan)
              </h3>
              <div style={{ height: "250px" }}>
                <Line
                  data={growthData}
                  options={{ ...chartOptions, maintainAspectRatio: false }}
                />
              </div>
            </div>

            {/* Footer Info */}
            <div
              className="has-text-centered mt-6 is-size-7"
              style={{
                color: isDark ? "#aaa" : "#666",
                padding: "20px",
                backgroundColor: cardBg,
                borderRadius: "12px",
                border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
              }}
            >
              <p style={{ margin: "0 0 8px 0", fontSize: "14px" }}>
                📊 Data diperbarui secara real-time
              </p>
              <p style={{ margin: "0", fontSize: "12px" }}>
                📅 Filter:{" "}
                {timeOptions.find((o) => o.value === timeFilter)?.label} | 🔄
                Terakhir diperbarui: {new Date().toLocaleTimeString("id-ID")}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardAdmin;
