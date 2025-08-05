// pages/PageProductDetail.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PageProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`http://localhost:8082/api/products/${id}`);
      setProduct(res.data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div>Memuat...</div>;

  return (
    <div style={{ padding: "30px" }}>
      <h1 className="title">{product.judul_product || product.name}</h1>
      <p>
        <strong>Harga:</strong> Rp{" "}
        {(product.harga_product || product.price)?.toLocaleString("id-ID")}
      </p>
      <p>
        <strong>Stok:</strong> {product.stok || product.stock}
      </p>
      <p>
        <strong>Deskripsi:</strong>
      </p>
      <p style={{ whiteSpace: "pre-line" }}>
        {product.deskripsi_product || product.description || "-"}
      </p>
    </div>
  );
};

export default PageProductDetail;
