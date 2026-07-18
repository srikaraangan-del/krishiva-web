import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Newspaper,
  Users,
  Trophy,
  Calendar,
  Crown,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  ImageIcon,
  Mic,
  MapPin,
  Tag,
  ChevronRight,
  Clock,
  Award,
  Medal,
  Star,
  Leaf,
  Sprout,
  Flame,
  Droplets,
  Sun,
  Wheat,
  Tractor,
  UserPlus,
  Check,
  TrendingUp,
  Zap,
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

/* ───────── Points System Constants ───────── */
const POINTS_LIKE = 5;
const POINTS_COMMENT = 10;
const POINTS_SHARE = 15;
const POINTS_NEW_POST = 20;
const POINTS_DAILY_LOGIN = 2;

/* ───────── Toast Helper ───────── */
const showToast = (message: string) => {
  const toast = document.createElement('div');
  toast.className = 'fixed top-4 left-1/2 -translate-x-1/2 bg-krishiva-green text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm font-medium';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
};

/* ───────── mock data ───────── */

const feedPosts = [
  {
    id: 1,
    author: 'Rajesh Kumar',
    avatar: 'RK',
    avatarColor: 'bg-krishiva-green',
    badge: 'Top Contributor',
    time: '2 hours ago',
    location: 'Punjab',
    content: 'Just harvested 200kg of tomatoes! Great season this year. The new drip irrigation system really made a difference. Happy to share tips with anyone interested.',
    likes: 45,
    comments: 12,
    shares: 3,
    liked: false,
    hasImage: true,
    tags: ['#Tomato', '#Harvest', '#Irrigation'],
  },
  {
    id: 2,
    author: 'Anita Devi',
    avatar: 'AD',
    avatarColor: 'bg-[#EC4899]',
    badge: null,
    time: '4 hours ago',
    location: 'Maharashtra',
    content: 'Started organic farming on my 3-acre plot this year. First batch of organic spinach sold at ₹40/kg — double the market rate! Farmers, organic is the way forward.',
    likes: 78,
    comments: 24,
    shares: 8,
    liked: true,
    hasImage: false,
    tags: ['#OrganicFarming', '#Vegetables', '#Market'],
  },
  {
    id: 3,
    author: 'Suresh Patel',
    avatar: 'SP',
    avatarColor: 'bg-[#8B5CF6]',
    badge: null,
    time: '6 hours ago',
    location: 'Gujarat',
    content: 'My cotton crop is showing signs of leaf curl virus. Has anyone dealt with this before? Would appreciate any advice on treatment. Attached photos of the affected leaves.',
    likes: 23,
    comments: 18,
    shares: 1,
    liked: false,
    hasImage: true,
    tags: ['#Cotton', '#Disease', '#Help'],
  },
  {
    id: 4,
    author: 'Lakshmi Reddy',
    avatar: 'LR',
    avatarColor: 'bg-[#F59E0B]',
    badge: 'Krishiva Expert',
    time: '8 hours ago',
    location: 'Telangana',
    content: 'Sharing my experience with precision farming. Using soil sensors reduced my water usage by 40% while increasing yield by 15%. The ROI was visible in the first season itself.',
    likes: 112,
    comments: 31,
    shares: 15,
    liked: false,
    hasImage: false,
    tags: ['#PrecisionFarming', '#Technology', '#WaterSaving'],
  },
  {
    id: 5,
    author: 'Mohammed Ali',
    avatar: 'MA',
    avatarColor: 'bg-[#14B8A6]',
    badge: null,
    time: '12 hours ago',
    location: 'Kerala',
    content: 'Beautiful morning at the paddy fields. The new rice variety KR-47 is showing excellent germination rates. Will update on yield in 3 months.',
    likes: 56,
    comments: 8,
    shares: 2,
    liked: false,
    hasImage: true,
    tags: ['#Rice', '#Paddy', '#Morning'],
  },
  {
    id: 6,
    author: 'Priya Sharma',
    avatar: 'PS',
    avatarColor: 'bg-[#6366F1]',
    badge: null,
    time: '1 day ago',
    location: 'Madhya Pradesh',
    content: 'Attended the Kisan Mela today. Learned so much about new government schemes for women farmers. 50% subsidy on farm equipment! Sharing the details below.',
    likes: 89,
    comments: 42,
    shares: 27,
    liked: true,
    hasImage: false,
    tags: ['#GovtSchemes', '#WomenFarmers', '#Subsidy'],
  },
];

const groups = [
  { id: 1, name: 'Cotton Farmers AP', members: 1240, icon: Sprout, iconColor: 'text-krishiva-green', bgColor: 'bg-krishiva-green/10', joined: true, description: 'Support group for cotton farmers in Andhra Pradesh' },
  { id: 2, name: 'Organic Farming', members: 856, icon: Leaf, iconColor: 'text-leaf-green', bgColor: 'bg-leaf-green/10', joined: false, description: 'Learn and share organic farming practices' },
  { id: 3, name: 'Chili Growers', members: 2100, icon: Flame, iconColor: 'text-[#EF4444]', bgColor: 'bg-[#EF4444]/10', joined: true, description: 'Network of chili farmers across India' },
  { id: 4, name: 'Women in Agriculture', members: 678, icon: Star, iconColor: 'text-[#EC4899]', bgColor: 'bg-[#EC4899]/10', joined: false, description: 'Empowering women in farming' },
  { id: 5, name: 'Irrigation Innovators', members: 945, icon: Droplets, iconColor: 'text-[#3B82F6]', bgColor: 'bg-[#3B82F6]/10', joined: false, description: 'Modern irrigation techniques and water management' },
  { id: 6, name: 'Solar Farming', members: 534, icon: Sun, iconColor: 'text-[#F59E0B]', bgColor: 'bg-[#F59E0B]/10', joined: true, description: 'Solar-powered farming solutions' },
  { id: 7, name: 'Wheat Growers India', members: 1870, icon: Wheat, iconColor: 'text-[#8D6E63]', bgColor: 'bg-[#8D6E63]/10', joined: false, description: 'Community for wheat farmers nationwide' },
  { id: 8, name: 'Tractor Enthusiasts', members: 723, icon: Tractor, iconColor: 'text-[#6366F1]', bgColor: 'bg-[#6366F1]/10', joined: false, description: 'Discuss machinery, maintenance, and new technology' },
];

const stories = [
  {
    id: 1,
    title: 'From 2 acres to 10 acres: Ramesh\'s journey',
    author: 'Ramesh Yadav',
    location: 'Uttar Pradesh',
    excerpt: 'Five years ago, I was struggling to make ends meet on my 2-acre family farm. Today, I manage 10 acres of thriving organic produce. Here\'s how I did it...',
    readTime: '5 min read',
    likes: 2341,
    metrics: [
      { label: 'Land', value: '5x Growth' },
      { label: 'Income', value: '+300%' },
      { label: 'Yield', value: '+120%' },
    ],
  },
  {
    id: 2,
    title: 'How I doubled my chili yield with drip irrigation',
    author: 'Savitri Devi',
    location: 'Karnataka',
    excerpt: 'Switching from flood irrigation to drip irrigation transformed my chili farm. Water usage dropped by 60% while yield doubled in just one season...',
    readTime: '4 min read',
    likes: 1876,
    metrics: [
      { label: 'Water Saved', value: '60%' },
      { label: 'Yield', value: '2x' },
      { label: 'Profit', value: '+180%' },
    ],
  },
  {
    id: 3,
    title: 'A young graduate returns to farming',
    author: 'Arjun Mehta',
    location: 'Rajasthan',
    excerpt: 'After my MBA, everyone expected me to take a corporate job. I chose to return to my roots and apply modern business strategies to our family farm...',
    readTime: '6 min read',
    likes: 3421,
    metrics: [
      { label: 'Revenue', value: '+250%' },
      { label: 'Employment', value: '15 jobs' },
      { label: 'Export', value: '3 countries' },
    ],
  },
];

const events = [
  {
    id: 1,
    name: 'Kisan Mela 2025',
    location: 'Hyderabad',
    date: { month: 'JUL', day: '15' },
    type: 'Exhibition',
    time: '9:00 AM — 5:00 PM',
    venue: 'Hitex Exhibition Centre',
    attendees: 1200,
    registered: false,
  },
  {
    id: 2,
    name: 'Organic Farming Workshop',
    location: 'Online',
    date: { month: 'JUN', day: '25' },
    type: 'Webinar',
    time: '2:00 PM — 4:00 PM',
    venue: 'Zoom Meeting',
    attendees: 500,
    registered: true,
  },
  {
    id: 3,
    name: 'Soil Health Camp',
    location: 'Nagpur',
    date: { month: 'JUN', day: '28' },
    type: 'Field Day',
    time: '10:00 AM — 1:00 PM',
    venue: 'Krishi Vigyan Kendra',
    attendees: 200,
    registered: false,
  },
  {
    id: 4,
    name: 'Modern Machinery Demo',
    location: 'Ludhiana',
    date: { month: 'JUL', day: '05' },
    type: 'Workshop',
    time: '8:00 AM — 12:00 PM',
    venue: 'PAU Campus',
    attendees: 350,
    registered: false,
  },
];

const leaders = [
  { id: 1, name: 'Rajesh Kumar', points: 2450, contributions: 234, avatar: 'RK', color: 'bg-krishiva-green', badge: 'Gold' },
  { id: 2, name: 'Anita Devi', points: 2180, contributions: 198, avatar: 'AD', color: 'bg-[#EC4899]', badge: 'Silver' },
  { id: 3, name: 'Suresh Patel', points: 1920, contributions: 176, avatar: 'SP', color: 'bg-[#8B5CF6]', badge: 'Bronze' },
  { id: 4, name: 'Lakshmi Reddy', points: 1680, contributions: 154, avatar: 'LR', color: 'bg-[#F59E0B]', badge: null },
  { id: 5, name: 'Mohammed Ali', points: 1450, contributions: 132, avatar: 'MA', color: 'bg-[#14B8A6]', badge: null },
  { id: 6, name: 'Priya Sharma', points: 1320, contributions: 121, avatar: 'PS', color: 'bg-[#6366F1]', badge: null },
  { id: 7, name: 'Ramesh Yadav', points: 1190, contributions: 108, avatar: 'RY', color: 'bg-soil-brown', badge: null },
  { id: 8, name: 'Savitri Devi', points: 980, contributions: 89, avatar: 'SV', color: 'bg-[#EF4444]', badge: null },
  { id: 9, name: 'Arjun Mehta', points: 870, contributions: 76, avatar: 'AM', color: 'bg-[#3B82F6]', badge: null },
  { id: 10, name: 'Kavita Nair', points: 720, contributions: 65, avatar: 'KN', color: 'bg-[#8D6E63]', badge: null },
];

/* ───────── animation helpers ───────── */

const easeOut = [0, 0, 0.2, 1] as [number, number, number, number];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: easeOut } },
};

/* ───────── component ───────── */

export default function Community() {
  const [activeTab, setActiveTab] = useState('feed');
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({ 2: true, 6: true });
  const [joinedGroups, setJoinedGroups] = useState<Record<number, boolean>>({ 1: true, 3: true, 6: true });
  const [registeredEvents, setRegisteredEvents] = useState<Record<number, boolean>>({ 2: true });
  const [postText, setPostText] = useState('');
  const [expandedComposer, setExpandedComposer] = useState(false);

  /* ── Points System State ── */
  const [userPoints, setUserPoints] = useState(245);
  const [shareCounts, setShareCounts] = useState<Record<number, number>>({});
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [activeCommentPostId, setActiveCommentPostId] = useState<number | null>(null);
  const [commentText, setCommentText] = useState('');
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const posts = feedPosts;

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) => {
      const wasLiked = prev[postId];
      if (!wasLiked) {
        setUserPoints((p) => p + POINTS_LIKE);
        showToast(`+${POINTS_LIKE} points! Post liked`);
      }
      return { ...prev, [postId]: !prev[postId] };
    });
  };

  const handleShare = (postId: number) => {
    setShareCounts((prev) => {
      const current = prev[postId] || 0;
      setUserPoints((p) => p + POINTS_SHARE);
      showToast(`+${POINTS_SHARE} points! Post shared`);
      return { ...prev, [postId]: current + 1 };
    });
  };

  const openCommentModal = (postId: number) => {
    setActiveCommentPostId(postId);
    setCommentText('');
    setCommentModalOpen(true);
  };

  const submitComment = () => {
    if (activeCommentPostId && commentText.trim()) {
      setUserPoints((p) => p + POINTS_COMMENT);
      showToast(`+${POINTS_COMMENT} points! Comment added`);
    }
    setCommentModalOpen(false);
    setCommentText('');
    setActiveCommentPostId(null);
  };

  const handleCreatePost = () => {
    if (postText.trim()) {
      setUserPoints((p) => p + POINTS_NEW_POST);
      showToast(`+${POINTS_NEW_POST} points! New post created`);
      setPostText('');
      setExpandedComposer(false);
    }
  };

  const toggleGroup = (groupId: number) => {
    setJoinedGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const toggleEvent = (eventId: number) => {
    setRegisteredEvents((prev) => ({ ...prev, [eventId]: !prev[eventId] }));
  };

  const getRankIcon = (rank: number, badge: string | null) => {
    if (rank === 1 || badge === 'Gold') return <Crown className="w-5 h-5 text-[#F59E0B]" />;
    if (rank === 2 || badge === 'Silver') return <Medal className="w-5 h-5 text-[#9CA3AF]" />;
    if (rank === 3 || badge === 'Bronze') return <Award className="w-5 h-5 text-[#8D6E63]" />;
    return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-text-muted font-inter">{rank}</span>;
  };

  const topThree = leaders.slice(0, 3);

  return (
    <DashboardLayout>
      <div className="space-y-5">
        {/* ─── Hero Banner ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-krishiva-green via-leaf-green to-border-green"
        >
          <div className="absolute inset-0 bg-[url('/community-hero.jpg')] bg-cover bg-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-krishiva-green/90 to-leaf-green/70" />
          <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-white/90" />
                  <span className="text-white/80 text-sm font-medium font-inter">50,000+ Members Strong</span>
                </div>
                <h1 className="font-poppins font-bold text-[32px] text-white leading-tight mb-2">
                  Farmer Community
                </h1>
                <p className="text-white/85 text-base font-inter max-w-lg">
                  Connect, share, and grow together. No farmer should feel alone in their journey.
                </p>
                <div className="flex flex-wrap items-center gap-6 mt-6">
                  {[
                    { label: '50,000+', sub: 'Members' },
                    { label: '1,200+', sub: 'Daily Posts' },
                    { label: '98%', sub: 'Helpful Responses' },
                  ].map((stat) => (
                    <div key={stat.sub} className="text-center">
                      <p className="font-poppins font-bold text-xl text-white font-inter">{stat.label}</p>
                      <p className="text-white/70 text-xs font-inter">{stat.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* User Points Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="hidden sm:flex flex-col items-center bg-white/20 backdrop-blur-sm rounded-2xl px-5 py-4 border border-white/30"
              >
                <Zap className="w-6 h-6 text-harvest-gold mb-1" />
                <p className="text-white font-poppins font-bold text-2xl font-inter">{userPoints}</p>
                <p className="text-white/80 text-xs font-inter">Your Points</p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ─── Mobile User Points ─── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="sm:hidden flex items-center justify-between bg-white rounded-2xl p-4 border border-border-light shadow-card"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-harvest-gold/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-harvest-gold" />
            </div>
            <div>
              <p className="font-poppins font-bold text-lg text-text-primary font-inter">{userPoints}</p>
              <p className="text-text-muted text-xs font-inter">Your Points</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-success-green text-sm font-medium font-inter">
            <TrendingUp className="w-4 h-4" /> +{POINTS_LIKE} per like
          </div>
        </motion.div>

        {/* ─── Tabs ─── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: easeOut }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full bg-white border border-border-light rounded-xl p-1 h-auto flex flex-wrap">
              {[
                { value: 'feed', icon: Newspaper, label: 'Feed' },
                { value: 'groups', icon: Users, label: 'Groups' },
                { value: 'stories', icon: Trophy, label: 'Stories' },
                { value: 'events', icon: Calendar, label: 'Events' },
                { value: 'leaders', icon: Crown, label: 'Leaders' },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-inter data-[state=active]:bg-krishiva-green data-[state=active]:text-white transition-all min-w-[80px]"
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* ─── Feed Tab ─── */}
        <AnimatePresence mode="wait">
          {activeTab === 'feed' && (
            <motion.div
              key="feed"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: easeOut }}
              className="space-y-4"
            >
              {/* Leaderboard Preview */}
              <Card className="rounded-2xl border-border-light p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-harvest-gold" />
                    <h3 className="font-poppins font-semibold text-base text-text-primary">Top Contributors</h3>
                  </div>
                  <button
                    onClick={() => setLeaderboardOpen(true)}
                    className="text-krishiva-green text-sm font-medium hover:underline flex items-center gap-1 font-inter"
                  >
                    View Full Leaderboard <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-end justify-center gap-4 pb-2">
                  {/* 2nd Place */}
                  {topThree[1] && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex flex-col items-center pb-2"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#9CA3AF]/20 flex items-center justify-center mb-1.5 border-2 border-[#9CA3AF]">
                        <span className="text-[#9CA3AF] font-bold text-sm">{topThree[1].avatar}</span>
                      </div>
                      <Medal className="w-4 h-4 text-[#9CA3AF] mb-0.5" />
                      <p className="text-text-primary text-xs font-medium font-inter">{topThree[1].name}</p>
                      <p className="text-text-muted text-[10px] font-inter">{topThree[1].points.toLocaleString()} pts</p>
                    </motion.div>
                  )}
                  {/* 1st Place */}
                  {topThree[0] && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0 }}
                      className="flex flex-col items-center -mt-3"
                    >
                      <div className="w-16 h-16 rounded-full bg-[#F59E0B]/20 flex items-center justify-center mb-1.5 border-3 border-[#F59E0B]">
                        <span className="text-[#F59E0B] font-bold text-lg">{topThree[0].avatar}</span>
                      </div>
                      <Crown className="w-5 h-5 text-[#F59E0B] mb-0.5" />
                      <p className="text-text-primary text-sm font-bold font-inter">{topThree[0].name}</p>
                      <p className="text-harvest-gold text-xs font-bold font-inter">{topThree[0].points.toLocaleString()} pts</p>
                    </motion.div>
                  )}
                  {/* 3rd Place */}
                  {topThree[2] && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex flex-col items-center pb-2"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#8D6E63]/20 flex items-center justify-center mb-1.5 border-2 border-[#8D6E63]">
                        <span className="text-[#8D6E63] font-bold text-sm">{topThree[2].avatar}</span>
                      </div>
                      <Award className="w-4 h-4 text-[#8D6E63] mb-0.5" />
                      <p className="text-text-primary text-xs font-medium font-inter">{topThree[2].name}</p>
                      <p className="text-text-muted text-[10px] font-inter">{topThree[2].points.toLocaleString()} pts</p>
                    </motion.div>
                  )}
                </div>
                {/* Points Info */}
                <div className="mt-3 pt-3 border-t border-border-light flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-text-muted font-inter">
                  <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-error-red" /> Like +{POINTS_LIKE}pts</span>
                  <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3 text-blue-500" /> Comment +{POINTS_COMMENT}pts</span>
                  <span className="flex items-center gap-1"><Share2 className="w-3 h-3 text-krishiva-green" /> Share +{POINTS_SHARE}pts</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 text-harvest-gold" /> Post +{POINTS_NEW_POST}pts</span>
                </div>
              </Card>

              {/* Create Post */}
              <Card className="rounded-2xl border-border-light p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10 shrink-0">
                    <AvatarFallback className="bg-krishiva-green text-white text-sm font-bold">RP</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <AnimatePresence>
                      {expandedComposer ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <textarea
                            value={postText}
                            onChange={(e) => setPostText(e.target.value)}
                            placeholder="Share your farming experience, ask a question, or post an update..."
                            className="w-full p-3 rounded-xl border border-border-light bg-bg-primary text-sm text-text-primary placeholder:text-text-muted resize-none focus:outline-none focus:border-krishiva-green font-inter"
                            rows={4}
                            autoFocus
                          />
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <button className="p-2 rounded-lg hover:bg-bg-primary text-text-muted hover:text-krishiva-green transition-colors">
                                <ImageIcon className="w-5 h-5" />
                              </button>
                              <button className="p-2 rounded-lg hover:bg-bg-primary text-text-muted hover:text-krishiva-green transition-colors">
                                <Mic className="w-5 h-5" />
                              </button>
                              <button className="p-2 rounded-lg hover:bg-bg-primary text-text-muted hover:text-krishiva-green transition-colors">
                                <MapPin className="w-5 h-5" />
                              </button>
                              <button className="p-2 rounded-lg hover:bg-bg-primary text-text-muted hover:text-krishiva-green transition-colors">
                                <Tag className="w-5 h-5" />
                              </button>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setExpandedComposer(false)}
                                className="text-text-secondary font-inter"
                              >
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                onClick={handleCreatePost}
                                className="bg-krishiva-green hover:bg-[#1B5E20] text-white rounded-lg font-inter"
                              >
                                Post (+{POINTS_NEW_POST}pts)
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          onClick={() => setExpandedComposer(true)}
                          className="w-full text-left px-4 py-2.5 rounded-xl bg-bg-primary text-text-muted text-sm font-inter hover:bg-krishiva-green/5 transition-colors border border-transparent hover:border-border-green"
                        >
                          Share an update with your community...
                        </motion.button>
                      )}
                    </AnimatePresence>
                    {!expandedComposer && (
                      <div className="flex items-center gap-4 mt-3">
                        <button className="flex items-center gap-1.5 text-xs text-text-muted hover:text-krishiva-green transition-colors font-inter">
                          <ImageIcon className="w-4 h-4" /> Photo
                        </button>
                        <button className="flex items-center gap-1.5 text-xs text-text-muted hover:text-krishiva-green transition-colors font-inter">
                          <Mic className="w-4 h-4" /> Voice
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              {/* Feed Posts */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-4"
              >
                {posts.map((post) => (
                  <motion.div key={post.id} variants={cardVariants}>
                    <Card className="rounded-2xl border-border-light p-5 hover:shadow-card-hover transition-all">
                      {/* Post Header */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-11 h-11 rounded-full ${post.avatarColor} flex items-center justify-center shrink-0`}>
                          <span className="text-white font-bold text-sm">{post.avatar}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-poppins font-semibold text-sm text-text-primary">{post.author}</h4>
                            {post.badge && (
                              <Badge className="bg-harvest-gold/10 text-harvest-gold text-[10px] border-harvest-gold/20">
                                <Award className="w-3 h-3 mr-0.5" /> {post.badge}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-text-muted font-inter">
                            <span>{post.time}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {post.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Post Content */}
                      <p className="text-text-secondary text-sm leading-relaxed mb-3 font-inter">
                        {post.content}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.tags.map((tag) => (
                          <span key={tag} className="text-xs text-krishiva-green bg-krishiva-green/5 px-2 py-1 rounded-lg font-medium font-inter">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Image Placeholder */}
                      {post.hasImage && (
                        <div className="aspect-[16/9] rounded-xl bg-krishiva-green/5 border border-border-light flex items-center justify-center mb-3">
                          <div className="text-center">
                            <ImageIcon className="w-8 h-8 text-krishiva-green/30 mx-auto mb-1" />
                            <span className="text-text-muted text-xs font-inter">Photo attachment</span>
                          </div>
                        </div>
                      )}

                      {/* Engagement Bar */}
                      <div className="flex items-center justify-between pt-3 border-t border-border-light">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className={`flex items-center gap-1.5 text-sm transition-colors font-inter ${
                            likedPosts[post.id] ? 'text-error-red' : 'text-text-muted hover:text-error-red'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${likedPosts[post.id] ? 'fill-error-red' : ''}`} />
                          <span>{post.likes + (likedPosts[post.id] ? 1 : 0)}</span>
                        </button>
                        <button
                          onClick={() => openCommentModal(post.id)}
                          className="flex items-center gap-1.5 text-sm text-text-muted hover:text-krishiva-green transition-colors font-inter"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </button>
                        <button
                          onClick={() => handleShare(post.id)}
                          className="flex items-center gap-1.5 text-sm text-text-muted hover:text-krishiva-green transition-colors font-inter"
                        >
                          <Share2 className="w-4 h-4" />
                          <span>{post.shares + (shareCounts[post.id] || 0)}</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-sm text-text-muted hover:text-krishiva-green transition-colors font-inter">
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* ─── Groups Tab ─── */}
          {activeTab === 'groups' && (
            <motion.div
              key="groups"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: easeOut }}
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {groups.map((group) => (
                  <motion.div key={group.id} variants={cardVariants}>
                    <Card className="rounded-2xl border-border-light overflow-hidden hover:shadow-card-hover transition-all">
                      <div className={`h-[100px] ${group.bgColor} flex items-center justify-center`}>
                        <group.icon className={`w-12 h-12 ${group.iconColor} opacity-40`} />
                      </div>
                      <div className="px-5 pb-5 -mt-6 relative">
                        <div className={`w-12 h-12 rounded-xl ${group.bgColor} border-3 border-white flex items-center justify-center mb-3`}>
                          <group.icon className={`w-6 h-6 ${group.iconColor}`} />
                        </div>
                        <h3 className="font-poppins font-semibold text-base text-text-primary mb-1">{group.name}</h3>
                        <p className="text-text-muted text-xs font-inter mb-1">{group.members.toLocaleString()} members</p>
                        <p className="text-text-secondary text-sm font-inter mb-4 line-clamp-2">{group.description}</p>
                        <Button
                          onClick={() => toggleGroup(group.id)}
                          variant={joinedGroups[group.id] ? 'outline' : 'default'}
                          className={`w-full rounded-xl font-inter ${
                            joinedGroups[group.id]
                              ? 'border-success-green text-success-green hover:bg-success-green/5'
                              : 'bg-krishiva-green hover:bg-[#1B5E20] text-white shadow-button'
                          }`}
                        >
                          {joinedGroups[group.id] ? (
                            <><Check className="w-4 h-4 mr-1.5" /> Joined</>
                          ) : (
                            <><UserPlus className="w-4 h-4 mr-1.5" /> Join Group</>
                          )}
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* ─── Stories Tab ─── */}
          {activeTab === 'stories' && (
            <motion.div
              key="stories"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: easeOut }}
              className="space-y-5"
            >
              {/* Featured Story */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: easeOut }}
              >
                <Card className="rounded-2xl border-border-light overflow-hidden">
                  <div className="aspect-[21/9] bg-gradient-to-br from-krishiva-green/20 to-harvest-gold/20 flex items-center justify-center">
                    <div className="text-center">
                      <Trophy className="w-12 h-12 text-krishiva-green/40 mx-auto mb-2" />
                      <span className="text-text-muted text-sm font-inter">Featured Success Story</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <Badge className="bg-harvest-gold/10 text-harvest-gold border-harvest-gold/20 mb-3">
                      <Star className="w-3 h-3 mr-1" /> Most Inspiring
                    </Badge>
                    <h3 className="font-poppins font-bold text-xl sm:text-2xl text-text-primary mb-2">
                      Farmer of the Year 2025: Breaking Barriers
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4 font-inter">
                      From debt to prosperity — how a group of 50 farmers in Madhya Pradesh transformed their
                      fortunes through collective farming and technology adoption.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-krishiva-green flex items-center justify-center">
                          <span className="text-white text-xs font-bold">FG</span>
                        </div>
                        <span className="text-sm text-text-secondary font-inter">Farmers Group, MP</span>
                      </div>
                      <span className="text-text-muted text-xs font-inter flex items-center gap-1">
                        <Clock className="w-3 h-3" /> 8 min read
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Story Cards */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                {stories.map((story) => (
                  <motion.div key={story.id} variants={cardVariants}>
                    <Card className="rounded-2xl border-border-light overflow-hidden hover:shadow-card-hover transition-all h-full flex flex-col">
                      <div className="aspect-[16/9] bg-gradient-to-br from-krishiva-green/10 to-leaf-green/10 flex items-center justify-center">
                        <Trophy className="w-10 h-10 text-krishiva-green/30" />
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="font-poppins font-semibold text-lg text-text-primary mb-2">
                          {story.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm text-text-secondary font-inter">{story.author}</span>
                          <span className="text-text-muted">•</span>
                          <span className="text-xs text-text-muted font-inter">{story.location}</span>
                        </div>
                        <p className="text-text-secondary text-sm leading-relaxed mb-4 font-inter flex-1">
                          {story.excerpt}
                        </p>
                        {/* Metrics */}
                        <div className="flex items-center gap-4 mb-4">
                          {story.metrics.map((m) => (
                            <div key={m.label} className="bg-bg-primary rounded-lg px-3 py-2 text-center">
                              <p className="font-poppins font-bold text-sm text-krishiva-green font-inter">{m.value}</p>
                              <p className="text-text-muted text-[10px] font-inter">{m.label}</p>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-border-light">
                          <button className="text-krishiva-green text-sm font-medium flex items-center gap-1 hover:underline font-inter">
                            Read Full Story <ChevronRight className="w-4 h-4" />
                          </button>
                          <span className="text-text-muted text-xs font-inter flex items-center gap-1">
                            <Heart className="w-3 h-3" /> {story.likes}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* ─── Events Tab ─── */}
          {activeTab === 'events' && (
            <motion.div
              key="events"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: easeOut }}
              className="space-y-4"
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-4"
              >
                {events.map((event) => (
                  <motion.div key={event.id} variants={cardVariants}>
                    <Card className="rounded-2xl border-border-light p-5 hover:shadow-card-hover transition-all">
                      <div className="flex gap-4">
                        {/* Date Column */}
                        <div className="w-[72px] shrink-0 text-center">
                          <p className="text-krishiva-green text-xs font-bold uppercase tracking-wider font-inter">{event.date.month}</p>
                          <p className="font-poppins font-bold text-[28px] text-text-primary leading-tight font-inter">{event.date.day}</p>
                        </div>
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="font-poppins font-semibold text-base text-text-primary">{event.name}</h3>
                            <Badge variant="outline" className="text-[10px] border-border-light text-text-muted">
                              {event.type}
                            </Badge>
                          </div>
                          <div className="space-y-1 mb-3">
                            <p className="text-text-secondary text-sm font-inter flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-text-muted" /> {event.location} — {event.venue}
                            </p>
                            <p className="text-text-secondary text-sm font-inter flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-text-muted" /> {event.time}
                            </p>
                            <p className="text-text-muted text-xs font-inter flex items-center gap-1.5">
                              <Users className="w-3.5 h-3.5" /> {event.attendees}+ attending
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button
                              onClick={() => toggleEvent(event.id)}
                              size="sm"
                              className={`rounded-lg text-xs font-inter ${
                                registeredEvents[event.id]
                                  ? 'bg-success-green/10 text-success-green hover:bg-success-green/20'
                                  : 'bg-krishiva-green hover:bg-[#1B5E20] text-white'
                              }`}
                              variant={registeredEvents[event.id] ? 'ghost' : 'default'}
                            >
                              {registeredEvents[event.id] ? (
                                <><Check className="w-3.5 h-3.5 mr-1" /> Registered</>
                              ) : (
                                'Register'
                              )}
                            </Button>
                            <Button variant="outline" size="sm" className="rounded-lg text-xs border-border-light font-inter">
                              Interested
                            </Button>
                            <Button variant="ghost" size="sm" className="rounded-lg text-xs text-text-muted font-inter">
                              <Share2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* ─── Leaders Tab ─── */}
          {activeTab === 'leaders' && (
            <motion.div
              key="leaders"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: easeOut }}
            >
              <Card className="rounded-2xl border-border-light overflow-hidden">
                {/* Top 3 Podium */}
                <div className="p-6 bg-gradient-to-b from-krishiva-green/5 to-transparent">
                  <div className="flex items-end justify-center gap-4">
                    {/* 2nd Place */}
                    {leaders[1] && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col items-center pb-2"
                      >
                        <div className="w-14 h-14 rounded-full bg-[#9CA3AF]/20 flex items-center justify-center mb-2 border-2 border-[#9CA3AF]">
                          <span className="text-[#9CA3AF] font-bold text-lg">{leaders[1].avatar}</span>
                        </div>
                        <Medal className="w-5 h-5 text-[#9CA3AF] mb-1" />
                        <p className="font-poppins font-semibold text-sm text-text-primary font-inter">{leaders[1].name}</p>
                        <p className="text-text-muted text-xs font-inter">{leaders[1].points.toLocaleString()} pts</p>
                      </motion.div>
                    )}
                    {/* 1st Place */}
                    {leaders[0] && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0 }}
                        className="flex flex-col items-center -mt-4"
                      >
                        <div className="w-20 h-20 rounded-full bg-[#F59E0B]/20 flex items-center justify-center mb-2 border-3 border-[#F59E0B]">
                          <span className="text-[#F59E0B] font-bold text-xl">{leaders[0].avatar}</span>
                        </div>
                        <Crown className="w-6 h-6 text-[#F59E0B] mb-1" />
                        <p className="font-poppins font-bold text-base text-text-primary font-inter">{leaders[0].name}</p>
                        <p className="text-harvest-gold text-sm font-bold font-inter">{leaders[0].points.toLocaleString()} pts</p>
                      </motion.div>
                    )}
                    {/* 3rd Place */}
                    {leaders[2] && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col items-center pb-2"
                      >
                        <div className="w-14 h-14 rounded-full bg-[#8D6E63]/20 flex items-center justify-center mb-2 border-2 border-[#8D6E63]">
                          <span className="text-[#8D6E63] font-bold text-lg">{leaders[2].avatar}</span>
                        </div>
                        <Award className="w-5 h-5 text-[#8D6E63] mb-1" />
                        <p className="font-poppins font-semibold text-sm text-text-primary font-inter">{leaders[2].name}</p>
                        <p className="text-text-muted text-xs font-inter">{leaders[2].points.toLocaleString()} pts</p>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Leaderboard List */}
                <div className="divide-y divide-border-light">
                  {leaders.map((leader, i) => (
                    <motion.div
                      key={leader.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.04, ease: easeOut }}
                      className="flex items-center gap-4 px-5 py-3.5 hover:bg-bg-primary/50 transition-colors"
                    >
                      <div className="w-8 flex items-center justify-center shrink-0">
                        {getRankIcon(i + 1, leader.badge)}
                      </div>
                      <div className={`w-10 h-10 rounded-full ${leader.color} flex items-center justify-center shrink-0`}>
                        <span className="text-white font-bold text-xs">{leader.avatar}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-text-primary font-inter">{leader.name}</p>
                        <p className="text-text-muted text-xs font-inter">{leader.contributions} contributions</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-poppins font-bold text-sm text-harvest-gold font-inter">{leader.points.toLocaleString()}</p>
                        <p className="text-text-muted text-[10px] font-inter">points</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Comment Dialog ── */}
      <Dialog open={commentModalOpen} onOpenChange={setCommentModalOpen}>
        <DialogContent className="sm:max-w-[420px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-poppins text-lg flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-krishiva-green" /> Add Comment
            </DialogTitle>
          </DialogHeader>
          <div className="py-2">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write your comment..."
              className="w-full p-3 rounded-xl border border-border-light bg-bg-primary text-sm text-text-primary placeholder:text-text-muted resize-none focus:outline-none focus:border-krishiva-green font-inter"
              rows={4}
              autoFocus
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCommentModalOpen(false)}
              className="text-text-secondary font-inter"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={submitComment}
              className="bg-krishiva-green hover:bg-[#1B5E20] text-white rounded-lg font-inter"
            >
              Comment (+{POINTS_COMMENT}pts)
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Full Leaderboard Dialog ── */}
      <Dialog open={leaderboardOpen} onOpenChange={setLeaderboardOpen}>
        <DialogContent className="sm:max-w-[520px] rounded-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-poppins text-lg flex items-center gap-2">
              <Trophy className="w-5 h-5 text-harvest-gold" /> Full Leaderboard
            </DialogTitle>
          </DialogHeader>
          {/* Top 3 Podium */}
          <div className="pb-4 bg-gradient-to-b from-krishiva-green/5 to-transparent rounded-xl">
            <div className="flex items-end justify-center gap-4 pt-2">
              {leaders[1] && (
                <div className="flex flex-col items-center pb-2">
                  <div className="w-14 h-14 rounded-full bg-[#9CA3AF]/20 flex items-center justify-center mb-2 border-2 border-[#9CA3AF]">
                    <span className="text-[#9CA3AF] font-bold text-lg">{leaders[1].avatar}</span>
                  </div>
                  <Medal className="w-5 h-5 text-[#9CA3AF] mb-1" />
                  <p className="font-poppins font-semibold text-sm text-text-primary font-inter">{leaders[1].name}</p>
                  <p className="text-text-muted text-xs font-inter">{leaders[1].points.toLocaleString()} pts</p>
                  <p className="text-text-muted text-[10px] font-inter">{leaders[1].contributions} contributions</p>
                </div>
              )}
              {leaders[0] && (
                <div className="flex flex-col items-center -mt-3">
                  <div className="w-20 h-20 rounded-full bg-[#F59E0B]/20 flex items-center justify-center mb-2 border-3 border-[#F59E0B]">
                    <span className="text-[#F59E0B] font-bold text-xl">{leaders[0].avatar}</span>
                  </div>
                  <Crown className="w-6 h-6 text-[#F59E0B] mb-1" />
                  <p className="font-poppins font-bold text-base text-text-primary font-inter">{leaders[0].name}</p>
                  <p className="text-harvest-gold text-sm font-bold font-inter">{leaders[0].points.toLocaleString()} pts</p>
                  <p className="text-text-muted text-[10px] font-inter">{leaders[0].contributions} contributions</p>
                </div>
              )}
              {leaders[2] && (
                <div className="flex flex-col items-center pb-2">
                  <div className="w-14 h-14 rounded-full bg-[#8D6E63]/20 flex items-center justify-center mb-2 border-2 border-[#8D6E63]">
                    <span className="text-[#8D6E63] font-bold text-lg">{leaders[2].avatar}</span>
                  </div>
                  <Award className="w-5 h-5 text-[#8D6E63] mb-1" />
                  <p className="font-poppins font-semibold text-sm text-text-primary font-inter">{leaders[2].name}</p>
                  <p className="text-text-muted text-xs font-inter">{leaders[2].points.toLocaleString()} pts</p>
                  <p className="text-text-muted text-[10px] font-inter">{leaders[2].contributions} contributions</p>
                </div>
              )}
            </div>
          </div>
          {/* Full Table */}
          <div className="divide-y divide-border-light border border-border-light rounded-xl overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-2.5 bg-bg-primary text-text-muted text-xs font-inter font-medium">
              <span className="w-8 text-center">Rank</span>
              <span className="flex-1">Farmer</span>
              <span className="w-20 text-right">Points</span>
              <span className="w-24 text-right hidden sm:block">Contributions</span>
            </div>
            {leaders.map((leader, i) => (
              <div
                key={leader.id}
                className="flex items-center gap-3 px-4 py-3 hover:bg-bg-primary/50 transition-colors"
              >
                <div className="w-8 flex items-center justify-center shrink-0">
                  {getRankIcon(i + 1, leader.badge)}
                </div>
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <div className={`w-8 h-8 rounded-full ${leader.color} flex items-center justify-center shrink-0`}>
                    <span className="text-white font-bold text-[10px]">{leader.avatar}</span>
                  </div>
                  <span className="text-sm text-text-primary font-inter truncate">{leader.name}</span>
                </div>
                <div className="w-20 text-right shrink-0">
                  <span className="font-poppins font-bold text-sm text-harvest-gold font-inter">{leader.points.toLocaleString()}</span>
                </div>
                <div className="w-24 text-right hidden sm:block shrink-0">
                  <span className="text-text-muted text-xs font-inter">{leader.contributions}</span>
                </div>
              </div>
            ))}
          </div>
          {/* Points Legend */}
          <div className="mt-4 p-3 bg-bg-primary rounded-xl">
            <p className="text-xs font-medium text-text-secondary mb-2 font-inter">How to earn points:</p>
            <div className="grid grid-cols-2 gap-1.5 text-[11px] text-text-muted font-inter">
              <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-error-red" /> Post Like: +{POINTS_LIKE} pts</span>
              <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3 text-blue-500" /> Comment: +{POINTS_COMMENT} pts</span>
              <span className="flex items-center gap-1"><Share2 className="w-3 h-3 text-krishiva-green" /> Share: +{POINTS_SHARE} pts</span>
              <span className="flex items-center gap-1"><Star className="w-3 h-3 text-harvest-gold" /> New Post: +{POINTS_NEW_POST} pts</span>
              <span className="flex items-center gap-1 col-span-2"><Zap className="w-3 h-3 text-warning-amber" /> Daily Login: +{POINTS_DAILY_LOGIN} pts</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
