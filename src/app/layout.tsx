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
      <body className="dark:bg-neutral-950 dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        {children}</body>
    </html>
  );
}
