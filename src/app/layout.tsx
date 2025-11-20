import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// 1. 💡 Import the client-side store provider
import StoreProvider from "@/store/StoreProvider"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SOFWERX Headless Portal", // Updated title for context
  description: "High-performance, secure, and accessible portal built with Next.js and Headless WordPress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 2. ✅ Wrap the children with the StoreProvider */}
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}