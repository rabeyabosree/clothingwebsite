import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../redux/reducer/orderReducer";
import { clearCart } from "../../redux/reducer/cartReducer";

function CheckOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.cart);

  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    phone: "",
    district: "",
    subDistrict: "",
    area: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [deliveryOption, setDeliveryOption] = useState("inside");

  const deliveryFee = deliveryOption === "inside" ? 60 : 120;

  const totalAmount = products.reduce((acc, item) => acc + item.price * item.quantity, 0) + deliveryFee;

  const handleInputChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    const orderData = {
      orderItems: products.map((p) => ({ product: p._id, name: p.name, image: p.image, price: p.price, quantity: p.quantity })),
      shippingAddress,
      paymentMethod,
      deliveryFee,
      totalAmount,
    };

    dispatch(createOrder(orderData))
      .unwrap()
      .then(() => {
        dispatch(clearCart(products))
        navigate("/orders");
      })
      .catch((err) => console.log(err));
  };

  // ✅ Utility for button styling
  const optionBtnStyle = (selected) =>
    `px-4 py-2 border rounded-md cursor-pointer ${selected ? "bg-blue-500 text-white border-blue-500" : "bg-white text-gray-700 border-gray-300"
    }`;

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-8 mt-22">
      {/* Left: Shipping Address & Payment */}
      <div className="md:w-2/3 space-y-6 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="name" placeholder="Full Name" value={shippingAddress.name} onChange={handleInputChange} className="border px-3 py-2 rounded w-full" />
          <input type="text" name="phone" placeholder="Phone" value={shippingAddress.phone} onChange={handleInputChange} className="border px-3 py-2 rounded w-full" />
          <input type="text" name="district" placeholder="District" value={shippingAddress.district} onChange={handleInputChange} className="border px-3 py-2 rounded w-full" />
          <input type="text" name="subDistrict" placeholder="Sub-District" value={shippingAddress.subDistrict} onChange={handleInputChange} className="border px-3 py-2 rounded w-full" />
          <input type="text" name="area" placeholder="Area" value={shippingAddress.area} onChange={handleInputChange} className="border px-3 py-2 rounded w-full md:col-span-2" />
        </div>

        <h2 className="text-2xl font-bold mt-6">Payment Method</h2>
        <div className="flex gap-2 mt-2">
          {["Cash on Delivery", "bKash", "Nagad", "Rocket"].map((method) => (
            <div key={method} onClick={() => setPaymentMethod(method)} className={optionBtnStyle(paymentMethod === method)}>
              {method}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mt-6">Delivery Option</h2>
        <div className="flex gap-2 mt-2">
          <div onClick={() => setDeliveryOption("inside")} className={optionBtnStyle(deliveryOption === "inside")}>
            Inside Dhaka (৳60)
          </div>
          <div onClick={() => setDeliveryOption("outside")} className={optionBtnStyle(deliveryOption === "outside")}>
            Outside Dhaka (৳120)
          </div>
        </div>
      </div>

      {/* Right: Order Summary */}
      <div className="md:w-1/3 space-y-4 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

        {/* Subtotal */}
        <div className="space-y-2">
          {products.map((item) => (
            <div key={item._id} className="flex justify-between">
              <span>{item.name} x {item.quantity}</span>
              <span>৳{item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <hr className="my-2" />

        {/* Subtotal */}
        <div className="flex justify-between font-semibold">
          <span>Subtotal</span>
          <span>৳{products.reduce((acc, item) => acc + item.price * item.quantity, 0)}</span>
        </div>

        {/* Delivery Fee */}
        <div className="flex justify-between font-semibold">
          <span>Delivery Fee</span>
          <span>৳{deliveryFee}</span>
        </div>

        {/* Total */}
        <div className="flex justify-between font-bold text-lg mt-2">
          <span>Total</span>
          <span>৳{totalAmount}</span>
        </div>

        {/* Buttons */}
        {paymentMethod !== "Cash on Delivery" && (
          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition mt-4">
            Pay Now
          </button>
        )}
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition mt-2"
        >
          Place Order
        </button>
      </div>

    </div>
  );
}

export default CheckOut;
