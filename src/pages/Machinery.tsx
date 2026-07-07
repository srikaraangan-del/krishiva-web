import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Mic,
  Phone,
  Calendar,
  Star,
  Cog,
  Plus,
  Tractor,
  Wheat,
  Droplets,
  Grid3x3,
  LayoutGrid,
  Wind,
  Minus,
  Image,
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import DashboardLayout from '@/components/DashboardLayout';

/* ─── Types ─── */
interface Machine {
  id: number;
  name: string;
  type: string;
  owner: string;
  ownerInitials: string;
  ownerColor: string;
  location: string;
  distance: string;
  pricePerDay: number;
  pricePerHour: number;
  rating: number;
  year: number;
  specs: string[];
  minDays: number;
  deposit: number;
  availability: ('available' | 'booked' | 'unavailable')[];
  withDriver: boolean;
}

interface MachineBooking {
  id: number;
  machineName: string;
  machineType: string;
  purpose: string;
  date: string;
  totalCost: number;
  status: 'Confirmed' | 'In Progress' | 'Completed';
}

/* ─── Category Config ─── */
const CATEGORIES = [
  { key: 'All', icon: LayoutGrid, label: 'All' },
  { key: 'Tractor', icon: Tractor, label: 'Tractor' },
  { key: 'Harvester', icon: Wheat, label: 'Harvester' },
  { key: 'Rotavator', icon: Cog, label: 'Rotavator' },
  { key: 'Seeder', icon: Grid3x3, label: 'Seeder' },
  { key: 'Sprayer', icon: Droplets, label: 'Sprayer' },
  { key: 'Tiller', icon: Wind, label: 'Tiller' },
  { key: 'Baler', icon: Minus, label: 'Baler' },
];

/* ─── Mock Data ─── */
const MACHINES: Machine[] = [
  { id: 1, name: 'Mahindra 575 DI Tractor', type: 'Tractor', owner: 'Suresh Kumar', ownerInitials: 'SK', ownerColor: '#2E7D32', location: 'Nagpur, MH', distance: '5 km', pricePerDay: 1500, pricePerHour: 200, rating: 4.6, year: 2022, specs: ['75 HP', '4WD', 'With Driver'], minDays: 2, deposit: 5000, availability: ['available', 'available', 'booked', 'available', 'available', 'unavailable', 'available'], withDriver: true },
  { id: 2, name: 'John Deere W70 Harvester', type: 'Harvester', owner: 'Ramesh Patel', ownerInitials: 'RP', ownerColor: '#F9A825', location: 'Nagpur, MH', distance: '8 km', pricePerDay: 3500, pricePerHour: 450, rating: 4.8, year: 2023, specs: ['100 HP', 'Combine', 'With Driver'], minDays: 1, deposit: 10000, availability: ['available', 'available', 'available', 'booked', 'booked', 'available', 'available'], withDriver: true },
  { id: 3, name: 'Swaraj 855 FE Rotavator', type: 'Rotavator', owner: 'Mahesh Yadav', ownerInitials: 'MY', ownerColor: '#8D6E63', location: 'Nagpur, MH', distance: '3 km', pricePerDay: 1200, pricePerHour: 160, rating: 4.3, year: 2021, specs: ['52 HP', '3WD', 'Self Operated'], minDays: 1, deposit: 3000, availability: ['available', 'unavailable', 'available', 'available', 'available', 'available', 'booked'], withDriver: false },
  { id: 4, name: 'Karat 9-row Seeder', type: 'Seeder', owner: 'Geeta Sharma', ownerInitials: 'GS', ownerColor: '#EC4899', location: 'Nagpur, MH', distance: '6 km', pricePerDay: 900, pricePerHour: 120, rating: 4.5, year: 2023, specs: ['9 Row', 'Precision', 'With Helper'], minDays: 1, deposit: 2000, availability: ['booked', 'available', 'available', 'available', 'booked', 'available', 'available'], withDriver: true },
  { id: 5, name: 'Stihl SR 450 Sprayer', type: 'Sprayer', owner: 'Anil Gupta', ownerInitials: 'AG', ownerColor: '#3B82F6', location: 'Nagpur, MH', distance: '4 km', pricePerDay: 800, pricePerHour: 100, rating: 4.1, year: 2022, specs: ['14L Tank', 'Backpack', 'Chemical Ready'], minDays: 1, deposit: 1500, availability: ['available', 'available', 'booked', 'booked', 'available', 'available', 'available'], withDriver: false },
  { id: 6, name: 'Kubota L4508 Tiller', type: 'Tiller', owner: 'Priya Singh', ownerInitials: 'PS', ownerColor: '#8B5CF6', location: 'Nagpur, MH', distance: '7 km', pricePerDay: 1100, pricePerHour: 150, rating: 4.7, year: 2023, specs: ['45 HP', 'Compact', 'With Driver'], minDays: 2, deposit: 3500, availability: ['available', 'available', 'available', 'available', 'available', 'available', 'available'], withDriver: true },
  { id: 7, name: 'John Deere 468 Baler', type: 'Baler', owner: 'Vikram Desai', ownerInitials: 'VD', ownerColor: '#EF4444', location: 'Nagpur, MH', distance: '12 km', pricePerDay: 2500, pricePerHour: 320, rating: 4.4, year: 2021, specs: ['Round Baler', '90 HP', 'With Driver'], minDays: 1, deposit: 8000, availability: ['booked', 'available', 'available', 'unavailable', 'available', 'booked', 'available'], withDriver: true },
  { id: 8, name: 'Sonalika DI 745 Tractor', type: 'Tractor', owner: 'Deepak Verma', ownerInitials: 'DV', ownerColor: '#66BB6A', location: 'Nagpur, MH', distance: '2 km', pricePerDay: 1300, pricePerHour: 175, rating: 4.0, year: 2020, specs: ['50 HP', '2WD', 'With Driver'], minDays: 2, deposit: 4000, availability: ['available', 'available', 'available', 'booked', 'available', 'available', 'unavailable'], withDriver: true },
];

const MY_MACHINE_BOOKINGS: MachineBooking[] = [
  { id: 1, machineName: 'Mahindra 575 DI', machineType: 'Tractor', purpose: 'Field Tilling', date: 'June 15, 2025', totalCost: 2000, status: 'Confirmed' },
  { id: 2, machineName: 'John Deere W70', machineType: 'Harvester', purpose: 'Wheat Harvesting', date: 'June 20, 2025', totalCost: 3500, status: 'Confirmed' },
  { id: 3, machineName: 'Swaraj 855 FE', machineType: 'Rotavator', purpose: 'Soil Preparation', date: 'May 28, 2025', totalCost: 1200, status: 'Completed' },
];

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

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

/* ─── Availability Dots ─── */
function AvailabilityStrip({ availability }: { availability: ('available' | 'booked' | 'unavailable')[] }) {
  return (
    <div className="flex items-center gap-3 mt-3">
      <span className="text-xs text-text-secondary shrink-0">Next 7 days:</span>
      <div className="flex items-center gap-1.5">
        {availability.map((status, i) => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <div className={`w-3 h-3 rounded-full ${
              status === 'available' ? 'bg-success-green' : status === 'booked' ? 'bg-error-red' : 'bg-gray-300'
            }`} />
            <span className="text-[9px] text-text-muted">{DAY_LABELS[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Booking Modal ─── */
function MachineBookingModal({ machine, open, onClose }: { machine: Machine | null; open: boolean; onClose: () => void }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState(8);

  if (!machine) return null;

  const numDays = startDate && endDate ? Math.max(1, Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1) : 1;
  const total = machine.pricePerDay * numDays;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-[500px] bg-white rounded-3xl p-0 overflow-hidden border-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="font-poppins text-xl font-semibold text-text-primary">Book Machine</DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Machine Summary */}
          <div className="flex items-center gap-3 p-3 bg-bg-primary rounded-xl">
            <div className="w-12 h-12 rounded-xl bg-krishiva-green/10 flex items-center justify-center">
              <Tractor className="w-6 h-6 text-krishiva-green" />
            </div>
            <div>
              <p className="font-poppins font-semibold text-text-primary">{machine.name}</p>
              <StarRating rating={machine.rating} />
            </div>
            <div className="ml-auto text-right">
              <p className="text-krishiva-green font-semibold">₹{machine.pricePerDay}<span className="text-xs text-text-secondary">/day</span></p>
            </div>
          </div>

          {/* Owner */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-medium" style={{ backgroundColor: machine.ownerColor }}>
              {machine.ownerInitials}
            </div>
            <span className="text-sm text-text-secondary">Owner: <span className="text-text-primary font-medium">{machine.owner}</span></span>
          </div>

          {/* Specs */}
          <div className="flex flex-wrap gap-2">
            {machine.specs.map((spec) => (
              <span key={spec} className="h-7 px-3 rounded-md bg-bg-primary text-text-secondary text-xs font-medium flex items-center">{spec}</span>
            ))}
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-text-secondary mb-1.5 block">Start Date</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full h-[48px] px-3 rounded-xl border border-border-light bg-white text-text-primary focus:border-krishiva-green focus:ring-[3px] focus:ring-krishiva-green/15 outline-none transition-all text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-text-secondary mb-1.5 block">End Date</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full h-[48px] px-3 rounded-xl border border-border-light bg-white text-text-primary focus:border-krishiva-green focus:ring-[3px] focus:ring-krishiva-green/15 outline-none transition-all text-sm" />
            </div>
          </div>

          {/* Hours per day */}
          <div>
            <label className="text-sm font-medium text-text-secondary mb-1.5 block">Hours per Day</label>
            <div className="flex gap-2">
              {[4, 8, 12].map((h) => (
                <button key={h} onClick={() => setHoursPerDay(h)} className={`h-10 px-4 rounded-xl text-sm font-medium transition-all ${hoursPerDay === h ? 'bg-krishiva-green text-white' : 'bg-bg-primary text-text-secondary hover:bg-krishiva-green/10'}`}>
                  {h}h
                </button>
              ))}
            </div>
          </div>

          {/* Delivery */}
          <div>
            <label className="text-sm font-medium text-text-secondary mb-1.5 block">Delivery Option</label>
            <div className="flex gap-2">
              {['Owner Brings', 'I Pick Up'].map((opt) => (
                <button key={opt} className="flex-1 h-10 px-3 rounded-xl text-sm font-medium bg-bg-primary text-text-secondary hover:bg-krishiva-green/10 transition-all border border-border-light hover:border-krishiva-green/30">
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="p-4 bg-bg-primary rounded-xl space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">₹{machine.pricePerDay}/day × {numDays} days</span>
              <span className="text-text-primary font-medium">₹{machine.pricePerDay * numDays}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Security deposit</span>
              <span className="text-text-primary font-medium">₹{machine.deposit}</span>
            </div>
            <div className="border-t border-border-light pt-2 flex justify-between">
              <span className="font-semibold text-text-primary">Total</span>
              <span className="font-bold text-krishiva-green text-lg">₹{total + machine.deposit}</span>
            </div>
            <p className="text-[10px] text-text-muted">Deposit refunded after machine return</p>
          </div>

          {/* Confirm */}
          <Button className="w-full h-[52px] bg-harvest-gold hover:bg-[#FBC02D] text-text-primary font-semibold rounded-xl shadow-gold transition-all hover:scale-[1.02] active:scale-[0.98]" onClick={onClose}>
            <Calendar className="w-4 h-4 mr-2" />
            Proceed to Payment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ─── List Machine Modal ─── */
function ListMachineModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-[500px] bg-white rounded-3xl p-0 overflow-hidden border-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="font-poppins text-xl font-semibold text-text-primary">List Your Machine</DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Machine Type */}
          <div>
            <label className="text-sm font-medium text-text-secondary mb-1.5 block">Machine Type</label>
            <select className="w-full h-[48px] px-4 rounded-xl border border-border-light bg-white text-text-primary focus:border-krishiva-green outline-none transition-all appearance-none text-sm">
              <option value="">Select type</option>
              {['Tractor', 'Harvester', 'Rotavator', 'Seeder', 'Sprayer', 'Tiller', 'Baler'].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Model */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-text-secondary mb-1.5 block">Brand</label>
              <input type="text" placeholder="e.g. Mahindra" className="w-full h-[48px] px-3 rounded-xl border border-border-light bg-white text-text-primary placeholder:text-text-muted focus:border-krishiva-green outline-none transition-all text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-text-secondary mb-1.5 block">Model</label>
              <input type="text" placeholder="e.g. 575 DI" className="w-full h-[48px] px-3 rounded-xl border border-border-light bg-white text-text-primary placeholder:text-text-muted focus:border-krishiva-green outline-none transition-all text-sm" />
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-text-secondary mb-1.5 block">Price/Day (₹)</label>
              <input type="number" placeholder="1500" className="w-full h-[48px] px-3 rounded-xl border border-border-light bg-white text-text-primary placeholder:text-text-muted focus:border-krishiva-green outline-none transition-all text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-text-secondary mb-1.5 block">Deposit (₹)</label>
              <input type="number" placeholder="5000" className="w-full h-[48px] px-3 rounded-xl border border-border-light bg-white text-text-primary placeholder:text-text-muted focus:border-krishiva-green outline-none transition-all text-sm" />
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="text-sm font-medium text-text-secondary mb-1.5 block">Minimum Booking (days)</label>
            <div className="flex gap-2">
              {[1, 2, 3, 5].map((d) => (
                <button key={d} className="h-10 px-4 rounded-xl text-sm font-medium bg-bg-primary text-text-secondary hover:bg-krishiva-green/10 transition-all border border-border-light">{d}</button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium text-text-secondary mb-1.5 block">Location</label>
            <input type="text" placeholder="Your farm location" className="w-full h-[48px] px-4 rounded-xl border border-border-light bg-white text-text-primary placeholder:text-text-muted focus:border-krishiva-green outline-none transition-all text-sm" />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="text-sm font-medium text-text-secondary mb-1.5 block">Photos</label>
            <div className="flex gap-2">
              <button className="w-20 h-20 rounded-xl border-2 border-dashed border-border-light flex flex-col items-center justify-center text-text-muted hover:border-krishiva-green hover:text-krishiva-green transition-colors">
                <Plus className="w-5 h-5" />
                <span className="text-[10px] mt-1">Add</span>
              </button>
              <div className="w-20 h-20 rounded-xl bg-bg-primary flex items-center justify-center">
                <Image className="w-6 h-6 text-text-muted" />
              </div>
            </div>
          </div>

          {/* Submit */}
          <Button className="w-full h-[52px] bg-krishiva-green hover:bg-[#1B5E20] text-white font-semibold rounded-xl shadow-button transition-all hover:scale-[1.02] active:scale-[0.98]" onClick={onClose}>
            List Machine
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ─── Main ─── */
export default function Machinery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [listMachineOpen, setListMachineOpen] = useState(false);

  const filtered = MACHINES.filter((m) => {
    const matchCat = activeCategory === 'All' || m.type === activeCategory;
    const matchSearch = searchQuery === '' || m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <DashboardLayout>
      <div className="max-w-[1200px] mx-auto space-y-6 pb-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-poppins font-bold text-2xl text-text-primary">Machinery</h1>
            <p className="text-text-secondary text-sm mt-0.5">Rent farm equipment</p>
          </div>
          <Button
            className="bg-harvest-gold hover:bg-[#FBC02D] text-text-primary font-semibold rounded-xl shadow-gold h-11 px-5"
            onClick={() => setListMachineOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            List Your Machine
          </Button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl p-5 shadow-card border border-border-light">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search tractors, harvesters, tillers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[52px] pl-12 pr-12 rounded-xl border border-border-light bg-white text-text-primary placeholder:text-text-muted focus:border-krishiva-green focus:ring-[3px] focus:ring-krishiva-green/15 outline-none transition-all text-base"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-krishiva-green/10 transition-colors">
              <Mic className="w-5 h-5 text-krishiva-green" />
            </button>
          </div>
        </div>

        {/* Category Tabs - Horizontal Scroll */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex items-center gap-1.5 h-9 px-4 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 shrink-0 ${
                activeCategory === cat.key
                  ? 'bg-krishiva-green text-white'
                  : 'bg-white text-text-secondary border border-border-light hover:border-krishiva-green/30'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Machine Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((machine, i) => (
            <motion.div
              key={machine.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-2xl border border-border-light shadow-card overflow-hidden hover:shadow-card-hover transition-shadow duration-200"
            >
              {/* Image Placeholder */}
              <div className="relative h-40 bg-gradient-to-br from-krishiva-green/10 to-leaf-green/10 flex items-center justify-center">
                <Tractor className="w-16 h-16 text-krishiva-green/30" />
                <Badge className={`absolute top-3 right-3 border-0 text-[10px] ${
                  machine.availability.filter(a => a === 'available').length >= 4
                    ? 'bg-success-green text-white'
                    : 'bg-warning-amber text-white'
                }`}>
                  {machine.availability.filter(a => a === 'available').length >= 4 ? 'Available' : 'Limited'}
                </Badge>
              </div>

              <div className="p-5">
                {/* Title */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-poppins font-semibold text-text-primary">{machine.name}</h3>
                    <p className="text-xs text-text-muted">({machine.year})</p>
                  </div>
                </div>

                {/* Owner */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-medium" style={{ backgroundColor: machine.ownerColor }}>
                    {machine.ownerInitials}
                  </div>
                  <span className="text-sm font-medium text-text-primary">{machine.owner}</span>
                  <StarRating rating={machine.rating} />
                  <span className="text-xs text-text-muted ml-auto">{machine.distance}</span>
                </div>

                {/* Specs */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {machine.specs.map((spec) => (
                    <span key={spec} className="h-7 px-3 rounded-md bg-bg-primary text-text-secondary text-xs font-medium flex items-center">{spec}</span>
                  ))}
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between mt-3">
                  <p className="text-krishiva-green font-semibold text-lg">₹{machine.pricePerDay}<span className="text-xs text-text-secondary font-normal">/day</span></p>
                  <div className="text-right">
                    <p className="text-xs text-text-muted">Min {machine.minDays} days</p>
                    <p className="text-xs text-text-muted">₹{machine.deposit} deposit</p>
                  </div>
                </div>

                {/* Availability Preview */}
                <AvailabilityStrip availability={machine.availability} />

                {/* Actions */}
                <div className="flex items-center gap-2.5 mt-4">
                  <Button variant="outline" className="flex-1 h-10 border-krishiva-green text-krishiva-green hover:bg-krishiva-green/5 rounded-xl text-sm font-medium">
                    <Phone className="w-4 h-4 mr-1.5" />
                    Call Owner
                  </Button>
                  <Button
                    className="flex-1 h-10 bg-harvest-gold hover:bg-[#FBC02D] text-text-primary rounded-xl text-sm font-semibold shadow-gold"
                    onClick={() => { setSelectedMachine(machine); setBookingOpen(true); }}
                  >
                    <Calendar className="w-4 h-4 mr-1.5" />
                    Book Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── My Bookings Accordion ── */}
        <Accordion type="single" collapsible defaultValue="bookings" className="bg-white rounded-2xl border border-border-light shadow-card overflow-hidden">
          <AccordionItem value="bookings" className="border-0">
            <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-bg-primary/50 [&[data-state=open]>svg]:rotate-180">
              <div className="flex items-center gap-2">
                <h2 className="font-poppins font-semibold text-lg text-text-primary">My Bookings</h2>
                <Badge className="bg-krishiva-green text-white border-0">{MY_MACHINE_BOOKINGS.length}</Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-4">
              <div className="space-y-3">
                {MY_MACHINE_BOOKINGS.map((booking, i) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    className={`flex items-center gap-4 p-4 rounded-xl bg-bg-primary border-l-4 ${
                      booking.status === 'Confirmed' ? 'border-success-green' :
                      booking.status === 'In Progress' ? 'border-blue-500' :
                      'border-gray-400'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-xl bg-krishiva-green/10 flex items-center justify-center shrink-0">
                      <Tractor className="w-7 h-7 text-krishiva-green" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-text-primary">{booking.machineName}</p>
                      <p className="text-sm text-text-secondary">{booking.purpose} • {booking.date}</p>
                      <p className="text-xs text-text-muted">{booking.machineType}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-semibold text-krishiva-green">₹{booking.totalCost}</p>
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Modals */}
      <MachineBookingModal
        machine={selectedMachine}
        open={bookingOpen}
        onClose={() => { setBookingOpen(false); setSelectedMachine(null); }}
      />
      <ListMachineModal open={listMachineOpen} onClose={() => setListMachineOpen(false)} />
    </DashboardLayout>
  );
}
