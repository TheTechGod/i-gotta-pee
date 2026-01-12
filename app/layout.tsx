// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "iGottaPee",
  description: "Find public bathrooms near you",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        {/* 
          Root layout owns structure.
          Pages render CONTENT ONLY.
        */}
        <div className="min-h-screen flex flex-col">
          {/* Main page content */}
          <div className="flex-1">
            {children}
          </div>

          {/* Global footer */}
          <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-500 bg-white">
            <a
              href="https://integrityprogramming.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-800 underline-offset-4 hover:underline"
            >
              Built by Integrity Programming
            </a>
          </footer>
        </div>
      </body>
    </html>
  );
}
