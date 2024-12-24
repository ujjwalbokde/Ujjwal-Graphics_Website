import { connect } from "@/app/dbConfig/dbConfig";
import Product from "@/app/models/productModel";
import { NextResponse } from "next/server";

connect();

export async function POST(req) {
  try {
    const body = await req.json();
    console.log(body);
    const { itemName, description, image, category, sizesAndPrices } = body;

    // Create a new product instance
    const newProduct = new Product({
      itemName,
      description,
      image,
      category,
      sizesPrices:sizesAndPrices,
    });

    const savedProduct=await newProduct.save();
    console.log(savedProduct);

    // Return a success response
    return NextResponse.json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json({ message: "An error occured while adding the product" })
  }
}
