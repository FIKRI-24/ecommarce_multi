import React, { useEffect, useState } from "react";
import "../../assets/css/style.css";
import Sidebar from "../../components/layout/Sidebar";
import axios from "axios";

const DashboardSeller = () => {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5500/seller/store", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStore(response.data);
      } catch (error) {
        console.error("❌ Gagal mengambil data toko:", error.message);
        setStore(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, []);

  if (loading) {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="content" style={{ padding: "30px" }}>
          <p>📦 Memuat data toko Anda...</p>
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
          <h1 className="has-text-warning">Dashboard Penjual</h1>
          <p>Halo, kelola toko dan produk Anda dari sini.</p>
        </div>

        {/* Info Toko */}
        {store ? (
          <div
            className="box"
            style={{
              backgroundColor: "#f8f9fa",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "30px",
            }}
          >
            <h2 style={{ fontSize: "1.5rem", color: "#333" }}>
              🏪 {store.name}
            </h2>
            <p style={{ color: "#555", margin: "10px 0" }}>
              {store.description}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color: store.status === "approved" ? "green" : "orange",
                }}
              >
                {store.status}
              </span>
            </p>
            {store.logo && (
              <div style={{ marginTop: "15px" }}>
                <img
                  src={store.logo.trim()}
                  alt="Logo Toko"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="notification is-warning">Gagal memuat data toko.</div>
        )}

        {/* Statistik (Belum Tersedia) */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <i className="fas fa-box"></i>
            <div>
              <h3>0</h3>
              <p>Produk Saya</p>
            </div>
          </div>

          <div className="stat-card">
            <i className="fas fa-shopping-cart"></i>
            <div>
              <h3>0</h3>
              <p>Total Pesanan</p>
            </div>
          </div>

          <div className="stat-card">
            <i className="fas fa-dollar-sign"></i>
            <div>
              <h3>Rp 0</h3>
              <p>Total Pendapatan</p>
            </div>
          </div>
        </div>

        {/* Info Tambahan */}
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
            💡 <strong>Tip:</strong> Gunakan menu di sidebar untuk menambah
            produk baru atau memproses pesanan Anda.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSeller;
