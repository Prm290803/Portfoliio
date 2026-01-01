import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Globe, Palette, Smartphone, Code, Plug, Wrench, Cloud } from 'lucide-react';
import { Layout } from '../../components/Layout';
import PageTransition from "../../components/PageTransition";
import servicesData from '../../Data/Services.json';

gsap.registerPlugin(ScrollTrigger);

// Import icon components
const iconComponents = {
  'Globe': Globe,
  'Palette': Palette,
  'Smartphone': Smartphone,
  'Code': Code,
  'Plug': Plug,
  'Cloud': Cloud,
  'Wrench': Wrench
};

// Use data from JSON file
const services = servicesData.services || [];

const Services = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Hero animation
    const ctx = gsap.context(() => {
      // Main title animation - split characters
      const chars = gsap.utils.toArray('.hero-char');
      gsap.fromTo(chars,
        {
          y: 150,
          opacity: 0,
          rotateX: -20,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          duration: 1.5,
          ease: 'power4.out',
          stagger: 0.03,
          delay: 0.4
        }
      );

      // Subtitle animation with in/out
      gsap.fromTo('.hero-subtitle',
        {
          y: 40,
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          delay: 1.2,
          scrollTrigger: {
            trigger: '.hero-subtitle',
            start: 'top 90%',
            end: 'bottom 20%',
            scrub: 1.5,
            toggleActions: 'play none reverse none'
          }
        }
      );

      // Label animation
      gsap.fromTo('.hero-label',
        {
          x: -30,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.8,
          scrollTrigger: {
            trigger: '.hero-label',
            start: 'top 90%',
            end: 'bottom 20%',
            scrub: 1.5,
            toggleActions: 'play none reverse none'
          }
        }
      );

      // Grid lines animation
      const gridLines = gsap.utils.toArray('.grid-line');
      gridLines.forEach((line, i) => {
        gsap.fromTo(line,
          {
            scaleY: 0,
            transformOrigin: "top center"
          },
          {
            scaleY: 1,
            duration: 2,
            ease: 'power4.inOut',
            delay: 0.8 + (i * 0.2),
            scrollTrigger: {
              trigger: line,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 1,
              toggleActions: 'play none reverse none'
            }
          }
        );
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Services grid animation with smooth in/out
    const ctx = gsap.context(() => {
      // Section title animation
      gsap.fromTo('.section-title',
        {
          y: 80,
          opacity: 0,
          scale: 0.9,
          rotateX: -10
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-section',
            start: 'top 85%',
            end: 'top 40%',
            scrub: 1.5,
            toggleActions: 'play none reverse none'
          }
        }
      );

      // Cards animation with smooth in/out
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        
        // Entry animation
        gsap.fromTo(card,
          {
            y: 150,
            opacity: 0,
            rotateX: -15,
            scale: 0.9,
            filter: 'blur(10px)'
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.2,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              end: 'top 30%',
              scrub: 1.5,
              toggleActions: 'play none reverse none',
              markers: false
            }
          }
        );

        // Card content animation (staggered)
        const contentElements = card.querySelectorAll('.card-content > *');
        contentElements.forEach((el, j) => {
          gsap.fromTo(el,
            {
              y: 30,
              opacity: 0
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: 0.3 + (j * 0.1),
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'top 40%',
                scrub: 1,
                toggleActions: 'play none reverse none'
              }
            }
          );
        });

        // Features list animation
        const features = card.querySelectorAll('.feature-item');
        features.forEach((feature, j) => {
          gsap.fromTo(feature,
            {
              x: -30,
              opacity: 0
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              delay: 0.5 + (j * 0.05),
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 75%',
                end: 'top 45%',
                scrub: 1,
                toggleActions: 'play none reverse none'
              }
            }
          );
        });

        // Hover effects
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -15,
            scale: 1.02,
            duration: 0.6,
            ease: 'power2.out'
          });
          gsap.to(card.querySelector('.card-icon'), {
            rotate: 15,
            scale: 1.1,
            duration: 0.4,
            ease: 'power2.out'
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out'
          });
          gsap.to(card.querySelector('.card-icon'), {
            rotate: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out'
          });
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // CTA section animation
    const ctx = gsap.context(() => {
      // Background gradient animation
      gsap.fromTo('.cta-bg-gradient',
        {
          opacity: 0,
          scale: 0.8,
          rotation: -10
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 85%',
            end: 'top 30%',
            scrub: 1.5,
            toggleActions: 'play none reverse none'
          }
        }
      );

      // CTA content animation
      gsap.fromTo('.cta-content > *',
        {
          y: 50,
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 80%',
            end: 'top 40%',
            scrub: 1.5,
            toggleActions: 'play none reverse none'
          }
        }
      );

      // Button hover animation
      const button = document.querySelector('.cta-button');
      if (button) {
        button.addEventListener('mouseenter', () => {
          gsap.to('.button-arrow', {
            x: 5,
            y: -5,
            duration: 0.3,
            ease: 'power2.out'
          });
          gsap.to('.button-gradient', {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out'
          });
        });

        button.addEventListener('mouseleave', () => {
          gsap.to('.button-arrow', {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
          gsap.to('.button-gradient', {
            opacity: 0.5,
            duration: 0.4,
            ease: 'power2.out'
          });
        });
      }

    }, ctaRef);

    return () => ctx.revert();
  }, []);

  // Split text into characters for animation
  const splitText = (text) => {
    return text.split('').map((char, index) => (
      <span key={`char-${index}`} className="hero-char inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <Layout>
      <PageTransition>
        <div>
          {/* Hero */}
          <section 
            className="min-h-[70vh] flex items-end pb-20 pt-10 md:pt-30 relative overflow-hidden"
            ref={heroRef}
          >
            <div className="container mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
                <div className="md:col-span-8">
                  <span className="hero-label label-editorial text-muted-foreground mb-6 block">
                    Our Services
                  </span>
                  <div ref={titleRef} className="overflow-hidden">
                    <h1 className="headline-xl mb-8">
                      <div className="block overflow-hidden mb-2">
                        <span className="block">
                          {splitText('What We')}
                        </span>
                      </div>
                      <div className="block overflow-hidden">
                        <span className="block">
                          {splitText('Offer')}
                        </span>
                      </div>
                    </h1>
                  </div>
                </div>
                <div className="hero-subtitle md:col-span-4 flex items-end">
                  <p className="body-editorial text-muted-foreground">
                    Comprehensive digital solutions tailored to your unique needs and objectives.
                  </p>
                </div>

                {/* Grid lines */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="grid-line absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-black/10 to-transparent dark:via-white/10" />
                  <div className="grid-line absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-black/10 to-transparent dark:via-white/10" />
                  <div className="grid-line absolute left-3/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-black/10 to-transparent dark:via-white/10" />
                </div>
              </div>
            </div>
          </section>

          {/* Services Grid */}
          <section 
            className="services-section py-20 md:py-32 relative"
            ref={containerRef}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
            </div>
            
            <div className="container mx-auto px-6 md:px-12 relative z-10">
              <div className="mb-16 md:mb-24">
                <h2 className="section-title text-4xl md:text-5xl font-bold uppercase tracking-tight text-center">
                  Our Expertise
                </h2>
              </div>
              
              <div className="grid grid-cols- md:grid-cols- gap-6 md:gap-8">
                {services.map((service, index) => {
                  const IconComponent = iconComponents[service.icon] || Globe;
                  return (
                    <div
                      key={service.id || service.number}
                      ref={el => cardsRef.current[index] = el}
                      className="service-card relative group"
                    >
                      <Link 
                        to={`/services/${service.slug}`}
                        className="block p-8 md:p-10 border border-foreground/10 hover:border-foreground/20 transition-colors duration-300 bg-background/50 backdrop-blur-sm relative overflow-hidden"
                      >
                        {/* Card background effects */}
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        
                        <div className="card-content relative z-10">
                          <div className="flex justify-between items-start mb-10">
                            <span className="label-editorial text-muted-foreground">
                              {String(service.number).padStart(2, '0')}
                            </span>
                            <div className="relative">
                              <IconComponent className="card-icon w-10 h-10 text-foreground/20 group-hover:text-foreground/40 transition-all duration-500" />
                              <div className="absolute inset-0 bg-primary/10 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                            </div>
                          </div>
                          
                          <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-6">
                            {service.title}
                          </h3>
                          
                          <p className="body-editorial text-muted-foreground mb-10">
                            {service.description}
                          </p>
                          
                          <div className="h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent mb-8" />
                          
                          <ul className="grid grid-cols-2 gap-3">
                            {service.features.slice(0, 4).map((feature, i) => (
                              <li 
                                key={i} 
                                className="feature-item label-editorial text-muted-foreground flex items-center"
                              >
                                <span className="w-1 h-1 bg-primary rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          
                          {/* Arrow indicator */}
                          <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2 group-hover:-translate-y-2">
                            <ArrowUpRight className="w-5 h-5 text-foreground/30 group-hover:text-primary transition-colors duration-300" />
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section 
            className="cta-section py-20 md:py-32 bg-black text-white relative overflow-hidden"
            ref={ctaRef}
          >
            {/* Animated background gradients */}
            <div className="cta-bg-gradient absolute inset-0 opacity-20">
              <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-primary/30 via-transparent to-secondary/30 animate-gradient-xy" />
              <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-r from-secondary/20 via-transparent to-primary/20 animate-gradient-xy-reverse" />
            </div>
            
            <div className="container cta-button mx-auto px-6 md:px-12 text-center relative z-10">
              <div className="cta-content max-w-3xl mx-auto">
                <span className="label-editorial text-grey-400 mb-8 block">
                  Ready to Start?
                </span>
                
                <h2 className="headline-md mb-12">
                  Let's discuss how we can help bring your vision to life.
                </h2>
                
                <Link 
                  to="/contact" 
                  className="cta-button btn-editorial group border-background text-background hover:bg-background hover:text-foreground inline-flex items-center gap-3 relative overflow-hidden"
                >
                  <span className="relative z-10">Start a Project</span>
                  <ArrowUpRight className="button-arrow w-4 h-4 relative z-10" />
                  
                  {/* Button gradient animation */}
                  <div className="button-gradient absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default Services;