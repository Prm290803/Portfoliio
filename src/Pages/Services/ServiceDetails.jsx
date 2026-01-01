import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowLeft, 
  CheckCircle, 
  ChevronRight,
  ArrowUpRight,
  Globe,
  Palette,
  Smartphone,
  Code,
  Plug,
  Cloud,
  Wrench,
  Zap,
  TrendingUp,
  Clock,
  Award,
  BarChart3,
  Users,
  Shield,
  Sparkles
} from 'lucide-react';
import { Layout } from '../../components/Layout';
import PageTransition from '../../components/PageTransition';
import servicesData from '../../Data/Services.json';

gsap.registerPlugin(ScrollTrigger);

// Icon mapping
const iconComponents = {
  'Globe': Globe,
  'Palette': Palette,
  'Smartphone': Smartphone,
  'Code': Code,
  'Plug': Plug,
  'Cloud': Cloud,
  'Wrench': Wrench
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  
  const services = servicesData.services || [];
  const service = services.find(s => s.slug === slug);

  // Scroll to top on service change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // Main animations
  useEffect(() => {
    if (!service) return;

    const ctx = gsap.context(() => {
      // Hero section animations
      const heroTl = gsap.timeline({
        defaults: { ease: 'power3.out' }
      });

      heroTl
        .fromTo('.service-hero-number', 
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 }
        )
        .fromTo('.service-hero-title', 
          { y: 80, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1.2 }, '-=0.6'
        )
        .fromTo('.service-hero-description', 
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 }, '-=0.8'
        )
        .fromTo('.quick-feature', 
          { y: 30, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.7,
            stagger: 0.1
          }, '-=0.6'
        );

      // Section animations with scroll triggers
      gsap.utils.toArray('.content-section').forEach((section, i) => {
        gsap.fromTo(section,
          { 
            y: 100, 
            opacity: 0,
            scale: 0.98
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1.5,
              toggleActions: 'play none reverse none'
            }
          }
        );

        // Content stagger animation within each section
        const contentItems = section.querySelectorAll('.content-item');
        if (contentItems.length) {
          gsap.fromTo(contentItems,
            { 
              y: 30, 
              opacity: 0
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 30%',
                toggleActions: 'play none reverse none'
              }
            }
          );
        }
      });

      // Process steps animation
      gsap.utils.toArray('.process-step').forEach((step, i) => {
        gsap.fromTo(step,
          { 
            x: -50, 
            opacity: 0,
            rotateY: -10
          },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.9,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 90%',
              end: 'top 60%',
              scrub: 1,
              toggleActions: 'play none reverse none'
            }
          }
        );
      });

      // Technologies animation
      const techItems = gsap.utils.toArray('.tech-item');
      if (techItems.length) {
        gsap.fromTo(techItems,
          { 
            scale: 0.8, 
            opacity: 0,
            y: 20
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: '.technologies-section',
              start: 'top 85%',
              end: 'top 50%',
              toggleActions: 'play none reverse none'
            }
          }
        );
      }

      // Related services hover effects
      gsap.utils.toArray('.related-service').forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            scale: 1.02,
            duration: 0.4,
            ease: 'power2.out'
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out'
          });
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, [service]);

  // If service not found
  if (!service) {
    return (
      <Layout>
        <PageTransition>
          <div className="min-h-screen flex items-center justify-center px-6">
            <div className="text-center max-w-md">
              <h1 className="text-4xl font-bold mb-6 text-black">Service Not Found</h1>
              <p className="text-gray-600 mb-8 text-lg">
                The service you're looking for doesn't exist or has been moved.
              </p>
              <button
                onClick={() => navigate('/services')}
                className="inline-flex items-center gap-3 px-6 py-3 border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 rounded-lg group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Services
              </button>
            </div>
          </div>
        </PageTransition>
      </Layout>
    );
  }

  // Get current service icon
  const IconComponent = iconComponents[service.icon] || Globe;

  // Related services (excluding current)
  const relatedServices = services
    .filter(s => s.id !== service.id)
    .slice(0, 3);

  return (
    <Layout>
      <PageTransition>
        <div ref={containerRef} className="pt-20 overflow-hidden">
          {/* Floating Back Button */}
          <div className="fixed lg:bottom-8 bottom-4 left-4 lg:left-6 z-50">
            <button
              onClick={() => navigate('/services')}
              className="flex items-center gap-2 px-4 py-3 bg-black text-white border border-gray-800 hover:bg-white hover:text-black transition-all duration-300 rounded-full shadow-xl hover:shadow-2xl group backdrop-blur-sm"
              aria-label="Back to services"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Services</span>
            </button>
          </div>

          {/* Service Badge - Floating */}
          <div className="fixed top-28 right-4 lg:right-6 z-40">
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/90 backdrop-blur-md border border-gray-200 rounded-full shadow-lg">
              <IconComponent className="w-5 h-5 text-black" />
              <span className="text-sm font-semibold text-black">{service.title}</span>
            </div>
          </div>

          {/* Hero Section */}
          <section ref={heroRef} className="pt-32 pb-20 md:pb-36 relative">
            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative">
              <div className="max-w-4xl">
                {/* Service Number */}
                <div className="service-hero-number flex items-center gap-3 mb-8">
                  <span className="text-sm uppercase tracking-widest text-gray-500 font-semibold">
                    {service.number}
                  </span>
                  <div className="w-12 h-px bg-gradient-to-r from-gray-400 to-transparent" />
                  <span className="text-sm text-gray-500 font-medium">Premium Service</span>
                </div>
                
                {/* Service Title */}
                <h1 className="service-hero-title text-5xl md:text-6xl lg:text-7xl font-bold mb-10 leading-tight text-black tracking-tight">
                  {service.title}
                </h1>
                
                {/* Service Description */}
                <p className="service-hero-description text-xl md:text-2xl text-gray-600 mb-16 leading-relaxed max-w-3xl">
                  {service.detailedDescription || service.description}
                </p>

                {/* Quick Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                  {service.features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="quick-feature flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 bg-white/50">
                      <div className="flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-black" />
                      </div>
                      <span className="text-sm font-medium text-gray-800">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <div ref={contentRef} className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative">
            {/* Key Features */}
            {service.features && service.features.length > 0 && (
              <div className="content-section mb-24 md:mb-36">
                <h2 className="text-3xl md:text-4xl font-bold mb-16 text-black uppercase tracking-tight">
                  <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                    Key Features
                  </span>
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {service.features.map((feature, index) => (
                    <div key={index} className="content-item group p-8 rounded-2xl border border-gray-200 hover:border-black transition-all duration-300 hover:shadow-xl">
                      <div className="flex items-start gap-6">
                        <div className="flex-shrink-0 p-4 rounded-xl border border-gray-200 group-hover:border-black group-hover:bg-black transition-all duration-300">
                          <Zap className="w-6 h-6 text-black group-hover:text-white transition-colors" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-3 text-black">
                            {feature}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            Professional implementation with industry best practices and cutting-edge technology.
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Our Process */}
            {service.process && service.process.length > 0 && (
              <div className="content-section mb-24 md:mb-36">
                <h2 className="text-3xl md:text-4xl font-bold mb-16 text-black uppercase tracking-tight">
                  <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                    Our Process
                  </span>
                </h2>
                
                <div className="space-y-6">
                  {service.process.map((step, index) => (
                    <div key={index} className="process-step group p-8 rounded-2xl border border-gray-200 hover:border-black transition-all duration-300 hover:shadow-lg">
                      <div className="flex items-start gap-8">
                        <div className="flex-shrink-0 relative">
                          <div className="w-16 h-16 rounded-xl border-2 border-gray-200 group-hover:border-black transition-all duration-300 flex items-center justify-center">
                            <span className="text-2xl font-bold text-black">{step.step}</span>
                          </div>
                          {index < service.process.length - 1 && (
                            <div className="absolute top-full left-1/2 w-0.5 h-8 -translate-x-1/2 bg-gradient-to-b from-gray-200 to-transparent" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-4 text-black">{step.title}</h3>
                          <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            {service.technologies && service.technologies.length > 0 && (
              <div className="content-section technologies-section mb-24 md:mb-36">
                <h2 className="text-3xl md:text-4xl font-bold mb-16 text-black uppercase tracking-tight">
                  <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                    Technologies
                  </span>
                </h2>
                
                <div className="flex flex-wrap gap-4">
                  {service.technologies.map((tech, index) => (
                    <div key={index} className="tech-item px-6 py-4 rounded-xl border border-gray-200 hover:border-black hover:bg-black transition-all duration-300 group">
                      <span className="text-sm font-semibold text-black group-hover:text-white transition-colors">
                        {tech}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits */}
            {service.benefits && service.benefits.length > 0 && (
              <div className="content-section mb-24 md:mb-36">
                <h2 className="text-3xl md:text-4xl font-bold mb-16 text-black uppercase tracking-tight">
                  <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                    Key Benefits
                  </span>
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {service.benefits.map((benefit, index) => (
                    <div key={index} className="content-item group p-8 rounded-2xl border border-gray-200 hover:border-black transition-all duration-300">
                      <div className="flex items-start gap-6">
                        <div className="flex-shrink-0">
                          <Award className="w-8 h-8 text-black opacity-70" />
                        </div>
                        <div>
                          <p className="text-lg text-gray-800 leading-relaxed">{benefit}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Case Studies */}
            {service.caseStudies && service.caseStudies.length > 0 && (
              <div className="content-section mb-24 md:mb-36">
                <h2 className="text-3xl md:text-4xl font-bold mb-16 text-black uppercase tracking-tight">
                  <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                    Case Studies
                  </span>
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {service.caseStudies.map((study, index) => (
                    <div key={index} className="content-item group p-8 rounded-2xl border border-gray-200 hover:border-black transition-all duration-300 hover:shadow-xl">
                      <h3 className="text-2xl font-bold mb-4 text-black">{study.title}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">{study.description}</p>
                      <div className="flex items-center gap-2 text-sm font-medium text-black group-hover:text-gray-600 transition-colors">
                        <span>View Details</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Services */}
            {relatedServices.length > 0 && (
              <div className="content-section mb-24 md:mb-36">
                <div className="flex items-center justify-between mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-black uppercase tracking-tight">
                    <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                      Related Services
                    </span>
                  </h2>
                  <button
                    onClick={() => navigate('/services')}
                    className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors group"
                  >
                    <span className="text-sm font-medium">View All</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {relatedServices.map((relatedService) => {
                    const RelatedIcon = iconComponents[relatedService.icon] || Globe;
                    return (
                      <div 
                        key={relatedService.id}
                        onClick={() => navigate(`/services/${relatedService.slug}`)}
                        className="related-service cursor-pointer p-8 rounded-2xl border border-gray-200 hover:border-black transition-all duration-300 bg-white"
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-3 rounded-lg border border-gray-200">
                            <RelatedIcon className="w-6 h-6 text-black" />
                          </div>
                          <span className="text-sm font-medium text-gray-500">
                            {relatedService.number}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-black">
                          {relatedService.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                          {relatedService.description}
                        </p>
                        <div className="flex items-center gap-2 text-sm font-medium text-black opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>Learn More</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* CTA Section */}
          <section className="py-24 md:py-36 border-t border-gray-200 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-gray-200 mb-8">
                <Sparkles className="w-5 h-5 text-black" />
                <span className="text-sm font-medium text-black">Ready to Start?</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-10 text-black leading-tight">
                Let's Build Something<br />
                <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                  Amazing Together
                </span>
              </h2>
              
              <p className="text-gray-600 text-xl mb-16 max-w-2xl mx-auto leading-relaxed">
                Ready to transform your vision into reality with our {service.title.toLowerCase()} expertise?
              </p>
              
              <div className="flex flex-wrap justify-center gap-6">
                <button
                  onClick={() => navigate('/contact')}
                  className="px-10 py-4 rounded-xl bg-black text-white hover:bg-white hover:text-black transition-all duration-300 border-2 border-black text-lg font-semibold shadow-lg hover:shadow-xl"
                >
                  Start Your Project
                </button>
                <button
                  onClick={() => navigate('/services')}
                  className="px-10 py-4 rounded-xl border-2 border-gray-300 text-black hover:border-black hover:bg-black hover:text-white transition-all duration-300 text-lg font-semibold"
                >
                  Explore All Services
                </button>
              </div>
            </div>
          </section>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default ServiceDetail;