import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../Redux/Slices/CartSlice";
import { Trash2, Plus, Minus, Star, Tag } from "lucide-react";
import { getPromoCodes } from "../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const [promoCode, setPromoCode] = useState("");
  const navigate = useNavigate();
  const [promoCodeData, setPromoCodeData] = useState({});
  const cartItems = useSelector((state) => state.cart.cart);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const discount = promoCodeData?.discountPercentage
    ? (totalPrice * promoCodeData.discountPercentage) / 100
    : 0;

  const finalTotal = totalPrice - discount;

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-950 text-gray-100 space-y-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="Empty Cart"
          className="w-48 h-48 opacity-90"
        />
        <h1 className="text-2xl md:text-3xl font-semibold">
          Your cart is empty !
        </h1>

        <button
          onClick={() => navigate("/product")}
          className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-2 rounded-full shadow-lg transition-all duration-300"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const validatePromoCode = async () => {
    const response = await getPromoCodes(promoCode);
    if (response) {
      setPromoCodeData(response);
      toast.success("Promo code applied successfully");
    } else {
      setPromoCodeData({});
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      <div className="space-y-4 max-w-4xl mx-auto">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-wrap md:flex-nowrap items-center justify-between bg-gray-800 p-4 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4 flex-1 min-w-[250px]">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-contain rounded-lg bg-gray-700 p-2"
              />
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold leading-tight line-clamp-2">
                  {item.title}
                </h2>
                <p className="text-blue-400 font-bold">${item.price}</p>
                <div className="flex items-center gap-1 text-yellow-400 text-sm">
                  <Star size={14} />
                  <span>{item.rate}</span>
                  <span className="text-gray-400 ml-2">
                    ({item.review || 120} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 mt-4 md:mt-0">
              <button
                onClick={() => dispatch(decreaseQuantity(item))}
                className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full"
              >
                <Minus size={16} />
              </button>
              <span className="w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => dispatch(increaseQuantity(item))}
                className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full"
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="flex items-center justify-end gap-4 mt-4 md:mt-0 min-w-[140px]">
              <p className="text-lg font-semibold text-blue-400">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => dispatch(removeFromCart(item))}
                className="text-red-500 hover:text-red-400 transition"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto mt-8 bg-gray-800 p-5 rounded-2xl shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Tag className="text-blue-400" />
          <input
            type="text"
            value={promoCode}
            placeholder="Enter Promo Code"
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1 md:w-60 p-2 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          onClick={validatePromoCode}
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition-all"
        >
          Apply
        </button>
      </div>
      <div className="max-w-4xl mx-auto mt-10 bg-gray-800 p-6 rounded-2xl shadow-lg space-y-3">
        <div className="flex justify-between text-lg">
          <span>Subtotal:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>

        {promoCodeData && (
          <div className="flex justify-between text-green-400 text-lg">
            <span>Discount ({promoCodeData.discountPercentage}%)</span>
            <span>- ${discount.toFixed(2)}</span>
          </div>
        )}

        <div className="border-t border-gray-600 my-2"></div>

        <div className="flex justify-between items-center text-xl font-bold">
          <span>Total:</span>
          <span className="text-blue-400">${finalTotal.toFixed(2)}</span>
        </div>

        <button
          className="w-full mt-4 bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-xl shadow-md transition-all text-lg"
          onClick={() =>
            navigate("/checkout", {
              state: {
                finalTotal,
                discount,
              },
            })
          }
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
