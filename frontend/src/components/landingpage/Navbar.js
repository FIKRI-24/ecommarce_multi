import React, { useEffect } from "react";
import "../../assets/css/landingsite.css";
import logo from "../../assets/images/logo.png";

const Navbar = () => {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".header_area");
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <header className="header_area">
        <nav className="navbar navbar-light bg-white navbar-expand-xl">
          <div className="container">
            <a className="navbar-brand logo_h" href="/landing-page">
              <img src={logo} alt="Logo" className="logo-image" />
            </a>
            <div
              className="collapse navbar-collapse offset"
              id="navbarSupportedContent"
            >
              <ul className="nav navbar-nav menu_nav ml-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="/landing-page">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/landing-products">
                    Shop
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#testimoni">
                    Review
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contact">
                    Contact
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    <i className="fa fa-search"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/buyer/home">
                    <i className="fa fa-shopping-cart"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    <i className="fa fa-user"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
