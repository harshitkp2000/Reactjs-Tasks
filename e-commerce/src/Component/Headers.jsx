import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Bell,
  User,
  ShoppingBag,
  LogOut,
  ListOrdered,
  UserCircle2,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";

const Headers = () => {
  const [lengthOfCart, setLengthOfCart] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const cartLength = useSelector((store) => store.cart.cart.length);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    setLengthOfCart(cartLength);
  }, [cartLength]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-between items-center bg-gray-900 text-gray-100 shadow-md px-8 py-4 border-b border-gray-700 sticky top-0 z-10">
      <div
        className="text-2xl font-extrabold text-blue-400 tracking-wide flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <ShoppingBag size={32} className="text-blue-400" />
        <span className="hidden sm:inline">ShopEase</span>
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

      <div className="flex items-center gap-5 text-gray-300 relative">
        <button className="hover:text-blue-400 transition-colors duration-200">
          <Bell size={22} />
        </button>

        <Link
          to="/cart"
          className="relative hover:text-blue-400 transition-colors duration-200"
        >
          <ShoppingCart size={22} />
          {lengthOfCart > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
              {lengthOfCart}
            </span>
          )}
        </Link>

        <div ref={menuRef} className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="hover:text-blue-400 transition-colors duration-200"
          >
            <User size={22} />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-3 w-48 bg-gray-800 border border-gray-700 rounded-xl shadow-lg py-2 animate-fadeIn z-20">
              <Link
                to="/order"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 text-gray-200 transition-colors"
                onClick={() => setShowMenu(false)}
              >
                <ListOrdered size={18} className="text-blue-400" />
                My Orders
              </Link>
              <button
                className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-700 text-gray-200 transition-colors"
                onClick={() => setShowMenu(false)}
              >
                <UserCircle2 size={18} className="text-blue-400" />
                Profile
              </button>
              <button
                onClick={() => {
                  setShowMenu(false);
                }}
                className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-700 text-gray-200 transition-colors"
              >
                <LogOut size={18} className="text-blue-400" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Headers;
