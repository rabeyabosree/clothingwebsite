import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/reducer/cartReducer";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.cart);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, type) => {
    dispatch(updateQuantity({ id, type }));
  };

  if (products.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600 h-[90vh] flex items-center justify-center">
        🛒 Your cart is empty.
      </div>
    );
  }

  const totalAmount = products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto h-h-135 flex flex-col p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Cart</h2>

      {/* Cart Items Scrollable */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {products.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between p-4 border rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600 text-sm">Price: ৳{item.price}</p>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => handleQuantityChange(item._id, "dec")}
                    className="px-2 py-1 border rounded hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item._id, "inc")}
                    className="px-2 py-1 border rounded hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <p className="font-semibold">৳{item.price * item.quantity}</p>
              <button
                onClick={() => handleRemove(item._id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total Section */}
      <div className="mt-4 border-t pt-4">
        <div className="text-right text-xl font-semibold text-gray-800">
          Total: ৳{totalAmount.toLocaleString()}
        </div>

        {/* Proceed Button */}
        <div className="mt-4 text-right">
          <button
            onClick={() => navigate("/checkout")}
            className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
