import "./App.css";
import Headers from "./Component/Headers";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ProtectedRoute from "./Component/ProtectedRoute";

function App() {
  return (
    <Router>
      <MainRoutes />
      <ToastContainer position="top-center" autoClose={2000} />
    </Router>
  );
}

// 👇 THIS component will now be inside Router (VALID useLocation)
function MainRoutes() {
  const location = useLocation();

  // Pages where header should be hidden
  const hideHeaderRoutes = ["/", "/login", "/signup"];

  const hideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <div className="App">
      {!hideHeader && <Headers />}

      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product/:category/:id"
          element={
            <ProtectedRoute>
              <ProductInfo />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <OrderItem />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
