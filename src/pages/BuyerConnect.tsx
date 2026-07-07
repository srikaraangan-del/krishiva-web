import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserCheck,
  ShoppingBag,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Phone,
  Send,
  Wheat,
  MapPin,
  Star,
  ArrowRight,
  Users,
  Package,
  TrendingUp,
  Clock,
  ChevronRight,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

/* ──────────────────────────── types ──────────────────────────── */

interface IncomingOffer {
  id: string;
  company: string;
  initials: string;
  avatarColor: string;
  crop: string;
  quantity: number;
  pricePerQ: number;
  status: 'New' | 'Negotiating' | 'Accepted' | 'Declined';
  date: string;
}

interface FarmerListing {
  id: string;
  farmerName: string;
  initials: string;
  avatarColor: string;
  crop: string;
  quantity: number;
  price: number | null;
  location: string;
  rating: number;
  interestedBuyers: number;
}

interface MyCropListing {
  id: string;
  crop: string;
  quantity: number;
  price: number;
  grade: string;
  status: 'Active' | 'Pending' | 'Sold';
  interestedBuyers: number;
}

interface SentOffer {
  id: string;
  farmerName: string;
  crop: string;
  quantity: number;
  pricePerQ: number;
  status: 'Pending' | 'Accepted' | 'Declined';
  date: string;
}

/* ──────────────────────────── mock data ──────────────────────────── */

const INITIAL_OFFERS: IncomingOffer[] = [
  {
    id: 'O1',
    company: 'Agro Foods Ltd',
    initials: 'AF',
    avatarColor: 'bg-blue-500',
    crop: 'Cotton',
    quantity: 20,
    pricePerQ: 6200,
    status: 'New',
    date: '2 hours ago',
  },
  {
    id: 'O2',
    company: 'Venkatesh Traders',
    initials: 'VT',
    avatarColor: 'bg-orange-500',
    crop: 'Chili',
    quantity: 10,
    pricePerQ: 12500,
    status: 'Negotiating',
    date: '1 day ago',
  },
  {
    id: 'O3',
    company: 'Srinivas Exports',
    initials: 'SE',
    avatarColor: 'bg-emerald-500',
    crop: 'Paddy',
    quantity: 30,
    pricePerQ: 2000,
    status: 'Accepted',
    date: '3 days ago',
  },
];

const FARMER_LISTINGS: FarmerListing[] = [
  {
    id: 'FL1',
    farmerName: 'Rajesh Kumar',
    initials: 'RK',
    avatarColor: 'bg-green-600',
    crop: 'Cotton',
    quantity: 40,
    price: 6400,
    location: 'Guntur',
    rating: 4.8,
    interestedBuyers: 5,
  },
  {
    id: 'FL2',
    farmerName: 'Sita Devi',
    initials: 'SD',
    avatarColor: 'bg-pink-500',
    crop: 'Chili',
    quantity: 25,
    price: null,
    location: 'Prakasam',
    rating: 4.9,
    interestedBuyers: 8,
  },
  {
    id: 'FL3',
    farmerName: 'Mohan Reddy',
    initials: 'MR',
    avatarColor: 'bg-purple-600',
    crop: 'Paddy',
    quantity: 50,
    price: 2050,
    location: 'Nellore',
    rating: 4.6,
    interestedBuyers: 3,
  },
];

const MY_CROP_LISTINGS: MyCropListing[] = [
  { id: 'MC1', crop: 'Cotton', quantity: 50, price: 6400, grade: 'A', status: 'Active', interestedBuyers: 5 },
  { id: 'MC2', crop: 'Chili', quantity: 30, price: 12500, grade: 'A', status: 'Active', interestedBuyers: 8 },
  { id: 'MC3', crop: 'Paddy', quantity: 100, price: 2050, grade: 'B', status: 'Pending', interestedBuyers: 2 },
];

const INITIAL_SENT_OFFERS: SentOffer[] = [
  { id: 'SO1', farmerName: 'Rajesh Kumar', crop: 'Cotton', quantity: 20, pricePerQ: 6200, status: 'Pending', date: '1 day ago' },
  { id: 'SO2', farmerName: 'Sita Devi', crop: 'Chili', quantity: 15, pricePerQ: 12000, status: 'Accepted', date: '3 days ago' },
];

/* ──────────────────────────── animations ──────────────────────────── */

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0, 0, 0.2, 1] as [number, number, number, number] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

/* ──────────────────────────── helpers ──────────────────────────── */

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    New: 'bg-blue-500 text-white',
    Negotiating: 'bg-warning-amber text-white',
    Accepted: 'bg-success-green text-white',
    Declined: 'bg-error-red text-white',
    Pending: 'bg-warning-amber text-white',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${map[status] || 'bg-text-muted text-white'}`}>
      {status}
    </span>
  );
}

/* ──────────────────────────── sub-components ──────────────────────────── */

function HowItWorks() {
  const steps = [
    { num: '1', title: 'Buyer sends offer', desc: 'Buyers discover your crops and send price offers' },
    { num: '2', title: 'You review & respond', desc: 'Accept, decline, or counter the offer' },
    { num: '3', title: 'Deal confirmed!', desc: 'Connect directly and complete the sale' },
  ];

  return (
    <Card className="border-border-light shadow-card">
      <CardContent className="p-5">
        <h3 className="font-poppins font-semibold text-heading-sm text-text-primary mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-krishiva-green" />
          How It Works
        </h3>
        <div className="flex flex-col sm:flex-row gap-4">
          {steps.map((step, i) => (
            <div key={step.num} className="flex-1 flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-krishiva-green text-white flex items-center justify-center font-bold text-sm shrink-0">
                {step.num}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <p className="font-semibold text-text-primary text-sm">{step.title}</p>
                  {i < steps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-text-muted hidden sm:block ml-1" />
                  )}
                </div>
                <p className="text-xs text-text-muted mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function FarmerCropListings() {
  return (
    <div>
      <h3 className="font-poppins font-semibold text-heading-md text-text-primary mb-4 flex items-center gap-2">
        <Package className="w-5 h-5 text-krishiva-green" />
        My Crop Listings
      </h3>
      <div className="space-y-3">
        {MY_CROP_LISTINGS.map((listing, i) => (
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
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold border bg-success-green/15 text-success-green border-success-green/30">
                      Grade {listing.grade}
                    </span>
                    <StatusBadge status={listing.status} />
                  </div>
                  <p className="text-sm text-text-muted mt-0.5">
                    {listing.quantity}q • ₹{listing.price.toLocaleString('en-IN')}/q
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <Users className="w-4 h-4" />
                <span>{listing.interestedBuyers} interested buyers</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SendOfferDialog({
  open,
  onClose,
  listing,
}: {
  open: boolean;
  onClose: () => void;
  listing: FarmerListing | null;
}) {
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!listing) return null;

  const handleSend = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setPrice('');
      setQuantity('');
      setMessage('');
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-poppins text-heading-md">Send Offer</DialogTitle>
        </DialogHeader>
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4 pt-2"
            >
              <div className="flex items-center gap-3 p-3 bg-bg-primary rounded-xl">
                <div className={`w-10 h-10 rounded-full ${listing.avatarColor} flex items-center justify-center text-white font-semibold text-sm`}>
                  {listing.initials}
                </div>
                <div>
                  <p className="font-semibold text-text-primary text-sm">{listing.farmerName}</p>
                  <p className="text-xs text-text-muted">
                    {listing.crop} — {listing.quantity}q — {listing.location}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-text-secondary mb-1 block">Quantity (q)</label>
                  <Input
                    type="number"
                    placeholder="e.g. 20"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="h-12 rounded-xl border-border-light"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-text-secondary mb-1 block">Price per Quintal (₹)</label>
                  <Input
                    type="number"
                    placeholder={listing.price ? String(listing.price) : 'Enter price'}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="h-12 rounded-xl border-border-light"
                  />
                </div>
              </div>

              {listing.price && (
                <div className="flex items-center justify-between p-3 bg-bg-primary rounded-xl text-sm">
                  <span className="text-text-secondary">Farmer&apos;s asking price</span>
                  <span className="font-semibold text-krishiva-green">₹{listing.price.toLocaleString('en-IN')}/q</span>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-text-secondary mb-1 block">Message</label>
                <Textarea
                  placeholder="Add a message to the farmer..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="rounded-xl border-border-light min-h-[80px]"
                />
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
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-success-green/15 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-success-green" />
              </div>
              <h4 className="font-poppins font-semibold text-text-primary text-lg mb-1">Offer Sent!</h4>
              <p className="text-text-secondary text-sm">
                Your offer has been sent to {listing.farmerName}. They will respond shortly.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

/* ──────────────────────────── main page ──────────────────────────── */

export default function BuyerConnect() {
  const [role, setRole] = useState<'farmer' | 'buyer'>('farmer');
  const [offers, setOffers] = useState<IncomingOffer[]>(INITIAL_OFFERS);
  const [sendOfferOpen, setSendOfferOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<FarmerListing | null>(null);

  const handleAccept = (id: string) => {
    setOffers((prev) => prev.map((o) => (o.id === id ? { ...o, status: 'Accepted' as const } : o)));
  };

  const handleDecline = (id: string) => {
    setOffers((prev) => prev.map((o) => (o.id === id ? { ...o, status: 'Declined' as const } : o)));
  };

  const handleOpenSendOffer = (listing: FarmerListing) => {
    setSelectedListing(listing);
    setSendOfferOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="max-w-[1200px] mx-auto space-y-6 pb-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-text-primary mb-2">
            Buyer Connect
          </h1>
          <p className="text-text-secondary text-sm sm:text-base max-w-lg">
            {role === 'farmer'
              ? 'Manage incoming offers from buyers and respond to them directly.'
              : 'Discover crops from verified farmers and send offers seamlessly.'}
          </p>
        </motion.div>

        {/* Role Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex bg-white rounded-xl border border-border-light p-1.5 w-fit"
        >
          <button
            onClick={() => setRole('farmer')}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              role === 'farmer'
                ? 'bg-krishiva-green text-white shadow-button'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            I am a Farmer
          </button>
          <button
            onClick={() => setRole('buyer')}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              role === 'buyer'
                ? 'bg-krishiva-green text-white shadow-button'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            I am a Buyer
          </button>
        </motion.div>

        <AnimatePresence mode="wait">
          {role === 'farmer' ? (
            <motion.div
              key="farmer-view"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Incoming Offers */}
              <div>
                <h3 className="font-poppins font-semibold text-heading-md text-text-primary mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-krishiva-green" />
                  Incoming Offers
                </h3>
                <div className="space-y-3">
                  {offers.map((offer, i) => (
                    <motion.div
                      key={offer.id}
                      custom={i}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      className="bg-white rounded-2xl border border-border-light shadow-card p-4 sm:p-5"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        {/* Company Info */}
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`w-12 h-12 rounded-full ${offer.avatarColor} flex items-center justify-center text-white font-semibold text-sm shrink-0`}>
                            {offer.initials}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-semibold text-text-primary">{offer.company}</h4>
                              <StatusBadge status={offer.status} />
                            </div>
                            <p className="text-sm text-text-muted mt-0.5">
                              Wants <span className="font-medium text-text-primary">{offer.crop}</span> —{' '}
                              {offer.quantity}q @{' '}
                              <span className="font-semibold text-krishiva-green">
                                ₹{offer.pricePerQ.toLocaleString('en-IN')}/q
                              </span>
                            </p>
                            <p className="text-xs text-text-muted mt-0.5 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {offer.date}
                            </p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 flex-wrap">
                          {offer.status === 'New' && (
                            <>
                              <Button
                                onClick={() => handleAccept(offer.id)}
                                className="h-10 px-4 bg-krishiva-green hover:bg-[#1B5E20] text-white rounded-xl text-sm font-medium shadow-button"
                              >
                                <Check className="w-4 h-4 mr-1.5" />
                                Accept
                              </Button>
                              <Button
                                onClick={() => handleDecline(offer.id)}
                                variant="outline"
                                className="h-10 px-4 border-2 border-error-red text-error-red hover:bg-error-red/5 rounded-xl text-sm font-medium"
                              >
                                <XCircle className="w-4 h-4 mr-1.5" />
                                Decline
                              </Button>
                            </>
                          )}
                          {offer.status === 'Negotiating' && (
                            <>
                              <Button
                                variant="outline"
                                className="h-10 px-4 border-2 border-krishiva-green text-krishiva-green hover:bg-krishiva-green/5 rounded-xl text-sm font-medium"
                              >
                                <ChevronRight className="w-4 h-4 mr-1.5" />
                                Counter
                              </Button>
                              <Button
                                onClick={() => handleAccept(offer.id)}
                                className="h-10 px-4 bg-krishiva-green hover:bg-[#1B5E20] text-white rounded-xl text-sm font-medium shadow-button"
                              >
                                <Check className="w-4 h-4 mr-1.5" />
                                Accept
                              </Button>
                              <Button
                                onClick={() => handleDecline(offer.id)}
                                variant="outline"
                                className="h-10 px-4 border-2 border-error-red text-error-red hover:bg-error-red/5 rounded-xl text-sm font-medium"
                              >
                                <XCircle className="w-4 h-4 mr-1.5" />
                                Decline
                              </Button>
                            </>
                          )}
                          {offer.status === 'Accepted' && (
                            <Button className="h-10 px-4 bg-harvest-gold hover:bg-[#FBC02D] text-text-primary rounded-xl text-sm font-medium shadow-gold">
                              <Phone className="w-4 h-4 mr-1.5" />
                              Contact Buyer
                            </Button>
                          )}
                          {offer.status === 'Declined' && (
                            <span className="text-sm text-text-muted px-3 py-2">Offer declined</span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* How It Works */}
              <HowItWorks />

              {/* My Crop Listings */}
              <FarmerCropListings />
            </motion.div>
          ) : (
            <motion.div
              key="buyer-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Available Crop Listings */}
              <div>
                <h3 className="font-poppins font-semibold text-heading-md text-text-primary mb-4 flex items-center gap-2">
                  <Wheat className="w-5 h-5 text-krishiva-green" />
                  Available Crop Listings
                </h3>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {FARMER_LISTINGS.map((listing, i) => (
                    <motion.div
                      key={listing.id}
                      custom={i}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      className="bg-white rounded-2xl border border-border-light shadow-card hover:shadow-card-hover transition-all duration-200 overflow-hidden"
                    >
                      <div className="p-5">
                        {/* Farmer header */}
                        <div className="flex items-start gap-3 mb-4">
                          <div className={`w-12 h-12 rounded-full ${listing.avatarColor} flex items-center justify-center text-white font-semibold text-sm shrink-0`}>
                            {listing.initials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-poppins font-semibold text-text-primary truncate">{listing.farmerName}</h4>
                            <div className="flex items-center gap-1 text-text-muted text-xs mt-0.5">
                              <MapPin className="w-3 h-3" />
                              {listing.location}
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="w-3.5 h-3.5 fill-harvest-gold text-harvest-gold" />
                              <span className="text-xs font-medium text-text-primary">{listing.rating}</span>
                            </div>
                          </div>
                        </div>

                        {/* Crop details */}
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <Package className="w-4 h-4 text-krishiva-green" />
                            <span className="font-semibold text-text-primary">{listing.crop}</span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div>
                              <span className="text-xs text-text-muted">Available</span>
                              <p className="font-semibold text-text-primary">{listing.quantity} quintals</p>
                            </div>
                            <div className="text-right">
                              <span className="text-xs text-text-muted">Price</span>
                              <p className="font-bold text-krishiva-green text-lg">
                                {listing.price ? `₹${listing.price.toLocaleString('en-IN')}/q` : 'Contact for Price'}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Send Offer Button */}
                        <Button
                          onClick={() => handleOpenSendOffer(listing)}
                          className="w-full h-11 bg-krishiva-green hover:bg-[#1B5E20] text-white rounded-xl font-medium shadow-button"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Send Offer
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* My Sent Offers */}
              <div>
                <h3 className="font-poppins font-semibold text-heading-md text-text-primary mb-4 flex items-center gap-2">
                  <Send className="w-5 h-5 text-krishiva-green" />
                  My Sent Offers
                </h3>
                <div className="space-y-3">
                  {INITIAL_SENT_OFFERS.map((offer, i) => (
                    <motion.div
                      key={offer.id}
                      custom={i}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      className="bg-white rounded-2xl border border-border-light shadow-card p-4 sm:p-5"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 rounded-full bg-krishiva-green/10 flex items-center justify-center">
                            <Wheat className="w-5 h-5 text-krishiva-green" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-semibold text-text-primary">{offer.farmerName}</h4>
                              <StatusBadge status={offer.status} />
                            </div>
                            <p className="text-sm text-text-muted mt-0.5">
                              {offer.crop} — {offer.quantity}q @ ₹{offer.pricePerQ.toLocaleString('en-IN')}/q
                            </p>
                            <p className="text-xs text-text-muted mt-0.5 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Sent {offer.date}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Send Offer Dialog */}
        <SendOfferDialog open={sendOfferOpen} onClose={() => setSendOfferOpen(false)} listing={selectedListing} />
      </div>
    </DashboardLayout>
  );
}
