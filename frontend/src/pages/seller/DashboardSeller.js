import React, { useEffect, useState } from "react";
import "../../assets/css/style.css";
import Sidebar from "../../components/layout/Sidebar";
import { useTheme } from "../../context/ThemeContext";
import axios from "axios";

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

const DashboardSeller = () => {
  const { darkMode } = useTheme();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalViews: 0,
    monthlyRevenue: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch store data
        const storeResponse = await axios.get(
          "http://localhost:5500/seller/store",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStore(storeResponse.data);

        // TODO: Fetch stats when API is ready
        // const statsResponse = await axios.get("http://localhost:5500/seller/stats", {
        //   headers: { Authorization: `Bearer ${token}` },
        // });

        // Mock data for now
        const mockStats = {
          totalProducts: 15,
          totalOrders: 45,
          totalRevenue: 15750000,
          pendingOrders: 8,
          completedOrders: 37,
          totalViews: 1240,
          monthlyRevenue: [
            2100000, 2800000, 3200000, 2900000, 3800000, 4200000,
          ],
        };

        setStats(mockStats);
      } catch (error) {
        console.error("❌ Gagal mengambil data:", error.message);
        setStore(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const isDark = darkMode;
  const textColor = isDark ? "#e0e0e0" : "#333";
  const cardBg = isDark ? "#374151" : "#ffffff";

  // Chart data
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
    datasets: [
      {
        label: "Pendapatan (Rupiah)",
        data: stats.monthlyRevenue,
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const orderStatusData = {
    labels: ["Selesai", "Diproses"],
    datasets: [
      {
        data: [stats.completedOrders, stats.pendingOrders],
        backgroundColor: ["#10b981", "#f59e0b"],
        borderWidth: 2,
        borderColor: isDark ? "#fff" : "#333",
      },
    ],
  };

  const productPerformanceData = {
    labels: ["Terlaris", "Standar", "Kurang Laris"],
    datasets: [
      {
        label: "Kategori Produk",
        data: [40, 45, 15], // Percentage
        backgroundColor: [
          "rgba(16, 185, 129, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(239, 68, 68, 0.8)",
        ],
        borderWidth: 2,
        borderRadius: 8,
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
            if (context.dataset.label === "Pendapatan (Rupiah)") {
              return `Pendapatan: Rp ${value.toLocaleString("id-ID")}`;
            }
            return `${context.dataset.label}: ${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: textColor, font: { size: 11 } },
        grid: {
          color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      },
      y: {
        ticks: {
          color: textColor,
          font: { size: 11 },
          callback: function (value) {
            if (this.chart.data.datasets[0].label === "Pendapatan (Rupiah)") {
              return `Rp ${(value / 1000000).toFixed(0)}M`;
            }
            return value;
          },
        },
        grid: {
          color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
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
    trend,
  }) => (
    <div
      className="stat-card"
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
            <span style={{ fontSize: "22px" }}>{icon}</span>
          </div>

          {trend && (
            <div style={{ textAlign: "right" }}>
              <span
                style={{
                  fontSize: "12px",
                  color: trend > 0 ? "#10b981" : "#ef4444",
                  fontWeight: "600",
                  backgroundColor: (trend > 0 ? "#10b981" : "#ef4444") + "20",
                  padding: "4px 8px",
                  borderRadius: "12px",
                }}
              >
                {trend > 0 ? "+" : ""}
                {trend}%
              </span>
            </div>
          )}
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
          {value}
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

  if (loading) {
    return (
      <div className="dashboard">
        <Sidebar />
        <div
          className="content"
          style={{
            padding: "32px",
            backgroundColor: isDark ? "#111827" : "#f8fafc",
            minHeight: "100vh",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "60vh",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                border: "4px solid #e5e7eb",
                borderTop: "4px solid #10b981",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                marginBottom: "16px",
              }}
            ></div>
            <p style={{ color: textColor, fontSize: "16px" }}>
              📦 Memuat dashboard toko Anda...
            </p>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        </div>
      </div>
    );
  }

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
                🏪 Dashboard Penjual
              </h1>
              <p
                className="subtitle is-6 has-text-grey"
                style={{ fontSize: "16px", margin: "8px 0 0 0" }}
              >
                Kelola toko dan produk Anda dengan mudah dari sini.
              </p>
            </div>

            <div
              style={{
                padding: "12px 20px",
                backgroundColor: "#10b981",
                color: "#ffffff",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>💚</span>
              Status: Aktif
            </div>
          </div>
        </div>

        {/* Store Info Card */}
        {store ? (
          <div
            style={{
              background: isDark
                ? "linear-gradient(135deg, #1f2937 0%, #374151 100%)"
                : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              borderRadius: "20px",
              padding: "32px",
              marginBottom: "32px",
              border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
              boxShadow: isDark
                ? "0 10px 15px -3px rgba(0, 0, 0, 0.3)"
                : "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              {store.logo ? (
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <img
                    src={store.logo.trim()}
                    alt="Logo Toko"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "20px",
                    backgroundColor: "#10b981",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "40px",
                  }}
                >
                  🏪
                </div>
              )}

              <div style={{ flex: 1 }}>
                <h2
                  style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    color: textColor,
                    margin: "0 0 8px 0",
                  }}
                >
                  {store.name}
                </h2>

                <p
                  style={{
                    color: isDark ? "#9ca3af" : "#6b7280",
                    fontSize: "16px",
                    margin: "0 0 12px 0",
                    lineHeight: "1.5",
                  }}
                >
                  {store.description}
                </p>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <span style={{ fontSize: "14px", color: textColor }}>
                    Status:
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color:
                        store.status === "approved" ? "#10b981" : "#f59e0b",
                      backgroundColor:
                        (store.status === "approved" ? "#10b981" : "#f59e0b") +
                        "20",
                      padding: "4px 12px",
                      borderRadius: "12px",
                      textTransform: "capitalize",
                    }}
                  >
                    {store.status === "approved"
                      ? "✅ Disetujui"
                      : "⏳ Menunggu"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="notification is-warning"
            style={{
              borderRadius: "16px",
              marginBottom: "32px",
              padding: "20px",
            }}
          >
            ⚠️ Gagal memuat data toko. Silakan coba lagi nanti.
          </div>
        )}

        {/* Stats Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          <StatCard
            icon="📦"
            label="Total Produk"
            value={stats.totalProducts.toLocaleString("id-ID")}
            color="#8b5cf6"
            gradient="linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
            description="Produk aktif"
            trend={12}
          />
          <StatCard
            icon="🛒"
            label="Total Pesanan"
            value={stats.totalOrders.toLocaleString("id-ID")}
            color="#3b82f6"
            gradient="linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
            description="Pesanan masuk"
            trend={8}
          />
          <StatCard
            icon="💰"
            label="Total Pendapatan"
            value={`Rp ${(stats.totalRevenue / 1000000).toFixed(1)}M`}
            color="#10b981"
            gradient="linear-gradient(135deg, #10b981 0%, #059669 100%)"
            description="Pendapatan kotor"
            trend={15}
          />
          <StatCard
            icon="👀"
            label="Total Views"
            value={stats.totalViews.toLocaleString("id-ID")}
            color="#f59e0b"
            gradient="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
            description="Kunjungan toko"
            trend={-3}
          />
        </div>

        {/* Secondary Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          <StatCard
            icon="⏳"
            label="Pesanan Pending"
            value={stats.pendingOrders.toLocaleString("id-ID")}
            color="#f59e0b"
            description="Perlu diproses"
          />
          <StatCard
            icon="✅"
            label="Pesanan Selesai"
            value={stats.completedOrders.toLocaleString("id-ID")}
            color="#10b981"
            description="Berhasil diselesaikan"
          />
        </div>

        {/* Charts Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          {/* Revenue Chart */}
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
                gap: "8px",
              }}
            >
              📈 Tren Pendapatan Bulanan
            </h3>
            <div style={{ height: "300px" }}>
              <Line
                data={revenueData}
                options={{ ...chartOptions, maintainAspectRatio: false }}
              />
            </div>
          </div>

          {/* Order Status */}
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
              📋 Status Pesanan
            </h3>
            <div style={{ height: "300px", position: "relative" }}>
              <Pie
                data={orderStatusData}
                options={{ ...chartOptions, maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>

        {/* Product Performance */}
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
            🏆 Performa Produk
          </h3>
          <div style={{ height: "250px" }}>
            <Bar
              data={productPerformanceData}
              options={{ ...chartOptions, maintainAspectRatio: false }}
            />
          </div>
        </div>

        {/* Quick Actions & Tips */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
          }}
        >
          {/* Quick Actions */}
          <div
            style={{
              backgroundColor: cardBg,
              padding: "24px",
              borderRadius: "16px",
              border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
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
              ⚡ Aksi Cepat
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {[
                { label: "Tambah Produk Baru", icon: "➕", color: "#10b981" },
                { label: "Lihat Pesanan Masuk", icon: "📥", color: "#3b82f6" },
                { label: "Update Info Toko", icon: "✏️", color: "#f59e0b" },
                { label: "Lihat Laporan", icon: "📊", color: "#8b5cf6" },
              ].map((action, idx) => (
                <button
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 16px",
                    backgroundColor: "transparent",
                    border: `1px solid ${action.color}30`,
                    borderRadius: "8px",
                    color: textColor,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = action.color + "10";
                    e.currentTarget.style.borderColor = action.color + "50";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor = action.color + "30";
                  }}
                >
                  <span style={{ fontSize: "16px" }}>{action.icon}</span>
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div
            style={{
              backgroundColor: cardBg,
              padding: "24px",
              borderRadius: "16px",
              border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
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
              💡 Tips Sukses
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {[
                "Upload foto produk berkualitas tinggi",
                "Berikan deskripsi produk yang detail",
                "Proses pesanan dengan cepat",
                "Berikan pelayanan pelanggan terbaik",
              ].map((tip, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <span style={{ fontSize: "12px", marginTop: "2px" }}>✨</span>
                  <span
                    style={{
                      fontSize: "14px",
                      color: isDark ? "#d1d5db" : "#4b5563",
                      lineHeight: "1.5",
                    }}
                  >
                    {tip}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="has-text-centered mt-6"
          style={{
            color: isDark ? "#aaa" : "#666",
            padding: "20px",
            backgroundColor: cardBg,
            borderRadius: "12px",
            border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
          }}
        >
          <p style={{ margin: "0 0 8px 0", fontSize: "14px" }}>
            🏪 Dashboard Penjual - Kelola bisnis Anda dengan mudah
          </p>
          <p style={{ margin: "0", fontSize: "12px" }}>
            📅 Terakhir diperbarui: {new Date().toLocaleTimeString("id-ID")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSeller;
