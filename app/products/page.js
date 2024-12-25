"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); 

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get("category");
    if (categoryParam) {
      setCategory(categoryParam);
    }
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.post("/api/users/me");
        const data = res.data.data;
        setIsAdmin(data.isAdmin);
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
    };
  
    getUserData();
  }, []);

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
        setError("Error fetching products");
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

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/product/${id}/delete`);
      console.log("Product deleted successfully:", response.data);
      window.location.reload();
    } catch (error) {
      console.error(
        "Error deleting product:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div
      className="mx-auto max-w-7xl px-4 py-10"
    >
      <h1 className="mb-8 text-center text-2xl font-bold text-gray-800">
        Products
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products &&
          products.map((product, i) => (
            <div
              key={i}
              className="rounded-lg border  shadow-md transition-transform hover:scale-105"
            >
              {/* Product Image */}
              <img
                className="h-48 w-full object-contain p-4"
                src={product.image || "/placeholder.jpg"}
                alt={product.itemName || "Product"}
              />

              {/* Product Details */}
              <div className="p-4">
                <h2 className="mb-2 text-lg font-bold text-gray-800">
                  {product.itemName}
                </h2>
                <p className="mb-4 text-sm text-gray-600">
                  {product.description}
                </p>

                {/* Size and Price List */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Sizes and Prices:
                  </h3>
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

                {/* Delete Button */}
                {isAdmin &&(

                <button
                  onClick={() => handleDelete(product._id)}
                  className="w-full rounded bg-red-500 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600"
                >
                  Delete
                </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Product;
