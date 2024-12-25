import { connect } from "@/app/dbConfig/dbConfig";
import Product from "@/app/models/productModel";

export async function DELETE(req, { params }) {
  await connect();

  const { id } = params; // Extract `id` from the dynamic route

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return new Response(JSON.stringify({ message: "Product not found" }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: "Product deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return new Response(JSON.stringify({ message: "Error deleting product" }), { status: 500 });
  }
}
