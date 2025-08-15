import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import axios from "axios";
import "bulma/css/bulma.min.css";

const PageProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "",
    photo: null,
    photoUrl: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [photoFile, setPhotoFile] = useState(null);

  const navigate = useNavigate();

  // Ambil data profil saat komponen mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Anda belum login.");
          navigate("/login");
          return;
        }

        const res = await axios.get("http://localhost:5500/admin/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;

        setProfile({
          name: data.name || "",
          email: data.email || "",
          role: data.role || "",
          photoUrl: data.photo ? `http://localhost:5500${data.photo}` : "",
        });
      } catch (err) {
        console.error("Gagal ambil profil:", err);
        setError("Gagal memuat profil. Cek koneksi atau login kembali.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Handle edit
  const handleEdit = () => {
    setIsEditing(true);
    setError("");
    setSuccess("");
  };

  // Handle cancel
  const handleCancel = () => {
    setIsEditing(false);
    setError("");
    setSuccess("");
    // Reset form ke nilai asli
    setPhotoFile(null);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      setError("Ukuran foto maksimal 2MB.");
      return;
    }
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({
        ...prev,
        photoUrl: reader.result,
      }));
    };
    reader.readAsDataURL(file);
    setError("");
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("email", profile.email);
    if (photoFile) {
      formData.append("photo", photoFile);
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:5500/admin/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess("Profil berhasil diperbarui!");
      setIsEditing(false);
      // Update lokal
      setProfile((prev) => ({
        ...prev,
        name: res.data.name,
        email: res.data.email,
        photoUrl: res.data.photo
          ? `http://localhost:5500${res.data.photo}`
          : "",
      }));
    } catch (err) {
      console.error("Gagal update profil:", err);
      setError(err.response?.data?.message || "Gagal menyimpan perubahan.");
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="content" style={{ padding: "30px" }}>
          <div className="has-text-centered">
            <p className="is-size-5 has-text-grey">Memuat profil...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Sidebar />

      <div
        className="content"
        style={{
          backgroundColor: "#f8f9fa",
          padding: "30px",
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "30px" }}>
          <h1 className="title is-3 has-text-dark">👤 Profil Admin</h1>
          <p className="subtitle is-6 has-text-grey">
            Kelola informasi pribadi Anda di sini
          </p>
        </div>

        {/* Alert */}
        {error && (
          <div className="notification is-danger is-light mb-4">
            <button className="delete" onClick={() => setError("")}></button>
            {error}
          </div>
        )}
        {success && (
          <div className="notification is-success is-light mb-4">
            <button className="delete" onClick={() => setSuccess("")}></button>
            {success}
          </div>
        )}

        {/* Profile Card */}
        <div className="card" style={{ maxWidth: "600px", margin: "auto" }}>
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-96x96">
                  <img
                    src={profile.photoUrl || "https://via.placeholder.com/96"}
                    alt="Foto Profil"
                    style={{
                      borderRadius: "50%",
                      border: "2px solid #007bff",
                      objectFit: "cover",
                    }}
                  />
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-4">{profile.name}</p>
                <p className="subtitle is-6">{profile.email}</p>
                <p className="has-text-grey">
                  Role: <strong>{profile.role}</strong>
                </p>
              </div>
            </div>

            <div className="content mt-4">
              {!isEditing ? (
                <div className="field is-grouped is-justify-content-flex-end">
                  <button className="button is-link" onClick={handleEdit}>
                    ✏️ Edit Profil
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <label className="label">Nama Lengkap</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        required
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input
                        className="input"
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        required
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Foto Profil</label>
                    <div className="file has-name is-fullwidth">
                      <label className="file-label">
                        <input
                          className="file-input"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          disabled={!isEditing}
                        />
                        <span className="file-cta">
                          <span className="file-icon">
                            <i className="fas fa-upload"></i>
                          </span>
                          <span className="file-label">Pilih foto...</span>
                        </span>
                        <span className="file-name">
                          {photoFile ? photoFile.name : "Belum ada foto"}
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="field is-grouped is-justify-content-flex-end mt-4">
                    <button
                      type="button"
                      className="button is-light"
                      onClick={handleCancel}
                      disabled={!isEditing}
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="button is-primary"
                      disabled={!isEditing}
                    >
                      Simpan Perubahan
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Back to Dashboard */}
        <div className="has-text-centered mt-5">
          <Link to="/admin/dashboard">
            <button className="button is-small is-light">
              ← Kembali ke Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageProfile;
