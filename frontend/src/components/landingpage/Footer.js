import React from "react";
import logo from "../../assets/images/logo.png";
import payment from "../../assets/images/payment.png";
import "bootstrap-icons/font/bootstrap-icons.css";

const Footer = () => {
  return (
    <div className="footer" style={{ backgroundColor: "#45595B " }}>
      <footer
        className="footer py-3 py-xl-8"
        style={{ backgroundColor: "#45595B " }}
      >
        <div className="">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-12 col-md-11">
                <section className="py-4 py-md-5 py-xl-8">
                  <div className="container-fluid overflow-hidden">
                    <div className="row gy-4 gy-lg-0 justify-content-xl-between">
                      <div className="col-12 col-md-4 col-lg-3 col-xl-2">
                        <div className="widget">
                          <a href="#!">
                            <img
                              src={logo}
                              alt="Logo"
                              width="175"
                              height="57"
                            />
                          </a>
                        </div>
                      </div>
                      <div className="col-12 col-md-4 col-lg-3 col-xl-2">
                        <div className="widget">
                          <h4 className="widget-title mb-4 text-light fw-bold">
                            Links
                          </h4>
                          <ul className="list-unstyled">
                            <li className="mb-2">
                              <a
                                href="#!"
                                className="footer-link text-decoration-none"
                              >
                                Home
                              </a>
                            </li>
                            <li className="mb-2">
                              <a
                                href="#!"
                                className="footer-link text-decoration-none"
                              >
                                Daftar Products
                              </a>
                            </li>

                            <li className="mb-2">
                              <a
                                href="#!"
                                className="footer-link text-decoration-none"
                              >
                                Review
                              </a>
                            </li>
                            <li className="mb-2">
                              <a
                                href="#!"
                                className="footer-link text-decoration-none"
                              >
                                Contact Us
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-11 col-md-4 col-lg-3 col-xl-3">
                        <div className="widget">
                          <h4 className="widget-title mb-4 text-light fw-bold">
                            Contact Us
                          </h4>
                          <ul>
                            <li className="mb-2">
                              <a
                                href="mailto:vendor.hub@gmail.com"
                                className="footer-link text-decoration-none"
                              >
                                <i className="bi bi-envelope-fill"></i>{" "}
                                vendor.hub@gmail.com
                              </a>
                            </li>
                            <li className="mb-2">
                              <a
                                href="tel:+6282287940343"
                                className="footer-link text-decoration-none"
                              >
                                <i className="bi bi-telephone-fill"></i> +62
                                822-8794-0343
                              </a>
                            </li>
                            <li className="mb-2">
                              <a
                                href="https://www.instagram.com/vendor.hub"
                                className="footer-link text-decoration-none"
                              >
                                <i className="bi bi-instagram"></i> @vendor.hub
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-12 col-lg-3 col-xl-4">
                        <div className="widget">
                          <p className="mb-3 footer-link fw-bold">
                            Vendor-
                            <span className="text-success">
                              Hub
                            </span> <br></br> Your Marketplace, Unified!
                          </p>
                          <img src={payment} className="img-fluid" alt=""></img>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="py-4 py-md-5 py-xl-8 border-top border-light-subtle">
                  <div className="container-fluid overflow-hidden">
                    <div className="row gy-4 gy-md-0 align-items-md-center">
                      <div className="col-xs-12 col-md-7 order-1 order-md-0">
                        <div className="copyright text-center text-md-start text-light">
                          &copy; 2024. All rights reserved by Vendor-Hub.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
