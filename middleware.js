import { NextResponse } from 'next/server';

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  // Get the token from cookies
  const token = request.cookies.get('token')?.value || "";
  console.log("Token retrieved from cookies:", token);

  // If the user is trying to access /addproduct and they don't have a token, redirect to login
  if (path === '/addproduct' && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/addproduct'],
};
