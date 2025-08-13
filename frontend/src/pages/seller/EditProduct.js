// src/pages/seller/EditProduct.js
import React, { useState, useEffect } from "react";
import "../../assets/css/style.css";
import Sidebar from "../../components/layout/Sidebar";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams(); // Ambil id dari URL
  const navigate = useNavigate();

  // ✅ HAPUS image dan status dari formData
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");
  const [fetchLoading, setFetchLoading] = useState(true);

  // Ambil data produk saat pertama kali
  useEffect(() => {
    const fetchProduct = async () => {
      setFetchLoading(true);
      setApiError("");

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5500/seller/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // ✅ Gunakan response.data langsung atau response.data.data
        const product = response.data.data || response.data;

        if (!product) {
          throw new Error("Data produk tidak ditemukan");
        }

        // ✅ Isi form tanpa image dan status
        setFormData({
          name: product.name || "",
          description: product.description || "",
          price: product.price || "",
          stock: product.stock || "",
        });
      } catch (err) {
        console.error("❌ Gagal muat data produk:", err);
        setApiError(
          err.response?.data?.message || "Gagal memuat data produk. Coba lagi."
        );
      } finally {
        setFetchLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    } else {
      setApiError("ID produk tidak valid.");
      setFetchLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Hapus error saat user ketik
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

      // ✅ HAPUS image dan status dari payload
      const payload = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        stock: Number(formData.stock),
        // ❌ Jangan kirim image dan status
      };

      await axios.put(`http://localhost:5500/seller/products/${id}`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess("Produk berhasil diperbarui! 🎉");
      setTimeout(() => {
        navigate("/my-products");
      }, 1500);
    } catch (err) {
      console.error("❌ Gagal update produk:", err);
      setApiError(
        err.response?.data?.message || "Gagal memperbarui produk. Coba lagi."
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="content" style={{ padding: "30px" }}>
          <p>⏳ Memuat data produk...</p>
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
          <h1 className="has-text-warning">Edit Produk</h1>
          <p>Perbarui informasi produk yang dijual di toko Anda.</p>
        </div>

        {/* Notifikasi */}
        {apiError && (
          <div className="notification is-danger">
            <button className="delete" onClick={() => setApiError("")}></button>
            {apiError}
          </div>
        )}

        {success && <div className="notification is-success">{success}</div>}

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

            {/* HAPUS field Gambar (URL) dan Status */}
            {/* Tidak ditampilkan karena tidak ada di database */}

            {/* Aksi */}
            <div className="field is-grouped mt-5">
              <div className="control">
                <button
                  type="submit"
                  className={`button is-warning ${loading ? "is-loading" : ""}`}
                  disabled={loading}
                >
                  Perbarui Produk
                </button>
              </div>
              <div className="control">
                <button
                  type="button"
                  className="button is-light"
                  onClick={() => navigate("/my-products")}
                  disabled={loading}
                >
                  Batal
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
