import type { Metadata } from "next";
import { Fredoka, Nunito, Caveat } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Our Little Universe",
  description: "A little place where all of our memories live.",
};

import { AudioProvider } from "@/providers/audio-context";
import { ScrollProvider } from "@/providers/scroll-provider";
import { ClickBurst } from "@/components/click-burst";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${nunito.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-primary selection:bg-primary selection:text-white">
        <AudioProvider>
          <ScrollProvider>
            <ClickBurst />
            {children}
          </ScrollProvider>
        </AudioProvider>
      </body>
    </html>
  );
}
