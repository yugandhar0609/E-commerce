import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import RegisterForm from "./components/RegisterForm";
import Login from "./components/Login";
import Category from "./components/pages/Category";
import Cart from "./components/pages/Cart";
import Home from "./components/Home";
import Footer from "./components/Footer";
import ShopContextProvider from "./Context/ShopContext";
import ScrollToTop from "./components/pages/ScrollToTop ";

// images
import bannerMens from "./assets/bannermens.png";
import bannerWomens from './assets/bannerwomens.png';
import bannerKids from './assets/bannerkids.png';
import UserProfile from "./components/pages/UserProfile";

// Lazy-loaded components
const Product = lazy(() => import("./components/pages/Product"));

function App() {
  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/register"];
  const hideFooterRoutes = ["/login", "/register"];

  return (
    <ShopContextProvider>
      <ScrollToTop />
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mens" element={<Category category="men" banner={bannerMens} />} />
        <Route path="/womens" element={<Category category="women" banner={bannerWomens} />} />
        <Route path="/kids" element={<Category category="kid" banner={bannerKids} />} />
        <Route path="/:category/product/:productId" element={<Suspense fallback={<div>Loading...</div>}><Product /></Suspense>} />
        <Route path="/product/:productId" element={<Suspense fallback={<div>Loading...</div>}><Product /></Suspense>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<UserProfile/>} />

      </Routes>
      {/* {!hideFooterRoutes.includes(location.pathname) && <Footer />} */}
    </ShopContextProvider>
  );
}

export default App;
