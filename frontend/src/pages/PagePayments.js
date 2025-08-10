// pages/PagePayments.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import axios from "axios";

const PagePayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5500/api/payments");
      setPayments(response.data);
    } catch (error) {
      console.error("Gagal memuat data pembayaran:", error);
      alert("Tidak dapat terhubung ke server. Cek konsol untuk detail.");
    } finally {
      setLoading(false);
    }
  };

  // Format status dengan warna
  const getStatusBadge = (status) => {
    let color;
    switch (status) {
      case "dibayar":
        color = "is-success";
        break;
      case "gagal":
        color = "is-danger";
        break;
      case "menunggu":
      default:
        color = "is-warning";
        break;
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
          <h1 className="title is-3 has-text-dark">💸 Manajemen Pembayaran</h1>
          <p className="subtitle is-6 has-text-grey">
            Pantau status pembayaran dari pelanggan
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="has-text-centered">
            <p className="is-size-5 has-text-grey">Memuat data pembayaran...</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="table is-fullwidth is-striped is-hoverable">
              <thead className="has-background-dark has-text-white">
                <tr>
                  <th>No</th>
                  <th>Order ID</th>
                  <th>Jumlah</th>
                  <th>Metode</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {payments.length > 0 ? (
                  payments.map((payment, index) => (
                    <tr key={payment.id}>
                      <td>{index + 1}</td>
                      <td>
                        <Link
                          to={`/order/${payment.orderId}`}
                          className="has-text-info"
                        >
                          📦 #{payment.orderId}
                        </Link>
                      </td>
                      <td>
                        <strong>
                          Rp {payment.amount?.toLocaleString("id-ID") || "0"}
                        </strong>
                      </td>
                      <td>
                        <span className="tag is-light">{payment.method}</span>
                      </td>
                      <td>{getStatusBadge(payment.status)}</td>
                      <td>
                        <div className="buttons are-small">
                          {/* Tombol Lihat Detail */}
                          <Link to={`/payment/${payment.id}`}>
                            <button className="button is-light">
                              👁️ Lihat
                            </button>
                          </Link>

                          {/* (Opsional) Tombol Edit jika ada fitur verifikasi */}
                          {/* 
                          <Link to={`/edit-payment/${payment.id}`}>
                            <button className="button is-info is-light">✏️ Ubah</button>
                          </Link> 
                          */}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="has-text-centered has-text-grey">
                      Belum ada pembayaran yang tercatat.
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

export default PagePayments;
