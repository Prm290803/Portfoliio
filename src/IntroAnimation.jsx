// import { useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import gsap from "gsap";

// const Loader = () => {
//   const numberRef = useRef(null);
//   const barRef = useRef(null);
//   const markerRef = useRef(null);

//   useEffect(() => {
//     const progress = { value: 1 };

//     const update = () => {
//       const v = Math.round(progress.value);

//       // Update number text only (cheap)
//       if (numberRef.current) {
//         numberRef.current.textContent = v;
//       }

//       // Move marker using transform (GPU)
//       if (markerRef.current) {
//         markerRef.current.style.transform = `translateX(${v}%)`;
//       }
//     };

//     gsap.to(progress, {
//       value: 100,
//       duration: 2.8,
//       ease: "power2.inOut",
//       onUpdate: update,
//     });

//     // Bar animation (scaleX instead of width)
//     gsap.fromTo(
//       barRef.current,
//       { scaleX: 0 },
//       {
//         scaleX: 1,
//         duration: 2.8,
//         ease: "power2.inOut",
//         transformOrigin: "left center",
//       }
//     );
//   }, []);

//   return (
//     <motion.div
//       className="fixed inset-0 z-[9999] bg-white"
//       initial={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.8, ease: "easeInOut" }}
//     >
//       {/* Bottom Loader */}
//       <div className="fixed bottom-8 left-0 w-full px-10">
//         <div className="relative w-full">
          
//           {/* Moving Number */}
//           <div
//             ref={markerRef}
//             className="absolute -top-10 left-0x"
//           >
//             <span
//               ref={numberRef}
//               className="text-4xl font-mono tracking-tight text-black"
//             >
//               1
//             </span>
//           </div>

//           {/* Track */}
//           <div className="h-[1px] bg-black/15 w-full overflow-hidden">
//             <div
//               ref={barRef}
//               className="h-full bg-black origin-left will-change-transform"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Subtle brand */}
//       <div className="absolute top-10 right-10 text-xs tracking-[0.35em] uppercase text-black/40">
//         Build Crew Studios
//       </div>
//     </motion.div>
//   );
// };

// export default Loader;

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
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
        0
      );

      // Main progress animation
      timeline.to(
        progress,
        {
          value: 100,
          duration: 3, // Total 3 seconds
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
                "Initializing Experience",
                "Loading Interface",
                "Optimizing Performance",
                "Finalizing Setup",
                "Experience Ready",
              ];
              const index = Math.floor(value / 20);
              progressTextRef.current.textContent = phrases[index];
            }
          },
        },
        0.5
      );

      // Bar fill
      timeline.fromTo(
        barRef.current,
        { scaleX: 0, opacity: 0.7 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 2.8,
          ease: "expo.inOut",
          transformOrigin: "left center",
        },
        0.5
      );

      // Shine effect
      timeline.fromTo(
        shineRef.current,
        { x: "-100%" },
        {
          x: "200%",
          duration: 1.5,
          ease: "power2.inOut",
          repeat: 1,
          repeatDelay: 1,
        },
        0.8
      );

      // Milestone pulses
      [33, 66, 100].forEach((milestone) => {
        timeline.to(
          numberRef.current,
          {
            scale: 1.1,
            duration: 0.2,
            repeat: 1,
            yoyo: true,
            ease: "power2.out",
          },
          (milestone / 100) * 3 + 0.5
        );
      });

      // Final celebration
      timeline.to(
        numberRef.current,
        {
          scale: 1.15,
          color: "#000000",
          duration: 0.4,
          ease: "back.out(1.7)",
        },
        3
      );

      timeline.to(
        barRef.current,
        {
          scaleX: 1.02,
          duration: 0.3,
        },
        3
      );

      timeline.to(
        ".loading-text",
        {
          opacity: 0,
          y: -10,
          duration: 0.4,
        },
        3.1
      );
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-gradient-to-b from-white to-gray-50"
      initial={{ opacity: 1 }}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 30% 50%, rgba(120, 119, 198, 0.03) 0%, transparent 50%)",
              "radial-gradient(circle at 70% 50%, rgba(120, 119, 198, 0.03) 0%, transparent 50%)",
              "radial-gradient(circle at 30% 50%, rgba(120, 119, 198, 0.03) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="h-full flex flex-col items-center justify-center relative px-4">
        {/* Percentage counter */}
        <div className="relative mb-16 md:mb-20">
          <div className="relative">
            <span
              ref={numberRef}
              className="text-[120px] md:text-[160px] font-bold font-mono text-black/90 tabular-nums tracking-tighter leading-none"
            >
              000
            </span>
            <motion.span
              className="absolute top-3 md:top-4 -right-6 md:-right-8 text-2xl md:text-4xl font-mono text-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              %
            </motion.span>
          </div>
        </div>

        {/* Progress area */}
        <div className="w-full max-w-2xl md:max-w-3xl">
          {/* Status text */}
          <div className="mb-10 md:mb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
              <motion.span
                className="loading-text text-base md:text-lg font-medium text-black/60 tracking-wider uppercase text-center md:text-left"
                initial={{ opacity: 0 }}
              >
                Welcome to BuildCrew
              </motion.span>
              <motion.span
                ref={progressTextRef}
                className="text-sm font-mono text-black/40 text-center md:text-right"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Initializing Experience
              </motion.span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative">
            <div className="h-1 md:h-2 bg-gradient-to-r from-black/5 via-black/10 to-black/5 rounded-full overflow-hidden">
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
                  className="w-3 h-3 md:w-4 md:h-4 bg-white border-2 border-black rounded-full shadow-lg"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(0,0,0,0.1)",
                      "0 0 0 4px rgba(0,0,0,0.05)",
                      "0 0 0 0 rgba(0,0,0,0.1)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>

            {/* Scale */}
            <div className="flex justify-between mt-6 px-1">
              {[0, 25, 50, 75, 100].map((value) => (
                <div key={value} className="flex flex-col items-center">
                  <div className="w-px h-2 bg-black/20" />
                  <span className="mt-2 text-[10px] md:text-[11px] font-medium text-black/30">
                    {value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Brand */}
        <motion.div
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="text-center">
            <div className="text-xs md:text-sm tracking-[0.3em] md:tracking-[0.5em] uppercase text-black/30 font-light">
              BUILDCREW STUDIOS
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loader;