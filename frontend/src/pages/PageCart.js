// src/components/CartPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/layout/Sidebar";

const API_URL = "http://localhost:5500"; // Tanpa trailing slash

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem("token");

  const apiCall = async (method, endpoint, data = null) => {
    try {
      const token = getToken();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      };

      const url = `${API_URL}${endpoint}`;
      const response = await axios({
        method,
        url,
        data,
        ...config,
      });

      return response;
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        alert("Sesi Anda habis. Silakan login kembali.");
        window.location.href = "/login";
      }
      throw err;
    }
  };

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await apiCall("get", "/cart");
      setCartItems(res.data.data || []);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Gagal memuat keranjang");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await apiCall("put", `/cart/${cartItemId}`, { quantity: newQuantity });
      fetchCart();
    } catch (err) {
      alert("Gagal update jumlah");
    }
  };

  const removeItem = async (cartItemId) => {
    try {
      await apiCall("delete", `/cart/${cartItemId}`);
      fetchCart();
    } catch (err) {
      alert("Gagal hapus item");
    }
  };

  const clearCart = async () => {
    if (!window.confirm("Yakin ingin kosongkan keranjang?")) return;

    try {
      await apiCall("delete", "/cart");
      fetchCart();
    } catch (err) {
      alert("Gagal kosongkan keranjang");
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Keranjang masih kosong");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="dashboard">
      {/* Sidebar Kiri */}
      <Sidebar />

      {/* Konten Utama */}
      <div
        className="content"
        style={{ backgroundColor: "#f8f9fa", padding: "30px" }}
      >
        {/* Header */}
        <div style={{ marginBottom: "30px" }}>
          <h1 className="title is-3 has-text-dark">🛒 Keranjang Belanja</h1>
          <p className="subtitle is-6 has-text-grey">
            Kelola produk yang ingin Anda beli sebelum checkout
          </p>
        </div>

        {/* Tombol Aksi */}
        <div style={{ marginBottom: "20px" }}>
          <button
            className="button is-warning is-light"
            onClick={clearCart}
            disabled={cartItems.length === 0}
          >
            🗑️ Kosongkan Keranjang
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div className="notification is-danger is-light">
            <strong>❌ Error:</strong> {error}
            <button className="delete" onClick={() => setError("")}></button>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="has-text-centered">
            <p className="is-size-5 has-text-grey">Memuat isi keranjang...</p>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="has-text-centered" style={{ padding: "40px 20px" }}>
            <p className="title is-4 has-text-grey">📭 Keranjang Anda kosong</p>
            <p className="subtitle is-6 has-text-grey">Ayo mulai belanja!</p>
            <button
              onClick={() => navigate("/dashboard")}
              className="button is-link is-medium"
              style={{ marginTop: "10px" }}
            >
              🔍 Lanjut Belanja
            </button>
          </div>
        ) : (
          <>
            {/* Tabel Keranjang */}
            <div className="table-container">
              <table className="table is-fullwidth is-striped is-hoverable">
                <thead className="has-background-dark has-text-white">
                  <tr>
                    <th>No</th>
                    <th>Produk</th>
                    <th>Harga Satuan</th>
                    <th>Jumlah</th>
                    <th>Total</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.product.name}</td>
                      <td>Rp {item.product.price.toLocaleString()}</td>
                      <td>
                        <div
                          className="field has-addons"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <p className="control">
                            <button
                              className="button is-small"
                              disabled={item.quantity <= 1}
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              −
                            </button>
                          </p>
                          <p className="control">
                            <input
                              className="input is-small"
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(
                                  item.id,
                                  parseInt(e.target.value) || 1
                                )
                              }
                              style={{ width: "60px", textAlign: "center" }}
                            />
                          </p>
                          <p className="control">
                            <button
                              className="button is-small"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </p>
                        </div>
                      </td>
                      <td>
                        <strong>
                          Rp{" "}
                          {(
                            item.product.price * item.quantity
                          ).toLocaleString()}
                        </strong>
                      </td>
                      <td>
                        <button
                          className="button is-danger is-light is-small"
                          onClick={() => removeItem(item.id)}
                        >
                          🗑️ Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Ringkasan Total & Checkout */}
            <div
              style={{
                marginTop: "30px",
                padding: "20px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "1.2rem",
                }}
              >
                <strong>Total Belanja:</strong>
                <span style={{ fontWeight: "bold", color: "#4a4a4a" }}>
                  Rp {total.toLocaleString()}
                </span>
              </div>
              <div style={{ textAlign: "right", marginTop: "15px" }}>
                <button
                  onClick={handleCheckout}
                  className="button is-success is-large"
                >
                  💳 Checkout Sekarang
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
