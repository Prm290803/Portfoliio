import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const Loader = () => {
  const numberRef = useRef(null);
  const barRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const progress = { value: 1 };

    const update = () => {
      const v = Math.round(progress.value);

      // Update number text only (cheap)
      if (numberRef.current) {
        numberRef.current.textContent = v;
      }

      // Move marker using transform (GPU)
      if (markerRef.current) {
        markerRef.current.style.transform = `translateX(${v}%)`;
      }
    };

    gsap.to(progress, {
      value: 100,
      duration: 2.8,
      ease: "power2.inOut",
      onUpdate: update,
    });

    // Bar animation (scaleX instead of width)
    gsap.fromTo(
      barRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 2.8,
        ease: "power2.inOut",
        transformOrigin: "left center",
      }
    );
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Bottom Loader */}
      <div className="fixed bottom-8 left-0 w-full px-10">
        <div className="relative w-full">
          
          {/* Moving Number */}
          <div
            ref={markerRef}
            className="absolute -top-10 left-0x"
          >
            <span
              ref={numberRef}
              className="text-4xl font-mono tracking-tight text-black"
            >
              1
            </span>
          </div>

          {/* Track */}
          <div className="h-[1px] bg-black/15 w-full overflow-hidden">
            <div
              ref={barRef}
              className="h-full bg-black origin-left will-change-transform"
            />
          </div>
        </div>
      </div>

      {/* Subtle brand */}
      <div className="absolute top-10 right-10 text-xs tracking-[0.35em] uppercase text-black/40">
        TechMorphix
      </div>
    </motion.div>
  );
};

export default Loader;
