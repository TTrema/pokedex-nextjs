import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; 
import { ThemeProvider} from '@/components/theme-provider';
import Link from 'next/link'; 
import Head from 'next/head'; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokédex",
  description: "A Pokédex for finding information about Pokémon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Head section */}
      <Head>
        <meta name="viewport" content="initial-scale=1.9" />
        <link href="https://db.onlinewebfonts.com/c/d2d21cf0ee4c1d969d8a4dccc587ab26?family=Flexo-Medium" rel="stylesheet" />
      </Head>
      {/* Body section */}
      <body className={inter.className}>
        {/* ThemeProvider for managing theme */}
        <ThemeProvider attribute="class" defaultTheme="dark">
          {/* Main content */}
          <main className="flex min-h-screen flex-col items-center">
            <div className="z-10 max-w-5xl items-center justify-between text-sm lg:flex">
              <Link href="/">
                <h1 className="text-bold mt-8" style={{ fontSize: 'clamp(1rem, 16vw, 4rem' }}>Pokédex</h1>
              </Link>
            </div>
            {/* Render children components */}
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
