import { Link } from "react-router-dom";
import { ShoppingCart, Bell, User } from "lucide-react";

const Headers = () => {
  return (
    <div className="flex justify-between items-center bg-gray-900 text-gray-100 shadow-md px-8 py-4 border-b border-gray-700 sticky top-0 z-10">
      <div className="text-2xl font-extrabold text-blue-400 tracking-wide flex items-center gap-2">
        🛍️ MyShop
      </div>

      <ul className="flex gap-6 text-gray-300 font-medium">
        <li>
          <Link
            to="/"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/product"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Contact
          </Link>
        </li>
      </ul>

      <div className="flex items-center gap-5 text-gray-300">
        <button className="hover:text-blue-400 transition-colors duration-200">
          <Bell size={22} />
        </button>
        <Link
          to="/cart"
          className="hover:text-blue-400 transition-colors duration-200"
        >
          <ShoppingCart size={22} />
        </Link>
        <button className="hover:text-blue-400 transition-colors duration-200">
          <User size={22} />
        </button>
      </div>
    </div>
  );
};

export default Headers;
