import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/navbar";

// Load custom fonts
const geistSans = localFont({
  src: "/fonts/GeistVF.woff", // Ensure correct path
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "/fonts/GeistMonoVF.woff", // Ensure correct path
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Metadata for the application
export const metadata = {
  title: "Ujjwal Graphics", 
  description: "Ujjwal Graphics - A buisness website of awards like trophies, momentos, medals, etc.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/UG.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
