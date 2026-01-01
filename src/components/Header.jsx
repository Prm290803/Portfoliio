// import { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Navigation } from './Navigation';

// export const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);
//   useEffect(() => {
//   if (isOpen) {
//     document.body.style.overflow = 'hidden';
//   } else {
//     document.body.style.overflow = 'unset';
//   }
  
//   return () => {
//     document.body.style.overflow = 'unset';
//   };
// }, [isOpen]);

//   return (
//     <>
//       <motion.header
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//           scrolled ? 'bg-background/90 bg-white/60 backdrop-blur-md' : 'bg-transparent'
//         }`}
//       >
//         <div className="container mx-auto px-6 md:px-12">
//           <div className="flex items-center justify-between h-20 md:h-24">
//             {/* Logo */}
//             <Link to="/" className="relative z-50">
//               <span className="text-xl md:text-2xl font-black uppercase tracking-[-0.02em] text-foreground">
//                 Tech<span className="text-stroke">Morphix</span>
//               </span>
//             </Link>

//             {/* Desktop Nav Links */}
//             <nav className="hidden lg:flex items-center gap-8">
//               {['About', 'Services', 'Work', 'Contact'].map((item) => (
//                 <Link
//                   key={item}
//                   to={`/${item.toLowerCase()}`}
//                   className="label-editorial text-foreground hover:text-muted-foreground transition-colors duration-300 relative group"
//                 >
//                   {item}
//                   <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
//                 </Link>
//               ))}
//             </nav>

//             {/* Menu Toggle */}
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="relative z-50 w-12 h-12 flex items-center justify-center group"
//               aria-label="Toggle menu"
//             >Menu
//               <div className="flex flex-col gap-1.5">
//                 <span
//                   className={`block w-6 h-[1px] bg-foreground transition-all duration-500 ${
//                     isOpen ? 'rotate-45 -translate-y-[4px]' : ''
//                   }`}
//                 />
//                 <span
//                   className={`block w-6 h-[1px] bg-foreground transition-all duration-500 ${
//                     isOpen ? '-rotate-45 -translate-y-[3px]' : ''
//                   }`}
//                 />
//               </div>
//             </button>
//           </div>
//         </div>
        
//         {/* Bottom border line */}
//         <div className={`h-px bg-foreground/10 transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />
//       </motion.header>

//       <Navigation isOpen={isOpen} setIsOpen={setIsOpen} />
//     </>
//   );
// };

import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Navigation } from "./Navigation";
import { useLenis } from "../Lenis"; // 👈 IMPORTANT

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const lenis = useLenis();
  const scrollPos = useRef(0);

  /* ----------------------------------
   * Header background on scroll
   * ---------------------------------- */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Work", path: "/work" },
    { label: "Contact", path: "/contact" },
  ];
  /* ----------------------------------
   * LOCK SCROLL WHEN MENU IS OPEN
   * (LENIS + BODY FIX)
   * ---------------------------------- */
  useEffect(() => {
    if (isOpen) {
      // Save scroll position
      scrollPos.current = window.scrollY;

      // Stop Lenis
      lenis?.stop();

      // Lock body scroll
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPos.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
    } else {
      // Restore body
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";

      // Restore scroll position
      window.scrollTo(0, scrollPos.current);

      // Resume Lenis
      lenis?.start();
    }
    

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
    };
  }, [isOpen, lenis]);

  /* ----------------------------------
   * CLOSE MENU ON ROUTE CHANGE
   * ---------------------------------- */
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
       <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-background/90 bg-white/60 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20 md:h-24">

        <div className="container px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20 lg:h-24">
            {/* Logo with black and white styling */}
            {/* <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="relative z-50 flex items-center gap-3 group"
              aria-label="BuildCrew Home"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-black/5 rounded-xl blur-sm group-hover:blur transition-all duration-300" />
                <img
                  src="/Logo.png"
                  alt="BuildCrew"
                  className="relative h-10 w-10 md:h-12 md:w-12 object-contain"
                  loading="eager"
                />
              </motion.div>
              <div className="sm:hidden block flex flex-col">
                <span className="text-xl md:text-2xl font-black uppercase tracking-tight text-black leading-tight">
                  Build<span className="text-black">Crew</span>
                </span>
                <span className="text-xs text-black/60 tracking-widest font-medium">
                  DIGITAL EXCELLENCE
                </span>
              </div>
            </Link> */}
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="relative z-50 flex items-center gap-3 group"
              aria-label="BuildCrew Home"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-black/5 rounded-xl blur-sm group-hover:blur transition-all duration-300" />
                <img
                  src="/Logo.png"
                  alt="BuildCrew"
                  className="relative h-10 w-10 md:h-12 md:w-12 object-contain"
                  loading="eager"
                />
              </motion.div>
              <div className=" md:flex flex-col">
                <span className="text-xl md:text-2xl font-black uppercase tracking-tight text-black leading-tight">
                  Build<span className="text-black">Crew</span>
                </span>
                <span className="text-xs text-black/60 tracking-widest font-medium">
                  DIGITAL EXCELLENCE
                </span>
              </div>
            </Link>
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.path}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    <Link
                      to={item.path}
                      className={`relative px-4 py-2 rounded-full transition-all duration-300 ${
                        isActive
                          ? "text-black font-semibold"
                          : "text-black/70 hover:text-black"
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-black/5 rounded-full -z-10"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Menu Button with "Menu" text */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-50 flex items-center gap-2 group"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-black font-medium tracking-wide hidden md:block">
                {isOpen ? "Close" : "Menu"}
              </span>
              <div className="w-10 h-10 flex items-center justify-center">
                <div className="relative w-6 h-5 flex flex-col justify-between">
                  <motion.span
                    animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                    className="block w-full h-[1px] bg-black origin-center transition-all duration-500"
                  />
                  <motion.span
                    animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="block w-full h-[1px] bg-black transition-all duration-300"
                  />
                  <motion.span
                    animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                    className="block w-full h-[1px] bg-black origin-center transition-all duration-500"
                  />
                </div>
              </div>
              <span className="sr-only">{isOpen ? "Close menu" : "Menu"}</span>
            </motion.button>
          </div>
        </div>
            {/* Desktop Nav Links
            <nav className="hidden lg:flex items-center gap-8">
              {['About', 'Services', 'Work', 'Contact'].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="label-editorial text-foreground hover:text-muted-foreground transition-colors duration-300 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav> */}

            {/* Menu Toggle
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-50 w-12 h-12 flex items-center justify-center group"
              aria-label="Toggle menu"
            >Menu
              <div className="flex flex-col gap-1.5">
                <span
                  className={`block w-6 h-[1px] bg-foreground transition-all duration-500 ${
                    isOpen ? 'rotate-45 -translate-y-[4px]' : ''
                  }`}
                />
                <span
                  className={`block w-6 h-[1px] bg-foreground transition-all duration-500 ${
                    isOpen ? '-rotate-45 -translate-y-[3px]' : ''
                  }`}
                />
              </div>
            </button> */}
          </div>
        </div>
        
        {/* Bottom border line */}
        <div className={`h-px bg-foreground/10 transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />
      </motion.header>

      <Navigation isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
