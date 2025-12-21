// // PageTransition.jsx
// import { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import gsap from 'gsap';

// const PageTransition = ({ children }) => {
//   const location = useLocation();
//   const [displayChildren, setDisplayChildren] = useState(children);
//   const [transitionStage, setTransitionStage] = useState('in');

//   useEffect(() => {
//     // Start transition out when location changes
//     setTransitionStage('out');
    
//     const tl = gsap.timeline({
//       onComplete: () => {
//         // Swap content and transition back in
//         setDisplayChildren(children);
//         setTransitionStage('in');
//         gsap.to('.transition-layer', {
//           y: '100%',
//           stagger: 0.08,
//           ease: 'power3.inOut',
//           duration: 0.7
//         });
//       }
//     });

//     // Animate transition layers out
//     tl.to('.transition-layer', {
//       y: '0%',
//       stagger: 0.08,
//       ease: 'power3.inOut',
//       duration: 0.7
//     });

//     return () => {
//       tl.kill(); // Clean up GSAP timeline
//     };
//   }, [location.pathname, children]);

//   return (
//     <div style={{ position: 'relative', width: '100%' }}>
//       {/* Transition Overlay - Fixed positioned layers */}
//       <div style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: '100vh',
//         zIndex: 9999,
//         pointerEvents: 'none',
//         display: 'flex'
//       }}>
//         {[...Array(5)].map((_, i) => (
//           <div
//             key={i}
//             className="transition-layer"
//             style={{
//               flex: 1,
//               height: '100%',
//               backgroundColor: '#0a0a0a', // Match your site's dark bg
//               transform: 'translateY(100%)', // Start off-screen below
//               willChange: 'transform'
//             }}
//           />
//         ))}
//       </div>

//       {/* Page Content */}
//       <div style={{
//         opacity: transitionStage === 'out' ? 0.7 : 1,
//         transition: 'opacity 0.4s ease'
//       }}>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default PageTransition;


// components/DigitalCurtainTransition.jsx
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

const DigitalCurtainTransition = ({ children }) => {
  const location = useLocation();
  const contentRef = useRef(null);
  const curtainsRef = useRef([]);
  const tlRef = useRef(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Skip transition on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Clean up previous timeline
    if (tlRef.current) {
      tlRef.current.kill();
    }

    // Create new timeline
    tlRef.current = gsap.timeline({
      onStart: () => {
        // Reset curtains to starting positions (off-screen)
        curtainsRef.current.forEach((curtain, i) => {
          if (curtain) {
            gsap.set(curtain, {
              y: i % 2 === 0 ? '-100%' : '100%',
              opacity: 1
            });
          }
        });
      }
    });

    // PHASE 1: Curtains close (400ms)
    curtainsRef.current.forEach((curtain, i) => {
      if (curtain) {
        tlRef.current.to(
          curtain,
          {
            y: '0%',
            duration: 0.5,
            delay: i * 0.06, // Staggered start
            ease: 'power3.out'
          },
          0 // Start at timeline time 0
        );
      }
    });

    // PHASE 2: Show text when curtains are mostly closed
    tlRef.current.to(
      '.transition-text',
      {
        opacity: 1,
        duration: 0.2,
        ease: 'power2.out'
      },
      0.3 // Start 300ms into timeline
    );

    // PHASE 3: Open curtains (500ms)
    curtainsRef.current.forEach((curtain, i) => {
      if (curtain) {
        tlRef.current.to(
          curtain,
          {
            y: i % 2 === 0 ? '-100%' : '100%',
            duration: 0.5,
            delay: (curtainsRef.current.length - 1 - i) * 0.05, // Reverse stagger
            ease: 'power3.in'
          },
          1 // Start 1000ms into timeline
        );
      }
    });

    // PHASE 4: Hide text
    tlRef.current.to(
      '.transition-text',
      {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in'
      },
      0.9 // Start 900ms into timeline
    );

    // Cleanup
    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
      }
    };
  }, [location.pathname]);

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      {/* Transition Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        pointerEvents: 'none'
      }}>
        {/* 6 vertical curtains */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            ref={el => (curtainsRef.current[i] = el)}
            style={{
              position: 'absolute',
              top: 0,
              left: `${(i / 6) * 100}%`,
              width: `${100 / 6}%`,
              height: '100%',
              backgroundColor: 'rgba(10, 10, 10, 0.96)',
              borderRight: i < 5 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
              transform: i % 2 === 0 ? 'translateY(-100%)' : 'translateY(100%)',
              willChange: 'transform'
            }}
          >
            {/* Subtle pattern */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `linear-gradient(
                45deg, 
                rgba(255, 255, 255, 0.03) 25%, 
                transparent 25%, 
                transparent 50%, 
                rgba(255, 255, 255, 0.03) 50%, 
                rgba(255, 255, 255, 0.03) 75%, 
                transparent 75%, 
                transparent
              )`,
              backgroundSize: '8px 8px',
              opacity: 0.4
            }} />
          </div>
        ))}

        {/* Transition Text */}
        <div className="transition-text" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: 'rgba(255, 255, 255, 0.9)',
          fontFamily: 'inherit',
          fontSize: '13px',
          fontWeight: '500',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          pointerEvents: 'none',
          zIndex: 10000
        }}>
            <span className="text-xl md:text-2xl font-black uppercase tracking-[-0.02em] text-foreground">
                Tech<span className="text-stroke">Morphix</span>
              </span>          <ArrowUpRight style={{ 
            width: '16px', 
            height: '16px',
            opacity: 0.8 
          }} />
          
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default DigitalCurtainTransition;