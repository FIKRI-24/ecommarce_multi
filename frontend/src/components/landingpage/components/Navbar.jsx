import React from "react";

export default function Navbar() {
  return (
    <>
      <div className="container-fluid fixed-top">
        <div className="container px-0">
          <nav className="navbar navbar-light bg-white navbar-expand-xl">
            <a href="/" className="navbar-brand">
              <h1 className="text-primary display-6">Multivendor</h1>
            </a>
            <button
              className="navbar-toggler py-2 px-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="fa fa-bars text-primary"></span>
            </button>
            <div
              className="collapse navbar-collapse bg-white"
              id="navbarCollapse"
            >
              <div className="navbar-nav mx-auto">
                <a href="home" className="nav-item nav-link">
                  Home
                </a>
                <a href="menu.html" className="nav-item nav-link active">
                  Menu
                </a>
                <a href="kontak" className="nav-item nav-link">
                  Kontak
                </a>
              </div>
              <div className="d-flex m-3 me-0">
                <a href="/cart" className="position-relative me-4 my-auto">
                  <i className="fa fa-shopping-bag fa-2x"></i>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
      {/* // <!-- Single Page Header start --> */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Menu Kami</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item active text-primary">
            Silakan pilih menu favorit anda
          </li>
        </ol>
      </div>
      {/* // <!-- Single Page Header End --> */}
    </>
  );
}
