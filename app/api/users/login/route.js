import { connect } from "@/app/dbConfig/dbConfig";
import User from "@/app/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"


// Ensure the database connection
connect();

export async function POST(req){
    try {
        const body = await req.json();
        const { email, password } = body;

        const user=await User.findOne({email})

        if(!user){
            return NextResponse.json({
                status: 401,
                message: "Invalid email or password",
                data: null
            });
        }
        const validPassword=await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({
                status: 401,
                message: "Invalid email or password",
                data: null
            });

        }

        const tokenData={
            id:user._id,
            username:user.username,
            email:user.email
        }

        const token=jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn:"1d"})

        const response= NextResponse.json({
            status: 200,
            message: "Login Successful",
        });

        response.cookies.set("token", token, { httpOnly: true })

        return response;
        
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: error.message,
            data: null
        })
    }
}