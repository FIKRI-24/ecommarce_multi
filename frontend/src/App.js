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
import LandingPageCart from "./pages/landingpage/LandingPageCart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardAdmin />} />
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
        <Route path="/landing-cart" element={<LandingPageCart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
