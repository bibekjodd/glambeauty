import Footer from '@/components/layouts/footer';
import Header from '@/components/layouts/header';

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}