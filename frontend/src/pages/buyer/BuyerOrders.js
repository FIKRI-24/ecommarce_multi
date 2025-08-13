// src/pages/buyer/Orders.js
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/style.css";

const BuyerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "http://localhost:5500/buyer/orders", // Sesuaikan jika path berbeda
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("❌ Gagal muat daftar pesanan:", err);
        if (err.response?.status === 401) {
          setError("Sesi habis. Silakan login ulang.");
          navigate("/login");
        } else {
          setError(
            err.response?.data?.message || "Gagal memuat pesanan. Coba lagi."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const handleDelete = async (orderId) => {
    if (!window.confirm("Yakin ingin membatalkan pesanan ini?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5500/buyer/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(orders.filter((order) => order.id !== orderId));
      alert("Pesanan berhasil dibatalkan.");
    } catch (err) {
      console.error("❌ Gagal hapus pesanan:", err);
      alert(
        err.response?.data?.message || "Gagal membatalkan pesanan. Coba lagi."
      );
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case "diterima":
        return "is-success";
      case "pending":
        return "is-info";
      case "dibatalkan":
        return "is-danger";
      case "dalam perjalanan":
        return "is-warning";
      default:
        return "is-light";
    }
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
          <h1 className="title is-3 has-text-dark">Pesanan Saya</h1>
          <p>Lihat dan kelola pesanan yang telah kamu buat.</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="notification is-danger">
            <button className="delete" onClick={() => setError("")}></button>
            {error}
          </div>
        )}

        {/* Daftar Pesanan */}
        {orders.length === 0 ? (
          <div className="has-text-centered py-6">
            <p className="has-text-grey">Kamu belum memiliki pesanan.</p>
          </div>
        ) : (
          <div className="box">
            <table className="table is-fullwidth is-striped is-hoverable">
              <thead>
                <tr>
                  <th>ID Pesanan</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Tanggal</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <strong>#{order.id}</strong>
                    </td>
                    <td>
                      <strong>
                        Rp {Number(order.totalAmount || 0).toLocaleString()}
                      </strong>
                    </td>
                    <td>
                      <span
                        className={`tag ${getStatusBadgeColor(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>
                      {new Date(order.createdAt).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td>
                      <div className="buttons are-small">
                        <button
                          className="button is-info"
                          onClick={() => navigate(`/orders/${order.id}`)}
                        >
                          <span className="icon is-small">
                            <i className="fas fa-eye"></i>
                          </span>
                          <span>Detail</span>
                        </button>
                        {order.status === "pending" && (
                          <button
                            className="button is-danger"
                            onClick={() => handleDelete(order.id)}
                          >
                            <span className="icon is-small">
                              <i className="fas fa-trash"></i>
                            </span>
                            <span>Batalkan</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerOrders;
