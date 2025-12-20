import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import HomePage from "./Pages/HomePage/homepage";
import About from "./Pages/About/about";
import Contact from "./Pages/Contact/contact";
import Services from "./Pages/Services/services";
import Work from "./Pages/Work/Work";
import Process from "./Pages/Process/Process";
import Loader from "./IntroAnimation";
import ScrollTop from "./components/ScrollTop";

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (isHomePage) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3600);

      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [isHomePage]);

  return (
    <>
      <ScrollTop />

      <AnimatePresence mode="wait">
        {loading && isHomePage ? (
          <Loader key="loader" />
        ) : (
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/work" element={<Work />} />
            <Route path="/process" element={<Process />} />
          </Routes>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
