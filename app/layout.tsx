import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "deathobsession",
  description: "",
  openGraph: {
    title: "deathobsession",
    description: "",
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
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener("load", function () {
                alert("plain javascript works");
              });
            `,
          }}
        />

        {children}
      </body>
    </html>
  );
}