import React from "react";
import "../assets/css/style.css";
import Sidebar from "../components/layout/Sidebar";

const DashboardAdmin = () => {
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
              <h3>120 Produk</h3>
              <p>Total Produk</p>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-shopping-cart"></i>
            <div>
              <h3>80 Pesanan</h3>
              <p>Pesanan Bulan Ini</p>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-users"></i>
            <div>
              <h3>230 Pengguna</h3>
              <p>Pengguna Terdaftar</p>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-dollar-sign"></i>
            <div>
              <h3>Rp 25.000.000</h3>
              <p>Total Pendapatan</p>
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
