// src/pages/seller/MyProducts.js
import React, { useEffect, useState } from "react";
import "../../assets/css/style.css";
import Sidebar from "../../components/layout/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    productId: null,
    productName: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5500/seller/products",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("❌ Gagal muat produk:", err);
      setError(err.response?.data?.message || "Gagal memuat produk.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Buka modal konfirmasi hapus
  const openDeleteModal = (id, name) => {
    setDeleteModal({
      isOpen: true,
      productId: id,
      productName: name,
    });
  };

  // Tutup modal
  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      productId: null,
      productName: "",
    });
  };

  // Konfirmasi hapus
  const handleDelete = async () => {
    const { productId } = deleteModal;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5500/seller/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Hapus dari state
      setProducts(products.filter((p) => p.id !== productId));
      closeDeleteModal();
    } catch (err) {
      console.error("❌ Gagal hapus produk:", err);
      alert(
        err.response?.data?.message || "Gagal menghapus produk. Coba lagi."
      );
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="content" style={{ padding: "30px" }}>
          <p>⏳ Memuat daftar produk...</p>
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
          <h1 className="has-text-success">Produk Saya</h1>
          <p>Kelola semua produk yang dijual di toko Anda.</p>
        </div>

        {/* Tombol Tambah */}
        <div className="mb-4">
          <Link to="/seller/products/create" className="button is-primary">
            <i className="fas fa-plus"></i>&nbsp; Tambah Produk
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="notification is-danger">
            <button className="delete" onClick={() => setError("")}></button>
            {error}
          </div>
        )}

        {/* Daftar Produk */}
        {products.length === 0 ? (
          <div className="notification is-info">
            Belum ada produk. Klik tombol "Tambah Produk" untuk memulai.
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card box">
                <figure className="image mb-4" style={{ height: "180px" }}>
                  <img
                    src={product.image || "https://via.placeholder.com/300"}
                    alt={product.name}
                    style={{
                      objectFit: "cover",
                      borderRadius: "8px",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </figure>

                <h3 className="is-size-5 has-text-weight-bold">
                  {product.name}
                </h3>
                <p
                  className="is-size-6 has-text-grey"
                  style={{ minHeight: "40px" }}
                >
                  {product.description?.length > 100
                    ? product.description.slice(0, 100) + "..."
                    : product.description || "Tidak ada deskripsi"}
                </p>

                <div className="mt-3">
                  <strong className="has-text-success">
                    Rp {product.price?.toLocaleString()}
                  </strong>
                </div>

                <div className="mt-2">
                  <small>
                    Stok: <strong>{product.stock}</strong> | Status:{" "}
                    <span
                      style={{
                        color: product.status === "active" ? "green" : "red",
                      }}
                    >
                      {product.status === "active" ? "Aktif" : "Nonaktif"}
                    </span>
                  </small>
                </div>

                {/* Aksi */}
                <div
                  className="mt-4"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Link
                    to={`/seller/products/edit/${product.id}`}
                    className="button is-small is-info"
                  >
                    <i className="fas fa-edit"></i>&nbsp; Edit
                  </Link>
                  <button
                    className="button is-small is-danger"
                    onClick={() => openDeleteModal(product.id, product.name)}
                  >
                    <i className="fas fa-trash"></i>&nbsp; Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Konfirmasi Hapus */}
      {deleteModal.isOpen && (
        <div className="modal is-active">
          <div className="modal-background" onClick={closeDeleteModal}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title has-text-danger">
                Konfirmasi Hapus
              </p>
              <button
                className="delete"
                aria-label="close"
                onClick={closeDeleteModal}
              ></button>
            </header>
            <section className="modal-card-body">
              <p>Apakah Anda yakin ingin menghapus produk berikut?</p>
              <strong
                style={{
                  fontSize: "1.1rem",
                  display: "block",
                  margin: "10px 0",
                }}
              >
                "{deleteModal.productName}"
              </strong>
              <p>
                <strong>Peringatan:</strong> Tindakan ini tidak bisa dibatalkan.
              </p>
            </section>
            <footer
              className="modal-card-foot"
              style={{ justifyContent: "flex-end" }}
            >
              <button className="button" onClick={closeDeleteModal}>
                Batal
              </button>
              <button className="button is-danger" onClick={handleDelete}>
                Hapus
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProducts;
