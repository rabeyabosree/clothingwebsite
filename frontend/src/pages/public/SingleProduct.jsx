import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleProduct } from "../../redux/reducer/productReducer";
import RelatedProducts from "../../components/common/RelatedProducts";
import Reviews from "../../components/common/Reviews";
import { addToCart, updateQuantity } from "../../redux/reducer/cartReducer";

function SingleProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading, error } = useSelector((state) => state.products);
  const cartProducts = useSelector((state) => state.cart.products);

  //  Find product in cart if already added
  const cartItem = cartProducts.find((item) => item._id === id);

  //  Local quantity for new product not in cart yet
  const [localQuantity, setLocalQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(getSingleProduct(id));
    }
  }, [dispatch, id]);

  //  Always show correct quantity (from Redux or local)
  const quantity = cartItem ? cartItem.quantity : localQuantity;

  //  Handle quantity increase/decrease
  const handleQuantityChange = (type) => {
    if (cartItem) {
      // Update Redux store directly
      let newQty = cartItem.quantity;
      if (type === "inc") newQty += 1;
      if (type === "dec" && newQty > 1) newQty -= 1;

      dispatch(updateQuantity({ productId: product._id, quantity: newQty }));
    } else {
      // Update local state if not in cart yet
      if (type === "inc" && localQuantity < (product?.stock || 10))
        setLocalQuantity((prev) => prev + 1);
      if (type === "dec" && localQuantity > 1)
        setLocalQuantity((prev) => prev - 1);
    }
  };

  // ✅ Add to cart handler
  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    navigate("/cart");
  };

  const handleBuyNow = () => {
    console.log("💳 Buy Now:", product?.name, "Quantity:", quantity);
  };

  // ✅ Loading & Error states
  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!product) return null;

  return (
    <div className="mt-18">
      <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[500px] rounded-lg object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.fabric}</p>
          <p className="text-xl font-semibold mt-2">৳{product.price}</p>
          <p className="text-gray-700 mt-2">{product.description}</p>

          {/* Sizes */}
          <div className="mt-4">
            <p className="font-medium">Available Sizes:</p>
            <div className="flex gap-2 mt-2">
              {product.sizes?.map((size) => (
                <span
                  key={size}
                  className="px-3 py-1 border rounded-md text-gray-700"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="mt-4">
            <p className="font-medium">Colors:</p>
            <div className="flex gap-2 mt-2">
              {product.colors?.map((color) => (
                <span
                  key={color}
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: color.toLowerCase() }}
                ></span>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-4 flex items-center gap-4">
            <p className="font-medium">Quantity:</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange("dec")}
                className="px-3 py-1 border rounded-md"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => handleQuantityChange("inc")}
                className="px-3 py-1 border rounded-md"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Reviews & Related Products */}
      <Reviews id={id} />
      <RelatedProducts currentProduct={product} />
    </div>
  );
}

export default SingleProduct;
