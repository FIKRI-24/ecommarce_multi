import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Gunakan useNavigate dari react-router-dom
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Reset messages
    setError("");
    setSuccess("");

    // Validasi input
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.role
    ) {
      setError("Semua field harus diisi!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok!");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password minimal 6 karakter!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5500/admin/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Register berhasil
        setSuccess(data.message || "Registrasi berhasil!");

        console.log("Register berhasil:", data);
        console.log("User data:", data.data);

        // Reset form
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "",
        });

        // ✅ Redirect ke login setelah 2 detik
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(data.message || "Registrasi gagal");
      }
    } catch (error) {
      console.error("Register error:", error);
      setError("Terjadi kesalahan pada server. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Fungsi handleLoginClick sekarang menggunakan navigate yang benar
  const handleLoginClick = () => {
    navigate("/login");
  };

  const clearError = () => {
    setError("");
  };

  const roleOptions = [
    { value: "", label: "Pilih Role" },
    { value: "pembeli", label: "Buyer (Pembeli)" },
    { value: "penjual", label: "Penjual" },
    { value: "driver", label: "Driver" },
    { value: "superadmin", label: "Admin" },
  ];

  return (
    <section
      className="hero is-fullheight is-fullwidth"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5">
              <div
                className="box has-background-light"
                style={{
                  borderRadius: "10px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  border: "none",
                }}
              >
                {/* Error Message */}
                {error && (
                  <div
                    className="notification is-danger has-text-centered"
                    style={{
                      backgroundColor: "#f14668",
                      color: "white",
                    }}
                  >
                    <button className="delete" onClick={clearError}></button>
                    {error}
                  </div>
                )}

                {/* Success Message */}
                {success && (
                  <div
                    className="notification is-success has-text-centered"
                    style={{
                      backgroundColor: "#48c78e",
                      color: "white",
                    }}
                  >
                    <i className="fas fa-check-circle mr-2"></i>
                    {success}
                    <br />
                    <small>Mengarahkan ke halaman login...</small>
                  </div>
                )}

                <div className="has-text-centered mb-5">
                  <h1 className="title is-2" style={{ color: "black" }}>
                    Sign Up
                  </h1>
                  <p className="subtitle is-6" style={{ color: "gray" }}>
                    Buat akun baru Anda
                  </p>
                </div>

                {/* Form input (tetap sama) */}
                <div className="field">
                  <label className="label" style={{ color: "black" }}>
                    Nama Lengkap
                  </label>
                  <div className="control has-icons-left">
                    <input
                      type="text"
                      className="input"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Masukkan nama lengkap"
                      required
                      disabled={isLoading}
                      style={{
                        borderColor: formData.name ? "#667eea" : undefined,
                        boxShadow: formData.name
                          ? "0 0 0 0.125em rgba(102, 126, 234, 0.25)"
                          : undefined,
                      }}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-user"></i>
                    </span>
                  </div>
                </div>

                <div className="field">
                  <label className="label" style={{ color: "black" }}>
                    Email
                  </label>
                  <div className="control has-icons-left">
                    <input
                      type="email"
                      className="input"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="contoh@email.com"
                      required
                      disabled={isLoading}
                      style={{
                        borderColor: formData.email ? "#667eea" : undefined,
                        boxShadow: formData.email
                          ? "0 0 0 0.125em rgba(102, 126, 234, 0.25)"
                          : undefined,
                      }}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </div>
                </div>

                <div className="field">
                  <label className="label" style={{ color: "black" }}>
                    Role
                  </label>
                  <div className="control has-icons-left">
                    <div className="select is-fullwidth">
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                        style={{
                          borderColor: formData.role ? "#667eea" : undefined,
                          boxShadow: formData.role
                            ? "0 0 0 0.125em rgba(102, 126, 234, 0.25)"
                            : undefined,
                        }}
                      >
                        {roleOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <span className="icon is-small is-left">
                      <i className="fas fa-user-tag"></i>
                    </span>
                  </div>
                </div>

                <div className="field">
                  <label className="label" style={{ color: "black" }}>
                    Password
                  </label>
                  <div className="control has-icons-left">
                    <input
                      type="password"
                      className="input"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Minimal 6 karakter"
                      required
                      disabled={isLoading}
                      style={{
                        borderColor: formData.password ? "#667eea" : undefined,
                        boxShadow: formData.password
                          ? "0 0 0 0.125em rgba(102, 126, 234, 0.25)"
                          : undefined,
                      }}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                  </div>
                  {formData.password && formData.password.length < 6 && (
                    <p className="help is-danger">
                      <i className="fas fa-exclamation-triangle mr-1"></i>
                      Password minimal 6 karakter
                    </p>
                  )}
                </div>

                <div className="field">
                  <label className="label" style={{ color: "black" }}>
                    Konfirmasi Password
                  </label>
                  <div className="control has-icons-left">
                    <input
                      type="password"
                      className="input"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Ulangi password"
                      required
                      disabled={isLoading}
                      style={{
                        borderColor: formData.confirmPassword
                          ? formData.password === formData.confirmPassword
                            ? "#48c78e"
                            : "#f14668"
                          : undefined,
                        boxShadow: formData.confirmPassword
                          ? formData.password === formData.confirmPassword
                            ? "0 0 0 0.125em rgba(72, 199, 142, 0.25)"
                            : "0 0 0 0.125em rgba(241, 70, 104, 0.25)"
                          : undefined,
                      }}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                  </div>
                  {formData.confirmPassword &&
                    formData.password !== formData.confirmPassword && (
                      <p className="help is-danger">
                        <i className="fas fa-times mr-1"></i>
                        Password tidak cocok
                      </p>
                    )}
                  {formData.confirmPassword &&
                    formData.password === formData.confirmPassword &&
                    formData.password.length >= 6 && (
                      <p className="help is-success">
                        <i className="fas fa-check mr-1"></i>
                        Password cocok
                      </p>
                    )}
                </div>

                {/* Register Button */}
                <div className="field mt-5">
                  <div className="control">
                    <button
                      type="button"
                      onClick={handleRegister}
                      className={`button is-fullwidth ${
                        isLoading ? "is-loading" : ""
                      }`}
                      disabled={isLoading}
                      style={{
                        backgroundColor: "#667eea",
                        borderColor: "#667eea",
                        color: "white",
                      }}
                      onMouseOver={(e) => {
                        if (!isLoading) {
                          e.target.style.backgroundColor = "#5a6fd8";
                          e.target.style.borderColor = "#5a6fd8";
                        }
                      }}
                      onMouseOut={(e) => {
                        if (!isLoading) {
                          e.target.style.backgroundColor = "#667eea";
                          e.target.style.borderColor = "#667eea";
                        }
                      }}
                    >
                      {isLoading ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          Mendaftar...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-user-plus mr-2"></i>
                          Daftar
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Login Link */}
                <div className="has-text-centered mt-4">
                  <p style={{ color: "gray" }}>
                    Sudah punya akun?{" "}
                    <span
                      className="has-text-primary"
                      onClick={handleLoginClick}
                      style={{
                        cursor: "pointer",
                        textDecoration: "underline",
                        color: "#667eea",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.color = "#5a6fd8";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.color = "#667eea";
                      }}
                    >
                      Login disini
                    </span>
                  </p>
                </div>

                {/* Demo Info */}
                <div
                  className="has-text-centered mt-5 pt-3"
                  style={{
                    borderTop: "1px solid #e0e0e0",
                  }}
                >
                  <p style={{ fontSize: "0.8rem", color: "#888" }}>
                    <i className="fas fa-info-circle mr-1"></i>
                    Demo: Cek console untuk melihat respons registrasi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;