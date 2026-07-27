import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, UserPlus, Store, Tractor, Plane, HardHat, Wheat,
  Megaphone, TicketCheck, Trophy, Bell, Search, TrendingUp, ArrowUpRight, Upload, X,
  ArrowDownRight, Star, MapPin, Phone, Mail, ChevronRight, AlertTriangle,
  CheckCircle2, Clock, Briefcase, BarChart3, Leaf, Target
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, value: 'dashboard' },
  { label: 'Onboarding', icon: UserPlus, value: 'onboarding' },
  { label: 'Marketing', icon: Megaphone, value: 'marketing' },
  { label: 'Tickets', icon: TicketCheck, value: 'tickets' },
  { label: 'Leaderboard', icon: Trophy, value: 'leaderboard' },
];

const myStats = [
  { label: 'My Farmers', value: '42', change: '+5', icon: Users, color: 'bg-blue-50 text-blue-600' },
  { label: 'Onboarded', value: '38', change: '+3', icon: UserPlus, color: 'bg-green-50 text-green-600' },
  { label: 'Pending KYC', value: '4', change: '-2', icon: Clock, color: 'bg-amber-50 text-amber-600' },
  { label: 'My Points', value: '1,850', change: '+120', icon: Star, color: 'bg-purple-50 text-purple-600' },
];

const myFarmers = [
  { id: 1, name: 'Rajesh Kumar', location: 'Guntur, AP', phone: '+91 98765 43210', status: 'Active', crops: 'Wheat, Rice', lastActive: '2 hours ago', initials: 'RK', color: 'bg-green-600', points: 50 },
  { id: 2, name: 'Lakshmi Devi', location: 'Prakasam, AP', phone: '+91 98765 43211', status: 'Active', crops: 'Cotton, Maize', lastActive: '5 hours ago', initials: 'LD', color: 'bg-pink-600', points: 45 },
  { id: 3, name: 'Venkatesh Rao', location: 'Nellore, AP', phone: '+91 98765 43212', status: 'Inactive', crops: 'Groundnut', lastActive: '3 days ago', initials: 'VR', color: 'bg-amber-600', points: 30 },
  { id: 4, name: 'Padma Rani', location: 'Kurnool, AP', phone: '+91 98765 43213', status: 'KYC Pending', crops: 'Tomato, Onion', lastActive: '1 week ago', initials: 'PR', color: 'bg-red-600', points: 20 },
  { id: 5, name: 'Suresh Naidu', location: 'West Godavari, AP', phone: '+91 98765 43214', status: 'Active', crops: 'Chilli, Paddy', lastActive: '1 day ago', initials: 'SN', color: 'bg-blue-600', points: 60 },
];

const notifications = [
  { id: 1, type: 'alert', message: 'Venkatesh Rao has been inactive for 3 days', time: '2 hours ago', priority: 'high' },
  { id: 2, type: 'ticket', message: 'New support ticket from Lakshmi Devi', time: '4 hours ago', priority: 'medium' },
  { id: 3, type: 'kyc', message: 'Padma Rani KYC documents need review', time: '1 day ago', priority: 'high' },
  { id: 4, type: 'success', message: 'Rajesh Kumar completed a deal worth Rs 45,000', time: '1 day ago', priority: 'low' },
];

const onboardingOptions = [
  { label: 'Farmer', icon: Users, desc: 'Onboard new farmers', path: '/employee/onboard/farmer', color: 'bg-green-50 text-green-600', count: 42 },
  { label: 'Fertilizer Shop', icon: Store, desc: 'Register fertilizer dealers', path: '/employee/onboard/fertilizer', color: 'bg-blue-50 text-blue-600', count: 15 },
  { label: 'Drone Service', icon: Plane, desc: 'Register drone operators', path: '/employee/onboard/drone', color: 'bg-cyan-50 text-cyan-600', count: 8 },
  { label: 'Tractor Owner', icon: Tractor, desc: 'Register tractor rentals', path: '/employee/onboard/tractor', color: 'bg-orange-50 text-orange-600', count: 23 },
  { label: 'Labor', icon: HardHat, desc: 'Register farm workers', path: '/employee/onboard/labor', color: 'bg-purple-50 text-purple-600', count: 120 },
  { label: 'Paddy Buyer', icon: Wheat, desc: 'Register rice mill buyers', path: '/employee/onboard/buyer', color: 'bg-amber-50 text-amber-600', count: 12 },
];

const leaderboardData = [
  { rank: 1, name: 'Priya Sharma', farmers: 68, points: 3200, color: 'bg-yellow-50 border-yellow-200' },
  { rank: 2, name: 'Ravi Teja K', farmers: 42, points: 1850, color: 'bg-gray-50 border-gray-200' },
  { rank: 3, name: 'Anil Kumar', farmers: 38, points: 1720, color: 'bg-orange-50 border-orange-200' },
  { rank: 4, name: 'Sneha Reddy', farmers: 35, points: 1580, color: '' },
  { rank: 5, name: 'Mohan Babu', farmers: 30, points: 1340, color: '' },
];

const tickets = [
  { id: 1, farmer: 'Lakshmi Devi', issue: 'Payment not received for last deal', status: 'Open', priority: 'High', date: '2 hours ago' },
  { id: 2, farmer: 'Krishna Traders', issue: 'Request for price negotiation', status: 'In Progress', priority: 'Medium', date: '1 day ago' },
  { id: 3, farmer: 'Srinivas Agro', issue: 'Crop quality dispute', status: 'Resolved', priority: 'Low', date: '3 days ago' },
];

export default function EmployeeDashboard() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const activeItem = navItems.find(n => n.value === activeNav) || navItems[0];
  const ActiveIcon = activeItem.icon;

  return (
    <div className="min-h-[100dvh] bg-[#F8F9FA] flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-[240px] bg-[#111827] z-40">
        <div className="h-16 flex items-center px-5 border-b border-gray-800">
          <div className="w-8 h-8 rounded-lg bg-[#2E7D32] flex items-center justify-center shrink-0 mr-3"><Briefcase className="w-4 h-4 text-white" /></div>
          <span className="font-poppins font-bold text-base text-white">Employee Portal</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map(item => (
            <button key={item.value} onClick={() => setActiveNav(item.value)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${activeNav === item.value ? 'bg-[#2E7D32] text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
              <item.icon className="w-[20px] h-[20px] shrink-0" />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-800">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-9 h-9 rounded-full bg-[#2E7D32] flex items-center justify-center text-white text-sm font-medium">RT</div>
            <div><p className="text-sm font-medium text-white">Ravi Teja K</p><p className="text-xs text-gray-500">EMP-1001</p></div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>{sidebarOpen && (<><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)} /><motion.aside initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }} className="lg:hidden fixed left-0 top-0 h-full w-[240px] bg-[#111827] z-50 flex flex-col"><div className="h-16 flex items-center justify-between px-4 border-b border-gray-800"><span className="font-poppins font-bold text-base text-white">Employee Portal</span><button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg hover:bg-gray-800"><X className="w-5 h-5 text-gray-400" /></button></div><nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">{navItems.map(item => (<button key={item.value} onClick={() => { setActiveNav(item.value); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${activeNav === item.value ? 'bg-[#2E7D32] text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}><item.icon className="w-[20px] h-[20px] shrink-0" /><span className="font-medium text-sm">{item.label}</span></button>))}</nav></motion.aside></>)}</AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-[100dvh] lg:ml-[240px]">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-[#E5E7EB] flex items-center px-4 sm:px-6 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-[#F3F4F6] mr-2"><LayoutDashboard className="w-5 h-5 text-[#6B7280]" /></button>
          <div className="flex items-center gap-2"><ActiveIcon className="w-5 h-5 text-[#2E7D32]" /><h1 className="font-poppins font-semibold text-lg text-[#111827] capitalize">{activeItem.label}</h1></div>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden sm:flex items-center bg-[#F3F4F6] rounded-xl px-3 h-10"><Search className="w-4 h-4 text-[#9CA3AF] mr-2" /><input type="text" placeholder="Search..." className="bg-transparent text-sm outline-none w-40 placeholder:text-[#9CA3AF]" /></div>
            <button className="p-2.5 rounded-xl hover:bg-[#F3F4F6] transition-colors relative"><Bell className="w-5 h-5 text-[#6B7280]" /><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" /></button>
            <div className="w-9 h-9 rounded-full bg-[#2E7D32] flex items-center justify-center text-white text-sm font-medium hidden sm:flex">RT</div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <AnimatePresence mode="wait">
            {/* ====== DASHBOARD ====== */}
            {activeNav === 'dashboard' && (
              <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  {myStats.map((stat, i) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                      <Card className="border-[#E5E7EB] shadow-none hover:shadow-sm transition-all"><CardContent className="p-5">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-10 h-10 rounded-xl ${stat.color.split(' ')[0]} flex items-center justify-center`}><stat.icon className={`w-5 h-5 ${stat.color.split(' ')[1]}`} /></div>
                          <div className="flex items-center gap-1 text-[#2E7D32] text-xs font-medium"><ArrowUpRight className="w-3.5 h-3.5" />{stat.change}</div>
                        </div>
                        <p className="font-poppins font-bold text-2xl text-[#111827]">{stat.value}</p>
                        <p className="text-xs text-[#9CA3AF] mt-0.5">{stat.label}</p>
                      </CardContent></Card>
                    </motion.div>
                  ))}
                </div>

                {/* Two Column */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  {/* My Farmers */}
                  <div className="xl:col-span-2 space-y-6">
                    <Card className="border-[#E5E7EB] shadow-none">
                      <CardHeader className="pb-2"><div className="flex items-center justify-between"><h3 className="font-poppins font-semibold text-base text-[#111827]">My Farmers</h3><Button variant="outline" size="sm" className="h-8 text-xs rounded-lg" onClick={() => setActiveNav('onboarding')}><UserPlus className="w-3.5 h-3.5 mr-1" /> Add Farmer</Button></div></CardHeader>
                      <CardContent className="p-0">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead><tr className="border-b border-[#E5E7EB] bg-[#F8F9FA]"><th className="text-left px-4 py-3 text-xs font-medium text-[#9CA3AF]">Farmer</th><th className="text-left px-4 py-3 text-xs font-medium text-[#9CA3AF] hidden sm:table-cell">Location</th><th className="text-left px-4 py-3 text-xs font-medium text-[#9CA3AF]">Status</th><th className="text-left px-4 py-3 text-xs font-medium text-[#9CA3AF] hidden md:table-cell">Last Active</th><th className="text-right px-4 py-3 text-xs font-medium text-[#9CA3AF]">Points</th></tr></thead>
                            <tbody>
                              {myFarmers.map(f => (
                                <tr key={f.id} className="border-b border-[#E5E7EB] hover:bg-[#F8F9FA] transition-colors">
                                  <td className="px-4 py-3"><div className="flex items-center gap-2.5"><div className={`w-8 h-8 rounded-full ${f.color} flex items-center justify-center text-white text-xs font-bold`}>{f.initials}</div><div><p className="text-sm font-medium text-[#111827]">{f.name}</p><p className="text-[10px] text-[#9CA3AF]">{f.phone}</p></div></div></td>
                                  <td className="px-4 py-3 text-xs text-[#6B7280] hidden sm:table-cell"><div className="flex items-center gap-1"><MapPin className="w-3 h-3" />{f.location}</div></td>
                                  <td className="px-4 py-3"><Badge variant="outline" className={`text-[10px] h-5 ${f.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : f.status === 'Inactive' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>{f.status}</Badge></td>
                                  <td className="px-4 py-3 text-xs text-[#6B7280] hidden md:table-cell">{f.lastActive}</td>
                                  <td className="px-4 py-3 text-right"><span className="text-sm font-semibold text-[#2E7D32]">+{f.points}</span></td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Notifications */}
                  <div className="space-y-6">
                    <Card className="border-[#E5E7EB] shadow-none">
                      <CardHeader className="pb-2"><h3 className="font-poppins font-semibold text-base text-[#111827]">Notifications</h3></CardHeader>
                      <CardContent className="p-4 space-y-3">
                        {notifications.map(n => (
                          <div key={n.id} className={`flex items-start gap-3 p-3 rounded-xl ${n.priority === 'high' ? 'bg-red-50 border border-red-100' : n.priority === 'medium' ? 'bg-amber-50 border border-amber-100' : 'bg-[#F8F9FA]'}`}>
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${n.type === 'alert' ? 'bg-red-100' : n.type === 'ticket' ? 'bg-blue-100' : n.type === 'kyc' ? 'bg-amber-100' : 'bg-green-100'}`}>
                              {n.type === 'alert' ? <AlertTriangle className="w-4 h-4 text-red-600" /> : n.type === 'ticket' ? <TicketCheck className="w-4 h-4 text-blue-600" /> : n.type === 'kyc' ? <Clock className="w-4 h-4 text-amber-600" /> : <CheckCircle2 className="w-4 h-4 text-green-600" />}
                            </div>
                            <div className="flex-1 min-w-0"><p className="text-xs text-[#111827] leading-relaxed">{n.message}</p><p className="text-[10px] text-[#9CA3AF] mt-0.5">{n.time}</p></div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="border-[#E5E7EB] shadow-none">
                      <CardHeader className="pb-2"><h3 className="font-poppins font-semibold text-base text-[#111827]">Quick Actions</h3></CardHeader>
                      <CardContent className="p-4 space-y-2">
                        <Button onClick={() => setActiveNav('onboarding')} className="w-full h-10 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl text-xs justify-start"><UserPlus className="w-4 h-4 mr-2" /> Onboard New Farmer</Button>
                        <Button onClick={() => setActiveNav('marketing')} variant="outline" className="w-full h-10 rounded-xl text-xs justify-start border-[#E5E7EB]"><Megaphone className="w-4 h-4 mr-2" /> Create Marketing Post</Button>
                        <Button onClick={() => setActiveNav('tickets')} variant="outline" className="w-full h-10 rounded-xl text-xs justify-start border-[#E5E7EB]"><TicketCheck className="w-4 h-4 mr-2" /> View Tickets (3)</Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ====== ONBOARDING ====== */}
            {activeNav === 'onboarding' && (
              <motion.div key="onboarding" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {onboardingOptions.map((opt, i) => (
                    <motion.div key={opt.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                      <button onClick={() => navigate(opt.path)} className="w-full text-left p-5 bg-white rounded-xl border border-[#E5E7EB] hover:shadow-sm hover:border-[#2E7D32]/30 transition-all group">
                        <div className="flex items-center justify-between mb-3">
                          <div className={`w-10 h-10 rounded-xl ${opt.color.split(' ')[0]} flex items-center justify-center`}><opt.icon className={`w-5 h-5 ${opt.color.split(' ')[1]}`} /></div>
                          <span className="text-xs font-medium text-[#9CA3AF]">{opt.count} registered</span>
                        </div>
                        <h4 className="font-semibold text-sm text-[#111827] group-hover:text-[#2E7D32] transition-colors">{opt.label}</h4>
                        <p className="text-xs text-[#9CA3AF] mt-0.5">{opt.desc}</p>
                        <div className="flex items-center gap-1 mt-3 text-[#2E7D32] text-xs font-medium"><span>Start Onboarding</span><ChevronRight className="w-3 h-3" /></div>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ====== MARKETING ====== */}
            {activeNav === 'marketing' && (
              <motion.div key="marketing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="max-w-2xl mx-auto">
                <Card className="border-[#E5E7EB] shadow-none">
                  <CardHeader><h3 className="font-poppins font-semibold text-base text-[#111827] flex items-center gap-2"><Megaphone className="w-5 h-5 text-[#2E7D32]" /> Create Marketing Post</h3><p className="text-xs text-[#9CA3AF]">Create marketing content for your farmers. Admin will review before posting.</p></CardHeader>
                  <CardContent className="space-y-4">
                    <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Post Title *</label><input type="text" className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none" placeholder="e.g., Best Wheat Seeds for Rabi Season" /></div>
                    <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Description *</label><textarea className="w-full h-28 px-4 py-3 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none resize-none" placeholder="Describe the product, offer, or information..." /></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Category *</label><select className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none bg-white"><option>Product Promotion</option><option>Price Update</option><option>Scheme Info</option><option>Event</option><option>General</option></select></div>
                      <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Target Farmers</label><select className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none bg-white"><option>All My Farmers</option><option>Active Only</option><option>Inactive Only</option><option>Specific Group</option></select></div>
                    </div>
                    <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Upload Image (optional)</label><div className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-6 text-center hover:border-[#2E7D32] transition-colors cursor-pointer"><Upload className="w-6 h-6 text-[#9CA3AF] mx-auto mb-2" /><p className="text-xs text-[#9CA3AF]">Click to upload image</p></div></div>
                    <div className="flex items-center gap-3 pt-2">
                      <Button className="h-11 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl px-6">Submit for Approval</Button>
                      <Button variant="outline" className="h-11 rounded-xl px-6 border-[#E5E7EB]">Save as Draft</Button>
                    </div>
                    <p className="text-[10px] text-[#9CA3AF]">This post will be sent to admin for review. You will be notified once it is approved or rejected.</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* ====== TICKETS ====== */}
            {activeNav === 'tickets' && (
              <motion.div key="tickets" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                <Card className="border-[#E5E7EB] shadow-none">
                  <CardHeader className="pb-2"><div className="flex items-center justify-between"><h3 className="font-poppins font-semibold text-base text-[#111827]">Support Tickets</h3><Badge className="bg-[#2E7D32]/10 text-[#2E7D32] text-[10px]">{tickets.length} tickets</Badge></div></CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead><tr className="border-b border-[#E5E7EB] bg-[#F8F9FA]"><th className="text-left px-4 py-3 text-xs font-medium text-[#9CA3AF]">Ticket</th><th className="text-left px-4 py-3 text-xs font-medium text-[#9CA3AF]">From</th><th className="text-left px-4 py-3 text-xs font-medium text-[#9CA3AF]">Priority</th><th className="text-left px-4 py-3 text-xs font-medium text-[#9CA3AF]">Status</th><th className="text-right px-4 py-3 text-xs font-medium text-[#9CA3AF]">Date</th></tr></thead>
                        <tbody>
                          {tickets.map(t => (
                            <tr key={t.id} className="border-b border-[#E5E7EB] hover:bg-[#F8F9FA] transition-colors">
                              <td className="px-4 py-3"><p className="text-sm font-medium text-[#111827]">#{1000 + t.id}</p><p className="text-xs text-[#6B7280]">{t.issue}</p></td>
                              <td className="px-4 py-3 text-sm text-[#111827]">{t.farmer}</td>
                              <td className="px-4 py-3"><Badge variant="outline" className={`text-[10px] h-5 ${t.priority === 'High' ? 'bg-red-50 text-red-700 border-red-200' : t.priority === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-green-50 text-green-700 border-green-200'}`}>{t.priority}</Badge></td>
                              <td className="px-4 py-3"><Badge variant="outline" className={`text-[10px] h-5 ${t.status === 'Open' ? 'bg-blue-50 text-blue-700' : t.status === 'In Progress' ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'}`}>{t.status}</Badge></td>
                              <td className="px-4 py-3 text-right text-xs text-[#9CA3AF]">{t.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* ====== LEADERBOARD ====== */}
            {activeNav === 'leaderboard' && (
              <motion.div key="leaderboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="max-w-2xl mx-auto space-y-6">
                <Card className="border-[#E5E7EB] shadow-none">
                  <CardHeader className="text-center pb-2">
                    <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-2"><Trophy className="w-7 h-7 text-purple-600" /></div>
                    <h3 className="font-poppins font-bold text-xl text-[#111827]">Employee Leaderboard</h3>
                    <p className="text-xs text-[#9CA3AF]">Rankings based on onboarding activities and farmer satisfaction</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {leaderboardData.map((emp, i) => (
                      <motion.div key={emp.rank} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className={`flex items-center gap-4 p-4 rounded-xl border ${emp.color || 'border-[#E5E7EB] bg-white'} ${emp.name === 'Ravi Teja K' ? 'ring-2 ring-[#2E7D32]' : ''}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${emp.rank === 1 ? 'bg-yellow-400 text-white' : emp.rank === 2 ? 'bg-gray-400 text-white' : emp.rank === 3 ? 'bg-orange-400 text-white' : 'bg-[#F3F4F6] text-[#6B7280]'}`}>{emp.rank}</div>
                        <div className="flex-1"><p className="font-semibold text-sm text-[#111827]">{emp.name} {emp.name === 'Ravi Teja K' && <span className="text-[10px] bg-[#2E7D32] text-white px-1.5 py-0.5 rounded-md ml-1">You</span>}</p><p className="text-xs text-[#9CA3AF]">{emp.farmers} farmers onboarded</p></div>
                        <div className="text-right"><p className="font-bold text-lg text-[#2E7D32]">{emp.points.toLocaleString()}</p><p className="text-[10px] text-[#9CA3AF]">points</p></div>
                      </motion.div>
                    ))}
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
