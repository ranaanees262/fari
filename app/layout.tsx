import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit, Caveat } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import PinGate from "./components/PinGate";
import GlobalBackground from "./components/GlobalBackground";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "For Fariha — You Deserve Everything 🌹",
  description: "For Punch — a gentle reminder that you are worthy of love, care, and respect.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable} ${caveat.variable}`}>
      <body className="font-sans antialiased text-[var(--text-deep)]">
        <PinGate>
          <GlobalBackground />
          <NavBar />
          {children}
        </PinGate>
      </body>
    </html>
  );
}
