import "./App.css";
import Headers from "./Components/Headers";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import your page components
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Products from "./Components/Products";
import ProductInfo from "./Components/ProductInfo";
import Cart from "./Components/Cart";

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
