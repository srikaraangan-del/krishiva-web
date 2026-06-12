import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Services', href: '/#modules' },
  { label: 'Community', href: '/dashboard/community' },
  { label: 'Contact', href: '/#footer' },
];

const languages = ['English', 'Hindi', 'Marathi', 'Telugu', 'Tamil'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeLang, setActiveLang] = useState('English');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleNavClick = useCallback((href: string) => {
    if (href.startsWith('/#')) {
      const id = href.slice(2);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileOpen(false);
  }, []);

  const isHomePage = location.pathname === '/';
  const isTransparent = isHomePage && !scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-krishiva-green flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span
              className={`font-poppins font-bold text-xl transition-colors duration-300 ${
                isTransparent ? 'text-white' : 'text-text-primary'
              }`}
            >
              KRISHIVA
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`relative font-inter font-medium text-[14px] transition-colors duration-200 hover:text-leaf-green ${
                  isTransparent ? 'text-white' : 'text-text-primary'
                } group`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-leaf-green transition-all duration-200 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
                  isTransparent
                    ? 'border-white/30 text-white hover:bg-white/10'
                    : 'border-border-light text-text-secondary hover:bg-gray-50'
                }`}
              >
                {activeLang}
                <ChevronDown className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-border-light py-2 min-w-[140px] z-50"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setActiveLang(lang);
                          setLangOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-bg-primary transition-colors ${
                          activeLang === lang
                            ? 'text-krishiva-green font-medium'
                            : 'text-text-secondary'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Get Started Button */}
            <Link
              to="/dashboard"
              className="bg-krishiva-green hover:bg-[#1B5E20] text-white font-inter font-medium text-sm px-6 py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-button"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isTransparent ? 'text-white' : 'text-text-primary'
            }`}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-border-light overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="block px-4 py-3 rounded-xl text-text-primary font-medium hover:bg-bg-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-border-light">
                <p className="px-4 py-2 text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Language
                </p>
                <div className="flex flex-wrap gap-2 px-4">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveLang(lang)}
                      className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                        activeLang === lang
                          ? 'border-krishiva-green text-krishiva-green bg-krishiva-green/5'
                          : 'border-border-light text-text-secondary hover:bg-gray-50'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
              <Link
                to="/dashboard"
                className="block mt-3 bg-krishiva-green text-white text-center font-medium py-3 rounded-xl hover:bg-[#1B5E20] transition-colors"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
