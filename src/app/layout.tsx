import QueryProvider from '@/providers/query-provider';
import { LoadingBar } from '@jodd/next-top-loading-bar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });

const title = 'Glambeauty';
const description = 'Glambeauty - where your glamour begins';
const siteImage = 'https://i.postimg.cc/vZYq8C1L/hero-banner-1.png';
const siteUrl = 'https://glambeauty.vercel.app';

export const metadata: Metadata = {
  title: 'Glambeauty',
  category: 'beauty/makeup',
  description,

  openGraph: {
    title,
    siteName: title,
    type: 'website',
    url: siteUrl,
    description,
    images: [siteImage]
  },

  twitter: {
    title,
    site: siteUrl,
    description,
    card: 'summary_large_image',
    images: [siteImage]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-white text-black antialiased`}>
        <QueryProvider>
          <LoadingBar waitingTime={200} color="rgb(236 72 153)" />
          <Toaster toastOptions={{ duration: 3000 }} theme="dark" richColors closeButton />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
