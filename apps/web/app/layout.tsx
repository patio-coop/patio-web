import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

const inter = localFont({
  src: [
    {
      path: "../public/fonts/Inter-VariableFont_opsz,wght.ttf",
      style: "normal"
    },
    {
      path: "../public/fonts/Inter-Italic-VariableFont_opsz,wght.ttf",
      style: "italic"
    }
  ],
  variable: "--font-inter",
  display: "swap"
});

const proFont = localFont({
  src: "../public/fonts/ProFontWindows.ttf",
  variable: "--font-profont",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Patio - A global network of tech cooperatives",
  description:
    "Patio is a global network of technology cooperatives bringing the latest technology in collaboration with you.",
  openGraph: {
    title: "Patio",
    description: "A global network of tech cooperatives",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${proFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
