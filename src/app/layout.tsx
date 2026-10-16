import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Syne } from "next/font/google";
import "./globals.css";
import { MenuProvider } from "@/components/awake/menu-context";
import SmoothScroll from "@/components/awake/SmoothScroll";
import PageTransition from "@/components/awake/PageTransition";
import StickyNav from "@/components/awake/StickyNav";
import Menu from "@/components/awake/Menu";
import Footer from "@/components/awake/Footer";
import { profile, tagline } from "@/data/site";

const aeonik = localFont({
  src: [
    { path: "../fonts/Aeonik-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Aeonik-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-aeonik",
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const description = `${tagline} ${profile.name} \u2014 ${profile.role} based in ${profile.location}, graduating 2027.`;

export const metadata: Metadata = {
  metadataBase: new URL("https://rakeshkumar.dev"),
  title: {
    default: `${profile.name} \u2014 ${profile.role}`,
    template: `%s \u2014 ${profile.name}`,
  },
  description,
  applicationName: profile.name,
  authors: [{ name: profile.name }],
  keywords: [
    profile.name,
    "full stack developer",
    "Next.js developer",
    "React developer",
    "Python automation",
    "Supabase",
    "Bengaluru",
    "portfolio",
  ],
  openGraph: {
    type: "website",
    title: `${profile.name} \u2014 ${profile.role}`,
    description,
    siteName: profile.name,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} \u2014 ${profile.role}`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f6efe1",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${aeonik.variable} ${syne.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <MenuProvider>
          <SmoothScroll>
            <StickyNav />
            <Menu />
            <PageTransition />
            <main id="main">{children}</main>
            <Footer />
          </SmoothScroll>
        </MenuProvider>
      </body>
    </html>
  );
}
