import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://meherhowji.com"),
  title: {
    default: "Meher Howji",
    template: "%s | Meher Howji",
  },
  description:
    "I am Meher. I'm a YouTuber, Udemy Trainer & a technologist. On this site I share courses and articles that will help you build web apps with a deeper insight into web technologies.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      // -1, google chooses the length that it believes is effective to help users discover your content
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
