import type { Metadata } from "next";
import "./globals.css";
import Header from './components/Header';
import CookieBanner from './components/CookieBanner';
import { Analytics } from "@vercel/analytics/next";



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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Two Brothers",
              url: "https://twobrothers.digital",
              logo: "https://twobrothers.digital/logo.png",
              sameAs: [
                "https://instagram.com/twobrothers.studios",
                "https://tiktok.com/@twobrothers.studios",
              ],
            }),
          }}
        />
      </head>
      <body
        className=""
      >
        <Header />  
        {children}
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
