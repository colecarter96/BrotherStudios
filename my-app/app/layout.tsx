import type { Metadata } from "next";
import "./globals.css";
import Header from './components/Header';



export const metadata: Metadata = {
  title: "Brother Studios",
  description: "Two Brothers Making Stuff",
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
