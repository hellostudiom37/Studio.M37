import type { Metadata } from "next";
import { delightSemibold, delightLight, instrumentSerif } from "./fonts";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Studio M.37 — Graphic & Brand Design Studio",
  description:
    "Studio M.37 designs brands that solve a real problem, stand out from the competition, and help sell what you're offering — clear, cohesive identity and design work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${delightSemibold.variable} ${delightLight.variable} ${instrumentSerif.variable} font-light-brand antialiased`}
      >
        <Nav logo={<Logo className="h-5 text-black" />} />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
