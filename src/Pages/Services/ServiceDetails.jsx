// ServiceDetail.jsx
import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle, 
  ChevronRight,
  ChevronLeft,
  Globe,
  Palette,
  Smartphone,
  Code,
  Plug,
  Cloud,
  Wrench,
  Calendar,
  Users,
  Zap,
  Shield,
  TrendingUp,
  BarChart,
  Clock
} from 'lucide-react';
import { Layout } from '../../components/Layout';
import PageTransition from '../../components/PageTransition';
import servicesData from '../../Data/Services.json';

const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  
  const services = servicesData.services || [];
  const service = services.find(s => s.slug === slug);

  // Get icon component function - make sure it's accessible
  const getIconComponent = (iconName) => {
    switch(iconName) {
      case 'Globe': return Globe;
      case 'Palette': return Palette;
      case 'Smartphone': return Smartphone;
      case 'Code': return Code;
      case 'Plug': return Plug;
      case 'Cloud': return Cloud;
      case 'Wrench': return Wrench;
      default: return Globe;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!service) return;
    
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo('.service-hero-title', 
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      gsap.fromTo('.service-hero-description', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );

      gsap.fromTo('.service-hero-number', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.4 }
      );

      // Content animations
      gsap.utils.toArray('.service-section').forEach((section, i) => {
        gsap.fromTo(section,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
            }
          }
        );
      });

      // Process step animations
      gsap.utils.toArray('.process-step').forEach((step, i) => {
        gsap.fromTo(step,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 90%',
            }
          }
        );
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
              <h1 className="text-3xl font-bold mb-4 text-black">Service Not Found</h1>
              <p className="text-gray-600 mb-8">The service you're looking for doesn't exist.</p>
              <button
                onClick={() => navigate('/services')}
                className="inline-flex items-center gap-2 px-5 py-2 border border-black text-black hover:bg-black hover:text-white transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Services
              </button>
            </div>
          </div>
        </PageTransition>
      </Layout>
    );
  }

  // Get current service icon component
  const IconComponent = getIconComponent(service.icon);

  // Related services (excluding current)
  const relatedServices = services
    .filter(s => s.id !== service.id)
    .slice(0, 3);

  return (
    <Layout>
      <PageTransition>
        <div ref={containerRef} className="pt-20">
          {/* Minimal Back Button */}
          <div className="fixed lg:bottom-8 bottom-3 left-2 lg:left-5 z-50">
            <button
              onClick={() => navigate('/services')}
              className="flex items-center gap-1 px-2 py-2 bg-black text-white border rounded-3xl border-gray-200 hover:border-black hover:bg-white hover:text-black transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm px-1 py-1">Back</span>
            </button>
          </div>

          {/* Service Badge */}
          <div className="fixed top-6 right-6 z-50">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-sm font-medium">
              <IconComponent className="w-4 h-4" />
              <span>{service.title}</span>
            </div>
          </div>

          {/* Hero Section */}
          <section ref={heroRef} className="pt-32 pb-20 md:pb-32">
            <div className="container mx-auto px-6 md:px-8 max-w-6xl">
              <div className="max-w-4xl">
                {/* Service Number */}
                <div className="service-hero-number flex items-center gap-3 mb-8">
                  <span className="text-xs uppercase tracking-widest text-gray-500">
                    {service.number}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">Service</span>
                </div>
                
                {/* Service Title */}
                <h1 className="service-hero-title text-4xl md:text-5xl lg:text-6xl font-bold mb-10 leading-tight text-black">
                  {service.title}
                </h1>
                
                {/* Service Description */}
                <p className="service-hero-description text-lg md:text-xl text-gray-600 mb-12 leading-relaxed">
                  {service.detailedDescription || service.description}
                </p>

                {/* Quick Features */}
                <div className="grid grid-cols- md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                  {service.features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-black" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <div className="container mx-auto px-6 md:px-8 max-w-4xl">
            {/* Key Features */}
            {service.features && service.features.length > 0 && (
              <div className="service-section mb-24 md:mb-32">
                <h2 className="text-2xl md:text-3xl font-bold mb-12 text-black uppercase tracking-wider">
                  Key Features
                </h2>
                
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4 p-6 border border-gray-200 hover:border-gray-300 transition-all duration-200">
                      <div className="flex-shrink-0 p-3 border border-gray-200">
                        {index < 4 ? <CheckCircle className="w-5 h-5 text-black" /> : <Zap className="w-5 h-5 text-black" />}
                      </div>
                      <div>
                        <span className="text-lg font-medium text-black">
                          {feature}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Our Process */}
            {service.process && service.process.length > 0 && (
              <div className="service-section mb-24 md:mb-32">
                <h2 className="text-2xl md:text-3xl font-bold mb-12 text-black uppercase tracking-wider">
                  Our Process
                </h2>
                
                <div className="space-y-8">
                  {service.process.map((step, index) => (
                    <div key={index} className="process-step flex items-start gap-8 p-8 border border-gray-200 hover:border-gray-300 transition-all duration-200">
                      <div className="flex-shrink-0">
                        <span className="text-4xl font-bold text-black opacity-20">{step.step}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-4 text-black">{step.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            {service.technologies && service.technologies.length > 0 && (
              <div className="service-section mb-24 md:mb-32">
                <h2 className="text-2xl md:text-3xl font-bold mb-12 text-black rounded-2xl uppercase tracking-wider">
                  Technologies We Use
                </h2>
                
                <div className="flex flex-wrap gap-4">
                  {service.technologies.map((tech, index) => (
                    <div key={index} className="px-4 py-3 border border-gray-200 hover:border-gray-300 transition-all duration-200">
                      <span className="text-sm font-medium text-black">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Case Studies */}
            {service.caseStudies && service.caseStudies.length > 0 && (
              <div className="service-section mb-24 md:mb-32">
                <h2 className="text-2xl md:text-3xl font-bold mb-12 text-black uppercase tracking-wider">
                  Case Studies
                </h2>
                
                <div className="grid grid-cols- md:grid-cols-2 gap-8">
                  {service.caseStudies.map((study, index) => (
                    <div key={index} className="p-8 border border-gray-200 hover:border-gray-300 transition-all duration-200">
                      <h3 className="text-xl font-bold mb-4 text-black">{study.title}</h3>
                      <p className="text-gray-600">{study.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits */}
            {service.benefits && service.benefits.length > 0 && (
              <div className="service-section mb-24 md:mb-32">
                <h2 className="text-2xl md:text-3xl font-bold mb-12 text-black uppercase tracking-wider">
                  Benefits
                </h2>
                
                <div className="grid grid-cols- md:grid-cols-2 gap-8">
                  {service.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4 p-6 border border-gray-200 hover:border-gray-300 transition-all duration-200">
                      <div className="flex-shrink-0 p-3 border border-gray-200">
                        <TrendingUp className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <p className="text-gray-700">{benefit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Services */}
            {relatedServices.length > 0 && (
              <div className="service-section mb-24 md:mb-32">
                <div className="flex items-center justify-between mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-black uppercase tracking-wider">
                    Related Services
                  </h2>
                  <button
                    onClick={() => navigate('/services')}
                    className="text-sm text-gray-500 hover:text-black transition-colors flex items-center gap-1"
                  >
                    View All
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols- md:grid-cols-3 gap-8">
                  {relatedServices.map((relatedService) => {
                    // Get icon for each related service individually
                    const RelatedIcon = getIconComponent(relatedService.icon);
                    return (
                      <div 
                        key={relatedService.id}
                        onClick={() => navigate(`/services/${relatedService.slug}`)}
                        className="group cursor-pointer p-6 border border-gray-200 hover:border-black transition-all duration-200"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <RelatedIcon className="w-5 h-5 text-gray-500 group-hover:text-black transition-colors" />
                          <span className="text-sm text-gray-500 group-hover:text-black transition-colors">
                            {relatedService.number}
                          </span>
                        </div>
                        <h3 className="font-bold mb-3 text-black group-hover:text-gray-600 transition-colors">
                          {relatedService.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {relatedService.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* CTA Section */}
          <section className="py-20 md:py-32 border-t border-gray-200">
            <div className="container mx-auto px-6 md:px-8 max-w-4xl text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black">
                Interested in {service.title}?
              </h2>
              <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
                Let's discuss how we can help with your {service.title.toLowerCase()} needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => navigate('/contact')}
                  className="px-8 py-4 bg-black text-white hover:bg-gray-800 transition-all duration-200 border border-black"
                >
                  Get Started
                </button>
                <button
                  onClick={() => navigate('/services')}
                  className="px-8 py-4 border border-gray-300 text-black hover:border-black hover:bg-black hover:text-white transition-all duration-200"
                >
                  View All Services
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