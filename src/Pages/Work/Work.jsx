import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { Layout } from '../../components/Layout';
import PageTransition from "../../PageTransition";
import projectData from '../../Data/Projects.json';

const categories = ['All', 'Web Development', 'Mobile Development', 'UI/UX Design', 'Full Stack', 'Custom Software'];

const Work = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6); // Show 6 projects initially

  // Use imported data directly
  useEffect(() => {
    setProjects(projectData.projects || projectData);
  }, []);

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  // Animation effects

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
  useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);
  
  const ctx = gsap.context(() => {
    // Hero title - in AND out
    gsap.fromTo(
      '.hero-title span',
      { 
        y: 200, 
        opacity: 0,
        scale: 0.9 
      },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        stagger: 0.1, 
        duration: 1.2, 
        ease: 'power4.out', 
        delay: 0.3,
        scrollTrigger: {
          trigger: '.hero-title',
          start: 'top 90%',
          end: 'bottom 10%',
          scrub: 1,
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Project cards - in AND out
    gsap.utils.toArray('.project-card').forEach((card) => {
      gsap.fromTo(
        card,
        { 
          y: 80, 
          opacity: 0,
          rotateX: -10,
          scale: 0.95 
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'bottom 15%',
            scrub: 1,
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

  }, containerRef);

  return () => ctx.revert();
}, [activeFilter, projects.length, visibleCount]);

  // Load more projects
  const loadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  // Reset visible count when filter changes
  useEffect(() => {
    setVisibleCount(6);
  }, [activeFilter]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMoreProjects = filteredProjects.length > visibleCount;

  return (
    <Layout>
      <PageTransition>
        <div>
          {/* Head Section */}
          <section className="min-h-[70vh] pb-20 pt-32 relative" ref={heroRef}>
            <div className="container w-screen px-6 md:px-12">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-8">
                  <span className="label-editorial text-muted-foreground mb-4 block">Our Work</span>
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
                          {'Projects'.split('').map((char, index) => (
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
            </div>
            
            {/* Background grid lines */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-1/4 top-0 bottom-0 w-px bg-black/5 dark:bg-black/10" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/5 dark:bg-black/10" />
              <div className="absolute left-3/4 top-0 bottom-0 w-px bg-black/5 dark:bg-black/10" />
            </div>
          </section>

          {/* Filters - Mobile friendly */}
          <section className="py-6 border-y border-gray-200">
            <div className="container mx-auto px-6 md:px-12">
              <div className="flex overflow-x-auto md:flex-wrap gap-4 md:gap-8 pb-2 md:pb-0 scrollbar-hide">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`flex-shrink-0 text-sm md:text-base uppercase tracking-widest transition-colors duration-300 whitespace-nowrap px-3 py-1.5 md:px-0 md:py-0 ${
                      activeFilter === category 
                        ? 'text-black font-medium border-b-2 border-black' 
                        : 'text-gray-500 hover:text-black'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Projects Grid - FIXED */}
          <section className="py-20 md:py-32" ref={containerRef}>
            <div className="container mx-auto px-6 md:px-12">
              {projects.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-600">No projects found.</p>
                </div>
              ) : (
                <>
                  {/* Fixed Grid */}
                  <div ref={containerRef} className="grid lg:grid-cols-5  justify-between md:grid-cols-6 gap-8">
                    {visibleProjects.map((project) => (
                      <div
                        key={project.id}
                        className={`project-card group cursor-pointer ${
                          project.size === 'large' ? 'md:col-span-3' : 'md:col-span-2'
                        }`}
                      >
                        <div className={`
                          relative mb-6 overflow-hidden bg-gray-100
                          ${project.size === 'large' ? 'aspect-[21/9]' : 'aspect-[4/5]'}
                        `}>
                          {/* Project Image - Black & white by default, color on hover */}
                          {project.image ? (
                            <div className="relative w-full h-full">
                              {/* Black & white image layer */}
                              <img 
                                src={project.image} 
                                alt={project.title}
                                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                                loading="lazy"
                              />
                              {/* Color image layer (visible on hover) */}
                              <img 
                                src={project.image} 
                                alt={project.title}
                                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-700"
                                loading="lazy"
                              />
                            </div>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gradient-to-br from-gray-200 to-gray-300">
                              <div className="text-center">
                                <p className="text-lg font-medium text-gray-600">{project.title}</p>
                                <p className="text-sm text-gray-500 mt-2">Project Image</p>
                              </div>
                            </div>
                          )}
                          
                          {/* Hover Overlay */}
                          {/* <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            
                          </div> */}
                        </div>
                        
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-2 group-hover:translate-x-2 transition-transform duration-500">
                              {project.title}
                            </h3>
                            <p className="text-base text-gray-600 mb-2 max-w-md line-clamp-2">
                              {project.description}
                            </p>
                            <div className="flex items-center gap-4">
                              <p className="text-sm uppercase tracking-widest text-gray-500">
                                {project.category}
                              </p>
                              {project.tags && (
                                <div className="hidden md:flex flex-wrap gap-2">
                                  {project.tags.slice(0, 2).map((tag, index) => (
                                    <span key={index} className="text-xs px-2 py-1 bg-gray-200 rounded">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          <span className="text-sm uppercase tracking-widest text-gray-500">
                            {project.year}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                 {/* Load More / See Less Buttons */}
{filteredProjects.length > 0 && (
  <div className="mt-16 text-center">
    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
      
      {/* Load More Button (shows when there are more projects) */}
      {hasMoreProjects && (
        <button
          onClick={loadMore}
          className="inline-flex items-center gap-3 px-8 py-4 border-2 border-black bg-white text-black text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 group"
        >
          Load More Projects
          <ArrowUpRight className="w-4 h-4 transform group-hover:rotate-45 transition-transform duration-300" />
        </button>
      )}
      
      {/* See Less Button (shows when we're showing more than initial count) */}
      {visibleCount > 6 && (
        <button
          onClick={() => setVisibleCount(6)}
          className="inline-flex items-center gap-3 px-8 py-4 border-2 border-gray-300 text-gray-600 text-sm uppercase tracking-widest hover:border-black hover:text-black transition-all duration-300 group"
        >
          Show Less
          <ArrowUpRight className="w-4 h-4 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
        </button>
      )}
      
    </div>
    
  </div>
)}

            
                </>
              )}
            </div>
          </section>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default Work;