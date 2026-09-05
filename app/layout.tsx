import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import "./globals.css";

const serif = Source_Serif_4({
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
  icons: {
    icon: [{ url: "/pearl-logo.png", type: "image/png" }],
    apple: [{ url: "/pearl-logo.png", type: "image/png" }],
    shortcut: "/pearl-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={serif.variable}>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
