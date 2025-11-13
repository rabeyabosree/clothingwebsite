import React, { useEffect } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/reducer/productReducer";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function PopularProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products = [] } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // ✅ Get last 10 products sesher mane ei
  const popularProducts = products.slice(10, 20); 

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
           Popular Products
        </h2>
        <button
          onClick={() => navigate("/shop")}
          className="text-pink-600 hover:underline font-semibold"
        >
          See All →
        </button>
      </div>

      {/* Slider */}
      {popularProducts.length > 0 ? (
        <Slider {...settings}>
          {popularProducts.map((item) => (
            <div key={item._id} className="px-2">
              <div onClick={()=> navigate(`/shop/${item._id}`)} className="bg-white shadow-md rounded-lg overflow-hidden group cursor-pointer">
                <img
                  src={item.image?.url || item.image || "/placeholder.jpg"}
                  alt={item.name}
                  className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm capitalize">
                    {item.category}
                  </p>
                  <p className="text-pink-600 font-bold mt-1">
                    ${item.price || "—"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-gray-500 text-center mt-8">
          No popular products available.
        </p>
      )}
    </div>
  );
}

export default PopularProducts;
