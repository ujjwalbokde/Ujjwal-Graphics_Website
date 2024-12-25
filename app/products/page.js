"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(null);

  // Get query parameters from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get("category"); // Get category from URL
    if (categoryParam) {
      setCategory(categoryParam); // Set category if found in URL
    }
  }, []); // This runs once after the component mounts

  // Fetch products based on the category
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/product/show?category=${category}`);
        const data = await response.json();
        
        if (response.ok) {
          setProducts(data.products);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchProducts();
    }
  }, [category]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error)
    return <p className="text-center py-10 text-red-500">Error: {error}</p>;

  return (
    <div
      className="mx-auto max-w-7xl px-4 py-10"
      style={{ backgroundColor: "#FFFDD0" }}
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products && products.map((product, i) => (
          <div
            key={i}
            className="rounded-lg border border-gray-400 bg-[#FFF7BF] shadow-md transition-transform hover:scale-105"
          >
            {/* Product Image */}
            <img
              src={
                product.image
              }
              alt={product.image || "Product"}
            />

            {/* Product Details */}
            <div className="p-4">
              <h1 className="text-lg font-bold text-gray-800">
                {product.itemName}
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                {product.description}
              </p>


              {/* Size and Price List */}
              <div className="mt-4">
                <h2 className="text-sm font-semibold text-gray-700">
                  Sizes and Prices:
                </h2>
                <ul className="mt-2 space-y-1 text-sm">
                  {product.sizesPrices?.map((sizePrice, index) => (
                    <li
                      key={index}
                      className="flex justify-between text-gray-600"
                    >
                      <span>{sizePrice.size}</span>
                      <span className="font-medium text-gray-800">
                        ₹{sizePrice.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
