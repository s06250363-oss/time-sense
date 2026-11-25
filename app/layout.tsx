import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TIME SENSE",
  description: "目標の時間を体感で当てよう。",
  openGraph: {
    title: "TIME SENSE",
    description: "目標の時間を体感で当てよう。",
    images: ["/ogp.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TIME SENSE",
    description: "目標の時間を体感で当てよう。",
    images: ["/ogp.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}