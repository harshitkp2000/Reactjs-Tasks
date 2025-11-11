import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { placeOrder } from "../api/api";
import { clearCart } from "../Redux/Slices/CartSlice";

const Checkout = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cart);
  const [address, setAddress] = useState("");
  if (!state || cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-gray-200">
        <h2 className="text-xl font-semibold mb-4">No items to checkout.</h2>
        <button
          onClick={() => navigate("/product")}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const { finalTotal, discount } = state;

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      toast.error("Please enter your shipping address");
      return;
    }

    const orderData = {
      orderItems: cartItems.map((item) => ({
        productId: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        category: item.category,
      })),
      totalAmount: finalTotal,
      discount: discount,
      status: "PENDING",
      address: address,
    };

    try {
      const response = await placeOrder(orderData);

      dispatch(clearCart());
      localStorage.removeItem("cartState");

      toast.success("Order placed successfully!");
      navigate("/order");
    } catch (error) {
      console.error("Error while placing order:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-2xl shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
        <textarea
          className="w-full p-3 rounded-lg bg-gray-700 text-gray-100 outline-none focus:ring-2 focus:ring-blue-400"
          rows="4"
          placeholder="Enter your full address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-2xl shadow-md space-y-3">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b border-gray-700 pb-2"
          >
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-gray-400">
                {item.quantity} × ${item.price.toFixed(2)}
              </p>
            </div>
            <span className="text-blue-400 font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}

        <div className="flex justify-between text-lg mt-4">
          <span>Discount:</span>
          <span className="text-green-400">- ${discount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-xl font-bold border-t border-gray-600 pt-3">
          <span>Total Amount:</span>
          <span className="text-blue-400">${finalTotal.toFixed(2)}</span>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full mt-6 bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-xl shadow-md transition-all text-lg"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
