// pages/PageUserDetail.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import axios from "axios";

const PageUserDetail = () => {
  const { id } = useParams(); // Ambil id dari URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserDetail();
  }, [id]);

  const fetchUserDetail = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5500/admin/users/${id}`
      );
      setUser(response.data.data || response.data);
    } catch (error) {
      console.error("Gagal memuat detail user:", error);
      alert("Gagal memuat data user. Cek konsol untuk detail.");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk menampilkan role dengan badge
  const getRoleBadge = (role) => {
    const colors = {
      superadmin: "is-danger",
      penjual: "is-primary",
      pembeli: "is-success",
      driver: "is-link",
    };
    return <span className={`tag ${colors[role] || "is-dark"}`}>{role}</span>;
  };

  // Fungsi format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="content" style={{ padding: "30px" }}>
          <p className="is-size-5 has-text-centered">Memuat data pengguna...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="content" style={{ padding: "30px" }}>
          <div className="notification is-danger">
            Pengguna tidak ditemukan.
          </div>
          <Link to="/admin/users">
            <button className="button is-light">
              ‹ Kembali ke Daftar Pengguna
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Sidebar />

      <div
        className="content"
        style={{ backgroundColor: "#f8f9fa", padding: "30px" }}
      >
        {/* Header */}
        <div style={{ marginBottom: "30px" }}>
          <Link to="/admin/users">
            <button
              className="button is-small is-light"
              style={{ marginBottom: "10px" }}
            >
              ‹ Kembali
            </button>
          </Link>
          <h1 className="title is-3 has-text-dark">👤 Detail Pengguna</h1>
          <p className="subtitle is-6 has-text-grey">
            Informasi lengkap pengguna dengan ID: <code>{user.customId}</code>
          </p>
        </div>

        {/* Kartu Detail */}
        <div
          className="box"
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <div className="columns is-vcentered">
            {/* Foto Profil (Opsional) */}
            <div className="column is-3 has-text-centered">
              <figure
                className="image is-128x128 is-rounded"
                style={{ margin: "0 auto" }}
              >
                <img
                  src={
                    user.profileImage ||
                    "https://via.placeholder.com/128?text=No+Image"
                  }
                  alt="Profil"
                  style={{ objectFit: "cover", borderRadius: "50%" }}
                />
              </figure>
              <p
                className="is-size-6 has-text-weight-semibold"
                style={{ marginTop: "10px" }}
              >
                {user.name}
              </p>
              <div style={{ marginTop: "10px" }}>{getRoleBadge(user.role)}</div>
            </div>

            {/* Informasi Detail */}
            <div className="column is-9">
              <table className="table is-fullwidth is-size-5">
                <tbody>
                  <tr>
                    <td>
                      <strong>ID Kustom:</strong>
                    </td>
                    <td>
                      <code>{user.customId}</code>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Nama Lengkap:</strong>
                    </td>
                    <td>{user.name}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Email:</strong>
                    </td>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Role:</strong>
                    </td>
                    <td>{getRoleBadge(user.role)}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Nomor Telepon:</strong>
                    </td>
                    <td>{user.phone || "-"}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Alamat:</strong>
                    </td>
                    <td>{user.address || "-"}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Dibuat pada:</strong>
                    </td>
                    <td>{formatDate(user.createdAt)}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Terakhir diubah:</strong>
                    </td>
                    <td>{formatDate(user.updatedAt)}</td>
                  </tr>
                </tbody>
              </table>

              {/* Aksi */}
              <div className="buttons" style={{ marginTop: "20px" }}>
                <Link to={`/admin/edit-user/${user.id}`}>
                  <button className="button is-info">✏️ Edit Profil</button>
                </Link>
                <Link to="/admin/users">
                  <button className="button is-light">Kembali</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageUserDetail;
