import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const ScrollTopButton = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHidden(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1, // footer slightly visible
      }
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll back to top"
      className={`
        fixed bottom-8 group right-8 z-50
        p-3 rounded-full
        bg-white/40 backdrop-blur-md
        border border-black/10
        shadow-lg
        transition-all duration-300 ease-out
        group-hover:bg-white group-hover:shadow-xl group-hover:scale-105
        active:scale-95
        ${hidden ? "opacity-0 pointer-events-none translate-y-4" : "opacity-100"}
      `}
    >
      <ArrowUpRight className="w-5 h-5 text-black rotate-[-45deg] transition-transform duration-300 group-hover:rotate-0" />
    </button>
  );
};

export default ScrollTopButton;
