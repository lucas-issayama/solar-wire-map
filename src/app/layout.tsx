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
  title: "SolarWireMap",
  description: "Interactive mapping tool for solar panel installations and electrical connections. Visualize, plan, and optimize your solar energy systems.",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iNiIgZmlsbD0iI0ZGQjUwMCIvPgo8cGF0aCBkPSJNMTYgMlYxTTE2IDMxVjMwTTMwIDE2SDMxTTEgMTZIMk0yNS44NTcgNi4xNDNMMjYuNTY0IDUuNDM2TTUuNDM2IDI2LjU2NEw2LjE0MyAyNS44NTdNMjUuODU3IDI1Ljg1N0wyNi41NjQgMjYuNTY0TTUuNDM2IDUuNDM2TDYuMTQzIDYuMTQzIiBzdHJva2U9IiNGRkI1MDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cjwvc3ZnPgo=",
        sizes: "32x32",
        type: "image/svg+xml",
      },
    ],
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
        {children}
      </body>
    </html>
  );
}
