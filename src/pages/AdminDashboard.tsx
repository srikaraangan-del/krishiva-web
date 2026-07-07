import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Store,
  Building2,
  FileText,
  BarChart3,
  Settings,
  Search,
  Bell,
  CheckCircle2,
  XCircle,
  MoreHorizontal,
  ArrowUpRight,
  TrendingUp,
  UserCheck,
  Filter,
  Download,
  Eye,
  Ban,
  Check,
  X,
  Upload,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  IndianRupee,
  Percent,
  Edit3,
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  value: string;
}

interface UserRow {
  id: number;
  name: string;
  email: string;
  role: string;
  location: string;
  status: 'Active' | 'Pending' | 'Blocked';
  kyc: 'Verified' | 'Pending' | 'Rejected';
  joined: string;
  initials: string;
  color: string;
}

interface KycRequest {
  id: number;
  name: string;
  role: string;
  initials: string;
  color: string;
  documents: string[];
  submittedAt: string;
}

interface ActivityItem {
  id: number;
  text: string;
  time: string;
  color: string;
}

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, value: 'dashboard' },
  { label: 'Users', icon: Users, value: 'users' },
  { label: 'KYC Review', icon: ShieldCheck, value: 'kyc' },
  { label: 'Dealers', icon: Store, value: 'dealers' },
  { label: 'Corporates', icon: Building2, value: 'corporates' },
  { label: 'Content', icon: FileText, value: 'content' },
  { label: 'Analytics', icon: BarChart3, value: 'analytics' },
  { label: 'Settings', icon: Settings, value: 'settings' },
];

const analyticsCards = [
  { label: 'Total Users', value: '24,500', change: '+12%', icon: Users, color: 'bg-blue-500', lightColor: 'bg-blue-50 text-blue-600' },
  { label: 'Active Farmers', value: '18,200', change: '+8%', icon: UserCheck, color: 'bg-green-500', lightColor: 'bg-green-50 text-green-600' },
  { label: 'Total Deals', value: '8,450', change: '+15%', icon: Briefcase, color: 'bg-purple-500', lightColor: 'bg-purple-50 text-purple-600' },
  { label: 'Revenue', value: 'Rs 12.5L', change: '+20%', icon: IndianRupee, color: 'bg-orange-500', lightColor: 'bg-orange-50 text-orange-600' },
];

const userRows: UserRow[] = [
  { id: 1, name: 'Rajesh Kumar', email: 'rajesh@email.com', role: 'Farmer', location: 'Guntur, AP', status: 'Active', kyc: 'Verified', joined: 'Jan 2024', initials: 'RK', color: 'bg-green-600' },
  { id: 2, name: 'Lakshmi Devi', email: 'lakshmi@email.com', role: 'Farmer', location: 'Prakasam, AP', status: 'Active', kyc: 'Verified', joined: 'Feb 2024', initials: 'LD', color: 'bg-pink-600' },
  { id: 3, name: 'Krishna Traders', email: 'krishna@biz.com', role: 'Dealer', location: 'Vijayawada, AP', status: 'Active', kyc: 'Verified', joined: 'Mar 2024', initials: 'KT', color: 'bg-blue-600' },
  { id: 4, name: 'Venkatesh Rao', email: 'venkat@email.com', role: 'Farmer', location: 'Nellore, AP', status: 'Pending', kyc: 'Pending', joined: 'Apr 2024', initials: 'VR', color: 'bg-amber-600' },
  { id: 5, name: 'Srinivas Agro', email: 'srinivas@agro.com', role: 'Corporate', location: 'Hyderabad, TS', status: 'Active', kyc: 'Verified', joined: 'Jan 2024', initials: 'SA', color: 'bg-indigo-600' },
  { id: 6, name: 'Padma Rani', email: 'padma@email.com', role: 'Farmer', location: 'Kurnool, AP', status: 'Blocked', kyc: 'Rejected', joined: 'Dec 2023', initials: 'PR', color: 'bg-red-600' },
  { id: 7, name: 'Ravi Enterprises', email: 'ravi@biz.com', role: 'Dealer', location: 'Guntur, AP', status: 'Active', kyc: 'Verified', joined: 'Feb 2024', initials: 'RE', color: 'bg-cyan-600' },
  { id: 8, name: 'Anitha Devi', email: 'anitha@email.com', role: 'Farmer', location: 'West Godavari, AP', status: 'Pending', kyc: 'Pending', joined: 'May 2024', initials: 'AD', color: 'bg-teal-600' },
];

const kycPending: KycRequest[] = [
  { id: 1, name: 'Venkatesh Rao', role: 'Farmer', initials: 'VR', color: 'bg-amber-600', documents: ['Aadhaar', 'PAN', 'Land Doc'], submittedAt: '2 hours ago' },
  { id: 2, name: 'Anitha Devi', role: 'Farmer', initials: 'AD', color: 'bg-teal-600', documents: ['Aadhaar', 'Bank Details'], submittedAt: '5 hours ago' },
  { id: 3, name: 'Suresh Agro', role: 'Dealer', initials: 'SA', color: 'bg-purple-600', documents: ['Aadhaar', 'PAN', 'GST', 'Trade License'], submittedAt: '1 day ago' },
];

const kycApproved: KycRequest[] = [
  { id: 4, name: 'Rajesh Kumar', role: 'Farmer', initials: 'RK', color: 'bg-green-600', documents: ['Aadhaar', 'PAN', 'Land Doc', 'Bank'], submittedAt: '2 days ago' },
  { id: 5, name: 'Krishna Traders', role: 'Dealer', initials: 'KT', color: 'bg-blue-600', documents: ['Aadhaar', 'PAN', 'GST'], submittedAt: '3 days ago' },
];

const kycRejected: KycRequest[] = [
  { id: 6, name: 'Padma Rani', role: 'Farmer', initials: 'PR', color: 'bg-red-600', documents: ['Aadhaar'], submittedAt: '1 week ago' },
];

const recentActivity: ActivityItem[] = [
  { id: 1, text: 'Venkatesh Rao submitted KYC documents for review', time: '10 min ago', color: 'bg-blue-500' },
  { id: 2, text: 'Rajesh Kumar completed a deal worth Rs 45,000', time: '32 min ago', color: 'bg-green-500' },
  { id: 3, text: 'New dealer "Agro World" registered', time: '1 hour ago', color: 'bg-purple-500' },
  { id: 4, text: 'Padma Rani KYC rejected - documents unclear', time: '2 hours ago', color: 'bg-red-500' },
];

/* ------------------------------------------------------------------ */
/*  Helper Components                                                  */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    'Active': 'bg-green-100 text-green-700 border-green-200',
    'Pending': 'bg-amber-100 text-amber-700 border-amber-200',
    'Blocked': 'bg-red-100 text-red-700 border-red-200',
    'Verified': 'bg-green-100 text-green-700 border-green-200',
    'Rejected': 'bg-red-100 text-red-700 border-red-200',
    'New': 'bg-blue-100 text-blue-700 border-blue-200',
    'Negotiating': 'bg-amber-100 text-amber-700 border-amber-200',
    'Connected': 'bg-green-100 text-green-700 border-green-200',
  };
  return (
    <Badge variant="outline" className={`text-[10px] h-5 px-1.5 ${map[status] || 'bg-gray-100 text-gray-700'}`}>
      {status}
    </Badge>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [userTab, setUserTab] = useState('all');
  const [kycTab, setKycTab] = useState('pending');
  const [formTab, setFormTab] = useState('dealer');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeItem = navItems.find(n => n.value === activeNav) || navItems[0];
  const ActiveIcon = activeItem.icon;

  const filteredUsers = userTab === 'all'
    ? userRows
    : userRows.filter(u => u.role.toLowerCase() + 's' === userTab);

  return (
    <div className="min-h-[100dvh] bg-gray-50 flex">
      {/* ====== DARK SIDEBAR ====== */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-[260px] bg-gray-900 z-40">
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-gray-800">
          <div className="w-9 h-9 rounded-xl bg-krishiva-green flex items-center justify-center shrink-0 mr-3">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <span className="font-poppins font-bold text-lg text-white">KRISHIVA Admin</span>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => setActiveNav(item.value)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-left ${
                activeNav === item.value
                  ? 'bg-krishiva-green text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="w-[22px] h-[22px] shrink-0" />
              <span className="font-inter font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-gray-800">
          <div className="flex items-center gap-3 px-3 py-2">
            <Avatar className="w-9 h-9">
              <AvatarFallback className="bg-krishiva-green text-white text-sm font-medium">AD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-gray-500">admin@krishiva.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              className="lg:hidden fixed left-0 top-0 h-full w-[260px] bg-gray-900 z-50 flex flex-col"
            >
              <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
                <span className="font-poppins font-bold text-lg text-white">KRISHIVA Admin</span>
                <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg hover:bg-gray-800">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => { setActiveNav(item.value); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${
                      activeNav === item.value
                        ? 'bg-krishiva-green text-white'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-[22px] h-[22px] shrink-0" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </button>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ====== MAIN CONTENT ====== */}
      <div className="flex-1 flex flex-col min-h-[100dvh] lg:ml-[260px]">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-border-light flex items-center px-4 sm:px-6 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-bg-primary mr-2"
          >
            <LayoutDashboard className="w-5 h-5 text-text-secondary" />
          </button>

          <div className="flex items-center gap-2">
            <ActiveIcon className="w-5 h-5 text-krishiva-green" />
            <h1 className="font-poppins font-semibold text-lg text-text-primary capitalize">{activeItem.label}</h1>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden sm:flex items-center bg-bg-primary rounded-xl px-3 h-10">
              <Search className="w-4 h-4 text-text-muted mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-sm outline-none w-40 placeholder:text-text-muted"
              />
            </div>
            <button className="p-2.5 rounded-xl hover:bg-bg-primary transition-colors relative">
              <Bell className="w-5 h-5 text-text-secondary" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error-red rounded-full" />
            </button>
            <Avatar className="w-9 h-9 hidden sm:inline-flex">
              <AvatarFallback className="bg-krishiva-green text-white text-sm font-medium">AD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <AnimatePresence mode="wait">
            {/* ====== DASHBOARD VIEW ====== */}
            {activeNav === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Analytics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  {analyticsCards.map((card, i) => (
                    <motion.div
                      key={card.label}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <Card className="border-border-light shadow-card hover:shadow-card-hover transition-all">
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between mb-4">
                            <div className={`w-10 h-10 rounded-xl ${card.lightColor} flex items-center justify-center`}>
                              <card.icon className="w-5 h-5" />
                            </div>
                            <div className="flex items-center gap-1 text-success-green text-xs font-medium">
                              <TrendingUp className="w-3.5 h-3.5" />
                              {card.change}
                            </div>
                          </div>
                          <p className="font-poppins font-bold text-2xl text-text-primary">{card.value}</p>
                          <p className="text-xs text-text-muted mt-0.5">{card.label}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* User Table Preview + Recent Activity */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  {/* Users Table */}
                  <div className="xl:col-span-2">
                    <Card className="border-border-light shadow-card">
                      <CardHeader className="pb-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <h3 className="font-poppins font-semibold text-base text-text-primary">Recent Users</h3>
                          <div className="flex gap-1.5">
                            {['all', 'farmers', 'dealers', 'corporates'].map((tab) => (
                              <button
                                key={tab}
                                onClick={() => setUserTab(tab)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                                  userTab === tab
                                    ? 'bg-krishiva-green text-white'
                                    : 'bg-bg-primary text-text-secondary hover:bg-krishiva-green/10'
                                }`}
                              >
                                {tab}
                              </button>
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-border-light bg-bg-primary/50">
                                <th className="text-left px-4 py-3 text-xs font-medium text-text-muted">User</th>
                                <th className="text-left px-4 py-3 text-xs font-medium text-text-muted hidden sm:table-cell">Role</th>
                                <th className="text-left px-4 py-3 text-xs font-medium text-text-muted hidden md:table-cell">Location</th>
                                <th className="text-left px-4 py-3 text-xs font-medium text-text-muted">Status</th>
                                <th className="text-left px-4 py-3 text-xs font-medium text-text-muted">KYC</th>
                                <th className="text-right px-4 py-3 text-xs font-medium text-text-muted">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredUsers.slice(0, 6).map((user) => (
                                <tr key={user.id} className="border-b border-border-light hover:bg-bg-primary/30 transition-colors">
                                  <td className="px-4 py-3">
                                    <div className="flex items-center gap-2.5">
                                      <div className={`w-8 h-8 rounded-full ${user.color} flex items-center justify-center text-white text-xs font-bold`}>
                                        {user.initials}
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium text-text-primary">{user.name}</p>
                                        <p className="text-[10px] text-text-muted">{user.email}</p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 hidden sm:table-cell">
                                    <Badge variant="outline" className="text-[10px] h-5">{user.role}</Badge>
                                  </td>
                                  <td className="px-4 py-3 text-xs text-text-secondary hidden md:table-cell">{user.location}</td>
                                  <td className="px-4 py-3"><StatusBadge status={user.status} /></td>
                                  <td className="px-4 py-3"><StatusBadge status={user.kyc} /></td>
                                  <td className="px-4 py-3 text-right">
                                    <button className="p-1.5 rounded-lg hover:bg-bg-primary transition-colors">
                                      <MoreHorizontal className="w-4 h-4 text-text-muted" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Activity */}
                  <div>
                    <Card className="border-border-light shadow-card">
                      <CardHeader className="pb-2">
                        <h3 className="font-poppins font-semibold text-base text-text-primary">Recent Activity</h3>
                      </CardHeader>
                      <CardContent className="p-5">
                        <div className="space-y-4 relative">
                          {/* Timeline line */}
                          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border-light" />
                          {recentActivity.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-3 relative">
                              <div className={`w-3.5 h-3.5 rounded-full ${activity.color} shrink-0 mt-0.5 relative z-10 ring-4 ring-white`} />
                              <div>
                                <p className="text-xs text-text-primary leading-relaxed">{activity.text}</p>
                                <p className="text-[10px] text-text-muted mt-0.5">{activity.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ====== USERS VIEW ====== */}
            {activeNav === 'users' && (
              <motion.div
                key="users"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <Card className="border-border-light shadow-card">
                  <CardHeader className="pb-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <h3 className="font-poppins font-semibold text-base text-text-primary">All Users</h3>
                        <Badge className="bg-krishiva-green/10 text-krishiva-green text-[10px]">{userRows.length}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-bg-primary rounded-lg px-3 h-9">
                          <Search className="w-4 h-4 text-text-muted mr-2" />
                          <input type="text" placeholder="Search users..." className="bg-transparent text-sm outline-none w-32 placeholder:text-text-muted" />
                        </div>
                        <Button variant="outline" size="sm" className="h-9 rounded-lg text-xs">
                          <Filter className="w-3.5 h-3.5 mr-1" /> Filter
                        </Button>
                        <Button variant="outline" size="sm" className="h-9 rounded-lg text-xs">
                          <Download className="w-3.5 h-3.5 mr-1" /> Export
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border-light bg-bg-primary/50">
                            <th className="text-left px-4 py-3 text-xs font-medium text-text-muted">User</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-text-muted">Role</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-text-muted hidden md:table-cell">Location</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-text-muted hidden sm:table-cell">Joined</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-text-muted">Status</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-text-muted">KYC</th>
                            <th className="text-right px-4 py-3 text-xs font-medium text-text-muted">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUsers.map((user) => (
                            <tr key={user.id} className="border-b border-border-light hover:bg-bg-primary/30 transition-colors">
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2.5">
                                  <div className={`w-8 h-8 rounded-full ${user.color} flex items-center justify-center text-white text-xs font-bold`}>
                                    {user.initials}
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-text-primary">{user.name}</p>
                                    <p className="text-[10px] text-text-muted">{user.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <Badge variant="outline" className="text-[10px] h-5">{user.role}</Badge>
                              </td>
                              <td className="px-4 py-3 text-xs text-text-secondary hidden md:table-cell">{user.location}</td>
                              <td className="px-4 py-3 text-xs text-text-secondary hidden sm:table-cell">{user.joined}</td>
                              <td className="px-4 py-3"><StatusBadge status={user.status} /></td>
                              <td className="px-4 py-3"><StatusBadge status={user.kyc} /></td>
                              <td className="px-4 py-3 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <button className="p-1.5 rounded-lg hover:bg-bg-primary transition-colors" title="View">
                                    <Eye className="w-3.5 h-3.5 text-text-muted" />
                                  </button>
                                  <button className="p-1.5 rounded-lg hover:bg-bg-primary transition-colors" title="Block">
                                    <Ban className="w-3.5 h-3.5 text-text-muted" />
                                  </button>
                                  <button className="p-1.5 rounded-lg hover:bg-bg-primary transition-colors" title="More">
                                    <MoreHorizontal className="w-3.5 h-3.5 text-text-muted" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* ====== KYC REVIEW VIEW ====== */}
            {activeNav === 'kyc' && (
              <motion.div
                key="kyc"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <Tabs value={kycTab} onValueChange={setKycTab}>
                  <TabsList className="bg-white border border-border-light p-1 rounded-xl h-auto">
                    <TabsTrigger value="pending" className="rounded-lg px-4 py-2 text-xs data-[state=active]:bg-krishiva-green data-[state=active]:text-white">
                      Pending ({kycPending.length})
                    </TabsTrigger>
                    <TabsTrigger value="approved" className="rounded-lg px-4 py-2 text-xs data-[state=active]:bg-krishiva-green data-[state=active]:text-white">
                      Approved ({kycApproved.length})
                    </TabsTrigger>
                    <TabsTrigger value="rejected" className="rounded-lg px-4 py-2 text-xs data-[state=active]:bg-krishiva-green data-[state=active]:text-white">
                      Rejected ({kycRejected.length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="pending" className="mt-4 space-y-3">
                    {kycPending.map((kyc) => (
                      <Card key={kyc.id} className="border-border-light shadow-card">
                        <CardContent className="p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-12 h-12 rounded-full ${kyc.color} flex items-center justify-center text-white font-bold`}>
                                {kyc.initials}
                              </div>
                              <div>
                                <p className="font-poppins font-semibold text-sm text-text-primary">{kyc.name}</p>
                                <p className="text-xs text-text-muted">{kyc.role} &middot; Submitted {kyc.submittedAt}</p>
                                <div className="flex flex-wrap gap-1 mt-1.5">
                                  {kyc.documents.map((doc) => (
                                    <Badge key={doc} variant="outline" className="text-[9px] h-4 px-1 border-blue-200 text-blue-600">
                                      {doc}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" className="bg-success-green hover:bg-green-700 text-white rounded-xl h-9 text-xs">
                                <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Approve
                              </Button>
                              <Button size="sm" variant="outline" className="border-error-red text-error-red hover:bg-error-red hover:text-white rounded-xl h-9 text-xs">
                                <XCircle className="w-3.5 h-3.5 mr-1" /> Reject
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="approved" className="mt-4 space-y-3">
                    {kycApproved.map((kyc) => (
                      <Card key={kyc.id} className="border-border-light shadow-card border-l-4 border-l-success-green">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-full ${kyc.color} flex items-center justify-center text-white font-bold`}>
                              {kyc.initials}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <p className="font-poppins font-semibold text-sm text-text-primary">{kyc.name}</p>
                                <StatusBadge status="Verified" />
                              </div>
                              <p className="text-xs text-text-muted">{kyc.role} &middot; Submitted {kyc.submittedAt}</p>
                              <div className="flex flex-wrap gap-1 mt-1.5">
                                {kyc.documents.map((doc) => (
                                  <Badge key={doc} variant="outline" className="text-[9px] h-4 px-1 border-green-200 text-green-600">
                                    <Check className="w-2.5 h-2.5 mr-0.5" /> {doc}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <CheckCircle2 className="w-5 h-5 text-success-green shrink-0" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="rejected" className="mt-4 space-y-3">
                    {kycRejected.map((kyc) => (
                      <Card key={kyc.id} className="border-border-light shadow-card border-l-4 border-l-error-red">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-full ${kyc.color} flex items-center justify-center text-white font-bold`}>
                              {kyc.initials}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <p className="font-poppins font-semibold text-sm text-text-primary">{kyc.name}</p>
                                <StatusBadge status="Rejected" />
                              </div>
                              <p className="text-xs text-text-muted">{kyc.role} &middot; Submitted {kyc.submittedAt}</p>
                              <div className="flex flex-wrap gap-1 mt-1.5">
                                {kyc.documents.map((doc) => (
                                  <Badge key={doc} variant="outline" className="text-[9px] h-4 px-1 border-red-200 text-red-600">
                                    <X className="w-2.5 h-2.5 mr-0.5" /> {doc}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <XCircle className="w-5 h-5 text-error-red shrink-0" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>
              </motion.div>
            )}

            {/* ====== DEALERS VIEW ====== */}
            {activeNav === 'dealers' && (
              <motion.div
                key="dealers"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <Tabs value={formTab} onValueChange={setFormTab}>
                  <TabsList className="bg-white border border-border-light p-1 rounded-xl h-auto">
                    <TabsTrigger value="dealer" className="rounded-lg px-4 py-2 text-xs data-[state=active]:bg-krishiva-green data-[state=active]:text-white">
                      Add Dealer
                    </TabsTrigger>
                    <TabsTrigger value="corporate" className="rounded-lg px-4 py-2 text-xs data-[state=active]:bg-krishiva-green data-[state=active]:text-white">
                      Add Corporate
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="dealer" className="mt-4">
                    <Card className="border-border-light shadow-card">
                      <CardHeader>
                        <h3 className="font-poppins font-semibold text-base text-text-primary flex items-center gap-2">
                          <Store className="w-5 h-5 text-krishiva-green" /> Add New Dealer
                        </h3>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-text-primary mb-1.5 block">Business Name</label>
                            <Input placeholder="Enter business name" className="h-11 rounded-xl border-border-light" />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-text-primary mb-1.5 block">Owner Name</label>
                            <Input placeholder="Enter owner name" className="h-11 rounded-xl border-border-light" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-text-primary mb-1.5 block">Email</label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                              <Input placeholder="email@business.com" className="h-11 rounded-xl border-border-light pl-10" />
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-text-primary mb-1.5 block">Phone</label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                              <Input placeholder="+91" className="h-11 rounded-xl border-border-light pl-10" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-text-primary mb-1.5 block">Business Address</label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                            <Input placeholder="Full address" className="h-11 rounded-xl border-border-light pl-10" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="text-sm font-medium text-text-primary mb-1.5 block">GST Number</label>
                            <Input placeholder="22AAAAA0000A1Z5" className="h-11 rounded-xl border-border-light" />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-text-primary mb-1.5 block">Trade License</label>
                            <Input placeholder="License number" className="h-11 rounded-xl border-border-light" />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-text-primary mb-1.5 block">Commission (%)</label>
                            <div className="relative">
                              <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                              <Input placeholder="2%" className="h-11 rounded-xl border-border-light pl-10" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-text-primary mb-1.5 block">Documents</label>
                          <div className="border-2 border-dashed border-border-light rounded-xl p-6 text-center hover:border-krishiva-green transition-colors cursor-pointer">
                            <Upload className="w-8 h-8 text-text-muted mx-auto mb-2" />
                            <p className="text-sm text-text-muted">Click to upload documents</p>
                            <p className="text-xs text-text-muted mt-1">PDF, JPG up to 10MB</p>
                          </div>
                        </div>
                        <div className="flex justify-end gap-3">
                          <Button variant="outline" className="rounded-xl h-11 px-6">Cancel</Button>
                          <Button className="bg-krishiva-green hover:bg-[#1B5E20] text-white rounded-xl h-11 px-6">Add Dealer</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="corporate" className="mt-4">
                    <Card className="border-border-light shadow-card">
                      <CardHeader>
                        <h3 className="font-poppins font-semibold text-base text-text-primary flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-krishiva-green" /> Add New Corporate
                        </h3>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-text-primary mb-1.5 block">Company Name</label>
                            <Input placeholder="Enter company name" className="h-11 rounded-xl border-border-light" />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-text-primary mb-1.5 block">Contact Person</label>
                            <Input placeholder="Enter contact person name" className="h-11 rounded-xl border-border-light" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-text-primary mb-1.5 block">Email</label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                              <Input placeholder="email@company.com" className="h-11 rounded-xl border-border-light pl-10" />
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-text-primary mb-1.5 block">Phone</label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                              <Input placeholder="+91" className="h-11 rounded-xl border-border-light pl-10" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-text-primary mb-1.5 block">Company Address</label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                            <Input placeholder="Full address" className="h-11 rounded-xl border-border-light pl-10" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="text-sm font-medium text-text-primary mb-1.5 block">GST Number</label>
                            <Input placeholder="22AAAAA0000A1Z5" className="h-11 rounded-xl border-border-light" />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-text-primary mb-1.5 block">CIN Number</label>
                            <Input placeholder="L01631KA2010PTC096843" className="h-11 rounded-xl border-border-light" />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-text-primary mb-1.5 block">Annual Turnover</label>
                            <div className="relative">
                              <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                              <Input placeholder="In Crores" className="h-11 rounded-xl border-border-light pl-10" />
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-text-primary mb-1.5 block">Industry Type</label>
                            <Input placeholder="e.g., Food Processing" className="h-11 rounded-xl border-border-light" />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-text-primary mb-1.5 block">Procurement Capacity</label>
                            <Input placeholder="e.g., 1000 Quintal/Month" className="h-11 rounded-xl border-border-light" />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-text-primary mb-1.5 block">Documents</label>
                          <div className="border-2 border-dashed border-border-light rounded-xl p-6 text-center hover:border-krishiva-green transition-colors cursor-pointer">
                            <Upload className="w-8 h-8 text-text-muted mx-auto mb-2" />
                            <p className="text-sm text-text-muted">Click to upload documents</p>
                            <p className="text-xs text-text-muted mt-1">PDF, JPG up to 10MB</p>
                          </div>
                        </div>
                        <div className="flex justify-end gap-3">
                          <Button variant="outline" className="rounded-xl h-11 px-6">Cancel</Button>
                          <Button className="bg-krishiva-green hover:bg-[#1B5E20] text-white rounded-xl h-11 px-6">Add Corporate</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>
            )}

            {/* ====== CORPORATES VIEW ====== */}
            {activeNav === 'corporates' && (
              <motion.div
                key="corporates"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-border-light shadow-card">
                  <CardHeader>
                    <h3 className="font-poppins font-semibold text-base text-text-primary">Registered Corporates</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {userRows.filter(u => u.role === 'Corporate').map((corp) => (
                        <div key={corp.id} className="flex items-center gap-4 p-4 bg-bg-primary rounded-xl">
                          <div className={`w-12 h-12 rounded-full ${corp.color} flex items-center justify-center text-white font-bold`}>
                            {corp.initials}
                          </div>
                          <div className="flex-1">
                            <p className="font-poppins font-semibold text-sm text-text-primary">{corp.name}</p>
                            <p className="text-xs text-text-muted">{corp.email} &middot; {corp.location}</p>
                          </div>
                          <StatusBadge status={corp.status} />
                        </div>
                      ))}
                      {userRows.filter(u => u.role === 'Corporate').length === 0 && (
                        <p className="text-center text-text-muted text-sm py-8">No corporates registered yet.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* ====== CONTENT VIEW ====== */}
            {activeNav === 'content' && (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-border-light shadow-card">
                  <CardHeader>
                    <h3 className="font-poppins font-semibold text-base text-text-primary flex items-center gap-2">
                      <FileText className="w-5 h-5 text-krishiva-green" /> Content Management
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {['Homepage Banner', 'Mandi Price Updates', 'Government Schemes', 'News Articles', 'Expert Videos'].map((item, i) => (
                      <div key={item} className="flex items-center justify-between p-4 bg-bg-primary rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-krishiva-green/10 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-krishiva-green" />
                          </div>
                          <div>
                            <p className="font-medium text-sm text-text-primary">{item}</p>
                            <p className="text-xs text-text-muted">Last updated {i + 1} day{i > 0 ? 's' : ''} ago</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-xl text-xs h-9">
                          <Edit3 className="w-3.5 h-3.5 mr-1" /> Edit
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* ====== ANALYTICS VIEW ====== */}
            {activeNav === 'analytics' && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  {analyticsCards.map((card, i) => (
                    <motion.div
                      key={card.label}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <Card className="border-border-light shadow-card">
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between mb-4">
                            <div className={`w-10 h-10 rounded-xl ${card.lightColor} flex items-center justify-center`}>
                              <card.icon className="w-5 h-5" />
                            </div>
                            <div className="flex items-center gap-1 text-success-green text-xs font-medium">
                              <ArrowUpRight className="w-3.5 h-3.5" />
                              {card.change}
                            </div>
                          </div>
                          <p className="font-poppins font-bold text-2xl text-text-primary">{card.value}</p>
                          <p className="text-xs text-text-muted mt-0.5">{card.label}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                <Card className="border-border-light shadow-card">
                  <CardHeader>
                    <h3 className="font-poppins font-semibold text-base text-text-primary">Platform Growth</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-end justify-around gap-2">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, i) => (
                        <div key={month} className="flex flex-col items-center gap-2 flex-1">
                          <div
                            className="w-full max-w-[60px] bg-krishiva-green/20 rounded-t-lg relative group cursor-pointer"
                            style={{ height: `${(i + 1) * 40 + 40}px` }}
                          >
                            <div
                              className="absolute bottom-0 left-0 right-0 bg-krishiva-green rounded-t-lg transition-all group-hover:bg-[#1B5E20]"
                              style={{ height: `${(i + 1) * 25 + 20}%` }}
                            />
                          </div>
                          <span className="text-xs text-text-muted">{month}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* ====== SETTINGS VIEW ====== */}
            {activeNav === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-border-light shadow-card max-w-2xl">
                  <CardHeader>
                    <h3 className="font-poppins font-semibold text-base text-text-primary flex items-center gap-2">
                      <Settings className="w-5 h-5 text-krishiva-green" /> Admin Settings
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[
                      { label: 'Platform Name', value: 'KRISHIVA', desc: 'Public facing platform name' },
                      { label: 'Support Email', value: 'support@krishiva.com', desc: 'Customer support email address' },
                      { label: 'Support Phone', value: '1800-123-4567', desc: 'Toll-free support number' },
                      { label: 'Commission Rate', value: '2%', desc: 'Default commission on deals' },
                    ].map((setting) => (
                      <div key={setting.label} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-border-light last:border-0">
                        <div>
                          <p className="text-sm font-medium text-text-primary">{setting.label}</p>
                          <p className="text-xs text-text-muted">{setting.desc}</p>
                        </div>
                        <Input defaultValue={setting.value} className="h-10 rounded-xl border-border-light w-full sm:w-56" />
                      </div>
                    ))}
                    <div className="flex justify-end gap-3">
                      <Button variant="outline" className="rounded-xl h-11 px-6">Reset</Button>
                      <Button className="bg-krishiva-green hover:bg-[#1B5E20] text-white rounded-xl h-11 px-6">Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
