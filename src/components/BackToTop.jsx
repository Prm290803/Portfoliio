import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop > (documentHeight - windowHeight) * 0.5) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-40
                 p-3 rounded-full
                 bg-white/90 backdrop-blur-md
                 border border-black/10
                 shadow-lg transition-all duration-300
                 hover:bg-white hover:shadow-xl hover:scale-105
                 active:scale-95"
      aria-label="Scroll back to top"
    >
      <ArrowUpRight className="w-5 h-5 text-black rotate-[-45deg] hover:rotate-0 transition-transform duration-300" />
    </button>
  );
};

export default BackToTop;
