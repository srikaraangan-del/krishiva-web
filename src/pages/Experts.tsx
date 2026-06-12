import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sprout,
  HeartPulse,
  Mountain,
  Droplets,
  Landmark,
  LayoutGrid,
  Search,
  Star,
  Video,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Calendar,
  Check,
  Globe,
  GraduationCap,
  Award,
  IndianRupee,
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

/* ───────── categories ───────── */

const categories = [
  { name: 'All', icon: LayoutGrid },
  { name: 'Farming', icon: Sprout },
  { name: 'Soil Science', icon: Mountain },
  { name: 'Pest Management', icon: HeartPulse },
  { name: 'Irrigation', icon: Droplets },
  { name: 'Market/Trading', icon: IndianRupee },
  { name: 'Govt Schemes', icon: Landmark },
  { name: 'Finance', icon: Landmark },
  { name: 'Legal', icon: Award },
];

/* ───────── experts data ───────── */

const experts = [
  {
    id: 1,
    name: 'Dr. Ramesh Sharma',
    title: 'Senior Agronomist',
    specialty: 'Farming',
    experience: 18,
    languages: ['Hindi', 'English', 'Marathi'],
    rating: 4.9,
    reviews: 342,
    price: 20,
    availability: 'Available Now',
    availabilityType: 'now' as const,
    education: 'Ph.D. Agriculture',
    certification: 'IARI Certified',
    about: 'Specialist in sustainable farming practices with 18+ years of field experience across India.',
    avatarColor: 'bg-krishiva-green',
    initials: 'RS',
  },
  {
    id: 2,
    name: 'Prof. Lakshmi Reddy',
    title: 'Soil Scientist',
    specialty: 'Soil Science',
    experience: 22,
    languages: ['Telugu', 'Hindi', 'English'],
    rating: 4.8,
    reviews: 256,
    price: 25,
    availability: 'Available Today',
    availabilityType: 'today' as const,
    education: 'Ph.D. Soil Science',
    certification: 'ICAR Certified',
    about: 'Expert in soil health management, nutrient optimization, and organic soil enrichment.',
    avatarColor: 'bg-soil-brown',
    initials: 'LR',
  },
  {
    id: 3,
    name: 'Dr. Anand Patel',
    title: 'Pest Management Expert',
    specialty: 'Pest Management',
    experience: 15,
    languages: ['Gujarati', 'Hindi', 'English'],
    rating: 4.7,
    reviews: 189,
    price: 18,
    availability: 'Available Now',
    availabilityType: 'now' as const,
    education: 'Ph.D. Entomology',
    certification: 'NPPO Certified',
    about: 'Leading pest management specialist with focus on integrated pest management (IPM) strategies.',
    avatarColor: 'bg-warning-amber',
    initials: 'AP',
  },
  {
    id: 4,
    name: 'Dr. Priya Nair',
    title: 'Irrigation Specialist',
    specialty: 'Irrigation',
    experience: 12,
    languages: ['Malayalam', 'Tamil', 'English'],
    rating: 4.9,
    reviews: 198,
    price: 22,
    availability: 'Book for Tomorrow',
    availabilityType: 'tomorrow' as const,
    education: 'Ph.D. Water Mgmt',
    certification: 'CGWB Certified',
    about: 'Water management and irrigation systems expert specializing in drip and sprinkler systems.',
    avatarColor: 'bg-[#3B82F6]',
    initials: 'PN',
  },
  {
    id: 5,
    name: 'Shri Vijay Kumar',
    title: 'Market Analyst',
    specialty: 'Market/Trading',
    experience: 20,
    languages: ['Hindi', 'Punjabi', 'English'],
    rating: 4.6,
    reviews: 423,
    price: 15,
    availability: 'Available Today',
    availabilityType: 'today' as const,
    education: 'MBA Agribusiness',
    certification: 'NCDEX Certified',
    about: 'Agricultural market analyst with deep understanding of commodity markets and price trends.',
    avatarColor: 'bg-[#8B5CF6]',
    initials: 'VK',
  },
  {
    id: 6,
    name: 'Smt. Sunita Devi',
    title: 'Govt Schemes Advisor',
    specialty: 'Govt Schemes',
    experience: 14,
    languages: ['Hindi', 'Bengali', 'English'],
    rating: 4.8,
    reviews: 312,
    price: 10,
    availability: 'Available Now',
    availabilityType: 'now' as const,
    education: 'MSW, Rural Dev',
    certification: 'Govt Approved',
    about: 'Helps farmers access government schemes, subsidies, and welfare programs across states.',
    avatarColor: 'bg-[#EC4899]',
    initials: 'SD',
  },
  {
    id: 7,
    name: 'CA Rajesh Gupta',
    title: 'Agri Finance Expert',
    specialty: 'Finance',
    experience: 16,
    languages: ['Hindi', 'English'],
    rating: 4.7,
    reviews: 267,
    price: 25,
    availability: 'Book for Tomorrow',
    availabilityType: 'tomorrow' as const,
    education: 'CA, Agri Finance',
    certification: 'ICAI Member',
    about: 'Chartered accountant specializing in farm loans, insurance, tax planning, and credit access.',
    avatarColor: 'bg-[#14B8A6]',
    initials: 'RG',
  },
  {
    id: 8,
    name: 'Adv. Mehta Singh',
    title: 'Agricultural Lawyer',
    specialty: 'Legal',
    experience: 25,
    languages: ['Hindi', 'Punjabi', 'English'],
    rating: 4.9,
    reviews: 156,
    price: 25,
    availability: 'Available Today',
    availabilityType: 'today' as const,
    education: 'LL.B, Agri Law',
    certification: 'Bar Council',
    about: 'Legal expert in land rights, contract farming, dispute resolution, and agricultural laws.',
    avatarColor: 'bg-[#6366F1]',
    initials: 'MS',
  },
];

/* ───────── consultation types ───────── */

const consultationTypes = [
  { type: 'Video Call', icon: Video, price: '₹20/min', popular: true },
  { type: 'Audio Call', icon: Phone, price: '₹15/min', popular: false },
  { type: 'Chat', icon: MessageCircle, price: '₹10/min', popular: false },
  { type: 'In-Person', icon: MapPin, price: '₹50/visit', popular: false },
];

/* ───────── my consultations ───────── */

const myConsultations = [
  {
    id: 1,
    expert: 'Dr. Ramesh Sharma',
    type: 'Video Call',
    topic: 'Tomato Early Blight treatment',
    date: 'June 15, 2025',
    time: '11:00 AM',
    price: 400,
    status: 'completed' as const,
    initials: 'RS',
    avatarColor: 'bg-krishiva-green',
    summary: 'Dr. Sharma advised crop rotation and recommended Mancozeb 75% WP. Follow-up scheduled for next week to monitor progress. Prescribed calcium-rich fertilizer for soil health improvement.',
  },
  {
    id: 2,
    expert: 'Prof. Lakshmi Reddy',
    type: 'Audio Call',
    topic: 'Soil pH imbalance in cotton field',
    date: 'June 18, 2025',
    time: '3:00 PM',
    price: 750,
    status: 'upcoming' as const,
    initials: 'LR',
    avatarColor: 'bg-soil-brown',
  },
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

export default function Experts() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpert, setSelectedExpert] = useState<typeof experts[0] | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState(1);
  const [selectedType, setSelectedType] = useState(0);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [consultationTab, setConsultationTab] = useState('upcoming');
  const [showProfile, setShowProfile] = useState(false);

  const filteredExperts = experts.filter((e) => {
    const matchesCategory = activeCategory === 'All' || e.specialty === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.about.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBook = (expert: typeof experts[0]) => {
    setSelectedExpert(expert);
    setBookingStep(1);
    setSelectedDate(0);
    setSelectedTime(1);
    setSelectedType(0);
    setBookingConfirmed(false);
    setShowBooking(true);
  };

  const handleConfirmBooking = () => {
    setBookingConfirmed(true);
    setTimeout(() => {
      setShowBooking(false);
    }, 2000);
  };

  const availabilityBadge = (type: string) => {
    if (type === 'now') return 'bg-success-green/10 text-success-green border-success-green/20';
    if (type === 'today') return 'bg-krishiva-green/10 text-krishiva-green border-krishiva-green/20';
    return 'bg-warning-amber/10 text-warning-amber border-warning-amber/20';
  };

  const consultationStatusBadge = (status: string) => {
    if (status === 'completed') return 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20';
    if (status === 'upcoming') return 'bg-success-green/10 text-success-green border-success-green/20';
    return 'bg-error-red/10 text-error-red border-error-red/20';
  };

  const dates = ['Jun 16', 'Jun 17', 'Jun 18', 'Jun 19', 'Jun 20', 'Jun 21', 'Jun 22'];
  const times = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

  return (
    <DashboardLayout>
      <div className="max-w-[1100px] mx-auto space-y-6 pb-8">
        {/* ─── Hero Banner ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-krishiva-green via-leaf-green to-border-green p-8 sm:p-10"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-5 h-5 text-white/90" />
              <span className="text-white/80 text-sm font-medium font-inter">Certified Professionals</span>
            </div>
            <h1 className="font-poppins font-bold text-[28px] sm:text-[36px] text-white leading-tight mb-2">
              Connect with Agricultural Experts
            </h1>
            <p className="text-white/85 text-base font-inter max-w-lg">
              Get personalized advice from certified professionals across farming, soil science, pest management, and more.
            </p>
          </div>
        </motion.div>

        {/* ─── Categories ─── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: easeOut }}
          className="overflow-x-auto pb-2 -mx-4 px-4"
        >
          <div className="flex items-center gap-2.5 min-w-max">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: i * 0.04 }}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition-all whitespace-nowrap font-inter ${
                  activeCategory === cat.name
                    ? 'bg-krishiva-green text-white border-krishiva-green shadow-button'
                    : 'bg-white text-text-secondary border-border-light hover:border-border-green hover:bg-krishiva-green/5'
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ─── Search ─── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15, ease: easeOut }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, specialty, or crop..."
              className="pl-12 h-14 rounded-xl border-border-light bg-white text-base font-inter focus:border-krishiva-green focus:ring-krishiva-green/15"
            />
          </div>
        </motion.div>

        {/* ─── Expert Cards ─── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {filteredExperts.map((expert) => (
            <motion.div key={expert.id} variants={cardVariants}>
              <Card className="rounded-2xl border-border-light overflow-hidden hover:shadow-card-hover hover:-translate-y-[3px] transition-all duration-200">
                {/* Cover */}
                <div className="h-20 bg-gradient-to-r from-krishiva-green/20 to-leaf-green/20 relative" />
                {/* Profile Section */}
                <div className="px-5 pb-5 -mt-9 relative">
                  <div className="flex justify-center mb-3">
                    <div className="relative">
                      <div className={`w-[72px] h-[72px] rounded-full ${expert.avatarColor} border-4 border-white flex items-center justify-center`}>
                        <span className="text-white font-poppins font-bold text-xl">{expert.initials}</span>
                      </div>
                      {expert.availabilityType === 'now' && (
                        <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-success-green rounded-full border-2 border-white" />
                      )}
                    </div>
                  </div>
                  <div className="text-center mb-3">
                    <h3 className="font-poppins font-semibold text-lg text-text-primary">{expert.name}</h3>
                    <p className="text-text-secondary text-sm font-inter">{expert.title}</p>
                    <p className="text-text-muted text-xs font-inter mt-0.5">{expert.experience} years experience</p>
                  </div>
                  {/* Credentials */}
                  <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
                    <Badge variant="outline" className="bg-[#3B82F6]/5 text-[#3B82F6] border-[#3B82F6]/20 text-xs">
                      {expert.education}
                    </Badge>
                    <Badge variant="outline" className="bg-krishiva-green/5 text-krishiva-green border-krishiva-green/20 text-xs">
                      {expert.certification}
                    </Badge>
                  </div>
                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1.5 mb-3">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${s <= Math.floor(expert.rating) ? 'text-harvest-gold fill-harvest-gold' : 'text-border-light'}`}
                        />
                      ))}
                    </div>
                    <span className="text-text-secondary text-sm font-inter">
                      {expert.rating} ({expert.reviews} reviews)
                    </span>
                  </div>
                  {/* Languages */}
                  <div className="flex flex-wrap items-center justify-center gap-1.5 mb-3">
                    {expert.languages.map((lang) => (
                      <span key={lang} className="flex items-center gap-1 text-xs text-text-muted font-inter">
                        <Globe className="w-3 h-3" /> {lang}
                      </span>
                    ))}
                  </div>
                  {/* Price & Availability */}
                  <div className="flex items-center justify-between mb-4 px-1">
                    <div>
                      <span className="font-poppins font-bold text-lg text-krishiva-green font-inter">₹{expert.price}/min</span>
                    </div>
                    <Badge variant="outline" className={availabilityBadge(expert.availabilityType)}>
                      {expert.availability}
                    </Badge>
                  </div>
                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={() => { setSelectedExpert(expert); setShowProfile(true); }}
                      variant="outline"
                      className="flex-1 border-border-light text-text-secondary hover:bg-bg-primary rounded-xl font-inter"
                    >
                      View Profile
                    </Button>
                    <Button
                      onClick={() => handleBook(expert)}
                      className="flex-1 bg-krishiva-green hover:bg-[#1B5E20] text-white rounded-xl font-inter shadow-button"
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* ─── Consultation Types ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: easeOut }}
        >
          <h2 className="font-poppins font-semibold text-xl text-text-primary mb-4">Consultation Types</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {consultationTypes.map((ct, i) => (
              <motion.div
                key={ct.type}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.35 + i * 0.05, ease: easeOut }}
              >
                <Card className="rounded-2xl border-border-light p-5 text-center hover:border-border-green hover:shadow-card transition-all cursor-pointer relative">
                  {ct.popular && (
                    <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-harvest-gold text-text-primary text-[10px]">
                      Most Popular
                    </Badge>
                  )}
                  <div className="w-12 h-12 rounded-xl bg-krishiva-green/10 flex items-center justify-center mx-auto mb-3">
                    <ct.icon className="w-6 h-6 text-krishiva-green" />
                  </div>
                  <h3 className="font-poppins font-semibold text-sm text-text-primary mb-1">{ct.type}</h3>
                  <p className="text-krishiva-green font-bold text-sm font-inter">{ct.price}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── My Consultations ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4, ease: easeOut }}
        >
          <h2 className="font-poppins font-semibold text-xl text-text-primary mb-4">My Consultations</h2>
          <Tabs value={consultationTab} onValueChange={setConsultationTab} className="mb-4">
            <TabsList className="bg-white border border-border-light rounded-xl p-1">
              <TabsTrigger
                value="upcoming"
                className="rounded-lg px-4 py-2 text-sm font-inter data-[state=active]:bg-krishiva-green data-[state=active]:text-white"
              >
                Upcoming
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="rounded-lg px-4 py-2 text-sm font-inter data-[state=active]:bg-krishiva-green data-[state=active]:text-white"
              >
                Past
              </TabsTrigger>
              <TabsTrigger
                value="cancelled"
                className="rounded-lg px-4 py-2 text-sm font-inter data-[state=active]:bg-krishiva-green data-[state=active]:text-white"
              >
                Cancelled
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-4">
            {myConsultations
              .filter((c) => c.status === consultationTab)
              .map((consultation, i) => (
                <motion.div
                  key={consultation.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06, ease: easeOut }}
                >
                  <Card className="rounded-2xl border-border-light p-5 hover:shadow-card-hover transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`w-12 h-12 rounded-full ${consultation.avatarColor} flex items-center justify-center shrink-0`}>
                          <span className="text-white font-bold text-sm">{consultation.initials}</span>
                        </div>
                        <div>
                          <h4 className="font-poppins font-semibold text-base text-text-primary">{consultation.expert}</h4>
                          <p className="text-text-secondary text-sm font-inter">{consultation.type} &bull; {consultation.topic}</p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-text-muted font-inter">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {consultation.date}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {consultation.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                        <Badge variant="outline" className={consultationStatusBadge(consultation.status)}>
                          {consultation.status === 'completed' ? 'Completed' : 'Upcoming'}
                        </Badge>
                        <span className="font-poppins font-bold text-krishiva-green font-inter">₹{consultation.price}</span>
                      </div>
                    </div>

                    {/* Post-consultation summary */}
                    {consultation.status === 'completed' && consultation.summary && (
                      <div className="mt-4 pt-4 border-t border-border-light">
                        <p className="text-text-secondary text-sm font-inter leading-relaxed">
                          <span className="font-medium text-text-primary">Summary:</span> {consultation.summary}
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                          <Button variant="outline" size="sm" className="rounded-lg text-xs border-border-light font-inter">
                            View Prescription
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-lg text-xs border-border-light font-inter">
                            Rate Expert
                          </Button>
                          <Button
                            size="sm"
                            className="rounded-lg text-xs bg-krishiva-green hover:bg-[#1B5E20] text-white font-inter"
                            onClick={() => {
                              const expert = experts.find((e) => e.name === consultation.expert);
                              if (expert) handleBook(expert);
                            }}
                          >
                            Rebook
                          </Button>
                        </div>
                      </div>
                    )}

                    {consultation.status === 'upcoming' && (
                      <div className="mt-4 pt-4 border-t border-border-light flex items-center gap-3">
                        <Button
                          size="sm"
                          className="rounded-lg text-xs bg-krishiva-green hover:bg-[#1B5E20] text-white font-inter"
                        >
                          <Video className="w-3.5 h-3.5 mr-1" /> Join Call
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-lg text-xs border-border-light font-inter">
                          Reschedule
                        </Button>
                        <Button variant="ghost" size="sm" className="rounded-lg text-xs text-error-red hover:text-error-red font-inter">
                          Cancel
                        </Button>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}

            {myConsultations.filter((c) => c.status === consultationTab).length === 0 && (
              <div className="text-center py-10 text-text-muted text-sm font-inter">
                No {consultationTab} consultations found.
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* ─── Profile Dialog ─── */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="sm:max-w-[520px] rounded-[20px] p-0 overflow-hidden">
          {selectedExpert && (
            <>
              <div className="h-24 bg-gradient-to-r from-krishiva-green/20 to-leaf-green/20" />
              <div className="px-6 pb-6 -mt-12">
                <div className="flex justify-center mb-4">
                  <div className={`w-24 h-24 rounded-full ${selectedExpert.avatarColor} border-4 border-white flex items-center justify-center`}>
                    <span className="text-white font-poppins font-bold text-2xl">{selectedExpert.initials}</span>
                  </div>
                </div>
                <div className="text-center mb-5">
                  <h3 className="font-poppins font-bold text-xl text-text-primary">{selectedExpert.name}</h3>
                  <p className="text-text-secondary text-sm font-inter">{selectedExpert.title}</p>
                  <div className="flex items-center justify-center gap-1.5 mt-2">
                    <Star className="w-4 h-4 text-harvest-gold fill-harvest-gold" />
                    <span className="text-sm text-text-secondary font-inter">{selectedExpert.rating} ({selectedExpert.reviews} reviews)</span>
                  </div>
                </div>
                <div className="space-y-3 mb-5">
                  <div className="flex items-center gap-3 text-sm text-text-secondary font-inter">
                    <GraduationCap className="w-4 h-4 text-krishiva-green" />
                    {selectedExpert.education}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-text-secondary font-inter">
                    <Award className="w-4 h-4 text-krishiva-green" />
                    {selectedExpert.certification} &bull; {selectedExpert.experience} years
                  </div>
                  <div className="flex items-center gap-3 text-sm text-text-secondary font-inter">
                    <Globe className="w-4 h-4 text-krishiva-green" />
                    {selectedExpert.languages.join(', ')}
                  </div>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mb-5 font-inter bg-bg-primary rounded-xl p-4">
                  {selectedExpert.about}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-text-muted text-xs font-inter">Rate</span>
                    <p className="font-poppins font-bold text-krishiva-green text-lg font-inter">₹{selectedExpert.price}/min</p>
                  </div>
                  <Button
                    onClick={() => { setShowProfile(false); handleBook(selectedExpert); }}
                    className="bg-krishiva-green hover:bg-[#1B5E20] text-white rounded-xl px-6 shadow-button font-inter"
                  >
                    Book Consultation
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ─── Booking Dialog ─── */}
      <Dialog open={showBooking} onOpenChange={setShowBooking}>
        <DialogContent className="sm:max-w-[500px] rounded-[20px] p-0 overflow-hidden">
          {bookingConfirmed ? (
            <div className="p-10 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-16 h-16 rounded-full bg-success-green/10 flex items-center justify-center mx-auto mb-4"
              >
                <Check className="w-8 h-8 text-success-green" />
              </motion.div>
              <h3 className="font-poppins font-bold text-xl text-text-primary mb-2">Booking Confirmed!</h3>
              <p className="text-text-secondary text-sm font-inter">
                Your consultation with {selectedExpert?.name} is scheduled.
              </p>
            </div>
          ) : (
            <>
              <DialogHeader className="p-6 pb-0">
                <DialogTitle className="font-poppins font-semibold text-xl">
                  Book with {selectedExpert?.name}
                </DialogTitle>
              </DialogHeader>
              <div className="p-6 space-y-5">
                {/* Step indicator */}
                <div className="flex items-center gap-2 mb-2">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`flex-1 h-2 rounded-full transition-colors ${
                        s <= bookingStep ? 'bg-krishiva-green' : 'bg-border-light'
                      }`}
                    />
                  ))}
                </div>

                {bookingStep === 1 && (
                  <>
                    <div>
                      <label className="text-sm font-medium text-text-primary mb-2 block font-inter flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-krishiva-green" /> Select Date
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {dates.map((d, i) => (
                          <button
                            key={d}
                            onClick={() => setSelectedDate(i)}
                            className={`py-2.5 rounded-xl text-xs font-medium transition-all border font-inter ${
                              selectedDate === i
                                ? 'bg-krishiva-green text-white border-krishiva-green'
                                : 'bg-white text-text-secondary border-border-light hover:border-border-green'
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-primary mb-2 block font-inter flex items-center gap-2">
                        <Clock className="w-4 h-4 text-krishiva-green" /> Select Time Slot
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {times.map((t, i) => (
                          <button
                            key={t}
                            onClick={() => setSelectedTime(i)}
                            className={`py-2.5 rounded-xl text-xs font-medium transition-all border font-inter ${
                              selectedTime === i
                                ? 'bg-krishiva-green text-white border-krishiva-green'
                                : 'bg-white text-text-secondary border-border-light hover:border-border-green'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {bookingStep === 2 && (
                  <>
                    <div>
                      <label className="text-sm font-medium text-text-primary mb-2 block font-inter">Consultation Type</label>
                      <div className="space-y-2">
                        {consultationTypes.map((ct, i) => (
                          <button
                            key={ct.type}
                            onClick={() => setSelectedType(i)}
                            className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                              selectedType === i
                                ? 'border-krishiva-green bg-krishiva-green/5'
                                : 'border-border-light hover:border-border-green bg-white'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-krishiva-green/10 flex items-center justify-center">
                                <ct.icon className="w-5 h-5 text-krishiva-green" />
                              </div>
                              <div className="text-left">
                                <p className="text-sm font-medium text-text-primary font-inter">{ct.type}</p>
                                {ct.popular && (
                                  <Badge className="bg-harvest-gold/10 text-harvest-gold text-[10px] mt-0.5">Most Popular</Badge>
                                )}
                              </div>
                            </div>
                            <span className="text-krishiva-green font-bold text-sm font-inter">{ct.price}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {bookingStep === 3 && (
                  <>
                    <div>
                      <label className="text-sm font-medium text-text-primary mb-2 block font-inter">Describe Your Problem</label>
                      <Textarea
                        placeholder="Tell us about your crop issue, symptoms, or questions..."
                        className="rounded-xl border-border-light focus:border-krishiva-green focus:ring-krishiva-green/15 resize-none"
                        rows={4}
                      />
                    </div>
                    <div className="bg-bg-primary rounded-xl p-4 space-y-2">
                      <div className="flex items-center justify-between text-sm font-inter">
                        <span className="text-text-secondary">Duration</span>
                        <span className="text-text-primary font-medium">20 minutes</span>
                      </div>
                      <div className="flex items-center justify-between text-sm font-inter">
                        <span className="text-text-secondary">Rate</span>
                        <span className="text-text-primary font-medium">₹{selectedExpert?.price}/min</span>
                      </div>
                      <div className="border-t border-border-light pt-2 flex items-center justify-between">
                        <span className="text-text-primary font-semibold font-inter">Total</span>
                        <span className="font-poppins font-bold text-krishiva-green text-lg font-inter">
                          ₹{20 * (selectedExpert?.price || 0)}
                        </span>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex items-center gap-3 pt-2">
                  {bookingStep > 1 && (
                    <Button
                      variant="outline"
                      onClick={() => setBookingStep(bookingStep - 1)}
                      className="flex-1 rounded-xl border-border-light font-inter"
                    >
                      Back
                    </Button>
                  )}
                  {bookingStep < 3 ? (
                    <Button
                      onClick={() => setBookingStep(bookingStep + 1)}
                      className="flex-1 bg-krishiva-green hover:bg-[#1B5E20] text-white rounded-xl shadow-button font-inter"
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button
                      onClick={handleConfirmBooking}
                      className="flex-1 bg-krishiva-green hover:bg-[#1B5E20] text-white rounded-xl shadow-button font-inter"
                    >
                      Confirm Booking
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
