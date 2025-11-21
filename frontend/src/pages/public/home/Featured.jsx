import React from "react";
import { FaShoppingBag, FaTruck, FaMoneyBillWave, FaUndo } from "react-icons/fa";

function Featured() {
  const features = [
    {
      icon: <FaShoppingBag className="text-4xl text-pink-500" />,
      title: "Shopping Area",
      desc: "Wide range of products available for you in various categories.",
    },
    {
      icon: <FaTruck className="text-4xl text-blue-500" />,
      title: "Delivery Time",
      desc: "Fast and reliable delivery to your doorstep in record time.",
    },
    {
      icon: <FaMoneyBillWave className="text-4xl text-green-500" />,
      title: "Payment System",
      desc: "Multiple payment options including Cash, bKash, Nagad, and Rocket.",
    },
    {
      icon: <FaUndo className="text-4xl text-yellow-500" />,
      title: "Return Policy",
      desc: "Easy returns and replacements within 7 days of purchase.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 duration-300"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="font-semibold text-lg sm:text-xl mb-2 text-gray-800">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Featured;
