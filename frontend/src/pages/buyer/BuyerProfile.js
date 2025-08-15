// src/pages/buyer/Profile.js
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/style.css";

const BuyerProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form edit profil
  const [editData, setEditData] = useState({ name: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);

  // Form ganti password
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [pwErrors, setPwErrors] = useState({});
  const [pwLoading, setPwLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "http://localhost:5500/buyer/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const userData = response.data.data;
        setUser(userData);
        setEditData({ name: userData.name, email: userData.email });
      } catch (err) {
        console.error("❌ Gagal muat profil:", err);
        if (err.response?.status === 401) {
          setError("Sesi habis. Silakan login ulang.");
          navigate("/login");
        } else {
          setError(
            err.response?.data?.message || "Gagal memuat profil. Coba lagi."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        "http://localhost:5500/buyer/profile",
        editData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data.data);
      setSuccess("Profil berhasil diperbarui! ✅");
      setIsEditing(false);

      // Update nama di localStorage
      localStorage.setItem("name", response.data.data.name);
    } catch (err) {
      console.error("❌ Gagal update profil:", err);
      setError(
        err.response?.data?.message || "Gagal memperbarui profil. Coba lagi."
      );
    }
  };

  const validatePassword = () => {
    const errors = {};
    if (!passwordData.oldPassword)
      errors.oldPassword = "Password lama wajib diisi";
    if (!passwordData.newPassword)
      errors.newPassword = "Password baru wajib diisi";
    if (passwordData.newPassword.length < 6)
      errors.newPassword = "Password minimal 6 karakter";
    if (passwordData.newPassword !== passwordData.confirmPassword)
      errors.confirmPassword = "Konfirmasi password tidak cocok";

    setPwErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwErrors({});
    setSuccess("");
    setError("");

    if (!validatePassword()) return;
    setPwLoading(true);

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5500/buyer/change-password",
        {
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Password berhasil diubah! 🔐");
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("❌ Gagal ganti password:", err);
      setError(
        err.response?.data?.message || "Gagal mengubah password. Coba lagi."
      );
    } finally {
      setPwLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="content" style={{ padding: "30px" }}>
          <p>⏳ Memuat profil...</p>
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
          <h1 className="title is-3 has-text-dark">Profil Saya</h1>
          <p>Kelola informasi akun dan keamanan.</p>
        </div>

        {/* Error & Success Messages */}
        {error && (
          <div className="notification is-danger">
            <button className="delete" onClick={() => setError("")}></button>
            {error}
          </div>
        )}

        {success && (
          <div className="notification is-success">
            <button className="delete" onClick={() => setSuccess("")}></button>
            {success}
          </div>
        )}

        <div className="columns">
          {/* Kolom Kiri: Info Profil */}
          <div className="column is-7">
            <div className="box">
              <h2 className="title is-5">Informasi Akun</h2>

              {isEditing ? (
                <form onSubmit={handleUpdateProfile}>
                  <div className="field">
                    <label className="label">Nama</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={editData.name}
                        onChange={(e) =>
                          setEditData({ ...editData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input
                        type="email"
                        className="input"
                        value={editData.email}
                        onChange={(e) =>
                          setEditData({ ...editData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="field is-grouped mt-4">
                    <div className="control">
                      <button
                        type="submit"
                        className="button is-primary"
                        disabled={loading}
                      >
                        Simpan Perubahan
                      </button>
                    </div>
                    <div className="control">
                      <button
                        type="button"
                        className="button is-light"
                        onClick={() => {
                          setEditData({ name: user.name, email: user.email });
                          setIsEditing(false);
                        }}
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div>
                  <p>
                    <strong>ID:</strong> {user.customId}
                  </p>
                  <p>
                    <strong>Nama:</strong> {user.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Role:</strong>{" "}
                    <span className="tag is-info">{user.role}</span>
                  </p>

                  <div className="mt-4">
                    <button
                      className="button is-small is-warning"
                      onClick={() => setIsEditing(true)}
                    >
                      <span className="icon is-small">
                        <i className="fas fa-edit"></i>
                      </span>
                      <span>Edit Profil</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Kolom Kanan: Ganti Password */}
          <div className="column is-5">
            <div className="box">
              <h2 className="title is-5">Keamanan</h2>
              <p className="is-size-6">
                Ubah password secara berkala untuk keamanan akun.
              </p>

              <form onSubmit={handleChangePassword} className="mt-4">
                <div className="field">
                  <label className="label">Password Lama</label>
                  <div className="control">
                    <input
                      type="password"
                      className={`input ${
                        pwErrors.oldPassword ? "is-danger" : ""
                      }`}
                      value={passwordData.oldPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          oldPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                  {pwErrors.oldPassword && (
                    <p className="help is-danger">{pwErrors.oldPassword}</p>
                  )}
                </div>

                <div className="field">
                  <label className="label">Password Baru</label>
                  <div className="control">
                    <input
                      type="password"
                      className={`input ${
                        pwErrors.newPassword ? "is-danger" : ""
                      }`}
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                  {pwErrors.newPassword && (
                    <p className="help is-danger">{pwErrors.newPassword}</p>
                  )}
                </div>

                <div className="field">
                  <label className="label">Konfirmasi Password</label>
                  <div className="control">
                    <input
                      type="password"
                      className={`input ${
                        pwErrors.confirmPassword ? "is-danger" : ""
                      }`}
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                  {pwErrors.confirmPassword && (
                    <p className="help is-danger">{pwErrors.confirmPassword}</p>
                  )}
                </div>

                <div className="field mt-4">
                  <button
                    type="submit"
                    className={`button is-fullwidth is-success ${
                      pwLoading ? "is-loading" : ""
                    }`}
                    disabled={pwLoading}
                  >
                    Ubah Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="has-text-centered mt-6">
          <button
            className="button is-danger is-light"
            onClick={() => {
              if (window.confirm("Yakin ingin logout?")) {
                localStorage.clear();
                navigate("/login");
              }
            }}
          >
            <span className="icon">
              <i className="fas fa-sign-out-alt"></i>
            </span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyerProfile;
