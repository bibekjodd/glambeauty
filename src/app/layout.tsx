import LoadingBar from '@/components/utils/loading-bar';
import QueryProvider from '@/providers/query-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Glambeauty'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <QueryProvider>
          <LoadingBar />
          <Toaster toastOptions={{ duration: 3000 }} theme="dark" richColors closeButton />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
