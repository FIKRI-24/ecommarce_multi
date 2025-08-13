// src/pages/seller/CreateProduct.js
import React, { useState } from "react";
import "../../assets/css/style.css";
import Sidebar from "../../components/layout/Sidebar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "", // URL gambar
    status: "active",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Hapus error saat user mulai ketik
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Nama produk wajib diisi";
    if (!formData.description.trim())
      newErrors.description = "Deskripsi wajib diisi";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Harga harus lebih dari 0";
    if (!formData.stock || formData.stock < 0)
      newErrors.stock = "Stok tidak boleh negatif";
    if (!formData.image.trim()) newErrors.image = "Gambar (URL) wajib diisi";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setSuccess("");

    if (!validate()) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      };

      const response = await axios.post(
        "http://localhost:5500/seller/products",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(response.data.message || "Produk berhasil ditambahkan!");
      setTimeout(() => {
        navigate("/seller/my-products");
      }, 1500);
    } catch (err) {
      console.error("❌ Gagal tambah produk:", err);
      setApiError(
        err.response?.data?.message || "Gagal menambahkan produk. Coba lagi."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="content">
        {/* Header */}
        <div className="content-header">
          <h1 className="has-text-primary">Tambah Produk Baru</h1>
          <p>Isi informasi produk yang akan dijual di toko Anda.</p>
        </div>

        {/* Notifikasi */}
        {apiError && (
          <div className="notification is-danger">
            <button className="delete" onClick={() => setApiError("")}></button>
            {apiError}
          </div>
        )}

        {success && <div className="notification is-success">{success} 🎉</div>}

        {/* Form */}
        <div className="box">
          <form onSubmit={handleSubmit}>
            {/* Nama Produk */}
            <div className="field">
              <label className="label">Nama Produk</label>
              <div className="control">
                <input
                  type="text"
                  className={`input ${errors.name ? "is-danger" : ""}`}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Contoh: Buku Filsafat Yunani"
                />
              </div>
              {errors.name && <p className="help is-danger">{errors.name}</p>}
            </div>

            {/* Deskripsi */}
            <div className="field">
              <label className="label">Deskripsi</label>
              <div className="control">
                <textarea
                  className={`textarea ${
                    errors.description ? "is-danger" : ""
                  }`}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Jelaskan produk Anda..."
                  rows="4"
                ></textarea>
              </div>
              {errors.description && (
                <p className="help is-danger">{errors.description}</p>
              )}
            </div>

            {/* Harga */}
            <div className="field">
              <label className="label">Harga (Rp)</label>
              <div className="control">
                <input
                  type="number"
                  className={`input ${errors.price ? "is-danger" : ""}`}
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="80000"
                  min="0"
                />
              </div>
              {errors.price && <p className="help is-danger">{errors.price}</p>}
            </div>

            {/* Stok */}
            <div className="field">
              <label className="label">Stok</label>
              <div className="control">
                <input
                  type="number"
                  className={`input ${errors.stock ? "is-danger" : ""}`}
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="50"
                  min="0"
                />
              </div>
              {errors.stock && <p className="help is-danger">{errors.stock}</p>}
            </div>

            {/* Gambar (URL) */}
            <div className="field">
              <label className="label">Gambar (URL)</label>
              <div className="control">
                <input
                  type="url"
                  className={`input ${errors.image ? "is-danger" : ""}`}
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/gambar.jpg"
                />
              </div>
              {errors.image && <p className="help is-danger">{errors.image}</p>}
              <p className="help">
                Masukkan URL gambar produk (harus di-host di internet).
              </p>
            </div>

            {/* Status */}
            <div className="field">
              <label className="label">Status</label>
              <div className="control">
                <div className="select">
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="active">Aktif</option>
                    <option value="inactive">Nonaktif</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Aksi */}
            <div className="field is-grouped mt-5">
              <div className="control">
                <button
                  type="submit"
                  className={`button is-primary ${loading ? "is-loading" : ""}`}
                  disabled={loading}
                >
                  Simpan Produk
                </button>
              </div>
              <div className="control">
                <Link to="/seller/my-products" className="button is-light">
                  Batal
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
