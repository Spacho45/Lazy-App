import type { Metadata } from "next";
import { Footer, Header } from "@/components/site-shell";
import { siteDescription } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lazyapp.fr"),
  title: { default: "Lazy App | Atelier numérique premium", template: "%s | Lazy App" },
  description: siteDescription,
  icons: {
    icon: [
      { url: "/assets/lazyapp-favicon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/assets/lazyapp-favicon.png", type: "image/png", sizes: "512x512" },
    ],
  },
  openGraph: { title: "Lazy App", description: siteDescription, locale: "fr_FR", type: "website" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col"><Header /><main className="flex-1">{children}</main><Footer /></body>
    </html>
  );
}
