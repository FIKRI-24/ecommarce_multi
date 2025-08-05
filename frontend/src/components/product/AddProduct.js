import axios from "axios";
import Sidebar from "../layout/Sidebar"; // Pastikan path benar
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bulma/css/bulma.min.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState(null); // untuk sampul produk
  const [storeId, setStoreId] = useState(""); // bisa diisi otomatis nanti
  const [userId, setUserId] = useState(""); // bisa dari login
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", parseFloat(price));
    formData.append("stock", parseInt(stock));
    formData.append("storeId", parseInt(storeId));
    formData.append("userId", parseInt(userId));
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post("http://localhost:8082/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Produk berhasil ditambahkan");
      navigate("/products"); // Asumsi route daftar produk adalah /products
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Gagal menambahkan produk. Cek konsol untuk detail.");
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="content section">
        <div className="container">
          {/* Tombol Kembali */}
          <Link to="/products">
            <button className="button is-warning mb-4">⬅️ Kembali</button>
          </Link>

          {/* Judul */}
          <h2 className="title has-text-centered has-text-info">
            ➕ Tambah Produk Baru
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Nama Produk */}
            <div className="field">
              <label className="label">Nama Produk</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Laptop Gaming XYZ"
                  required
                />
              </div>
            </div>

            {/* Deskripsi */}
            <div className="field">
              <label className="label">Deskripsi</label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Jelaskan produk secara singkat..."
                  rows="4"
                ></textarea>
              </div>
            </div>

            {/* Harga */}
            <div className="field">
              <label className="label">Harga (Rp)</label>
              <div className="control">
                <input
                  type="number"
                  className="input"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Contoh: 15000000"
                  min="0"
                  required
                />
              </div>
            </div>

            {/* Stok */}
            <div className="field">
              <label className="label">Stok</label>
              <div className="control">
                <input
                  type="number"
                  className="input"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  min="0"
                  placeholder="Jumlah stok tersedia"
                />
              </div>
            </div>

            {/* Gambar Sampul */}
            <div className="field">
              <label className="label">Gambar Produk</label>
              <div className="control">
                <input
                  type="file"
                  className="input"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>

            {/* Store ID (bisa disembunyikan nanti jika otomatis) */}
            <div className="field">
              <label className="label">Store ID</label>
              <div className="control">
                <input
                  type="number"
                  className="input"
                  value={storeId}
                  onChange={(e) => setStoreId(e.target.value)}
                  placeholder="ID toko (dari login)"
                  required
                />
              </div>
            </div>

            {/* User ID (bisa disembunyikan nanti jika otomatis) */}
            <div className="field">
              <label className="label">User ID</label>
              <div className="control">
                <input
                  type="number"
                  className="input"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="ID penjual (dari login)"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="field is-grouped is-grouped-right mt-5">
              <div className="control">
                <button type="submit" className="button is-success is-large">
                  ✅ Simpan Produk
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
