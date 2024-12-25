import { connect } from "@/app/dbConfig/dbConfig";
import Product from "@/app/models/productModel";
import { NextResponse } from "next/server";

connect();

export async function GET(req) {
  try {
    const category = req.nextUrl.searchParams.get("category");
    if (!category) {
      return NextResponse.json(
        { message: "Category is required" },
        { status: 400 }
      );
    }
    const products = await Product.find({ category });
    if (products.length === 0) {
      return NextResponse.json(
        { message: `No products found for category: ${category}` },
        { status: 404 }
      );
    }
    return NextResponse.json({
      status: 200,
      products:products,
  });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching products" },
      { status: 500 }
    );
  }
}
