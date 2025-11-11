import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById, cancelOrder } from "../api/api";
import { toast } from "react-toastify";
import {
  Loader2,
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  XCircle,
} from "lucide-react";

const OrderItems = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const updatedOrder = await getOrderById(id);
      setOrder(updatedOrder);
    }, 3000);

    return () => clearInterval(interval);
  }, [id]);

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const data = await getOrderById(id);
      if (data) setOrder(data);
      else toast.error("Order not found");
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch order details");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    setIsCancelling(true);
    try {
      await cancelOrder(id);
      toast.success("Order cancelled successfully");
      await fetchOrder();
    } catch (err) {
      toast.error("Failed to cancel order");
    } finally {
      setIsCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-300">
        <Loader2 className="animate-spin mr-2" /> Loading order details...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-gray-400">
        <p>Order not found</p>
        <button
          className="mt-4 text-blue-400 hover:text-blue-300"
          onClick={() => navigate("/order")}
        >
          Go Back
        </button>
      </div>
    );
  }

  const stages =
    order.status === "CANCELLED"
      ? ["PENDING", "CANCELLED"]
      : ["PENDING", "SHIPPED", "DELIVERED"];
  const currentStageIndex = stages.indexOf(order.status);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <button
        onClick={() => navigate("/order")}
        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6"
      >
        <ArrowLeft size={18} /> Back to Orders
      </button>

      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Package className="text-blue-400" /> Order #{order.orderId}
      </h1>

      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-2xl shadow-md mb-8">
        <div className="space-y-2 text-gray-400 text-lg">
          <div className="flex justify-between">
            <span>Placed On:</span>
            <span className="text-gray-300">
              {new Date(order.placedTime).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Time:</span>
            <span className="text-gray-300">
              {new Date(order.deliveredTime).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Total Amount:</span>
            <span className="text-blue-400 font-semibold">
              ₹{order.totalAmount}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Discount:</span>
            <span className="text-green-400 font-semibold">
              ₹{order.discount}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Address:</span>
            <span className="text-gray-300 text-right max-w-xs">
              {order.address}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Status:</span>
            <span
              className={`font-semibold ${
                order.status === "CANCELLED"
                  ? "text-red-500"
                  : order.status === "DELIVERED"
                  ? "text-green-400"
                  : "text-yellow-400"
              }`}
            >
              {order.status}
            </span>
          </div>
        </div>

        {order.status === "PENDING" && (
          <button
            onClick={handleCancelOrder}
            disabled={isCancelling}
            className={`w-full mt-6 py-3 rounded-xl text-white font-semibold shadow-md transition-all ${
              isCancelling
                ? "bg-red-800 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-500"
            }`}
          >
            {isCancelling ? "Cancelling..." : "Cancel Order"}
          </button>
        )}

        {order.status === "CANCELLED" && (
          <div className="mt-6 text-center text-red-500 font-semibold">
            This order has been cancelled.
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto mb-10 bg-gray-800 p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Order Tracking
        </h2>

        <div className="relative flex justify-between items-center">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-700 -translate-y-1/2 z-0"></div>

          <div
            className={`absolute top-1/2 left-0 h-1 transition-all duration-500 z-0 ${
              order.status === "CANCELLED" ? "bg-red-500" : "bg-green-500"
            }`}
            style={{
              width: `${(currentStageIndex / (stages.length - 1)) * 100}%`,
            }}
          ></div>

          {stages.map((stage, index) => {
            const active = index <= currentStageIndex;
            const Icon =
              stage === "PENDING"
                ? Package
                : stage === "SHIPPED"
                ? Truck
                : stage === "DELIVERED"
                ? CheckCircle
                : XCircle;

            return (
              <div
                key={stage}
                className={`flex flex-col items-center z-10 ${
                  active
                    ? order.status === "CANCELLED"
                      ? "text-red-500"
                      : "text-green-400"
                    : "text-gray-500"
                }`}
              >
                <Icon size={28} />
                <span className="text-sm mt-2">{stage}</span>
              </div>
            );
          })}
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center">
        Items in this Order
      </h2>

      <div className="space-y-4 max-w-4xl mx-auto">
        {order.orderItems?.map((item) => (
          <div
            key={item.productId}
            className="flex flex-wrap md:flex-nowrap items-center justify-between bg-gray-800 p-4 rounded-2xl shadow-md hover:shadow-lg transition"
            onClick={() =>
              navigate(`/product/${item.category}/${item.productId}`)
            }
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
                <p className="text-gray-400 text-sm">{item.category}</p>
                <p className="text-blue-400 font-semibold">
                  ₹{item.price} × {item.quantity}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 mt-4 md:mt-0 min-w-[140px]">
              <p className="text-lg font-semibold text-green-400">
                ₹{(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItems;
