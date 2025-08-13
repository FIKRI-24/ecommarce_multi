// src/component/SidebarList.js

import React from "react";
import "../../assets/css/style.css";
import logo from "../../assets/images/logo.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "";
  // Fungsi logout
  const handleLogout = () => {
    // Hapus data autentikasi
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    // Opsional: tampilkan pesan
    alert("Anda telah keluar dari akun.");

    // Arahkan ke halaman login
    navigate("/login");
  };
  // Buat path dashboard sesuai role
  const getDashboardPath = () => {
    switch (role) {
      case "superadmin":
        return "/admin/dashboard";
      case "penjual":
        return "/seller/store";
      case "pembeli":
        return "/buyer/home";
      case "driver":
        return "/driver/dashboard";
      default:
        return "/dashboard";
    }
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <ul className="menu">
        {/* Dashboard selalu muncul */}
        <li>
          <i className="fas fa-tachometer-alt"></i>
          <Link to={getDashboardPath()}>Dashboard</Link>
        </li>

        {/* Menu untuk penjual */}
        {role === "penjual" && (
          <>
            <li>
              <i className="fas fa-box"></i>
              <Link to="/seller/my-products">My Products</Link>
            </li>
            <li>
              <i className="fas fa-book"></i>
              <Link to="/seller/my-orders">My Orders</Link>
            </li>
          </>
        )}

        {/* Menu untuk admin */}
        {role === "superadmin" && (
          <>
            <li>
              <i className="fas fa-box"></i>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <i className="fas fa-book"></i>
              <Link to="/orders">Orders</Link>
            </li>
            <li>
              <i className="fas fa-store"></i>
              <Link to="/stores">Store</Link>
            </li>
            <li>
              <i className="fas fa-users"></i>
              <Link to="/users">User</Link>
            </li>
            <li>
              <i className="fas fa-comment-dots"></i>
              <Link to="/testimoni">Testimoni</Link>
            </li>
            <li>
              <i className="fas fa-shopping-cart"></i>
              <Link to="/payments">Transaksi</Link>
            </li>
          </>
        )}

        {/* Menu untuk pembeli */}
        {role === "pembeli" && (
          <li>
            <i className="fas fa-shopping-cart"></i>
            <Link to="/cart">Keranjang</Link>
          </li>
        )}

        {/* ✅ Menu untuk driver */}
        {role === "driver" && (
          <li>
            <i className="fas fa-truck"></i>
            <Link to="/driver/orders">Orderan</Link>
          </li>
        )}

        {/* Tombol Logout - Sekarang punya fungsi */}
        <li onClick={handleLogout} style={{ cursor: "pointer" }}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
