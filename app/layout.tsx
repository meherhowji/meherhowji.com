import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "@/styles/globals.scss";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "900"], variable: "--font-inter" });

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
    <html lang="en" suppressHydrationWarning>
      {/* TODO: suppress cz ThemeProvider is a client component and layout isnt, check next-theme in future again */}
      <body className={`${inter.className} bodyContainer`}>
        <ThemeProvider themes={["light", "dark"]} enableSystem={true}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
