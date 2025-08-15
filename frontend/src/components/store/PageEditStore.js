// pages/PageEditStore.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import axios from "axios";
import "bulma/css/bulma.min.css";

const PageEditStore = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "pending",
    userId: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStore();
  }, [id]);

  const fetchStore = async () => {
    try {
      const res = await axios.get(`http://localhost:5500/admin/stores/${id}`);
      const store = res.data;
      setFormData({
        name: store.name,
        description: store.description || "",
        status: store.status,
        userId: store.userId,
      });
    } catch (error) {
      console.error("Gagal muat toko:", error);
      alert("Gagal memuat data toko.");
      navigate("/admin/stores");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`http://localhost:5500/admin/stores/${id}`, formData);
      alert("Toko berhasil diperbarui!");
      navigate("/admin/stores");
    } catch (error) {
      console.error("Gagal edit toko:", error);
      alert("Gagal memperbarui toko.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Memuat...</div>;

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
        <h1 className="title is-3 has-text-dark">
          ✏️ Edit Toko: {formData.name}
        </h1>

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
            <label className="label">User ID Pemilik</label>
            <div className="control">
              <input
                className="input"
                type="number"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                required
              />
            </div>
          </div>

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
              className="button is-warning"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "💾 Simpan Perubahan"}
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

export default PageEditStore;
