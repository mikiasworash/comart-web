import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ReduxProvider from "../redux/provider";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { CategoryProvider } from "./context/CategoryContext";
import { ProductProvider } from "./context/ProductContext";
import { VendorProvider } from "./context/VendorContext";
import { OrderProvider } from "./context/OrderContext";

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
          <OrderProvider>
            <CategoryProvider>
              <ProductProvider>
                <VendorProvider>
                  <Navbar />
                  <ToastContainer />
                  {children}
                  <Footer />
                  <Toaster />
                </VendorProvider>
              </ProductProvider>
            </CategoryProvider>
          </OrderProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
