import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import ReduxProvider from "../redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Comart: An Ecommerce Platform",
  description: "Comart: An Ecommerce Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Navbar />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
