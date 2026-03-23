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

const backgroundClassName = "bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50";

export const metadata: Metadata = {
  title: "UX-Hell",
  description: "Navigate the most frustrating UX patterns",
  icons: {
    icon: "/ux-hell-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className={backgroundClassName}>
          {children}
        </div>
      </body>
    </html>
  );
}
