import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";
import AuthProvider from "@/context/AuthProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Providers } from "@/context/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Webster",
  description: "Webster industry",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <Providers>

              <div className="container">
                <Navbar />
                {children}
                <ToastContainer
                  position="top-center"
                  autoClose={5000}
                  hideProgressBar
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
                <Footer />
              </div>

          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}