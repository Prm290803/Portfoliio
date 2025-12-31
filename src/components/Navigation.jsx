import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

export const Navigation = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const menuRef = useRef(null);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      const links = menuRef.current.querySelectorAll('.nav-link');
      gsap.fromTo(
        links,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: 'power4.out' }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location, setIsOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Work', path: '/work' },
    { name: 'Process', path: '/process' },
    { name: 'Team', path: '/team' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-40 bg-white/60 backdrop-blur-xl flex flex-col"
          ref={menuRef}
        >
          <div className="h-full flex flex-col justify-center items-center">
            <nav className="flex flex-col items-center gap-2 md:gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="nav-link group relative overflow-hidden"
                >
                  <span className="headline-lg text-foreground transition-transform duration-500 group-hover:translate-y-[-100%] block">
                    {link.name}
                  </span>
                  <span className="headline-lg text-foreground absolute top-full left-0 transition-transform duration-500 group-hover:translate-y-[-100%]">
                    {link.name}
                  </span>
                </Link>
              ))}
            </nav>
            
            <div className="absolute bottom-12 left-8 right-8 flex justify-between items-end">
              <div className="label-editorial">
                <p>Digital Excellence</p>
                <p>Since 2024</p>
              </div>
              <div className="label-editorial text-right">
                <p>buildcrew.co@gmail.com</p>
                <p>+91 9328606257</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};