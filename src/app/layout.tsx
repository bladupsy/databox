import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Índice Macroeconómico",
  description: "Dashboard de indicadores macroeconómicos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold py-4">Indices Macroeconómicos - Consultora Eco-Data 360</h1>
            <Navbar />
          </div>
        </header>
        <main className="flex-1 container mx-auto">{children}</main>
      </body>
    </html>
  );
}