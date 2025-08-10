// pages/PageOrders.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import axios from "axios";

const PageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5500/api/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Gagal memuat data order:", error);
      alert("Tidak dapat memuat data order. Cek koneksi atau konsol.");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk badge status dengan warna
  const getStatusBadge = (status) => {
    let color;
    switch (status) {
      case "dibayar":
        color = "is-warning";
        break;
      case "diproses":
        color = "is-info";
        break;
      case "siap dikirim":
        color = "is-primary";
        break;
      case "dalam perjalanan":
        color = "is-link";
        break;
      case "selesai":
        color = "is-success";
        break;
      default:
        color = "is-light";
    }
    return <span className={`tag ${color}`}>{status}</span>;
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div
        className="content"
        style={{ backgroundColor: "#f8f9fa", padding: "30px" }}
      >
        {/* Header */}
        <div style={{ marginBottom: "30px" }}>
          <h1 className="title is-3 has-text-dark">📦 Manajemen Order</h1>
          <p className="subtitle is-6 has-text-grey">
            Pantau status pesanan pelanggan dari seluruh toko
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="has-text-centered">
            <p className="is-size-5 has-text-grey">Memuat data order...</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="table is-fullwidth is-striped is-hoverable">
              <thead className="has-background-dark has-text-white">
                <tr>
                  <th>No</th>
                  <th>Order ID</th>
                  <th>Pembeli (User ID)</th>
                  <th>Toko (Store ID)</th>
                  <th>Total Harga</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order, index) => (
                    <tr key={order.id}>
                      <td>{index + 1}</td>
                      <td>
                        <strong>#{order.id}</strong>
                      </td>
                      <td>
                        <Link
                          to={`/user/${order.buyerId}`}
                          className="has-text-info"
                        >
                          User {order.buyerId}
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`/store/${order.storeId}`}
                          className="has-text-primary"
                        >
                          Toko {order.storeId}
                        </Link>
                      </td>
                      <td>
                        <strong>
                          Rp {order.totalAmount?.toLocaleString("id-ID") || "0"}
                        </strong>
                      </td>
                      <td>{getStatusBadge(order.status)}</td>
                      <td>
                        <div className="buttons are-small">
                          {/* Detail Order */}
                          <Link to={`/order/${order.id}`}>
                            <button className="button is-light">
                              👁️ Lihat
                            </button>
                          </Link>

                          {/* (Opsional) Edit Status – jika ada fitur update */}
                          {/* 
                          <Link to={`/edit-order/${order.id}`}>
                            <button className="button is-info is-light">✏️ Ubah</button>
                          </Link> 
                          */}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="has-text-centered has-text-grey">
                      Belum ada order yang tercatat.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageOrders;
