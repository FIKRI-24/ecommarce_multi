import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import axios from "axios";

const PageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8082/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Gagal memuat data produk.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus produk ini?"))
      return;

    try {
      await axios.delete(`http://localhost:5500/api/products/${id}`);
      alert("Produk berhasil dihapus.");
      getProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Gagal menghapus produk.");
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
          <h1 className="title is-3 has-text-dark">🛒 Product Management</h1>
          <p className="subtitle is-6 has-text-grey">
            Kelola produk e-commerce Anda dengan mudah
          </p>
        </div>

        {/* Add Product Button */}
        <div style={{ textAlign: "right", marginBottom: "20px" }}>
          <Link to="/add-product">
            <button className="button is-link">➕ Tambah Produk</button>
          </Link>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="has-text-centered">
            <p className="is-size-5 has-text-grey">Memuat data produk...</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="table is-fullwidth is-striped is-hoverable">
              <thead className="has-background-dark has-text-white">
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Harga</th>
                  <th>Stok</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product, index) => (
                    <tr key={product.id_product || product.id}>
                      <td>{index + 1}</td>
                      <td style={{ maxWidth: "200px" }}>
                        {product.judul_product || product.name || "-"}
                      </td>
                      <td>
                        <strong>
                          Rp{" "}
                          {(
                            product.harga_product || product.price
                          )?.toLocaleString("id-ID") || "0"}
                        </strong>
                      </td>
                      <td>
                        <span
                          className={`tag ${
                            (product.stok || product.stock) <= 10
                              ? "is-danger"
                              : "is-success"
                          }`}
                        >
                          {product.stok || product.stock || 0}
                        </span>
                      </td>
                      <td>
                        <div className="buttons are-small">
                          {/* Tombol Lihat */}
                          <Link
                            to={`/product/${product.id_product || product.id}`}
                          >
                            <button className="button is-light">
                              👁️ Lihat
                            </button>
                          </Link>

                          {/* Edit */}
                          <Link
                            to={`/edit-product/${
                              product.id_product || product.id
                            }`}
                          >
                            <button className="button is-info is-light">
                              ✏️ Edit
                            </button>
                          </Link>

                          {/* Hapus */}
                          <button
                            className="button is-danger is-light"
                            onClick={() =>
                              handleDelete(product.id_product || product.id)
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
                    <td colSpan="5" className="has-text-centered has-text-grey">
                      Belum ada produk yang ditambahkan.
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
};

export default PageProducts;
