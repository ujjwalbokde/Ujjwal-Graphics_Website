import { connect } from "@/app/dbConfig/dbConfig";
import User from "@/app/models/userModel";
import { NextResponse } from "next/server";


// Ensure the database connection
connect();

export async function GET(req){
    try {
        const response=NextResponse.json({
            status: 200,
            message: "Logout Successfully"
        })

        response.cookies.set("token", "", { httpOnly: true ,expires: new Date(0)})

        return response;

    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: error.message
        })
    }
}