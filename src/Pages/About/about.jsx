import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layout } from '../../components/Layout';
import PageTransition from "../../components/PageTransition";


gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    // Hero animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-title span',
        { y: 200, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1.2, ease: 'power4.out', delay: 0.3 }
      );

      gsap.fromTo(
        '.hero-subtitle',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1 }
      );

      gsap.fromTo(
        '.hero-cta',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.2 }
      );

      gsap.fromTo(
        '.hero-scroll',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.4 }
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
              end: 'bottom 15%',
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

    useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-title',
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.3 }
      );

      gsap.fromTo(
        '.about-content > *',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.value-item',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.values-section',
            start: 'top 80%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const values = [
    { title: 'Innovation', description: 'Pushing boundaries with cutting-edge technology and creative solutions.' },
    { title: 'Excellence', description: 'Delivering exceptional quality in every line of code and pixel.' },
    { title: 'Collaboration', description: 'Working closely with clients to understand and exceed expectations.' },
    { title: 'Integrity', description: 'Building trust through transparency, honesty, and reliability.' },
  ];

  return (
    <Layout>
      <PageTransition>
      <div ref={containerRef}>
        {/* Hero */}

        <section className="min-h-[70vh] pb-20 pt-32" ref={heroRef}>
          <div className="container w-screen px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-8">
                <span className="label-editorial text-muted-foreground mb-4 block">About Us</span>
                <div className="hero-title overflow-hidden top-100 md:top-30 lg:top-1/2">
            <h1 className="headline-xl">
               <span className="block overflow-hidden">
                <span className="">
                    {'dESIGN-'.split('').map((char, index) => (
                    <span key={`digital-${index}`} className="inline-block">
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                    ))}
                </span>
                </span>
                 <span className="block overflow-hidden">
                <span className="block text-stroke ">
                    {'First'.split('').map((char, index) => (
                    <span key={`digital-${index}`} className="inline-block">
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                    ))}
                </span>
                </span>
                <span className="block overflow-hidden">
                <span className="block">
                    {'Experiences'.split('').map((char, index) => (
                    <span key={`experiences-${index}`} className="inline-block">
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                    ))}
                </span>
                </span>
            </h1>
            </div>
              </div>
            </div>
             {/* Background grid lines */}
          <div className="absolute inset-0 pointer-events-none">
    <div className="absolute left-1/4 top-0 bottom-0 w-px bg-black/5 dark:bg-black/10" />
    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/5 dark:bg-black/10" />
    <div className="absolute left-3/4 top-0 bottom-0 w-px bg-black/5 dark:bg-black/10" />
    </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 md:py-32" ref={containerRef}>
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 about-content">
              {/* Vertical Label */}
              <div className="md:col-span-1 hidden md:block">
                <span className="label-vertical text-muted-foreground">Our Story</span>
              </div>

              {/* Main Text */}
              <div className="md:col-span-6">
                <p className="text-2xl md:text-3xl font-light leading-relaxed mb-8">
                  TechMorphix was founded on a simple belief: technology should be beautiful, 
                  functional, and accessible.
                </p>
                <p className="body-editorial text-muted-foreground mb-6">
                  We are a team of designers, engineers, and strategists who are passionate 
                  about creating digital experiences that matter. Our approach combines 
                  aesthetic sensibility with technical excellence.
                </p>
                <p className="body-editorial text-muted-foreground">
                  Since our founding in 2024, we have partnered with startups and enterprises 
                  alike, helping them transform their digital presence and achieve their 
                  business objectives through thoughtful design and robust engineering.
                </p>
              </div>

              {/* Stats */}
              <div className="md:col-span-4 md:col-start-9">
                <div className="space-y-12">
                  {[
                    { number: '2024', label: 'Founded' },
                    { number: '5+', label: 'Team Members' },
                    { number: '10+', label: 'Projects Completed' },
                    
                  ].map((stat, index) => (
                    <div key={index}>
                      <span className="text-4xl md:text-5xl font-bold block mb-2">{stat.number}</span>
                      <span className="label-editorial text-muted-foreground">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="container mx-auto px-6 md:px-12">
          <div className="h-px bg-foreground/10" />
        </div>

        {/* Mission */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-4">
                <span className="label-editorial text-muted-foreground">Our Mission</span>
              </div>
              <div className="md:col-span-7">
                <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-8">
                  To transform complex challenges into elegant digital solutions that 
                  empower businesses and delight users.
                </h2>
                <p className="body-editorial text-muted-foreground">
                  We believe that great technology is invisible — it simply works, 
                  enhancing human experiences without friction or confusion.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 md:py-32 bg-secondary values-section">
          <div className="container mx-auto px-6 md:px-12">
            <div className="mb-16">
              <span className="label-editorial text-muted-foreground mb-4 block">What Drives Us</span>
              <h2 className="headline-md">Our Values</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {values.map((value, index) => (
                <div key={index} className="value-item p-8 md:p-12 border border-foreground/10 bg-background">
                  <span className="label-editorial text-muted-foreground mb-4 block">0{index + 1}</span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{value.title}</h3>
                  <p className="body-editorial text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      </PageTransition>
    </Layout>
  );
};

export default About;