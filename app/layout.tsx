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
  // Primary Keywords (High Volume)
  "proposal generator",
  "marriage proposal ideas",
  "how to propose",
  "romantic proposal",
  "proposal planner",
  "Valentine's Day proposal",
  "how to propose",
  "creative proposal ideas",
  "AI proposal generator",
  "proposal planner",
  "romantic valentine ideas",
  "proposal message generator",
  "unique proposal ideas",
  "custom proposal writing",
  "AI proposal writer",
  
  // Long-tail Keywords (High Intent)
  "best AI proposal generator 2025",
  "romantic proposal ideas with AI",
  "how to write perfect proposal letter",
  "creative marriage proposal ideas 2025",
  "unique Valentine's Day proposal ideas",
  "custom AI love letter generator",
  "personalized proposal message maker",
  
  // LSI Keywords (Semantic Relevance)
  "proposal planning assistance",
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
  "romantic message generator",
  "love letter AI assistant",
  "proposal writing help",
  "engagement proposal planner",
  "romantic proposal suggestions",
  
  // Question Keywords (Voice Search)
  "how to make perfect proposal",
  "what to write in proposal",
  "how to propose on Valentine's Day",
  "best way to propose marriage",
  
  // Location-based Keywords
  "online proposal generator",
  "digital proposal maker",
  "virtual proposal planner",
  "web based proposal creator",
  
  // Feature-based Keywords
  "AI powered proposal writing",
  "automated proposal generator",
  "smart proposal assistant",
  "intelligent proposal creator",
  
  // Intent-based Keywords
  "free proposal generator",
  "professional proposal writer",
  "instant proposal maker",
  "quick proposal generator"
];

export const viewport: Viewport = {
  themeColor: "#FF4D79",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light",
  //applicationName: "myproposal.love - AI Proposal Generator"
};

export const metadata: Metadata = {
  metadataBase: new URL("https://myproposal.love"),
  title: {
    default: "AI Proposal Generator | Create Perfect Marriage & Valentine's Proposals | myproposal.love",
    template: "%s | Best AI Proposal Generator - myproposal.love"
  },
  description: "Create the perfect proposal with our AI-powered proposal generator. Craft romantic, personalized marriage proposals and Valentine's Day messages. #1 choice for unique proposal ideas and love letters. Try our smart proposal writer today!",
  keywords: keywords.join(", "),
  creator: "myproposal.love Team",
  publisher: "myproposal.love",
  category: "Relationships & Romance",
  applicationName: "myproposal.love - AI Proposal Generator",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  authors: [{ name: "myproposal.love Team", url: "https://myproposal.love" }],
  colorScheme: "light",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  
  verification: {
    google: "sbHJozLP1aBAAZXxD7-kZuJWYJKH7XFp0odgp4zaNuo",
    other: {
      "facebook-domain-verification": "sbHJozLP1aBAAZXxD7-kZuJWYJKH7XFp0odgp4zaNuo"
    }
  },
  
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "myproposal.love",
    statusBarStyle: "default",
    startupImage: [
      {
        url: "/splash/iphone5.png",
        media: "(device-width: 320px) and (device-height: 568px)"
      },
      {
        url: "/splash/iphone6.png",
        media: "(device-width: 375px) and (device-height: 667px)"
      },
      {
        url: "/splash/iphoneplus.png",
        media: "(device-width: 621px) and (device-height: 1104px)"
      },
      {
        url: "/splash/iphonex.png",
        media: "(device-width: 375px) and (device-height: 812px)"
      },
      {
        url: "/splash/iphonexr.png",
        media: "(device-width: 414px) and (device-height: 896px)"
      },
      {
        url: "/splash/ipad.png",
        media: "(device-width: 768px) and (device-height: 1024px)"
      },
      {
        url: "/splash/ipadpro1.png",
        media: "(device-width: 834px) and (device-height: 1112px)"
      },
      {
        url: "/splash/ipadpro3.png",
        media: "(device-width: 834px) and (device-height: 1194px)"
      },
      {
        url: "/splash/ipadpro2.png",
        media: "(device-width: 1024px) and (device-height: 1366px)"
      }
    ]
  },
  
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
    url: true
  },
  
  other: {
    "msapplication-TileColor": "#FF4D79",
    "msapplication-config": "/browserconfig.xml"
  }
};

// Enhanced JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://myproposal.love/#website",
      "name": "myproposal.love",
      "description": "AI-powered proposal creation and Valentine's Day planning platform",
      "url": "https://myproposal.love",
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "156",
        "reviewCount": "89"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://myproposal.love/#organization",
      "name": "myproposal.love",
      "url": "https://myproposal.love",
      "logo": {
        "@type": "ImageObject",
        "url": "https://myproposal.love/wlogo.svg",
        "width": 512,
        "height": 512
      },
      "sameAs": [
        "https://facebook.com/myproposal.love",
        "https://twitter.com/myproposal_love",
        "https://instagram.com/myproposal.love",
        "https://pinterest.com/myproposallove"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://myproposal.love/#website",
      "url": "https://myproposal.love",
      "name": "myproposal.love - #1 AI Proposal Generator",
      "description": "Create perfect proposals with AI-powered suggestions and tools",
      "publisher": {
        "@id": "https://myproposal.love/#organization"
      },
      "potentialAction": [{
        "@type": "SearchAction",
        "target": "https://myproposal.love/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }]
    }
  ]
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
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* PWA manifest and icons */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FF4D79" />
        <meta name="application-name" content="myproposal.love" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="myproposal.love" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="myproposal.love" />
        
        {/* Icons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/icons/favicon-48x48.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#FF4D79" />
        <meta name="msapplication-TileColor" content="#FF4D79" />
        <meta name="msapplication-TileImage" content="/icons/mstile-144x144.png" />
        
        {/* Social media verification */}
        <meta name="facebook-domain-verification" content="sbHJozLP1aBAAZXxD7-kZuJWYJKH7XFp0odgp4zaNuo" />
        <meta name="google-site-verification" content="sbHJozLP1aBAAZXxD7-kZuJWYJKH7XFp0odgp4zaNuo" />
        
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