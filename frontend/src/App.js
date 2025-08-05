import DashboardAdmin from "./pages/DashboardAdmin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// products
import Products from "./pages/PageProducts";
import PageProductDetail from "./components/product/PageProductDetail";
import EditProducts from "./components/product/EditProduct";
import AddProducts from "./components/product/AddProduct";

// stores
import PageStores from "./pages/PageStores";
import AddStore from "./components/store/AddStore";
import EditStore from "./components/store/EditStore";

// payments
import PagePayments from "./pages/PagePayments";

// orders
import PageOrders from "./pages/PageOrders";

// users
import PageUsers from "./pages/PageUsers";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardAdmin />} />
        <Route path="/products" element={<Products />} />
        <Route path="/stores" element={<PageStores />} />
        <Route path="/payments" element={<PagePayments />} />

        {/* Products */}
        <Route path="/product/:id" element={<PageProductDetail />} />
        <Route path="/edit-Product/:id" element={<EditProducts />} />
        <Route path="/add-Product" element={<AddProducts />} />

        {/* Stores */}
        <Route path="/add-store" element={<AddStore />} />
        <Route path="/edit-store/:id" element={<EditStore />} />

        {/* Orders */}
        <Route path="/orders" element={<PageOrders />} />

        {/* Users */}
        <Route path="/users" element={<PageUsers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
