import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Mic,
  Phone,
  Calendar,
  Users,
  User,
  Star,
  MapPin,
  Clock,
  ChevronDown,
  Check,
  X,
  Bookmark,
  Briefcase,
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/DashboardLayout';

/* ─── Types ─── */
interface Worker {
  id: number;
  name: string;
  initials: string;
  avatarColor: string;
  rating: number;
  skills: string[];
  experience: string;
  wage: number;
  availability: 'Available Today' | 'Available Tomorrow' | 'Busy';
  location: string;
  distance: string;
  verified: boolean;
}

interface Job {
  id: number;
  title: string;
  farmer: string;
  farmName: string;
  location: string;
  wage: number;
  duration: string;
  workersNeeded: number;
  workersFilled: number;
  workType: string;
  date: string;
  urgency: 'Urgent' | 'Normal';
  requirements: string[];
  posted: string;
}

interface Booking {
  id: number;
  workerName: string;
  jobType: string;
  dates: string;
  wage: number;
  days: number;
  status: 'Confirmed' | 'In Progress' | 'Completed';
}

/* ─── Mock Data ─── */
const WORKERS: Worker[] = [
  { id: 1, name: 'Raju Yadav', initials: 'RY', avatarColor: '#2E7D32', rating: 4.5, skills: ['Harvesting', 'Weeding'], experience: '8 years', wage: 500, availability: 'Available Today', location: 'Nagpur, MH', distance: '3 km', verified: true },
  { id: 2, name: 'Sita Devi', initials: 'SD', avatarColor: '#8D6E63', rating: 4.8, skills: ['Planting', 'Irrigation'], experience: '12 years', wage: 550, availability: 'Available Today', location: 'Nagpur, MH', distance: '5 km', verified: true },
  { id: 3, name: 'Mohan Patel', initials: 'MP', avatarColor: '#F9A825', rating: 4.2, skills: ['Spraying', 'Machine Operation'], experience: '5 years', wage: 600, availability: 'Available Tomorrow', location: 'Nagpur, MH', distance: '7 km', verified: false },
  { id: 4, name: 'Lakshmi Bai', initials: 'LB', avatarColor: '#66BB6A', rating: 4.7, skills: ['Harvesting', 'Planting', 'Weeding'], experience: '15 years', wage: 480, availability: 'Available Today', location: 'Nagpur, MH', distance: '2 km', verified: true },
  { id: 5, name: 'Kishan Lal', initials: 'KL', avatarColor: '#EF4444', rating: 3.9, skills: ['Irrigation', 'General Labor'], experience: '3 years', wage: 400, availability: 'Busy', location: 'Nagpur, MH', distance: '10 km', verified: false },
  { id: 6, name: 'Geeta Sharma', initials: 'GS', avatarColor: '#3B82F6', rating: 4.6, skills: ['Weeding', 'Spraying'], experience: '7 years', wage: 520, availability: 'Available Tomorrow', location: 'Nagpur, MH', distance: '4 km', verified: true },
  { id: 7, name: 'Ram Prasad', initials: 'RP', avatarColor: '#8B5CF6', rating: 4.4, skills: ['Harvesting', 'Machine Operation'], experience: '10 years', wage: 580, availability: 'Available Today', location: 'Nagpur, MH', distance: '6 km', verified: true },
  { id: 8, name: 'Anita Kumari', initials: 'AK', avatarColor: '#EC4899', rating: 4.9, skills: ['Planting', 'Irrigation', 'Weeding'], experience: '9 years', wage: 530, availability: 'Available Today', location: 'Nagpur, MH', distance: '3 km', verified: true },
];

const JOBS: Job[] = [
  { id: 1, title: 'Harvesting Workers Needed — Wheat', farmer: 'Rajesh Patel', farmName: 'Patel Farms', location: 'Nagpur, MH', wage: 600, duration: '7 days', workersNeeded: 8, workersFilled: 5, workType: 'Harvesting', date: 'June 20-27, 2025', urgency: 'Urgent', requirements: ['Harvesting', 'Wheat Experience'], posted: '2 hours ago' },
  { id: 2, title: 'Rice Transplanting — Paddy Field', farmer: 'Suresh Kumar', farmName: 'Green Acres', location: 'Nagpur, MH', wage: 500, duration: '5 days', workersNeeded: 6, workersFilled: 2, workType: 'Planting', date: 'June 25-30, 2025', urgency: 'Normal', requirements: ['Planting', 'Paddy Experience'], posted: '5 hours ago' },
  { id: 3, title: 'Pesticide Spraying — Cotton', farmer: 'Mahesh Desai', farmName: 'Desai Farm', location: 'Nagpur, MH', wage: 550, duration: '3 days', workersNeeded: 4, workersFilled: 1, workType: 'Spraying', date: 'June 22-25, 2025', urgency: 'Urgent', requirements: ['Spraying', 'Cotton Knowledge'], posted: '1 day ago' },
  { id: 4, title: 'Canal Irrigation Setup', farmer: 'Priya Singh', farmName: 'Singh Fields', location: 'Nagpur, MH', wage: 700, duration: '2 days', workersNeeded: 3, workersFilled: 0, workType: 'Irrigation', date: 'July 1-2, 2025', urgency: 'Normal', requirements: ['Irrigation', 'Canal Work'], posted: '3 hours ago' },
  { id: 5, title: 'Weeding & Cleaning — Vegetable Farm', farmer: 'Anil Gupta', farmName: 'Gupta Greens', location: 'Nagpur, MH', wage: 450, duration: '4 days', workersNeeded: 5, workersFilled: 3, workType: 'Weeding', date: 'June 28-July 2, 2025', urgency: 'Normal', requirements: ['Weeding', 'Vegetable Knowledge'], posted: '8 hours ago' },
];

const MY_BOOKINGS: Booking[] = [
  { id: 1, workerName: 'Raju Yadav', jobType: 'Wheat Harvesting', dates: 'June 15-22, 2025', wage: 500, days: 7, status: 'Confirmed' },
  { id: 2, workerName: 'Sita Devi', jobType: 'Irrigation Setup', dates: 'June 10-12, 2025', wage: 550, days: 2, status: 'In Progress' },
];

const CATEGORIES = ['All', 'Harvesting', 'Weeding', 'Planting', 'Spraying', 'Irrigation'];

const AVAILABILITY_COLORS: Record<string, string> = {
  'Available Today': 'bg-success-green text-white',
  'Available Tomorrow': 'bg-warning-amber text-white',
  'Busy': 'bg-gray-400 text-white',
};

/* ─── Card Animation ─── */
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.08, duration: 0.4, ease: [0, 0, 0.2, 1] as [number, number, number, number] },
  }),
};

/* ─── Star Rating ─── */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? 'text-harvest-gold fill-harvest-gold' : 'text-gray-300 fill-gray-300'}`}
        />
      ))}
      <span className="text-xs text-text-secondary ml-1">{rating}</span>
    </div>
  );
}

/* ─── Booking Modal ─── */
function BookingModal({ worker, open, onClose }: { worker: Worker | null; open: boolean; onClose: () => void }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [numWorkers, setNumWorkers] = useState(1);
  const [workType, setWorkType] = useState('');
  const [location, setLocation] = useState('');

  if (!worker) return null;
  const total = numWorkers * worker.wage;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-[480px] bg-white rounded-3xl p-0 overflow-hidden border-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="font-poppins text-xl font-semibold text-text-primary">
            Book Worker
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Worker Summary */}
          <div className="flex items-center gap-3 p-3 bg-bg-primary rounded-xl">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm" style={{ backgroundColor: worker.avatarColor }}>
              {worker.initials}
            </div>
            <div>
              <p className="font-poppins font-semibold text-text-primary">{worker.name}</p>
              <StarRating rating={worker.rating} />
            </div>
            <div className="ml-auto text-right">
              <p className="text-harvest-gold font-semibold">₹{worker.wage}<span className="text-xs text-text-secondary">/day</span></p>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="text-sm font-medium text-text-secondary mb-1.5 block">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full h-[52px] px-4 rounded-xl border border-border-light bg-white text-text-primary focus:border-krishiva-green focus:ring-[3px] focus:ring-krishiva-green/15 outline-none transition-all"
            />
          </div>

          {/* Number of Workers */}
          <div>
            <label className="text-sm font-medium text-text-secondary mb-1.5 block">Number of Workers</label>
            <div className="flex items-center gap-3">
              <button onClick={() => setNumWorkers(Math.max(1, numWorkers - 1))} className="w-10 h-10 rounded-xl border border-border-light flex items-center justify-center hover:bg-bg-primary transition-colors">
                <span className="text-lg font-medium">-</span>
              </button>
              <span className="w-12 text-center font-semibold text-text-primary">{numWorkers}</span>
              <button onClick={() => setNumWorkers(Math.min(20, numWorkers + 1))} className="w-10 h-10 rounded-xl border border-border-light flex items-center justify-center hover:bg-bg-primary transition-colors">
                <span className="text-lg font-medium">+</span>
              </button>
            </div>
          </div>

          {/* Work Type */}
          <div>
            <label className="text-sm font-medium text-text-secondary mb-1.5 block">Type of Work</label>
            <select
              value={workType}
              onChange={(e) => setWorkType(e.target.value)}
              className="w-full h-[52px] px-4 rounded-xl border border-border-light bg-white text-text-primary focus:border-krishiva-green focus:ring-[3px] focus:ring-krishiva-green/15 outline-none transition-all appearance-none"
            >
              <option value="">Select work type</option>
              {worker.skills.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
              <option value="General Labor">General Labor</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium text-text-secondary mb-1.5 block">Farm Location</label>
            <input
              type="text"
              placeholder="Enter your farm location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full h-[52px] px-4 rounded-xl border border-border-light bg-white text-text-primary placeholder:text-text-muted focus:border-krishiva-green focus:ring-[3px] focus:ring-krishiva-green/15 outline-none transition-all"
            />
          </div>

          {/* Price Calculation */}
          <div className="p-4 bg-bg-primary rounded-xl space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Workers</span>
              <span className="text-text-primary font-medium">{numWorkers}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Rate per day</span>
              <span className="text-text-primary font-medium">₹{worker.wage}</span>
            </div>
            <div className="border-t border-border-light pt-2 flex justify-between">
              <span className="font-semibold text-text-primary">Total Estimate</span>
              <span className="font-bold text-krishiva-green text-lg">₹{total}</span>
            </div>
          </div>

          {/* Escrow Note */}
          <div className="flex items-start gap-2 p-3 bg-krishiva-green/5 rounded-xl">
            <Check className="w-4 h-4 text-krishiva-green mt-0.5 shrink-0" />
            <p className="text-xs text-text-secondary">
              Payment will be held in escrow and released only after work is completed satisfactorily.
            </p>
          </div>

          {/* Confirm Button */}
          <Button
            className="w-full h-[52px] bg-harvest-gold hover:bg-[#FBC02D] text-text-primary font-semibold rounded-xl shadow-gold transition-all hover:scale-[1.02] active:scale-[0.98]"
            onClick={onClose}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Confirm Booking
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ─── Main Component ─── */
export default function Labor() {
  const [activeRole, setActiveRole] = useState<'workers' | 'work'>('workers');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [myBookingsExpanded, setMyBookingsExpanded] = useState(true);

  const filteredWorkers = WORKERS.filter((w) => {
    const matchSearch = searchQuery === '' || w.name.toLowerCase().includes(searchQuery.toLowerCase()) || w.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) || w.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = activeCategory === 'All' || w.skills.some((s) => s === activeCategory);
    return matchSearch && matchCategory;
  });

  return (
    <DashboardLayout>
      <div className="max-w-[1200px] mx-auto space-y-6 pb-8">
        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-poppins font-bold text-2xl text-text-primary">Labor Marketplace</h1>
            <p className="text-text-secondary text-sm mt-0.5">Find skilled farm workers</p>
          </div>
          <Button className="bg-krishiva-green hover:bg-[#1B5E20] text-white font-medium rounded-xl shadow-button h-11 px-5">
            <Briefcase className="w-4 h-4 mr-2" />
            Post a Job
          </Button>
        </div>

        {/* ── Role Toggle ── */}
        <div className="flex justify-center">
          <div className="inline-flex bg-white rounded-2xl p-1.5 shadow-card border border-border-light">
            <button
              onClick={() => setActiveRole('workers')}
              className={`flex items-center gap-2 h-11 px-6 rounded-xl font-medium text-sm transition-all duration-200 ${
                activeRole === 'workers'
                  ? 'bg-krishiva-green text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Users className="w-4 h-4" />
              I Need Workers
            </button>
            <button
              onClick={() => setActiveRole('work')}
              className={`flex items-center gap-2 h-11 px-6 rounded-xl font-medium text-sm transition-all duration-200 ${
                activeRole === 'work'
                  ? 'bg-krishiva-green text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <User className="w-4 h-4" />
              I Want to Work
            </button>
          </div>
        </div>

        {/* ── Search Bar ── */}
        <div className="bg-white rounded-2xl p-5 shadow-card border border-border-light">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder={activeRole === 'workers' ? 'Search workers by skill or location...' : 'Search jobs by type or location...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[52px] pl-12 pr-12 rounded-xl border border-border-light bg-white text-text-primary placeholder:text-text-muted focus:border-krishiva-green focus:ring-[3px] focus:ring-krishiva-green/15 outline-none transition-all text-base"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-krishiva-green/10 transition-colors">
              <Mic className="w-5 h-5 text-krishiva-green" />
            </button>
          </div>
        </div>

        {/* ── Content ── */}
        <AnimatePresence mode="wait">
          {activeRole === 'workers' ? (
            <motion.div
              key="workers"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Filter Chips */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`h-9 px-4 rounded-full text-sm font-medium transition-all duration-200 ${
                      activeCategory === cat
                        ? 'bg-krishiva-green text-white'
                        : 'bg-white text-text-secondary border border-border-light hover:border-krishiva-green/30'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Worker Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredWorkers.map((worker, i) => (
                  <motion.div
                    key={worker.id}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white rounded-2xl border border-border-light shadow-card overflow-hidden hover:shadow-card-hover transition-shadow duration-200"
                  >
                    {/* Top strip */}
                    <div className={`h-1 ${worker.availability === 'Available Today' ? 'bg-success-green' : worker.availability === 'Available Tomorrow' ? 'bg-warning-amber' : 'bg-gray-300'}`} />

                    <div className="p-5">
                      {/* Profile Row */}
                      <div className="flex items-start gap-3">
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0 border-2 border-border-light"
                          style={{ backgroundColor: worker.avatarColor }}
                        >
                          {worker.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-poppins font-semibold text-text-primary">{worker.name}</h3>
                            {worker.verified && (
                              <Badge className="bg-blue-500 text-white text-[10px] h-5 px-1.5 border-0">
                                <Check className="w-3 h-3 mr-0.5" /> Verified
                              </Badge>
                            )}
                          </div>
                          <StarRating rating={worker.rating} />
                          <p className="text-xs text-text-secondary mt-0.5">{worker.experience} experience</p>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {worker.skills.map((skill) => (
                          <span
                            key={skill}
                            className="h-7 px-3 rounded-full bg-bg-primary text-text-secondary text-xs font-medium flex items-center"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Details Row */}
                      <div className="flex items-center justify-between mt-4">
                        <div>
                          <p className="text-krishiva-green font-semibold">₹{worker.wage}<span className="text-xs text-text-secondary font-normal">/day</span></p>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-text-secondary">
                          <MapPin className="w-3 h-3" />
                          {worker.distance}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${AVAILABILITY_COLORS[worker.availability]}`}>
                            {worker.availability}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2.5 mt-4">
                        <Button
                          variant="outline"
                          className="flex-1 h-10 border-krishiva-green text-krishiva-green hover:bg-krishiva-green/5 rounded-xl text-sm font-medium"
                        >
                          <Phone className="w-4 h-4 mr-1.5" />
                          Call
                        </Button>
                        <Button
                          className="flex-1 h-10 bg-harvest-gold hover:bg-[#FBC02D] text-text-primary rounded-xl text-sm font-semibold shadow-gold"
                          onClick={() => {
                            setSelectedWorker(worker);
                            setBookingOpen(true);
                          }}
                        >
                          <Calendar className="w-4 h-4 mr-1.5" />
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="work"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Job Listings */}
              {JOBS.map((job, i) => (
                <motion.div
                  key={job.id}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-white rounded-2xl border border-border-light shadow-card overflow-hidden hover:shadow-card-hover transition-shadow duration-200"
                >
                  <div className={`w-1 h-full absolute left-0 top-0 ${job.urgency === 'Urgent' ? 'bg-error-red' : 'bg-krishiva-green'}`} />
                  <div className="p-5 relative">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-poppins font-semibold text-text-primary">{job.title}</h3>
                          {job.urgency === 'Urgent' && (
                            <Badge className="bg-error-red text-white text-[10px] h-5 px-1.5 border-0">Urgent</Badge>
                          )}
                        </div>
                        <p className="text-xs text-text-muted mt-1">Posted {job.posted}</p>
                      </div>
                      <button className="p-2 rounded-lg hover:bg-bg-primary transition-colors">
                        <Bookmark className="w-4 h-4 text-text-muted" />
                      </button>
                    </div>

                    {/* Farmer Info */}
                    <div className="flex items-center gap-2 mt-3">
                      <div className="w-8 h-8 rounded-full bg-krishiva-green/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-krishiva-green" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">{job.farmer}</p>
                        <p className="text-xs text-text-secondary">{job.farmName} • {job.location}</p>
                      </div>
                    </div>

                    {/* Job Details */}
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="text-krishiva-green font-semibold">₹{job.wage}<span className="text-xs text-text-secondary font-normal">/day</span></p>
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">{job.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">{job.workersFilled} of {job.workersNeeded} filled</p>
                        <div className="w-full h-1.5 bg-bg-primary rounded-full mt-1">
                          <div
                            className="h-full bg-krishiva-green rounded-full transition-all"
                            style={{ width: `${(job.workersFilled / job.workersNeeded) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Requirements */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {job.requirements.map((req) => (
                        <span key={req} className="h-7 px-3 rounded-full bg-bg-primary text-text-secondary text-xs font-medium flex items-center">
                          {req}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2.5 mt-4">
                      <Button
                        variant="outline"
                        className="flex-1 h-10 border-krishiva-green text-krishiva-green hover:bg-krishiva-green/5 rounded-xl text-sm font-medium"
                      >
                        <Phone className="w-4 h-4 mr-1.5" />
                        Call Farmer
                      </Button>
                      <Button className="flex-1 h-10 bg-krishiva-green hover:bg-[#1B5E20] text-white rounded-xl text-sm font-medium shadow-button">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── My Bookings ── */}
        <div className="bg-white rounded-2xl border border-border-light shadow-card overflow-hidden">
          <button
            onClick={() => setMyBookingsExpanded(!myBookingsExpanded)}
            className="w-full flex items-center justify-between p-5 hover:bg-bg-primary/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <h2 className="font-poppins font-semibold text-lg text-text-primary">My Active Bookings</h2>
              <Badge className="bg-krishiva-green text-white border-0">{MY_BOOKINGS.length}</Badge>
            </div>
            <ChevronDown className={`w-5 h-5 text-text-muted transition-transform duration-200 ${myBookingsExpanded ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {myBookingsExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-5 pt-0 space-y-3">
                  {MY_BOOKINGS.map((booking, i) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.3 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-bg-primary border-l-4 border-krishiva-green"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-text-primary">{booking.workerName}</p>
                        <p className="text-sm text-text-secondary">{booking.jobType}</p>
                        <p className="text-xs text-text-muted mt-0.5">{booking.dates}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-semibold text-krishiva-green">₹{booking.wage * booking.days}</p>
                        <p className="text-xs text-text-secondary">₹{booking.wage}/day × {booking.days}</p>
                        <Badge className={`mt-1 text-[10px] border-0 ${
                          booking.status === 'Confirmed' ? 'bg-success-green text-white' :
                          booking.status === 'In Progress' ? 'bg-blue-500 text-white' :
                          'bg-gray-400 text-white'
                        }`}>
                          {booking.status}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        worker={selectedWorker}
        open={bookingOpen}
        onClose={() => { setBookingOpen(false); setSelectedWorker(null); }}
      />
    </DashboardLayout>
  );
}
