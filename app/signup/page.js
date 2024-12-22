// pages/signup.js (or another page you want this form to be on)
"use client"
import React from 'react';
import { useForm } from 'react-hook-form'; // Assuming you're using react-hook-form for form validation
import Link from 'next/link'; // Import next/link for routing
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm(); // Initialize react-hook-form
  const router=useRouter();
  const onSubmit = async (userData) => {
    try {
      const payload = {
        username: userData.name, // Change 'name' to 'username'
        email: userData.email,
        password: userData.password,
      };
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('User registered successfully:', data);
        router.push('/login'); // Redirect to login page on success
        return data;
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData.error.message);
      }
    } catch (error) {
      console.error('Error registering user:', error);
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
              <Link href="/login" className="font-medium text-black transition-all duration-200 hover:underline">Sign In
              </Link>
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
              <div>
                <label htmlFor="name" className="text-base font-medium text-gray-900">Full Name</label>
                <input
                  {...register("name", { required: "Full Name is required" })}
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
                  Create Account <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </form>

            {/* Google Sign Up Button */}
            <div className="mt-3 space-y-3">
              <button className="inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 hover:bg-gray-100">
                <span className="mr-2">
                  <svg className="h-6 w-6 text-rose-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                  </svg>
                </span>
                Sign up with Google
              </button>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="h-full w-full">
          <img
            className="mx-auto h-full w-full object-cover"
            src="/signup.png" // Ensure this image exists in the /public directory
            alt="Signup Image" 
          />
        </div>
      </div>
    </section>
  );
};

export default SignUp;
