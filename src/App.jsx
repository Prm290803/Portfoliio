// import React from 'react'
// import './App.css'
// import { useState, useEffect } from 'react';
// import {LenisProvider} from './Lenis';
// import HomePage from './Pages/HomePage/homepage'
// import Loader from './IntroAnimation';
// import { AnimatePresence } from 'framer-motion';
// import About from './Pages/About/about';
// import Contact from './Pages/Contact/contact';
// import Services from './Pages/Services/services';
// import Work from './Pages/Work/Work';
// import Process from './Pages/Process/Process';
// import ScrollTop from './components/ScrollTop';

// import { BrowserRouter as Router, Routes, Route, useLocation  } from 'react-router-dom';

// function App() {
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();
  
//   // Only show loader on home page initial load
//   const isHomePage = location.pathname === '/';
  
//   useEffect(() => {
//     // Only run loader logic for home page
//     if (isHomePage) {
//       const timer = setTimeout(() => {
//         setLoading(false);
//       }, 3600); // ⏱️ loader duration

//       return () => clearTimeout(timer);
//     } else {
//       // For other pages, don't show loader
//       setLoading(false);
//     }
//   }, [isHomePage]);

//   return (
//     <AnimatePresence mode="wait">
//       {loading && isHomePage ? (
//         <Loader key="loader" />
//       ) : (
//         <Routes location={location} key={location.pathname}>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/services" element={<Services />} />
//           <Route path="/work" element={<Work />} />
//           <Route path="/process" element={<Process />} />
//         </Routes>
//       )}
//     </AnimatePresence>
//   );
// }

// // Wrap App with Router properly
// export default function AppWrapper() {
//   return (
//    <AnimatePresence>
//     <LenisProvider>
//       <ScrollTop />
//       <App />
//     </LenisProvider>
//     </AnimatePresence>
   
//   );
// }

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
              <Route path="/work" element={<Work />} />
              <Route path="/process" element={<Process />} />
              <Route path="/team" element={<Team />} />
            </Routes>
          )}
        </AnimatePresence>
      </DigitalCurtainTransition>
    </LenisProvider>
  );
}
