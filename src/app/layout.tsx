import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { CustomCursor } from "@/components/animations/CustomCursor";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.url),
  title: {
    default: siteConfig.seo.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.seo.description,
  keywords: [
    "Shanmukh Veerepalli",
    "AI Creator",
    "Creative Developer",
    "Digital Filmmaker",
    "Three.js Specialist",
    "AI Filmmaking",
    "Cinematic Productions",
    "Full-Stack Developer",
    "Next.js Portfolio",
    "KidLearners",
    "Shanmukh AI Film Makers",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.seo.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.seo.url,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [siteConfig.seo.ogImage],
    creator: "@shanmukh_ai",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-brand-white text-brand-jet selection:bg-brand-royal selection:text-white antialiased min-h-screen flex flex-col font-sans has-custom-cursor">
        <SmoothScroll>
          <div className="film-grain" aria-hidden="true" />
          <CustomCursor />
          <Navbar />
          <main className="flex-1 w-full relative">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
