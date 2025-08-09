// pages/PageAddProduct.js
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import axios from "axios";
import "bulma/css/bulma.min.css";

const PageAddProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: 0,
    storeId: location.search.includes("storeId=")
      ? new URLSearchParams(location.search).get("storeId")
      : "",
  });

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const res = await axios.get("http://localhost:5500/admin/stores");
      setStores(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (error) {
      console.error("Gagal muat toko:", error);
      alert("Gagal memuat daftar toko.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5500/admin/products", formData);
      alert("Produk berhasil ditambahkan!");
      navigate("/products");
    } catch (error) {
      console.error("Gagal tambah produk:", error);
      alert("Gagal menambahkan produk.");
    }
  };

  if (loading) return <div>Memuat toko...</div>;

  return (
    <div className="dashboard">
      <Sidebar />
      <div
        className="content"
        style={{ backgroundColor: "#f8f9fa", padding: "30px" }}
      >
        <a
          onClick={() => navigate(-1)}
          className="button is-small is-light"
          style={{ marginBottom: "10px" }}
        >
          ‹ Kembali
        </a>
        <h1 className="title is-3 has-text-dark">➕ Tambah Produk Baru</h1>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Nama Produk</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Deskripsi</label>
            <div className="control">
              <textarea
                className="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Deskripsi produk"
              ></textarea>
            </div>
          </div>

          <div className="field">
            <label className="label">Harga (Rp)</label>
            <div className="control">
              <input
                className="input"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Stok</label>
            <div className="control">
              <input
                className="input"
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Toko</label>
            <div className="control">
              <div className="select">
                <select
                  name="storeId"
                  value={formData.storeId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Pilih Toko</option>
                  {stores.map((store) => (
                    <option key={store.id} value={store.id}>
                      {store.name} ({store.Store?.status || store.status})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="buttons mt-5">
            <button type="submit" className="button is-success">
              💾 Simpan Produk
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="button is-light"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PageAddProduct;
