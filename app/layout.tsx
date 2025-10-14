import type React from "react";
import { Orbitron, VT323 } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-vt323",
});

export const metadata = {
  title: "CaseFiles - AI Crime Simulator",
  description: "AI Crime Scene Simulator by Wevolve",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${vt323.variable} antialiased`}
    >
      <body className="bg-gradient-to-r from-[#f8f8ff] to-[#eaeaff]">
        {children}

        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
