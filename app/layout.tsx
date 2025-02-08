import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter, Dancing_Script, Great_Vibes, Parisienne } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dancingScript = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing-script" });
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-great-vibes" });
const parisienne = Parisienne({ subsets: ["latin"], weight: "400", variable: "--font-parisienne" });

export const metadata: Metadata = {
  title: "myproposal.❤️ - AI-Powered Love Story Crafting",
  description:
    "Transform your love story into an unforgettable moment with AI-powered proposal crafting.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dancingScript.variable} ${greatVibes.variable} ${parisienne.variable}`} suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen flex flex-col`}>
        <Providers>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster richColors position="top-right" />
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
