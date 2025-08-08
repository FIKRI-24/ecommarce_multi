import "../../assets/css/landingsite.css";
import Navbar from "./Navbar";
import bannerImage from "../../assets/images/banner-veggies.jpg";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FeatureSection from "./section/FeatureSection";
// import TestimonialSection from "./section/TestimonialSection";

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [testimoni, setTestimoni] = useState([]);

  useEffect(() => {
    const getproducts = async () => {
      try {
        const response = await axios.get("http://localhost:8082/api/products");
        setProducts(response.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };
    getproducts();

    const getTestimoni = async () => {
      try {
        const response = await axios.get("http://localhost:8082/api/testimoni");
        setTestimoni(response.data);
      } catch (error) {
        console.error("Error fetching testimoni:", error);
      }
    };
    getTestimoni();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="mb-5">
      <Navbar />

      {/* Banner Section */}
      <section className="banner-section py-5 bg-light">
        <div className="banner-inner">
          <div className="container py-5">
            <div className="row py-5 align-items-center mb-4">
              {/* Text section */}
              <div className="col-md-6">
                <p className="text-warning fw-bold mb-2">100% Produk Organik</p>
                <h1 className="display-5 fw-bold text-success mb-3">
                  Semua Kebutuhan Sehat <br /> Dalam Satu Tempat
                </h1>
                <p className="text-muted mb-4">
                  Mulai dari sayuran segar, buah-buahan, hingga kebutuhan sehat
                  lainnya — semua ada di sini.
                </p>
                <div className="input-group w-75">
                  <input
                    type="text"
                    className="form-control rounded-start-pill px-4 py-2"
                    placeholder="Cari produk..."
                  />
                  <button className="btn btn-success rounded-end-pill px-4">
                    Belanja Sekarang
                  </button>
                </div>
              </div>

              {/* Image/Slider section */}
              <div className="col-md-6 text-center">
                <div className="position-relative">
                  <img
                    src={bannerImage}
                    alt="Produk Segar"
                    className="img-fluid rounded shadow"
                  />
                  <div className="position-absolute top-50 start-50 translate-middle bg-warning text-white px-4 py-2 rounded fw-bold">
                    Pilihan Terbaik Hari Ini
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Feature Section */}
      <FeatureSection />

      {/* Products Section */}
      <section className="kelas">
        <div className="container">
          <h2 className="text-center">Bestseller Products</h2>
          <p>
            Latin words, combined with a handful of model sentence structures,
            to generate Lorem Ipsum which looks reasonable.
          </p>
        </div>
      </section>

      {/* Row menampilkan produk populer */}
      <section className="video_section mb-5">
        <div className="container">
          <div className="row video">
            {/* Products Section */}
            <div className="col-md-4">
              <h3 className="text-center mb-2">Products</h3>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <div key={index}>
                    <img
                      src={product.sampul_product}
                      alt="Poster"
                      className="poster-image"
                    />
                    <h3 className="mt-2 mb-2">{product.judul_product}</h3>
                    <div className="d-flex justify-content-between">
                      <a href="/landing-product-detail" className="btn-detail">
                        <i className="fas fa-hand-point-right"></i> Detail
                      </a>
                      <p className="text-danger">
                        {formatPrice(product.harga_product)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">products tidak kosong</p>
              )}
            </div>

            <div className="text-center btn-akses">
              <Link to="/landing-products" className="btn-detail2 mx-2">
                <i className="fas fa-shopping-cart mr-1"></i> All Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="testi testimonials" id="testimoni">
        <div className="container">
          <div className="section-header">
            <h2 className="text-center">Our Testimonial</h2>
            <h1 className="text-center mb-5">Our Client Saying!</h1>

            <div className="testimonials-content">
              <Slider {...settings}>
                {testimoni
                  .reduce((acc, testi, index) => {
                    if (index % 2 === 0) {
                      acc.push([testi.sampul]);
                    } else {
                      acc[acc.length - 1].push(testi.sampul);
                    }
                    return acc;
                  }, [])
                  .map((slideImages, index) => (
                    <div
                      key={index}
                      className="testimonial-slide d-flex justify-content-between"
                    >
                      {slideImages.map((image, imgIndex) => (
                        <div key={imgIndex} className="testimonials-item">
                          <img
                            src={image}
                            alt={`Testimonial ${imgIndex + 1}`}
                            className="img-fluid"
                          />
                        </div>
                      ))}
                    </div>
                  ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>

      {/* TestimonialSection */}
      {/* <TestimonialSection /> */}

      <section>
        <Footer />
      </section>
    </div>
  );
};

export default LandingPage;
