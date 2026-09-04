import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "PEARL",
    template: "%s | PEARL",
  },
  description:
    "PEople Aligned Robots Lab — human-robot interaction research at UIC.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fraunces.variable}>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
