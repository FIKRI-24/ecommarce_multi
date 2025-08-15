import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import "../../assets/css/style.css";

const Sidebar = () => {
  const location = useLocation();
  const { darkMode, setDarkMode } = useTheme();
  const userRole = localStorage.getItem("role");
  const userName = localStorage.getItem("name") || "User";

  const isActive = (path) => {
    return location.pathname === path ? "is-active" : "";
  };

  const handleLogout = () => {
    if (window.confirm("Yakin ingin keluar?")) {
      localStorage.clear();
      window.location.href = "/login";
    }
  };

  const getMenuItems = () => {
    switch (userRole) {
      case "pembeli":
        return [
          { path: "/buyer/home", icon: "home", label: "Dashboard" },
          { path: "/products", icon: "box-open", label: "Semua Produk" },
          { path: "/cart", icon: "shopping-cart", label: "Keranjang" },
          { path: "/orders", icon: "receipt", label: "Pesanan Saya" },
          { path: "/profile", icon: "user", label: "Profil Saya" },
        ];

      case "penjual":
        return [
          { path: "/seller/store", icon: "store", label: "Toko Saya" },
          {
            path: "/seller/my-products",
            icon: "boxes",
            label: "Kelola Produk",
          },
          {
            path: "/seller/products/create",
            icon: "plus",
            label: "Tambah Produk",
          },
          { path: "/seller/my-orders", icon: "dolly", label: "Orderan Masuk" },
        ];

      case "driver":
        return [
          { path: "/driver/home", icon: "home", label: "Dashboard" },
          { path: "/driver/orders", icon: "list", label: "Riwayat Pesanan" },
        ];

      case "superadmin":
        return [
          {
            path: "/admin/dashboard",
            icon: "tachometer-alt",
            label: "Dashboard",
          },
          { path: "/admin/users", icon: "users", label: "Kelola Pengguna" },
          { path: "/admin/stores", icon: "store", label: "Kelola Toko" },
          { path: "/admin/products", icon: "boxes", label: "Kelola Produk" },
          { path: "/admin/reports", icon: "chart-line", label: "Laporan" },
        ];

      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  if (!userRole) return null;

  return (
    <aside
      className="menu"
      style={{
        width: "260px",
        padding: "20px 15px",
        borderRight: "1px solid #ddd",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        overflowY: "auto",
        backgroundColor: darkMode ? "#1a1a2e" : "#f8f9fa",
        color: darkMode ? "#e0e0e0" : "#333",
        transition: "background-color 0.3s, color 0.3s",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div className="mb-5 has-text-centered">
        <h3 className="title is-5 has-text-primary" style={{ margin: 0 }}>
          🛒 ShopKuy
        </h3>
        <p className="is-size-7 has-text-grey" style={{ marginTop: "4px" }}>
          Role: <strong>{userRole}</strong>
        </p>
      </div>

      {/* Menu List */}
      <ul className="menu-list" style={{ listStyle: "none", padding: 0 }}>
        {menuItems.length === 0 ? (
          <li>
            <span className="has-text-grey">Tidak ada akses</span>
          </li>
        ) : (
          menuItems.map((item) => (
            <li key={item.path} style={{ marginBottom: "8px" }}>
              <Link
                to={item.path}
                className={`is-flex is-align-items-center ${isActive(
                  item.path
                )} ${darkMode ? "has-text-white" : "has-text-black"}`}
                style={{
                  textDecoration: "none",
                  padding: "10px 15px",
                  borderRadius: "6px",
                  display: "block",
                  transition: "all 0.2s ease",
                  backgroundColor: isActive(item.path)
                    ? darkMode
                      ? "#2c3e50"
                      : "#007bff"
                    : "transparent",
                  color: darkMode ? "#e0e0e0" : "#333",
                  fontWeight: isActive(item.path) ? "bold" : "normal",
                }}
              >
                <span className="icon mr-2">
                  <i className={`fas fa-${item.icon}`}></i>
                </span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))
        )}
      </ul>

      {/* Dark Mode Toggle */}
      <div className="menu-list mt-5">
        <li>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="button is-fullwidth is-small"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "8px",
              padding: "10px 15px",
              borderRadius: "6px",
              border: "1px solid",
              borderColor: darkMode ? "#444" : "#ccc",
              background: darkMode ? "#2c3e50" : "#f8f9fa",
              color: darkMode ? "#e0e0e0" : "#333",
              transition: "all 0.2s ease",
            }}
          >
            {darkMode ? (
              <>
                <i className="fas fa-sun"></i>
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <i className="fas fa-moon"></i>
                <span>Dark Mode</span>
              </>
            )}
          </button>
        </li>
      </div>

      {/* Logout Button */}
      <div className="menu-list mt-3">
        <li>
          <button
            onClick={handleLogout}
            className="button is-fullwidth is-small is-danger is-light"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "8px",
              padding: "10px 15px",
              borderRadius: "6px",
              background: darkMode ? "#c0392b" : "#dc3545",
              color: "white",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <span className="icon">
              <i className="fas fa-sign-out-alt"></i>
            </span>
            <span>Logout</span>
          </button>
        </li>
      </div>
    </aside>
  );
};

export default Sidebar;
