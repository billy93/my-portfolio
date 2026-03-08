import type { Metadata } from "next";
import { Syne, JetBrains_Mono, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Andreas Billy Sutandi | Fullstack Developer",
  description:
    "Fullstack Developer specializing in Next.js, React, React Native, and Java. Building modern web & mobile experiences.",
  keywords: [
    "fullstack developer",
    "web developer",
    "react",
    "next.js",
    "java",
    "react native",
    "portfolio",
  ],
  authors: [{ name: "Andreas Billy Sutandi" }],
  openGraph: {
    title: "Andreas Billy Sutandi | Fullstack Developer",
    description:
      "Fullstack Developer specializing in Next.js, React, React Native, and Java.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} bg-zinc-950 font-sans text-white antialiased`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
