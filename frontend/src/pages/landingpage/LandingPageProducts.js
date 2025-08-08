import Footer from "../../components/landingpage/Footer";
import Navbar from "../../components/landingpage/Navbar";
import "../../assets/css/landingsite.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalDetail from "./PageModalProducts";
import logo from "../../assets/images/logo.png";

const LandingPageProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".header_area");
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };

    fetchProducts();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8082/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div>
      <header className="header_area">
        <Navbar />
        {/* <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <a className="navbar-brand logo_h" href="/">
              <img src={logo} alt="Logo" className="logo-image" />
            </a>
            <div className="collapse navbar-collapse offset">
              <ul className="nav navbar-nav menu_nav ml-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="/landing-page">
                    Beranda
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/landing-products">
                    Shop
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Saya
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Masuk / Daftar
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav> */}
      </header>

      <section className="daftar-kelas">
        <div className="container">
          <div className="card-full">
            <div className="card-content-see">
              <h1 className="card-title-see">Produk Kami</h1>
              <p className="card-subtitle text-center">
                Temukan berbagai produk berkualitas yang dapat menunjang
                kebutuhan Anda. Mulai dari video edukasi, e-book, hingga paket
                kelas online.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container search">
          <form method="POST" action="" className="input-group mb-3">
            <input
              type="text"
              name="search"
              placeholder="Cari produk..."
              className="form-control rounded"
            />
            <button type="submit" className="btn btn-outline-primary">
              Cari
            </button>
          </form>
        </div>
      </section>

      <section className="kelas_section mb-5">
        <div className="container">
          <div className="row mt-5">
            {products.map((product, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card">
                  <img
                    src={product.sampul_product || product.image}
                    alt="Produk"
                    className="poster-image card-img-top"
                  />
                  <div className="card-body">
                    <h3 className="card-title">
                      {product.judul_product || product.name}
                    </h3>
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        onClick={() => openModal(product)}
                        className="btn btn-primary"
                      >
                        Detail
                      </button>
                      <p className="text-danger mb-0">
                        {formatPrice(product.harga_product || product.price)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {products.length === 0 && (
              <div className="col-12 text-center text-muted">
                <p>Produk belum tersedia.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <ModalDetail
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedProduct}
      />

      <section>
        <Footer />
      </section>
    </div>
  );
};

export default LandingPageProducts;
