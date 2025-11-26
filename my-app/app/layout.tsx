import type { Metadata } from "next";
import "./globals.css";
import Header from './components/Header';



export const metadata: Metadata = {
  title: "Two Brothers Steetwear",
  description: "Two Brothers is a modern streetwear brand rooted in the past, built on minimalist silhouettes, functional designs, and off-white/off-black aesthetics. Explore our hoodies, tees, and more!",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className=""
      >
        <Header />  
        {children}
      </body>
    </html>
  );
}
