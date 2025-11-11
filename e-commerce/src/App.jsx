import "./App.css";
import Headers from "./Component/Headers";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Products from "./Pages/Products";
import ProductInfo from "./Pages/ProductInfo";
import Cart from "./Pages/Cart";
import { ToastContainer } from "react-toastify";
import Checkout from "./Pages/Checkout";
import Orders from "./Pages/Orders";
import OrderItem from "./Pages/OrderItem";

function App() {
  return (
    <>
      {" "}
      <Router>
        <div className="App">
          <Headers />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product" element={<Products />} />
            <Route path="/product/:category/:id" element={<ProductInfo />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order" element={<Orders />} />
            <Route path="/order/:id" element={<OrderItem />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default App;
