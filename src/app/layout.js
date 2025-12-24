import { Inter } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

const inter = Inter({ subsets: ["latin"] });

// ========================================
// SEO METADATA - Ini adalah pengaturan SEO global
// ========================================
export const metadata = {
  // Title default dan template untuk halaman lain
  title: {
    default: "PushID - Find Your Gaming Squad",
    template: "%s | PushID",
  },

  // Deskripsi website yang akan muncul di Google
  description:
    "Temukan teman bermain game di PushID. Platform untuk mencari squad gaming untuk Valorant, PUBG, Honor of Kings, Mobile Legends, dan game lainnya. Bergabung sekarang dan menangkan pertandingan bersama!",

  // Keywords untuk SEO
  keywords: [
    "gaming squad",
    "team finder",
    "cari teman mabar",
    "valorant",
    "pubg",
    "honor of kings",
    "mobile legends",
    "mabar",
    "gaming Indonesia",
    "esports",
    "squad gaming",
  ],

  // Author website
  authors: [{ name: "PushID Team" }],
  creator: "PushID",
  publisher: "PushID",

  // Open Graph - untuk preview di sosial media (Facebook, WhatsApp, dll)
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://pushid.com",
    siteName: "PushID",
    title: "PushID - Find Your Gaming Squad",
    description:
      "Temukan teman bermain game di PushID. Platform terbaik untuk mencari squad gaming.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PushID - Gaming Squad Finder",
      },
    ],
  },

  // Twitter Card - untuk preview di Twitter/X
  twitter: {
    card: "summary_large_image",
    title: "PushID - Find Your Gaming Squad",
    description:
      "Temukan teman bermain game di PushID. Platform terbaik untuk mencari squad gaming.",
    images: ["/og-image.png"],
  },

  // Robots - mengontrol crawler mesin pencari
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification (opsional - untuk Google Search Console)
  // verification: {
  //   google: "your-google-verification-code",
  // },
};

// ========================================
// VIEWPORT SETTINGS
// ========================================
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020410",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
