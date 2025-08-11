// src/pages/DashboardDriver.js
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import axios from "axios";

const DashboardDriver = () => {
  const [driver, setDriver] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Ambil data driver
        const driverRes = await axios.get(
          "http://localhost:5500/driver/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Ambil pesanan yang sedang ditangani (misal: status "on_delivery")
        const ordersRes = await axios.get(
          "http://localhost:5500/driver/orders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setDriver(driverRes.data.data || driverRes.data);
        setOrders(ordersRes.data.data || []);
      } catch (error) {
        console.error("❌ Gagal memuat data driver:", error.message);
        setDriver(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="content" style={{ padding: "30px" }}>
          <p>🚚 Memuat data driver...</p>
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
          <h1 className="has-text-info">Dashboard Driver</h1>
          <p>Halo, kelola pengiriman Anda dari sini.</p>
        </div>

        {/* Info Driver */}
        {driver ? (
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
              👤 {driver.name}
            </h2>
            <p style={{ color: "#555", margin: "10px 0" }}>
              <strong>ID:</strong> {driver.customId || "Tidak tersedia"}
            </p>
            <p style={{ color: "#555" }}>
              <strong>Kendaraan:</strong> {driver.vehicleType} -{" "}
              {driver.vehicleNumber}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color: driver.status === "active" ? "green" : "orange",
                  fontWeight: "bold",
                }}
              >
                {driver.status === "active" ? "🟢 Aktif" : "🟠 Tidak Aktif"}
              </span>
            </p>
            {driver.photo && (
              <div style={{ marginTop: "15px" }}>
                <img
                  src={driver.photo.trim()}
                  alt="Foto Driver"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "2px solid #00d1b2",
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="notification is-warning">
            Gagal memuat data driver. Silakan coba lagi nanti.
          </div>
        )}

        {/* Statistik */}
        <div
          className="dashboard-stats"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div
            className="stat-card"
            style={{
              backgroundColor: "#e3f2fd",
              padding: "15px",
              borderRadius: "8px",
              textAlign: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <i
              className="fas fa-shopping-cart"
              style={{ fontSize: "1.8rem", color: "#00d1b2" }}
            ></i>
            <div style={{ marginTop: "10px" }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
                {orders.length}
              </h3>
              <p style={{ color: "#555", margin: 0 }}>Pesanan Saat Ini</p>
            </div>
          </div>

          <div
            className="stat-card"
            style={{
              backgroundColor: "#e8f5e8",
              padding: "15px",
              borderRadius: "8px",
              textAlign: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <i
              className="fas fa-check-circle"
              style={{ fontSize: "1.8rem", color: "#2ecc71" }}
            ></i>
            <div style={{ marginTop: "10px" }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: "bold" }}>0</h3>
              <p style={{ color: "#555", margin: 0 }}>Selesai Hari Ini</p>
            </div>
          </div>

          <div
            className="stat-card"
            style={{
              backgroundColor: "#fff3e0",
              padding: "15px",
              borderRadius: "8px",
              textAlign: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <i
              className="fas fa-wallet"
              style={{ fontSize: "1.8rem", color: "#ff9800" }}
            ></i>
            <div style={{ marginTop: "10px" }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: "bold" }}>Rp 0</h3>
              <p style={{ color: "#555", margin: 0 }}>Pendapatan Hari Ini</p>
            </div>
          </div>
        </div>

        {/* Daftar Pesanan Saat Ini */}
        {orders.length > 0 ? (
          <div className="table-container">
            <h3 style={{ marginBottom: "15px", color: "#333" }}>
              📦 Pesanan yang Sedang Diantar
            </h3>
            <table className="table is-fullwidth is-striped is-hoverable">
              <thead className="has-background-info has-text-white">
                <tr>
                  <th>No</th>
                  <th>ID Pesanan</th>
                  <th>Alamat Tujuan</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order.id}>
                    <td>{index + 1}</td>
                    <td>
                      <code>{order.customId}</code>
                    </td>
                    <td>{order.shippingAddress}</td>
                    <td>
                      <span className="tag is-info is-light">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="notification is-light">
            Tidak ada pesanan yang sedang ditangani saat ini.
          </div>
        )}

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
            💡 <strong>Tip:</strong> Perbarui status pengiriman melalui menu{" "}
            <strong>"Pesanan Saya"</strong> di sidebar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardDriver;
