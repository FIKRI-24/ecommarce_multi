// pages/EditUser.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../layout/Sidebar"; // Pastikan path benar

const EditUser = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("pembeli");
  const [password, setPassword] = useState(""); // Opsional: hanya isi jika ingin ganti
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Ambil data user dari API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const API_URL = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${API_URL}/users/${id}`);

        const userData = response.data.data || response.data;
        setUser(userData);

        // Isi form dengan data user
        setName(userData.name);
        setEmail(userData.email);
        setRole(userData.role);
      } catch (error) {
        console.error("Gagal memuat data user:", error);
        alert("User tidak ditemukan atau gagal memuat data.");
        navigate("/users");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !role) {
      alert("Nama, email, dan role wajib diisi!");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Format email tidak valid.");
      return;
    }

    setLoading(true);

    try {
      const API_URL = process.env.REACT_APP_API_URL;
      await axios.put(`${API_URL}/users/${id}`, {
        name,
        email,
        role,
        ...(password && { password }), // Kirim password hanya jika diisi
      });

      alert("User berhasil diperbarui!");
      navigate("/users");
    } catch (error) {
      console.error("Gagal memperbarui user:", error);

      if (error.response) {
        alert(`Gagal: ${error.response.data.message || "Periksa data Anda"}`);
      } else if (error.request) {
        alert(
          "Tidak dapat terhubung ke server. Pastikan backend jalan di http://localhost:5000"
        );
      } else {
        alert("Terjadi kesalahan saat memperbarui user.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && !user) {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="content" style={{ padding: "30px" }}>
          <p className="has-text-centered">Memuat data user...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Sidebar />

      <div
        className="content"
        style={{ padding: "30px", backgroundColor: "#f8f9fa" }}
      >
        {/* Header */}
        <div style={{ marginBottom: "30px" }}>
          <Link to="/users">
            <button className="button is-warning mb-4">⬅️ Kembali</button>
          </Link>
          <h1 className="title is-3 has-text-dark">
            ✏️ Edit Pengguna: <strong>{user?.name}</strong>
          </h1>
          <p className="subtitle is-6 has-text-grey">
            ID: <code>{user?.customId}</code> | Role:{" "}
            <strong>{user?.role}</strong>
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: "600px", margin: "0 auto" }}
        >
          {/* Nama */}
          <div className="field">
            <label className="label">Nama Lengkap</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Budi Santoso"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contoh@email.com"
                required
              />
            </div>
          </div>

          {/* Role */}
          <div className="field">
            <label className="label">Role</label>
            <div className="control">
              <div className="select">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="pembeli">Pembeli</option>
                  <option value="penjual">Penjual</option>
                  <option value="driver">Driver</option>
                  <option value="superadmin">Superadmin</option>
                </select>
              </div>
            </div>
            <p className="help">
              <strong>
                {role === "superadmin" && "⚠️ Hati-hati: ini role superadmin!"}
              </strong>
            </p>
          </div>

          {/* Password (Opsional) */}
          <div className="field">
            <label className="label">Ganti Password (Opsional)</label>
            <div className="control">
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Kosongkan jika tidak ingin ganti"
              />
            </div>
            <p className="help">Password hanya diubah jika kolom ini diisi.</p>
          </div>

          {/* Submit Button */}
          <div className="field is-grouped is-grouped-right mt-5">
            <div className="control">
              <Link to="/users">
                <button type="button" className="button is-light mr-2">
                  Batal
                </button>
              </Link>
              <button
                type="submit"
                className={`button is-success ${loading ? "is-loading" : ""}`}
                disabled={loading}
              >
                💾 Simpan Perubahan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
