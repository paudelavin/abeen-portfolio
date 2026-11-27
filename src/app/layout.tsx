import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.abeenpoudel.com.np"),
  title: "Abeen Poudel — Product Manager & Certified Scrum Master",
  description:
    "Portfolio, resume, and blog of Abeen Poudel — Computer Engineer, Certified Scrum Master, and Product Manager based in Kathmandu, Nepal.",
  openGraph: {
    title: "Abeen Poudel — Product Manager & Certified Scrum Master",
    description:
      "Portfolio, resume, and blog of Abeen Poudel — Computer Engineer, Certified Scrum Master, and Product Manager based in Kathmandu, Nepal.",
    url: "https://www.abeenpoudel.com.np",
    siteName: "Abeen Poudel",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1 w-full">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}