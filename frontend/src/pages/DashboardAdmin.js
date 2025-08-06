import React, { useEffect, useState } from "react";
import "../assets/css/style.css";
import Sidebar from "../components/layout/Sidebar";
import axios from "axios";

const DashboardAdmin = () => {
  const [stats, setStats] = useState({
    totalUser: 0,
    totalSeller: 0,
    totalBuyer: 0,
    totalDriver: 0,
    totalStore: 0,
    totalProduct: 0,
    totalOrder: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/dashboard");
        setStats(response.data);
      } catch (error) {
        console.error("❌ Gagal mengambil data dashboard:", error.message);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="content">
        <div className="content-header">
          <h1 className="has-text-info">Dashboard Admin E-Commerce Delivery</h1>
          <p>
            Kelola produk, pesanan, pengguna, dan laporan penjualan dengan
            mudah.
          </p>
        </div>

        {/* Statistik Ringkas */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <i className="fas fa-box"></i>
            <div>
              <h3>{stats.totalProduct} Produk</h3>
              <p>Total Produk</p>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-shopping-cart"></i>
            <div>
              <h3>{stats.totalOrder} Pesanan</h3>
              <p>Total Pesanan</p>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-users"></i>
            <div>
              <h3>{stats.totalUser} Pengguna</h3>
              <p>Total Pengguna</p>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-store"></i>
            <div>
              <h3>{stats.totalStore} Toko</h3>
              <p>Total Toko</p>
            </div>
          </div>
        </div>

        {/* Area Lain (Bisa ditambahkan Chart, Order Terbaru, dsb) */}
        <div className="chart-container">
          <h2>Grafik Penjualan (Placeholder)</h2>
          <p>(Akan ditambahkan grafik penjualan di sini)</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
