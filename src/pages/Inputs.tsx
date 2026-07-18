import { useState, useCallback, createContext, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sprout,
  FlaskConical,
  Shield,
  Wrench,
  Truck,
  ShoppingCart,
  Star,
  CheckCircle2,
  Minus,
  Plus,
  Trash2,
  Search,
  Filter,
  MapPin,
  CreditCard,
  Wallet,
  Banknote,
  ChevronRight,
  Package,
  ArrowRight,
  BadgePercent,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

/* ──────────────────────────── types ──────────────────────────── */

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  verified: boolean;
  unit: string;
  inStock: boolean;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

/* ──────────────────────────── cart context ──────────────────────────── */

const CartContext = createContext<CartContextType | undefined>(undefined);

function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, delta: number) => {
    setItems(prev =>
      prev
        .map(i =>
          i.product.id === productId ? { ...i, quantity: i.quantity + delta } : i
        )
        .filter(i => i.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

/* ──────────────────────────── mock data ──────────────────────────── */

const CATEGORIES = [
  { key: 'Seeds', icon: Sprout, color: 'text-krishiva-green', bg: 'bg-krishiva-green/10', border: 'border-krishiva-green/30' },
  { key: 'Fertilizers', icon: FlaskConical, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  { key: 'Pesticides', icon: Shield, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' },
  { key: 'Tools', icon: Wrench, color: 'text-gray-600', bg: 'bg-gray-100', border: 'border-gray-200' },
  { key: 'Equipment', icon: Truck, color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
];

const PRODUCTS: Product[] = [
  { id: 'P1', name: 'Mahyco Cotton Seeds 208', brand: 'Mahyco', category: 'Seeds', price: 450, originalPrice: 520, rating: 4.5, reviews: 234, image: '', badge: '15% OFF', verified: true, unit: 'per packet', inStock: true },
  { id: 'P2', name: 'Urea Fertilizer 50kg', brand: 'IFFCO', category: 'Fertilizers', price: 295, originalPrice: 350, rating: 4.7, reviews: 189, image: '', badge: undefined, verified: true, unit: 'per bag', inStock: true },
  { id: 'P3', name: 'DAP Fertilizer 50kg', brand: 'Coromandel', category: 'Fertilizers', price: 1350, rating: 4.6, reviews: 312, image: '', badge: 'Bestseller', verified: true, unit: 'per bag', inStock: true },
  { id: 'P4', name: 'Hybrid Tomato Seeds Pusa Ruby', brand: 'Namdhari', category: 'Seeds', price: 245, originalPrice: 290, rating: 4.3, reviews: 156, image: '', badge: '15% OFF', verified: true, unit: 'per packet', inStock: true },
  { id: 'P5', name: 'Glyphosate Herbicide 1L', brand: 'Bayer', category: 'Pesticides', price: 890, rating: 4.4, reviews: 98, image: '', badge: undefined, verified: true, unit: 'per bottle', inStock: true },
  { id: 'P6', name: 'Knapsack Sprayer 16L', brand: 'KisanKraft', category: 'Tools', price: 1850, originalPrice: 2200, rating: 4.6, reviews: 267, image: '', badge: '15% OFF', verified: true, unit: 'per unit', inStock: true },
  { id: 'P7', name: 'Drip Irrigation Kit 100m', brand: 'Jain Irrigation', category: 'Equipment', price: 2500, rating: 4.8, reviews: 145, image: '', badge: 'Premium', verified: true, unit: 'per kit', inStock: true },
  { id: 'P8', name: 'NPK 19-19-19 Fertilizer 1kg', brand: 'Sikko', category: 'Fertilizers', price: 320, originalPrice: 380, rating: 4.2, reviews: 78, image: '', badge: '15% OFF', verified: true, unit: 'per pouch', inStock: true },
  { id: 'P9', name: 'Power Weeder 7HP', brand: 'KrisiTools', category: 'Equipment', price: 8500, originalPrice: 9999, rating: 4.5, reviews: 56, image: '', badge: '15% OFF', verified: true, unit: 'per unit', inStock: true },
  { id: 'P10', name: 'Organic Neem Oil 500ml', brand: 'NatureCare', category: 'Pesticides', price: 180, rating: 4.1, reviews: 203, image: '', badge: undefined, verified: true, unit: 'per bottle', inStock: true },
];

const DEALS: Product[] = [
  { id: 'D1', name: 'Premium Wheat Seeds HD-2967', brand: 'Kaveri', category: 'Seeds', price: 380, originalPrice: 450, rating: 4.6, reviews: 112, image: '', badge: '15% OFF', verified: true, unit: 'per kg', inStock: true },
  { id: 'D2', name: 'Bio Compost Organic 25kg', brand: 'VermiGold', category: 'Fertilizers', price: 220, originalPrice: 280, rating: 4.3, reviews: 89, image: '', badge: '21% OFF', verified: true, unit: 'per bag', inStock: true },
  { id: 'D3', name: 'Insecticide Imidacloprid 100ml', brand: 'Bayer', category: 'Pesticides', price: 340, originalPrice: 400, rating: 4.5, reviews: 67, image: '', badge: '15% OFF', verified: true, unit: 'per bottle', inStock: true },
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

function ProductImagePlaceholder({ product, className = '' }: { product: Product; className?: string }) {
  const iconMap: Record<string, ReactNode> = {
    Seeds: <Sprout className="w-10 h-10 text-krishiva-green/60" />,
    Fertilizers: <FlaskConical className="w-10 h-10 text-blue-500/60" />,
    Pesticides: <Shield className="w-10 h-10 text-red-500/60" />,
    Tools: <Wrench className="w-10 h-10 text-gray-500/60" />,
    Equipment: <Truck className="w-10 h-10 text-amber-600/60" />,
  };

  const gradientMap: Record<string, string> = {
    Seeds: 'from-green-50 to-emerald-50',
    Fertilizers: 'from-blue-50 to-sky-50',
    Pesticides: 'from-red-50 to-rose-50',
    Tools: 'from-gray-100 to-gray-50',
    Equipment: 'from-amber-50 to-yellow-50',
  };

  return (
    <div className={`bg-gradient-to-br ${gradientMap[product.category] || 'from-gray-50 to-gray-100'} flex items-center justify-center ${className}`}>
      {iconMap[product.category] || <Package className="w-10 h-10 text-krishiva-green/60" />}
    </div>
  );
}

/* ──────────────────────────── sub-components ──────────────────────────── */

function CategoryTabs({ active, onChange }: { active: string; onChange: (cat: string) => void }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex gap-3 overflow-x-auto pb-2"
      style={{ scrollbarWidth: 'none' }}
    >
      <motion.button
        custom={0}
        variants={cardVariants}
        onClick={() => onChange('All')}
        className={`flex flex-col items-center gap-1.5 px-5 py-3 rounded-xl border-2 transition-all duration-200 min-w-[80px] flex-shrink-0 ${
          active === 'All'
            ? 'border-krishiva-green bg-krishiva-green/10'
            : 'border-border-light bg-white hover:border-border-green'
        }`}
      >
        <Package className={`w-6 h-6 ${active === 'All' ? 'text-krishiva-green' : 'text-text-muted'}`} />
        <span className={`text-xs font-medium ${active === 'All' ? 'text-krishiva-green' : 'text-text-secondary'}`}>All</span>
      </motion.button>

      {CATEGORIES.map((cat, idx) => (
        <motion.button
          key={cat.key}
          custom={idx + 1}
          variants={cardVariants}
          onClick={() => onChange(cat.key)}
          className={`flex flex-col items-center gap-1.5 px-5 py-3 rounded-xl border-2 transition-all duration-200 min-w-[90px] flex-shrink-0 ${
            active === cat.key
              ? `${cat.border} ${cat.bg}`
              : 'border-border-light bg-white hover:border-border-green'
          }`}
        >
          <cat.icon className={`w-6 h-6 ${active === cat.key ? cat.color : 'text-text-muted'}`} />
          <span className={`text-xs font-medium ${active === cat.key ? cat.color : 'text-text-secondary'}`}>{cat.key}</span>
        </motion.button>
      ))}
    </motion.div>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-2xl border border-border-light shadow-card hover:shadow-card-hover transition-all duration-200 overflow-hidden group"
    >
      {/* Image Area */}
      <div className="relative">
        <ProductImagePlaceholder product={product} className="w-full aspect-square" />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-error-red text-white text-[11px] font-bold px-2 py-0.5 rounded-md">
            {product.badge}
          </span>
        )}
        {product.verified && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm border border-border-light">
            <CheckCircle2 className="w-3.5 h-3.5 text-success-green" />
            <span className="text-[10px] font-semibold text-success-green">VERIFIED</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wide">{product.brand}</p>
        <h4 className="font-semibold text-text-primary text-sm leading-snug mt-0.5 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h4>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex items-center gap-0.5">
            <Star className="w-3.5 h-3.5 fill-harvest-gold text-harvest-gold" />
            <span className="text-xs font-semibold text-text-primary">{product.rating}</span>
          </div>
          <span className="text-xs text-text-muted">({product.reviews} reviews)</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-lg font-bold text-krishiva-green">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="text-sm text-text-muted line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          )}
        </div>
        <p className="text-[11px] text-text-muted">{product.unit}</p>

        {/* Actions */}
        <div className="flex gap-2 mt-3">
          <Button
            onClick={handleAdd}
            className={`flex-1 h-9 rounded-xl text-xs font-semibold transition-all duration-200 ${
              added
                ? 'bg-success-green hover:bg-success-green text-white'
                : 'bg-krishiva-green hover:bg-[#1B5E20] text-white shadow-button'
            }`}
          >
            {added ? (
              <><CheckCircle2 className="w-3.5 h-3.5 mr-1" />Added</>
            ) : (
              <><ShoppingCart className="w-3.5 h-3.5 mr-1" />Add to Cart</>
            )}
          </Button>
        </div>
        <Button
          variant="ghost"
          className="w-full h-8 mt-1 text-krishiva-green hover:bg-krishiva-green/5 text-xs font-medium rounded-xl"
        >
          Buy Now
        </Button>
      </div>
    </motion.div>
  );
}

function DealsSection() {
  const { addToCart } = useCart();

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <BadgePercent className="w-5 h-5 text-error-red" />
        <h3 className="font-poppins font-semibold text-heading-md text-text-primary">Today&apos;s Deals</h3>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {DEALS.map((deal, i) => (
          <motion.div
            key={deal.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="min-w-[280px] bg-white rounded-2xl border border-border-light shadow-card overflow-hidden flex-shrink-0"
          >
            <div className="relative">
              <ProductImagePlaceholder product={deal} className="w-full h-40" />
              <span className="absolute top-2 left-2 bg-error-red text-white text-xs font-bold px-2 py-0.5 rounded-md">
                {deal.badge}
              </span>
            </div>
            <div className="p-4">
              <p className="text-[11px] font-semibold text-text-muted uppercase">{deal.brand}</p>
              <h4 className="font-semibold text-text-primary text-sm mt-0.5">{deal.name}</h4>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-lg font-bold text-krishiva-green">₹{deal.price.toLocaleString('en-IN')}</span>
                {deal.originalPrice && (
                  <span className="text-sm text-text-muted line-through">₹{deal.originalPrice.toLocaleString('en-IN')}</span>
                )}
              </div>
              <Button
                onClick={() => addToCart(deal)}
                className="w-full h-9 mt-2 bg-harvest-gold hover:bg-[#FBC02D] text-text-primary rounded-xl text-xs font-semibold shadow-gold"
              >
                <ShoppingCart className="w-3.5 h-3.5 mr-1" />
                Add to Cart
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CartPanel() {
  const { items, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const deliveryFee = subtotal > 500 ? 0 : 50;
  const total = subtotal + deliveryFee;

  return (
    <>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-poppins text-heading-md flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-krishiva-green" />
            Your Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingCart className="w-16 h-16 text-border-light mb-4" />
            <p className="text-text-secondary font-medium">Your cart is empty</p>
            <p className="text-text-muted text-sm mt-1">Add products to get started</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    className="flex gap-3 bg-bg-primary rounded-xl p-3"
                  >
                    <ProductImagePlaceholder product={item.product} className="w-16 h-16 rounded-lg shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-text-primary truncate">{item.product.name}</h4>
                      <p className="text-xs text-text-muted">{item.product.brand}</p>
                      <p className="text-sm font-bold text-krishiva-green mt-1">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="w-7 h-7 rounded-lg bg-white border border-border-light flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="w-7 h-7 rounded-lg bg-white border border-border-light flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="ml-auto p-1.5 rounded-lg hover:bg-error-red/10 text-text-muted hover:text-error-red transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div className="border-t border-border-light pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Subtotal</span>
                <span className="font-medium text-text-primary">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Delivery</span>
                <span className={`font-medium ${deliveryFee === 0 ? 'text-success-green' : 'text-text-primary'}`}>
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              {deliveryFee === 0 && subtotal > 0 && (
                <p className="text-xs text-success-green">Free delivery above ₹500</p>
              )}
              <div className="flex justify-between text-base font-bold pt-2 border-t border-border-light">
                <span className="text-text-primary">Total</span>
                <span className="text-krishiva-green">₹{total.toLocaleString('en-IN')}</span>
              </div>
              <Button
                onClick={() => setCheckoutOpen(true)}
                className="w-full h-12 mt-3 bg-harvest-gold hover:bg-[#FBC02D] text-text-primary rounded-xl font-semibold shadow-gold"
              >
                Checkout
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                onClick={clearCart}
                variant="ghost"
                className="w-full h-9 text-text-muted hover:text-error-red text-xs"
              >
                Clear Cart
              </Button>
            </div>
          </>
        )}
      </SheetContent>

      {/* Checkout Modal */}
      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} total={total} />
    </>
  );
}

function CheckoutModal({ open, onClose, total }: { open: boolean; onClose: () => void; total: number }) {
  const { items, clearCart } = useCart();
  const [step, setStep] = useState<'address' | 'payment' | 'success'>('address');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'wallet' | 'cod'>('upi');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (open) {
      setStep('address');
      setProcessing(false);
      setAddress('');
      setPaymentMethod('upi');
    }
  }, [open]);

  const handlePlaceOrder = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStep('success');
      clearCart();
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-poppins text-heading-md">
            {step === 'success' ? 'Order Placed!' : 'Checkout'}
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === 'address' && (
            <motion.div
              key="address"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4 pt-2"
            >
              <div>
                <label className="text-sm font-medium text-text-secondary mb-1.5 block flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Delivery Address
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your full address..."
                  className="w-full h-24 p-3 rounded-xl border border-border-light bg-white text-text-primary text-sm resize-none focus:outline-none focus:ring-2 focus:ring-krishiva-green/20 focus:border-krishiva-green"
                />
              </div>

              {/* Saved addresses */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-text-muted uppercase">Saved Addresses</p>
                {['Patel Farm, Ahmedabad, Gujarat - 380001', 'Shree Ganesh Farm, Surat, Gujarat - 395001'].map((addr, i) => (
                  <button
                    key={i}
                    onClick={() => setAddress(addr)}
                    className={`w-full text-left p-3 rounded-xl border transition-all text-sm ${
                      address === addr
                        ? 'border-krishiva-green bg-krishiva-green/5'
                        : 'border-border-light hover:border-border-green'
                    }`}
                  >
                    {addr}
                  </button>
                ))}
              </div>

              <Button
                onClick={() => setStep('payment')}
                disabled={!address.trim()}
                className="w-full h-12 bg-krishiva-green hover:bg-[#1B5E20] text-white rounded-xl font-medium shadow-button disabled:opacity-50"
              >
                Continue to Payment
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>
          )}

          {step === 'payment' && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4 pt-2"
            >
              {/* Order Summary */}
              <div className="p-4 bg-bg-primary rounded-xl space-y-2">
                <p className="text-xs font-semibold text-text-muted uppercase">Order Summary</p>
                {items.map(item => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-text-secondary">{item.product.name} x{item.quantity}</span>
                    <span className="font-medium text-text-primary">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
                <div className="border-t border-border-light pt-2 flex justify-between font-bold text-base">
                  <span className="text-text-primary">Total</span>
                  <span className="text-krishiva-green">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <p className="text-xs font-semibold text-text-muted uppercase">Payment Method</p>
              <div className="space-y-2">
                {[
                  { key: 'upi' as const, label: 'UPI Payment', icon: CreditCard, desc: 'Pay using any UPI app' },
                  { key: 'wallet' as const, label: 'KRISHIVA Wallet', icon: Wallet, desc: 'Balance: ₹2,450' },
                  { key: 'cod' as const, label: 'Cash on Delivery', icon: Banknote, desc: 'Pay when you receive' },
                ].map((method) => (
                  <button
                    key={method.key}
                    onClick={() => setPaymentMethod(method.key)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      paymentMethod === method.key
                        ? 'border-krishiva-green bg-krishiva-green/5'
                        : 'border-border-light hover:border-border-green'
                    }`}
                  >
                    <method.icon className={`w-5 h-5 ${paymentMethod === method.key ? 'text-krishiva-green' : 'text-text-muted'}`} />
                    <div className="text-left">
                      <p className={`text-sm font-medium ${paymentMethod === method.key ? 'text-krishiva-green' : 'text-text-primary'}`}>{method.label}</p>
                      <p className="text-xs text-text-muted">{method.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setStep('address')}
                  variant="outline"
                  className="h-12 px-6 border-border-light rounded-xl"
                >
                  Back
                </Button>
                <Button
                  onClick={handlePlaceOrder}
                  disabled={processing}
                  className="flex-1 h-12 bg-harvest-gold hover:bg-[#FBC02D] text-text-primary rounded-xl font-semibold shadow-gold"
                >
                  {processing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-text-primary/30 border-t-text-primary rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <>Place Order • ₹{total.toLocaleString('en-IN')}</>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 rounded-full bg-success-green/15 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10 text-success-green" />
              </div>
              <h4 className="font-poppins font-bold text-xl text-text-primary mb-1">Order Placed!</h4>
              <p className="text-text-secondary text-sm mb-2">Your order has been confirmed</p>
              <Badge variant="secondary" className="mb-4">Order #ORD-{Math.floor(100000 + Math.random() * 900000)}</Badge>
              <p className="text-xs text-text-muted">Estimated delivery: 3-5 business days</p>
              <Button
                onClick={onClose}
                className="mt-6 h-11 bg-krishiva-green hover:bg-[#1B5E20] text-white rounded-xl px-8 shadow-button"
              >
                Done
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

/* ──────────────────────────── main page ──────────────────────────── */

function InputsPageInner() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();

  const filteredProducts = PRODUCTS
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <DashboardLayout>
      <div className="space-y-5">
        {/* Header with Cart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-text-primary">Input Marketplace</h1>
            <p className="text-text-secondary text-sm mt-1">Quality inputs for your farm — seeds, fertilizers, pesticides & more</p>
          </div>
          <Sheet open={cartOpen} onOpenChange={setCartOpen}>
            <SheetTrigger asChild>
              <button className="relative p-3 rounded-xl bg-white border border-border-light hover:border-border-green hover:shadow-card transition-all">
                <ShoppingCart className="w-5 h-5 text-text-primary" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 bg-error-red text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>
            </SheetTrigger>
            <CartPanel />
          </Sheet>
        </motion.div>

        {/* Category Tabs */}
        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />

        {/* Search & Filters */}
        <Card className="border-border-light shadow-card">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <Input
                  placeholder="Search seeds, fertilizers, pesticides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 rounded-xl border-border-light pl-10"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-12 w-[160px] rounded-xl border-border-light">
                  <Filter className="w-4 h-4 text-text-muted mr-1" />
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Deals Section */}
        <DealsSection />

        {/* Product Grid */}
        <div>
          <h3 className="font-poppins font-semibold text-heading-md text-text-primary mb-4">
            {activeCategory === 'All' ? 'All Products' : activeCategory}
            <span className="text-text-muted text-sm font-normal ml-2">({filteredProducts.length} items)</span>
          </h3>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-border-light mx-auto mb-3" />
              <p className="text-text-secondary font-medium">No products found</p>
              <p className="text-text-muted text-sm mt-1">Try adjusting your search or filters</p>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {filteredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

/* ──────────────────────────── export ──────────────────────────── */

export default function Inputs() {
  return (
    <CartProvider>
      <InputsPageInner />
    </CartProvider>
  );
}
