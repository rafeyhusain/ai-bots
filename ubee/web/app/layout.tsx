import "./globals.css";
import { NextAuthProvider } from "./providers";
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export const metadata = {
  title: 'Ubee',
  description: 'Your social networking bots',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <Header />
          <br></br>
          {children}
          <br></br>
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
