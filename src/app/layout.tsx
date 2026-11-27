import type { Metadata } from "next";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SuZuChat } from "@/components/SuZuChat";
import { PageTransition } from "@/components/PageTransition";

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
    <html lang="en">
      <body className="font-body min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1 w-full">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <SuZuChat />
        <Analytics />
      </body>
    </html>
  );
}