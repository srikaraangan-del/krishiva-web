import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Sun,
  Cloud,
  CloudRain,
  Wind,
  Droplets,
  Thermometer,
  Eye,
  Sunrise,
  Sunset,
  Check,
  Clock,
  Sprout,
  Users,
  Tractor,
  Wallet,
  LayoutDashboard,
  Newspaper,
  Settings,
  Wheat,
  ShoppingCart,
  Stethoscope,
  IndianRupee,
  MessageSquare,
  GraduationCap,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';

/* ───────────────────────── helpers ───────────────────────── */
const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0, 0, 0.2, 1] as [number, number, number, number] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const staggerChild = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
};

/* ─────────────────────── Weather Widget ─────────────────────── */
const forecastDays = [
  { day: 'Mon', icon: Sun, high: 35, low: 26, condition: 'Sunny' },
  { day: 'Tue', icon: Cloud, high: 33, low: 25, condition: 'Cloudy' },
  { day: 'Wed', icon: CloudRain, high: 29, low: 24, condition: 'Rainy' },
  { day: 'Thu', icon: Sun, high: 34, low: 26, condition: 'Sunny' },
  { day: 'Fri', icon: Cloud, high: 32, low: 25, condition: 'Cloudy' },
];

function WeatherWidget() {
  return (
    <motion.div
      custom={0}
      variants={cardVariant}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-2xl p-5 border border-border-light shadow-card relative overflow-hidden"
    >
      {/* Subtle blue gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-blue-50/40 pointer-events-none" />

      <div className="relative">
        {/* Current Weather */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sun className="w-14 h-14 text-harvest-gold" />
            </motion.div>
            <div>
              <p className="font-poppins font-bold text-3xl text-text-primary">34°C</p>
              <p className="text-text-secondary text-sm font-medium">Partly Cloudy</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-text-muted text-xs">
              <span>Location</span>
            </div>
            <p className="text-text-secondary text-sm font-medium">Your Farm, Guntur</p>
          </div>
        </div>

        {/* Details Row */}
        <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-border-light">
          {[
            { icon: Droplets, label: 'Humidity', value: '65%' },
            { icon: Wind, label: 'Wind', value: '12 km/h' },
            { icon: Eye, label: 'Visibility', value: '10 km' },
            { icon: Thermometer, label: 'Feels Like', value: '37°C' },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center text-center gap-1">
              <item.icon className="w-4 h-4 text-text-muted" />
              <span className="text-text-primary text-sm font-semibold">{item.value}</span>
              <span className="text-text-muted text-[11px]">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Sun times */}
        <div className="flex items-center justify-between mt-3 px-2">
          <div className="flex items-center gap-1.5">
            <Sunrise className="w-4 h-4 text-harvest-gold" />
            <span className="text-text-secondary text-xs">6:12 AM</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sunset className="w-4 h-4 text-soil-brown" />
            <span className="text-text-secondary text-xs">6:48 PM</span>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div className="mt-4 pt-4 border-t border-border-light">
          <p className="text-text-muted text-xs font-medium mb-3 uppercase tracking-wider">5-Day Forecast</p>
          <div className="grid grid-cols-5 gap-1">
            {forecastDays.map((d) => (
              <div key={d.day} className="flex flex-col items-center text-center gap-1">
                <span className="text-text-secondary text-[11px] font-medium">{d.day}</span>
                <d.icon className={`w-5 h-5 ${d.condition === 'Sunny' ? 'text-harvest-gold' : d.condition === 'Rainy' ? 'text-blue-400' : 'text-text-muted'}`} />
                <span className="text-text-primary text-xs font-semibold">{d.high}°</span>
                <span className="text-text-muted text-[10px]">{d.low}°</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────── Today's Tasks ─────────────────────── */
interface Task {
  id: number;
  title: string;
  subtitle: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

const initialTasks: Task[] = [
  { id: 1, title: 'Irrigate east field', subtitle: 'Cotton crop — 2 hours', time: '7:00 AM', priority: 'high', completed: false },
  { id: 2, title: 'Apply fertilizer to tomato crop', subtitle: 'Greenhouse B — 30 min', time: '9:30 AM', priority: 'high', completed: false },
  { id: 3, title: 'Book tractor for tilling', subtitle: 'Machinery rental', time: '11:00 AM', priority: 'medium', completed: false },
  { id: 4, title: 'Check market prices for chili', subtitle: 'Guntur APMC', time: '2:00 PM', priority: 'medium', completed: false },
  { id: 5, title: 'Inspect drip irrigation lines', subtitle: 'East section — 1 hour', time: '4:00 PM', priority: 'low', completed: true },
];

const priorityColors = {
  high: 'bg-error-red/10 text-error-red',
  medium: 'bg-harvest-gold/10 text-warning-amber',
  low: 'bg-krishiva-green/10 text-krishiva-green',
};

function TasksWidget() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const incompleteCount = tasks.filter((t) => !t.completed).length;

  const toggleTask = (id: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  return (
    <motion.div
      custom={1}
      variants={cardVariant}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-2xl border border-border-light shadow-card overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border-light">
        <div className="flex items-center gap-2">
          <h3 className="font-poppins font-semibold text-lg text-text-primary">Today&apos;s Tasks</h3>
          <span className="w-6 h-6 rounded-full bg-krishiva-green text-white text-xs font-semibold flex items-center justify-center">
            {incompleteCount}
          </span>
        </div>
        <span className="text-krishiva-green text-sm font-medium cursor-pointer hover:underline">+ Add</span>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto max-h-[320px]">
        {tasks.map((task, idx) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + idx * 0.06, duration: 0.3 }}
            className={`flex items-center gap-3 px-5 py-3.5 border-b border-border-light last:border-b-0 transition-colors ${task.completed ? 'bg-bg-primary/50' : ''}`}
          >
            {/* Checkbox */}
            <button
              onClick={() => toggleTask(task.id)}
              className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-150 ${
                task.completed ? 'bg-krishiva-green border-krishiva-green' : 'border-border-light hover:border-krishiva-green'
              }`}
            >
              {task.completed && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
            </button>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${task.completed ? 'line-through text-text-muted' : 'text-text-primary'}`}>
                {task.title}
              </p>
              <p className="text-text-secondary text-xs mt-0.5">{task.subtitle}</p>
            </div>

            {/* Time & Priority */}
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${priorityColors[task.priority]}`}>
                {task.priority}
              </span>
              <div className="flex items-center gap-1 text-text-muted">
                <Clock className="w-3 h-3" />
                <span className="text-[11px]">{task.time}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────────── Quick Stats ─────────────────────── */
const stats = [
  {
    icon: IndianRupee,
    value: '₹90,000',
    label: 'Farm Profit',
    trend: '+12%',
    trendUp: true,
    accent: 'border-l-krishiva-green',
    iconBg: 'bg-krishiva-green/10',
    iconColor: 'text-krishiva-green',
  },
  {
    icon: Sprout,
    value: '12',
    label: 'Active Crops',
    trend: '+2 this month',
    trendUp: true,
    accent: 'border-l-leaf-green',
    iconBg: 'bg-leaf-green/10',
    iconColor: 'text-leaf-green',
  },
  {
    icon: Users,
    value: '3',
    label: 'Labor Booked',
    trend: '2 due today',
    trendUp: null,
    accent: 'border-l-harvest-gold',
    iconBg: 'bg-harvest-gold/10',
    iconColor: 'text-harvest-gold',
  },
  {
    icon: Tractor,
    value: '2',
    label: 'Machinery',
    trend: '1 returning',
    trendUp: null,
    accent: 'border-l-blue-500',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
  },
];

function QuickStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.label}
          custom={idx + 2}
          variants={cardVariant}
          initial="hidden"
          animate="visible"
          className={`bg-white rounded-2xl p-5 border border-border-light shadow-card border-l-4 ${stat.accent} hover:shadow-card-hover transition-shadow duration-200`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center`}>
              <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
            </div>
            {stat.trendUp !== null && (
              <span className={`flex items-center gap-0.5 text-xs font-medium ${stat.trendUp ? 'text-success-green' : 'text-error-red'}`}>
                {stat.trendUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {stat.trend}
              </span>
            )}
            {stat.trendUp === null && (
              <span className="text-text-muted text-xs font-medium">{stat.trend}</span>
            )}
          </div>
          <p className="font-poppins font-bold text-2xl text-text-primary">{stat.value}</p>
          <p className="text-text-secondary text-sm mt-0.5">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────── Module Grid ─────────────────────── */
const modules = [
  { icon: LayoutDashboard, title: 'Dashboard', desc: 'Daily overview & stats', route: '/dashboard', color: 'bg-krishiva-green/10 text-krishiva-green' },
  { icon: Newspaper, title: 'Smart Feed', desc: 'News, alerts & tips', route: '/dashboard/feed', color: 'bg-blue-500/10 text-blue-500' },
  { icon: Tractor, title: 'Farm OS', desc: 'Manage your fields', route: '/dashboard/farm', color: 'bg-krishiva-green/10 text-krishiva-green' },
  { icon: Users, title: 'Labor', desc: 'Find farm workers', route: '/dashboard/labor', color: 'bg-orange-500/10 text-orange-500' },
  { icon: Settings, title: 'Machinery', desc: 'Rent equipment', route: '/dashboard/machinery', color: 'bg-purple-500/10 text-purple-500' },
  { icon: Wheat, title: 'Drones', desc: 'Spray & survey', route: '/dashboard/drones', color: 'bg-cyan-500/10 text-cyan-500' },
  { icon: ShoppingCart, title: 'Produce', desc: 'Sell your crops', route: '/dashboard/produce', color: 'bg-green-500/10 text-green-500' },
  { icon: Sprout, title: 'Inputs', desc: 'Seeds & fertilizers', route: '/dashboard/inputs', color: 'bg-emerald-500/10 text-emerald-500' },
  { icon: Stethoscope, title: 'Crop Doctor', desc: 'AI health check', route: '/dashboard/crop-doctor', color: 'bg-red-500/10 text-red-500' },
  { icon: IndianRupee, title: 'Finance', desc: 'Loans & insurance', route: '/dashboard/finance', color: 'bg-harvest-gold/10 text-harvest-gold' },
  { icon: MessageSquare, title: 'Community', desc: 'Farmer network', route: '/dashboard/community', color: 'bg-pink-500/10 text-pink-500' },
  { icon: GraduationCap, title: 'Experts', desc: 'Book specialists', route: '/dashboard/experts', color: 'bg-indigo-500/10 text-indigo-500' },
  { icon: Wallet, title: 'Wallet', desc: 'Payments & escrow', route: '/dashboard/wallet', color: 'bg-teal-500/10 text-teal-500' },
];

function ModuleGrid() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-poppins font-semibold text-xl text-text-primary">Your Services</h2>
        <span className="text-krishiva-green text-sm font-medium cursor-pointer hover:underline">View All</span>
      </div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {modules.map((mod) => (
          <motion.div key={mod.title} variants={staggerChild}>
            <Link
              to={mod.route}
              className="group block bg-white rounded-2xl p-5 border border-border-light shadow-card hover:shadow-card-hover hover:border-border-green hover:-translate-y-[3px] active:scale-[0.97] transition-all duration-200"
            >
              <div className={`w-12 h-12 rounded-xl ${mod.color} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                <mod.icon className="w-6 h-6" />
              </div>
              <h3 className="font-poppins font-semibold text-base text-text-primary">{mod.title}</h3>
              <p className="text-text-secondary text-sm mt-0.5 line-clamp-1">{mod.desc}</p>
              <ChevronRight className="w-4 h-4 text-text-muted mt-3 group-hover:text-krishiva-green group-hover:translate-x-1 transition-all" />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────── Recent Activity ─────────────────────── */
const activities = [
  { icon: Users, color: 'bg-krishiva-green', text: 'Booked labor for weeding', sub: '2 workers — East Field', time: '2h ago' },
  { icon: ShoppingCart, color: 'bg-blue-500', text: 'Listed 50kg tomatoes', sub: 'Price: ₹2,400/quintal', time: '4h ago' },
  { icon: GraduationCap, color: 'bg-purple-500', text: 'Expert consultation completed', sub: 'Dr. Sharma — Crop advice', time: '6h ago' },
  { icon: Tractor, color: 'bg-harvest-gold', text: 'Tractor rental confirmed', sub: 'June 15 — Tilling', time: '1d ago' },
  { icon: IndianRupee, color: 'bg-leaf-green', text: 'Sold 100kg chili', sub: '₹12,800/quintal — Guntur', time: '1d ago' },
  { icon: Sprout, color: 'bg-cyan-500', text: 'Applied fertilizer to Field A', sub: 'Urea — 50kg', time: '2d ago' },
];

function RecentActivity() {
  return (
    <motion.div
      custom={15}
      variants={cardVariant}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-2xl border border-border-light shadow-card overflow-hidden"
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-border-light">
        <h3 className="font-poppins font-semibold text-lg text-text-primary">Recent Activity</h3>
        <span className="text-krishiva-green text-sm font-medium cursor-pointer hover:underline">View All</span>
      </div>
      <div className="divide-y divide-border-light">
        {activities.map((act, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + idx * 0.06, duration: 0.3 }}
            className="flex items-center gap-3 px-5 py-3.5 hover:bg-bg-primary/50 transition-colors"
          >
            <div className={`w-9 h-9 rounded-full ${act.color} flex items-center justify-center shrink-0`}>
              <act.icon className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">{act.text}</p>
              <p className="text-text-secondary text-xs mt-0.5">{act.sub}</p>
            </div>
            <span className="text-text-muted text-[11px] shrink-0">{act.time}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────────── Market Prices ─────────────────────── */
const marketPrices = [
  { crop: 'Cotton', price: '₹6,420', unit: '/q', change: '+2.3%', up: true },
  { crop: 'Chili', price: '₹12,800', unit: '/q', change: '+5.1%', up: true },
  { crop: 'Tomato', price: '₹2,400', unit: '/q', change: '-1.2%', up: false },
  { crop: 'Paddy', price: '₹2,040', unit: '/q', change: '+0.5%', up: true },
  { crop: 'Onion', price: '₹3,200', unit: '/q', change: '-3.4%', up: false },
];

function MarketPrices() {
  return (
    <motion.div
      custom={16}
      variants={cardVariant}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-2xl border border-border-light shadow-card overflow-hidden"
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-border-light">
        <div>
          <h3 className="font-poppins font-semibold text-lg text-text-primary">Market Prices</h3>
          <p className="text-text-secondary text-xs mt-0.5">Guntur APMC • Updated 30m ago</p>
        </div>
        <span className="text-krishiva-green text-sm font-medium cursor-pointer hover:underline">More</span>
      </div>
      <div className="divide-y divide-border-light">
        {marketPrices.map((mp, idx) => (
          <motion.div
            key={mp.crop}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + idx * 0.05, duration: 0.25 }}
            className="flex items-center justify-between px-5 py-3"
          >
            <div className="flex items-center gap-2">
              <Sprout className="w-4 h-4 text-krishiva-green" />
              <span className="text-sm font-medium text-text-primary">{mp.crop}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-text-primary">{mp.price}<span className="text-text-muted text-xs font-normal">{mp.unit}</span></span>
              <span className={`flex items-center gap-0.5 text-xs font-medium ${mp.up ? 'text-success-green' : 'text-error-red'}`}>
                {mp.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {mp.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────────── Market Ticker ─────────────────────── */
function MarketTicker() {
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tickerRef.current;
    if (!el) return;
    let animId: number;
    let pos = 0;
    const speed = 0.5;
    const animate = () => {
      pos -= speed;
      if (Math.abs(pos) >= el.scrollWidth / 2) pos = 0;
      el.style.transform = `translateX(${pos}px)`;
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  const tickerItems = [
    { crop: 'Cotton', price: '₹6,420/q', up: true },
    { crop: 'Chili', price: '₹12,800/q', up: true },
    { crop: 'Tomato', price: '₹2,400/q', up: false },
    { crop: 'Paddy', price: '₹2,040/q', up: true },
    { crop: 'Onion', price: '₹3,200/q', up: false },
    { crop: 'Wheat', price: '₹2,450/q', up: true },
    { crop: 'Rice', price: '₹3,200/q', up: false },
    { crop: 'Potato', price: '₹1,500/q', up: true },
  ];

  const doubled = [...tickerItems, ...tickerItems];

  return (
    <motion.div
      custom={17}
      variants={cardVariant}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-2xl border border-border-light shadow-card overflow-hidden py-3"
    >
      <div className="flex items-center gap-2 px-5 mb-2">
        <Zap className="w-4 h-4 text-harvest-gold" />
        <span className="font-poppins font-semibold text-sm text-text-primary">Live Mandi Rates</span>
      </div>
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10" />
        <div ref={tickerRef} className="flex items-center gap-8 whitespace-nowrap px-5">
          {doubled.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 shrink-0">
              <span className="text-sm font-medium text-text-primary">{item.crop}</span>
              <span className="text-sm font-semibold text-text-primary">{item.price}</span>
              {item.up ? <ArrowUpRight className="w-3.5 h-3.5 text-success-green" /> : <ArrowDownRight className="w-3.5 h-3.5 text-error-red" />}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────── Main Page ─────────────────────── */
export default function Dashboard() {
  return (
    <DashboardLayout>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Page Title */}
        <motion.div variants={staggerChild} className="mb-6">
          <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-text-primary">Daily Companion</h1>
          <p className="text-text-secondary text-sm mt-1">Wednesday, 12 June 2025</p>
        </motion.div>

        {/* Weather + Tasks Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1">
            <WeatherWidget />
          </div>
          <div className="lg:col-span-2">
            <TasksWidget />
          </div>
        </div>

        {/* Quick Stats */}
        <QuickStats />

        {/* Module Grid */}
        <ModuleGrid />

        {/* Activity + Market Prices */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3">
            <RecentActivity />
          </div>
          <div className="lg:col-span-2">
            <MarketPrices />
          </div>
        </div>

        {/* Market Ticker */}
        <MarketTicker />
      </motion.div>
    </DashboardLayout>
  );
}
