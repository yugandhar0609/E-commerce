import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import RegisterForm from "./components/RegisterForm";
import Login from "./components/Login";
import Category from "./components/pages/Category";
import Product from "./components/pages/Product";
import Cart from "./components/pages/Cart";
import Home from "./components/Home";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/register"];

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mens" element={<Category />} />
        <Route path="/womens" element={<Category />} />
        <Route path="/kids" element={<Category />} />
        <Route path="/product" element={<Product />}>
          <Route path=":productId" element={<Product />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
