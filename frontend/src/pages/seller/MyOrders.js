// src/pages/seller/MyOrders.js
import React, { useState, useEffect } from "react";
import "../../assets/css/style.css";
import Sidebar from "../../components/layout/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newOrdersCount, setNewOrdersCount] = useState(0);
  const [lastCount, setLastCount] = useState(0);

  // Cek pesanan baru tiap 30 detik
  useEffect(() => {
    const interval = setInterval(() => {
      const currentCount = orders.length;
      if (currentCount > lastCount) {
        setNewOrdersCount(currentCount - lastCount);
        setTimeout(() => setNewOrdersCount(0), 3000); // hilang setelah 3 detik
      }
      setLastCount(currentCount);
    }, 30000); // 30 detik

    return () => clearInterval(interval);
  }, [orders.length, lastCount]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5500/seller/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(response.data)) {
        setOrders(response.data);
      } else {
        setOrders([]);
        setError("Data pesanan tidak valid.");
      }
    } catch (err) {
      console.error("❌ Gagal muat pesanan:", err);
      setError(
        err.response?.data?.message || "Gagal memuat daftar pesanan. Coba lagi."
      );
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };
  const handleStatusChange = async (orderId, newStatus) => {
    if (
      !window.confirm(
        `Yakin ubah status pesanan #${orderId} menjadi ${formatStatus(
          newStatus
        )}?`
      )
    )
      return;

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5500/seller/orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update state
      setOrders(
        orders.map((ord) =>
          ord.id === orderId ? { ...ord, status: newStatus } : ord
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || "Gagal update status.");
    }
  };

  // Helper: format status
  const formatStatus = (status) => {
    const map = {
      pending: "Menunggu",
      processing: "Diproses",
      shipped: "Dikirim",
      delivered: "Diterima",
      cancelled: "Dibatalkan",
    };
    return map[status] || status;
  };

  if (loading) {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="content" style={{ padding: "30px" }}>
          <p>⏳ Memuat daftar pesanan...</p>
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
          <h1 className="has-text-info">Pesanan Saya</h1>
          <p>Kelola dan pantau semua pesanan yang masuk ke toko Anda.</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="notification is-danger">
            <button className="delete" onClick={() => setError("")}></button>
            {error}
          </div>
        )}

        {newOrdersCount > 0 && (
          <div
            className="notification is-success is-light"
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              zIndex: 1000,
              maxWidth: "300px",
              animation: "fadeInUp 0.5s",
            }}
          >
            <strong>🎉 {newOrdersCount} pesanan baru!</strong>
            <br />
            <small>Periksa daftar pesanan Anda.</small>
          </div>
        )}
        {/* Daftar Pesanan */}
        {orders.length === 0 ? (
          <div className="notification is-info">Belum ada pesanan masuk.</div>
        ) : (
          <div className="order-list">
            {orders.map((order) => (
              <div key={order.id} className="box order-card">
                <div className="is-flex is-justify-content-space-between is-align-items-center mb-4">
                  <div>
                    <p className="is-size-6">
                      <strong>Pesanan #</strong>
                      {order.id}
                    </p>
                    <p className="is-size-7 has-text-grey">
                      {new Date(order.orderDate).toLocaleString("id-ID")}
                    </p>
                  </div>

                  <div
                    className="is-flex is-align-items-center"
                    style={{ gap: "10px" }}
                  >
                    <span
                      className={`tag ${
                        order.status === "pending"
                          ? "is-warning"
                          : order.status === "processing"
                          ? "is-info"
                          : order.status === "shipped"
                          ? "is-primary"
                          : order.status === "delivered"
                          ? "is-success"
                          : "is-danger"
                      }`}
                    >
                      {formatStatus(order.status)}
                    </span>

                    {/* Dropdown Update Status */}
                    <div className="select is-small">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                        style={{ minWidth: "130px" }}
                      >
                        <option value="pending">Menunggu</option>
                        <option value="processing">Diproses</option>
                        <option value="shipped">Dikirim</option>
                        <option value="delivered">Diterima</option>
                        <option value="cancelled">Dibatalkan</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Info Pembeli */}
                <div
                  className="mb-4 p-3"
                  style={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
                >
                  <p>
                    <strong> Pembeli:</strong> {order.userName}
                  </p>
                  <p>
                    <strong>Email:</strong> {order.userEmail}
                  </p>
                </div>

                {/* Daftar Produk */}
                <div className="order-items mb-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="is-flex mb-3"
                      style={{ gap: "12px", alignItems: "center" }}
                    >
                      <img
                        src={item.image || "https://via.placeholder.com/60"}
                        alt={item.productName}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <p className="is-size-6 has-text-weight-bold">
                          {item.productName}
                        </p>
                        <p className="is-size-7 has-text-grey">
                          {item.quantity} × Rp {item.price.toLocaleString()}
                        </p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p className="is-size-6 has-text-weight-bold">
                          Rp {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total & Aksi */}
                <div
                  className="is-flex is-justify-content-space-between is-align-items-center mt-4 pt-3"
                  style={{ borderTop: "1px solid #eee" }}
                >
                  <strong>
                    Total: Rp {order.totalAmount.toLocaleString()}
                  </strong>
                  <Link
                    to={`/seller/orders/${order.id}`}
                    className="button is-small is-info"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
