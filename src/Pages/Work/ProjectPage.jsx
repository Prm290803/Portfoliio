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
import Portal from '../../components/Portal';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const contentSectionsRef = useRef([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  // Find the specific project
  const projects = projectData.projects || projectData;
  const project = projects.find(p => p.id === parseInt(id));

  // Scroll to top on mount with smooth animation
  useEffect(() => {
    gsap.to(window, {
      duration: 0.5,
      scrollTo: 0,
      ease: 'power2.out'
    });
  }, [id]);

  // Add section refs
  const addToContentSectionsRef = (el) => {
    if (el && !contentSectionsRef.current.includes(el)) {
      contentSectionsRef.current.push(el);
    }
  };

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

  // Smooth image transition animation
  useEffect(() => {
    const heroImage = document.querySelector('.project-hero-image img');
    if (heroImage) {
      gsap.fromTo(heroImage,
        { opacity: 0, scale: 1.05 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.8, 
          ease: 'power2.out' 
        }
      );
    }
  }, [selectedImageIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen || !project?.images) return;
      
      if (e.key === 'Escape') {
        handleCloseLightbox();
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, selectedImageIndex, project?.images]);

  // Touch/swipe support for mobile with smooth transitions
  useEffect(() => {
    if (!isLightboxOpen || !project?.images) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    let isSwiping = false;
    
    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
      isSwiping = true;
    };
    
    const handleTouchMove = (e) => {
      if (!isSwiping) return;
      touchEndX = e.changedTouches[0].screenX;
    };
    
    const handleTouchEnd = (e) => {
      if (!isSwiping) return;
      isSwiping = false;
      handleSwipe();
    };
    
    const handleSwipe = () => {
      const swipeThreshold = 30;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextImage();
        } else {
          prevImage();
        }
      }
    };
    
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isLightboxOpen, selectedImageIndex, project?.images]);

  // Enhanced GSAP Animations
  useEffect(() => {
    if (!project) return;

    const ctx = gsap.context(() => {
      // Smooth fade-in on initial load
      gsap.fromTo('body',
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out' }
      );

      // Enhanced hero section animations with stagger
      gsap.fromTo(
        '.hero-content > *',
        { 
          y: 40, 
          opacity: 0,
          filter: 'blur(10px)'
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          stagger: {
            each: 0.1,
            from: 'start'
          },
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );

      // Project image reveal with parallax effect
      gsap.fromTo(
        '.project-hero-image',
        { 
          scale: 1.08, 
          opacity: 0,
          y: 50
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.project-hero-image',
            start: 'top 90%',
            toggleActions: 'play none none reverse',
            once: true
          }
        }
      );

      // Create a subtle parallax effect for hero image
      gsap.to('.project-hero-image', {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.project-hero-image',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Enhanced section animations with smooth reveal
      contentSectionsRef.current.forEach((section, i) => {
        gsap.fromTo(section,
          { 
            y: 60,
            opacity: 0,
            scale: 0.98
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: 'power2.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: section,
              start: 'top 90%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
              once: true
            }
          }
        );
      });

      // Feature items with bounce animation
      gsap.utils.toArray('.feature-item').forEach((item, i) => {
        gsap.fromTo(item,
          { 
            x: -30,
            opacity: 0,
            rotateX: -15
          },
          {
            x: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.7,
            delay: i * 0.07,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: item,
              start: 'top 95%',
              toggleActions: 'play none none reverse',
              once: true
            }
          }
        );
      });

      // Tech stack animation with scale and color transition
      gsap.fromTo('.tech-stack-item',
        { 
          scale: 0.7,
          opacity: 0,
          backgroundColor: 'rgba(255,255,255,0)',
          borderColor: 'rgba(229,231,235,0)'
        },
        {
          scale: 1,
          opacity: 1,
          backgroundColor: 'rgba(249,250,251,1)',
          borderColor: 'rgba(229,231,235,1)',
          stagger: {
            each: 0.03,
            from: 'start'
          },
          duration: 0.5,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.tech-stack-grid',
            start: 'top 90%',
            toggleActions: 'play none none reverse',
            once: true
          }
        }
      );

      // Gallery items with fade-up animation
      gsap.fromTo('.gallery-item',
        { 
          y: 40,
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: {
            each: 0.05,
            from: 'start'
          },
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.gallery-section',
            start: 'top 90%',
            toggleActions: 'play none none reverse',
            once: true
          }
        }
      );

      // Related projects with 3D flip effect
      gsap.fromTo('.related-project-card',
        { 
          y: 40,
          opacity: 0,
          rotateY: -10
        },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          stagger: {
            each: 0.1,
            from: 'start'
          },
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.related-projects-section',
            start: 'top 90%',
            toggleActions: 'play none none reverse',
            once: true
          }
        }
      );

      // Achievements with line drawing effect
      gsap.fromTo('.achievement-item',
        { 
          x: -20,
          opacity: 0,
          width: '0%'
        },
        {
          x: 0,
          opacity: 1,
          width: '100%',
          stagger: {
            each: 0.08,
            from: 'start'
          },
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.achievements-section',
            start: 'top 90%',
            toggleActions: 'play none none reverse',
            once: true
          }
        }
      );

      // Floating animation for CTA buttons
      gsap.to('.cta-button', {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });

      // Hover animations for interactive elements
      const interactiveElements = document.querySelectorAll('.interactive-element');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          gsap.to(el, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
        
        el.addEventListener('mouseleave', () => {
          gsap.to(el, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      });

      // Smooth scroll for internal links
      gsap.utils.toArray('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.querySelector(link.getAttribute('href'));
          if (target) {
            gsap.to(window, {
              duration: 1,
              scrollTo: {
                y: target,
                offsetY: 100
              },
              ease: 'power3.inOut'
            });
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, [project]);

  // Smooth lightbox open/close animations
  const handleOpenLightbox = () => {
    setIsLightboxOpen(true);
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Animate lightbox opening
    gsap.fromTo('.lightbox-content',
      { 
        scale: 0.9,
        opacity: 0,
        rotationY: -10
      },
      { 
        scale: 1,
        opacity: 1,
        rotationY: 0,
        duration: 0.5,
        ease: 'back.out(1.2)'
      }
    );
  };

  const handleCloseLightbox = () => {
    // Animate lightbox closing
    gsap.to('.lightbox-content', {
      scale: 0.9,
      opacity: 0,
      rotationY: 10,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setIsLightboxOpen(false);
        document.body.style.overflow = 'auto';
      }
    });
  };

  // Smooth image navigation in lightbox
  const handleImageNavigation = (direction) => {
    const currentIndex = selectedImageIndex;
    const totalImages = project?.images?.length || 0;
    
    if (direction === 'next') {
      setSelectedImageIndex((currentIndex + 1) % totalImages);
    } else {
      setSelectedImageIndex((currentIndex - 1 + totalImages) % totalImages);
    }
    
    // Animate image transition
    gsap.fromTo('.lightbox-image',
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
    );
  };

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
                className="cta-button interactive-element inline-flex items-center gap-2 px-6 py-3 border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 rounded-full"
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
        <div ref={containerRef} className="pt-20 overflow-hidden">
          {/* Back Button with smooth animation */}
          <div className="fixed bottom-3 lg:bottom-14 left-3 lg:left-10 z-50">
            <button
              onClick={() => {
                gsap.to(window, {
                  duration: 0.5,
                  scrollTo: 0,
                  ease: 'power2.out',
                  onComplete: () => navigate('/work')
                });
              }}
              className="group interactive-element flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all duration-300 shadow-lg"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-sm">Back</span>
            </button>
          </div>

          {/* Project Type Badge */}
          <div className="absolute top-28 right-6 z-50">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black backdrop-blur-sm border text-white border-gray-200 md:hidden rounded-full text-sm font-medium animate-pulse">
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
                {/* Tags with staggered animation */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-gray-500 px-3 py-1.5 bg-gray-100 rounded-full transform transition-transform hover:scale-105 duration-300">
                    {project.category}
                  </span>
                  <span className="text-sm px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full transform transition-transform hover:scale-105 duration-300">
                    {project.year}
                  </span>
                  {project.tags?.includes('Android') && (
                    <span className="text-sm px-3 py-1.5 bg-green-100 text-green-800 rounded-full flex items-center gap-1 transform transition-transform hover:scale-105 duration-300">
                      <Smartphone className="w-3 h-3" />
                      Android
                    </span>
                  )}
                  {project.tags?.includes('Flutter') && (
                    <span className="text-sm px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full flex items-center gap-1 transform transition-transform hover:scale-105 duration-300">
                      <Layers className="w-3 h-3" />
                      Flutter
                    </span>
                  )}
                  {project.tags?.includes('React') && (
                    <span className="text-sm px-3 py-1.5 bg-cyan-100 text-cyan-800 rounded-full flex items-center gap-1 transform transition-transform hover:scale-105 duration-300">
                      <Monitor className="w-3 h-3" />
                      React
                    </span>
                  )}
                  {project.tags?.includes('Node.js') && (
                    <span className="text-sm px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-full flex items-center gap-1 transform transition-transform hover:scale-105 duration-300">
                      <Server className="w-3 h-3" />
                      Node.js
                    </span>
                  )}
                  {project.tags?.includes('Firebase') && (
                    <span className="text-sm px-3 py-1.5 bg-orange-100 text-orange-800 rounded-full flex items-center gap-1 transform transition-transform hover:scale-105 duration-300">
                      <Database className="w-3 h-3" />
                      Firebase
                    </span>
                  )}
                  {project.tags?.includes('GSAP') && (
                    <span className="text-sm px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full flex items-center gap-1 transform transition-transform hover:scale-105 duration-300">
                      <Rocket className="w-3 h-3" />
                      GSAP
                    </span>
                  )}
                </div>
                
                {/* Title with smooth reveal */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
                  {project.title}
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-4xl">
                  {project.description}
                </p>

                {/* Project Links with hover animations */}
                <div className="flex flex-wrap gap-4 mb-12">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group cta-button interactive-element flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 transition-all duration-300 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                      {getLiveButtonText()}
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </a>
                  )}
                  
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group interactive-element flex items-center gap-2 px-6 py-3 border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 rounded-full transform hover:-translate-y-1"
                    >
                      <Github className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                      View Source Code
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </a>
                  )}
                </div>

                {/* Project Stats with hover effects */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-200 pt-8">
                  <div className="flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">{project.duration || '3-4 months'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Team Size</p>
                      <p className="font-medium">{project.teamSize || 'Solo Project'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
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
            <section className="gallery-section px-6 md:px-12 mb-20 md:mb-32">
              <div className="container mx-auto">
                <div className="project-hero-image relative rounded-2xl overflow-hidden shadow-2xl group">
                  <img 
                    src={project.images[selectedImageIndex] || project.image} 
                    alt={`${project.title} - Image ${selectedImageIndex + 1}`}
                    className="w-full h-auto max-h-[600px] object-cover cursor-pointer transition-transform duration-700 ease-out"
                    onClick={handleOpenLightbox}
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
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-lg transform hover:scale-110"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-lg transform hover:scale-110"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                      
                      {/* Fullscreen Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenLightbox();
                        }}
                        className="absolute top-4 right-4 w-10 h-10 backdrop-blur-sm rounded-full flex items-center bg-black/20 justify-center text-white hover:bg-black/70 transition-all duration-300 transform hover:scale-110"
                      >
                        <Maximize2 className="w-5 h-5" />
                      </button>
                      
                      {/* Image Counter */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm transform transition-all duration-300">
                        {selectedImageIndex + 1} / {project.images.length}
                      </div>
                    </>
                  )}
                </div>
                
                {/* Thumbnail Gallery */}
                {project.images.length > 1 && (
                  <div className="gallery-item flex gap-4 mt-6 overflow-x-auto pb-4 scrollbar-hide px-2">
                    {project.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all duration-300 transform hover:scale-105 ${
                          selectedImageIndex === index 
                            ? 'border-black scale-105 shadow-lg' 
                            : 'border-transparent opacity-75 hover:opacity-100'
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
              <section ref={addToContentSectionsRef} className="content-section mb-20 md:mb-32">
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
              <section ref={addToContentSectionsRef} className="content-section mb-20 md:mb-32">
                <h2 className="text-3xl md:text-4xl font-bold mb-12">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {project.features.map((feature, index) => (
                    <div key={index} className="feature-item interactive-element p-6 border border-gray-200 rounded-2xl hover:border-black hover:shadow-xl transition-all duration-300 group bg-white transform hover:-translate-y-2">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 p-3 rounded-xl bg-gray-100 group-hover:bg-black transition-all duration-300 transform group-hover:scale-110">
                          {getIconForFeature(feature.title)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2 group-hover:text-black transition-colors duration-300">
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
              <section ref={addToContentSectionsRef} className="tech-section mb-20 md:mb-32">
                <div className="flex items-center gap-3 mb-12">
                  <div className="p-2 bg-white rounded-lg transform hover:rotate-12 transition-transform duration-300">
                    <Code className="w-5 h-5 text-black" />
                  </div>
                  <h2 className="section-title text-2xl md:text-3xl font-bold">Technology Stack</h2>
                </div>
                
                <div className="flex tech-stack-grid flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <div 
                      key={index}
                      className="tech-item tech-stack-item interactive-element flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-white transition-all duration-200 transform hover:-translate-y-1 hover:shadow-md"
                    >
                      {getIconForTech(tech)}
                      <span className="text-sm font-medium">{tech}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Achievements */}
            {project.achievements && project.achievements.length > 0 && (
              <section ref={addToContentSectionsRef} className="achievements-section mb-20 md:mb-32">
                <div className="flex items-center gap-3 mb-12">
                  <div className="p-2 bg-white rounded-lg transform hover:rotate-12 transition-transform duration-300">
                    <Award className="w-5 h-5" />
                  </div>
                  <h2 className="section-title text-2xl md:text-3xl font-bold">Key Achievements</h2>
                </div>
                
                <div className="space-y-4">
                  {project.achievements.map((achievement, index) => (
                    <div key={index} className="achievement-item interactive-element flex items-start gap-4 p-4 border border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-sm transition-all duration-300 transform hover:translate-x-2">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
                      </div>
                      <p className="text-gray-700">{achievement}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
              <section ref={addToContentSectionsRef} className="related-projects-section mb-20 md:mb-32">
                <div className="flex justify-between items-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold">Related Projects</h2>
                  <button
                    onClick={() => navigate('/work')}
                    className="group interactive-element flex items-center gap-2 text-black hover:underline transform hover:translate-x-1 transition-transform duration-300"
                  >
                    View All Projects
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedProjects.map((relatedProject) => (
                    <div 
                      key={relatedProject.id}
                      onClick={() => {
                        gsap.to(window, {
                          duration: 0.3,
                          scrollTo: 0,
                          ease: 'power2.out',
                          onComplete: () => navigate(`/work/${relatedProject.id}`)
                        });
                      }}
                      className="related-project-card interactive-element group cursor-pointer p-4 border border-gray-200 rounded-2xl hover:border-black hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                      <div className="relative mb-4 overflow-hidden rounded-xl aspect-video">
                        <img 
                          src={relatedProject.image} 
                          alt={relatedProject.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
                        
                        {/* Category badge */}
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium rounded-full transform transition-transform group-hover:scale-105 duration-300">
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
                          <span className="inline-block px-3 py-1 bg-black/80 text-white text-xs rounded-full transform transition-transform group-hover:scale-105 duration-300">
                            {relatedProject.year}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-black transition-colors duration-300 line-clamp-1">
                          {relatedProject.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                          {relatedProject.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {relatedProject.tags?.slice(0, 2).map((tag, idx) => (
                              <span key={idx} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600 transform transition-transform hover:scale-105 duration-300">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <span className="inline-flex items-center gap-1 text-sm text-gray-400 group-hover:text-black transition-colors duration-300">
                            View Details
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
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
          <section className="py-20 md:py-32 bg-black text-white overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 text-center">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to Start Your Project?</h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Let's create something amazing together. Our team is ready to bring your vision to life.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => navigate('/contact')}
                  className="cta-button interactive-element px-8 py-4 bg-white text-black hover:bg-gray-100 transition-all duration-300 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Start a Project
                </button>
                <button
                  onClick={() => navigate('/work')}
                  className="cta-button interactive-element px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 rounded-full font-medium transform hover:-translate-y-1"
                >
                  View More Work
                </button>
              </div>
            </div>
          </section>

          {/* Enhanced Lightbox Modal */}
          {isLightboxOpen && project.images && (
            <Portal>
              <div className="lightbox-content fixed inset-0 z-[999999] bg-black/95 flex items-center justify-center p-4">
                <button
                  onClick={handleCloseLightbox}
                  className="absolute top-25 right-6 text-white hover:text-gray-300 transition-colors z-[99999] transform hover:scale-110 duration-300"
                >
                  <X className="w-8 h-8" />
                </button>
                
                <button
                  onClick={() => handleImageNavigation('prev')}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-10 transform hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <div className="relative max-w-6xl max-h-[90vh]">
                  <img 
                    src={project.images[selectedImageIndex]} 
                    alt={`${project.title} - Fullscreen View`}
                    className="lightbox-image max-w-full max-h-[90vh] object-contain rounded-lg transform transition-transform duration-500 ease-out"
                  />
                  
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white transform transition-all duration-300">
                    {selectedImageIndex + 1} / {project.images.length}
                  </div>
                </div>
                
                <button
                  onClick={() => handleImageNavigation('next')}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-10 transform hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                
                {/* Keyboard shortcuts hint */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm text-center animate-pulse">
                  Use ← → arrows or swipe to navigate • ESC to close
                </div>
              </div>
            </Portal>
          )}
        </div>
      </PageTransition>
    </Layout>
  );
};

export default ProjectPage;