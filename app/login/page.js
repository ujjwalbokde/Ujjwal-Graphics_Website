"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';

function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState("")
  // Use React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Form submission handler
  const onSubmit = async (user) => {
    try {
        setIsLoading(true); 
        const response = await axios.post("/api/users/login", user);
        if(response.data.status===200){
          console.log("Login success", response.data);
          toast.success("Login success");
          router.push("/");
        }
        else{
          setError(response.data.message);
          console.log("Login failed "+ response.data.message);
        }

    } catch (error) {
        console.log("Login failed", error.message);
        toast.error(error.message);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      {/* Background Image Section */}
      <div className="h-full w-full">
        <img
          className="mx-auto h-full w-full object-cover"
          src="/login.png" // Ensure this image exists in the /public directory
          alt="Login Image"
        />
      </div>

      {/* Form Section */}
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 lg:py-24">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign in</h2>
          <p className="mt-2 text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-semibold text-black hover:underline">Create a free account</Link>
          </p>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <div>
              <label className="text-base font-medium text-gray-900">Email address</label>
              <input
                {...register('email', { 
                  required: "Email is required", 
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                    message: "Please enter a valid email address"
                  }
                })}
                type="email"
                className="mt-2 w-full h-10 rounded-md border px-3 py-2 text-sm placeholder-gray-400 focus:ring-1 focus:ring-gray-400"
                placeholder="Email"
                aria-label="Email address"
                aria-required="true"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>

            <div>
              <label className="text-base font-medium text-gray-900">Password</label>
              <input
                {...register('password', { 
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
                type="password"
                className="mt-2 w-full h-10 rounded-md border px-3 py-2 text-sm placeholder-gray-400 focus:ring-1 focus:ring-gray-400"
                placeholder="Password"
                aria-label="Password"
                aria-required="true"
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading} // Disable button while loading
                className={`inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold text-white hover:bg-black/80 ${isLoading ? 'cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Logging in...' : 'Get started'} <ArrowRight className="ml-2" size={16} />
              </button>
            </div>

            {error && (
              <h1 className=' text-center text-red-600'>{error}</h1>
            )}
          </form>

          {/* Google Sign-in Button */}
          <div className="mt-3 space-y-3">
            <button
              type="button"
              className="w-full flex items-center justify-center border bg-white px-3.5 py-2.5 text-gray-700 hover:bg-gray-100"
            >
              <span className="mr-2">
                <svg className="h-6 w-6 text-rose-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                </svg>
              </span>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
