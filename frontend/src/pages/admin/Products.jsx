import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import { deleteProduct, getProducts } from "../../redux/reducer/productReducer";

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products = [], loading, error } = useSelector(
    (state) => state.products
  );

  const [filter, setFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(null);

  useEffect(()=>{
    dispatch(getProducts())
  },[dispatch])

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/products/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id))
      
    }
  };

  const filteredProducts =
    filter === "All"
      ? products
      : products.filter((item) => item.category === filter);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>

        <div className="flex items-center gap-4">
          {/* Filter */}
          <select
            value={filter}
            onChange={handleFilterChange}
            className="border px-3 py-1 rounded-md focus:outline-none"
          >
            <option value="All">All</option>
            {[...new Set(products.map((p) => p.category))].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Add New Product */}
          <button
            onClick={() => navigate("/dashboard/products/new")}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md transition"
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div
              key={item._id}
              className="relative border border-pink-600 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer bg-white"
            >
              {/* 3 Dot Menu */}
              <div
                className="absolute top-2 right-2 cursor-pointer p-1 hover:bg-gray-100 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(menuOpen === item._id ? null : item._id);
                }}
              >
                <MoreVertical size={20} />
              </div>

              {/* Dropdown Menu */}
              {menuOpen === item._id && (
                <div className="absolute top-8 right-2 bg-white border rounded-md shadow-lg text-sm z-10">
                  <button
                    onClick={() => handleEdit(item._id)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                  >
                    Delete
                  </button>
                </div>
              )}

              {/* Product Content */}
              <div
                onClick={() => navigate(`/dashboard/products/${item._id}`)}
                className="p-3"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h2 className="font-semibold mt-2">{item.title}</h2>
                <p className="text-sm text-gray-600">{item.category}</p>
                <p className="text-lg font-bold mt-1">${item.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}

export default Products;
