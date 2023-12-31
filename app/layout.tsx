import { GeistSans } from "geist/font";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <nav className="flex items-center justify-between w-full h-16 px-8 bg-primary overflow-hidden">
          Tarot Reading
        </nav>
        <main className="flex flex-col items-center">
          <div className="w-full max-w-3xl px-2 py-4">{children}</div>
        </main>
      </body>
    </html>
  );
}
