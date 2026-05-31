import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arpit Yadav | ECE Engineer — Silicon to Software",
  description:
    "Portfolio of Arpit Yadav — a second-year Electronics & Communications Engineering student designing and validating systems that bridge silicon, firmware, and full-stack interfaces. Specializing in VLSI design, embedded systems, and full-stack engineering.",
  keywords: [
    "Arpit Yadav",
    "ECE",
    "Electronics Engineering",
    "VLSI",
    "Embedded Systems",
    "Full-Stack",
    "Firmware",
    "IoT",
    "Robotics",
    "PCB Design",
  ],
  authors: [{ name: "Arpit Yadav" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Arpit Yadav | ECE Engineer",
    description:
      "Bridging silicon, firmware, and full-stack interfaces with constraint-driven, simulation-first engineering.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
