import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  CheckCircle, Play, ChevronDown, Leaf, ArrowRight,
  LayoutDashboard, Newspaper, Tractor, Users, Settings,
  Wheat, ShoppingCart, Sprout, Stethoscope, IndianRupee,
  MessageSquare, GraduationCap, Wallet, Star, Quote,
  Smartphone, Download, Apple
} from 'lucide-react';

/* ─── Animated Counter ─── */
function useCountUp(end: number, duration: number = 1500, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, start]);

  return count;
}

function AnimatedStat({ value, suffix = '', label, delay = 0 }: {
  value: number; suffix?: string; label: string; delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const count = useCountUp(value, 1500, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="text-center px-4 sm:px-8"
    >
      <Leaf className="w-5 h-5 text-leaf-green mx-auto mb-2" />
      <div className="font-poppins font-bold text-3xl sm:text-4xl text-harvest-gold">
        {value < 100 && value > 10 ? count / 10 : count}{suffix}
      </div>
      <div className="text-white/70 text-sm mt-1">{label}</div>
    </motion.div>
  );
}

/* ─── Scroll Reveal Wrapper ─── */
function ScrollReveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Section 2: Hero ─── */
function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background image with Ken Burns */}
      <div className="absolute inset-0 animate-ken-burns">
        <img
          src="/hero-bg.jpg"
          alt="Indian farmland"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(31,41,55,0.75) 0%, rgba(46,125,50,0.55) 50%, rgba(31,41,55,0.65) 100%)',
        }}
      />

      {/* Floating leaf shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/10"
            style={{
              left: `${10 + i * 15}%`,
              top: `${15 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, 10, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 2,
            }}
          >
            <Leaf className="w-8 h-8 sm:w-12 sm:h-12" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[900px] mx-auto px-4 text-center pt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 mb-8"
        >
          <CheckCircle className="w-4 h-4 text-leaf-green" />
          <span className="text-white text-sm font-medium">
            India's Most Trusted Farming Platform
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-poppins font-bold text-4xl sm:text-5xl lg:text-[56px] text-white leading-[1.1] tracking-[-0.02em]"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
        >
          From Seed to Sale, Everything in One Place
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-5 text-white/90 text-base sm:text-lg max-w-[640px] mx-auto leading-relaxed"
        >
          KRISHIVA is your complete digital farming companion — manage your farm, find workers,
          book machinery, sell produce, get expert advice, and access financial tools. All in one simple app.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.0 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-harvest-gold hover:bg-[#FBC02D] text-text-primary font-inter font-semibold text-lg px-8 py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-gold w-full sm:w-auto justify-center"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Link>
          <button
            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 border-2 border-white text-white font-inter font-medium text-lg px-8 py-4 rounded-xl transition-all duration-200 hover:bg-white/10 w-full sm:w-auto justify-center"
          >
            <Play className="w-5 h-5" />
            Watch How It Works
          </button>
        </motion.div>
      </div>

      {/* Hero composition image - bottom right */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="hidden md:block absolute bottom-0 right-[5%] w-[35%] max-w-[400px] z-10"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img
            src="/hero-farmer.png"
            alt="Farmer using smartphone"
            className="w-full h-auto object-contain drop-shadow-2xl"
          />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => document.getElementById('trust-bar')?.scrollIntoView({ behavior: 'smooth' })}
          className="cursor-pointer"
        >
          <ChevronDown className="w-6 h-6 text-white" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Section 3: Trust Bar ─── */
function TrustBar() {
  return (
    <section id="trust-bar" className="bg-text-primary py-10 sm:py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-white/15">
          <AnimatedStat value={50} suffix="L+" label="Farmers Trust Us" delay={0} />
          <AnimatedStat value={13} suffix="" label="Essential Services" delay={0.2} />
          <AnimatedStat value={500} suffix="Cr+" label="Transactions Processed" delay={0.4} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center px-4 sm:px-8"
          >
            <Leaf className="w-5 h-5 text-leaf-green mx-auto mb-2" />
            <div className="font-poppins font-bold text-3xl sm:text-4xl text-harvest-gold">4.8★</div>
            <div className="text-white/70 text-sm mt-1">Average Rating</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 4: What is KRISHIVA ─── */
function AboutSection() {
  const features = [
    'Save Time — Everything in one app',
    'Reduce Effort — Book services with a few taps',
    'Increase Profit — Connect directly with buyers',
    'Improve Confidence — Expert guidance always available',
  ];

  return (
    <section className="bg-bg-primary py-16 sm:py-24 nature-mesh relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 lg:gap-12 items-center">
          {/* Left: Text */}
          <div>
            <ScrollReveal>
              <span className="text-krishiva-green text-xs font-semibold uppercase tracking-[0.1em]">
                About KRISHIVA
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="font-poppins font-bold text-3xl sm:text-[44px] text-text-primary leading-[1.15] tracking-[-0.015em] mt-3">
                Your Farming Journey, Simplified
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="mt-5 text-text-secondary text-base sm:text-lg leading-[1.7]">
                KRISHIVA is not just an app — it is your trusted companion in every step of farming.
                Whether you need to decide what to plant, arrange labor for harvest, buy quality seeds
                at fair prices, or sell your produce to the best buyers, KRISHIVA brings everything
                together in one simple place.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="mt-4 text-text-secondary text-base sm:text-lg leading-[1.7]">
                Built with deep respect for farmers and their wisdom, KRISHIVA combines technology
                with human connection. Our platform connects you with experts, fellow farmers, buyers,
                and service providers — so you never feel alone in your farming journey.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <ul className="mt-7 space-y-3">
                {features.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-krishiva-green shrink-0" />
                    <span className="text-text-primary font-medium text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* Right: Video */}
          <ScrollReveal delay={0.3}>
            <div className="relative rounded-[20px] overflow-hidden border border-border-light shadow-[0_8px_32px_rgba(0,0,0,0.08)] bg-white">
              <video
                className="w-full aspect-video object-cover"
                controls
                poster="/hero-farmer.png"
                preload="metadata"
              >
                <source src="/how-krishiva-works.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="text-center text-text-muted text-sm py-3 font-medium">
                See how KRISHIVA works
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 5: Features Grid ─── */
function FeaturesSection() {
  const features = [
    {
      image: '/feature-farm-management.jpg',
      icon: Tractor,
      title: 'Farm Management',
      description: 'Track your fields, monitor crop health, plan activities, and manage your entire farm from one dashboard. Get timely reminders for sowing, irrigation, and harvest.',
      tags: ['Field Maps', 'Crop Tracking', 'Activity Log'],
    },
    {
      image: '/feature-marketplace.jpg',
      icon: ShoppingCart,
      title: 'Buy & Sell Produce',
      description: 'Connect directly with buyers and sellers. Get the best prices for your crops, and buy quality inputs — seeds, fertilizers, and tools — at fair rates.',
      tags: ['Price Discovery', 'Direct Connect', 'Secure Payments'],
    },
    {
      image: '/feature-expert-connect.jpg',
      icon: GraduationCap,
      title: 'Expert Connect',
      description: 'Get advice from agronomists, veterinarians, and soil scientists. Book video consultations, ask questions in the community, and access a wealth of farming knowledge.',
      tags: ['Video Calls', 'Crop Doctor', 'Community Q&A'],
    },
    {
      image: '/feature-finance.jpg',
      icon: IndianRupee,
      title: 'Finance Hub',
      description: 'Access farm loans, crop insurance, and government schemes. Track your expenses, manage your wallet, and build your agricultural credit score.',
      tags: ['Loans', 'Insurance', 'Credit Score'],
    },
  ];

  return (
    <section id="features" className="bg-white py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-12">
          <span className="text-krishiva-green text-xs font-semibold uppercase tracking-[0.1em]">
            What You Can Do
          </span>
          <h2 className="font-poppins font-bold text-3xl sm:text-[44px] text-text-primary leading-[1.15] mt-3">
            Everything Your Farm Needs
          </h2>
          <p className="text-text-secondary text-base sm:text-lg mt-4 max-w-[600px] mx-auto">
            Powerful tools designed to make farming easier, more profitable, and less stressful.
          </p>
        </ScrollReveal>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 0.15}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="group bg-white rounded-[20px] border border-border-light shadow-card hover:shadow-card-hover hover:border-border-green transition-all duration-250 overflow-hidden"
              >
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-krishiva-green/10 flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-krishiva-green" />
                    </div>
                    <h3 className="font-poppins font-semibold text-xl text-text-primary">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {feature.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-bg-primary text-text-secondary text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 6: How It Works ─── */
function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: 'Download KRISHIVA',
      description: 'Get the app from Google Play Store or App Store. Works on all smartphones — even basic ones.',
    },
    {
      num: '02',
      title: 'Set Up Your Profile',
      description: 'Tell us about your farm, crops, and location. Our voice assistant can help you fill everything in just a few minutes.',
    },
    {
      num: '03',
      title: 'Start Farming Smarter',
      description: 'Access all services — manage your farm, book labor, sell produce, consult experts, and much more. Everything is just a tap away.',
    },
  ];

  return (
    <section id="how-it-works" className="bg-bg-primary py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <span className="text-krishiva-green text-xs font-semibold uppercase tracking-[0.1em]">
            How It Works
          </span>
          <h2 className="font-poppins font-bold text-3xl sm:text-[44px] text-text-primary leading-[1.15] mt-3">
            Get Started in 3 Simple Steps
          </h2>
          <p className="text-text-secondary text-base sm:text-lg mt-4 max-w-[600px] mx-auto">
            No complicated setup. No technical knowledge needed. Just download and start farming smarter.
          </p>
        </ScrollReveal>

        <div className="relative">
          {/* Connector line - desktop only */}
          <div className="hidden lg:block absolute top-16 left-[20%] right-[20%] h-0.5">
            <div className="w-full h-full border-t-2 border-dashed border-border-green" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <ScrollReveal key={step.num} delay={index * 0.2}>
                <div className="bg-white rounded-[20px] p-8 shadow-card text-center relative max-w-[340px] mx-auto">
                  <span className="font-poppins font-bold text-3xl text-krishiva-green/40">
                    {step.num}
                  </span>
                  <h3 className="font-poppins font-semibold text-xl text-text-primary mt-4 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <ScrollReveal delay={0.6} className="text-center mt-12">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-harvest-gold hover:bg-[#FBC02D] text-text-primary font-inter font-semibold text-base px-8 py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-gold"
          >
            <Download className="w-5 h-5" />
            Download KRISHIVA Now
          </Link>
          <p className="text-text-muted text-sm mt-4">
            Available on Android & iOS • Free to use
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── Section 7: Testimonials ─── */
function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Before KRISHIVA, I used to spend hours finding labor during harvest season. Now I book workers in minutes. My produce sells for 20% more because I connect directly with buyers. This app has truly changed my life.",
      name: 'Rajesh Kumar',
      location: 'Wheat Farmer, Punjab',
      image: '/testimonial-rajesh.jpg',
    },
    {
      quote: "As a woman farmer, I often felt left out of market information. KRISHIVA gives me daily price updates, weather alerts, and connects me with experts who answer all my questions. I feel more confident and independent now.",
      name: 'Anita Devi',
      location: 'Vegetable Farmer, Maharashtra',
      image: '/testimonial-anita.jpg',
    },
    {
      quote: "The Crop Doctor feature saved my tomato crop last season. I spotted disease early, got expert advice within hours, and took action. I would have lost lakhs without KRISHIVA. Every farmer should have this app.",
      name: 'Dev Patel',
      location: 'Progressive Farmer, Gujarat',
      image: '/testimonial-dev.jpg',
    },
  ];

  return (
    <section id="testimonials" className="bg-white py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <span className="text-krishiva-green text-xs font-semibold uppercase tracking-[0.1em]">
            Farmer Stories
          </span>
          <h2 className="font-poppins font-bold text-3xl sm:text-[44px] text-text-primary leading-[1.15] mt-3">
            Trusted by Farmers Across India
          </h2>
          <p className="text-text-secondary text-base sm:text-lg mt-4 max-w-[600px] mx-auto">
            Hear from farmers who have transformed their farming journey with KRISHIVA.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <ScrollReveal key={t.name} delay={index * 0.15}>
              <div className="bg-bg-primary rounded-[20px] p-6 sm:p-8 border border-border-light shadow-card h-full flex flex-col">
                <Quote className="w-10 h-10 text-leaf-green/30 mb-4" />
                <p className="text-text-primary text-base leading-[1.7] flex-1">
                  "{t.quote}"
                </p>
                <div className="border-t border-border-light mt-5 pt-5 flex items-center gap-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-poppins font-semibold text-text-primary">{t.name}</h4>
                    <p className="text-text-secondary text-sm">{t.location}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-harvest-gold fill-harvest-gold" />
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 8: All Modules Showcase ─── */
function ModulesSection() {
  const modules = [
    { icon: LayoutDashboard, title: 'Daily Companion', description: 'Your personalized farming dashboard' },
    { icon: Newspaper, title: 'Smart Feed', description: 'News, prices, weather & alerts' },
    { icon: Tractor, title: 'Farm OS', description: 'Manage fields, crops & activities' },
    { icon: Users, title: 'Labor Marketplace', description: 'Find & book farm workers' },
    { icon: Settings, title: 'Machinery', description: 'Rent tractors & equipment' },
    { icon: Wheat, title: 'Drone Services', description: 'Crop spraying & surveying' },
    { icon: ShoppingCart, title: 'Sell Produce', description: 'Connect with buyers directly' },
    { icon: Sprout, title: 'Buy Inputs', description: 'Seeds, fertilizers & tools' },
    { icon: Stethoscope, title: 'Crop Doctor', description: 'AI disease diagnosis' },
    { icon: IndianRupee, title: 'Finance Hub', description: 'Loans, insurance & savings' },
    { icon: MessageSquare, title: 'Community', description: 'Connect with fellow farmers' },
    { icon: GraduationCap, title: 'Expert Connect', description: 'Book agronomists & vets' },
    { icon: Wallet, title: 'Wallet & Escrow', description: 'Secure payments & escrow' },
  ];

  return (
    <section id="modules" className="bg-bg-primary py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <span className="text-krishiva-green text-xs font-semibold uppercase tracking-[0.1em]">
            All Services
          </span>
          <h2 className="font-poppins font-bold text-3xl sm:text-[44px] text-text-primary leading-[1.15] mt-3">
            13 Powerful Tools, One Simple App
          </h2>
          <p className="text-text-secondary text-base sm:text-lg mt-4 max-w-[600px] mx-auto">
            From managing your farm to selling your produce, every tool you need is right here.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {modules.map((mod, index) => (
            <ScrollReveal key={mod.title} delay={index * 0.05}>
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-border-light text-center hover:bg-krishiva-green/[0.04] hover:border-border-green transition-all duration-200 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-krishiva-green/10 flex items-center justify-center mx-auto group-hover:bg-krishiva-green/20 transition-colors">
                  <mod.icon className="w-6 h-6 text-krishiva-green" />
                </div>
                <h3 className="font-poppins font-semibold text-text-primary mt-3 text-base">
                  {mod.title}
                </h3>
                <p className="text-text-secondary text-xs sm:text-sm mt-1 line-clamp-2">
                  {mod.description}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 9: Download CTA ─── */
function DownloadCTASection() {
  const benefits = [
    'Free to download & use',
    'Works on all smartphones',
    'Voice-first — no typing needed',
    'Available in 12 Indian languages',
  ];

  return (
    <section id="download" className="hero-gradient py-16 sm:py-24 relative overflow-hidden">
      {/* Decorative leaf shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/[0.08]"
            style={{
              left: `${5 + i * 25}%`,
              top: `${10 + (i % 2) * 60}%`,
            }}
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 20, repeat: Infinity, delay: i * 3 }}
          >
            <Leaf className="w-20 h-20 sm:w-32 sm:h-32" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-10 items-center">
          {/* Left: Text */}
          <div>
            <ScrollReveal>
              <h2
                className="font-poppins font-bold text-3xl sm:text-[44px] text-white leading-[1.15]"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.15)' }}
              >
                Start Farming Smarter Today
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="mt-4 text-white/90 text-base sm:text-lg max-w-[480px] leading-relaxed">
                Join 50+ lakh farmers who are already saving time, reducing effort, and earning
                more with KRISHIVA. Download the app — it is free.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <ul className="mt-7 space-y-3">
                {benefits.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white font-medium text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-4">
                {/* Google Play */}
                <button className="flex items-center gap-3 bg-text-primary hover:bg-black text-white px-5 py-3 rounded-xl transition-all hover:scale-105">
                  <Smartphone className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-wide opacity-80">Get it on</div>
                    <div className="text-sm font-semibold -mt-0.5">Google Play</div>
                  </div>
                </button>
                {/* App Store */}
                <button className="flex items-center gap-3 bg-text-primary hover:bg-black text-white px-5 py-3 rounded-xl transition-all hover:scale-105">
                  <Apple className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-wide opacity-80">Download on</div>
                    <div className="text-sm font-semibold -mt-0.5">App Store</div>
                  </div>
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Phone mockup */}
          <ScrollReveal delay={0.2} className="hidden lg:flex justify-center">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <img
                src="/hero-phone-mockup.png"
                alt="KRISHIVA App"
                className="w-[280px] drop-shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
                style={{ transform: 'rotate(8deg)' }}
              />
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Home Page ─── */
export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <AboutSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <ModulesSection />
      <DownloadCTASection />
    </>
  );
}
