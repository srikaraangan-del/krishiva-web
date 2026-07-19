import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Newspaper, Tractor, Users, TrendingUp,
  ShoppingCart, Stethoscope, MessageSquare, GraduationCap,
  Wallet, User, X, Bell, Leaf, Home, Mic,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Newspaper, label: 'Smart Feed', href: '/dashboard/feed' },
  { icon: Tractor, label: 'Farm OS', href: '/dashboard/farm' },
  { icon: ShoppingCart, label: 'Buy/Sell Crop', href: '/dashboard/produce' },
  { icon: TrendingUp, label: 'Market Prices', href: '/dashboard/market-prices' },
  { icon: Stethoscope, label: 'Crop Doctor', href: '/dashboard/crop-doctor' },
  { icon: Users, label: 'Buyer Connect', href: '/dashboard/buyer-connect' },
  { icon: MessageSquare, label: 'Community', href: '/dashboard/community' },
  { icon: GraduationCap, label: 'Experts', href: '/dashboard/experts' },
  { icon: Wallet, label: 'Wallet', href: '/dashboard/wallet' },
  { icon: User, label: 'Profile', href: '/dashboard/profile' },
];

const bottomNavItems = [
  { icon: Home, label: 'Home', href: '/dashboard' },
  { icon: LayoutDashboard, label: 'Modules', href: '/dashboard/farm' },
  { icon: Mic, label: 'Voice', href: '#' },
  { icon: Bell, label: 'Alerts', href: '#' },
  { icon: User, label: 'Profile', href: '/dashboard/profile' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="min-h-[100dvh] bg-[#F8F9FA] flex">
      {/* Desktop Sidebar — 220px fixed, clean minimal */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-[220px] bg-white border-r border-[#E5E7EB] z-40">
        {/* Logo */}
        <div className="h-14 flex items-center px-4 border-b border-[#E5E7EB] shrink-0">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#2E7D32] flex items-center justify-center shrink-0">
              <Leaf className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-poppins font-bold text-[15px] text-[#111827] tracking-tight">
              KRISHIVA
            </span>
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-3 h-9 rounded-lg transition-all duration-150 text-sm ${
                isActive(item.href)
                  ? 'bg-[#2E7D32]/10 text-[#2E7D32] font-medium'
                  : 'text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827]'
              }`}
            >
              <item.icon className="w-[18px] h-[18px] shrink-0" strokeWidth={isActive(item.href) ? 2 : 1.5} />
              <span className="truncate">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Back to Home */}
        <div className="p-3 border-t border-[#E5E7EB]">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 h-9 rounded-lg text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827] transition-all text-sm"
          >
            <Home className="w-[18px] h-[18px] shrink-0" strokeWidth={1.5} />
            <span>Back to Home</span>
          </Link>
        </div>
      </aside>

      {/* Mobile: overlay sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/40 z-40"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -220 }}
              animate={{ x: 0 }}
              exit={{ x: -220 }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="lg:hidden fixed left-0 top-0 h-full w-[220px] bg-white border-r border-[#E5E7EB] z-50 flex flex-col"
            >
              <div className="h-14 flex items-center justify-between px-4 border-b border-[#E5E7EB]">
                <Link to="/" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#2E7D32] flex items-center justify-center">
                    <Leaf className="w-4.5 h-4.5 text-white" />
                  </div>
                  <span className="font-poppins font-bold text-[15px]">KRISHIVA</span>
                </Link>
                <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg hover:bg-gray-100">
                  <X className="w-5 h-5 text-[#6B7280]" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 h-9 rounded-lg transition-all text-sm ${
                      isActive(item.href)
                        ? 'bg-[#2E7D32]/10 text-[#2E7D32] font-medium'
                        : 'text-[#6B7280] hover:bg-[#F3F4F6]'
                    }`}
                  >
                    <item.icon className="w-[18px] h-[18px]" strokeWidth={isActive(item.href) ? 2 : 1.5} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-[100dvh] lg:ml-[220px]">
        {/* Content with integrated header */}
        <div className="flex-1 flex flex-col">
          {children}
        </div>

        {/* Mobile Bottom Nav */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-[#E5E7EB] z-30 flex items-center justify-around px-2">
          {bottomNavItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-colors ${
                isActive(item.href) ? 'text-[#2E7D32]' : 'text-[#9CA3AF]'
              }`}
            >
              <item.icon className="w-5 h-5" strokeWidth={isActive(item.href) ? 2 : 1.5} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
