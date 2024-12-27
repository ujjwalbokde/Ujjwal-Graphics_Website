import { connect } from "@/app/dbConfig/dbConfig";
import User from "@/app/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

// Ensure the database connection
connect();

export async function POST(req) {
  try {
    // Parse the JSON body
    const body = await req.json();
    console.log(body);
    const { username, email, password } = body;
    // Validate input
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Please fill all the fields" ,status: 400 },
      );
    }

    // Check if the user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { message: "Email already exists",status: 400  },
      );
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    // Log the saved user for debugging
    console.log(savedUser);

    // Respond with success
    return NextResponse.json(
      { message: "User registered successfully" , 
        status:200
      },
      
    );
  } catch (error) {
    // Handle errors
    return NextResponse.json(
      { message: error.message,status: 400  },
    );
  }
}
