// pages/PageUsers.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import axios from "axios";

const PageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // State untuk modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5500/admin/users");
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

  // Status badge
  const getStatusBadge = (user) => {
    return <span className="tag is-success">Aktif</span>;
  };

  // Handle klik tombol hapus
  const handleDeleteClick = (id, name) => {
    setSelectedUserId(id);
    setSelectedUserName(name);
    setShowConfirmModal(true);
  };

  // Fungsi hapus user
  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5500/admin/users/${selectedUserId}`);
      setShowConfirmModal(false);
      setShowSuccessModal(true);
      fetchUsers(); // Refresh daftar user

      // Tutup modal sukses setelah 2 detik
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 2000);
    } catch (error) {
      console.error("Gagal menghapus user:", error);
      alert("Gagal menghapus user. Cek konsol untuk detail.");
      setShowConfirmModal(false);
    }
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

        {/* Tabel Pengguna */}
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
                          <Link to={`/user/${user.id}`}>
                            <button className="button is-light">
                              👁️ Lihat
                            </button>
                          </Link>
                          <Link to={`/edit-user/${user.id}`}>
                            <button className="button is-info is-light">
                              ✏️ Edit
                            </button>
                          </Link>
                          <button
                            className="button is-danger is-light"
                            onClick={() =>
                              handleDeleteClick(user.id, user.name)
                            }
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

      {/* Modal Konfirmasi Hapus */}
      {showConfirmModal && (
        <div className="modal is-active">
          <div
            className="modal-background"
            onClick={() => setShowConfirmModal(false)}
          ></div>
          <div className="modal-content">
            <div className="box">
              <p
                className="has-text-centered"
                style={{ fontSize: "1.2rem", marginBottom: "20px" }}
              >
                <span
                  style={{
                    fontSize: "2rem",
                    color: "red",
                    marginRight: "10px",
                  }}
                >
                  ✖️
                </span>
                Apakah Anda yakin ingin menghapus user:{" "}
                <strong>{selectedUserName}</strong>?
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  marginTop: "20px",
                }}
              >
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="button"
                >
                  Batal
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="button is-danger"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={() => setShowConfirmModal(false)}
          ></button>
        </div>
      )}

      {/* Modal Sukses Hapus */}
      {showSuccessModal && (
        <div className="modal is-active">
          <div
            className="modal-background"
            onClick={() => setShowSuccessModal(false)}
          ></div>
          <div className="modal-content">
            <div className="box has-text-centered">
              <p
                style={{
                  fontSize: "1.5rem",
                  color: "green",
                  marginBottom: "10px",
                }}
              >
                ✔️
              </p>
              <p>User berhasil dihapus!</p>
            </div>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={() => setShowSuccessModal(false)}
          ></button>
        </div>
      )}
    </div>
  );
};

export default PageUsers;
