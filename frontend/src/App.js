import DashboardAdmin from "./pages/DashboardAdmin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

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
// import LandingPageCart from "./pages/landingpage/LandingPageCart";

import PageLogin from "./pages/PageLogin";
import PageRegister from "./pages/PageRegister";

// seller products
import MyProducts from "./pages/seller/MyProducts";
import CreateProduct from "./pages/seller/CreateProduct";
import EditProduct from "./pages/seller/EditProduct";

// seller orders
import MyOrders from "./pages/seller/MyOrders";
import OrderDetail from "./pages/seller/OrderDetail";

// drivers
import DashboardDriver from "./pages/driver/DashboardDriver";

// buyer orders
import BuyerOrders from "./pages/buyer/BuyerOrders";
import BuyerOrderDetail from "./pages/buyer/BuyerOrderDetail";
// cart
import PageCart from "./pages/PageCart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* route admin */}
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
        <Route path="/products" element={<PageProducts />} />
        <Route path="/stores" element={<PageStores />} />
        <Route path="/payments" element={<PagePayments />} />

        {/* Products */}
        <Route path="/product/:id" element={<PageProductDetail />} />
        <Route path="/edit-Product/:id" element={<EditProducts />} />
        <Route path="/add-Product" element={<AddProducts />} />

        {/* Stores */}
        <Route path="/add-stores" element={<PageAddStore />} />
        <Route path="/edit-stores/:id" element={<PageEditStore />} />
        <Route path="/stores/:id" element={<PageStoreDetail />} />

        {/* Orders */}
        <Route path="/orders" element={<PageOrders />} />

        {/* Users */}
        <Route path="/users" element={<PageUsers />} />
        <Route path="/user/:id" element={<PageUserDetail />} />
        <Route path="/add-user" element={<AddUsers />} />
        <Route path="/edit-user/:id" element={<EditUser />} />

        {/* Landing Pages */}
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/landing-products" element={<LandingPageProducts />} />
        {/* <Route path="/landing-cart" element={<LandingPageCart />} /> */}

        {/* Login Page */}
        <Route path="/login" element={<PageLogin />} />
        <Route path="/register" element={<PageRegister />} />

        {/* Seller route */}
        <Route path="/seller/store" element={<DashboardSeller />} />
        <Route path="/seller/my-products" element={<MyProducts />} />
        <Route path="/seller/products/create" element={<CreateProduct />} />
        <Route path="/seller/products/edit/:id" element={<EditProduct />} />

        {/* Seller Orders */}
        <Route path="/seller/my-orders" element={<MyOrders />} />
        <Route path="/seller/orders/:id" element={<OrderDetail />} />
        {/* <Route path="/seller/products/:id" element={<PageProductDetail />} />  */}

        {/* drivers route */}
        <Route path="/driver/dashboard" element={<DashboardDriver />} />

        {/* Buyer Order Detail */}
        <Route path="/buyer/orders" element={<BuyerOrders />} />
        <Route path="/buyer/orders/:id" element={<BuyerOrderDetail />} />
        <Route path="/buyer/home" element={<PageCart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
