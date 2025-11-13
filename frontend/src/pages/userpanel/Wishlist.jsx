import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getWishlist, removeFromWishlist } from "../../redux/reducer/wishlistReducer";
import { Trash } from "lucide-react";

function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  const handleGoToShop = (id) => {
    navigate(`/shop/${id}`);
  };

  const handleRemove = (id) => {
    dispatch(removeFromWishlist({ productId: id }));
  };

  return (
    <div className="h-135 max-w-6xl mx-auto px-4 py-8 mt-16">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col relative"
            >
              {/* Remove button */}
              <button
                onClick={() => handleRemove(product._id)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600 transition"
                title="Remove from wishlist"
              >
                <Trash size={18} />
              </button>

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4 cursor-pointer"
                onClick={() => handleGoToShop(product._id)}
              />
              <h2
                className="font-semibold text-lg mb-2 cursor-pointer"
                onClick={() => handleGoToShop(product._id)}
              >
                {product.name}
              </h2>
              <p className="text-pink-600 font-bold mb-2">৳ {product.price}</p>
              <p className="text-gray-600 text-sm mb-2">{product.category}</p>
              <p className="text-gray-500 text-xs mb-2">
                Sizes: {product.sizes.join(", ")}
              </p>
              <p className="text-gray-500 text-xs mb-4">
                Colors: {product.colors.join(", ")}
              </p>

              <button
                onClick={() => handleGoToShop(product._id)}
                className="mt-auto bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
