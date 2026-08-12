import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "yourname",
  description: "my little corner of the internet",
  openGraph: {
    title: "yourname",
    description: "my little corner of the internet",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}