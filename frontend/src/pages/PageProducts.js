// pages/PageProducts.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import axios from "axios";
import "bulma/css/bulma.min.css";

const PageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal hapus
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5500/admin/products");
      console.log("Data produk:", res.data); // 🔍 Cek di konsol browser
      setProducts(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (error) {
      console.error("Gagal muat produk:", error);
      alert("Gagal memuat daftar produk.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedProductId(id);
    setShowConfirmModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5500/products/${selectedProductId}`);
      setShowConfirmModal(false);
      alert("Produk berhasil dihapus.");
      fetchProducts();
    } catch (error) {
      console.error("Gagal hapus produk:", error);
      alert("Gagal menghapus produk.");
      setShowConfirmModal(false);
    }
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
          <h1 className="title is-3 has-text-dark">📦 Manajemen Produk</h1>
          <p className="subtitle is-6 has-text-grey">
            Kelola semua produk dari seluruh toko
          </p>
        </div>

        {/* Tombol Tambah */}
        <div style={{ textAlign: "right", marginBottom: "20px" }}>
          <Link to="/add-product">
            <button className="button is-link">➕ Tambah Produk</button>
          </Link>
        </div>

        {/* Tabel Produk */}
        {loading ? (
          <div className="has-text-centered">Memuat produk...</div>
        ) : products.length === 0 ? (
          <div className="notification is-info">Belum ada produk.</div>
        ) : (
          <div className="table-container">
            <table className="table is-fullwidth is-striped is-hoverable">
              <thead className="has-background-dark has-text-white">
                <tr>
                  <th>No</th>
                  <th>Nama Produk</th>
                  <th>Toko</th>
                  <th>Harga</th>
                  <th>Stok</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>
                      <strong>{product.name}</strong>
                      <br />
                      <small className="has-text-grey">
                        {product.description}
                      </small>
                    </td>
                    <td>{product.Store?.name || "Toko Tidak Diketahui"}</td>
                    <td>Rp {product.price.toLocaleString()}</td>
                    <td>
                      <span
                        className={`tag ${
                          product.stock > 10
                            ? "is-success"
                            : product.stock > 0
                            ? "is-warning"
                            : "is-danger"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td>
                      <div className="buttons are-small">
                        <Link to={`/edit-product/${product.id}`}>
                          <button className="button is-info is-light">
                            ✏️ Edit
                          </button>
                        </Link>
                        <button
                          className="button is-danger is-light"
                          onClick={() => handleDeleteClick(product.id)}
                        >
                          🗑️ Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Konfirmasi Hapus */}
      {showConfirmModal && (
        <div className="modal is-active">
          <div
            className="modal-background"
            onClick={() => setShowConfirmModal(false)}
          ></div>
          <div className="modal-content">
            <div className="box">
              <p
                className="has-text-centered"
                style={{ fontSize: "1.2rem", marginBottom: "20px" }}
              >
                ❌ Apakah Anda yakin ingin menghapus produk ini?
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="button"
                >
                  Batal
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="button is-danger"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={() => setShowConfirmModal(false)}
          ></button>
        </div>
      )}
    </div>
  );
};

export default PageProducts;
