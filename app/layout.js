import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ReduxProvider from "../redux/provider";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { ProductProvider } from "./context/ProductContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "COMART",
  description: "Comart: An Ecommerce Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ProductProvider>
            <Navbar />
            <ToastContainer />
            {children}
            <Footer />
            <Toaster />
          </ProductProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
