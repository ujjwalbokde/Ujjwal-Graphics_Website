"use client";
import React, { useEffect, useState } from "react";

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
    if (category) {
      const token=localStorage.getItem("token");
        const fetchProducts = async () => {
        try {
          const response = await fetch('https://ug-backend.onrender.com/api/products?filters[category][$eq]=Trophies%20and%20Cups&populate=image', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',  // Make sure the Content-Type is correct
            },
            credentials: 'include',  // If you're using cookies or sessions
          })
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setProducts(data.data); // Assuming Strapi returns `data` key with the products
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, [category]); // Re-run the effect when category changes

  const handleEdit = (id) => {
    console.log(`Edit product with ID: ${id}`);
    // Add your edit logic here
  };

  const handleDelete = (id) => {
    console.log(`Delete product with ID: ${id}`);
    // Add your delete logic here
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-500">Error: {error}</p>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10" style={{ backgroundColor: "#FFFDD0" }}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.length > 0 ? (
          products.map((product, i) => (
            <div
              key={i}
              className="rounded-lg border border-gray-400 bg-[#FFF7BF] shadow-md transition-transform hover:scale-105"
            >
              {/* Product Image */}
              <img
                src={`http://localhost:1337${product.image[0]?.url}`}
                alt={product.itemName}
                className="aspect-[13/9] w-full rounded-t-lg object-fill"
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
                    {product.sizePriceList.map((sizePrice, index) => (
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

                {/* Action Buttons */}
                {/* <div className="mt-6 flex items-center justify-between space-x-2">
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="w-1/2 rounded-md bg-[#FFD700] px-4 py-2 text-center text-gray-800 shadow-md transition hover:bg-[#FFC107] focus:outline-none"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="w-1/2 rounded-md bg-[#FF6F61] px-4 py-2 text-center text-white shadow-md transition hover:bg-[#FF5733] focus:outline-none"
                  >
                    Delete
                  </button>
                </div> */}
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-lg font-medium text-gray-500">
            No products found for this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default Product;
