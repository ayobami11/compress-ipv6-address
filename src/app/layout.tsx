import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { AppContextProvider } from "@/contexts/app";
import { ThemeProvider } from "@/contexts/theme-provider";

import { Toaster } from "@/components/ui/toaster";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Compress IPv6 Address",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
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