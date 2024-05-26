import RegisterForm from "./components/RegisterForm";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Category from "./components/pages/Category";
import Product from "./components/pages/Product";
import Cart from "./components/pages/Cart";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mens" element={<Category />} />
        <Route path="/womens" element={<Category />} />
        <Route path="/kids" element={<Category />} />
        <Route path="/product" element={<Product />}>
          <Route path=":productId" element={<Product />} />
        </Route>
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
