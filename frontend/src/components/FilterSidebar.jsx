import React from "react";

function FilterSidebar({ filters, setFilters, selectedCategory, setSelectedCategory }) {
  const handleSizeChange = (size) => {
    setFilters((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleColorChange = (color) => {
    setFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
  };

  const handleCategoryChange = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(""); // Deselect if clicked again
    } else {
      setSelectedCategory(category);
    }
  };

  const allCategories = ["partywear", "saree", "cotton2pc", "cotton3pc", "kurti"];
  const allSizes = ["S", "M", "L", "XL"];
  const allColors = ["Red", "Blue", "Green"];

  return (
    <div className="bg-white shadow-md rounded-lg p-5 w-full md:w-64">
      <h3 className="text-lg font-semibold mb-3">Filters</h3>

      {/* 🏷️ Category Filter */}
      <div className="mb-5">
        <h4 className="font-medium text-gray-700 mb-2">Categories</h4>
        <div className="flex flex-wrap gap-2">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`capitalize px-3 py-1 rounded-md border text-sm transition ${
                selectedCategory === cat
                  ? "bg-pink-500 text-white border-pink-500"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Show selected category + clear button */}
        {selectedCategory && (
          <div className="mt-3 flex items-center justify-between bg-pink-50 px-3 py-2 rounded-md border border-pink-200">
            <p className="text-sm text-pink-600 capitalize">
              Selected: {selectedCategory}
            </p>
            <button
              onClick={() => setSelectedCategory("")}
              className="text-xs text-red-500 font-semibold hover:underline"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* 👕 Size Filter */}
      <div className="mb-5">
        <h4 className="font-medium text-gray-700 mb-2">Sizes</h4>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((size) => (
            <button
              key={size}
              onClick={() => handleSizeChange(size)}
              className={`px-3 py-1 rounded-md border ${
                filters.sizes.includes(size)
                  ? "bg-pink-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* 🎨 Color Filter */}
      <div>
        <h4 className="font-medium text-gray-700 mb-2">Colors</h4>
        <div className="flex flex-wrap gap-2">
          {allColors.map((color) => (
            <div
              key={color}
              onClick={() => handleColorChange(color)}
              className={`w-6 h-6 rounded-full cursor-pointer border-2 transition ${
                filters.colors.includes(color)
                  ? "border-pink-500 scale-110"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilterSidebar;
