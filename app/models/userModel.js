import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpire: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});

// Check if the model already exists to avoid OverwriteModelError
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
