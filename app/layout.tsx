import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Inter, Dancing_Script, Great_Vibes, Parisienne } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dancingScript = Dancing_Script({ 
  subsets: ["latin"], 
  variable: "--font-dancing-script",
  display: "swap" 
});
const greatVibes = Great_Vibes({ 
  subsets: ["latin"], 
  weight: "400", 
  variable: "--font-great-vibes",
  display: "swap" 
});
const parisienne = Parisienne({ 
  subsets: ["latin"], 
  weight: "400", 
  variable: "--font-parisienne",
  display: "swap" 
});

// Keywords optimization for proposals and Valentine's Day
const keywords = [
  "proposal ideas",
  "marriage proposal",
  "romantic proposal",
  "Valentine's Day proposal",
  "how to propose",
  "creative proposal ideas",
  "AI proposal generator",
  "proposal planner",
  "romantic valentine ideas",
  "proposal message generator",
  "unique proposal ideas",
  "custom proposal writing",
  "digital proposal creator",
  "proposal assistance",
  "romantic proposal planning",
  "proposal planning tools",
  "Valentine's Day planning",
  "romantic proposal ideas",
  "romantic proposal generator",
  "Valentine's Day proposal ideas",
  "Valentine's Day proposal generator",
  "Love proposal ideas",
  "Love proposal generator",
  "AI proposal generator",
  "AI proposal ideas",
];

export const viewport: Viewport = {
  themeColor: "#FF4D79",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://myproposal.love"),
  title: {
    default: "MyProposal.Love | AI-Powered Proposal & Valentine's Day Planning",
    template: "%s | MyProposal.Love"
  },
  description: "Craft an unforgettable marriage proposal or Valentine's Day surprise with AI-powered romantic suggestions and planning tools. Transform your love story into an unforgettable moment.",
  keywords: keywords.join(", "),
  creator: "myproposal.love Team",
  publisher: "myproposal.love",
  category: "Relationships & Romance",
  
  // OpenGraph metadata
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://myproposal.love",
    siteName: "MyProposal.Love",
    title: "Create Your Perfect Proposal with AI | MyProposal.Love",
    description: "Craft an unforgettable marriage proposal or Valentine's Day surprise with AI-powered romantic suggestions and planning tools.",
    images: [
      {
        url: "https://myproposal.love/1200x630.png",
        width: 1200,
        height: 630,
        alt: "MyProposal.Love - AI-Powered Proposal Creation Platform"
      }
    ]
  },

  // Twitter metadata
  twitter: {
    card: "summary_large_image",
    title: "Craft Your Perfect Proposal with AI | MyProposal.Love",
    description: "Craft an unforgettable marriage proposal or Valentine's Day surprise with AI-powered romantic suggestions.",
    images: ["https://myproposal.love/1200x630.png"],
    creator: "@myproposal_love"
  },

  // Alternative languages
  alternates: {
    canonical: "https://myproposal.love",
    languages: {
      'en-US': 'https://myproposal.love',
    }
  },

  // Robots directives
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "MyProposal.Love",
  "description": "AI-powered proposal creation and Valentine's Day planning platform",
  "url": "https://myproposal.love",
  "applicationCategory": "Lifestyle",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "156"
  },
  "potentialAction": {
    "@type": "CreateAction",
    "target": "http://myproposal.love/proposals/new",
    "description": "Create a personalized marriage proposal"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${dancingScript.variable} ${greatVibes.variable} ${parisienne.variable}`} 
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to important third-party domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Favicon and touch icons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* JSON-LD structured data */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} min-h-screen flex flex-col`}>
        <Providers>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
          <Analytics />
          <SpeedInsights />
        </Providers>

        {/* Add Google site verification */}
        <Script 
          id="google-verification"
          strategy="afterInteractive"
        >
          {`
            if (document) {
              const meta = document.createElement('meta');
              meta.name = 'google-site-verification';
              meta.content = 'YOUR_VERIFICATION_CODE'; // Replace with your verification code
              document.head.appendChild(meta);
            }
          `}
        </Script>
      </body>
    </html>
  );
}