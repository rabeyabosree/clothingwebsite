import React from "react";
import { FaShoppingBag, FaTruck, FaMoneyBillWave, FaUndo } from "react-icons/fa";

function Featured() {
  const features = [
    {
      icon: <FaShoppingBag className="text-3xl text-pink-500" />,
      title: "Shopping Area",
      desc: "Wide range of products available for you in various categories.",
    },
    {
      icon: <FaTruck className="text-3xl text-blue-500" />,
      title: "Delivery Time",
      desc: "Fast and reliable delivery to your doorstep in record time.",
    },
    {
      icon: <FaMoneyBillWave className="text-3xl text-green-500" />,
      title: "Payment System",
      desc: "Multiple payment options including Cash, bKash, Nagad, and Rocket.",
    },
    {
      icon: <FaUndo className="text-3xl text-yellow-500" />,
      title: "Return Policy",
      desc: "Easy returns and replacements within 7 days of purchase.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-16 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {features.map((feature, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center text-center p-4 transition"
        >
          <div className="mb-4">{feature.icon}</div>
          <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default Featured;
