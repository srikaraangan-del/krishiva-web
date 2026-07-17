import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Newspaper,
  Tractor,
  Users,
  TrendingUp,
  ShoppingCart,
  Stethoscope,
  MessageSquare,
  GraduationCap,
  Wallet,
  User,
  Menu,
  X,
  Bell,
  Search,
  ChevronLeft,
  Leaf,
  Home,
  Mic,
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
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="min-h-[100dvh] bg-bg-primary flex">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col fixed left-0 top-0 h-full bg-white border-r border-border-light z-40 transition-all duration-300 ${
          collapsed ? 'w-[72px]' : 'w-[260px]'
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-border-light">
          <Link to="/" className="flex items-center gap-2 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-krishiva-green flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <span className="font-poppins font-bold text-lg text-text-primary truncate">
                KRISHIVA
              </span>
            )}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`ml-auto p-1.5 rounded-lg hover:bg-bg-primary transition-colors ${collapsed ? 'hidden' : 'block'}`}
          >
            <ChevronLeft className="w-4 h-4 text-text-muted" />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                isActive(item.href)
                  ? 'bg-krishiva-green/10 text-krishiva-green border-l-[3px] border-krishiva-green'
                  : 'text-text-secondary hover:bg-krishiva-green/5 hover:text-text-primary border-l-[3px] border-transparent'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-[22px] h-[22px] shrink-0" />
              {!collapsed && (
                <span className="font-inter font-medium text-sm truncate">{item.label}</span>
              )}
              {/* Tooltip for collapsed */}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-text-primary text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </Link>
          ))}
        </nav>

        {/* Back to Home */}
        <div className="p-3 border-t border-border-light">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-text-secondary hover:bg-krishiva-green/5 hover:text-text-primary transition-all"
          >
            <Home className="w-[22px] h-[22px] shrink-0" />
            {!collapsed && <span className="font-medium text-sm">Back to Home</span>}
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
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="lg:hidden fixed left-0 top-0 h-full w-[260px] bg-white border-r border-border-light z-50 flex flex-col"
            >
              <div className="h-16 flex items-center justify-between px-4 border-b border-border-light">
                <Link to="/" className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-krishiva-green flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-poppins font-bold text-lg text-text-primary">
                    KRISHIVA
                  </span>
                </Link>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg hover:bg-bg-primary"
                >
                  <X className="w-5 h-5 text-text-secondary" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                      isActive(item.href)
                        ? 'bg-krishiva-green/10 text-krishiva-green border-l-[3px] border-krishiva-green'
                        : 'text-text-secondary hover:bg-krishiva-green/5 border-l-[3px] border-transparent'
                    }`}
                  >
                    <item.icon className="w-[22px] h-[22px]" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-h-[100dvh] transition-all duration-300 ${
        collapsed ? 'lg:ml-[72px]' : 'lg:ml-[260px]'
      }`}>
        {/* Top App Bar */}
        <header className="h-16 bg-white border-b border-border-light flex items-center px-4 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-bg-primary mr-2"
          >
            <Menu className="w-5 h-5 text-text-secondary" />
          </button>

          <h1 className="font-poppins font-semibold text-base text-text-primary capitalize">
            {location.pathname === '/dashboard' ? 'Dashboard' : location.pathname.split('/').pop()?.replace(/-/g, ' ')}
          </h1>

          <div className="ml-auto flex items-center gap-3">
            <button className="p-2 rounded-xl hover:bg-bg-primary transition-colors relative">
              <Search className="w-5 h-5 text-text-secondary" />
            </button>
            <button className="p-2 rounded-xl hover:bg-bg-primary transition-colors relative">
              <Bell className="w-5 h-5 text-text-secondary" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error-red rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-krishiva-green flex items-center justify-center text-white font-medium text-sm">
              RP
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto pb-24 lg:pb-6">
          {children}
        </main>

        {/* Mobile Bottom Nav */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-[72px] bg-white border-t border-border-light z-30 flex items-center justify-around px-2">
          {bottomNavItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-colors ${
                isActive(item.href) || (item.href === '/dashboard' && location.pathname === '/dashboard')
                  ? 'text-krishiva-green'
                  : 'text-text-muted'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[11px] font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
