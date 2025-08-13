import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PageLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Email dan password harus diisi!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5500/admin/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || "Login berhasil");

        // Simpan token & user info di localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role", data.user.role); // Simpan role

        // Role-based redirect
        let redirectPath = "/";
        switch (data.user.role) {
          case "superadmin":
            redirectPath = "/admin/dashboard"; // Halaman dashboard admin
            break;
          case "penjual":
            redirectPath = "/seller/store"; // Halaman dashboard penjual
            break;
          case "pembeli":
            redirectPath = "/buyer/home"; // Halaman dashboard pembeli
            break;
          case "driver":
            redirectPath = "/driver/dashboard"; // Halaman dashboard pembeli
            break;
          default:
            redirectPath = "/"; // Default fallback
        }

        setTimeout(() => {
          navigate(redirectPath);
        }, 800);
      } else {
        setError(data.message || "Login gagal");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Terjadi kesalahan pada server.");
    } finally {
      setIsLoading(false);
    }
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
                }}
              >
                {error && (
                  <div className="notification is-danger">
                    <button
                      className="delete"
                      onClick={() => setError("")}
                    ></button>
                    {error}
                  </div>
                )}

                {success && (
                  <div className="notification is-success">{success}</div>
                )}

                <h1 className="title has-text-centered">Sign In</h1>
                <p className="subtitle has-text-centered">Masuk ke akun Anda</p>

                <form onSubmit={handleLogin}>
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control has-icons-left">
                      <input
                        type="email"
                        className="input"
                        placeholder="contoh@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control has-icons-left">
                      <input
                        type="password"
                        className="input"
                        placeholder="Masukkan password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                      </span>
                    </div>
                  </div>

                  <div className="field">
                    <button
                      type="submit"
                      className={`button is-fullwidth is-primary ${
                        isLoading ? "is-loading" : ""
                      }`}
                      disabled={isLoading}
                    >
                      Masuk
                    </button>
                  </div>
                </form>

                <div className="has-text-centered mt-4">
                  <p>
                    Belum punya akun?{" "}
                    <span
                      className="has-text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/register")}
                    >
                      Daftar disini
                    </span>
                  </p>
                  <p className="mt-2">
                    <span
                      className="has-text-grey"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/forgot-password")}
                    >
                      Lupa password?
                    </span>
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

export default PageLogin;
