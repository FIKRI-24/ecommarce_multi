// pages/EditStore.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Sidebar from "../layout/Sidebar"; // Pastikan path benar

import axios from "axios";

const EditStore = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [status, setStatus] = useState("approved");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const res = await axios.get(`http://localhost:8082/api/stores/${id}`);
        const store = res.data;
        setName(store.name);
        setStatus(store.status);
        setUserId(store.userId);
      } catch (error) {
        alert("Gagal memuat data toko");
      }
    };
    fetchStore();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8082/api/stores/${id}`, {
        name,
        status,
        userId,
      });
      alert("Toko berhasil diperbarui");
      navigate("/stores");
    } catch (error) {
      alert("Gagal memperbarui toko");
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content" style={{ padding: "30px" }}>
        <Link to="/stores">
          <button className="button is-warning mb-4">⬅️ Kembali</button>
        </Link>
        <h2 className="title has-text-centered">✏️ Edit Toko</h2>

        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: "500px", margin: "0 auto" }}
        >
          <div className="field">
            <label className="label">Nama Toko</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Status</label>
            <div className="control">
              <div className="select">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="approved">Disetujui</option>
                  <option value="suspended">Ditangguhkan</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">User ID Pemilik</label>
            <div className="control">
              <input
                className="input"
                type="number"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field is-grouped is-grouped-right mt-4">
            <div className="control">
              <button type="submit" className="button is-success">
                Update Toko
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStore;
