"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form"; // Assuming you're using react-hook-form for form validation
import Link from "next/link"; // Import next/link for routing
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm(); // Initialize react-hook-form
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")
  // Updated onSubmit function

  const onSubmit = async (user) => {
    try {
        setLoading(true)
        const response = await axios.post("/api/users/signup", user);
        if(response.data.status==200){
          console.log("User registered:", response.data);
          router.push("/login")
        }
        else{
          setError(response.data.message)
          console.log("Error in signUp "+ response.data.message);
        }
    } catch (error) {
      setError(error.message)
        console.error("Error registering user:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Something went wrong.");
    }finally{
      setLoading(false);
    }
};

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Form Section */}
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign up</h2>
            <p className="mt-2 text-base text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-black transition-all duration-200 hover:underline">
                Sign In
              </Link>
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
              <div>
                <label htmlFor="name" className="text-base font-medium text-gray-900">Full Name</label>
                <input
                  {...register("username", { required: "Full Name is required" })}
                  className="w-full h-10 mt-2 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                  type="text"
                  placeholder="Full Name"
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
              </div>

              <div>
                <label htmlFor="email" className="text-base font-medium text-gray-900">Email address</label>
                <input
                  {...register("email", { required: "Email is required" })}
                  className="w-full h-10 mt-2 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                  type="email"
                  placeholder="Email"
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
              </div>

              <div>
                <label htmlFor="password" className="text-base font-medium text-gray-900">Password</label>
                <input
                  {...register("password", { required: "Password is required" })}
                  className="w-full h-10 mt-2 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                  type="password"
                  placeholder="Password"
                />
                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
              </div>

              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold text-white hover:bg-black/80"
                >
                  {loading ? "Creating..." : "Create Account"}
                  <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
              {error && (
              <h1 className=' text-center text-red-600'>{error}</h1>
            )}
            </form>
          </div>
        </div>

        {/* Image Section */}
        <div className="h-full w-full">
          <img
            className="mx-auto h-full w-full object-cover"
            src="/signup.png"
            alt="Signup Image"
          />
        </div>
      </div>
    </section>
  );
};

export default SignUp;
