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
      <body className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
        {/* Header */}
        <header className="border-b border-black bg-white">
          {/* 
            If you already render auth/user info here, keep it.
            This wrapper just adds the border + spacing.
          */}
          <div className="max-w-7xl mx-auto px-6 py-4">
            {/* existing header content lives here */}
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-black bg-white">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-sm text-gray-600">
            <span>
              Powered by{" "}
              <a
                href="https://integrityprogramming.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black underline-offset-4 hover:underline"
              >
                IntegrityProgramming.com
              </a>
            </span>

            <a
              href="/admin/login"
              className="hover:text-black underline-offset-4 hover:underline"
            >
              Admin
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
