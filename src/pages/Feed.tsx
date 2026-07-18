import { useState } from 'react';
import {
  Cloud,
  CloudRain,
  TrendingUp,
  Lightbulb,
  Building2,
  Users,
  AlertTriangle,
  X,
  Clock,
  Bookmark,
  Share2,
  ThumbsUp,
  MessageCircle,
  CheckCircle,
  Sprout,
  IndianRupee,
  Newspaper,
  CloudSun,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';

/* ─────────────────────── Types ─────────────────────── */
type FeedCategory = 'All' | 'Weather' | 'Market' | 'Tips' | 'Schemes' | 'Community';

interface FeedItem {
  id: number;
  type: FeedCategory;
  title: string;
  description: string;
  timestamp: string;
  source?: string;
  image?: string;
  engagement?: { likes: number; comments: number };
  price?: string;
  change?: string;
  changeUp?: boolean;
  expert?: { name: string; role: string };
}

/* ─────────────────────── Animation Helpers ─────────────────────── */
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const feedCardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

/* ─────────────────────── Category Config ─────────────────────── */
const categories: { label: FeedCategory; icon: typeof Cloud }[] = [
  { label: 'All', icon: Newspaper },
  { label: 'Weather', icon: CloudSun },
  { label: 'Market', icon: TrendingUp },
  { label: 'Tips', icon: Lightbulb },
  { label: 'Schemes', icon: Building2 },
  { label: 'Community', icon: Users },
];

/* ─────────────────────── Border Color Map ─────────────────────── */
const borderColors: Record<string, string> = {
  Weather: 'border-l-[#3B82F6]',
  Market: 'border-l-krishiva-green',
  Tips: 'border-l-leaf-green',
  Schemes: 'border-l-[#8B5CF6]',
  Community: 'border-l-[#EC4899]',
};

/* ─────────────────────── Feed Data ─────────────────────── */
const feedItems: FeedItem[] = [
  {
    id: 1,
    type: 'Weather',
    title: 'Rain expected today evening',
    description: 'Avoid spraying pesticides. Light to moderate rainfall predicted between 4 PM and 7 PM. Ensure proper drainage in low-lying fields.',
    timestamp: '2 hours ago',
    source: 'IMD Guntur',
  },
  {
    id: 2,
    type: 'Market',
    title: 'Chili prices up 8% in Guntur market',
    description: 'Current price: ₹12,800/quintal. Demand surging from export markets. Good time to sell if quality is grade A or above.',
    timestamp: '3 hours ago',
    price: '₹12,800/q',
    change: '+8%',
    changeUp: true,
  },
  {
    id: 3,
    type: 'Tips',
    title: 'Best time to sow cotton: June-July',
    description: 'Soil temperature should be 25°C+. Choose certified seeds like Bunny Bt or RCH-2. Prepare seedbed 2 weeks before sowing for best germination.',
    timestamp: '4 hours ago',
    expert: { name: 'Dr. Priya Sharma', role: 'Agricultural Scientist' },
  },
  {
    id: 4,
    type: 'Schemes',
    title: 'PM-KISAN: 14th installment released',
    description: '₹2,000 credited to eligible farmers. Check your beneficiary status at pmkisan.gov.in or visit your nearest CSC center.',
    timestamp: '5 hours ago',
    source: 'Ministry of Agriculture',
  },
  {
    id: 5,
    type: 'Community',
    title: 'Ramesh from Nellore got 40% higher yield using drip irrigation',
    description: 'After switching to drip irrigation for his tomato crop, Ramesh saw water usage drop by 50% and yield increase by 40%. Read his full story and learn how he did it.',
    timestamp: '6 hours ago',
    engagement: { likes: 124, comments: 28 },
  },
  {
    id: 6,
    type: 'Market',
    title: 'Your tracked crop Cotton crossed ₹6,500',
    description: 'Cotton prices at Guntur APMC have reached ₹6,420/quintal. Consider selling 50% of your stock now and holding the rest.',
    timestamp: '8 hours ago',
    price: '₹6,420/q',
    change: '+2.3%',
    changeUp: true,
  },
  {
    id: 7,
    type: 'Weather',
    title: 'Weekend Forecast: Light rain expected',
    description: 'Moderate rainfall predicted for Saturday-Sunday. Good for kharif sowing. Avoid spraying operations during this period.',
    timestamp: '10 hours ago',
    source: 'IMD Hyderabad',
  },
  {
    id: 8,
    type: 'Tips',
    title: 'Apply urea just before light irrigation',
    description: 'Split application improves nitrogen absorption by 30%. Avoid application during peak sunlight hours (11 AM - 3 PM) to prevent volatilization.',
    timestamp: '12 hours ago',
    expert: { name: 'Dr. Anand Kumar', role: 'Soil Scientist' },
  },
  {
    id: 9,
    type: 'Schemes',
    title: 'Soil Health Card Scheme: Free testing camp',
    description: 'Free soil testing camp at your village on June 20. Bring soil samples from 3 different spots in your field. Results will include fertilizer recommendations.',
    timestamp: '1 day ago',
    source: 'State Agriculture Dept',
  },
  {
    id: 10,
    type: 'Community',
    title: 'Organic farming success story: Lakshmi from Vijayawada',
    description: 'Lakshmi switched to organic methods for her paddy crop and now gets a 25% premium from buyers. Her soil quality improved dramatically in just 2 seasons.',
    timestamp: '1 day ago',
    engagement: { likes: 89, comments: 15 },
  },
  {
    id: 11,
    type: 'Market',
    title: 'Tomato prices stable at ₹2,400/quintal',
    description: 'Supply-demand balanced this week. Expected to rise by 10% next week due to festival demand. Hold your stock if possible.',
    timestamp: '1 day ago',
    price: '₹2,400/q',
    change: '0%',
    changeUp: true,
  },
  {
    id: 12,
    type: 'Tips',
    title: 'Pest alert: Monitor for pink bollworm in cotton',
    description: 'Install pheromone traps (5/acre) to monitor pink bollworm population. If count exceeds 8 moths/trap, initiate spray with recommended bio-pesticides.',
    timestamp: '2 days ago',
    expert: { name: 'Dr. Meera Reddy', role: 'Entomologist' },
  },
];

/* ─────────────────────── Feed Card Component ─────────────────────── */
function FeedCard({ item }: { item: FeedItem }) {
  const borderColor = borderColors[item.type] || 'border-l-krishiva-green';

  const typeIcon = () => {
    switch (item.type) {
      case 'Weather': return <CloudRain className="w-5 h-5 text-[#3B82F6]" />;
      case 'Market': return <TrendingUp className="w-5 h-5 text-krishiva-green" />;
      case 'Tips': return <Lightbulb className="w-5 h-5 text-leaf-green" />;
      case 'Schemes': return <Building2 className="w-5 h-5 text-[#8B5CF6]" />;
      case 'Community': return <Users className="w-5 h-5 text-[#EC4899]" />;
      default: return <Newspaper className="w-5 h-5 text-krishiva-green" />;
    }
  };

  const typeBadgeColor = () => {
    switch (item.type) {
      case 'Weather': return 'bg-blue-500/10 text-blue-500';
      case 'Market': return 'bg-krishiva-green/10 text-krishiva-green';
      case 'Tips': return 'bg-leaf-green/10 text-leaf-green';
      case 'Schemes': return 'bg-purple-500/10 text-purple-500';
      case 'Community': return 'bg-pink-500/10 text-pink-500';
      default: return 'bg-krishiva-green/10 text-krishiva-green';
    }
  };

  return (
    <motion.div
      variants={feedCardVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      className={`bg-white rounded-2xl border border-border-light shadow-card border-l-4 ${borderColor} p-5 hover:shadow-card-hover transition-shadow duration-200`}
    >
      {/* Header Row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-bg-primary flex items-center justify-center shrink-0">
            {typeIcon()}
          </div>
          <div>
            <h3 className="font-poppins font-semibold text-[15px] text-text-primary leading-snug">{item.title}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${typeBadgeColor()}`}>
                {item.type}
              </span>
              <div className="flex items-center gap-1 text-text-muted">
                <Clock className="w-3 h-3" />
                <span className="text-[11px]">{item.timestamp}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-text-secondary text-sm leading-relaxed mt-3">{item.description}</p>

      {/* Price info for market cards */}
      {item.price && (
        <div className="flex items-center gap-3 mt-3 p-3 bg-bg-primary rounded-xl">
          <IndianRupee className="w-5 h-5 text-krishiva-green" />
          <div>
            <span className="font-poppins font-bold text-lg text-text-primary">{item.price}</span>
            {item.change && (
              <span className={`ml-2 text-sm font-medium ${item.changeUp ? 'text-success-green' : 'text-error-red'}`}>
                {item.changeUp ? '↑' : '↓'} {item.change}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Expert info for tip cards */}
      {item.expert && (
        <div className="flex items-center gap-2.5 mt-3 pt-3 border-t border-border-light">
          <div className="w-8 h-8 rounded-full bg-krishiva-green/10 flex items-center justify-center">
            <Sprout className="w-4 h-4 text-krishiva-green" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">{item.expert.name}</p>
            <p className="text-text-muted text-xs">{item.expert.role}</p>
          </div>
        </div>
      )}

      {/* Source for scheme cards */}
      {item.source && (
        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-border-light">
          <CheckCircle className="w-3.5 h-3.5 text-krishiva-green" />
          <span className="text-text-muted text-xs">{item.source}</span>
        </div>
      )}

      {/* Engagement for community cards */}
      {item.engagement && (
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border-light">
          <button
            onClick={() => {
              const toast = document.createElement('div');
              toast.className = 'fixed top-4 left-1/2 -translate-x-1/2 bg-krishiva-green text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm font-medium';
              toast.textContent = 'Liked!';
              document.body.appendChild(toast);
              setTimeout(() => toast.remove(), 2000);
            }}
            className="flex items-center gap-1.5 text-text-muted hover:text-krishiva-green transition-colors"
          >
            <ThumbsUp className="w-4 h-4" />
            <span className="text-xs font-medium">{item.engagement.likes}</span>
          </button>
          <button
            onClick={() => {
              const toast = document.createElement('div');
              toast.className = 'fixed top-4 left-1/2 -translate-x-1/2 bg-krishiva-green text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm font-medium';
              toast.textContent = 'Comments coming soon!';
              document.body.appendChild(toast);
              setTimeout(() => toast.remove(), 2000);
            }}
            className="flex items-center gap-1.5 text-text-muted hover:text-blue-500 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-xs font-medium">{item.engagement.comments}</span>
          </button>
          <button
            onClick={() => {
              const toast = document.createElement('div');
              toast.className = 'fixed top-4 left-1/2 -translate-x-1/2 bg-krishiva-green text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm font-medium';
              toast.textContent = 'Sharing coming soon!';
              document.body.appendChild(toast);
              setTimeout(() => toast.remove(), 2000);
            }}
            className="flex items-center gap-1.5 text-text-muted hover:text-text-primary transition-colors ml-auto"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-xs font-medium">Share</span>
          </button>
          <button className="text-text-muted hover:text-harvest-gold transition-colors">
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      )}
    </motion.div>
  );
}

/* ─────────────────────── Featured Alert Banner ─────────────────────── */
function FeaturedAlert({ onDismiss }: { onDismiss: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, height: 0 }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
      className="bg-gradient-to-r from-warning-amber/10 to-warning-amber/5 border border-warning-amber rounded-2xl p-5 relative"
    >
      <button
        onClick={onDismiss}
        className="absolute top-3 right-3 p-1 rounded-lg hover:bg-warning-amber/10 transition-colors"
      >
        <X className="w-4 h-4 text-text-muted" />
      </button>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-warning-amber/15 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-5 h-5 text-warning-amber" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-warning-amber text-white uppercase tracking-wide">
              Urgent
            </span>
            <h3 className="font-poppins font-semibold text-base text-text-primary">
              Heavy rainfall expected in Andhra Pradesh
            </h3>
          </div>
          <p className="text-text-secondary text-sm leading-relaxed mt-1">
            Heavy rainfall expected over the next 3 days starting Thursday. Protect standing crops with proper drainage.
            Avoid sowing new seeds until weather clears. IMD has issued orange alert for Guntur district.
          </p>
          <div className="flex items-center gap-3 mt-3">
            <button
              onClick={() => {
                const toast = document.createElement('div');
                toast.className = 'fixed top-4 left-1/2 -translate-x-1/2 bg-krishiva-green text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm font-medium';
                toast.textContent = 'Weather details coming soon!';
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 2000);
              }}
              className="bg-krishiva-green hover:bg-[#1B5E20] text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
            >
              View Details
            </button>
            <button
              onClick={() => {
                const toast = document.createElement('div');
                toast.className = 'fixed top-4 left-1/2 -translate-x-1/2 bg-krishiva-green text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm font-medium';
                toast.textContent = 'Shared with community!';
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 2000);
              }}
              className="text-krishiva-green text-sm font-medium hover:underline"
            >
              Share with Community
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────── Filter Pills ─────────────────────── */
function FilterPills({ active, onChange }: { active: FeedCategory; onChange: (c: FeedCategory) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-hide"
    >
      {categories.map((cat, idx) => {
        const isActive = active === cat.label;
        return (
          <motion.button
            key={cat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05, duration: 0.2 }}
            onClick={() => onChange(cat.label)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-150 shrink-0 ${
              isActive
                ? 'bg-krishiva-green text-white border border-krishiva-green shadow-button'
                : 'bg-bg-primary text-text-secondary border border-border-light hover:border-krishiva-green/30 hover:text-text-primary'
            }`}
          >
            <cat.icon className="w-3.5 h-3.5" />
            {cat.label}
          </motion.button>
        );
      })}
    </motion.div>
  );
}

/* ─────────────────────── Main Feed Page ─────────────────────── */
export default function Feed() {
  const [activeCategory, setActiveCategory] = useState<FeedCategory>('All');
  const [alertVisible, setAlertVisible] = useState(true);

  const filteredItems = activeCategory === 'All'
    ? feedItems
    : feedItems.filter((item) => item.type === activeCategory);

  return (
    <DashboardLayout>
      <div className="space-y-5">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-text-primary">Smart Feed</h1>
          <p className="text-text-secondary text-sm mt-1">Stay updated with what matters for your farm</p>
        </motion.div>

        {/* Category Filters */}
        <FilterPills active={activeCategory} onChange={setActiveCategory} />

        {/* Featured Alert */}
        <AnimatePresence>
          {alertVisible && <FeaturedAlert onDismiss={() => setAlertVisible(false)} />}
        </AnimatePresence>

        {/* Feed Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-4"
          >
            {filteredItems.map((item) => (
              <FeedCard key={item.id} item={item} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Load More Indicator */}
        {filteredItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center py-6"
          >
            <div className="flex items-center gap-2 text-text-muted">
              <div className="w-2 h-2 rounded-full bg-krishiva-green animate-pulse" />
              <span className="text-sm">Showing {filteredItems.length} updates</span>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <Newspaper className="w-16 h-16 text-text-muted mb-4" />
            <h3 className="font-poppins font-semibold text-lg text-text-primary mb-2">
              No updates in this category
            </h3>
            <p className="text-text-secondary text-sm text-center max-w-sm">
              Check back later or try another category to see more updates.
            </p>
            <button
              onClick={() => setActiveCategory('All')}
              className="mt-4 bg-krishiva-green hover:bg-[#1B5E20] text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
            >
              Show All Updates
            </button>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
