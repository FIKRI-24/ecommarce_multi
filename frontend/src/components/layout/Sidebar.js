// src/component/SidebarList.js
import React from "react";
import "../../assets/css/style.css"; // Import CSS untuk styling
import logo from "../../assets/images/logo.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <ul className="menu">
        <li>
          <i className="fas fa-tachometer-alt"></i>
          <Link to="/dashboard"> Dashboard </Link>
        </li>
        <li>
          <i className="fas fa-box"></i>
          <Link to="/products"> Products </Link>
        </li>
        <li>
          <i className="fas fa-book"></i>
          <Link to="/orders"> Orders </Link>
        </li>
        <li>
          <i className="fas fa-store"></i>
          <Link to="/stores"> Store </Link>
        </li>
        <li>
          <i className="fas fa-users"></i>
          <Link to="/users"> User </Link>
        </li>
        <li>
          <i className="fas fa-comment-dots"></i>
          <Link to="/testimoni"> Testimoni </Link>
        </li>
        <li>
          <i className="fas fa-shopping-cart"></i>
          <Link to="/payments"> Transaksi </Link>
        </li>
        <li>
          <i className="fas fa-sign-out-alt"></i> Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
