import React from "react";
import { useNavigate } from "react-router-dom";
import img from "../../../assets/sales.png";

function Sales() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/shop")}
      className="w-full h-64 md:h-96 bg-contain bg-center rounded-lg cursor-pointer my-12"
      style={{ backgroundImage: `url(${img})` }}
    >
      {/* Optional overlay */}
      <div className="w-full h-full bg-black/10 rounded-lg"></div>
    </div>
  );
}

export default Sales;
