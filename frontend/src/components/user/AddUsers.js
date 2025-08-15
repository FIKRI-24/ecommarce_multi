// pages/AddUser.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../layout/Sidebar"; // Pastikan path benar
import axios from "axios";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("pembeli"); // default
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi dasar
    if (!name || !email || !password || !role) {
      alert("Semua field wajib diisi!");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Format email tidak valid.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`http://localhost:5500/admin/users`, {
        name,
        email,
        password,
        role,
      });

      // Cek response
      if (response.data.message) {
        alert(response.data.message);
      } else {
        alert("User berhasil ditambahkan!");
      }

      // Redirect ke daftar user
      navigate("/admin/users");
    } catch (error) {
      console.error("Error creating user:", error);

      if (error.response) {
        // Backend merespons dengan error
        alert(`Gagal: ${error.response.data.message || "Periksa data Anda"}`);
      } else if (error.request) {
        alert(
          "Tidak dapat terhubung ke server. Cek backend sedang jalan di http://localhost:5500"
        );
      } else {
        alert("Terjadi kesalahan saat membuat user.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div
        className="content"
        style={{ padding: "30px", backgroundColor: "#f8f9fa" }}
      >
        {/* Header */}
        <div style={{ marginBottom: "30px" }}>
          <Link to="/admin/users">
            <button className="button is-warning mb-4">⬅️ Kembali</button>
          </Link>
          <h1 className="title is-3 has-text-dark">➕ Tambah Pengguna Baru</h1>
          <p className="subtitle is-6 has-text-grey">
            Isi form untuk membuat akun baru: admin, penjual, pembeli, atau
            driver
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

          {/* Password */}
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                minLength="6"
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
                {role === "superadmin" && "⚠️ Hanya untuk admin utama!"}
              </strong>
            </p>
          </div>

          {/* Submit Button */}
          <div className="field is-grouped is-grouped-right mt-5">
            <div className="control">
              <Link to="/admin/users">
                <button type="button" className="button is-light mr-2">
                  Batal
                </button>
              </Link>
              <button
                type="submit"
                className={`button is-success ${loading ? "is-loading" : ""}`}
                disabled={loading}
              >
                ✅ Simpan Pengguna
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
