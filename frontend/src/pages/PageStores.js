// pages/PageStores.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import axios from "axios";
import "bulma/css/bulma.min.css";

const PageStores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStores();
  }, []);

  const getStores = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8082/api/stores");
      setStores(res.data);
    } catch (error) {
      console.error("Error fetching stores:", error);
      alert("Gagal memuat data toko.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus toko ini?")) return;
    try {
      await axios.delete(`http://localhost:8082/api/stores/${id}`);
      alert("Toko dihapus");
      getStores();
    } catch (error) {
      alert("Gagal menghapus toko.");
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div
        className="content"
        style={{ padding: "30px", backgroundColor: "#f8f9fa" }}
      >
        <div style={{ marginBottom: "30px" }}>
          <h1 className="title is-3 has-text-dark">🏪 Manajemen Toko</h1>
          <p className="subtitle is-6 has-text-grey">
            Kelola toko penjual Anda
          </p>
        </div>

        <div style={{ textAlign: "right", marginBottom: "20px" }}>
          <Link to="/add-store">
            <button className="button is-link">➕ Tambah Toko</button>
          </Link>
        </div>

        {loading ? (
          <div className="has-text-centered">Memuat...</div>
        ) : (
          <div className="table-container">
            <table className="table is-fullwidth is-striped is-hoverable">
              <thead className="has-background-dark has-text-white">
                <tr>
                  <th>No</th>
                  <th>Nama Toko</th>
                  <th>Status</th>
                  <th>Pemilik (User ID)</th>
                  <th>Produk</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {stores.length > 0 ? (
                  stores.map((store, index) => (
                    <tr key={store.id}>
                      <td>{index + 1}</td>
                      <td>{store.name}</td>
                      <td>
                        <span
                          className={`tag ${
                            store.status === "approved"
                              ? "is-success"
                              : "is-danger"
                          }`}
                        >
                          {store.status}
                        </span>
                      </td>
                      <td>{store.userId}</td>
                      <td>{store.Products?.length || 0}</td>
                      <td>
                        <div className="buttons are-small">
                          <Link to={`/store/${store.id}`}>
                            <button className="button is-light">
                              👁️ Lihat
                            </button>
                          </Link>
                          <Link to={`/edit-store/${store.id}`}>
                            <button className="button is-info is-light">
                              ✏️ Edit
                            </button>
                          </Link>
                          <button
                            className="button is-danger is-light"
                            onClick={() => handleDelete(store.id)}
                          >
                            🗑️ Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="has-text-centered has-text-grey">
                      Belum ada toko.
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

export default PageStores;
