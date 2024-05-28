import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "PlayerStats",
  description: "A perfect platform to track player statistics in cricket.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="dark:bg-neutral-950">
        {children}</body>
    </html>
  );
}
