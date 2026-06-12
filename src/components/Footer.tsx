import { Link } from 'react-router-dom';
import { Leaf, Phone, Mail, MessageCircle, Clock, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/#features' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Modules', href: '/#modules' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'Download App', href: '/#download' },
  { label: 'About Us', href: '#' },
  { label: 'Careers', href: '#' },
  { label: 'Blog', href: '#' },
];

const serviceLinks = [
  { label: 'Farm Management', href: '/dashboard/farm' },
  { label: 'Labor Marketplace', href: '/dashboard/labor' },
  { label: 'Machinery Booking', href: '/dashboard/machinery' },
  { label: 'Produce Marketplace', href: '/dashboard/produce' },
  { label: 'Input Marketplace', href: '/dashboard/inputs' },
  { label: 'Crop Doctor', href: '/dashboard/crop-doctor' },
  { label: 'Finance Hub', href: '/dashboard/finance' },
  { label: 'Expert Connect', href: '/dashboard/experts' },
];

const contactItems = [
  { icon: Phone, text: '1800-KRISHIVA (Toll Free)' },
  { icon: Mail, text: 'support@krishiva.in' },
  { icon: MessageCircle, text: 'Chat on WhatsApp' },
  { icon: Clock, text: 'Mon-Sat, 8AM-8PM' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer id="footer" className="footer-gradient">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Newsletter Section */}
        <div className="bg-white/5 rounded-2xl p-6 sm:p-8 mb-12 border border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-poppins font-semibold text-xl text-white">
                Stay Updated
              </h3>
              <p className="text-white/60 text-sm mt-1">
                Get farming tips, market updates, and new features delivered to your inbox.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full sm:w-auto gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 sm:w-64 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-harvest-gold transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-harvest-gold hover:bg-[#FBC02D] text-text-primary font-medium text-sm rounded-xl transition-colors shrink-0"
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-krishiva-green flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="font-poppins font-bold text-xl text-white">KRISHIVA</span>
            </Link>
            <p className="mt-3 text-white/60 text-sm leading-relaxed max-w-[240px]">
              From Seed to Sale, Everything in One Place
            </p>
            <p className="mt-3 text-white/50 text-sm leading-relaxed max-w-[240px]">
              KRISHIVA is India's most trusted digital farming companion, empowering farmers with technology, knowledge, and connections.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h4 className="font-poppins font-semibold text-white text-heading-sm mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-white text-sm transition-all duration-150 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h4 className="font-poppins font-semibold text-white text-heading-sm mb-4">
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-white text-sm transition-all duration-150 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <h4 className="font-poppins font-semibold text-white text-heading-sm mb-4">
              We're Here to Help
            </h4>
            <ul className="space-y-3">
              {contactItems.map((item) => (
                <li key={item.text} className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-leaf-green shrink-0" />
                  <span className="text-white/70 text-sm">{item.text}</span>
                </li>
              ))}
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-white/50 hover:text-harvest-gold hover:scale-110 transition-all duration-150"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-10" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; 2025 KRISHIVA. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-white/50 hover:text-white/80 text-sm transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
