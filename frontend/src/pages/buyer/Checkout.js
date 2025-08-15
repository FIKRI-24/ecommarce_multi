// src/pages/buyer/Checkout.js
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/style.css";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:5500/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const items = Array.isArray(response.data) ? response.data : [];
        setCartItems(items);
      } catch (err) {
        console.error("❌ Gagal muat keranjang:", err);
        if (err.response?.status === 401) {
          navigate("/login");
        } else {
          setError("Gagal memuat keranjang. Silakan coba lagi.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [navigate]);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCreateOrder = async () => {
    if (cartItems.length === 0) return;

    setSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const payload = {
        items: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        totalAmount,
      };

      const response = await axios.post(
        "http://localhost:5500/buyer/orders",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ Bersihkan keranjang (opsional)
      try {
        await axios.delete("http://localhost:5500/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.warn("Gagal hapus keranjang setelah order:", err);
      }

      // 🎉 Redirect ke halaman pesanan
      alert(response.data.message || "Pesanan berhasil dibuat!");
      navigate("/orders");
    } catch (err) {
      console.error("❌ Gagal buat pesanan:", err);
      setError(
        err.response?.data?.message || "Gagal membuat pesanan. Coba lagi."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="content" style={{ padding: "30px" }}>
          <p>⏳ Memuat keranjang...</p>
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
          <h1 className="title is-3 has-text-dark">Checkout</h1>
          <p>Review pesanan Anda sebelum dikonfirmasi.</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="notification is-danger">
            <button className="delete" onClick={() => setError("")}></button>
            {error}
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="box has-text-centered py-6">
            <p className="has-text-grey">Keranjang Anda kosong.</p>
            <button
              className="button is-primary mt-3"
              onClick={() => navigate("/products")}
            >
              <i className="fas fa-shopping-bag mr-2"></i>
              Belanja Sekarang
            </button>
          </div>
        ) : (
          <div className="box">
            <h2 className="title is-5">Ringkasan Pesanan</h2>

            <table className="table is-fullwidth is-striped">
              <thead>
                <tr>
                  <th>Produk</th>
                  <th>Harga</th>
                  <th>Jumlah</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.Product?.name || "Produk"}</td>
                    <td>Rp {item.price.toLocaleString()}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <strong>
                        Rp {(item.price * item.quantity).toLocaleString()}
                      </strong>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="has-text-right">
                    <strong>Total:</strong>
                  </td>
                  <td>
                    <strong className="has-text-success">
                      Rp {totalAmount.toLocaleString()}
                    </strong>
                  </td>
                </tr>
              </tfoot>
            </table>

            <div className="field is-grouped mt-5">
              <div className="control">
                <button
                  className={`button is-success ${
                    submitting ? "is-loading" : ""
                  }`}
                  disabled={submitting}
                  onClick={handleCreateOrder}
                >
                  <i className="fas fa-receipt mr-2"></i>
                  Buat Pesanan (Rp {totalAmount.toLocaleString()})
                </button>
              </div>
              <div className="control">
                <button
                  className="button is-light"
                  onClick={() => navigate("/cart")}
                  disabled={submitting}
                >
                  Kembali ke Keranjang
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
