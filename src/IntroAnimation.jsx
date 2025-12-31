// IntroAnimation.jsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const Loader = ({ onComplete }) => {
  const progressRef = useRef(null);
  const logoRef = useRef(null);
  const containerRef = useRef(null);
  const particlesRef = useRef([]);
  const shapesRef = useRef([]);
  const hasCompletedRef = useRef(false);
  const [currentPhrase, setCurrentPhrase] = useState("INITIALIZING");

  useEffect(() => {
    if (hasCompletedRef.current) return;

    let ctx = gsap.context(() => {
      const progress = { value: 0 };
      
      // Create particles
      const particles = [];
      const particleContainer = document.querySelector('.particles-container');
      
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle absolute rounded-full';
        particle.style.width = `${Math.random() * 4 + 1}px`;
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(0, 0, 0, ${Math.random() * 0.1 + 0.05})`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particleContainer.appendChild(particle);
        particles.push(particle);
      }
      
      particlesRef.current = particles;

      // Create floating shapes
      const shapes = [];
      const shapeContainer = document.querySelector('.shapes-container');
      const shapeTypes = ['triangle', 'square', 'circle', 'line'];
      
      for (let i = 0; i < 8; i++) {
        const shape = document.createElement('div');
        const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        shape.className = `shape absolute ${type}`;
        
        if (type === 'triangle') {
          shape.style.borderLeft = '15px solid transparent';
          shape.style.borderRight = '15px solid transparent';
          shape.style.borderBottom = '25px solid rgba(0, 0, 0, 0.05)';
        } else if (type === 'square') {
          shape.style.width = '20px';
          shape.style.height = '20px';
          shape.style.background = 'rgba(0, 0, 0, 0.03)';
        } else if (type === 'circle') {
          shape.style.width = '20px';
          shape.style.height = '20px';
          shape.style.borderRadius = '50%';
          shape.style.background = 'rgba(0, 0, 0, 0.03)';
        } else {
          shape.style.width = '30px';
          shape.style.height = '2px';
          shape.style.background = 'rgba(0, 0, 0, 0.03)';
        }
        
        shape.style.left = `${Math.random() * 100}%`;
        shape.style.top = `${Math.random() * 100}%`;
        shapeContainer.appendChild(shape);
        shapes.push(shape);
      }
      
      shapesRef.current = shapes;

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          hasCompletedRef.current = true;
          
          // Particle explosion on complete
          particles.forEach((particle, i) => {
            gsap.to(particle, {
              x: (Math.random() - 0.5) * 500,
              y: (Math.random() - 0.5) * 500,
              opacity: 0,
              duration: 1,
              delay: i * 0.01,
              ease: "power4.out"
            });
          });

          // Shapes fade out
          shapes.forEach((shape, i) => {
            gsap.to(shape, {
              scale: 0,
              opacity: 0,
              duration: 0.8,
              delay: i * 0.05,
              ease: "power2.in"
            });
          });

          // Main exit animation
          const exitTimeline = gsap.timeline({
            delay: 0.3,
            onComplete: () => {
              if (onComplete) onComplete();
            }
          });

          exitTimeline.to(".content", {
            opacity: 0,
            y: -40,
            duration: 0.8,
            ease: "power3.inOut",
          }, 0);

          exitTimeline.to(
            containerRef.current,
            {
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            0.2
          );
        },
      });

      // Initial particle animation
      particles.forEach((particle, i) => {
        gsap.fromTo(
          particle,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: i * 0.02,
            ease: "power2.out",
          }
        );

        // Floating animation
        gsap.to(particle, {
          y: `+=${(Math.random() - 0.5) * 100}`,
          x: `+=${(Math.random() - 0.5) * 100}`,
          duration: Math.random() * 3 + 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Shapes animation
      shapes.forEach((shape, i) => {
        gsap.fromTo(
          shape,
          { opacity: 0, scale: 0, rotation: 0 },
          {
            opacity: 1,
            scale: 1,
            rotation: 360,
            duration: 1.5,
            delay: i * 0.1,
            ease: "back.out(1.7)",
          }
        );

        // Floating and rotating
        gsap.to(shape, {
          y: `+=${(Math.random() - 0.5) * 50}`,
          rotation: 360,
          duration: Math.random() * 4 + 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Logo reveal with distortion effect
      timeline.fromTo(
        logoRef.current,
        { 
          scale: 0.5, 
          opacity: 0,
          filter: "blur(20px) brightness(200%)"
        },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px) brightness(100%)",
          duration: 1.5,
          ease: "power4.out",
        },
        0
      );

      // Progress animation
      timeline.to(
        progress,
        {
          value: 100,
          duration: 2.8,
          ease: "expo.inOut",
          onUpdate: () => {
            const value = Math.round(progress.value);
            if (progressRef.current) {
              progressRef.current.textContent = value;
              
              // Update phrase based on progress
              const phrases = [
                "INITIALIZING",
                "LOADING ASSETS",
                "OPTIMIZING",
                "RENDERING UI",
                "ALMOST READY",
                "WELCOME"
              ];
              const index = Math.floor((value / 100) * (phrases.length - 1));
              setCurrentPhrase(phrases[index]);
            }
          },
        },
        0.5
      );

      // Progress bar wave effect
      timeline.to(
        ".progress-wave",
        {
          x: "100%",
          duration: 0.5,
          repeat: -1,
          ease: "none",
        },
        0.5
      );

      // Glitch effect on logo at 50%
      timeline.to(
        logoRef.current,
        {
          x: "+=5",
          duration: 0.05,
          repeat: 3,
          yoyo: true,
          ease: "none",
        },
        1.9
      );

      // Final pulse and glow
      timeline.to(
        logoRef.current,
        {
          scale: 1.1,
          filter: "brightness(120%) drop-shadow(0 0 20px rgba(0,0,0,0.3))",
          duration: 0.3,
          ease: "power2.out",
        },
        3.0
      );

      timeline.to(
        logoRef.current,
        {
          scale: 1,
          filter: "brightness(100%) drop-shadow(0 0 0px rgba(0,0,0,0))",
          duration: 0.5,
          ease: "power2.inOut",
        },
        3.3
      );
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-gradient-to-br from-gray-50 via-white to-gray-100 touch-none overflow-hidden"
      initial={{ opacity: 1 }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="gradient-animation absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/10 to-transparent animate-gradient-shift opacity-30" />
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, #000 1px, transparent 1px),
            linear-gradient(0deg, #000 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Particles */}
      <div className="particles-container absolute inset-0 pointer-events-none" />
      
      {/* Floating shapes */}
      <div className="shapes-container absolute inset-0 pointer-events-none" />

      {/* Main content */}
      <div className="h-full flex flex-col items-center justify-center px-6 relative">
        <div className="content flex flex-col items-center max-w-md w-full relative z-10">
          
          {/* Logo with gradient text */}
          <div className="relative mb-16">
            <div 
              ref={logoRef}
              className="relative z-10 text-center"
            >
              <div className="flex flex-col items-center">
                <div className="text-5xl md:text-6xl font-black tracking-tighter mb-3">
                  <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent animate-gradient-x">
                    BuildCrew
                  </span>
                </div>
                <div className="text-xs tracking-[0.4em] text-gray-400 uppercase font-medium">
                  DIGITAL CREATORS
                </div>
              </div>
            </div>
            
            {/* Orbital rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative w-48 h-48 md:w-56 md:h-56">
                {[0, 1, 2].map((ring) => (
                  <div
                    key={ring}
                    className="absolute inset-0 border border-gray-300/30 rounded-full animate-spin"
                    style={{
                      animationDuration: `${8 + ring * 2}s`,
                      animationDirection: ring % 2 === 0 ? 'normal' : 'reverse',
                      borderWidth: `${0.5 + ring * 0.3}px`,
                      top: `${ring * 8}px`,
                      left: `${ring * 8}px`,
                      right: `${ring * 8}px`,
                      bottom: `${ring * 8}px`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Progress circle */}
          <div className="relative mb-12">
            <div className="relative w-24 h-24 md:w-28 md:h-28">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="#f0f0f0"
                  strokeWidth="4"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="301.6"
                  strokeDashoffset="301.6"
                  className="progress-circle"
                  style={{
                    strokeDashoffset: "calc(301.6 - (301.6 * var(--progress, 0) / 100))"
                  }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4b5563" />
                    <stop offset="100%" stopColor="#1f2937" />
                  </linearGradient>
                </defs>
              </svg>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-baseline">
                  <span 
                    ref={progressRef}
                    className="text-2xl md:text-3xl font-bold text-gray-900 font-mono"
                  >
                    0
                  </span>
                  <span className="text-sm text-gray-500 font-medium ml-1">%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status phrase */}
          <div className="mb-12 text-center">
            <div className="relative">
              <motion.div
                key={currentPhrase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-sm md:text-base font-medium text-gray-600 tracking-wider uppercase"
              >
                {currentPhrase}
              </motion.div>
              <div className="mt-2 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            </div>
          </div>

          {/* Animated progress bar */}
          <div className="w-full max-w-xs mb-16">
            <div className="relative h-1 bg-gray-200/50 rounded-full overflow-hidden">
              <div className="progress-wave absolute inset-0 w-20 bg-gradient-to-r from-transparent via-gray-400/30 to-transparent" />
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ 
                  duration: 2.8, 
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
            </div>
            
            {/* Animated dots */}
            <div className="flex justify-between mt-4">
              {[0, 25, 50, 75, 100].map((marker, index) => (
                <div key={marker} className="flex flex-col items-center">
                  <motion.div
                    className="w-2 h-2 bg-gray-400 rounded-full"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                  <span className="mt-2 text-xs text-gray-400 font-medium">
                    {marker}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Loading indicator */}
          <div className="flex items-center gap-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
            <span className="text-xs text-gray-500 tracking-widest">LOADING</span>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <div className="text-xs text-gray-300/50 tracking-widest font-mono">
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              CRAFTING DIGITAL EXPERIENCES
            </motion.span>
          </div>
        </div>
      </div>

      {/* Global styles */}
      <style>{`
        :root {
          --progress: 0;
        }
        
        .animate-gradient-shift {
          background-size: 400% 400%;
          animation: gradientShift 8s ease infinite;
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradientX 3s ease infinite;
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes gradientX {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .progress-circle {
          transition: stroke-dashoffset 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </motion.div>
  );
};

export default Loader;