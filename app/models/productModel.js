const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Trophies and Cups",
        "Medals",
        "Wooden Momentos",
        "Badges",
      ],
      required: true,
    },
    image: {
      type: String, 
      required: true,
    },
    sizesPrices: [
      {
        size: {
          type: String,
          required: true,
        },
        price: {
          type: Number, // Assuming price is a numeric value
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;

