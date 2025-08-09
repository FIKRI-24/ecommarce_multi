import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../layout/Sidebar"; // Pastikan path benar
import "bulma/css/bulma.min.css";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State form
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null); // File baru
  const [imagePreview, setImagePreview] = useState(""); // URL preview (dari API atau file baru)

  // Ambil data produk dari API
  const getProductById = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/admin/products/${id}`
      );
      const product = response.data;

      // Isi form dengan data dari API
      setName(product.name || "");
      setDescription(product.description || "");
      setPrice(product.price || "");
      setStock(product.stock || "");
      // Simpan URL gambar dari server untuk preview
      setImagePreview(product.image || ""); // Asumsi `image` adalah URL/file path
    } catch (error) {
      console.error("Error fetching product details:", error);
      alert("Gagal memuat data produk.");
    }
  }, [id]);

  useEffect(() => {
    getProductById();
  }, [getProductById]);

  // Handle perubahan file gambar
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Preview dari file lokal
    }
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", parseFloat(price));
    formData.append("stock", parseInt(stock));
    if (image) {
      formData.append("image", image); // Hanya kirim jika ada file baru
    }

    try {
      await axios.put(`http://localhost:5500/admin/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Produk berhasil diperbarui!");
      navigate("/products"); // Asumsi halaman daftar produk di /products
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Gagal memperbarui produk. Cek konsol untuk detail.");
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
          <h2 className="title has-text-centered has-text-primary">
            ✏️ Edit Produk
          </h2>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{ maxWidth: "700px", margin: "0 auto" }}
          >
            {/* Nama Produk */}
            <div className="field">
              <label className="label">Nama Produk</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama produk"
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

            {/* Gambar Produk */}
            <div className="field">
              <label className="label">Gambar Produk</label>
              <div className="control">
                <input
                  type="file"
                  className="input"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              {/* Preview Gambar */}
              {imagePreview && (
                <figure
                  className="image mt-3"
                  style={{ maxWidth: "300px", margin: "10px auto" }}
                >
                  <img
                    src={imagePreview}
                    alt="Preview Produk"
                    style={{
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      objectFit: "cover",
                    }}
                  />
                </figure>
              )}
            </div>

            {/* Submit Button */}
            <div className="field is-grouped is-grouped-right mt-5">
              <div className="control">
                <button type="submit" className="button is-success is-large">
                  ✅ Simpan Perubahan
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
