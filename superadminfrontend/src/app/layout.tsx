import type { Metadata } from "next";
import { Poppins, Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import { Toaster } from "./Components/ui/toaster";
// Primary soothing font for text
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

// Optional: for headings or code accents
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "GRC Developer Console",
  description: "Governance, Risk, and Compliance Platform",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable}  antialiased`}  //${geistSans.variable} ${geistMono.variable}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
