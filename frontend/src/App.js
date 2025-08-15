// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import ThemeProvider untuk Dark Mode
import { ThemeProvider } from "./context/ThemeContext";

// Import semua komponen Anda (sudah ada)
import DashboardAdmin from "./pages/DashboardAdmin";

// pages
import PageProfile from "./PageProfile";
// products
import PageProducts from "./pages/PageProducts";
import PageProductDetail from "./components/product/PageProductDetail";
import EditProducts from "./components/product/PageEditProduct";
import AddProducts from "./components/product/PageAddProduct";

// stores
import PageStores from "./pages/PageStores";
import PageAddStore from "./components/store/PageAddStore";
import PageEditStore from "./components/store/PageEditStore";
import PageStoreDetail from "./components/store/PageStoreDetail";

// payments
import PagePayments from "./pages/PagePayments";

// seller
import DashboardSeller from "./pages/seller/DashboardSeller";

// orders
import PageOrders from "./pages/PageOrders";

// users
import PageUsers from "./pages/PageUsers";
import AddUsers from "./components/user/AddUsers";
import EditUser from "./components/user/EditUsers";
import PageUserDetail from "./components/user/PageUsersDetail";

// landing pages
import LandingPage from "./components/landingpage/LandingPage";
import LandingPageProducts from "./pages/landingpage/LandingPageProducts";

// auth
import PageLogin from "./pages/PageLogin";
import PageRegister from "./pages/PageRegister";

// seller products
import MyProducts from "./pages/seller/MyProducts";
import CreateProduct from "./pages/seller/CreateProduct";
import EditProduct from "./pages/seller/EditProduct";

// seller orders
import MyOrders from "./pages/seller/MyOrders";
import OrderDetail from "./pages/seller/OrderDetail";

// driver
import DashboardDriver from "./pages/driver/DashboardDriver";

// buyer
import BuyerOrders from "./pages/buyer/BuyerOrders";
import BuyerOrderDetail from "./pages/buyer/BuyerOrderDetail";
import PageCart from "./pages/PageCart";
import ProductList from "./pages/buyer/ProductList";
import BuyerProfile from "./pages/buyer/BuyerProfile";
import Checkout from "./pages/buyer/Checkout";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          {/* ============== ADMIN ROUTES ============== */}
          <Route path="/admin/dashboard" element={<DashboardAdmin />} />
          <Route path="/admin/products" element={<PageProducts />} />
          <Route path="/admin/stores" element={<PageStores />} />
          <Route path="/admin/payments" element={<PagePayments />} />
          <Route path="/admin/profile" element={<PageProfile />} />

          {/* Products */}
          <Route path="/product/:id" element={<PageProductDetail />} />
          <Route path="/edit-Product/:id" element={<EditProducts />} />
          <Route path="/admin/add-Product" element={<AddProducts />} />

          {/* Stores */}
          <Route path="/admin/add-stores" element={<PageAddStore />} />
          <Route path="/admin/edit-stores/:id" element={<PageEditStore />} />
          <Route path="/admin/stores/:id" element={<PageStoreDetail />} />

          {/* Orders */}
          <Route path="/orders" element={<PageOrders />} />

          {/* Users */}
          <Route path="/admin/users" element={<PageUsers />} />
          <Route path="/admin/user/:id" element={<PageUserDetail />} />
          <Route path="/admin/add-user" element={<AddUsers />} />
          <Route path="/admin/edit-user/:id" element={<EditUser />} />

          {/* ============== LANDING PAGES ============== */}
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/landing-products" element={<LandingPageProducts />} />

          {/* ============== AUTH PAGES ============== */}
          <Route path="/login" element={<PageLogin />} />
          <Route path="/register" element={<PageRegister />} />

          {/* ============== SELLER ROUTES ============== */}
          <Route path="/seller/store" element={<DashboardSeller />} />
          <Route path="/seller/my-products" element={<MyProducts />} />
          <Route path="/seller/products/create" element={<CreateProduct />} />
          <Route path="/seller/products/edit/:id" element={<EditProduct />} />
          <Route path="/seller/my-orders" element={<MyOrders />} />
          <Route path="/seller/orders/:id" element={<OrderDetail />} />

          {/* ============== DRIVER ROUTES ============== */}
          <Route path="/driver/dashboard" element={<DashboardDriver />} />

          {/* ============== BUYER ROUTES ============== */}
          <Route path="/buyer/orders" element={<BuyerOrders />} />
          <Route path="/buyer/orders/:id" element={<BuyerOrderDetail />} />
          <Route path="/buyer/home" element={<PageCart />} />
          {/* ✅ Perbaikan: Tambahkan `/` di awal */}
          <Route path="/buyer/profile" element={<BuyerProfile />} />
          <Route path="/buyer/products" element={<ProductList />} />
          <Route path="/buyer/checkout" element={<Checkout />} />

          {/* ============== DEFAULT / FALLBACK ============== */}
          {/* Anda bisa tambahkan route untuk / */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
