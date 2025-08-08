import React from "react";
import logo from "../../assets/images/logo.png";

const PageModalProducts = ({ isOpen, onClose, product }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          ×
        </span>
        <img src={logo} alt="Logo" className="modal-logo" />
        <h3>Detail product</h3>
        <h4>{product.judul_product}</h4>
        <p>{product.deskripsi_product}</p>
        <p className="text-danger">{product.harga_product}</p>
        <div className="modal-buttons">
          <button onClick={onClose} className="btn btn-secondary">
            Batal
          </button>
          <button className="btn btn-primary">Beli</button>
        </div>
      </div>
    </div>
  );
};

export default PageModalProducts;
