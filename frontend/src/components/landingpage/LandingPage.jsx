import React from "react";
import Layout from "./Layout";
import AllProducts from "./AllProducts";

export default function LandingPage() {
  return (
    <Layout>
      <div className="container">
        <h1>Semua Produk</h1>
        <p>Ini isi konten produk kamu...</p>
        {/* di sini bisa taruh component ProductList, Card, dsb */}

        <AllProducts />
        {/* Atau bisa juga langsung menampilkan daftar produk */}
      </div>
    </Layout>
  );
}
