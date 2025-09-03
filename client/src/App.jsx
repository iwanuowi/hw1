import { BrowserRouter, Routes, Route } from "react-router-dom";

import Products from "./pages/Products";
import ProductAdd from "./pages/ProductAdd";
import ProductEdit from "./pages/ProductEdit";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentVerify from "./pages/paymentVerify";
import OrdersPage from "./pages/OrdersPage";
import CategoriesPage from "./pages/categoryPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products/new" element={<ProductAdd />} />
        <Route path="/products/:id/edit" element={<ProductEdit />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/verify-payment" element={<PaymentVerify />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
