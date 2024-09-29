import { Inter } from "next/font/google";
import '@/app/styles/globals.css'
import Header from '@/app/components/Header.jsx'




const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cookie Clicker",
  description: "Cookie clicker game, yay! Let the Great British bake-of begin!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body>
        <Header/>
        {children}
      </body>
    </html>
  );
}
