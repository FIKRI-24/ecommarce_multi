// src/pages/buyer/OrderDetail.js
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../assets/css/style.css";

const BuyerOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `http://localhost:5500/buyer/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrder(response.data);
      } catch (err) {
        console.error("❌ Gagal muat detail pesanan:", err);
        if (err.response?.status === 404) {
          setError("Pesanan tidak ditemukan.");
        } else if (err.response?.status === 401) {
          setError("Akses ditolak. Silakan login ulang.");
          navigate("/login");
        } else {
          setError(
            err.response?.data?.message || "Gagal memuat detail pesanan."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="content" style={{ padding: "30px" }}>
          <p>⏳ Memuat detail pesanan...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="content" style={{ padding: "30px" }}>
          <div className="notification is-danger">
            <button
              className="delete"
              onClick={() => navigate("/orders")}
            ></button>
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="content" style={{ padding: "30px" }}>
          <div className="notification is-warning">
            Pesanan tidak ditemukan.
          </div>
        </div>
      </div>
    );
  }

  const totalItems = order.items?.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="content">
        {/* Header */}
        <div className="content-header">
          <h1 className="title is-3 has-text-dark">
            Detail Pesanan # {order.id}
          </h1>
          <p>
            Status: <strong>{order.status}</strong>
          </p>
        </div>

        {/* Info Umum */}
        <div className="box">
          <div className="columns">
            <div className="column">
              <p>
                <strong>Tanggal:</strong>{" "}
                {new Date(order.createdAt).toLocaleString("id-ID")}
              </p>
              <p>
                <strong>Total Item:</strong> {totalItems}
              </p>
            </div>
            <div className="column">
              <p>
                <strong>Total Harga:</strong>{" "}
                <strong>Rp {Number(order.totalAmount).toLocaleString()}</strong>
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`tag ${getStatusBadgeColor(order.status)}`}>
                  {order.status}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Daftar Produk */}
        <div className="box">
          <h2 className="title is-5">Produk dalam Pesanan</h2>
          <table className="table is-fullwidth is-striped">
            <thead>
              <tr>
                <th>Produk</th>
                <th>Harga Satuan</th>
                <th>Jumlah</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items?.map((item) => (
                <tr key={item.id}>
                  <td>{item.Product?.name}</td>
                  <td>Rp {Number(item.price).toLocaleString()}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <strong>
                      Rp {(item.price * item.quantity).toLocaleString()}
                    </strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Aksi */}
        <div className="field is-grouped">
          <div className="control">
            <button
              className="button is-light"
              onClick={() => navigate("/orders")}
            >
              Kembali
            </button>
          </div>
          {order.status === "pending" && (
            <div className="control">
              <button
                className="button is-danger"
                onClick={() => {
                  if (window.confirm("Yakin batalkan pesanan?")) {
                    // Panggil delete order
                  }
                }}
              >
                Batalkan Pesanan
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function untuk warna status
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

export default BuyerOrderDetail;
