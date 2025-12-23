import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { Layout } from '../../components/Layout';
import PageTransition from "../../components/PageTransition";
import './homepage.css';
import { useLenis } from '../../Lenis'; // adjust path
import {Snowfall} from 'react-snowfall';

// Import placeholder images
const projectFintech = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80';
const projectEcommerce = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80';
const projectHealth = 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { title: 'Web Development', number: '01' },
  { title: 'UI/UX Design', number: '02' },
  { title: 'Mobile Apps', number: '03' },
  { title: 'Custom Software', number: '04' },
];

const projects = [
  { title: 'Fintech Dashboard', category: 'Web Development', year: '2024', image: projectFintech },
  { title: 'E-Commerce Platform', category: 'Full Stack', year: '2024', image: projectEcommerce },
  { title: 'Health App', category: 'Mobile Development', year: '2023', image: projectHealth },
];

const Home = () => {
  const heroRef = useRef(null);
  const marqueeRef = useRef(null);
  const servicesRef = useRef(null);

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

      gsap.fromTo(
        '.hero-cta',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.5 }
      );

      gsap.fromTo(
        '.hero-scroll',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.7 }
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

  return (
    <>
    

    <Layout>
      <PageTransition >
      <div ref={heroRef}>
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
          <div className="container px- md:px-5">
            <div className="max-w-7xl mx-auto">
              {/* Vertical label */}
             <div className="absolute  md:left-8 top-1/3 sm:top-1/2 md:top-5 -translate-y-1/2 lg:block md:hidden sm:hidden">
            <div className="relative lg:left-8 right-20 top-50 -translate-y-1/2 md:block  sm:hidden">
          <span className="label-vertical text-foreground/80 tracking-[0.4em] font-medium">
            Digital Studio — Est. 2024
          </span>
        </div>
            </div>
              {/* Main headline */}
            <div className="hero-title overflow-hidden top-100 md:top-30 lg:top-1/2" >
            <h1 className="headline-xl">
                <span className="block overflow-hidden">
                <span className="block">
                    {'Shaping'.split('').map((char, index) => (
                    <span key={`shaping-${index}`} className="inline-block">
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                    ))}
                </span>
                </span>
                <span className="block overflow-hidden">
                <span className="block text-stroke ">
                    {'Digital'.split('').map((char, index) => (
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

              {/* Subtitle */}
              <div className="hero-subtitle mt-6 md:mt-10 max-w-xl md:ml-auto">
             <p className="body-editorial text-muted-foreground 
                    text-sm xs:text-base text-black/50 sm:text-lg md:text-xl lg:text-xl 
                 text-left xs:text-center sm:text-center md:text-right lg:text-right 
                leading-relaxed sm:leading-relaxed md:leading-loose lg:leading-loose">
                We craft exceptional digital products through design-first engineering, 
                transforming complex challenges into elegant, scalable solutions.
                </p>
                </div>

              {/* CTA */}
     <div className="hero-cta mt-6 mb-20 md:mt-12">
  
  
  <div className="grid lg:grid-cols-2 grid-1 items-center lg:justify-end lg:items-center gap-4 md:gap-6 w-full">
    
    <Link to="/work" className="group relative overflow-hidden w-full lg:w-auto lg:min-w-[200px]">
      <div className="flex items-center justify-center gap-2 px-6 py-4 md:px-8 md:py-4 text-center transition-all duration-300 border-2 border-black bg-white text-black hover:bg-black hover:text-white hover:border-white lg:hover:scale-[1.02] active:scale-[0.98] w-full lg:w-auto">
        <span className="relative z-10 uppercase tracking-wider text-sm md:text-base">
          View our work
        </span>
        <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 transition-all duration-300 lg:group-hover:translate-x-1 lg:group-hover:-translate-y-1" />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      </div>
    </Link>
    
    <Link to="/contact" className="group relative overflow-hidden w-full lg:w-auto lg:min-w-[200px]">
      <div className="flex items-center justify-center gap-2 px-6 py-4 md:px-8 md:py-4 text-center transition-all duration-300 border-2 border-white bg-black text-white hover:bg-white hover:text-black hover:border-black w-full lg:w-auto">
        <span className="relative z-10 uppercase tracking-wider text-sm md:text-base">
          Start a project
        </span>
        <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 transition-all duration-300 lg:group-hover:translate-x-1 lg:group-hover:-translate-y-1" />
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      </div>
    </Link>
    
  </div>
</div>
            </div>
          </div>

          {/* Background grid lines */}
          <div className="absolute inset-0 pointer-events-none">
    <div className="absolute left-1/4 top-0 bottom-0 w-px bg-black/5 dark:bg-black/10" />
    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/5 dark:bg-black/10" />
    <div className="absolute left-3/4 top-0 bottom-0 w-px bg-black/5 dark:bg-black/10" />

    {/* Horizontal lines for better grid */}
    {/* <div className="absolute top-1/4 left-0 right-0 h-px bg-black/5 dark:bg-black/10" />
    <div className="absolute top-1/2 left-0 right-0 h-px bg-black/5 dark:bg-black/10" />
    <div className="absolute top-3/4 left-0 right-0 h-px bg-black/5 dark:bg-black/10" /> */}
  </div>
        </section>

        {/* Marquee */}
        <section className="py-8 border-y border-2 border-black/10 border-foreground/10 overflow-hidden" >
          <div ref={marqueeRef} className="flex whitespace-nowrap animate-marquee">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="text-4xl md:text-5xl font-black text-black/40 uppercase tracking-tight mx-8 text-foreground/10">
                Web Development • UI/UX Design • Mobile Apps • Custom Software • API Integration •
              </span>
            ))}
          </div>
        </section>

        {/* Services Preview */}
        <section ref={servicesRef} className="py-32 md:py-48">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
              <div className="md:col-span-4">
                <span className="label-editorial text-muted-foreground">What We Do</span>
                <h2 className="headline-md mt-4">Our Services</h2>
              </div>
              <div className="md:col-span-6 md:col-start-7">
                <p className="body-editorial text-muted-foreground">
                  We specialize in creating digital experiences that merge innovation with functionality, 
                  delivering solutions that drive growth and engagement.
                </p>
              </div>
            </div>

            <div className="space-y-0">
              {services.map((service) => (
                <Link
                  to="/services"
                  key={service.number}
                  className="service-item group block py-8 md:py-12 border-t border-foreground/10 last:border-b"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 md:gap-12">
                      <span className="label-editorial text-muted-foreground">{service.number}</span>
                      <h3 className="text-2xl md:text-4xl font-bold uppercase tracking-tight group-hover:translate-x-4 transition-transform duration-500">
                        {service.title}
                      </h3>
                    </div>
                    <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-2 group-hover:-translate-y-2" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-16 flex group justify-center">
              <Link to="/services" className="btn-editorial flex items-center gap-3 text-primary dark:text-primary-400">
                All Services
                <ArrowUpRight className="w-4 h-4 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-2 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>
        </section>

       {/* Featured Work - Redesigned */}
<section className="py-10 md:py-20 bg-gradient-to-b from-background to-foreground" ref={heroRef}>
  <div className="container mx-auto px-4 sm:px-6 lg:px-5">
    
    {/* Section Header - Clean & Minimal */}
    <div className="mb-16 md:mb-20">
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-block text-xs font-mono uppercase tracking-widest text-primary dark:text-primary-400 mb-4">
          Our Portfolio
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          Digital<br className="sm:hidden" /> Masterpieces
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Transforming ideas into impactful digital experiences that drive results.
        </p>
      </div>
    </div>

    {/* Projects Grid - Modern Card Design */}
    <div className="grid lg:grid-cols-8 md:grid-cols-12 gap-8">
      {projects.map((project, index) => {
        const isFeatured = index === 0;
        
        return (
          <div
            key={index}
            className={`
              group relative overflow-hidden rounded-sm transition-all duration-500
              
              hover:shadow-sm hover:-translate-y-2 
              ${isFeatured ? 'md:col-span-8' : 'md:col-span-4'}
            `}
          >
            <Link to="/work" className="block h-full">
              
              {/* Image Container */}
              <div className={`
                relative overflow-hidden bg-gray-100 dark:bg-gray-700
                ${isFeatured ? 'aspect-[21/10]' : 'aspect-square md:aspect-[4/5]'}
              `}>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10"></div>
                
                {/* Project Image */}
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Featured Badge */}
                {isFeatured && (
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-4 py-2 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-full">
                      Featured
                    </span>
                  </div>
                )}
                
                {/* Hover Overlay Content */}
                <div className="absolute inset-0 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20
                              flex items-end p-6">
                  <div className="text-white">
                    <p className="text-sm font-medium mb-2">View Case Study</p>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-px bg-white"></div>
                      <span className="text-xs uppercase tracking-widest">Explore</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-6 md:p-8">
                {/* Category & Year */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-medium uppercase tracking-wider text-primary dark:text-primary-400">
                    {project.category}
                  </span>
                  <span className="text-sm font-mono text-gray-500 dark:text-gray-400">
                    {project.year}
                  </span>
                </div>

                {/* Title */}
                <h3 className={`
                  font-bold mb-3 group-hover:text-primary dark:group-hover:text-primary-400 
                  transition-colors duration-300
                  ${isFeatured ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}
                `}>
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2">
                  {project.description || 'Strategic digital solution delivering exceptional user experience and measurable results.'}
                </p>

                {/* Tech Tags */}
                {project.tags && (
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-3 py-1 text-xs text-gray-500">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* View Link */}
                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-primary dark:text-primary-400 text-sm font-medium">
                    <span>View Project</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-1  transition-transform" />
                  </div>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-2xl transition-all duration-500"></div>
            </Link>
          </div>
        );
      })}
    </div>

    {/* View All Button - Centered */}
    <div className="mt-16 text-center">
      <Link
        to="/work"
        className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-primary-600 
                   text-black font-medium transition-all duration-300"
      >
        <span>Explore All Projects</span>
        <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover: ">
          <ArrowUpRight className="w-4 h-4 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-2 group-hover:-translate-y-1" />
        </div>
      </Link>
    </div>

    {/* Client Logos */}
    {/* <div className="mt-20 pt-12 border-t border-gray-200 dark:border-gray-800">
      <p className="text-center text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-8">
        Trusted by innovative teams
      </p>
      <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center">
        {['ONYX', 'VORTEX', 'APEX', 'NEXUS', 'VERGE'].map((client, index) => (
          <div
            key={index}
            className="text-xl font-bold text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            {client}
          </div>
        ))}
      </div>
    </div> */}
  </div>
</section>

        {/* Stats Section
        <section className="py-20 md:py-10">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {[
                { number: '150+', label: 'Projects Delivered' },
                { number: '50+', label: 'Happy Clients' },
                { number: '8+', label: 'Years Experience' },
                { number: '15', label: 'Team Members' },
              ].map((stat, index) => (
                <div key={index} className="text-center md:text-left">
                  <span className="headline-lg block mb-2">{stat.number}</span>
                  <span className="label-editorial text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* CTA Section */}
       <section className="py-25 md:py-20 bg-black text-white">
  <div className="container mx-auto px-6 md:px-12 text-center">
    <span className="label-editorial text-gray-400 mb-8 block">Ready to Start?</span>
    <h2 className="headline-lg mb-12 max-w-4xl mx-auto text-white">
      Let's Build Something<br />Extraordinary Together
    </h2>
    <Link 
      to="/contact" 
      className="btn-editorial group border-white text-white hover:bg-white hover:text-black inline-flex items-center gap-3 transition-all duration-300"
    >
      Get in Touch
      <ArrowUpRight className="w-4 h-4 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-2 group-hover:-translate-y-1" />
    </Link>
  </div>
</section>
      </div>
      </PageTransition>
    </Layout>
    </>
  );
};

export default Home;