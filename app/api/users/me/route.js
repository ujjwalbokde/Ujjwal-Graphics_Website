import { connect } from "@/app/dbConfig/dbConfig";
import User from "@/app/models/userModel";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/app/helpers/getDataFromToken";

// Ensure the database connection
connect();

export async function POST(req) {
    try {
        // Extract user ID from the token
        const userId = await getDataFromToken(req);
        console.log(userId);
        if (!userId) {
            throw new Error("Invalid or missing authentication token.");
        }

        // Find the user by ID, excluding the password field
        const user = await User.findById(userId).select("-password");

        if (!user) {
            throw new Error("User not found.");
        }

        // Return the user data
        return NextResponse.json({
            status: 200,
            data: user,
        });
    } catch (error) {
        console.error("Error in POST /user:", error.message);

        // Return an error response
        return NextResponse.json({
            status: 400,
            message: error.message,
        });
    }
}
