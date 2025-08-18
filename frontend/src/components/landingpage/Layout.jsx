import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto py-5">{children}</main>
      <Footer />
    </div>
  );
}
