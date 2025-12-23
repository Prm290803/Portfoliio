import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Twitter, Github } from 'lucide-react';
import { Layout } from '../../components/Layout';

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: 'Alex Chen',
    role: 'Founder & CEO',
    bio: 'Visionary leader with 15+ years in tech.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop', // Add image URL
  },
  {
    name: 'Sarah Mitchell',
    role: 'Creative Director',
    bio: 'Award-winning designer shaping digital experiences.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=500&fit=crop',
  },
  {
    name: 'Marcus Johnson',
    role: 'CTO',
    bio: 'Engineering expert building scalable solutions.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w-400&h=500&fit=crop',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Head of Design',
    bio: 'UI/UX specialist focused on user-centered design.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop',
  },
  {
    name: 'David Park',
    role: 'Lead Developer',
    bio: 'Full-stack engineer passionate about clean code.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop',
  },
  {
    name: 'Lisa Wang',
    role: 'Project Manager',
    bio: 'Agile expert ensuring seamless delivery.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop',
  },
];

const Team = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.team-title',
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.3 }
      );

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

  return (
    <>
    <Layout>
    <div className="min-h-screen">
      {/* Navigation would go here */}
      <div ref={containerRef}>
        {/* Hero Section */}
        <section className="min-h-[70vh] flex items-end pb-20 pt-40">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
              <div className="md:col-span-8">
                <span className="text-sm uppercase tracking-wider text-gray-500 mb-4 block">Our Team</span>
                <h1 className="team-title text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                  The People<br />Behind It All
                </h1>
              </div>
              <div className="md:col-span-4 flex items-end">
                <p className="text-lg text-gray-600">
                  A diverse team of thinkers, creators, and innovators united by passion for excellence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-20 md:py-32">
  <div className="container mx-auto px-6 md:px-12">
    <div className="grid  md:grid-cols-3 sm:grid-cols-1 gap-8 md:gap-12">
      {team.map((member, index) => (
        <div key={index} className="team-card group">
          {/* Photo container - FIXED: Using img tag instead of div */}
          <div className="aspect-[3/4] bg-gray-100 mb-6 overflow-hidden relative rounded-lg">
            {member.image ? (
              <img 
                src={member.image}  // Make sure team data has 'image' field
                alt={member.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              // Fallback placeholder if no image
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-100 group-hover:scale-105 transition-transform duration-700" />
            )}
            
            {/* Social links overlay */}
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg">
              <a href="#" className="w-10 h-10 border border-white text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300 rounded-full">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 border border-white text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300 rounded-full">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 border border-white text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300 rounded-full">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-1">
            {member.name}
          </h3>
          <p className="text-sm uppercase tracking-wider text-gray-500 mb-3">{member.role}</p>
          <p className="text-gray-600 text-sm">{member.bio}</p>
        </div>
      ))}
    </div>
  </div>
</section>

        {/* Join Us Section */}
        <section className="py-20 md:py-32 bg-gray-50">
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
        </section>
      </div>
      
      {/* Footer would go here */}
    </div>
    </Layout>
    </>
  );
};

export default Team;