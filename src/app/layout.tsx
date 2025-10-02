import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import GSAPInitializer from "@/components/GSAPInitializer";
import ScrollSmootherWrapper from "@/components/ScrollSmootherWrapper";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HPCSS ICT Revision Hub - Interactive Learning Platform",
  description: "Your comprehensive resource for mastering ICT concepts with interactive learning materials, visual algorithms, and practical exercises.",
  keywords: "ICT, Computer Science, Programming, Algorithms, JavaScript, Python, Database, SQL, Learning, Education",
  authors: [{ name: "HPCSS ICT Team" }],
  creator: "HPCSS ICT Revision Hub",
  publisher: "HPCSS",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "HPCSS ICT Revision Hub",
    description: "Interactive learning platform for ICT concepts and programming",
    type: "website",
    locale: "en_US",
    siteName: "HPCSS ICT Revision Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "HPCSS ICT Revision Hub",
    description: "Interactive learning platform for ICT concepts and programming",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <LanguageProvider>
          <ThemeProvider>
            <AuthProvider>
              <GSAPInitializer />
              <ScrollSmootherWrapper
                enabled={true}
                smoothness={1.5}
                smoothTouch={0.1}
                effects={true}
                className="scroll-smoother-root"
              >
                {children}
              </ScrollSmootherWrapper>
            </AuthProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
