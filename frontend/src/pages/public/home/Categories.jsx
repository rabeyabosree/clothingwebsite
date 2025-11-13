import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/reducer/productReducer";
import { useNavigate } from "react-router-dom";

import kurt from "../../../assets/kurti.jpg";
import twopice from "../../../assets/2pce.jpg";
import threepice from "../../../assets/cotton2pice.jpg";
import partywear from "../../../assets/partywear.jpg";
import saree from "../../../assets/saree.jpg";

function Categories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products = [] } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const categoryImages = {
    partywear,
    saree,
    cotton2pc: twopice,
    cotton3pc: threepice,
    kurti: kurt,
  };

  const categories = [...new Set(products.map((p) => p.category))];

  const handleCategoryClick = (cat) => {
    navigate("/shop", { state: { selectedCategory: cat } });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 justify-items-center">
        {categories.map((cat) => (
          <div
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className="group flex flex-col items-center cursor-pointer"
          >
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-pink-400 shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
              <img
                src={categoryImages[cat]}
                alt={cat}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-3 text-lg font-medium text-gray-700 capitalize group-hover:text-pink-600">
              {cat.replace(/([a-z])([A-Z])/g, "$1 $2")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
