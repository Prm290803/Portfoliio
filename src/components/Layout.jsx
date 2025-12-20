import { Header } from "./Header";
import { Footer } from "./Footer";
import BackToTop from "./BackToTop";
import { motion } from "framer-motion";

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow"
      >
        {children}
      </main>

      <Footer />

      {/* 🔥 Back to top button */}
      <BackToTop />
    </div>
  );
};
