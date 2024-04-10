import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

import { AppContextProvider } from "@/contexts/app";
import { ThemeProvider } from "@/contexts/theme-provider";

import { Toaster } from "@/components/ui/toaster";


const lato = Lato({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--font-lato"
});

export const metadata: Metadata = {
  title: "Compress IPv6 Address",
  description: "A simple utility for converting IPv6 addresses into their compressed form.",
  authors: [{ name: "Ayobami Tunwase", url: "https://github.com/ayobami11" }],
  keywords: ["IP", "IPv6", "compress IPv6", "Internet Protocol version 6"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${lato.variable}`}>
      <body className="font-primary">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppContextProvider>
            {children}
            <Toaster />
          </AppContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
