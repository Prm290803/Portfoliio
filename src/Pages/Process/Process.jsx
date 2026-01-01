import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layout } from '../../components/Layout';
import PageTransition from '../../components/PageTransition';

const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'We begin by understanding your vision, goals, and challenges through in-depth research and collaborative workshops.',
    details: [
      'Stakeholder interviews',
      'Market research',
      'User persona development',
      'Competitive analysis',
    ],
  },
  {
    number: '02',
    title: 'Design',
    description: 'Our design team creates intuitive, beautiful interfaces that align with your brand and resonate with your users.',
    details: [
      'Wireframing',
      'Visual design',
      'Prototyping',
      'User testing',
    ],
  },
  {
    number: '03',
    title: 'Develop',
    description: 'We build robust, scalable solutions using cutting-edge technologies and best practices in software engineering.',
    details: [
      'Agile development',
      'Code reviews',
      'Quality assurance',
      'Performance optimization',
    ],
  },
  {
    number: '04',
    title: 'Deploy',
    description: 'We launch your product with precision, ensuring seamless deployment and providing ongoing support.',
    details: [
      'Staging & testing',
      'Production deployment',
      'Monitoring setup',
      'Continuous support',
    ],
  },
];

const Process = () => {
  const containerRef = useRef(null);
    const heroRef = useRef(null);

  useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);
  
  const ctx = gsap.context(() => {
    // Hero title animation
  

    // Step items animation - in AND out
    gsap.utils.toArray('.step-item').forEach((item, i) => {
      gsap.fromTo(
        item,
        { 
          x: i % 2 === 0 ? -100 : 100, 
          opacity: 0,
          scale: 0.9 
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true, // Smooth scrubbing
            toggleActions: 'play none none reverse' // Play forward, reverse on scroll back
          }
        }
      );
    });

    // Connecting line animation - in AND out
    gsap.fromTo(
      '.process-line',
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.process-steps',
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 1,
          toggleActions: 'play none none reverse'
        }
      }
    );

  }, containerRef);

  return () => ctx.revert();
}, []);


 useEffect(() => {
    // Hero animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-title span',
        { y: 200, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1.2, ease: 'power4.out', delay: 0.6 }
      );

      gsap.fromTo(
        '.hero-subtitle',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.3 }
      );

      // Services scroll animation
      gsap.utils.toArray('.service-item').forEach((item, i) => {
        gsap.fromTo(
          item,
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              end: 'bottom 10%',
            },
          }
        );
      });

      // Projects scroll animation
      gsap.utils.toArray('.project-item').forEach((item) => {
        gsap.fromTo(
          item,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            },
          }
        );
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);


  return (
    <Layout>
        <PageTransition> 
      <div ref={containerRef}>
        {/* Hero */}
        <section className="min-h-[70vh] pb-10 lg:pb-20 pt-32 relative" ref={heroRef}>
            <div className=" container w-screen px-6 md:px-12">
              <div className="grid grid-cols-1 md:grid-cols-8 gap-8">
                <div className="md:col-span-8">
                  <span className="label-editorial text-muted-foreground mb-4 block">How We Work</span>
                  <div className="hero-title overflow-hidden top-100 md:top-30 lg:top-1/2">
                    <h1 className="headline-xl">
                      <span className="block overflow-hidden">
                        <span className="block text-stroke">
                          {'Our'.split('').map((char, index) => (
                            <span key={`digital-${index}`} className="inline-block">
                              {char === ' ' ? '\u00A0' : char}
                            </span>
                          ))}
                        </span>
                      </span>
                      <span className="block overflow-hidden">
                        <span className="block">
                          {'Process'.split('').map((char, index) => (
                            <span key={`experiences-${index}`} className="inline-block">
                              {char === ' ' ? '\u00A0' : char}
                            </span>
                          ))}
                        </span>
                      </span>
                    </h1>
                  </div>
                   <div className="hero-subtitle mt-6 md:mt-10 max-w-xl md:ml-auto">
             <p className="body-editorial text-muted-foreground 
                    text-sm xs:text-base text-black/50 sm:text-lg md:text-xl lg:text-xl 
                 text-left xs:text-center sm:text-center md:text-right lg:text-right 
                leading-relaxed sm:leading-relaxed md:leading-loose lg:leading-loose">
                A structured approach to building reliable, scalable digital systems.
                </p>
                </div>
                </div>
              </div>
            </div>
            
            {/* Background grid lines */}
           <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-1/4 top-0 bottom-0 w-px bg-black/5 dark:bg-black/10" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/5 dark:bg-black/10" />
              <div className="absolute left-3/4 top-0 bottom-0 w-px bg-black/5 dark:bg-black/10" />
            </div>
          </section>
           <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/5 dark:bg-black/20" />
           
{/* Simple Scroll Down Arrow */}
<div className="flex flex-col items-center justify-center my-12 sm:my-16">
  <p className="text-gray-500 text-sm font-medium mb-4 tracking-wider">
    SCROLL TO EXPLORE
  </p>
  <div className="relative">
     
    {/* Arrow */}
    <svg 
      className="w-8 h-8 text-gray-600 mt-2 animate-bounce" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  </div>
</div>
        {/* Process Steps */}
            <section className="process-steps py-20 md:py-32">
            <div className="container mx-auto px-6 md:px-12">
                <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 hidden md:block">
                    <div className="process-line absolute inset-0 bg-black origin-top" />
                </div>

                <div className="space-y-20 md:space-y-32">
                    {steps.map((step, index) => (
                    <div
                        key={step.number}
                        className={`step-item grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 ${
                        index % 2 === 0 ? '' : 'md:text-right'
                        }`}
                    >
                        <div className={`${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                        <div className={`${index % 2 === 0 ? '' : 'md:ml-auto md:text-left'} max-w-md`}>
                            <span className="block text-6xl md:text-7xl font-bold text-gray-100 mb-4">
                            {step.number}
                            </span>
                            <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-6">
                            {step.title}
                            </h3>
                            <p className="text-base md:text-lg text-gray-600 mb-8">
                            {step.description}
                            </p>
                            <ul className="space-y-2">
                            {step.details.map((detail, i) => (
                                <li key={i} className="text-sm md:text-base text-gray-500 flex items-center gap-3">
                                <span className="w-1 h-1 bg-black rounded-full" />
                                {detail}
                                </li>
                            ))}
                            </ul>
                        </div>
                        </div>
                        <div className={`${index % 2 === 0 ? 'md:order-2' : 'md:order-1'} hidden md:flex items-center justify-center`}>
                        <div className="w-4 h-4 bg-black rounded-full relative z-10" />
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </div>
            </section>

        {/* Bottom CTA */}
        <section className="py-20 md:py-32 bg-black text-white">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">Ready to begin?</h2>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto">
              Let's start with discovery. We'll learn about your business, your users, and your goals 
              to create a roadmap for success.
            </p>
          </div>
        </section>
      </div>
        </PageTransition>
    </Layout>
  );
};

export default Process;