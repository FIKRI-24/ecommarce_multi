// pages/PageUsers.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import axios from "axios";

const PageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5500/admin/users", {});
      setUsers(response.data.data || response.data);
    } catch (error) {
      console.error("Gagal memuat data user:", error);
      alert("Gagal memuat data user. Cek konsol untuk detail.");
    } finally {
      setLoading(false);
    }
  };

  // Badge role dengan warna
  const getRoleBadge = (role) => {
    const colors = {
      superadmin: "is-danger",
      penjual: "is-primary",
      pembeli: "is-success",
      driver: "is-link",
    };
    return <span className={`tag ${colors[role] || "is-dark"}`}>{role}</span>;
  };

  // Status badge (opsional, jika ada status aktif/nonaktif)
  const getStatusBadge = (user) => {
    return <span className="tag is-success">Aktif</span>;
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div
        className="content"
        style={{ backgroundColor: "#f8f9fa", padding: "30px" }}
      >
        {/* Header */}
        <div style={{ marginBottom: "30px" }}>
          <h1 className="title is-3 has-text-dark">👥 Manajemen Pengguna</h1>
          <p className="subtitle is-6 has-text-grey">
            Kelola semua pengguna: admin, penjual, pembeli, dan driver
          </p>
        </div>

        {/* Tombol Tambah */}
        <div style={{ textAlign: "right", marginBottom: "20px" }}>
          <Link to="/add-user">
            <button className="button is-link">➕ Tambah Pengguna</button>
          </Link>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="has-text-centered">
            <p className="is-size-5 has-text-grey">Memuat data pengguna...</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="table is-fullwidth is-striped is-hoverable">
              <thead className="has-background-dark has-text-white">
                <tr>
                  <th>No</th>
                  <th>ID Kustom</th>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>
                        <code>{user.customId}</code>
                      </td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{getRoleBadge(user.role)}</td>
                      <td>{getStatusBadge(user)}</td>
                      <td>
                        <div className="buttons are-small">
                          {/* Lihat Detail */}
                          <Link to={`/user/${user.id}`}>
                            <button className="button is-light">
                              👁️ Lihat
                            </button>
                          </Link>

                          {/* Edit */}
                          <Link to={`/edit-user/${user.id}`}>
                            <button className="button is-info is-light">
                              ✏️ Edit
                            </button>
                          </Link>

                          {/* Hapus */}
                          <button
                            className="button is-danger is-light"
                            onClick={() => handleDelete(user.id, user.name)}
                          >
                            🗑️ Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="has-text-centered has-text-grey">
                      Belum ada pengguna yang terdaftar.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  // Fungsi Hapus User
  function handleDelete(id, name) {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus user: ${name}?`))
      return;

    axios
      .delete(`http://localhost:8082/api/users/${id}`, {
        // headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(() => {
        alert("User berhasil dihapus");
        fetchUsers(); // Refresh
      })
      .catch((error) => {
        console.error("Gagal hapus user:", error);
        alert("Gagal menghapus user. Cek konsol.");
      });
  }
};

export default PageUsers;
