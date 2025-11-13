import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductCard from './../ProductCard';


function RelatedProducts({ currentProduct }) {
    const navigate = useNavigate();
    const { products = [] } = useSelector((state) => state.products);


    // ✅ Filter products with the same category but exclude current product
    const related = products.filter(
        (p) => p.category === currentProduct.category && p._id !== currentProduct._id
    );

    const handleClick = (id) => {
        navigate(`/shop/${id}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (related.length === 0) return null;

    return (
        <div className="max-w-6xl mx-auto p-6 mt-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Related Products</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {related.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        handleClick={handleClick}
                        onAddToCart={() => console.log("Add to cart:", product.name)}
                        onAddToWishlist={() => console.log("Wishlist:", product.name)}
                    />
                ))}
            </div>
        </div>
    );
}

export default RelatedProducts;
