import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/reducer/productReducer";
import FilterSidebar from "../../components/FilterSidebar";
import ProductCard from "../../components/ProductCard";
import { useLocation, useNavigate } from "react-router-dom";
import { addToCart } from "../../redux/reducer/cartReducer";

function AllProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { products = [], loading, error } = useSelector(
    (state) => state.products
  );

  const handleClick = (id) => {
    navigate(`/shop/${id}`)
  }

  const location = useLocation();

  const [selectedCategory, setSelectedCategory] = useState(
    location.state?.selectedCategory || ""
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // ---------- Filters ----------
  const [filters, setFilters] = useState({ sizes: [], colors: [] });

  const filteredProducts = products.filter((product) => {
    const sizeMatch =
      filters.sizes.length === 0 ||
      product.sizes.some((size) => filters.sizes.includes(size));

    const colorMatch =
      filters.colors.length === 0 ||
      product.colors.some((color) => filters.colors.includes(color));

    const categoryMatch =
      !selectedCategory || product.category === selectedCategory;

    return sizeMatch && colorMatch && categoryMatch;
  });

  // ---------- Pagination ----------
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ---------- Actions ----------
  const handleAddToCart = (product) => {
    console.log(product)
        const cartItem = {
          _id: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: 1,
        };
    
        dispatch(addToCart(cartItem))
        
  };




  // ---------- Loading / Error ----------
  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  // ---------- Render ----------
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 mt-18">
      {/* Sidebar */}
      <div className="w-full md:w-1/4">
        <FilterSidebar filters={filters} setFilters={setFilters} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </div>

      {/* Products + Pagination */}
      <div className="w-full md:w-3/4">
        {/* Product Grid */}
        {currentProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {currentProducts.map((product) => (
              <ProductCard
                key={product._id}
                handleClick={handleClick}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-20">
            No products found for selected filters.
          </p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-10 gap-3">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className={`px-4 py-2 rounded-md ${currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-pink-500 text-white hover:bg-pink-600"
                }`}
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded-md ${currentPage === i + 1
                    ? "bg-pink-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className={`px-4 py-2 rounded-md ${currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-pink-500 text-white hover:bg-pink-600"
                }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllProducts;
