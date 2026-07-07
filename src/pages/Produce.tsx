import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  MapPin,
  Search,
  Phone,
  MessageCircle,
  Star,
  Bell,
  Upload,
  Wheat,
  Package,
  Eye,
  Edit3,
  Trash2,
  CheckCircle2,
  Clock,
  ShoppingCart,
  Send,
  Users,
  X,
  Store,
  Sprout,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

/* ──────────────────────────── mock data ──────────────────────────── */

interface PriceTicker {
  crop: string;
  price: number;
  trend: 'up' | 'down' | 'flat';
  change: string;
}

const PRICE_TICKER: PriceTicker[] = [
  { crop: 'Cotton', price: 6420, trend: 'up', change: '+2.3%' },
  { crop: 'Chili', price: 12800, trend: 'up', change: '+4.1%' },
  { crop: 'Tomato', price: 2400, trend: 'down', change: '-1.5%' },
  { crop: 'Paddy', price: 2040, trend: 'flat', change: '0.0%' },
  { crop: 'Onion', price: 3200, trend: 'up', change: '+3.2%' },
  { crop: 'Turmeric', price: 7800, trend: 'down', change: '-0.8%' },
];

const CROP_TYPES = ['Cotton', 'Chili', 'Tomato', 'Paddy', 'Onion', 'Turmeric', 'Wheat', 'Rice', 'Soybean'];

interface MyListing {
  id: string;
  crop: string;
  quantity: number;
  price: number;
  grade: string;
  status: 'Active' | 'Pending' | 'Sold';
  views: number;
  inquiries: number;
  listedAt: string;
}

const MY_LISTINGS: MyListing[] = [
  { id: 'L1', crop: 'Cotton', quantity: 50, price: 6400, grade: 'A', status: 'Active', views: 234, inquiries: 12, listedAt: '2 days ago' },
  { id: 'L2', crop: 'Chili', quantity: 30, price: 12500, grade: 'A', status: 'Pending', views: 89, inquiries: 5, listedAt: '1 day ago' },
  { id: 'L3', crop: 'Tomato', quantity: 100, price: 2350, grade: 'B', status: 'Sold', views: 456, inquiries: 28, listedAt: '5 days ago' },
];

interface SellerCard {
  id: string;
  name: string;
  location: string;
  crop: string;
  variety: string;
  quantity: number;
  price: number;
  grade: 'A' | 'B' | 'C';
  distance: string;
  rating: number;
  avatar: string;
}

const SELLER_CARDS: SellerCard[] = [
  { id: 'S1', name: 'Raju Patel', location: 'Ahmedabad, Gujarat', crop: 'Cotton', variety: 'Shankar-6', quantity: 50, price: 6380, grade: 'A', distance: '12 km', rating: 4.8, avatar: 'RP' },
  { id: 'S2', name: 'Anita Devi', location: 'Surat, Gujarat', crop: 'Chili', variety: 'Guntur Sannam', quantity: 30, price: 12700, grade: 'A', distance: '25 km', rating: 4.9, avatar: 'AD' },
  { id: 'S3', name: 'Mohammed Khan', location: 'Vadodara, Gujarat', crop: 'Tomato', variety: 'Pusa Ruby', quantity: 200, price: 2350, grade: 'B', distance: '8 km', rating: 4.5, avatar: 'MK' },
  { id: 'S4', name: 'Lakshmi Rao', location: 'Rajkot, Gujarat', crop: 'Onion', variety: 'Nashik Red', quantity: 80, price: 3150, grade: 'A', distance: '40 km', rating: 4.7, avatar: 'LR' },
  { id: 'S5', name: 'Dev Singh', location: 'Bhavnagar, Gujarat', crop: 'Turmeric', variety: 'Salem', quantity: 25, price: 7750, grade: 'A', distance: '55 km', rating: 4.6, avatar: 'DS' },
  { id: 'S6', name: 'Suresh Kumar', location: 'Jamnagar, Gujarat', crop: 'Paddy', variety: 'Basmati', quantity: 150, price: 2050, grade: 'B', distance: '70 km', rating: 4.4, avatar: 'SK' },
  { id: 'S7', name: 'Priya Sharma', location: 'Gandhinagar, Gujarat', crop: 'Cotton', variety: 'MCU-5', quantity: 75, price: 6450, grade: 'A', distance: '18 km', rating: 4.8, avatar: 'PS' },
  { id: 'S8', name: 'Gopal Yadav', location: 'Anand, Gujarat', crop: 'Wheat', variety: 'Sharbati', quantity: 120, price: 2450, grade: 'B', distance: '32 km', rating: 4.3, avatar: 'GY' },
];

interface Transaction {
  id: string;
  text: string;
  time: string;
}

const RECENT_TRANSACTIONS: Transaction[] = [
  { id: 'T1', text: 'Raju sold 50q Cotton for ₹3,20,000', time: '2 hours ago' },
  { id: 'T2', text: 'Anita bought 30q Chili for ₹3,60,000', time: '4 hours ago' },
  { id: 'T3', text: 'Dev sold 25q Turmeric for ₹1,95,000', time: '6 hours ago' },
  { id: 'T4', text: 'Priya bought 100q Paddy for ₹2,04,000', time: '8 hours ago' },
];

/* ──────────────────────────── animations ──────────────────────────── */

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0, 0, 0.2, 1] as [number, number, number, number] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

/* ──────────────────────────── helpers ──────────────────────────── */

function GradeBadge({ grade }: { grade: string }) {
  const colors: Record<string, string> = {
    A: 'bg-success-green/15 text-success-green border-success-green/30',
    B: 'bg-warning-amber/15 text-warning-amber border-warning-amber/30',
    C: 'bg-text-muted/15 text-text-muted border-text-muted/30',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold border ${colors[grade] || colors.C}`}>
      Grade {grade}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Active: 'bg-success-green text-white',
    Pending: 'bg-warning-amber text-white',
    Sold: 'bg-krishiva-green text-white',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${map[status] || 'bg-text-muted text-white'}`}>
      {status}
    </span>
  );
}

/* ──────────────────────────── sub-components ──────────────────────────── */

function PriceDiscoveryTicker() {
  return (
    <Card className="border-border-light shadow-card">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="font-poppins font-semibold text-heading-sm text-text-primary">Today&apos;s Mandi Prices</h3>
            <div className="flex items-center gap-1 text-krishiva-green text-sm">
              <MapPin className="w-3.5 h-3.5" />
              <span className="font-medium">Ahmedabad APMC</span>
            </div>
          </div>
          <button className="hidden sm:flex items-center gap-1 text-sm text-krishiva-green font-medium hover:underline">
            <Bell className="w-4 h-4" />
            Set Alert
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          {PRICE_TICKER.map((item) => (
            <motion.div
              key={item.crop}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="min-w-[140px] bg-bg-primary rounded-xl px-4 py-3 border border-border-light flex-shrink-0"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Wheat className="w-3.5 h-3.5 text-krishiva-green" />
                <span className="text-sm font-semibold text-text-primary">{item.crop}</span>
              </div>
              <div className="text-base font-bold text-text-primary">
                ₹{item.price.toLocaleString('en-IN')}/q
              </div>
              <div className={`flex items-center gap-0.5 text-xs font-medium mt-0.5 ${
                item.trend === 'up' ? 'text-success-green' : item.trend === 'down' ? 'text-error-red' : 'text-text-muted'
              }`}>
                {item.trend === 'up' && <TrendingUp className="w-3 h-3" />}
                {item.trend === 'down' && <TrendingDown className="w-3 h-3" />}
                {item.trend === 'flat' && <Minus className="w-3 h-3" />}
                {item.change}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function CounterOfferModal({ open, onClose, seller }: { open: boolean; onClose: () => void; seller: SellerCard | null }) {
  const [offerPrice, setOfferPrice] = useState('');
  const [offerQty, setOfferQty] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setOfferPrice(seller ? String(Math.round(seller.price * 0.95)) : '');
      setOfferQty('20');
    }
  }, [open, seller]);

  const handleSend = () => {
    setSubmitted(true);
    setTimeout(() => { onClose(); }, 1500);
  };

  if (!seller) return null;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-poppins text-heading-md">Make Counter Offer</DialogTitle>
        </DialogHeader>
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 pt-2">
              <div className="flex items-center gap-3 p-3 bg-bg-primary rounded-xl">
                <div className="w-10 h-10 rounded-full bg-krishiva-green flex items-center justify-center text-white font-semibold text-sm">
                  {seller.avatar}
                </div>
                <div>
                  <p className="font-semibold text-text-primary text-sm">{seller.name}</p>
                  <p className="text-xs text-text-muted">{seller.crop} — {seller.variety}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-text-secondary mb-1 block">Your Quantity (q)</label>
                  <Input
                    type="number"
                    value={offerQty}
                    onChange={(e) => setOfferQty(e.target.value)}
                    className="h-12 rounded-xl border-border-light"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-text-secondary mb-1 block">Your Price (₹/q)</label>
                  <Input
                    type="number"
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(e.target.value)}
                    className="h-12 rounded-xl border-border-light"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-bg-primary rounded-xl text-sm">
                <span className="text-text-secondary">Seller&apos;s price</span>
                <span className="font-semibold text-text-primary">₹{seller.price.toLocaleString('en-IN')}/q</span>
              </div>
              <Button
                onClick={handleSend}
                className="w-full h-12 bg-krishiva-green hover:bg-[#1B5E20] text-white rounded-xl font-medium shadow-button"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Offer
              </Button>
            </motion.div>
          ) : (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-success-green/15 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-success-green" />
              </div>
              <h4 className="font-poppins font-semibold text-text-primary text-lg mb-1">Offer Sent!</h4>
              <p className="text-text-secondary text-sm">Your offer has been sent to {seller.name}. They will respond shortly.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

function SellerListingCard({ seller, index, onContact, onOffer }: {
  seller: SellerCard; index: number;
  onContact: (s: SellerCard) => void; onOffer: (s: SellerCard) => void;
}) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-2xl border border-border-light shadow-card hover:shadow-card-hover transition-all duration-200 overflow-hidden"
    >
      <div className="p-5">
        {/* Seller header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-krishiva-green to-leaf-green flex items-center justify-center text-white font-semibold text-sm shrink-0">
            {seller.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-poppins font-semibold text-text-primary truncate">{seller.name}</h4>
              <GradeBadge grade={seller.grade} />
            </div>
            <div className="flex items-center gap-1 text-text-muted text-xs mt-0.5">
              <MapPin className="w-3 h-3" />
              {seller.location} • {seller.distance}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-3.5 h-3.5 fill-harvest-gold text-harvest-gold" />
              <span className="text-xs font-medium text-text-primary">{seller.rating}</span>
            </div>
          </div>
        </div>

        {/* Crop details */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <Package className="w-4 h-4 text-krishiva-green" />
            <span className="font-semibold text-text-primary">{seller.crop} ({seller.variety})</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div>
              <span className="text-xs text-text-muted">Available</span>
              <p className="font-semibold text-text-primary">{seller.quantity} quintals</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-text-muted">Price</span>
              <p className="font-bold text-krishiva-green text-lg">₹{seller.price.toLocaleString('en-IN')}/q</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            onClick={() => onContact(seller)}
            className="flex-1 h-10 bg-krishiva-green hover:bg-[#1B5E20] text-white rounded-xl text-sm font-medium shadow-button"
          >
            <Phone className="w-3.5 h-3.5 mr-1.5" />
            Contact
          </Button>
          <Button
            onClick={() => onOffer(seller)}
            variant="outline"
            className="flex-1 h-10 border-2 border-krishiva-green text-krishiva-green hover:bg-krishiva-green/5 rounded-xl text-sm font-medium"
          >
            <Send className="w-3.5 h-3.5 mr-1.5" />
            Make Offer
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function SellFormSection() {
  const [crop, setCrop] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [grade, setGrade] = useState('');
  const [location, setLocation] = useState('Ahmedabad, Gujarat');
  const [showEstimator, setShowEstimator] = useState(false);

  const handleEstimate = () => {
    if (crop && quantity) {
      setShowEstimator(true);
    }
  };

  const tickerPrice = PRICE_TICKER.find(p => p.crop === crop)?.price || 6400;
  const qtyNum = parseInt(quantity) || 0;
  const estimatedTotal = tickerPrice * qtyNum;

  return (
    <Card className="border-border-light shadow-card overflow-hidden">
      <div className="p-5 pb-0">
        <h3 className="font-poppins font-semibold text-heading-md text-text-primary flex items-center gap-2">
          <Upload className="w-5 h-5 text-krishiva-green" />
          Create Listing
        </h3>
      </div>
      <CardContent className="p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-text-secondary mb-1.5 block">Crop Type</label>
            <Select value={crop} onValueChange={(v) => { setCrop(v); setShowEstimator(false); }}>
              <SelectTrigger className="h-12 rounded-xl border-border-light">
                <SelectValue placeholder="Select crop" />
              </SelectTrigger>
              <SelectContent>
                {CROP_TYPES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium text-text-secondary mb-1.5 block">Quantity (quintals)</label>
            <Input
              type="number"
              placeholder="e.g. 50"
              value={quantity}
              onChange={(e) => { setQuantity(e.target.value); setShowEstimator(false); }}
              className="h-12 rounded-xl border-border-light"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text-secondary mb-1.5 block">Expected Price (₹/quintal)</label>
            <Input
              type="number"
              placeholder="e.g. 6400"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="h-12 rounded-xl border-border-light"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text-secondary mb-1.5 block">Quality Grade</label>
            <Select value={grade} onValueChange={setGrade}>
              <SelectTrigger className="h-12 rounded-xl border-border-light">
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">Grade A — Premium</SelectItem>
                <SelectItem value="B">Grade B — Standard</SelectItem>
                <SelectItem value="C">Grade C — Basic</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-text-secondary mb-1.5 block">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-12 rounded-xl border-border-light pl-10"
            />
          </div>
        </div>

        {/* Photo upload placeholder */}
        <div>
          <label className="text-sm font-medium text-text-secondary mb-1.5 block">Photos</label>
          <div className="border-2 border-dashed border-border-light rounded-xl p-6 text-center hover:border-border-green transition-colors cursor-pointer">
            <Upload className="w-8 h-8 text-text-muted mx-auto mb-2" />
            <p className="text-sm text-text-muted">Tap to upload photos of your produce</p>
            <p className="text-xs text-text-muted mt-1">Up to 5 photos</p>
          </div>
        </div>

        {/* Price Estimator */}
        {showEstimator && crop && qtyNum > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-krishiva-green/5 border border-krishiva-green/20 rounded-xl"
          >
            <p className="text-sm text-text-secondary">
              Based on current market rate of <span className="font-semibold text-krishiva-green">₹{tickerPrice.toLocaleString('en-IN')}/q</span> for {crop}, your <span className="font-semibold">{qtyNum} quintals</span> can fetch approximately:
            </p>
            <p className="text-2xl font-bold text-krishiva-green mt-2">
              ₹{estimatedTotal.toLocaleString('en-IN')}
            </p>
          </motion.div>
        )}

        <div className="flex gap-3 pt-2">
          <Button
            onClick={handleEstimate}
            variant="outline"
            className="h-12 px-6 border-2 border-krishiva-green text-krishiva-green hover:bg-krishiva-green/5 rounded-xl font-medium"
          >
            Get Price Estimate
          </Button>
          <Button className="flex-1 h-12 bg-harvest-gold hover:bg-[#FBC02D] text-text-primary rounded-xl font-semibold shadow-gold">
            Publish Listing
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function MyListingsSection({ listings, onEdit }: { listings: MyListing[]; onEdit: (l: MyListing) => void }) {
  return (
    <div>
      <h3 className="font-poppins font-semibold text-heading-md text-text-primary mb-4 flex items-center gap-2">
        <Package className="w-5 h-5 text-krishiva-green" />
        My Listings
      </h3>
      <div className="space-y-3">
        {listings.map((listing, i) => (
          <motion.div
            key={listing.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-2xl border border-border-light shadow-card p-4 sm:p-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-12 h-12 rounded-xl bg-krishiva-green/10 flex items-center justify-center">
                  <Wheat className="w-6 h-6 text-krishiva-green" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-text-primary">{listing.crop}</h4>
                    <GradeBadge grade={listing.grade} />
                    <StatusBadge status={listing.status} />
                  </div>
                  <p className="text-sm text-text-muted mt-0.5">
                    {listing.quantity}q • ₹{listing.price.toLocaleString('en-IN')}/q • Listed {listing.listedAt}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-text-muted">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {listing.views}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {listing.inquiries}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(listing)}
                  className="p-2 rounded-lg hover:bg-bg-primary text-text-muted hover:text-krishiva-green transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg hover:bg-bg-primary text-text-muted hover:text-error-red transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function EditListingDialog({
  open,
  onClose,
  listing,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  listing: MyListing | null;
  onSave: (updated: MyListing) => void;
}) {
  const [crop, setCrop] = useState(listing?.crop || '');
  const [quantity, setQuantity] = useState(String(listing?.quantity || ''));
  const [price, setPrice] = useState(String(listing?.price || ''));
  const [grade, setGrade] = useState(listing?.grade || '');
  const [status, setStatus] = useState<MyListing['status']>(listing?.status || 'Active');

  useEffect(() => {
    if (listing) {
      setCrop(listing.crop);
      setQuantity(String(listing.quantity));
      setPrice(String(listing.price));
      setGrade(listing.grade);
      setStatus(listing.status);
    }
  }, [listing]);

  const handleSave = () => {
    if (!listing) return;
    onSave({
      ...listing,
      crop,
      quantity: parseInt(quantity) || listing.quantity,
      price: parseInt(price) || listing.price,
      grade,
      status,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-poppins text-heading-md flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-krishiva-green" />
            Edit Listing
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div>
            <label className="text-sm font-medium text-text-secondary mb-1.5 block">Crop Type</label>
            <Select value={crop} onValueChange={setCrop}>
              <SelectTrigger className="h-12 rounded-xl border-border-light">
                <SelectValue placeholder="Select crop" />
              </SelectTrigger>
              <SelectContent>
                {CROP_TYPES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-text-secondary mb-1.5 block">Quantity (q)</label>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="h-12 rounded-xl border-border-light"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-text-secondary mb-1.5 block">Price (₹/q)</label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="h-12 rounded-xl border-border-light"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-text-secondary mb-1.5 block">Grade</label>
              <Select value={grade} onValueChange={setGrade}>
                <SelectTrigger className="h-12 rounded-xl border-border-light">
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">Grade A — Premium</SelectItem>
                  <SelectItem value="B">Grade B — Standard</SelectItem>
                  <SelectItem value="C">Grade C — Basic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-text-secondary mb-1.5 block">Status</label>
              <Select value={status} onValueChange={(v) => setStatus(v as MyListing['status'])}>
                <SelectTrigger className="h-12 rounded-xl border-border-light">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Sold">Sold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 h-12 border-2 border-border-light text-text-secondary hover:bg-bg-primary rounded-xl font-medium"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 h-12 bg-krishiva-green hover:bg-[#1B5E20] text-white rounded-xl font-medium shadow-button"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function RecentTransactions() {
  return (
    <div>
      <h3 className="font-poppins font-semibold text-heading-sm text-text-primary mb-3 flex items-center gap-2">
        <Clock className="w-4 h-4 text-krishiva-green" />
        Recent Deals in Your Area
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {RECENT_TRANSACTIONS.map((tx) => (
          <div
            key={tx.id}
            className="min-w-[260px] bg-white rounded-xl border border-border-light shadow-card p-4 flex-shrink-0"
          >
            <p className="text-sm text-text-primary font-medium">{tx.text}</p>
            <p className="text-xs text-text-muted mt-1">{tx.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────── main page ──────────────────────────── */

export default function Produce() {
  const [role, setRole] = useState<'sell' | 'buy'>('sell');
  const [showSellForm, setShowSellForm] = useState(false);
  const [counterModalOpen, setCounterModalOpen] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState<SellerCard | null>(null);
  const [filterCrop, setFilterCrop] = useState('All');
  const [contactSheetOpen, setContactSheetOpen] = useState(false);
  const [contactSeller, setContactSeller] = useState<SellerCard | null>(null);
  const [myListings, setMyListings] = useState<MyListing[]>(MY_LISTINGS);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<MyListing | null>(null);

  const handleContact = useCallback((seller: SellerCard) => {
    setContactSeller(seller);
    setContactSheetOpen(true);
  }, []);

  const handleMakeOffer = useCallback((seller: SellerCard) => {
    setSelectedSeller(seller);
    setCounterModalOpen(true);
  }, []);

  const handleEditListing = useCallback((listing: MyListing) => {
    setEditingListing(listing);
    setEditDialogOpen(true);
  }, []);

  const handleSaveListing = useCallback((updated: MyListing) => {
    setMyListings((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
  }, []);

  const filteredSellers = filterCrop === 'All'
    ? SELLER_CARDS
    : SELLER_CARDS.filter(s => s.crop === filterCrop);

  return (
    <DashboardLayout>
      <div className="max-w-[1200px] mx-auto space-y-6 pb-8">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative rounded-2xl overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/produce-hero.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-krishiva-green/90 via-krishiva-green/75 to-transparent" />
          <div className="relative p-6 sm:p-10">
            <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-white mb-2">
              {role === 'sell' ? 'Sell Your Crop Directly' : 'Buy Quality Crop'}
            </h1>
            <p className="text-white/85 text-sm sm:text-base max-w-md mb-4">
              {role === 'sell'
                ? 'Connect with buyers across 500+ mandis. No middlemen, better prices.'
                : 'Connect directly with farmers. Fresh crops, fair prices, verified quality.'}
            </p>
            {role === 'sell' && (
              <Button
                onClick={() => setShowSellForm(!showSellForm)}
                className="h-12 px-6 bg-harvest-gold hover:bg-[#FBC02D] text-text-primary rounded-xl font-semibold shadow-gold"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {showSellForm ? 'Hide Form' : 'Sell Your Crop'}
              </Button>
            )}
          </div>
        </motion.div>

        {/* Role Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex bg-white rounded-xl border border-border-light p-1.5 w-fit"
        >
          <button
            onClick={() => setRole('sell')}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              role === 'sell'
                ? 'bg-krishiva-green text-white shadow-button'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Sprout className="w-4 h-4" />
            Sell Crop
          </button>
          <button
            onClick={() => setRole('buy')}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              role === 'buy'
                ? 'bg-krishiva-green text-white shadow-button'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Store className="w-4 h-4" />
            Buy Crop
          </button>
        </motion.div>

        {/* Price Discovery Ticker — always visible */}
        <PriceDiscoveryTicker />

        <AnimatePresence mode="wait">
          {role === 'sell' ? (
            <motion.div
              key="sell-view"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Sell Form */}
              <AnimatePresence>
                {showSellForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SellFormSection />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* My Listings */}
              <MyListingsSection listings={myListings} onEdit={handleEditListing} />

              {/* Recent Transactions */}
              <RecentTransactions />
            </motion.div>
          ) : (
            <motion.div
              key="buy-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Available Crops Section Title */}
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5 text-krishiva-green" />
                <h3 className="font-poppins font-semibold text-heading-md text-text-primary">
                  Available Crops from Farmers
                </h3>
              </div>

              {/* Search & Filter Bar */}
              <Card className="border-border-light shadow-card">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <Input
                        placeholder="Search by crop, farmer name..."
                        className="h-12 rounded-xl border-border-light pl-10"
                      />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Select value={filterCrop} onValueChange={setFilterCrop}>
                        <SelectTrigger className="h-12 w-[140px] rounded-xl border-border-light">
                          <SelectValue placeholder="Crop" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">All Crops</SelectItem>
                          {CROP_TYPES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <Select defaultValue="any">
                        <SelectTrigger className="h-12 w-[130px] rounded-xl border-border-light">
                          <SelectValue placeholder="Qty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any Qty</SelectItem>
                          <SelectItem value="lt10">&lt; 10q</SelectItem>
                          <SelectItem value="10-50">10-50q</SelectItem>
                          <SelectItem value="50-100">50-100q</SelectItem>
                          <SelectItem value="gt100">&gt; 100q</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select defaultValue="nearby">
                        <SelectTrigger className="h-12 w-[140px] rounded-xl border-border-light">
                          <MapPin className="w-4 h-4 text-text-muted mr-1" />
                          <SelectValue placeholder="Location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nearby">Nearby</SelectItem>
                          <SelectItem value="50km">Within 50km</SelectItem>
                          <SelectItem value="100km">Within 100km</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Seller Cards Grid */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {filteredSellers.map((seller, i) => (
                  <SellerListingCard
                    key={seller.id}
                    seller={seller}
                    index={i}
                    onContact={handleContact}
                    onOffer={handleMakeOffer}
                  />
                ))}
              </motion.div>

              {/* Recent Transactions */}
              <RecentTransactions />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Listing Dialog */}
        <EditListingDialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          listing={editingListing}
          onSave={handleSaveListing}
        />

        {/* Counter Offer Modal */}
        <CounterOfferModal
          open={counterModalOpen}
          onClose={() => setCounterModalOpen(false)}
          seller={selectedSeller}
        />

        {/* Contact Seller Sheet */}
        <Sheet open={contactSheetOpen} onOpenChange={setContactSheetOpen}>
          <SheetContent side="right" className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle className="font-poppins text-heading-md">Contact Seller</SheetTitle>
            </SheetHeader>
            {contactSeller && (
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-4 p-4 bg-bg-primary rounded-xl">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-krishiva-green to-leaf-green flex items-center justify-center text-white font-bold text-lg">
                    {contactSeller.avatar}
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold text-text-primary">{contactSeller.name}</h4>
                    <div className="flex items-center gap-1 text-sm text-text-muted">
                      <MapPin className="w-3.5 h-3.5" />
                      {contactSeller.location}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 fill-harvest-gold text-harvest-gold" />
                      <span className="text-sm font-medium">{contactSeller.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-border-light rounded-xl space-y-2">
                  <p className="text-sm text-text-secondary">
                    <span className="font-semibold text-text-primary">Crop:</span> {contactSeller.crop} ({contactSeller.variety})
                  </p>
                  <p className="text-sm text-text-secondary">
                    <span className="font-semibold text-text-primary">Available:</span> {contactSeller.quantity}q
                  </p>
                  <p className="text-sm text-text-secondary">
                    <span className="font-semibold text-text-primary">Price:</span>{' '}
                    <span className="text-krishiva-green font-bold">₹{contactSeller.price.toLocaleString('en-IN')}/q</span>
                  </p>
                </div>

                <div className="space-y-3">
                  <Button className="w-full h-12 bg-krishiva-green hover:bg-[#1B5E20] text-white rounded-xl font-medium shadow-button">
                    <Phone className="w-4 h-4 mr-2" />
                    Call {contactSeller.name.split(' ')[0]}
                  </Button>
                  <Button variant="outline" className="w-full h-12 border-2 border-krishiva-green text-krishiva-green hover:bg-krishiva-green/5 rounded-xl font-medium">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </DashboardLayout>
  );
}
