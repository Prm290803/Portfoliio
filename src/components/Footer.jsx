import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  Twitter, 
  Linkedin, 
  Dribbble, 
  Github,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { useLenis } from '../Lenis'; // adjust path



export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const lenis = useLenis();

  const scrollToSection = (id) => {
  const el = document.querySelector(id);
  if (!el || !lenis) return;

  lenis.scrollTo(el, {
    offset: -80, // header height
    duration: 1.2,
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });
};

  const handleNavClick = (e, path, name) => {
  if (window.location.pathname === '/' && path !== '/') {
    const target = document.querySelector(`#${name.toLowerCase()}`);
    if (target) {
      e.preventDefault();
      scrollToSection(`#${name.toLowerCase()}`);
    }
  }
};

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Work', path: '/work' },
    { name: 'Process', path: '/process' },
    // { name: 'Team', path: '/team' },
    { name: 'Contact', path: '/contact' }
  ];

  const socialLinks = [
    { 
      name: 'Twitter', 
      icon: Twitter, 
      href: 'https://twitter.com/techmorphix',
      color: 'hover:text-[#1DA1F2]'
    },
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      href: 'https://linkedin.com/company/techmorphix',
      color: 'hover:text-[#0077B5]'
    },
    { 
      name: 'Dribbble', 
      icon: Dribbble, 
      href: 'https://dribbble.com/techmorphix',
      color: 'hover:text-[#EA4C89]'
    },
    { 
      name: 'GitHub', 
      icon: Github, 
      href: 'https://github.com/techmorphix',
      color: 'hover:text-white'
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      content: 'buildcrew.co@gmail.com',
      href: 'mailto:buildcrew.co@gmail.com',
      type: 'email'
    },
    {
      icon: Phone,
      content: '+91 9328606257',
      href: 'tel:+919328606257',
      type: 'telephone'
    },
    {
      icon: MapPin,
      content: 'mohan arcade, thamna chokdi, umreth-388220, gujarat, india',
      type: 'address'
    }
  ];

  return (
    <footer 
      className="bg-black text-white py-12 md:py-20 lg:py-32"
      role="contentinfo"
      aria-label="Site footer"
      itemScope 
      itemType="https://schema.org/Organization"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Top Section */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-12">
          {/* Call to Action */}
          <div className="md:col-span-6 lg:col-span-6">
             <div className='mb-7'>
        <span className="text-3xl md:text-4xl font-black uppercase tracking-[-0.02em]">
          Build<span className="text-stroke text-white">Crew</span>
        </span>
      </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
              Let's Create<br />
              <span className="text-transparent bg-clip-text bg-white/90">
                Something Great
              </span>
            </h2>
           <p className="text-gray-400 text-sm max-w-md">
              Transforming ideas into digital reality through innovative design and cutting-edge technology.
            </p>
             
          </div>
          
          {/* Navigation */}
          <div className="md:col-span-3 lg:col-span-3">
            <p className="text-sm font-semibold text-gray-400 mb-6 uppercase tracking-wider">
              Navigation
            </p>
            <nav 
              className="flex flex-col gap-4"
              aria-label="Footer navigation"
            >
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="group flex items-center justify-between text-gray-300 hover:text-white transition-all duration-300 py-1 border-b border-transparent hover:border-gray-700"
                  onClick={(e) => handleNavClick(e, item.path, item.name)}
                >
                  <span className="text-lg">{item.name}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300" />
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Contact Info */}
          <div className="md:col-span-3 lg:col-span-3">
            <p className="text-sm font-semibold text-gray-400 mb-6 uppercase tracking-wider">
              Contact
            </p>
            <div 
              className="flex flex-col gap-5"
              itemProp="address" 
              itemScope 
              itemType="https://schema.org/PostalAddress"
            >
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                const isLink = info.href;
                
                const content = (
                  <div className="flex items-start gap-3 group">
                    <div className="mt-1">
                      <Icon className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors whitespace-pre-line leading-relaxed">
                      {info.content}
                    </span>
                  </div>
                );

                return isLink ? (
                  <a
                    key={index}
                    href={info.href}
                    className="transition-all duration-300 hover:translate-x-1"
                    itemProp={info.type}
                    aria-label={`Contact via ${info.type}`}
                  >
                    {content}
                  </a>
                ) : (
                  <div 
                    key={index}
                    className="transition-all duration-300 hover:translate-x-1"
                    itemProp={info.type === 'address' ? 'streetAddress' : info.type}
                  >
                    {content}
                  </div>
                );
              })}
            </div>
            {/* Newsletter Signup */}
            {/* <div className="mt-8 pt-8 border-t border-gray-800">
              <p className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
                Newsletter
              </p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20"
                  aria-label="Email for newsletter subscription"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Join
                </button>
              </form>
            </div>
            */}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-12" />

        {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
     
           
          {/* Social Links & Copyright */}
          <div className="flex flex-col items-start md:items-end gap-6">
            {/* Social Links */}
            <div className="flex gap-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 ${social.color} transition-all duration-300 transform hover:scale-110`}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
            
            {/* Copyright & Legal Links */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
              <div className="flex flex-wrap gap-4 md:gap-6">
                <Link 
                  to="/privacy" 
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link 
                  to="/terms" 
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
                <Link 
                  to="/cookies" 
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Cookie Policy
                </Link>
              </div>
              <p className="text-sm text-gray-400 mt-2 md:mt-0">
                © {currentYear} BuildCrew Studio. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Back to Top Button
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-3 bg-white/90 backdrop-blur-md border border-black/10 rounded-full shadow-lg transition-all duration-300 hover:bg-white hover:shadow-xl hover:scale-105 active:scale-55"
          aria-label="Scroll back to top"
        >
          <ArrowUpRight className="w-5 h-5 text-black rotate-[-45deg] transition-transform duration-300 hover:rotate-0" />
        </button> */}
       </div>
    </footer>
  );
};
export default Footer;