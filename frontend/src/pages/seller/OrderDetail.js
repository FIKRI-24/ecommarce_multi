// src/pages/seller/OrderDetail.js
import React, { useState, useEffect } from "react";
import "../../assets/css/style.css";
import Sidebar from "../../components/layout/Sidebar";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5500/seller/orders/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrder(response.data);
    } catch (err) {
      console.error("❌ Gagal muat detail pesanan:", err);
      setError(err.response?.data?.message || "Gagal memuat detail pesanan.");
    } finally {
      setLoading(false);
    }
  };

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
            {error} | <a onClick={() => navigate(-1)}>Kembali</a>
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

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="content">
        <div className="content-header">
          <h1>Detail Pesanan # {order.id}</h1>
          <p>Pantau dan kelola pesanan dari pelanggan.</p>
        </div>

        <div className="box">
          {/* Status */}
          <div className="mb-5">
            <label className="label">Status Pesanan</label>
            <div className="field">
              <div className="control">
                <div className="select">
                  <select
                    value={order.status}
                    // onChange={handleChangeStatus} // Akan kita tambahkan nanti
                    disabled // sementara disable, kita tambahkan fungsi setelah
                  >
                    <option value="pending">Menunggu Pembayaran</option>
                    <option value="processing">Diproses</option>
                    <option value="shipped">Dikirim</option>
                    <option value="delivered">Diterima</option>
                    <option value="cancelled">Dibatalkan</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Info Pembeli */}
          <div className="columns mb-5">
            <div className="column">
              <h3 className="title is-5">Pembeli</h3>
              <p>
                <strong>Nama:</strong> {order.userName}
              </p>
              <p>
                <strong>Email:</strong> {order.userEmail}
              </p>
            </div>

            <div className="column">
              <h3 className="title is-5">Alamat Pengiriman</h3>
              <p>{order.shippingAddress?.addressLine || "Tidak tersedia"}</p>
              <p>
                {order.shippingAddress?.city},{" "}
                {order.shippingAddress?.postalCode}
              </p>
              <p>
                <strong>Telepon:</strong> {order.shippingAddress?.phone || "-"}
              </p>
            </div>
          </div>

          {/* Daftar Produk */}
          <h3 className="title is-5">Produk dalam Pesanan</h3>
          <div className="table-container mb-5">
            <table className="table is-fullwidth is-striped">
              <thead>
                <tr>
                  <th>Gambar</th>
                  <th>Nama Produk</th>
                  <th>Harga</th>
                  <th>Jumlah</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={item.image || "https://via.placeholder.com/40"}
                        alt={item.productName}
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    </td>
                    <td>{item.productName}</td>
                    <td>Rp {item.price.toLocaleString()}</td>
                    <td>{item.quantity}</td>
                    <td>Rp {(item.price * item.quantity).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Ringkasan */}
          <div className="has-text-right">
            <p>
              <strong>Total Harga Produk:</strong> Rp{" "}
              {order.items
                .reduce((sum, i) => sum + i.price * i.quantity, 0)
                .toLocaleString()}
            </p>
            <p>
              <strong>Ongkos Kirim:</strong> Rp{" "}
              {order.shippingCost?.toLocaleString() || "0"}
            </p>
            <p
              className="is-size-4 has-text-weight-bold"
              style={{ color: "#276c8d" }}
            >
              Total: Rp {order.totalAmount.toLocaleString()}
            </p>
          </div>

          <div className="mt-5">
            <button className="button is-light" onClick={() => navigate(-1)}>
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
