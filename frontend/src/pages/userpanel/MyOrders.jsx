import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../../redux/reducer/orderReducer";
import { Check } from "lucide-react";

const statusSteps = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

function MyOrders() {
  const dispatch = useDispatch();
  const { orders = [], loading } = useSelector((state) => state.order);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  const toggleExpand = (id) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const renderStatusTracker = (currentStatus) => (
    <div className="flex flex-wrap items-center justify-start space-x-2 mt-2">
      {statusSteps.map((step, idx) => {
        const stepIndex = statusSteps.indexOf(currentStatus);
        const isActive = idx <= stepIndex;
        const isCancelled = currentStatus === "Cancelled" && idx === stepIndex;

        return (
          <div key={step} className="flex flex-col items-center mb-2">
            {/* Circle */}
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center
                ${isActive && !isCancelled ? "bg-green-500 text-white" : "bg-gray-300 text-gray-500"}
                ${isCancelled ? "bg-red-500 text-white" : ""}`}
            >
              {isActive && !isCancelled && <Check size={14} />}
              {isCancelled && "✕"}
            </div>

            {/* Connecting line */}
            {idx < statusSteps.length - 1 && (
              <div
                className={`w-12 h-1 ${idx < stepIndex ? "bg-green-500" : "bg-gray-300"} mt-1`}
              ></div>
            )}

            {/* Status name */}
            <span className="text-xs mt-1 text-center w-16 truncate">{step}</span>
          </div>
        );
      })}
    </div>
  );

  if (loading) {
    return <p className="text-center mt-10">Loading orders...</p>;
  }

  if (orders.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-600">
        You have no orders yet.
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 mt-16 h-[80vh] space-y-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        My Orders
      </h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="border rounded-lg bg-white shadow hover:shadow-lg transition cursor-pointer"
          onClick={() => toggleExpand(order._id)}
        >
          {/* Order summary */}
          <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
              <p className="font-semibold text-gray-700">
                Order ID: <span className="text-gray-500">{order._id}</span>
              </p>
              <p className="text-gray-600">
                Status: <span className="font-medium">{order.orderStatus}</span>
              </p>
            </div>
            <p className="text-gray-500 text-sm mt-2 md:mt-0">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Expanded details */}
          {expandedOrderId === order._id && (
            <div className="p-4 border-t space-y-4">
              {/* Status Tracker */}
              <div>
                <h2 className="font-semibold mb-2">Order Status</h2>
                {renderStatusTracker(order.orderStatus)}
              </div>

              {/* Shipping Address */}
              <div>
                <h2 className="font-semibold mb-1">Shipping Address</h2>
                <p>{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.phone}</p>
                <p>
                  {order.shippingAddress.area}, {order.shippingAddress.subDistrict}
                </p>
                <p>{order.shippingAddress.district}</p>
              </div>

              {/* Order Items */}
              <div>
                <h2 className="font-semibold mb-2">Items</h2>
                <div className="space-y-3">
                  {order.orderItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row items-center justify-between border p-2 rounded gap-2"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1 ml-0 sm:ml-4">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-600">৳{item.price}</p>
                      </div>
                      <div className="text-right">
                        <p>Qty: {item.quantity}</p>
                        <p className="font-semibold">
                          Total: ৳{item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment & Price Summary */}
              <div className="border-t pt-2 space-y-1">
                <p>
                  Payment Method: <span className="font-medium">{order.paymentMethod}</span>
                </p>
                <p>
                  Payment Status: <span className="font-medium">{order.paymentStatus}</span>
                </p>
                <p>Subtotal: ৳{order.itemsPrice}</p>
                <p>Delivery Fee: ৳{order.deliveryFee}</p>
                <p className="font-bold text-lg">Total: ৳{order.totalPrice}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
