// src/pages/buyer/ProductList.js
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/style.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:5500/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("❌ Gagal muat daftar produk:", err);
        if (err.response?.status === 401) {
          setError("Sesi habis. Silakan login ulang.");
          navigate("/login");
        } else {
          setError(
            err.response?.data?.message || "Gagal memuat produk. Coba lagi."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate]);

  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5500/cart",
        { productId, quantity: 1 },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Produk berhasil ditambahkan ke keranjang!");
    } catch (err) {
      console.error("❌ Gagal tambah ke keranjang:", err);
      alert(
        err.response?.data?.message ||
        "Gagal menambahkan ke keranjang. Coba lagi."
      );
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="content" style={{ padding: "30px" }}>
          <p>⏳ Memuat daftar produk...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="content">
        {/* Header */}
        <div className="content-header">
          <h1 className="title is-3 has-text-dark">Semua Produk</h1>
          <p>Temukan produk dari berbagai toko yang tersedia.</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="notification is-danger">
            <button className="delete" onClick={() => setError("")}></button>
            {error}
          </div>
        )}

        {/* Daftar Produk */}
        {products.length === 0 ? (
          <div className="has-text-centered py-6">
            <p className="has-text-grey">Tidak ada produk tersedia saat ini.</p>
          </div>
        ) : (
          <div className="columns is-multiline">
            {products.map((product) => (
              <div className="column is-3" key={product.id}>
                <div
                  className="box"
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Gambar Produk */}
                  <div className="mb-3 has-text-centered">
                    <figure
                      style={{
                        height: "180px",
                        overflow: "hidden",
                        borderRadius: "8px",
                      }}
                    >
                      <img
                        src={product.image || "https://via.placeholder.com/300"}
                        alt={product.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/300?text=No+Image";
                        }}
                      />
                    </figure>
                  </div>

                  {/* Detail Produk */}
                  <h3
                    className="title is-5"
                    style={{
                      flexGrow: 1,
                      display: "flex",
                      alignItems: "start",
                    }}
                  >
                    {product.name}
                  </h3>
                  <p className="has-text-weight-bold has-text-info">
                    Rp {product.price.toLocaleString()}
                  </p>
                  <p className="is-size-7 has-text-grey">
                    Stok:{" "}
                    <strong
                      className={
                        product.stock > 5
                          ? "has-text-success"
                          : product.stock > 0
                          ? "has-text-warning"
                          : "has-text-danger"
                      }
                    >
                      {product.stock}
                    </strong>
                  </p>
                  <p className="is-size-7">
                    Toko: <strong>{product.Store?.name || "Toko Tidak Dikenal"}</strong>
                  </p>

                  {/* Aksi */}
                  <div className="mt-3">
                    <button
                      className="button is-fullwidth is-primary is-small"
                      disabled={product.stock <= 0}
                      onClick={() => handleAddToCart(product.id)}
                    >
                      {product.stock <= 0 ? (
                        "Habis"
                      ) : (
                        <span>
                          <i className="fas fa-shopping-cart mr-1"></i>
                          Tambah ke Keranjang
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;