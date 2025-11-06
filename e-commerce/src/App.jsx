import "./App.css";
import Headers from "./Pages/Headers";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import your page components
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Products from "./Pages/Products";
import ProductInfo from "./Pages/ProductInfo";
import Cart from "./Pages/Cart";

function App() {
  return (
    <Router>
      <div className="App">
        <Headers />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product" element={<Products />} />
          <Route path="/product/:id" element={<ProductInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
