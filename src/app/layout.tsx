import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "GPS Drawing",
  description: "Draw your path on the map with GPS tracking",
  manifest: "/manifest.json",
  openGraph: {
    images: "/images/og-image.png",
    title: "GPS Drawing 🗺️",
    description: "Draw your path on the map with GPS tracking",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-dark-background text-text-primary flex flex-col">
        <Toaster />
        {children}
      </body>
    </html>
  );
}
