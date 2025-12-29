// ProjectPage.jsx
import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Calendar,
  Users,
  Code,
  Globe,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Smartphone,
  Database,
  Shield,
  Clock,
  BarChart,
  MapPin,
  Cpu,
  Wifi,
  Layers,
  Monitor,
  Palette,
  Server,
  Zap,
  Award,
  TrendingUp,
  Rocket,
  Target,
  Lightbulb,
  Maximize2,
  X,
  Image as ImageIcon
} from 'lucide-react';
import { Layout } from '../../components/Layout';
import PageTransition from '../../components/PageTransition';
import projectData from '../../Data/Project.json';

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  // Find the specific project
  const projects = projectData.projects || projectData;
  const project = projects.find(p => p.id === parseInt(id));

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Navigation functions for image gallery
  const nextImage = () => {
    if (project?.images && project.images.length > 0) {
      setSelectedImageIndex((prev) => 
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (project?.images && project.images.length > 0) {
      setSelectedImageIndex((prev) => 
        prev === 0 ? project.images.length - 1 : prev - 1
      );
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen || !project?.images) return;
      
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, selectedImageIndex, project?.images]);

  // Touch/swipe support for mobile
  useEffect(() => {
    if (!isLightboxOpen || !project?.images) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
    };
    
    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };
    
    const handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextImage(); // Swipe left
        } else {
          prevImage(); // Swipe right
        }
      }
    };
    
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isLightboxOpen, selectedImageIndex, project?.images]);

  // GSAP Animations
  useEffect(() => {
    if (!project) return;
    
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero section animations
      gsap.fromTo(
        '.hero-content > *',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Project image reveal
      gsap.fromTo(
        '.project-hero-image',
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.project-hero-image',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Section animations
      gsap.utils.toArray('.content-section').forEach((section, i) => {
        gsap.fromTo(
          section,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      // Feature items animation
      gsap.utils.toArray('.feature-item').forEach((item, i) => {
        gsap.fromTo(
          item,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      // Tech stack animation
      gsap.fromTo(
        '.tech-stack-item',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.05,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.tech-stack-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Gallery items animation
      gsap.fromTo(
        '.gallery-item',
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gallery-section',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Related projects animation
      gsap.fromTo(
        '.related-project-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.related-projects-section',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Achievements animation
      gsap.fromTo(
        '.achievement-item',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.achievements-section',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Metrics animation
      gsap.fromTo(
        '.metric-item',
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.metrics-section',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, [project]);

  // If project not found
  if (!project) {
    return (
      <Layout>
        <PageTransition>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
              <p className="text-gray-600 mb-8">The project you're looking for doesn't exist.</p>
              <button
                onClick={() => navigate('/work')}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 rounded-full"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
              </button>
            </div>
          </div>
        </PageTransition>
      </Layout>
    );
  }

  // Get 3 random related projects (excluding current)
  const relatedProjects = projects
    .filter(p => p.id !== project.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  // Get icon based on technology
  const getIconForTech = (tech) => {
    const techLower = tech.toLowerCase();
    
    if (techLower.includes('android')) return <Smartphone className="w-5 h-5" />;
    if (techLower.includes('flutter')) return <Layers className="w-5 h-5" />;
    if (techLower.includes('react')) return <Monitor className="w-5 h-5" />;
    if (techLower.includes('node') || techLower.includes('express')) return <Server className="w-5 h-5" />;
    if (techLower.includes('firebase') || techLower.includes('mongodb') || techLower.includes('postgres')) return <Database className="w-5 h-5" />;
    if (techLower.includes('figma') || techLower.includes('tailwind') || techLower.includes('css')) return <Palette className="w-5 h-5" />;
    if (techLower.includes('esp32') || techLower.includes('arduino')) return <Cpu className="w-5 h-5" />;
    if (techLower.includes('gps') || techLower.includes('maps')) return <MapPin className="w-5 h-5" />;
    if (techLower.includes('java') || techLower.includes('xml') || techLower.includes('kotlin')) return <Code className="w-5 h-5" />;
    if (techLower.includes('gsap') || techLower.includes('framer') || techLower.includes('motion')) return <Rocket className="w-5 h-5" />;
    if (techLower.includes('jwt') || techLower.includes('auth') || techLower.includes('security')) return <Shield className="w-5 h-5" />;
    if (techLower.includes('bluetooth') || techLower.includes('wifi')) return <Wifi className="w-5 h-5" />;
    if (techLower.includes('vercel') || techLower.includes('aws') || techLower.includes('docker')) return <Server className="w-5 h-5" />;
    
    return <Code className="w-5 h-5" />;
  };

  // Get icon for features
  const getIconForFeature = (featureTitle) => {
    const titleLower = featureTitle.toLowerCase();
    
    if (titleLower.includes('anti-cheat') || titleLower.includes('security')) return <Shield className="w-5 h-5" />;
    if (titleLower.includes('timer') || titleLower.includes('time')) return <Clock className="w-5 h-5" />;
    if (titleLower.includes('track') || titleLower.includes('gps')) return <MapPin className="w-5 h-5" />;
    if (titleLower.includes('analytics') || titleLower.includes('score') || titleLower.includes('performance')) return <BarChart className="w-5 h-5" />;
    if (titleLower.includes('iot') || titleLower.includes('hardware')) return <Cpu className="w-5 h-5" />;
    if (titleLower.includes('real-time') || titleLower.includes('live')) return <Wifi className="w-5 h-5" />;
    if (titleLower.includes('design') || titleLower.includes('ui') || titleLower.includes('ux')) return <Palette className="w-5 h-5" />;
    if (titleLower.includes('responsive') || titleLower.includes('mobile')) return <Smartphone className="w-5 h-5" />;
    if (titleLower.includes('gamification') || titleLower.includes('rewards')) return <Award className="w-5 h-5" />;
    if (titleLower.includes('booking') || titleLower.includes('slot')) return <Target className="w-5 h-5" />;
    if (titleLower.includes('scalable') || titleLower.includes('performance')) return <Zap className="w-5 h-5" />;
    if (titleLower.includes('brand') || titleLower.includes('luxury')) return <Lightbulb className="w-5 h-5" />;
    if (titleLower.includes('animation') || titleLower.includes('smooth')) return <Rocket className="w-5 h-5" />;
    
    return <CheckCircle className="w-5 h-5" />;
  };

  // Get appropriate CTA text based on project type
  const getLiveButtonText = () => {
    const tags = project.tags || [];
    if (tags.includes('Android') || tags.includes('Mobile')) {
      return 'View on Play Store';
    } else if (tags.includes('Flutter') || tags.includes('Cross-Platform')) {
      return 'View App Demo';
    } else if (tags.includes('Web Development') || tags.includes('Full Stack')) {
      return 'View Live Website';
    } else if (tags.includes('UI/UX Design')) {
      return 'View Design Prototype';
    } else {
      return 'View Live Project';
    }
  };

  return (
    <Layout>
      <PageTransition>
        <div ref={containerRef} className="pt-20">
          {/* Back Button */}
          <div className="fixed bottom-3 lg:bottom-14 left-3 lg:left-10 z-50">
            <button
              onClick={() => navigate('/work')}
              className="group flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all duration-300 shadow-lg"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm">Back</span>
            </button>
          </div>

          {/* Project Type Badge */}
          <div className="absolute top-28 right-6 z-50">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black backdrop-blur-sm border text-white border-gray-200 md:hidden rounded-full text-sm font-medium ">
              {project.category === 'Mobile Development' ? (
                <>
                  <Smartphone className="w-4 h-4" />
                  <span>Mobile App</span>
                </>
              ) : project.category === 'Web Development' ? (
                <>
                  <Monitor className="w-4 h-4" />
                  <span>Web App</span>
                </>
              ) : project.category === 'Full Stack' ? (
                <>
                  <Server className="w-4 h-4" />
                  <span>Full Stack</span>
                </>
              ) : project.category === 'UI/UX Design' ? (
                <>
                  <Palette className="w-4 h-4" />
                  <span>UI/UX Design</span>
                </>
              ) : (
                <>
                  <Code className="w-4 h-4" />
                  <span>{project.category}</span>
                </>
              )}
            </div>
          </div>

          {/* Hero Section */}
          <section ref={heroRef} className="pt-32 pb-20 md:pb-32 relative">
            <div className="container mx-auto px-6 md:px-12">
              <div className="hero-content max-w-5xl">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-gray-500 px-3 py-1.5 bg-gray-100 rounded-full">
                    {project.category}
                  </span>
                  <span className="text-sm px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full">
                    {project.year}
                  </span>
                  {project.tags?.includes('Android') && (
                    <span className="text-sm px-3 py-1.5 bg-green-100 text-green-800 rounded-full flex items-center gap-1">
                      <Smartphone className="w-3 h-3" />
                      Android
                    </span>
                  )}
                  {project.tags?.includes('Flutter') && (
                    <span className="text-sm px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full flex items-center gap-1">
                      <Layers className="w-3 h-3" />
                      Flutter
                    </span>
                  )}
                  {project.tags?.includes('React') && (
                    <span className="text-sm px-3 py-1.5 bg-cyan-100 text-cyan-800 rounded-full flex items-center gap-1">
                      <Monitor className="w-3 h-3" />
                      React
                    </span>
                  )}
                  {project.tags?.includes('Node.js') && (
                    <span className="text-sm px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-full flex items-center gap-1">
                      <Server className="w-3 h-3" />
                      Node.js
                    </span>
                  )}
                  {project.tags?.includes('Firebase') && (
                    <span className="text-sm px-3 py-1.5 bg-orange-100 text-orange-800 rounded-full flex items-center gap-1">
                      <Database className="w-3 h-3" />
                      Firebase
                    </span>
                  )}
                  {project.tags?.includes('GSAP') && (
                    <span className="text-sm px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full flex items-center gap-1">
                      <Rocket className="w-3 h-3" />
                      GSAP
                    </span>
                  )}
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
                  {project.title}
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-4xl">
                  {project.description}
                </p>

                {/* Project Links */}
                <div className="flex flex-wrap gap-4 mb-12">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 transition-all duration-300 rounded-full shadow-lg hover:shadow-xl"
                    >
                      <Globe className="w-4 h-4" />
                      {getLiveButtonText()}
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                  )}
                  
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-6 py-3 border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 rounded-full"
                    >
                      <Github className="w-4 h-4" />
                      View Source Code
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                  )}
                </div>

                {/* Project Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-200 pt-8">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">{project.duration || '3-4 months'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Team Size</p>
                      <p className="font-medium">{project.teamSize || 'Solo Project'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Code className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Role</p>
                      <p className="font-medium">{project.role || 'Full Stack Developer'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Hero Image with Gallery Controls */}
          {project.images && project.images.length > 0 && (
            <section className="px-6 md:px-12 mb-20 md:mb-32">
              <div className="container mx-auto">
                <div className="project-hero-image relative rounded-2xl overflow-hidden shadow-2xl group">
                  <img 
                    src={project.images[selectedImageIndex] || project.image} 
                    alt={`${project.title} - Image ${selectedImageIndex + 1}`}
                    className="w-full h-auto max-h-[600px] object-cover cursor-pointer"
                    onClick={() => setIsLightboxOpen(true)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  
                  {/* Gallery Controls */}
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage();
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-lg"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-lg"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                      
                      {/* Fullscreen Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsLightboxOpen(true);
                        }}
                        className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300"
                      >
                        <Maximize2 className="w-5 h-5" />
                      </button>
                      
                      {/* Image Counter */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
                        {selectedImageIndex + 1} / {project.images.length}
                      </div>
                    </>
                  )}
                </div>
                
                {/* Thumbnail Gallery */}
                {project.images.length > 1 && (
                  <div className="flex gap-4 mt-6 overflow-x-auto pb-4 scrollbar-hide px-2">
                    {project.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          selectedImageIndex === index 
                            ? 'border-black scale-105 shadow-lg' 
                            : 'border-transparent hover:border-gray-300'
                        }`}
                      >
                        <img 
                          src={img} 
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Main Content */}
          <div className="container mx-auto px-6 md:px-12">
            {/* Problem & Solution */}
            {(project.problem || project.solution) && (
              <section className="content-section mb-20 md:mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                  {project.problem && (
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-6">The Challenge</h2>
                      <div className="prose prose-lg">
                        <p className="text-gray-600 mb-4">
                          {project.problem}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {project.solution && (
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Solution</h2>
                      <div className="prose prose-lg">
                        <p className="text-gray-600 mb-4">
                          {project.solution}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <section className="content-section mb-20 md:mb-32">
                <h2 className="text-3xl md:text-4xl font-bold mb-12">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {project.features.map((feature, index) => (
                    <div key={index} className="feature-item p-6 border border-gray-200 rounded-2xl hover:border-black hover:text-white hover:shadow-lg transition-all duration-300 group bg-white">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 p-3 rounded-xl bg-gray-100 group-hover:bg-black transition-colors duration-300">
                          {getIconForFeature(feature.title)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2 group-hover:text-black transition-colors">
                            {feature.title}
                          </h3>
                          <p className="text-gray-600">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

           

            {/* Tech Stack */}
            {project.technologies && project.technologies.length > 0 && (
              <section className="tech-section mb-20 md:mb-32">
                <div className="flex items-center gap-3 mb-12">
                  <div className="p-2 bg-white rounded-lg">
                    <Code className="w-5 h-5 text-black" />
                  </div>
                  <h2 className="section-title text-2xl md:text-3xl font-bold">Technology Stack</h2>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <div 
                      key={index}
                      className="tech-item flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 transition-all duration-200"
                    >
                      {getIconForTech(tech)}
                      <span className="text-sm font-medium">{tech}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}


            {/* Achievements - Elegant */}
            {project.achievements && project.achievements.length > 0 && (
              <section className="mb-20 md:mb-32">
                <div className="flex items-center gap-3 mb-12">
                  <div className="p-2 bg-white rounded-lg">
                    <Award className="w-5 h-5" />
                  </div>
                  <h2 className="section-title text-2xl md:text-3xl font-bold">Key Achievements</h2>
                </div>
                
                <div className="space-y-4">
                  {project.achievements.map((achievement, index) => (
                    <div key={index} className="content-card flex items-start gap-4 p-4 border border-gray-100 rounded-xl">
                      <div className="flex-shrink-0 w-6 h-6  rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-black rounded-full"></div>
                      </div>
                      <p className="text-gray-700">{achievement}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}


            {/* Metrics
            {project.metrics && Object.keys(project.metrics).length > 0 && (
              <section className="content-section metrics-section mb-20 md:mb-32 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-12">Performance Metrics</h2>
                <div className="grid grid-cols- sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <div key={key} className="metric-item text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="text-3xl md:text-4xl font-bold text-black mb-2">{value}</div>
                      <p className="text-sm text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )} */}


            {/* Related Projects */}
            {relatedProjects.length > 0 && (
              <section className="related-projects-section mb-20 md:mb-32">
                <div className="flex justify-between items-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold">Related Projects</h2>
                  <button
                    onClick={() => navigate('/work')}
                    className="group flex items-center gap-2 text-black hover:underline"
                  >
                    View All Projects
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                
                <div className="grid grid-cols- md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedProjects.map((relatedProject) => (
                    <div 
                      key={relatedProject.id}
                      onClick={() => navigate(`/work/${relatedProject.id}`)}
                      className="related-project-card group cursor-pointer p-4 border border-gray-200 rounded-2xl hover:border-black hover:shadow-lg transition-all duration-300"
                    >
                      <div className="relative mb-4 overflow-hidden rounded-xl aspect-video">
                        <img 
                          src={relatedProject.image} 
                          alt={relatedProject.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
                        
                        {/* Category badge */}
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium rounded-full">
                            {relatedProject.category === 'Mobile Development' ? (
                              <Smartphone className="w-3 h-3" />
                            ) : relatedProject.category === 'Web Development' ? (
                              <Monitor className="w-3 h-3" />
                            ) : relatedProject.category === 'Full Stack' ? (
                              <Server className="w-3 h-3" />
                            ) : (
                              <Code className="w-3 h-3" />
                            )}
                            {relatedProject.category}
                          </span>
                        </div>
                        
                        {/* Year badge */}
                        <div className="absolute top-4 right-4">
                          <span className="inline-block px-3 py-1 bg-black/80 text-white text-xs rounded-full">
                            {relatedProject.year}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-black transition-colors line-clamp-1">
                          {relatedProject.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                          {relatedProject.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {relatedProject.tags?.slice(0, 2).map((tag, idx) => (
                              <span key={idx} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <span className="inline-flex items-center gap-1 text-sm text-gray-400 group-hover:text-black transition-colors">
                            View Details
                            <ChevronRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* CTA Section */}
          <section className="py-20 md:py-32 bg-black text-white">
            <div className="container mx-auto px-6 md:px-12 text-center">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to Start Your Project?</h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Let's create something amazing together. Our team is ready to bring your vision to life.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => navigate('/contact')}
                  className="px-8 py-4 bg-white text-black hover:bg-gray-100 transition-all duration-300 rounded-full font-medium shadow-lg hover:shadow-xl"
                >
                  Start a Project
                </button>
                <button
                  onClick={() => navigate('/work')}
                  className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 rounded-full font-medium"
                >
                  View More Work
                </button>
              </div>
            </div>
          </section>

          {/* Lightbox Modal */}
          {isLightboxOpen && project.images && (
            <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4">
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-25 right-6 text-white hover:text-gray-300 transition-colors z-10"
              >
                <X className="w-8 h-8" />
              </button>
              
              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div className="relative max-w-6xl max-h-[90vh]">
                <img 
                  src={project.images[selectedImageIndex]} 
                  alt={`${project.title} - Fullscreen View`}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg"
                />
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white">
                  {selectedImageIndex + 1} / {project.images.length}
                </div>
              </div>
              
              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              
              {/* Keyboard shortcuts hint */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm text-center">
                Use ← → arrows or swipe to navigate • ESC to close
              </div>
            </div>
          )}
        </div>
      </PageTransition>
    </Layout>
  );
};

export default ProjectPage;