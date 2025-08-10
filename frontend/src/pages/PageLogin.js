import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Simulasi navigate function
  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
    // Dalam implementasi nyata, gunakan useNavigate dari react-router-dom
    // const navigate = useNavigate();
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset messages
    setError("");
    setSuccess("");

    // Validasi input
    if (!email || !password) {
      setError("Email dan password harus diisi!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5500/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login berhasil
        setSuccess(data.message);

        // Simpan token dan data user ke localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        console.log("Login berhasil:", data);
        console.log("User role:", data.user.role);
        console.log("Redirect to:", data.redirectTo);

        // Redirect berdasarkan redirectTo dari backend
        setTimeout(() => {
          if (data.redirectTo) {
            navigate(data.redirectTo);
          } else {
            // Fallback jika tidak ada redirectTo
            navigate("/dashboard");
          }
        }, 1500);
      } else {
        // Login gagal
        setError(data.message || "Login gagal");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Terjadi kesalahan pada server. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleForgotPasswordClick = () => {
    navigate("/forgot-password");
  };

  const clearError = () => {
    setError("");
  };

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
            <div className="column is-4">
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
                  </div>
                )}

                <div className="has-text-centered mb-5">
                  <h1 className="title is-2" style={{ color: "black" }}>
                    Sign In
                  </h1>
                  <p className="subtitle is-6" style={{ color: "gray" }}>
                    Masuk ke akun Anda
                  </p>
                </div>

                {/* Email Field */}
                <div className="field">
                  <label className="label" style={{ color: "black" }}>
                    Email
                  </label>
                  <div className="control has-icons-left">
                    <input
                      type="email"
                      className="input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="contoh@email.com"
                      required
                      disabled={isLoading}
                      style={{
                        borderColor: email ? "#667eea" : undefined,
                        boxShadow: email
                          ? "0 0 0 0.125em rgba(102, 126, 234, 0.25)"
                          : undefined,
                      }}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </div>
                </div>

                {/* Password Field */}
                <div className="field">
                  <label className="label" style={{ color: "black" }}>
                    Password
                  </label>
                  <div className="control has-icons-left">
                    <input
                      type="password"
                      className="input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Masukkan password"
                      required
                      disabled={isLoading}
                      style={{
                        borderColor: password ? "#667eea" : undefined,
                        boxShadow: password
                          ? "0 0 0 0.125em rgba(102, 126, 234, 0.25)"
                          : undefined,
                      }}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                  </div>
                </div>

                {/* Login Button */}
                <div className="field mt-5">
                  <div className="control">
                    <button
                      type="button"
                      onClick={handleLogin}
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
                          Masuk...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-sign-in-alt mr-2"></i>
                          Masuk
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Register Link */}
                <div className="has-text-centered mt-4">
                  <p style={{ color: "gray" }}>
                    Belum punya akun?{" "}
                    <span
                      className="has-text-primary"
                      onClick={handleRegisterClick}
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
                      Daftar disini
                    </span>
                  </p>
                </div>

                {/* Forgot Password Link */}
                <div className="has-text-centered mt-3">
                  <span
                    className="has-text-grey"
                    onClick={handleForgotPasswordClick}
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.color = "#4a4a4a";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.color = "#7a7a7a";
                    }}
                  >
                    Lupa password?
                  </span>
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
                    Demo: Cek console untuk melihat respons login
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

export default Login;
