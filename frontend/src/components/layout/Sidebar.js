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
    return location.pathname === path;
  };

  const handleLogout = () => {
    if (window.confirm("Yakin ingin keluar?")) {
      localStorage.clear();
      window.location.href = "/login";
    }
  };

  // Helper function untuk icon fallback
  const getIconElement = (iconName, fallbackEmoji = "📄") => {
    return (
      <>
        <i className={`fas fa-${iconName}`} style={{ fontSize: "12px" }}></i>
        <style>{`
          .fas.fa-${iconName}::before {
            content: "${fallbackEmoji}" !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
            font-size: 12px !important;
          }
        `}</style>
      </>
    );
  };

  const getMenuItems = () => {
    switch (userRole) {
      case "pembeli":
        return [
          {
            path: "/buyer/home",
            icon: "home",
            label: "Dashboard",
            color: "#10b981",
            emoji: "🏠",
          },
          {
            path: "/products",
            icon: "box-open",
            label: "Semua Produk",
            color: "#8b5cf6",
            emoji: "📦",
          },
          {
            path: "/cart",
            icon: "shopping-cart",
            label: "Keranjang",
            color: "#f59e0b",
            emoji: "🛒",
          },
          {
            path: "/orders",
            icon: "receipt",
            label: "Pesanan Saya",
            color: "#3b82f6",
            emoji: "📋",
          },
          {
            path: "/profile",
            icon: "user",
            label: "Profil Saya",
            color: "#ef4444",
            emoji: "👤",
          },
        ];

      case "penjual":
        return [
          {
            path: "/seller/store",
            icon: "store",
            label: "Toko Saya",
            color: "#10b981",
            emoji: "🏪",
          },
          {
            path: "/seller/my-products",
            icon: "boxes",
            label: "Kelola Produk",
            color: "#8b5cf6",
            emoji: "📦",
          },
          {
            path: "/seller/products/create",
            icon: "plus",
            label: "Tambah Produk",
            color: "#f59e0b",
            emoji: "➕",
          },
          {
            path: "/seller/my-orders",
            icon: "dolly",
            label: "Orderan Masuk",
            color: "#3b82f6",
            emoji: "🚚",
          },
        ];

      case "driver":
        return [
          {
            path: "/driver/home",
            icon: "home",
            label: "Dashboard",
            color: "#10b981",
            emoji: "🏠",
          },
          {
            path: "/driver/orders",
            icon: "list",
            label: "Riwayat Pesanan",
            color: "#3b82f6",
            emoji: "📋",
          },
        ];

      case "superadmin":
        return [
          {
            path: "/admin/dashboard",
            icon: "tachometer-alt",
            label: "Dashboard",
            color: "#10b981",
            emoji: "📊",
          },
          {
            path: "/admin/users",
            icon: "users",
            label: "Kelola Pengguna",
            color: "#3b82f6",
            emoji: "👥",
          },
          {
            path: "/admin/stores",
            icon: "store",
            label: "Kelola Toko",
            color: "#f59e0b",
            emoji: "🏪",
          },
          {
            path: "/admin/products",
            icon: "boxes",
            label: "Kelola Produk",
            color: "#8b5cf6",
            emoji: "📦",
          },
          {
            path: "/admin/reports",
            icon: "chart-line",
            label: "Laporan",
            color: "#ef4444",
            emoji: "📈",
          },
          {
            path: "/admin/profile",
            icon: "user",
            label: "Profil Saya",
            color: "#06b6d4",
            emoji: "👤",
          },
        ];

      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  const getRoleColor = () => {
    switch (userRole) {
      case "pembeli":
        return "#3b82f6";
      case "penjual":
        return "#10b981";
      case "driver":
        return "#f59e0b";
      case "superadmin":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const getRoleIcon = () => {
    switch (userRole) {
      case "pembeli":
        return { icon: "user", emoji: "👤" };
      case "penjual":
        return { icon: "store", emoji: "🏪" };
      case "driver":
        return { icon: "motorcycle", emoji: "🏍️" };
      case "superadmin":
        return { icon: "crown", emoji: "👑" };
      default:
        return { icon: "user", emoji: "👤" };
    }
  };

  if (!userRole) return null;

  return (
    <>
      <aside
        className="sidebar"
        style={{
          width: "280px",
          padding: "24px",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          overflowY: "auto",
          backgroundColor: darkMode ? "#1f2937" : "#ffffff",
          borderRight: darkMode ? "1px solid #374151" : "1px solid #e5e7eb",
          boxShadow: darkMode
            ? "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)"
            : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          transition: "all 0.3s ease",
          zIndex: 1000,
        }}
      >
        {/* Brand Header */}
        <div
          style={{
            marginBottom: "32px",
            textAlign: "center",
            padding: "20px 16px",
            background: darkMode
              ? "linear-gradient(135deg, #374151 0%, #1f2937 100%)"
              : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
            borderRadius: "16px",
            border: darkMode ? "1px solid #4b5563" : "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              margin: "0 auto 12px auto",
              background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 16px rgba(59, 130, 246, 0.3)",
            }}
          >
            <i
              className="fas fa-shopping-cart"
              style={{ fontSize: "28px", color: "#ffffff" }}
            ></i>
          </div>

          <h3
            style={{
              fontSize: "24px",
              fontWeight: "800",
              margin: "0 0 4px 0",
              background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            ShopKuy
          </h3>

          <p
            style={{
              fontSize: "12px",
              color: darkMode ? "#9ca3af" : "#6b7280",
              margin: "0",
              fontWeight: "500",
            }}
          >
            E-Commerce Platform
          </p>
        </div>

        {/* User Info */}
        <div
          style={{
            marginBottom: "24px",
            padding: "16px",
            background: darkMode ? "#374151" : "#f8fafc",
            borderRadius: "12px",
            border: darkMode ? "1px solid #4b5563" : "1px solid #e2e8f0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: `linear-gradient(135deg, ${getRoleColor()}20 0%, ${getRoleColor()}40 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "16px" }}>{getRoleIcon().emoji}</span>
            </div>
            <div>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: darkMode ? "#e5e7eb" : "#374151",
                  margin: "0 0 2px 0",
                }}
              >
                {userName}
              </p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: "600",
                    color: getRoleColor(),
                    backgroundColor: getRoleColor() + "20",
                    padding: "2px 8px",
                    borderRadius: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {userRole}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav style={{ marginBottom: "24px" }}>
          <div
            style={{
              fontSize: "12px",
              fontWeight: "600",
              color: darkMode ? "#9ca3af" : "#6b7280",
              marginBottom: "12px",
              textTransform: "uppercase",
              letterSpacing: "1px",
              paddingLeft: "12px",
            }}
          >
            Navigation
          </div>

          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {menuItems.length === 0 ? (
              <li style={{ padding: "12px", textAlign: "center" }}>
                <span
                  style={{
                    color: darkMode ? "#9ca3af" : "#6b7280",
                    fontSize: "14px",
                  }}
                >
                  Tidak ada akses
                </span>
              </li>
            ) : (
              menuItems.map((item) => {
                const active = isActive(item.path);

                return (
                  <li key={item.path} style={{ marginBottom: "4px" }}>
                    <Link
                      to={item.path}
                      style={{
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "12px 16px",
                        borderRadius: "12px",
                        transition: "all 0.2s ease",
                        fontSize: "14px",
                        fontWeight: active ? "600" : "500",
                        backgroundColor: active
                          ? darkMode
                            ? "#374151"
                            : "#f1f5f9"
                          : "transparent",
                        color: active
                          ? item.color
                          : darkMode
                          ? "#d1d5db"
                          : "#64748b",
                        transform: active ? "translateX(4px)" : "translateX(0)",
                        borderLeft: active
                          ? `3px solid ${item.color}`
                          : "3px solid transparent",
                      }}
                      onMouseEnter={(e) => {
                        if (!active) {
                          e.currentTarget.style.backgroundColor = darkMode
                            ? "#374151"
                            : "#f8fafc";
                          e.currentTarget.style.transform = "translateX(2px)";
                          e.currentTarget.style.color = item.color;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!active) {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.transform = "translateX(0)";
                          e.currentTarget.style.color = darkMode
                            ? "#d1d5db"
                            : "#64748b";
                        }
                      }}
                    >
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "6px",
                          backgroundColor: active
                            ? item.color + "20"
                            : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <span style={{ fontSize: "12px" }}>{item.emoji}</span>
                      </div>
                      <span>{item.label}</span>

                      {active && (
                        <div
                          style={{
                            marginLeft: "auto",
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            backgroundColor: item.color,
                            boxShadow: `0 0 0 2px ${item.color}30`,
                          }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })
            )}
          </ul>
        </nav>

        {/* Settings Section */}
        <div style={{ marginTop: "auto" }}>
          <div
            style={{
              fontSize: "12px",
              fontWeight: "600",
              color: darkMode ? "#9ca3af" : "#6b7280",
              marginBottom: "12px",
              textTransform: "uppercase",
              letterSpacing: "1px",
              paddingLeft: "12px",
            }}
          >
            Settings
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              marginBottom: "8px",
              borderRadius: "12px",
              border: "none",
              background: darkMode ? "#374151" : "#f8fafc",
              color: darkMode ? "#d1d5db" : "#64748b",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = darkMode
                ? "#4b5563"
                : "#e2e8f0";
              e.currentTarget.style.transform = "translateX(2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = darkMode
                ? "#374151"
                : "#f8fafc";
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "6px",
                backgroundColor: darkMode ? "#fbbf24" : "#1e293b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "12px" }}>{darkMode ? "☀️" : "🌙"}</span>
            </div>
            <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              color: "#ffffff",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 8px rgba(239, 68, 68, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 8px 16px rgba(239, 68, 68, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 8px rgba(239, 68, 68, 0.3)";
            }}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "6px",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i className="fas fa-sign-out-alt" style={{ fontSize: "12px" }} />
            </div>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Font Awesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />

      {/* Global Styles for Dark Mode */}
      <style>{`
        /* Font Awesome Fallback */
        .fas, .far, .fab, .fal, .fad, .fa {
          font-family: "Font Awesome 6 Free", "Font Awesome 6 Pro", "Font Awesome 5 Free", "Font Awesome 5 Pro", sans-serif !important;
          font-weight: 900;
        }

        .far {
          font-weight: 400;
        }

        /* Ensure icons are displayed */
        i[class*="fa-"] {
          display: inline-block;
          font-style: normal;
          font-variant: normal;
          text-rendering: auto;
          -webkit-font-smoothing: antialiased;
        }

        /* Global Dark Mode Styles */
        body {
          background-color: ${darkMode ? "#111827" : "#f9fafb"} !important;
          color: ${darkMode ? "#e5e7eb" : "#374151"} !important;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        /* Content container margin untuk sidebar */
        .content {
          margin-left: 280px;
          background-color: ${darkMode ? "#111827" : "#f9fafb"} !important;
          min-height: 100vh;
          transition: background-color 0.3s ease;
        }

        /* Card backgrounds */
        .card, .box, .notification {
          background-color: ${darkMode ? "#1f2937" : "#ffffff"} !important;
          color: ${darkMode ? "#e5e7eb" : "#374151"} !important;
          border-color: ${darkMode ? "#374151" : "#e5e7eb"} !important;
        }

        /* Input and form elements */
        .input, .textarea, .select select {
          background-color: ${darkMode ? "#374151" : "#ffffff"} !important;
          color: ${darkMode ? "#e5e7eb" : "#374151"} !important;
          border-color: ${darkMode ? "#4b5563" : "#d1d5db"} !important;
        }

        .input:focus, .textarea:focus, .select select:focus {
          border-color: ${darkMode ? "#3b82f6" : "#3b82f6"} !important;
          box-shadow: 0 0 0 0.125em ${
            darkMode ? "rgba(59, 130, 246, 0.25)" : "rgba(59, 130, 246, 0.25)"
          } !important;
        }

        /* Table styling */
        .table {
          background-color: ${darkMode ? "#1f2937" : "#ffffff"} !important;
          color: ${darkMode ? "#e5e7eb" : "#374151"} !important;
        }

        .table th {
          background-color: ${darkMode ? "#374151" : "#f8fafc"} !important;
          color: ${darkMode ? "#e5e7eb" : "#374151"} !important;
          border-color: ${darkMode ? "#4b5563" : "#e5e7eb"} !important;
        }

        .table td {
          border-color: ${darkMode ? "#374151" : "#e5e7eb"} !important;
        }

        /* Button styling */
        .button:not(.is-primary):not(.is-info):not(.is-success):not(.is-warning):not(.is-danger) {
          background-color: ${darkMode ? "#374151" : "#ffffff"} !important;
          color: ${darkMode ? "#e5e7eb" : "#374151"} !important;
          border-color: ${darkMode ? "#4b5563" : "#d1d5db"} !important;
        }

        /* Modal and dropdown styling */
        .modal-card {
          background-color: ${darkMode ? "#1f2937" : "#ffffff"} !important;
        }

        .dropdown-content {
          background-color: ${darkMode ? "#1f2937" : "#ffffff"} !important;
          border-color: ${darkMode ? "#374151" : "#e5e7eb"} !important;
        }

        .dropdown-item {
          color: ${darkMode ? "#e5e7eb" : "#374151"} !important;
        }

        .dropdown-item:hover {
          background-color: ${darkMode ? "#374151" : "#f8fafc"} !important;
        }

        /* Title and text colors */
        .title, .subtitle {
          color: ${darkMode ? "#e5e7eb" : "#374151"} !important;
        }

        /* Navbar if exists */
        .navbar {
          background-color: ${darkMode ? "#1f2937" : "#ffffff"} !important;
          border-bottom-color: ${darkMode ? "#374151" : "#e5e7eb"} !important;
        }

        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: ${darkMode ? "#1f2937" : "#f1f5f9"};
        }

        ::-webkit-scrollbar-thumb {
          background: ${darkMode ? "#4b5563" : "#cbd5e1"};
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${darkMode ? "#6b7280" : "#94a3b8"};
        }
      `}</style>
    </>
  );
};

export default Sidebar;
