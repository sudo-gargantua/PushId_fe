"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

// Dynamic import ToastProvider untuk menghindari hydration mismatch
const ToastProvider = dynamic(
  () => import("@/components/Toast").then((mod) => mod.ToastProvider),
  { ssr: false }
);

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
          @keyframes slide-in {
            from {
              opacity: 0;
              transform: translateX(100%);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          .animate-slide-in {
            animation: slide-in 0.3s ease-out;
          }
        `}</style>
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
