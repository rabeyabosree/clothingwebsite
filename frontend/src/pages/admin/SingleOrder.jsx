import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderDetails } from "../../redux/reducer/orderReducer";
import { Check } from "lucide-react";

const statusSteps = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

function SingleOrder() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    if (id) dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  const renderStatusTracker = (currentStatus) => (
    <div className="flex items-center space-x-2 mt-2">
      {statusSteps.map((step, idx) => {
        const stepIndex = statusSteps.indexOf(currentStatus);
        const isActive = idx <= stepIndex;
        const isCancelled = currentStatus === "Cancelled" && idx === stepIndex;

        return (
          <div key={step} className="flex items-center">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center
                ${isActive ? "bg-green-500 text-white" : "bg-gray-300 text-gray-500"}
                ${isCancelled ? "bg-red-500 text-white" : ""}`}
            >
              {isActive && !isCancelled && <Check size={12} />}
              {isCancelled && "✕"}
            </div>
            {idx < statusSteps.length - 1 && (
              <div className={`w-10 h-0.5 ${isActive ? "bg-green-500" : "bg-gray-300"}`}></div>
            )}
          </div>
        );
      })}
    </div>
  );

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!order) return <p className="text-center mt-10 text-gray-500">Order not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800 text-center">Order Details</h1>

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-xl p-5 shadow-sm flex justify-between items-center">
        <div>
          <p className="text-gray-700 font-medium">Order ID: <span className="text-gray-500">{order._id}</span></p>
          <p className="text-gray-700 font-medium mt-1">Status:</p>
          {renderStatusTracker(order.orderStatus)}
        </div>
        <p className="text-gray-400 text-sm">{new Date(order.createdAt).toLocaleString()}</p>
      </div>

      {/* User & Shipping Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="font-semibold text-gray-700 mb-2">User Info</h2>
          <p className="text-gray-600"><strong>Name:</strong> {order.user?.name}</p>
          <p className="text-gray-600"><strong>Email:</strong> {order.user?.email}</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="font-semibold text-gray-700 mb-2">Shipping Address</h2>
          <p className="text-gray-600">{order.shippingAddress?.name}</p>
          <p className="text-gray-600">{order.shippingAddress?.phone}</p>
          <p className="text-gray-600">{order.shippingAddress?.area}, {order.shippingAddress?.subDistrict}</p>
          <p className="text-gray-600">{order.shippingAddress?.district}</p>
        </div>
      </div>

      {/* Items */}
      <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
        <h2 className="font-semibold text-gray-700 mb-2">Items</h2>
        {order.orderItems.map((item) => (
          <div key={item._id} className="flex items-center justify-between">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
            <div className="flex-1 ml-4 space-y-0.5">
              <p className="font-medium text-gray-700">{item.name}</p>
              <p className="text-gray-500">Price: ৳{item.price}</p>
              <p className="text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="font-semibold text-gray-700">৳{item.price * item.quantity}</p>
          </div>
        ))}
      </div>

      {/* Payment Summary */}
      <div className="bg-white rounded-xl p-4 shadow-sm space-y-1">
        <h2 className="font-semibold text-gray-700 mb-2">Payment Summary</h2>
        <p className="text-gray-600"><strong>Method:</strong> {order.paymentMethod}</p>
        <p className="text-gray-600"><strong>Status:</strong> {order.paymentStatus}</p>
        <p className="text-gray-600"><strong>Subtotal:</strong> ৳{order.itemsPrice}</p>
        <p className="text-gray-600"><strong>Delivery:</strong> ৳{order.deliveryFee}</p>
        <p className="font-bold text-gray-800"><strong>Total:</strong> ৳{order.totalPrice}</p>
      </div>
    </div>
  );
}

export default SingleOrder;
