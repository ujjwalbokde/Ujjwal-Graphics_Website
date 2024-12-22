"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios"; // Import axios for making API requests
import { useRouter } from "next/navigation"; // useRouter for Next.js routing

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [sizePriceList, setSizePriceList] = useState([{ size: "", price: "" }]);
  const router = useRouter(); // useRouter for Next.js routing

  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data);

      const formData = new FormData();
      formData.append("files", data.image[0]);
      
      // Image upload request to Strapi
      const imageUploadRes = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Upload successful:", imageUploadRes.data);

      const uploadedImage = imageUploadRes.data[0];
      
      // Prepare product data
      const productData = {
        itemName: data.itemName,
        category: data.category,
        description: data.description,
        image: uploadedImage?.id || null,
        sizePriceList,
      };

      console.log("Product Data to be sent:", productData);

      // Make the POST request to Strapi
      const productRes = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        { data: productData },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
            "Content-Type": "application/json", // Make sure it's application/json
          },
        }
      );
      
      console.log("Product added successfully:", productRes.data);

      // Reset form and fields after submission
      reset();
      setSizePriceList([{ size: "", price: "" }]);
      alert("Product added successfully!");
      router.push("/"); // Redirect to the products page
    } catch (error) {
      console.error(
        "Error adding product:",
        error.response?.data || error.message || error
      );
      alert("Failed to add product");
    }
  };

  const handleSizePriceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedList = [...sizePriceList];
    updatedList[index][name] = value;
    setSizePriceList(updatedList);
  };

  const addSizePriceField = () => {
    setSizePriceList([...sizePriceList, { size: "", price: "" }]);
  };

  const removeSizePriceField = (index) => {
    const updatedList = sizePriceList.filter((_, i) => i !== index);
    setSizePriceList(updatedList);
  };

  return (
    <div className="flex justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg p-6 rounded-lg shadow-2xl"
      >
        <h1 className="text-center text-xl font-bold">Add New Item</h1>

        {/* Item Name */}
        <div className="mb-4">
          <label
            htmlFor="itemName"
            className="block text-sm font-medium text-gray-700"
          >
            Item Name:
          </label>
          <input
            type="text"
            id="itemName"
            {...register("itemName", { required: "Item name is required" })}
            className="mt-1 p-2 block w-full border rounded-md focus:ring-gold focus:border-gold"
          />
          {errors.itemName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.itemName.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category:
          </label>
          <select
  id="category"
  {...register("category", { required: "Category is required" })}
  className="mt-1 p-2 block w-full border rounded-md focus:ring-gold focus:border-gold"
>
  <option value="Trophies and Cups">Trophies and Cups</option>
  <option value="Medals">Medals</option>
  <option value="Wooden Momentos">Wooden Momentos</option>
  <option value="Badges">Badges</option>
</select>

          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            className="mt-1 p-2 block w-full border rounded-md focus:ring-gold focus:border-gold"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Image:
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
            className="mt-1 p-2 block w-full border rounded-md focus:ring-gold focus:border-gold"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Sizes and Prices */}
        <div className="mb-4">
          {sizePriceList.map((sizePrice, index) => (
            <div key={index} className="flex space-x-4 mb-4">
              {/* Size Input */}
              <div className="flex-1">
                <label
                  htmlFor={`size-${index}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Size:
                </label>
                <input
                  type="text"
                  name="size"
                  value={sizePrice.size}
                  onChange={(e) => handleSizePriceChange(index, e)}
                  className="mt-1 p-2 block w-full border rounded-md focus:ring-gold focus:border-gold"
                  required
                />
              </div>

              {/* Price Input */}
              <div className="flex-1">
                <label
                  htmlFor={`price-${index}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Price:
                </label>
                <input
                  type="text"
                  name="price"
                  value={sizePrice.price}
                  onChange={(e) => handleSizePriceChange(index, e)}
                  className="mt-1 p-2 block w-full border rounded-md focus:ring-gold focus:border-gold"
                  required
                />
              </div>

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeSizePriceField(index)}
                className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded mt-6"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addSizePriceField}
            className="w-full bg-amber-700 hover:bg-amber-900 p-2 my-2 rounded-md text-white mb-4"
          >
            Add Size and Price
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-400 hover:bg-gold/70 p-2 rounded-md"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
