import { connect } from "@/app/dbConfig/dbConfig";
import Product from "@/app/models/productModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Connect to the database
    await connect();

    // Fetch products and convert them to plain objects
    const products = await Product.find({}).lean();

    // Ensure nested fields are JSON-safe
    const sanitizedProducts = products.map((product) => ({
      ...product,
      _id: product._id.toString(), // Convert ObjectId to string
      createdAt: product.createdAt.toISOString(), // Convert Date to string
      updatedAt: product.updatedAt.toISOString(), // Convert Date to string
    }));

    // Return sanitized products
    return NextResponse.json({ products: sanitizedProducts });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching products" },
      { status: 500 }
    );
  }
}
