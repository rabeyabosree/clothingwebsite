import React from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../redux/reducer/wishlistReducer";

function ProductCard({ product, onAddToCart, handleClick }) {
  const dispatch = useDispatch();
  const wishlistProducts = useSelector((state) => state.wishlist.products);

  const handleAddToWishlist = (product) => {
    const isInWishlist = wishlistProducts.some((item) => item._id === product._id);

    if (isInWishlist) {
      dispatch(removeFromWishlist({ productId: product._id }));
    } else {
      dispatch(addToWishlist({ productId: product._id }));
    }
  };

  const isInWishlist = wishlistProducts.some((item) => item._id === product._id);

  return (
    <div
      onClick={() => handleClick(product._id)}
      className="relative bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-300 group"
    >
      {/* Top-right icons */}
      <div className="absolute top-3 right-3 flex gap-2 transition-opacity duration-300">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToWishlist(product);
          }}
          className="p-2 rounded-full shadow hover:bg-pink-100 transition"
        >
          <Heart
            size={18}
            className={`text-pink-600`}
            fill={isInWishlist ? "currentColor" : "none"}
          />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="p-2 rounded-full shadow hover:bg-pink-100 transition"
        >
          <ShoppingCart size={18} className="text-pink-600" />
        </button>
      </div>

      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-56 object-cover"
      />

      {/* Product Info */}
      <div className="p-4">
        <h2 className="text-base font-semibold text-gray-800 line-clamp-1">
          {product.name}
        </h2>
        <p className="text-sm text-gray-500 mt-1">{product.fabric}</p>
        <p className="text-lg font-bold text-pink-600 mt-2">৳{product.price}</p>
      </div>
    </div>
  );
}

export default ProductCard;
