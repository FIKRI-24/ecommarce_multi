// pages/PageAddStore.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import axios from "axios";
import "bulma/css/bulma.min.css";

const PageAddStore = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo: "https://via.placeholder.com/150", // opsional
    status: "pending",
    customId: "", // ✅ Sekarang kirim customId
  });
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const res = await axios.get("http://localhost:5500/admin/users");
      const users = Array.isArray(res.data) ? res.data : res.data.data || [];

      // Filter hanya penjual yang belum punya toko
      const sellersWithoutStore = users
        .filter((user) => user.role === "penjual")
        .filter((user) => !user.Store); // Asumsi: user.Store ada jika sudah punya toko

      setSellers(sellersWithoutStore);
    } catch (error) {
      console.error("Gagal muat daftar penjual:", error);
      alert("Gagal memuat daftar penjual.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customId) {
      alert("Pilih penjual terlebih dahulu!");
      return;
    }

    setFormLoading(true);
    try {
      // Kirim ke backend: customId, name, description, logo
      const payload = {
        customId: formData.customId,
        name: formData.name,
        description: formData.description,
        logo: formData.logo,
        // status tidak dikirim ke backend kecuali dibutuhkan
      };

      await axios.post("http://localhost:5500/admin/stores", payload);
      alert("Toko berhasil dibuat!");
      navigate("/stores");
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      alert(`Gagal membuat toko: ${msg}`);
      console.error("Error:", error);
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="content" style={{ padding: "30px" }}>
          <p>Memuat daftar penjual...</p>
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
        <Link
          to="/admin/stores"
          className="button is-small is-light"
          style={{ marginBottom: "10px" }}
        >
          ‹ Kembali
        </Link>
        <h1 className="title is-3 has-text-dark">➕ Tambah Toko Baru</h1>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Nama Toko</label>
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
                placeholder="Deskripsi toko"
              ></textarea>
            </div>
          </div>

          <div className="field">
            <label className="label">Logo (URL)</label>
            <div className="control">
              <input
                className="input"
                type="url"
                name="logo"
                value={formData.logo}
                onChange={handleChange}
                placeholder="https://example.com/logo.png"
              />
            </div>
          </div>

          {/* Dropdown Pilih Penjual via customId */}
          <div className="field">
            <label className="label">Pilih Penjual</label>
            <div className="control">
              <div className="select">
                <select
                  name="customId"
                  value={formData.customId}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Pilih Penjual (customId) --</option>
                  {sellers.map((seller) => (
                    <option key={seller.id} value={seller.customId}>
                      {seller.name} ({seller.customId})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Status (opsional, bisa dihapus jika backend atur default) */}
          {/* Jika ingin tetap tampilkan, pastikan backend terima `status` */}
          <div className="field">
            <label className="label">Status</label>
            <div className="control">
              <div className="select">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="pending">Menunggu</option>
                  <option value="approved">Disetujui</option>
                  <option value="rejected">Ditolak</option>
                </select>
              </div>
            </div>
          </div>

          <div className="buttons mt-5">
            <button
              type="submit"
              className="button is-success"
              disabled={formLoading}
            >
              {formLoading ? "Membuat..." : "✅ Buat Toko"}
            </button>
            <Link to="/admin/stores" className="button is-light">
              Batal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PageAddStore;
