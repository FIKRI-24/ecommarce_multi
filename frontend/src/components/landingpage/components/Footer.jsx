import React from "react";

export default function Footer() {
  return (
    <>
      <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
        <div className="container py-5">
          <div
            className="pb-4 mb-4"
            style={{ borderBottom: "1px solid rgba(226, 175, 24, 0.5)" }}
          >
            <div className="row g-4">
              <div className="col-lg-6">
                <a href="/">
                  <h1 className="text-primary mb-0">Restoranku</h1>
                  <p className="text-secondary mb-0">
                    Pilihan Lezat di Ujung Jari Anda!
                  </p>
                </a>
              </div>
              <div className="col-lg-6">
                <div className="d-flex justify-content-end pt-3">
                  <a
                    className="btn  btn-outline-secondary me-2 btn-md-square rounded-circle"
                    href="https://www.instagram.com/multivendor/"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a
                    className="btn  btn-outline-secondary me-2 btn-md-square rounded-circle"
                    href="https://tiktok.com/@multivendor.com"
                  >
                    <i className="fab fa-tiktok"></i>
                  </a>
                  <a
                    className="btn btn-outline-secondary me-2 btn-md-square rounded-circle"
                    href="https://www.youtube.com/@multivendor"
                  >
                    <i className="fab fa-youtube"></i>
                  </a>
                  <a
                    className="btn btn-outline-secondary btn-md-square rounded-circle"
                    href="https://id.linkedin.com/company/multivendor"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-5">
            <div className="col-lg-4 col-md-6">
              <div className="footer-item">
                <h4 className="text-light mb-3">Mengapa orang suka!</h4>
                <p className="mb-4">
                  Kami menghadirkan kemudahan, pilihan menu terbaik, dan layanan
                  cepat yang membuat pengalaman kuliner Anda lebih menyenangkan!
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="footer-item">
                <h4 className="text-light mb-3">Hubungi Kami</h4>
                <p>
                  Alamat: Jl. Gunung Pangilun No.8, tunggul hitam, Kec. koto
                  Tengah, Kota padang, sumatra barat 40526
                </p>
                <p>Email: info@multivendor.com</p>
                <p>Telp: 0822-8794-0343</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="d-flex flex-column text-start footer-item">
                <h4 className="text-light mb-3">Metode Pembayaran</h4>
                <a className="btn-link" href="/">
                  QRIS
                </a>
                <a className="btn-link" href="/">
                  Tunai
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Copyright Start --> */}
      <div className="container-fluid copyright bg-dark py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <span className="text-light">
                <a href="/">
                  <i className="fas fa-copyright text-light me-2"></i>Restoranku
                </a>{" "}
                <span id="currentYear"></span>. All right reserved.
              </span>
            </div>
            <div className="col-md-6 my-auto text-center text-md-end text-white">
              Designed By{" "}
              <a className="border-bottom" href="https://htmlcodex.com">
                HTML Codex
              </a>{" "}
              Distributed By{" "}
              <a className="border-bottom" href="https://themewagon.com">
                ThemeWagon
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Copyright End --> */}
    </>
  );
}
