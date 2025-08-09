// DashboardAdmin.js
import React, { useEffect, useState } from "react";
import "../assets/css/style.css";
import Sidebar from "../components/layout/Sidebar";
import axios from "axios";

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
        // Tetap lanjutkan meski error, tampilkan 0
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Pie Chart: Distribusi Pengguna
  const userChartData = {
    labels: ["Penjual", "Pembeli", "Driver"],
    datasets: [
      {
        label: "Jumlah",
        data: [stats.totalSeller, stats.totalBuyer, stats.totalDriver],
        backgroundColor: [
          "rgba(255, 193, 7, 0.6)", // Kuning: Penjual
          "rgba(0, 123, 255, 0.6)", // Biru: Pembeli
          "rgba(40, 167, 69, 0.6)", // Hijau: Driver
        ],
        borderColor: [
          "rgba(255, 193, 7, 1)",
          "rgba(0, 123, 255, 1)",
          "rgba(40, 167, 69, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Bar Chart: Ringkasan Entitas
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
        backgroundColor: "rgba(108, 117, 125, 0.6)",
        borderColor: "rgba(108, 117, 125, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed} item`,
        },
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
        {/* Header */}
        <div className="content-header">
          <h1 className="has-text-info">Dashboard Admin E-Commerce Delivery</h1>
          <p>
            Kelola produk, pesanan, pengguna, dan laporan penjualan dengan
            mudah.
          </p>
        </div>

        {/* Statistik Utama */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <i className="fas fa-box"></i>
            <div>
              <h3>{stats.totalProduct.toLocaleString()}</h3>
              <p>Total Produk</p>
            </div>
          </div>

          <div className="stat-card">
            <i className="fas fa-shopping-cart"></i>
            <div>
              <h3>{stats.totalOrder.toLocaleString()}</h3>
              <p>Total Pesanan</p>
            </div>
          </div>

          <div className="stat-card">
            <i className="fas fa-users"></i>
            <div>
              <h3>{stats.totalUser.toLocaleString()}</h3>
              <p>Total Pengguna</p>
            </div>
          </div>

          <div className="stat-card">
            <i className="fas fa-store"></i>
            <div>
              <h3>{stats.totalStore.toLocaleString()}</h3>
              <p>Total Toko</p>
            </div>
          </div>
        </div>

        {/* Grafik */}
        <div
          className="chart-container"
          style={{
            display: "flex",
            gap: "30px",
            flexWrap: "wrap",
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          {/* Pie Chart: Penjual, Pembeli, Driver */}
          <div style={{ flex: 1, minWidth: "300px" }}>
            <h3
              style={{
                textAlign: "center",
                marginBottom: "15px",
                color: "#363636",
              }}
            >
              🥧 Distribusi Pengguna
            </h3>
            <Pie data={userChartData} options={chartOptions} />
          </div>

          {/* Bar Chart: Produk, Toko, Pesanan, Pengguna */}
          <div style={{ flex: 1, minWidth: "300px" }}>
            <h3
              style={{
                textAlign: "center",
                marginBottom: "15px",
                color: "#363636",
              }}
            >
              📊 Ringkasan Sistem
            </h3>
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>

        {/* Info Tambahan (Opsional) */}
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "#f1f1f1",
            borderRadius: "8px",
            fontSize: "0.9rem",
            color: "#555",
          }}
        >
          <p>
            💡 <strong>Tip:</strong> Data diperbarui secara real-time dari
            database. Gunakan halaman ini untuk memantau kesehatan sistem secara
            cepat.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
