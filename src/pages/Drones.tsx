import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Mic,
  Phone,
  Droplets,
  Scan,
  Activity,
  Target,
  Map,
  Star,
  MapPin,
  Calendar,
  Check,
  Navigation,
  Plane,
  Clock,
  Signal,
  Shield,
  FileText,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import DashboardLayout from '@/components/DashboardLayout';

/* ─── Types ─── */
interface DroneService {
  id: number;
  icon: typeof Droplets;
  title: string;
  description: string;
  color: string;
}

interface Operator {
  id: number;
  name: string;
  company: string;
  initials: string;
  avatarColor: string;
  rating: number;
  location: string;
  distance: string;
  dronesAvailable: number;
  services: string[];
  pricePerAcre: number;
  features: string[];
}

/* ─── Mock Data ─── */
const SERVICES: DroneService[] = [
  { id: 1, icon: Droplets, title: 'Crop Spraying', description: 'Pesticide & fertilizer application', color: '#2E7D32' },
  { id: 2, icon: Scan, title: 'Field Surveying', description: 'Comprehensive field mapping', color: '#3B82F6' },
  { id: 3, icon: Activity, title: 'Crop Health Monitoring', description: 'NDVI analysis & disease detection', color: '#8B5CF6' },
  { id: 4, icon: Target, title: 'Precision Seeding', description: 'Aerial seeding for large areas', color: '#F9A825' },
  { id: 5, icon: Map, title: 'Aerial Mapping', description: '3D terrain & contour mapping', color: '#EF4444' },
];

const OPERATORS: Operator[] = [
  { id: 1, name: 'Aakash Drone Services', company: 'AgriTech Solutions Pvt. Ltd.', initials: 'AD', avatarColor: '#2E7D32', rating: 4.9, location: 'Nagpur, MH', distance: '5 km', dronesAvailable: 4, services: ['Spraying', 'Surveying', 'Mapping'], pricePerAcre: 350, features: ['Certified Pilots', 'Live Monitoring', 'Insurance Coverage'] },
  { id: 2, name: 'Ravi Kumar', company: 'SkyFarm Drones', initials: 'RK', avatarColor: '#F9A825', rating: 4.7, location: 'Nagpur, MH', distance: '8 km', dronesAvailable: 2, services: ['Spraying', 'Crop Health'], pricePerAcre: 300, features: ['Same Day Service', 'FPV Feed', 'Report Included'] },
  { id: 3, name: 'GreenFly Operations', company: 'GreenFly Tech', initials: 'GF', avatarColor: '#3B82F6', rating: 4.8, location: 'Nagpur, MH', distance: '12 km', dronesAvailable: 6, services: ['Seeding', 'Surveying', 'Mapping'], pricePerAcre: 400, features: ['Fleet Available', 'Large Fields', '3D Mapping'] },
  { id: 4, name: 'Priya Sharma', company: 'AgriWings', initials: 'PS', avatarColor: '#EC4899', rating: 4.6, location: 'Nagpur, MH', distance: '3 km', dronesAvailable: 3, services: ['Spraying', 'Crop Health', 'Seeding'], pricePerAcre: 320, features: ['Female Pilot', 'Safe Chemicals', 'GPS Tracked'] },
  { id: 5, name: 'Vikram Patel', company: 'Precision Agri Drones', initials: 'VP', avatarColor: '#8B5CF6', rating: 4.5, location: 'Nagpur, MH', distance: '10 km', dronesAvailable: 2, services: ['Mapping', 'Surveying'], pricePerAcre: 500, features: ['High Resolution', 'Same Day Maps', 'Contour Data'] },
];

const HOW_STEPS = [
  { icon: Search, title: 'Select Service', description: 'Choose from spraying, surveying, monitoring & more' },
  { icon: Calendar, title: 'Pick Date & Time', description: 'Schedule at your convenience' },
  { icon: FileText, title: 'Share Field Details', description: 'Select your field or mark on map' },
  { icon: Check, title: 'Relax & Watch', description: 'Operator arrives, flies, delivers report' },
];

const UPCOMING_BOOKINGS = [
  { id: 1, service: 'Crop Spraying', field: 'North Field', acres: 12, operator: 'Aakash Drone Services', date: 'June 18, 2025', slot: 'Morning (6-10 AM)', cost: 4200, status: 'Confirmed' as const },
  { id: 2, service: 'Field Surveying', field: 'East Block', acres: 25, operator: 'GreenFly Operations', date: 'June 22, 2025', slot: 'Evening (4-7 PM)', cost: 10000, status: 'Confirmed' as const },
];

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
        <Star key={s} className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? 'text-harvest-gold fill-harvest-gold' : 'text-gray-300 fill-gray-300'}`} />
      ))}
      <span className="text-xs text-text-secondary ml-1">{rating}</span>
    </div>
  );
}

/* ─── Booking Modal ─── */
function DroneBookingModal({ operator, open, onClose }: { operator: Operator | null; open: boolean; onClose: () => void }) {
  const [fieldSize, setFieldSize] = useState(10);
  const [selectedDate, setSelectedDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');

  if (!operator) return null;
  const total = fieldSize * operator.pricePerAcre;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-[480px] bg-white rounded-3xl p-0 overflow-hidden border-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="font-poppins text-xl font-semibold text-text-primary">Book Drone Service</DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Operator */}
          <div className="flex items-center gap-3 p-3 bg-bg-primary rounded-xl">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm" style={{ backgroundColor: operator.avatarColor }}>
              {operator.initials}
            </div>
            <div>
              <p className="font-poppins font-semibold text-text-primary">{operator.name}</p>
              <p className="text-xs text-text-secondary">{operator.company}</p>
              <StarRating rating={operator.rating} />
            </div>
          </div>

          {/* Field Size */}
          <div>
            <label className="text-sm font-medium text-text-secondary mb-1.5 block">Field Size (acres)</label>
            <div className="flex items-center gap-3">
              <button onClick={() => setFieldSize(Math.max(1, fieldSize - 5))} className="w-10 h-10 rounded-xl border border-border-light flex items-center justify-center hover:bg-bg-primary transition-colors">
                <span className="text-lg font-medium">-</span>
              </button>
              <input
                type="number"
                value={fieldSize}
                onChange={(e) => setFieldSize(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 h-10 text-center rounded-xl border border-border-light bg-white text-text-primary font-semibold outline-none focus:border-krishiva-green"
              />
              <button onClick={() => setFieldSize(fieldSize + 5)} className="w-10 h-10 rounded-xl border border-border-light flex items-center justify-center hover:bg-bg-primary transition-colors">
                <span className="text-lg font-medium">+</span>
              </button>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="text-sm font-medium text-text-secondary mb-1.5 block">Preferred Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full h-[48px] px-4 rounded-xl border border-border-light bg-white text-text-primary focus:border-krishiva-green focus:ring-[3px] focus:ring-krishiva-green/15 outline-none transition-all"
            />
          </div>

          {/* Time Slot */}
          <div>
            <label className="text-sm font-medium text-text-secondary mb-1.5 block">Time Slot</label>
            <div className="grid grid-cols-2 gap-2">
              {['Morning (6-10 AM)', 'Evening (4-7 PM)'].map((slot) => (
                <button
                  key={slot}
                  onClick={() => setTimeSlot(slot)}
                  className={`h-11 px-3 rounded-xl text-sm font-medium transition-all border ${
                    timeSlot === slot
                      ? 'bg-krishiva-green text-white border-krishiva-green'
                      : 'bg-white text-text-secondary border-border-light hover:border-krishiva-green/30'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Chemical Option */}
          <div>
            <label className="text-sm font-medium text-text-secondary mb-1.5 block">Chemical/Fertilizer</label>
            <select className="w-full h-[48px] px-4 rounded-xl border border-border-light bg-white text-text-primary focus:border-krishiva-green outline-none transition-all appearance-none text-sm">
              <option>I have my own</option>
              <option>Operator provides</option>
              <option>Buy through KRISHIVA</option>
            </select>
          </div>

          {/* Price Estimate */}
          <div className="p-4 bg-bg-primary rounded-xl space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">{fieldSize} acres × ₹{operator.pricePerAcre}/acre</span>
              <span className="text-text-primary font-medium">₹{total}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Service fee</span>
              <span className="text-text-primary font-medium">₹{Math.round(total * 0.05)}</span>
            </div>
            <div className="border-t border-border-light pt-2 flex justify-between">
              <span className="font-semibold text-text-primary">Total Estimate</span>
              <span className="font-bold text-krishiva-green text-lg">₹{total + Math.round(total * 0.05)}</span>
            </div>
          </div>

          {/* Escrow */}
          <div className="flex items-start gap-2 p-3 bg-krishiva-green/5 rounded-xl">
            <Shield className="w-4 h-4 text-krishiva-green mt-0.5 shrink-0" />
            <p className="text-xs text-text-secondary">
              Payment held in escrow until service is completed and verified.
            </p>
          </div>

          {/* Confirm */}
          <Button className="w-full h-[52px] bg-harvest-gold hover:bg-[#FBC02D] text-text-primary font-semibold rounded-xl shadow-gold transition-all hover:scale-[1.02] active:scale-[0.98]" onClick={onClose}>
            <Calendar className="w-4 h-4 mr-2" />
            Confirm Booking
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ─── Main ─── */
export default function Drones() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [myBookingsExpanded, setMyBookingsExpanded] = useState(true);

  const filteredOperators = OPERATORS.filter((op) =>
    searchQuery === '' || op.name.toLowerCase().includes(searchQuery.toLowerCase()) || op.services.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="max-w-[1200px] mx-auto space-y-8 pb-8">
        {/* ── Hero Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2E7D32] via-[#66BB6A] to-[#A5D6A7] p-8 sm:p-12"
        >
          <div className="absolute inset-0 nature-mesh" />
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1 text-center sm:text-left">
              <h1 className="font-poppins font-bold text-3xl sm:text-4xl text-white mb-3">Agricultural Drone Services</h1>
              <p className="text-white/90 text-base sm:text-lg max-w-lg">Book drones for spraying, surveying, crop health monitoring, and more — advanced aerial solutions for your farm.</p>
            </div>
            <div className="shrink-0">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                <Plane className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Service Type Cards ── */}
        <div>
          <h2 className="font-poppins font-semibold text-xl text-text-primary mb-4">Our Services</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="flex-shrink-0 w-[180px] bg-white rounded-2xl border border-border-light shadow-card p-5 hover:shadow-card-hover transition-all duration-200 group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <service.icon className="w-6 h-6" style={{ color: service.color }} />
                </div>
                <h3 className="font-poppins font-semibold text-text-primary text-sm">{service.title}</h3>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">{service.description}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 w-full h-8 text-xs font-medium border-krishiva-green text-krishiva-green hover:bg-krishiva-green/5 rounded-lg"
                  onClick={() => {
                    const op = OPERATORS.find((o) => o.services.includes(service.title)) || OPERATORS[0];
                    setSelectedOperator(op);
                    setBookingOpen(true);
                  }}
                >
                  Book
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Search ── */}
        <div className="bg-white rounded-2xl p-5 shadow-card border border-border-light">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search operators by name or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[52px] pl-12 pr-12 rounded-xl border border-border-light bg-white text-text-primary placeholder:text-text-muted focus:border-krishiva-green focus:ring-[3px] focus:ring-krishiva-green/15 outline-none transition-all text-base"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-krishiva-green/10 transition-colors">
              <Mic className="w-5 h-5 text-krishiva-green" />
            </button>
          </div>
        </div>

        {/* ── Operator Cards ── */}
        <div>
          <h2 className="font-poppins font-semibold text-xl text-text-primary mb-4">Drone Operators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredOperators.map((operator, i) => (
              <motion.div
                key={operator.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-2xl border border-border-light shadow-card overflow-hidden hover:shadow-card-hover transition-shadow duration-200"
              >
                <div className="p-5">
                  {/* Operator Info */}
                  <div className="flex items-start gap-3">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0 border-2 border-border-light"
                      style={{ backgroundColor: operator.avatarColor }}
                    >
                      {operator.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-poppins font-semibold text-text-primary">{operator.name}</h3>
                      <p className="text-xs text-text-secondary">{operator.company}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <StarRating rating={operator.rating} />
                        <span className="text-xs text-text-muted flex items-center gap-0.5">
                          <MapPin className="w-3 h-3" /> {operator.distance}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {operator.services.map((s) => (
                      <span key={s} className="h-7 px-3 rounded-full bg-krishiva-green/10 text-krishiva-green text-xs font-medium flex items-center">
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Details */}
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <p className="text-krishiva-green font-semibold">₹{operator.pricePerAcre}<span className="text-xs text-text-secondary font-normal">/acre</span></p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-text-secondary">
                      <Plane className="w-3.5 h-3.5" />
                      {operator.dronesAvailable} drones
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {operator.features.map((f) => (
                      <span key={f} className="flex items-center gap-1 text-xs text-text-secondary">
                        <Check className="w-3 h-3 text-success-green" />
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2.5 mt-4">
                    <Button variant="outline" className="flex-1 h-10 border-krishiva-green text-krishiva-green hover:bg-krishiva-green/5 rounded-xl text-sm font-medium">
                      <Phone className="w-4 h-4 mr-1.5" />
                      Contact
                    </Button>
                    <Button
                      className="flex-1 h-10 bg-harvest-gold hover:bg-[#FBC02D] text-text-primary rounded-xl text-sm font-semibold shadow-gold"
                      onClick={() => { setSelectedOperator(operator); setBookingOpen(true); }}
                    >
                      <Calendar className="w-4 h-4 mr-1.5" />
                      Book
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── How It Works ── */}
        <div className="bg-white rounded-2xl border border-border-light shadow-card p-8">
          <h2 className="font-poppins font-semibold text-xl text-text-primary mb-8 text-center">How It Works</h2>
          <div className="relative">
            {/* Connector Line (desktop only) */}
            <div className="hidden lg:block absolute top-5 left-[12.5%] right-[12.5%] h-0.5 border-t-2 border-dashed border-krishiva-green/30" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {HOW_STEPS.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.4, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Numbered Circle */}
                  <div className="relative z-10 w-10 h-10 rounded-full bg-krishiva-green flex items-center justify-center text-white font-bold text-sm mb-3">
                    {i + 1}
                  </div>
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-krishiva-green/10 flex items-center justify-center mb-3">
                    <step.icon className="w-6 h-6 text-krishiva-green" />
                  </div>
                  <h3 className="font-poppins font-semibold text-text-primary text-sm">{step.title}</h3>
                  <p className="text-xs text-text-secondary mt-1 max-w-[200px]">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Live GPS Tracking Placeholder ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl border border-border-light shadow-card overflow-hidden"
        >
          <div className="p-5 border-b border-border-light">
            <div className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-krishiva-green" />
              <h2 className="font-poppins font-semibold text-lg text-text-primary">Live Drone Tracking</h2>
              <Badge className="bg-success-green text-white border-0 text-[10px]">
                <Signal className="w-3 h-3 mr-1" /> Live
              </Badge>
            </div>
          </div>
          <div className="relative h-64 bg-bg-primary flex items-center justify-center">
            {/* Map Placeholder */}
            <div className="absolute inset-0 bg-[#E8F5E9] opacity-60" />
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="none">
              {/* Grid lines */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2E7D32" strokeWidth="0.5" opacity="0.15" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              {/* Roads */}
              <path d="M 0 150 Q 200 100 400 150 T 800 150" fill="none" stroke="#FFFFFF" strokeWidth="6" />
              <path d="M 400 0 Q 350 100 400 150 T 400 300" fill="none" stroke="#FFFFFF" strokeWidth="6" />
              {/* Field boundaries */}
              <rect x="50" y="40" width="150" height="80" fill="#C8E6C9" opacity="0.6" rx="4" />
              <rect x="500" y="180" width="120" height="90" fill="#C8E6C9" opacity="0.6" rx="4" />
              <rect x="250" y="180" width="100" height="60" fill="#C8E6C9" opacity="0.6" rx="4" />
              {/* Drone path */}
              <path d="M 200 80 Q 300 60 400 150 Q 500 240 560 225" fill="none" stroke="#F9A825" strokeWidth="2" strokeDasharray="6 4" opacity="0.8" />
              {/* Drone position */}
              <circle cx="560" cy="225" r="5" fill="#F9A825" opacity="0.8" />
              <circle cx="560" cy="225" r="10" fill="none" stroke="#F9A825" strokeWidth="1.5" opacity="0.5">
                <animate attributeName="r" values="10;18;10" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
            {/* Overlay Content */}
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mx-auto mb-3">
                <Plane className="w-8 h-8 text-krishiva-green" />
              </div>
              <p className="font-poppins font-semibold text-text-primary">Track your drone in real-time</p>
              <p className="text-sm text-text-secondary mt-1">Live GPS tracking available during active flights</p>
              <div className="flex items-center justify-center gap-4 mt-3">
                <div className="flex items-center gap-1 text-xs text-text-secondary">
                  <Clock className="w-3.5 h-3.5" />
                  <span>ETA: ~15 min</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-krishiva-green">
                  <Check className="w-3.5 h-3.5" />
                  <span>6 of 12 acres done</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── My Bookings ── */}
        <div className="bg-white rounded-2xl border border-border-light shadow-card overflow-hidden">
          <button
            onClick={() => setMyBookingsExpanded(!myBookingsExpanded)}
            className="w-full flex items-center justify-between p-5 hover:bg-bg-primary/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <h2 className="font-poppins font-semibold text-lg text-text-primary">My Bookings</h2>
              <Badge className="bg-krishiva-green text-white border-0">{UPCOMING_BOOKINGS.length}</Badge>
            </div>
            <ChevronDown className={`w-5 h-5 text-text-muted transition-transform duration-200 ${myBookingsExpanded ? 'rotate-180' : ''}`} />
          </button>
          {myBookingsExpanded && (
            <div className="p-5 pt-0 space-y-3">
              {UPCOMING_BOOKINGS.map((booking, i) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-bg-primary border-l-4 border-krishiva-green"
                >
                  <div className="w-12 h-12 rounded-xl bg-krishiva-green/10 flex items-center justify-center shrink-0">
                    <Plane className="w-6 h-6 text-krishiva-green" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-text-primary">{booking.service}</p>
                      <Badge className="bg-success-green text-white text-[10px] border-0">{booking.status}</Badge>
                    </div>
                    <p className="text-sm text-text-secondary">{booking.field} — {booking.acres} acres</p>
                    <p className="text-xs text-text-muted">{booking.date}, {booking.slot}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-semibold text-krishiva-green">₹{booking.cost}</p>
                    <p className="text-xs text-text-secondary">{booking.operator}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      <DroneBookingModal
        operator={selectedOperator}
        open={bookingOpen}
        onClose={() => { setBookingOpen(false); setSelectedOperator(null); }}
      />
    </DashboardLayout>
  );
}
