import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PERSONAL_INFO } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const baseUrl = "https://inalouisemagno.dev";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: { default: "Ina Louise Magno", template: "%s | Ina Louise Magno" },
  description: "Ina Louise Magno — data analyst and designer from the Philippines.",
  keywords: ["data analyst", "designer", "SQL", "Python", "Figma", "Philippines"],
  authors: [{ name: "Ina Louise Magno" }],
  openGraph: {
    title: "Ina Louise Magno",
    description: "Data analyst and designer from the Philippines.",
    url: baseUrl,
    siteName: "Ina Louise Magno",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ina Louise Magno",
    description: "Data analyst and designer from the Philippines.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSONAL_INFO.name,
  url: baseUrl,
  sameAs: [PERSONAL_INFO.github, PERSONAL_INFO.linkedin],
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of the Philippines Los Baños" },
  knowsAbout: ["Data Analytics", "SQL", "Python", "Tableau", "Power BI", "Graphic Design"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-sans antialiased bg-white text-[#111]">
        {children}
      </body>
    </html>
  );
}
