import React, { useEffect } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/reducer/productReducer";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function NewArrivalSlider() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products = [] } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Get 10 newest products
  const newArrivals = products.slice(-10).reverse();

  // Slick slider settings
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4, // desktop
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2500,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 2 } },
  ],
};


  return (
    <div className="max-w-full mx-auto px-2 sm:px-4 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          New Arrivals
        </h2>
        <button
          onClick={() => navigate("/shop")}
          className="text-pink-600 hover:underline font-semibold text-sm sm:text-base"
        >
          See All →
        </button>
      </div>

      {/* Slider */}
      {newArrivals.length > 0 ? (
        <Slider {...settings}>
          {newArrivals.map((item) => (
            <div key={item._id} className="px-1">
              <div
                onClick={() => navigate(`/shop/${item._id}`)}
                className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition h-[250px] sm:h-[280px] md:h-[320px]"
              >
                <img
                  src={item.image?.url || item.image || "/placeholder.jpg"}
                  alt={item.name}
                  className="w-full h-32 sm:h-40 md:h-48 lg:h-56 object-cover"
                />
                <div className="p-2 sm:p-3">
                  <h3 className="font-semibold text-gray-800 text-sm sm:text-base md:text-lg truncate">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm capitalize">
                    {item.category}
                  </p>
                  <p className="text-pink-600 font-bold mt-1 text-sm sm:text-base">
                    ${item.price || "—"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-gray-500 text-center mt-8 text-sm sm:text-base">
          No new arrivals available.
        </p>
      )}
    </div>
  );
}

export default NewArrivalSlider;

