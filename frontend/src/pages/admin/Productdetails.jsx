import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleProduct } from "../../redux/reducer/productReducer";
import { ArrowLeft } from "lucide-react";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (id) {
      dispatch(getSingleProduct(id));
    }
  }, [dispatch, id]);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading product...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!product)
    return <p className="text-center mt-10 text-gray-600">No product found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-pink-600 hover:underline mb-6"
      >
        <ArrowLeft size={18} /> Back
      </button>

      {/* Product Card */}
      <div className="p-6 flex flex-col md:flex-row gap-6">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[400px] object-cover rounded-lg shadow-sm"
          />
        </div>

        {/* Info Section */}
        <div className="flex-1 space-y-3">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>

          <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {product.category}
            </p>
            <p>
              <span className="font-semibold">Fabric:</span>{" "}
              {product.fabric || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Price:</span> ৳{product.price}
            </p>
            <p>
              <span className="font-semibold">Stock:</span> {product.stock}
            </p>
            <p>
              <span className="font-semibold">Available:</span>{" "}
              {product.isAvailable ? (
                <span className="text-green-600 font-semibold">Yes</span>
              ) : (
                <span className="text-red-500 font-semibold">No</span>
              )}
            </p>
            <p>
              <span className="font-semibold">Created At:</span>{" "}
              {new Date(product.createdAt).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Updated At:</span>{" "}
              {new Date(product.updatedAt).toLocaleString()}
            </p>
          </div>

          {/* Sizes */}
          {product.sizes?.length > 0 && (
            <div>
              <h3 className="font-semibold mt-4">Available Sizes:</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className="px-3 py-1 border rounded-md bg-gray-50"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.colors?.length > 0 && (
            <div>
              <h3 className="font-semibold mt-4">Available Colors:</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    className="px-3 py-1 border rounded-md bg-gray-50"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
