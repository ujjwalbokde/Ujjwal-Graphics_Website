"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Define menu items
const menuItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Add state to track if user is admin
  const router = useRouter();

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      setIsLoggedIn(false);
      setIsAdmin(false); // Reset admin state
      setUser(null); // Clear user data
      router.push("/login");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const [user, setUser] = useState({ username: "", email: "" });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.post("/api/users/me");
        const data = res.data.data;
        setUser({
          username: data.username,
          email: data.email
        });
        setIsLoggedIn(true);
        setIsAdmin(data.isAdmin);
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
    };
  
    getUserData();
  }, []);
  

  return (
    <div className="bg-[#333333] w-full sticky top-0 z-50 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="inline-flex items-center space-x-2">
          <img src="/UG.png" alt="logo" width={32} height={32} />
          <span className="font-bold text-xl">Ujjwal Graphics</span>
        </div>

        {/* Desktop menu */}
        <div className="hidden grow items-start lg:flex">
          <ul className="ml-12 inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="inline-flex items-center text-lg pt-1 font-semibold text-gray-300 hover:text-gray-500"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {isAdmin && (
              <li>
                <Link
                  href="/addProduct"
                  className="inline-flex items-center text-lg pt-1 font-semibold text-gray-300 hover:text-gray-500"
                >
                  Add New Product
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Login/Logout buttons */}
        <div className="hidden space-x-2 lg:block text-gray-300">
          {isLoggedIn ? (
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="rounded-md bg-transparent px-3 py-2 text-md font-semibold text-gray-300 hover:bg-gray-300/10"
              >
                Log Out
              </button>
              <h2 className="mt-3/2 rounded-lg border p-1 pr-4 px-4 py-2 mx-2">{user?.email}</h2>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-md bg-transparent px-3 py-2 text-md font-semibold text-gray-300 hover:bg-gray-300/10"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="rounded-md border border-gray-300 px-3 py-2 text-md font-semibold text-gray-300 shadow-sm"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="lg:hidden">
          <Menu
            onClick={toggleMenu}
            className="h-6 w-6 cursor-pointer"
            aria-expanded={isMenuOpen ? "true" : "false"}
          />
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-[#333333] shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span className="font-bold">Ujjwal Graphics</span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-500 hover:text-gray-500"
                    >
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gold/10 mb-[1px]"
                      >
                        <span className="ml-3 text-base font-medium ">{item.name}</span>
                      </Link>
                    ))}
                    {isAdmin && (
                      <Link
                        href="/addProduct"
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gold/10 mb-[1px]"
                      >
                        <span className="ml-3 text-base font-medium">Add New Product</span>
                      </Link>
                    )}
                  </nav>
                </div>
                <div className="mt-5 space-y-2">
                  {isLoggedIn ? (
                    <div className="flex">
                      <button
                        onClick={handleLogout}
                        className="w-full rounded-md border border-white px-3 py-2 text-sm font-semibold shadow-sm"
                      >
                        Log Out
                      </button>
                      <h2 className="mt-3/2 rounded-lg border p-1 pr-4 px-4 py-2 mx-2">{user?.email}</h2>
                    </div>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="w-full rounded-md border border-white px-3 py-2 text-sm font-semibold shadow-sm"
                      >
                        Log In
                      </Link>
                      <Link
                        href="/signup"
                        className="w-full rounded-md bg-black px-3 mx-2 py-2 text-sm font-semibold text-white shadow-sm"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
