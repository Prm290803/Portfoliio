import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';
import { Layout } from '../../components/Layout';
import { useToast } from '../../components/hooks/use-toast';
import emailjs from "@emailjs/browser";
import PageTransition from "../../components/PageTransition";


gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);
    const heroRef = useRef(null);
    const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
  });

 useEffect(() => {
    // Hero animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-title span',
        { y: 200, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1.2, ease: 'power4.out', delay: 0.3 }
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
    const ctx = gsap.context(() => {
     

      gsap.fromTo(
        '.contact-form > *',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.6,
        }
      );

      gsap.fromTo(
        '.contact-info > *',
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.8,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);
    await emailjs.send(
      "service_78lckuk",
      "template_g13x16d",
      {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.message,
      },
      "IuK_7Oz_0wu6Pf9KJ"
    );
    setLoading(false);


    toast({
      title: "Message sent",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({
      name: "",
      email: "",
      company: "",
      budget: "",
      message: "",
    });

  } catch (error) {
    toast({
      title: "Failed to send message",
      description: "Please try again later.",
      variant: "destructive",
    });
  }
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      <PageTransition>
      <div>
        {/* Hero */}
        <section className="min-h-[50vh] flex items-end pb-20 pt-40" ref={heroRef}>
          <div className="container mx-auto px-6 md:px-12">
            <span className="label-editorial text-muted-foreground mb-4 block">Contact Us</span>
             <div className="hero-title overflow-hidden top-100 md:top-30 lg:top-1/2">
            <h1 className="headline-xl">
                <span className="block overflow-hidden">
                <span className="block">
                    {'Let`s'.split('').map((char, index) => (
                    <span key={`shaping-${index}`} className="inline-block">
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                    ))}
                </span>
                </span>
                <span className="block overflow-hidden">
                <span className="block">
                    {'Work'.split('').map((char, index) => (
                    <span key={`shaping-${index}`} className="inline-block">
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                    ))}
                </span>
                </span>
               
                <span className="block overflow-hidden">
                <span className="block">
                    {'Together'.split('').map((char, index) => (
                    <span key={`experiences-${index}`} className="inline-block">
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                    ))}
                </span>
                </span>
            </h1>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20 md:py-32" ref={containerRef}>
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-20">
              {/* Form */}
              <div className="lg:col-span-7">
                <form onSubmit={handleSubmit} className="contact-form space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="label-editorial text-muted-foreground mb-3 block">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-foreground/20 py-4 text-lg focus:border-foreground outline-none transition-colors duration-300"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="label-editorial text-muted-foreground mb-3 block">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-foreground/20 py-4 text-lg focus:border-foreground outline-none transition-colors duration-300"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="label-editorial text-muted-foreground mb-3 block">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-foreground/20 py-4 text-lg focus:border-foreground outline-none transition-colors duration-300"
                        placeholder="Company Inc."
                      />
                    </div>
                   
                  </div>

                  <div>
                    <label className="label-editorial text-muted-foreground mb-3 block">Project Details *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-transparent border-b border-foreground/20 py-4 text-lg focus:border-foreground outline-none transition-colors duration-300 resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                    <button
                    type="submit"
                    disabled={loading}
                    className="btn-editorial-filled group disabled:opacity-50"
                    >
                    {loading ? "Sending..." : "Send Message"}
                    <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 duration-300 " />
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="lg:col-span-4 lg:col-start-9 contact-info">
                <div className="space-y-12">
                  <div>
                    <span className="label-editorial text-muted-foreground mb-4 block">Email</span>
                    <a href="mailto:buildcrew.co@gmail.com" className="text-xl md:text-2xl font-medium hover:text-muted-foreground transition-colors flex items-center gap-3">
                      <Mail className="w-5 h-5" />
                      buildcrew.co@gmail.com
                    </a>
                  </div>

                  <div>
                    <span className="label-editorial text-muted-foreground mb-4 block">Phone</span>
                    <a href="tel:+919328606257" className="text-xl md:text-2xl font-medium hover:text-muted-foreground transition-colors flex items-center gap-3">
                      <Phone className="w-5 h-5" />
                      +91 9328606257
                    </a>
                  </div>

                  <div className="h-px bg-foreground/10" />

                  <div>
                    <span className="label-editorial text-muted-foreground mb-4 block">Follow Us</span>
                    <div className="flex grid grid-cols- lg:grid-cols-4 gap-6">
                      {['Twitter', 'LinkedIn', 'Dribbble', 'GitHub'].map((social) => (
                        <a
                          key={social}
                          href="#"
                          className="label-editorial text-foreground hover:text-muted-foreground transition-colors"
                        >
                          {social}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map placeholder */}
        {/* <section className="h-[50vh] bg-secondary relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="label-editorial text-muted-foreground">Interactive Map</span>
          </div>
        </section> */}
      </div>
      </PageTransition>
    </Layout>
  );
};

export default Contact;