import { Inter } from "next/font/google";
import '@/app/styles/globals.css';
import Header from '@/app/components/Header.jsx';
import ClientLayout from '@/app/components/ClientLayout.js'; // Import the client-side wrapper

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cookie Clicker",
  description: "Cookie clicker game, yay! Let the Great British bake-off begin!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>
          <Header />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
