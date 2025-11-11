import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2, Package, ArrowRight } from "lucide-react";
import { AllOrders } from "../api/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await AllOrders();
        if (data && data.length > 0) {
          const sortedOrders = [...data].sort(
            (a, b) => new Date(b.placedTime) - new Date(a.placedTime)
          );
          setOrders(sortedOrders);
        }
      } catch (error) {
        console.error("Error fetching updated orders:", error);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await AllOrders();
        if (data && data.length > 0) {
          const sortedOrders = [...data].sort(
            (a, b) => new Date(b.placedTime) - new Date(a.placedTime)
          );
          setOrders(sortedOrders);
        } else {
          toast.info("No orders found.");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const navigateToOrderItem = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-300">
        <Loader2 className="animate-spin mr-2" /> Loading orders...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-100">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Package className="text-blue-400" /> My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-gray-400 text-center mt-20">
          No orders found. Start shopping now!
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="border border-gray-700 rounded-2xl bg-gray-800 shadow-md p-5 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
              onClick={() => navigate(`/order/${order.orderId}`)}
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold text-lg">
                  Order #{order.orderId}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "DELIVERED"
                      ? "bg-green-500/20 text-green-400"
                      : order.status === "PENDING"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="text-sm text-gray-400 space-y-1">
                <div className="flex justify-between">
                  <span>Placed on:</span>
                  <span className="text-gray-300 text-right">
                    {new Date(order.placedTime).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Total Amount:</span>
                  <span className="text-gray-300 text-right">
                    ₹{order.totalAmount}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Address:</span>
                  <span className="text-gray-300 text-right">
                    {order.address}
                  </span>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm"
                  onClick={() => navigateToOrderItem(order?.orderId)}
                >
                  View Details <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
