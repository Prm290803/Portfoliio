import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Twitter, Github , Dribbble} from 'lucide-react';
import { Layout } from '../../components/Layout';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Maharaj from "../../assets/img1.JPG";


gsap.registerPlugin(ScrollTrigger);

// import { Linkedin, Github, Dribbble, Twitter } from "lucide-react";
// import Maharaj from "../../assets/Maharaj.jpg";

const team = [
  {
    id: "founder",
    name: "Param",
    role: "Founder, CEO & CTO",
    image: Maharaj,
    socials: [
      { icon: <Linkedin size={16} />, link: "" },

    ],
  },
  // PARTNER 1
  {
    id: "p1",
    name: "Partner One",
    role: "Lead Systems Architect (ERP & Frappe)",
    image: "/team/partner1.jpg",
    socials: [
      { icon: <Linkedin size={16} />, link: "" },
      
    ],
  },

  // PARTNER 2
  {
    id: "p2",
    name: "Partner Two",
    role: "Lead Frontend Engineer (Web & Mobile)",
    image: "/team/partner2.jpg",
    socials: [
      { icon: <Linkedin size={16} />, link: "" },
      
    ],
  },

  // PARTNER 3
  {
    id: "p3",
    name: "Partner Three",
    role: "DevOps Lead",
    image: "/team/partner3.jpg",
    socials: [
      { icon: <Linkedin size={16} />, link: "" },
      
    ],
  },

  // PARTNER 4
  {
    id: "p4",
    name: "Partner Four",
    role: "Lead Backend Engineer",
    image: "/team/partner4.jpg",
    socials: [
      { icon: <Linkedin size={16} />, link: "" },
    
    ],
  },

];


const Team = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
     
      gsap.utils.toArray('.team-card').forEach((card) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
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
  }, []);

  return (
    <>
    <Layout>
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex pb-20 pt-32 items-center justify-center relative overflow-hidden" ref={heroRef}>
          <div className="container px- md:px-5">
            <div className="max-w-7xl mx-auto">
              
              {/* Vertical label */}
             <span className="label-editorial  text-muted-foreground mb-4 block">Meet Our Team</span>

              {/* Main headline */}
            <div className="hero-title overflow-hidden top-100 md:top-30 lg:top-1/2" >
            <h1 className="headline-xl">
                <span className="block overflow-hidden">
                <span className="block">
                    {'the'.split('').map((char, index) => (
                    <span key={`shaping-${index}`} className="inline-block">
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                    ))}
                </span>
                </span>
                <span className="block overflow-hidden">
                <span className="block text-stroke ">
                    {'People'.split('').map((char, index) => (
                    <span key={`digital-${index}`} className="inline-block">
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                    ))}
                </span>
                </span>
                <span className="block overflow-hidden">
                <span className="block">
                    {'behind it'.split('').map((char, index) => (
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
   

   
{/* Modern Team Grid */}
   <section className="py-12 sm:py-16 md:py-20 lg:py-24  bg-gray-50 " href={containerRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-16 md:mb-20 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Our Team
            </h2>
            <p className="text-gray-600 mt-3 sm:mt-4 mb-3text-base sm:text-lg">
              Meet the people building exceptional digital experiences
            </p>
          </div>

          {/* Team Grid */}
          <div className="team-title grid grid-cols  sm:grid-cols-2 lg:grid-cols-3 gap-25 sm:gap-10 md:gap-32 lg:gap-20">
            {team.map((member, index) => (
              <div key={index} className="relative flex justify-center group">
                
                {/* Floating Image - Responsive positioning with hover effect */}
                <div className="team-card absolute -top-20 sm:-top-20 md:-top-18 lg:-top-15 z-10 
                                transition-transform duration-500 ease-out 
                                group-hover:scale-105 group-hover:-translate-y-1">
                  <div className="w-50 h-50 sm:w-56 sm:h-48 md:w-56 md:h-56 lg:w-60 lg:h-60 rounded-2xl bg-white p-2 shadow-lg sm:shadow-xl
                                 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-xl 
                                 transition-transform duration-700 ease-out 
                                 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Card - Responsive sizing with hover effects */}
                <div className="bg-[#111] text-white rounded-2xl pt-32 sm:pt-36 md:pt-40 lg:pt-48 pb-6 sm:pb-8 px-4 sm:px-6 w-full max-w-xs sm:max-w-sm shadow-lg sm:shadow-2xl
                                transition-all duration-300 ease-out 
                                group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-gray-900/50
                                border border-gray-800/50 group-hover:border-gray-700">
                  
                  {/* Name - Responsive typography with hover effect */}
                  <h3 className="text-lg sm:text-xl font-semibold text-center truncate 
                                 transition-colors duration-300 
                                 group-hover:text-blue-400">
                    {member.name}
                  </h3>

                  {/* Role - Responsive typography with hover effect */}
                  <p className="text-gray-400 text-center mt-1 text-xs sm:text-sm truncate px-2 
                                transition-colors duration-300 
                                group-hover:text-gray-300">
                    {member.role}
                  </p>

                  {/* Optional Bio for larger screens */}
                  {member.bio && (
                    <div className="mt-4 hidden sm:block">
                      <p className="text-gray-300 text-center text-sm px-2 line-clamp-2 
                                    transition-colors duration-300 
                                    group-hover:text-gray-200">
                        {member.bio}
                      </p>
                    </div>
                  )}

                  {/* Social Icons - Responsive spacing with enhanced hover */}
                  <div className="flex justify-center gap-3 sm:gap-4 mt-6">
                    {member.socials?.map((social, i) => (
                      <a
                        key={i}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-white text-black flex items-center justify-center 
                                   transition-all duration-300 
                                   hover:scale-110 hover:bg-blue-500 hover:text-white
                                   hover:shadow-lg hover:shadow-blue-500/30"
                        aria-label={social.platform || `Social link ${i + 1}`}
                      >
                        {social.icon || (
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300" 
                               fill="currentColor" 
                               viewBox="0 0 24 24">
</svg>
                        )}
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Optional: Load more button for mobile */}
          {team.length > 6 && (
            <div className="mt-12 sm:hidden">
              <button className="mx-auto block px-8 py-3 bg-[#111] text-white rounded-full 
                                 transition-all duration-300 
                                 hover:bg-black hover:scale-105 hover:shadow-lg">
                View All Team Members
              </button>
            </div>
          )}

        </div>
        
      </section>


       <div className="hero-cta mt-6 mb-20 md:mt-12">
<section className="text-center mb-10 justify-center w-1/2">  
  <div className="grid lg:grid-cols-2 grid-1 justify-center items-center lg:justify-end lg:items-center gap-4 md:gap-6 w-full">
    
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
  </section>
</div>



 {/* Join Us Section */}
      {/* <section className="py-20 md:py-32 bg-black text-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-6">
              <span className="text-sm uppercase tracking-wider text-gray-500 mb-4 block">Join Our Team</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">We're Always Looking for Talent</h2>
              <p className="text-lg text-gray-600 mb-8">
                We're building a team of exceptional individuals who share our passion for 
                creating meaningful digital experiences. If you're ready to do the best work 
                of your career, we'd love to hear from you.
              </p>
              <a 
                href="mailto:careers@techmorphix.com" 
                className="inline-block px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-colors duration-300"
              >
                View Open Positions
              </a>
            </div>
            <div className="md:col-span-5 md:col-start-8">
              <div className="space-y-6">
                {['Remote-First Culture', 'Competitive Compensation', 'Learning & Development', 'Work-Life Balance'].map((perk, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="w-2 h-2 bg-black" />
                    <span className="text-lg font-medium">{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section> */}
    
      
      {/* Footer would go here */}
      </div>
    </Layout>
    </>
  );
};

export default Team;