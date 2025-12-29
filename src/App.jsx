import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LenisProvider } from "./Lenis";
import DigitalCurtainTransition from "./components/PageTransition";

import HomePage from "./Pages/HomePage/homepage";
import './App.css'
import './index.css'
import About from "./Pages/About/about";
import Contact from "./Pages/Contact/contact";
import Services from "./Pages/Services/services";
import Work from "./Pages/Work/Work";
import Process from "./Pages/Process/Process";
import Team from "./Pages/Team/Team";
import Loader from "./IntroAnimation";
import { useEffect, useState } from "react";
import ProjectPage from "./Pages/Work/ProjectPage";
import ServiceDetail from "./Pages/Services/ServiceDetails";

export default function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(location.pathname === "/");

  useEffect(() => {
    if (location.pathname === "/") {
      const t = setTimeout(() => setLoading(false), 3600);
      return () => clearTimeout(t);
    } else {
      setLoading(false);
    }
  }, [location.pathname]);

  return (
    <LenisProvider>
      <DigitalCurtainTransition>
        <AnimatePresence mode="wait">
          {loading ? (
            <Loader key="loader" />
          ) : (
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/work" element={<Work />} />
              <Route path="/work/:id" element={<ProjectPage />} />
              <Route path="/process" element={<Process />} />
              <Route path="/team" element={<Team />} />
            </Routes>
          )}
        </AnimatePresence>
      </DigitalCurtainTransition>
    </LenisProvider>
  );
}
