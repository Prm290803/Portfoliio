import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { Layout } from '../../components/Layout';
import PageTransition from "../..//components/PageTransition";
import projectData from '../../Data/Project.json';
import { useNavigate } from 'react-router-dom';

const categories = ['All', 'Web Development', 'Mobile Development', 'UI/UX Design', 'Full Stack', 'Custom Software'];

const Work = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
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
            start: 'top 90%',
            end: 'bottom 10%',
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
      <div className="text-center py-32">
        <div className="inline-block mb-6">
          <svg className="w-16 h-16 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">No projects found</h3>
        <p className="text-gray-600 max-w-md mx-auto">We couldn't find any projects matching your criteria.</p>
        <button
          onClick={() => setActiveFilter('All')}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 hover:border-black hover:text-black transition-all duration-300 rounded-full text-sm"
        >
          View All Projects
        </button>
      </div>
    ) : (
      <>
        {/* Results Counter */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              {filteredProjects.length} Project{filteredProjects.length !== 1 ? 's' : ''}
            </h3>
            <p className="text-gray-600">
              {activeFilter === 'All' 
                ? 'Showing all projects' 
                : `Filtered by: ${activeFilter}`
              }
            </p>
          </div>
          {activeFilter !== 'All' && (
            <button
              onClick={() => setActiveFilter('All')}
              className="text-sm uppercase tracking-widest text-gray-500 hover:text-black transition-colors duration-300 flex items-center gap-2"
            >
              Clear Filter
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols- md:grid-cols-2 lg:grid-cols-2 gap-8">
          {visibleProjects.map((project) => (
            <div
              key={project.id}
              className="project-card group"
              onClick={() => navigate(`/work/${project.id}`)}
            >
              {/* Project Image Container */}
              <div className={`
                relative mb-6 overflow-hidden rounded-2xl
                ${project.size === 'large' ? 'aspect-video' : 'aspect-[4/5]'}
                transition-all duration-500 ease-out
                group-hover:shadow-2xl group-hover:scale-[1.02]
              `}>
                {/* Project Image */}
                {project.image ? (
                  <div className="relative w-full h-full">
                    {/* Black & white image layer */}
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                      loading="lazy"
                    />
                    {/* Color image layer (visible on hover) */}
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out"
                      loading="lazy"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    {/* View Project Button (appears on hover) */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full text-sm font-medium">
                          View Project
                          <ArrowUpRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-xs uppercase tracking-widest rounded-full">
                        {project.category}
                      </span>
                    </div>
                    
                    {/* Year Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="inline-block px-3 py-1 bg-black/80 text-white text-xs uppercase tracking-widest rounded-full">
                        {project.year}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-gray-200 group-hover:to-gray-300 transition-all duration-500">
                    <div className="text-center p-8">
                      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <p className="text-lg font-medium text-gray-600">{project.title}</p>
                      <p className="text-sm text-gray-500 mt-2">Project Preview</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Project Info */}
              <div className="px-2">
                <div className="mb-4">
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-3 group-hover:text-black transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-base text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                {/* Tags and Meta */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag, index) => (
                        <span 
                          key={index} 
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 text-xs rounded-full group-hover:bg-gray-200 transition-colors duration-300"
                        >
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-500 text-xs rounded-full">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                  
                  {/* View Arrow */}
                  <div className="flex items-center gap-2 text-gray-400 group-hover:text-black transition-colors duration-300">
                    <span className="text-sm">View Details</span>
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More / See Less Buttons */}
        {filteredProjects.length > 0 && (
          <div className="mt-20 text-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              {/* Load More Button */}
              {hasMoreProjects && (
                <button
                  onClick={loadMore}
                  className="group inline-flex items-center gap-3 px-10 py-4 bg-black text-white text-sm uppercase tracking-widest hover:bg-gray-900 transition-all duration-300 rounded-full"
                >
                  <span>Load More Projects</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:rotate-45 transition-transform duration-300" />
                </button>
              )}
              
              {/* See Less Button */}
              {visibleCount > 6 && (
                <button
                  onClick={() => setVisibleCount(6)}
                  className="group inline-flex items-center gap-3 px-10 py-4 border-2 border-gray-200 text-gray-600 text-sm uppercase tracking-widest hover:border-black hover:text-black transition-all duration-300 rounded-full"
                >
                  <span>Show Less</span>
                  <svg className="w-4 h-4 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              )}
              
              {/* Scroll to Top Button (when showing many projects) */}
              {visibleCount > 12 && (
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="group inline-flex items-center gap-2 px-6 py-3 text-gray-500 text-sm uppercase tracking-widest hover:text-black transition-colors duration-300"
                >
                  <svg className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  <span>Back to Top</span>
                </button>
              )}
            </div>
            
            {/* Results Counter */}
            <p className="mt-8 text-sm text-gray-500">
              Showing {Math.min(visibleCount, filteredProjects.length)} of {filteredProjects.length} projects
              {filteredProjects.length > 6 && ' • '}
              {filteredProjects.length > 6 && (
                <button
                  onClick={() => setVisibleCount(filteredProjects.length)}
                  className="text-black hover:underline"
                >
                  Show all {filteredProjects.length} projects
                </button>
              )}
            </p>
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