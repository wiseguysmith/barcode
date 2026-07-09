import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Oswald, Playfair_Display } from "next/font/google";
import { AppShell } from "../components/app-shell";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-structure-loaded"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-editorial-loaded"
});

export const metadata: Metadata = {
  title: "Barcode DAO",
  description: "Creator distribution engine"
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${oswald.variable} ${playfair.variable}`}>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
