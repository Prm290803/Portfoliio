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
import { useLenis } from "../lenis"; // 👈 IMPORTANT

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
            {/* Logo */}
            <Link to="/" className="relative z-50">
              <span className="text-xl md:text-2xl font-black uppercase tracking-[-0.02em] text-foreground">
                Tech<span className="text-stroke">Morphix</span>
              </span>
            </Link>

            {/* Desktop Nav Links */}
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
            </nav>

            {/* Menu Toggle */}
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
            </button>
          </div>
        </div>
        
        {/* Bottom border line */}
        <div className={`h-px bg-foreground/10 transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />
      </motion.header>

      <Navigation isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
