// pages/PageStores.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import axios from "axios";
import "bulma/css/bulma.min.css";

const PageStores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal delete
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState(null);

  useEffect(() => {
    getStores();
  }, []);

  const getStores = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5500/admin/stores");

      // Pastikan formatnya array
      const storeData = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];

      // Langsung ambil nama pemilik dari field owner
      const enrichedStores = storeData.map((store) => ({
        ...store,
        ownerName: store.owner?.name || "Tidak Diketahui",
        productCount: Array.isArray(store.products)
          ? store.products.length
          : store.productCount ?? store.productsCount ?? 0,
      }));

      setStores(enrichedStores);
    } catch (error) {
      console.error("Gagal memuat data toko:", error);
      alert("Gagal memuat data toko. Cek konsol untuk detail.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedStoreId(id);
    setShowConfirmModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(
        `http://localhost:5500/admin/stores/${selectedStoreId}`
      );
      setShowConfirmModal(false);
      alert("Toko berhasil dihapus.");
      getStores(); // Refresh daftar
    } catch (error) {
      console.error("Gagal menghapus toko:", error);
      alert("Gagal menghapus toko. Cek konsol untuk detail.");
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
          <h1 className="title is-3 has-text-dark">🏪 Manajemen Toko</h1>
          <p className="subtitle is-6 has-text-grey">
            Kelola semua toko penjual: lihat pemilik, status, dan produknya
          </p>
        </div>

        {/* Tombol Tambah */}
        <div style={{ textAlign: "right", marginBottom: "20px" }}>
          <Link to="/add-stores">
            <button className="button is-link">➕ Tambah Toko</button>
          </Link>
        </div>

        {/* Tabel Toko */}
        {loading ? (
          <div className="has-text-centered">
            <p className="is-size-5 has-text-grey">Memuat data toko...</p>
          </div>
        ) : stores.length === 0 ? (
          <div className="notification is-info">
            Belum ada toko yang terdaftar.
          </div>
        ) : (
          <div className="table-container">
            <table className="table is-fullwidth is-striped is-hoverable">
              <thead className="has-background-dark has-text-white">
                <tr>
                  <th>No</th>
                  <th>Nama Toko</th>
                  <th>Status</th>
                  <th>Pemilik</th>
                  <th>Produk</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {stores.map((store, index) => (
                  <tr key={store.id}>
                    <td>{index + 1}</td>
                    <td>
                      <strong>{store.name}</strong>
                      <br />
                      <small className="has-text-grey">
                        {store.description || "-"}
                      </small>
                    </td>
                    <td>
                      <span
                        className={`tag ${
                          store.status === "approved"
                            ? "is-success"
                            : store.status === "pending"
                            ? "is-warning"
                            : "is-danger"
                        }`}
                      >
                        {store.status === "approved"
                          ? "Disetujui"
                          : store.status === "pending"
                          ? "Menunggu"
                          : "Ditolak"}
                      </span>
                    </td>
                    <td>
                      <strong>{store.ownerName}</strong>
                      <br />
                      <small className="has-text-grey">
                        {store.owner?.email}
                      </small>
                    </td>

                    <td>
                      {store.products && store.products.length > 0 ? (
                        <div>
                          <strong>{store.products.length} Produk</strong>
                          <ul
                            style={{
                              listStyle: "none",
                              padding: 0,
                              marginTop: "5px",
                            }}
                          >
                            {store.products.slice(0, 3).map((product) => (
                              <li key={product.id} className="has-text-grey">
                                • {product.name} (Rp{" "}
                                {product.price.toLocaleString()})
                              </li>
                            ))}
                            {store.products.length > 3 && (
                              <li className="has-text-grey">
                                • ... dan {store.products.length - 3} lainnya
                              </li>
                            )}
                          </ul>
                        </div>
                      ) : (
                        <span className="has-text-grey">Tidak ada produk</span>
                      )}
                    </td>
                    <td>
                      <div className="buttons are-small">
                        <Link to={`/stores/${store.id}`}>
                          <button className="button is-light">
                            👁️ Lihat Detail
                          </button>
                        </Link>
                        <Link to={`/edit-stores/${store.id}`}>
                          <button className="button is-info is-light">
                            ✏️ Edit
                          </button>
                        </Link>
                        <button
                          className="button is-danger is-light"
                          onClick={() => handleDeleteClick(store.id)}
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
                ❌ Apakah Anda yakin ingin menghapus toko ini?
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

export default PageStores;
