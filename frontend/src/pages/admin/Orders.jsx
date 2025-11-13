import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders, updateOrderStatus } from "../../redux/reducer/orderReducer";
import { useNavigate } from "react-router-dom";

const statusOptions = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

function Orders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders = [], loading } = useSelector((state) => state.order);

  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  const filteredOrders = orders.filter((order) => {
    const matchStatus = filterStatus ? order.orderStatus === filterStatus : true;
    const matchDate = filterDate
      ? new Date(order.createdAt).toISOString().split("T")[0] === filterDate
      : true;
    return matchStatus && matchDate;
  });

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 ">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800 text-center">
        Admin Orders
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4 justify-center">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">All Status</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border px-2 py-1 rounded"
        />
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filteredOrders.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No orders found.</p>
        )}

        {filteredOrders.map((order) => (
          <div
            key={order._id}
            className="flex flex-col sm:flex-row justify-between items-center bg-white border rounded px-3 py-2 sm:py-3 hover:shadow cursor-pointer transition"
            onClick={() => navigate(`/dashboard/orders/${order._id}`)}
          >
            {/* Left: Image + Info */}
            <div className="flex items-center gap-3 w-full sm:w-auto mb-2 sm:mb-0">
              {order.orderItems[0]?.image && (
                <img
                  src={order.orderItems[0].image}
                  alt={order.orderItems[0].name}
                  className="w-12 h-12 object-cover rounded"
                />
              )}

              <div className="flex flex-col">
                <span className="font-semibold text-gray-700 truncate max-w-[150px]">
                  {order._id}
                </span>
                <span className="text-gray-600 text-sm">
                  {order.shippingAddress.name}
                </span>
              </div>
            </div>

            {/* Right: Price + Status + Date */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <span className="text-gray-600 text-sm sm:whitespace-nowrap">৳{order.totalPrice}</span>

              {/* Status dropdown wrapper with stopPropagation */}
              <div onClick={(e) => e.stopPropagation()}>
                <select
                  value={order.orderStatus}
                  onChange={(e) => dispatch(updateOrderStatus({ id: order._id, status: e.target.value }))}
                  className={`text-sm rounded px-2 py-1 border ${
                    order.orderStatus === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.orderStatus === "Cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <span className="text-gray-500 text-xs sm:whitespace-nowrap">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
