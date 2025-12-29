// IntroAnimation.jsx
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const Loader = ({ onComplete }) => {
  const numberRef = useRef(null);
  const barRef = useRef(null);
  const markerRef = useRef(null);
  const progressTextRef = useRef(null);
  const shineRef = useRef(null);
  const containerRef = useRef(null);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    if (hasCompletedRef.current) return;

    let ctx = gsap.context(() => {
      const progress = { value: 0 };
      const timeline = gsap.timeline({
        defaults: { ease: "expo.out" },
        onComplete: () => {
          hasCompletedRef.current = true;
          
          // Exit animation
          const exitTimeline = gsap.timeline({
            onComplete: () => {
              if (onComplete) onComplete();
            }
          });

          exitTimeline.to([numberRef.current, markerRef.current], {
            opacity: 0,
            scale: 0.95,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.in",
          }, 0);

          exitTimeline.to(
            barRef.current,
            {
              scaleX: 0,
              opacity: 0,
              duration: 0.6,
              transformOrigin: "right center",
              ease: "power2.in",
            },
            0.1
          );

          exitTimeline.to(
            containerRef.current,
            {
              opacity: 0,
              duration: 0.7,
              ease: "power3.out",
            },
            0.2
          );
        },
      });

      // Initial reveal
      timeline.fromTo(
        ".loading-text",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        0
      );

      // Main progress animation
      timeline.to(
        progress,
        {
          value: 100,
          duration: 2.8,
          ease: "expo.inOut",
          onUpdate: () => {
            const value = Math.round(progress.value);
            if (numberRef.current) {
              numberRef.current.textContent = value.toString().padStart(3, "0");
            }
            if (markerRef.current) {
              const easedProgress = gsap.parseEase("expo.out")(value / 100);
              gsap.set(markerRef.current, {
                x: `${easedProgress * 100}%`,
              });
            }
            if (progressTextRef.current) {
              const phrases = [
                "Initializing...",
                "Loading Interface...",
                "Optimizing Performance...",
                "Finalizing Setup...",
                "Experience Ready!",
              ];
              const index = Math.floor(value / 20);
              progressTextRef.current.textContent = phrases[index];
            }
          },
        },
        0.4
      );

      // Bar fill
      timeline.fromTo(
        barRef.current,
        { scaleX: 0, opacity: 0.7 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 2.6,
          ease: "expo.inOut",
          transformOrigin: "left center",
        },
        0.4
      );

      // Shine effect
      timeline.fromTo(
        shineRef.current,
        { x: "-100%" },
        {
          x: "200%",
          duration: 1.2,
          ease: "power2.inOut",
          repeat: 1,
          repeatDelay: 0.8,
        },
        0.6
      );

      // Milestone pulses
      [33, 66, 100].forEach((milestone) => {
        timeline.to(
          numberRef.current,
          {
            scale: 1.08,
            duration: 0.15,
            repeat: 1,
            yoyo: true,
            ease: "power2.out",
          },
          (milestone / 100) * 2.8 + 0.4
        );
      });

      // Final celebration
      timeline.to(
        numberRef.current,
        {
          scale: 1.1,
          color: "#000000",
          duration: 0.3,
          ease: "back.out(1.7)",
        },
        2.8
      );

      timeline.to(
        barRef.current,
        {
          scaleX: 1.02,
          duration: 0.2,
        },
        2.8
      );

      timeline.to(
        ".loading-text",
        {
          opacity: 0,
          y: -8,
          duration: 0.3,
        },
        2.9
      );
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-white touch-none"
      initial={{ opacity: 1 }}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 30% 50%, rgba(120, 119, 198, 0.02) 0%, transparent 50%)",
              "radial-gradient(circle at 70% 50%, rgba(120, 119, 198, 0.02) 0%, transparent 50%)",
              "radial-gradient(circle at 30% 50%, rgba(120, 119, 198, 0.02) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      </div>
   
      <div className="h-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 relative">
        {/* Logo centered at top */}
        <motion.div
          className="absolute top-8 sm:top-10 md:top-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="flex flex-col items-center">
            <img 
              src="/Logo.png" 
              alt="BuildCrew Logo" 
              className="h-10 w-8 sm:h-14 sm:w-10 md:h-18 md:w-14 mb-2"
            />
            <div className="text-[10px] sm:text-xs md:text-sm tracking-[0.15em] sm:tracking-[0.2em] text-black/40 uppercase font-light">
              BuildCrew
            </div>
          </div>
        </motion.div>

        {/* Main content container */}
        <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl px-2">
          {/* Welcome text */}
          <motion.div
            className="text-center mb-8 sm:mb-10 md:mb-12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-base sm:text-lg md:text-xl font-medium text-black/70 mb-1">
              Welcome to
            </h2>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black tracking-tight">
              BuildCrew Studio
            </h1>
          </motion.div>

          {/* Percentage counter */}
          <div className="relative mb-6 sm:mb-8 md:mb-10">
            <div className="flex justify-center items-end relative">
              <span
                ref={numberRef}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-mono text-black/90 tracking-tighter leading-none"
              >
                000
              </span>
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-mono text-black/50 mb-1 sm:mb-2 md:mb-3 ml-1">
                %
              </span>
            </div>
            
            {/* Progress text */}
            <div className="mt-4 sm:mt-5 text-center">
              <span
                ref={progressTextRef}
                className="text-sm sm:text-base md:text-lg font-medium text-black/50"
              >
                Initializing...
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative">
            {/* Progress track */}
            <div className="h-1.5 sm:h-2 bg-gradient-to-r from-black/5 via-black/10 to-black/5 rounded-full overflow-hidden">
              <div
                ref={barRef}
                className="h-full w-full relative bg-gradient-to-r from-black via-black/90 to-black origin-left scale-x-0 rounded-full"
              >
                <div
                  ref={shineRef}
                  className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-45"
                />
              </div>
            </div>

            {/* Marker */}
            <div
              ref={markerRef}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
            >
              <div className="relative">
                <motion.div
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 bg-white border-2 border-black rounded-full shadow-lg"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(0,0,0,0.1)",
                      "0 0 0 3px rgba(0,0,0,0.05)",
                      "0 0 0 0 rgba(0,0,0,0.1)",
                    ],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>

            {/* Scale */}
            <div className="flex justify-between mt-4 sm:mt-5 px-1">
              {[0, 25, 50, 75, 100].map((value) => (
                <div key={value} className="flex flex-col items-center">
                  <div className="w-px h-1.5 sm:h-2 bg-black/20" />
                  <span className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs font-medium text-black/30">
                    {value}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Loading message */}
          <motion.div 
            className="mt-6 sm:mt-7 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-xs sm:text-sm text-black/30 font-light">
              Loading your premium experience
            </p>
          </motion.div>
        </div>

        {/* Brand footer */}
        <motion.div
          className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-0 right-0 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="text-center px-4">
            <div className="mt-1 text-[10px] sm:text-xs text-black/15">
              Crafting Digital Excellence
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile touch prevention */}
      <div className="absolute inset-0 touch-none pointer-events-none" />
    </motion.div>
  );
};

export default Loader;
