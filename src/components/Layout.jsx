import { Header } from "./Header";
import { Footer } from "./Footer";
import BackToTop from "./BackToTop";
import { motion } from "framer-motion";
import Snowfall from 'react-snowfall';
import '../App.css'
export const Layout = ({ children }) => {
  return (
    <div id="lenis-root" className="min-h-screen flex flex-col">
      <Header />
      <Snowfall snowflakeCount={100} color='grey' />
      <main className="flex-1 relative">
        {children}
      </main>

      <Footer />
    </div>
  );
};

