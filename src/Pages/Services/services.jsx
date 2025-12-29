// import { useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { ArrowUpRight, Globe, Palette, Smartphone, Code, Plug, Wrench, Cloud } from 'lucide-react';
// import { Layout } from '../../components/Layout';
// import PageTransition from "../../components/PageTransition";

// gsap.registerPlugin(ScrollTrigger);

// const services = [
//   {
//     number: '01',
//     title: 'Web Development',
//     description:
//       'Custom websites and web applications built with modern technologies for optimal performance and scalability.',
//     icon: Globe,
//     features: [
//       'React & Next.js',
//       'Performance Optimization',
//       'SEO Best Practices',
//       'Responsive Design',
//     ],
//   },
//   {
//     number: '02',
//     title: 'UI/UX Design',
//     description:
//       'User-centered design solutions that combine aesthetics with functionality to create memorable experiences.',
//     icon: Palette,
//     features: [
//       'User Research',
//       'Wireframing & Prototyping',
//       'Visual Design',
//       'Design Systems',
//     ],
//   },
//   {
//     number: '03',
//     title: 'Mobile Apps',
//     description:
//       'Native and cross-platform mobile applications that deliver seamless experiences on any device.',
//     icon: Smartphone,
//     features: [
//       'iOS & Android',
//       'React Native',
//       'Flutter',
//       'App Store Optimization',
//     ],
//   },
//   {
//     number: '04',
//     title: 'Custom Software',
//     description:
//       'Tailored software solutions designed to streamline operations and drive business growth.',
//     icon: Code,
//     features: [
//       'Enterprise Solutions',
//       'SaaS Products',
//       'Database Design',
//       'Cloud Architecture',
//     ],
//   },
//   {
//     number: '05',
//     title: 'API Integration',
//     description:
//       'Seamless integration of third-party services and APIs to extend functionality and connectivity.',
//     icon: Plug,
//     features: [
//       'RESTful APIs',
//       'GraphQL',
//       'Payment Gateways',
//       'CRM Integration',
//     ],
//   },
//   {
//     number: '06',
//     title: 'Cloud Services',
//     description:
//       'Scalable and secure cloud solutions to deploy, manage, and optimize your digital infrastructure.',
//     icon: Cloud, // ⬅️ import from lucide-react
//     features: [
//       'Cloud Deployment & Migration',
//       'AWS / Azure / GCP',
//       'CI/CD Pipelines',
//       'Scalability & Monitoring',
//     ],
//   },
//   {
//     number: '07',
//     title: 'Maintenance & Support',
//     description:
//       'Ongoing support and maintenance to keep your digital products running smoothly and securely.',
//     icon: Wrench,
//     features: [
//       '24/7 Monitoring',
//       'Security Updates',
//       'Performance Tuning',
//       'Technical Support',
//     ],
//   },
// ];


// const Services = () => {
//   const containerRef = useRef(null);
//   const heroRef = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Service title - in AND out
//       gsap.fromTo(
//         '.service-title',
//         { 
//           y: 100, 
//           opacity: 0,
//           scale: 0.95 
//         },
//         { 
//           y: 0, 
//           opacity: 1, 
//           scale: 1,
//           duration: 1.2, 
//           ease: 'power4.out', 
//           delay: 0.3,
//           scrollTrigger: {
//             trigger: '.service-title',
//             start: 'top 95%',
            
//             scrub: 1,
//             toggleActions: 'play none none reverse'
//           }
//         }
//       );

//       // Service cards - in AND out with staggered animation
//       gsap.utils.toArray('.service-card').forEach((card, i) => {
//         gsap.fromTo(
//           card,
//           { 
//             y: 100, 
//             opacity: 0,
//             rotateX: -15,
//             scale: 0.9 
//           },
//           {
//             y: 0,
//             opacity: 1,
//             rotateX: 0,
//             scale: 1,
//             duration: 0.8,
//             delay: i * 0.1, // Stagger based on index
//             ease: 'power3.out',
//             scrollTrigger: {
//               trigger: card,
//               start: 'top 85%',
//               end: 'bottom 8%',
//               scrub: 1,
//               toggleActions: 'play none none reverse'
//             }
//           }
//         );
//       });

//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

 
//  useEffect(() => {
//     // Hero animation
//     const ctx = gsap.context(() => {
//       gsap.fromTo(
//         '.hero-title span',
//         { y: 200, opacity: 0 },
//         { y: 0, opacity: 1, stagger: 0.1, duration: 1.2, ease: 'power4.out', delay: 0.6 }
//       );

//       gsap.fromTo(
//         '.hero-subtitle',
//         { y: 50, opacity: 0 },
//         { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.3 }
//       );

//       gsap.fromTo(
//         '.hero-cta',
//         { y: 30, opacity: 0 },
//         { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.5 }
//       );

//       gsap.fromTo(
//         '.hero-scroll',
//         { y: 20, opacity: 0 },
//         { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.7 }
//       );

//       // Services scroll animation
//       gsap.utils.toArray('.service-item').forEach((item, i) => {
//         gsap.fromTo(
//           item,
//           { x: -100, opacity: 0 },
//           {
//             x: 0,
//             opacity: 1,
//             duration: 1,
//             ease: 'power3.out',
//             scrollTrigger: {
//               trigger: item,
//               start: 'top 85%',
//               end: 'bottom 15%',
//             },
//           }
//         );
//       });

//       // Projects scroll animation
//       gsap.utils.toArray('.project-item').forEach((item) => {
//         gsap.fromTo(
//           item,
//           { y: 80, opacity: 0 },
//           {
//             y: 0,
//             opacity: 1,
//             duration: 1,
//             ease: 'power3.out',
//             scrollTrigger: {
//               trigger: item,
//               start: 'top 85%',
//             },
//           }
//         );
//       });
//     }, heroRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <Layout>
//       <PageTransition>
//       <div ref={containerRef}>
//         {/* Hero */}
//         <section className="min-h-[70vh] flex items-end pb-20 pt-43" ref={heroRef}>
//           <div className="container mx-auto px-6 md:px-12">
//             <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
//               <div className="md:col-span-8">
//                 <span className="label-editorial text-muted-foreground mb-4 block">Our Services</span>
//                 <h1 className="service-title headline-xl">
//                   What We<br />Offer
//                 </h1>
//               </div>
//               <div className="md:col-span-4 flex items-end">
//                 <p className="body-editorial text-muted-foreground">
//                   Comprehensive digital solutions tailored to your unique needs and objectives.
//                 </p>
//               </div>

//               <div className="absolute inset-0 pointer-events-none">
//                 <div className="absolute left-1/4 top-0 bottom-0 w-px bg-black/5 dark:bg-black/10" />
//                 <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/5 dark:bg-black/10" />
//                 <div className="absolute left-3/4 top-0 bottom-0 w-px bg-black/5 dark:bg-black/10" />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Services Grid */}
//         <section className="py-20 md:py-32">
//           <div className="container mx-auto px-6 md:px-12">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              
//               {services.map((service, index) => {
//                 const IconComponent = service.icon;
//                 return (
//                   <div
//                     key={service.number}
//                     className="service-card group p-8 md:p-12 border border-foreground/10 hover:border-foreground/30 transition-all duration-500 bg-background"
//                   >
//                     <div className="flex justify-between items-start mb-8">
//                       <span className="label-editorial text-muted-foreground">{service.number}</span>
//                       <IconComponent className="w-8 h-8 text-foreground/30 group-hover:text-foreground transition-colors duration-500" />
//                     </div>
                    
//                     <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4">
//                       {service.title}
//                     </h3>
                    
//                     <p className="body-editorial text-muted-foreground mb-8">
//                       {service.description}
//                     </p>
                    
//                     <div className="h-px bg-foreground/10 mb-8" />
                    
//                     <ul className="grid grid-cols-2 gap-3">
//                       {service.features.map((feature, i) => (
//                         <li key={i} className="label-editorial text-muted-foreground">
//                           {feature}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </section>

//         {/* CTA */}
//         <section className="py-20 md:py-32 bg-black text-white">
//           <div className="container mx-auto px-6 md:px-12 text-center">
//             <span className="label-editorial text-grey-400 mb-8 block">Ready to Start?</span>
//             <h2 className="headline-md mb-12 max-w-3xl mx-auto">
//               Let's discuss how we can help bring your vision to life.
//             </h2>
//             <Link 
//               to="/contact" 
//               className="btn-editorial group border-background text-background group-hover:bg-background group-hover:text-foreground inline-flex items-center gap-3"
//             >
//               Start a Project
//               <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" />
//             </Link>
//           </div>
//         </section>
//       </div>
//       </PageTransition>
//     </Layout>
//   );
// };

// export default Services;


import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Globe, Palette, Smartphone, Code, Plug, Wrench, Cloud } from 'lucide-react';
import { Layout } from '../../components/Layout';
import PageTransition from "../../components/PageTransition";
import servicesData from '../../Data/Services.json'; // Changed from 'Service' to 'servicesData'

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

  useEffect(() => {
    const ctx = gsap.context(() => {
     

      // Service cards - in AND out with staggered animation
      gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { 
            y: 100, 
            opacity: 0,
            rotateX: -15,
            scale: 0.9 
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            duration: 0.8,
            delay: i * 0.1, // Stagger based on index
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'bottom 8%',
              scrub: 1,
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

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
  }, [])

  return (
    <Layout>
      <PageTransition>
        <div>
          {/* Hero */}
          <section className="min-h-[70vh] flex items-end pb-20 pt-43" ref={heroRef}>
            <div className=" hero-title container mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-8">
                  <span className="label-editorial text-muted-foreground mb-4 block">Our Services</span>
              <div className="hero-title hero-scroll overflow-hidden top-100 md:top-30 lg:top-1/2" >
            <h1 className="headline-xl">
                <span className="block overflow-hidden">
                <span className="block">
                    {'What we'.split('').map((char, index) => (
                    <span key={`shaping-${index}`} className="inline-block">
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                    ))}
                </span>
                </span>
                <span className="block overflow-hidden">
                <span className="block  ">
                    {'offers'.split('').map((char, index) => (
                    <span key={`digital-${index}`} className="inline-block">
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                    ))}
                </span>
                </span>
             
            </h1>
            </div>
                </div>
                <div className="hero-subtitle md:col-span-4 flex items-end">
                  <p className="body-editorial text-muted-foreground">
                    Comprehensive digital solutions tailored to your unique needs and objectives.
                  </p>
                </div>

                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute left-1/4 top-0 bottom-0 w-px bg-black/5 dark:bg-black/10" />
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/5 dark:bg-black/10" />
                  <div className="absolute left-3/4 top-0 bottom-0 w-px bg-black/5 dark:bg-black/10" />
                </div>
              </div>
            </div>
          </section>
        

          {/* Services Grid */}
          <section className="py-20 md:py-32" ref={containerRef}>
            <div className="container mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {services.map((service, index) => {
                  const IconComponent = iconComponents[service.icon] || Globe;
                  return (
                    <Link 
                      key={service.id || service.number}
                      to={`/services/${service.slug}`}
                      className="service-card group p-8 md:p-12 border border-foreground/10 hover:border-foreground/30 transition-all duration-500 bg-background block"
                    >
                      <div className="flex justify-between items-start mb-8">
                        <span className="label-editorial text-muted-foreground">{service.number}</span>
                        <IconComponent className="w-8 h-8 text-foreground/30 group-hover:text-foreground transition-colors duration-500" />
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4">
                        {service.title}
                      </h3>
                      
                      <p className="body-editorial text-muted-foreground mb-8">
                        {service.description}
                      </p>
                      
                      <div className="h-px bg-foreground/10 mb-8" />
                      
                      <ul className="grid grid-cols-2 gap-3">
                        {service.features.slice(0, 4).map((feature, i) => (
                          <li key={i} className="label-editorial text-muted-foreground">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 md:py-32 bg-black text-white">
            <div className="container mx-auto px-6 md:px-12 text-center">
              <span className="label-editorial text-grey-400 mb-8 block">Ready to Start?</span>
              <h2 className="headline-md mb-12 max-w-3xl mx-auto">
                Let's discuss how we can help bring your vision to life.
              </h2>
              <Link 
                to="/contact" 
                className="btn-editorial group border-background text-background group-hover:bg-background group-hover:text-foreground inline-flex items-center gap-3"
              >
                Start a Project
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" />
              </Link>
            </div>
          </section>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default Services;