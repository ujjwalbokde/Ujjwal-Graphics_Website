import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = function (req) {
    try {
        // Retrieve the token from cookies
        const token = req.cookies.get('token')?.value || "";

        if (!token) {
            throw new Error("Token not found in cookies.");
        }

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

        if (!decodedToken || !decodedToken.id) {
            throw new Error("Invalid token.");
        }

        // Return the user ID from the token
        return decodedToken.id;
    } catch (error) {
        console.error("Error in getDataFromToken:", error.message);

        // Explicitly return null on error
        return null;
    }
};
