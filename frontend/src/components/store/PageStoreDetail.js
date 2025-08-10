// pages/PageStoreDetail.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import axios from "axios";
import "bulma/css/bulma.min.css";

const PageStoreDetail = () => {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStoreDetail = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5500/admin/stores/${id}`);
        console.log("Data dari API:", res.data); // 🔍 Cek di konsol browser
        setStore(res.data);
      } catch (error) {
        console.error("Gagal muat detail toko:", error);
        alert("Gagal memuat detail toko.");
      } finally {
        setLoading(false);
      }
    };
    fetchStoreDetail();
  }, [id]);

  const getStatusBadge = (status) => {
    const colors = {
      approved: "is-success",
      pending: "is-warning",
      rejected: "is-danger",
    };
    return (
      <span className={`tag ${colors[status] || "is-dark"}`}>{status}</span>
    );
  };

  if (loading) {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="content" style={{ padding: "30px" }}>
          <p>Memuat detail toko...</p>
        </div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="content" style={{ padding: "30px" }}>
          <div className="notification is-danger">Toko tidak ditemukan.</div>
          <Link to="/stores">
            <button className="button is-light">
              ‹ Kembali ke Daftar Toko
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <div
        className="content"
        style={{ backgroundColor: "#f8f9fa", padding: "30px" }}
      >
        {/* Header */}
        <Link
          to="/stores"
          className="button is-small is-light"
          style={{ marginBottom: "10px" }}
        >
          ‹ Kembali
        </Link>
        <h1 className="title is-3 has-text-dark">🏪 {store.name}</h1>
        <p className="subtitle is-6 has-text-grey">
          {store.description || "-"}
        </p>

        {/* Info Toko */}
        <div className="box">
          <h2 className="title is-5">Informasi Toko</h2>
          <table className="table is-fullwidth">
            <tbody>
              <tr>
                <td>
                  <strong>ID</strong>
                </td>
                <td>{store.id}</td>
              </tr>
              <tr>
                <td>
                  <strong>Status</strong>
                </td>
                <td>{getStatusBadge(store.status)}</td>
              </tr>
              <tr>
                <td>
                  <strong>Pemilik (User ID)</strong>
                </td>
                <td>{store.userId}</td>
              </tr>
              <tr>
                <td>
                  <strong>Dibuat pada</strong>
                </td>
                <td>{new Date(store.createdAt).toLocaleString("id-ID")}</td>
              </tr>
              <tr>
                <td>
                  <strong>Terakhir diubah</strong>
                </td>
                <td>{new Date(store.updatedAt).toLocaleString("id-ID")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Daftar Produk */}
        <div className="box">
          <div className="is-flex is-justify-content-space-between is-align-items-center mb-4">
            <h2 className="title is-5">📦 Produk di Toko Ini</h2>
            <Link
              to={`/add-product?storeId=${store.id}`}
              className="button is-link"
            >
              ➕ Tambah Produk
            </Link>
          </div>

          {store.products && store.products.length > 0 ? (
            <div className="table-container">
              <table className="table is-fullwidth is-striped">
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Harga</th>
                    <th>Stok</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {store.products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <strong>{product.name}</strong>
                        <br />
                        <small className="has-text-grey">
                          {product.description}
                        </small>
                      </td>
                      <td>Rp {product.price.toLocaleString()}</td>
                      <td>{product.stock}</td>
                      <td>
                        <div className="buttons are-small">
                          <Link to={`/edit-products/${product.id}`}>
                            <button className="button is-info">✏️ Edit</button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="has-text-grey">Toko ini belum memiliki produk.</p>
          )}
        </div>

        {/* Aksi */}
        <div className="buttons mt-5">
          <Link to={`/edit-store/${store.id}`} className="button is-warning">
            🛠️ Edit Toko
          </Link>
          <Link to="/stores" className="button is-light">
            Kembali
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageStoreDetail;
