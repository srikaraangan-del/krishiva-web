import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, ShieldCheck, Store, Plane, Tractor, HardHat, Wheat,
  FileText, BarChart3, Settings, Bell, Search, CheckCircle2, XCircle, MessageSquare,
  Eye, UserCheck, TrendingUp, ArrowUpRight, Star, MapPin, Phone, Mail, ChevronRight,
  Briefcase, GraduationCap, Award, AlertTriangle, Clock, Check, X, Megaphone,
  ThumbsUp, ThumbsDown, Send, Filter, Download, MoreHorizontal, Ban
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Overview', icon: LayoutDashboard, value: 'overview' },
  { label: 'Applications', icon: FileText, value: 'applications' },
  { label: 'Employees', icon: Users, value: 'employees' },
  { label: 'Farmers', icon: UserCheck, value: 'farmers' },
  { label: 'Stakeholders', icon: Store, value: 'stakeholders' },
  { label: 'Marketing', icon: Megaphone, value: 'marketing' },
  { label: 'Analytics', icon: BarChart3, value: 'analytics' },
  { label: 'Settings', icon: Settings, value: 'settings' },
];

const analyticsCards = [
  { label: 'Total Employees', value: '24', change: '+3', icon: Users, color: 'bg-blue-50 text-blue-600' },
  { label: 'Total Farmers', value: '1,240', change: '+85', icon: UserCheck, color: 'bg-green-50 text-green-600' },
  { label: 'Stakeholders', value: '186', change: '+12', icon: Store, color: 'bg-purple-50 text-purple-600' },
  { label: 'Pending Approvals', value: '8', change: '-2', icon: FileText, color: 'bg-amber-50 text-amber-600' },
];

const employeeApplications = [
  { id: 1, name: 'Ravi Teja Kondepudi', age: 26, dob: '1998-05-15', mobile: '+91 98765 43210', email: 'raviteja@email.com', degree: 'B.Sc Agriculture', degreeInstitution: 'Acharya N.G. Ranga University', degreeYear: '2020', postGraduation: 'M.Sc Agronomy', pgInstitution: 'PAU Ludhiana', pgYear: '2022', status: 'Pending', appliedDate: '2025-07-20', initials: 'RT', color: 'bg-blue-600' },
  { id: 2, name: 'Priya Sharma', age: 24, dob: '2000-03-10', mobile: '+91 98765 43211', email: 'priya@email.com', degree: 'B.Tech Agriculture', degreeInstitution: 'IIT Kharagpur', degreeYear: '2022', postGraduation: '', pgInstitution: '', pgYear: '', status: 'Approved', appliedDate: '2025-07-15', initials: 'PS', color: 'bg-pink-600' },
  { id: 3, name: 'Anil Kumar', age: 28, dob: '1996-11-22', mobile: '+91 98765 43212', email: 'anil@email.com', degree: 'B.Sc Horticulture', degreeInstitution: 'Dr. YSRHU', degreeYear: '2019', postGraduation: 'MBA Agribusiness', pgInstitution: 'ICFAI', pgYear: '2021', status: 'Pending', appliedDate: '2025-07-22', initials: 'AK', color: 'bg-green-600' },
  { id: 4, name: 'Sneha Reddy', age: 23, dob: '2001-08-05', mobile: '+91 98765 43213', email: 'sneha@email.com', degree: 'B.Sc Agriculture', degreeInstitution: 'ANGRAU', degreeYear: '2023', postGraduation: '', pgInstitution: '', pgYear: '', status: 'Rejected', appliedDate: '2025-07-10', initials: 'SR', color: 'bg-red-600' },
];

const employees = [
  { id: 'EMP-1001', name: 'Ravi Teja Kondepudi', department: 'Farmer Relations', location: 'Guntur', farmers: 42, points: 1850, status: 'Active', initials: 'RT', color: 'bg-blue-600' },
  { id: 'EMP-1002', name: 'Priya Sharma', department: 'Farmer Relations', location: 'Prakasam', farmers: 68, points: 3200, status: 'Active', initials: 'PS', color: 'bg-pink-600' },
  { id: 'EMP-1003', name: 'Anil Kumar', department: 'Stakeholder Relations', location: 'Nellore', farmers: 38, points: 1720, status: 'Active', initials: 'AK', color: 'bg-green-600' },
  { id: 'EMP-1004', name: 'Sneha Reddy', department: 'Marketing', location: 'Kurnool', farmers: 35, points: 1580, status: 'On Leave', initials: 'SR', color: 'bg-purple-600' },
  { id: 'EMP-1005', name: 'Mohan Babu', department: 'Farmer Relations', location: 'West Godavari', farmers: 30, points: 1340, status: 'Active', initials: 'MB', color: 'bg-amber-600' },
];

const allFarmers = [
  { id: 1, name: 'Rajesh Kumar', location: 'Guntur, AP', phone: '+91 98765 43210', area: '25 acres', crops: 'Wheat, Rice', status: 'Active', emp: 'Ravi Teja K', initials: 'RK', color: 'bg-green-600' },
  { id: 2, name: 'Lakshmi Devi', location: 'Prakasam, AP', phone: '+91 98765 43211', area: '12 acres', crops: 'Cotton, Maize', status: 'Active', emp: 'Priya Sharma', initials: 'LD', color: 'bg-pink-600' },
  { id: 3, name: 'Venkatesh Rao', location: 'Nellore, AP', phone: '+91 98765 43212', area: '8 acres', crops: 'Groundnut', status: 'Inactive', emp: 'Ravi Teja K', initials: 'VR', color: 'bg-amber-600' },
  { id: 4, name: 'Padma Rani', location: 'Kurnool, AP', phone: '+91 98765 43213', area: '15 acres', crops: 'Tomato, Onion', status: 'KYC Pending', emp: 'Ravi Teja K', initials: 'PR', color: 'bg-red-600' },
  { id: 5, name: 'Suresh Naidu', location: 'West Godavari, AP', phone: '+91 98765 43214', area: '20 acres', crops: 'Chilli, Paddy', status: 'Active', emp: 'Anil Kumar', initials: 'SN', color: 'bg-blue-600' },
];

const stakeholders = [
  { type: 'Fertilizer Shop', name: 'Sri Lakshmi Fertilizers', location: 'Guntur', contact: '+91 98765 11111', products: 12, emp: 'Ravi Teja K', status: 'Active' },
  { type: 'Drone Service', name: 'AgriDrone Solutions', location: 'Vijayawada', contact: '+91 98765 22222', products: 4, emp: 'Priya Sharma', status: 'Active' },
  { type: 'Tractor Owner', name: 'Mallikarjuna Tractors', location: 'Guntur', contact: '+91 98765 33333', products: 3, emp: 'Anil Kumar', status: 'Active' },
  { type: 'Labor', name: 'Ramesh (Farm Worker)', location: 'Prakasam', contact: '+91 98765 44444', products: 5, emp: 'Ravi Teja K', status: 'Available' },
  { type: 'Paddy Buyer', name: 'Sai Krishna Rice Mill', location: 'Guntur', contact: '+91 98765 55555', products: 4, emp: 'Priya Sharma', status: 'Active' },
];

const marketingQueue = [
  { id: 1, title: 'Best Wheat Seeds for Rabi Season - 2025', desc: 'High-yield wheat seeds from Kaveri Seeds with 15% discount for bulk orders. Limited time offer for registered farmers.', author: 'Ravi Teja K', date: '2 hours ago', category: 'Product Promotion', image: true, status: 'Pending' },
  { id: 2, title: 'PM-KISAN 17th Installment Notification', desc: 'Information about the upcoming PM-KISAN installment and how farmers can check their beneficiary status.', author: 'Priya Sharma', date: '5 hours ago', category: 'Scheme Info', image: false, status: 'Pending' },
  { id: 3, title: 'Organic Fertilizer Workshop - Guntur', desc: 'Free workshop on organic farming techniques and fertilizer usage. Date: 15th August 2025. Venue: Krishi Vigyan Kendra, Guntur.', author: 'Anil Kumar', date: '1 day ago', category: 'Event', image: true, status: 'Approved' },
  { id: 4, title: 'Cotton Price Update - July 2025', desc: 'Current cotton prices at Guntur mandi showing 8% increase from last month. Best time to sell for farmers.', author: 'Ravi Teja K', date: '2 days ago', category: 'Price Update', image: false, status: 'Rejected' },
  { id: 5, title: 'New Drip Irrigation Subsidy Scheme', desc: 'Government announces 75% subsidy on drip irrigation systems for small farmers. Application deadline: 30th August.', author: 'Priya Sharma', date: '3 days ago', category: 'Scheme Info', image: true, status: 'Pending' },
];

export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [appFilter, setAppFilter] = useState('all');
  const [marketingFilter, setMarketingFilter] = useState('pending');
  const [selectedApp, setSelectedApp] = useState<typeof employeeApplications[0] | null>(null);
  const [selectedMarketing, setSelectedMarketing] = useState<typeof marketingQueue[0] | null>(null);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  const activeItem = navItems.find(n => n.value === activeNav) || navItems[0];
  const ActiveIcon = activeItem.icon;

  const filteredApps = appFilter === 'all' ? employeeApplications : employeeApplications.filter(a => a.status.toLowerCase() === appFilter);
  const filteredMarketing = marketingFilter === 'all' ? marketingQueue : marketingQueue.filter(m => m.status.toLowerCase() === marketingFilter);

  return (
    <div className="min-h-[100dvh] bg-[#F8F9FA] flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-[260px] bg-[#111827] z-40">
        <div className="h-16 flex items-center px-5 border-b border-gray-800">
          <div className="w-8 h-8 rounded-lg bg-[#2E7D32] flex items-center justify-center shrink-0 mr-3"><ShieldCheck className="w-4 h-4 text-white" /></div>
          <span className="font-poppins font-bold text-base text-white">KRISHIVA Admin</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map(item => (
            <button key={item.value} onClick={() => { setActiveNav(item.value); setSelectedApp(null); setSelectedMarketing(null); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${activeNav === item.value ? 'bg-[#2E7D32] text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
              <item.icon className="w-[20px] h-[20px] shrink-0" /><span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-800">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-9 h-9 rounded-full bg-[#2E7D32] flex items-center justify-center text-white text-sm font-medium">AD</div>
            <div><p className="text-sm font-medium text-white">Super Admin</p><p className="text-xs text-gray-500">admin@krishiva.com</p></div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>{sidebarOpen && (<><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)} /><motion.aside initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }} className="lg:hidden fixed left-0 top-0 h-full w-[260px] bg-[#111827] z-50 flex flex-col"><div className="h-16 flex items-center justify-between px-4 border-b border-gray-800"><span className="font-poppins font-bold text-base text-white">KRISHIVA Admin</span><button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg hover:bg-gray-800"><X className="w-5 h-5 text-gray-400" /></button></div><nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">{navItems.map(item => (<button key={item.value} onClick={() => { setActiveNav(item.value); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${activeNav === item.value ? 'bg-[#2E7D32] text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}><item.icon className="w-[20px] h-[20px] shrink-0" /><span className="font-medium text-sm">{item.label}</span></button>))}</nav></motion.aside></>)}</AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-[100dvh] lg:ml-[260px]">
        <header className="h-16 bg-white border-b border-[#E5E7EB] flex items-center px-4 sm:px-6 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-[#F3F4F6] mr-2"><LayoutDashboard className="w-5 h-5 text-[#6B7280]" /></button>
          <div className="flex items-center gap-2"><ActiveIcon className="w-5 h-5 text-[#2E7D32]" /><h1 className="font-poppins font-semibold text-lg text-[#111827] capitalize">{activeItem.label}</h1></div>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden sm:flex items-center bg-[#F3F4F6] rounded-xl px-3 h-10"><Search className="w-4 h-4 text-[#9CA3AF] mr-2" /><input type="text" placeholder="Search..." className="bg-transparent text-sm outline-none w-40 placeholder:text-[#9CA3AF]" /></div>
            <button className="p-2.5 rounded-xl hover:bg-[#F3F4F6] transition-colors relative"><Bell className="w-5 h-5 text-[#6B7280]" /><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" /></button>
            <div className="w-9 h-9 rounded-full bg-[#2E7D32] flex items-center justify-center text-white text-sm font-medium hidden sm:flex">AD</div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <AnimatePresence mode="wait">
            {/* ====== OVERVIEW ====== */}
            {activeNav === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  {analyticsCards.map((card, i) => (
                    <motion.div key={card.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                      <Card className="border-[#E5E7EB] shadow-none hover:shadow-sm transition-all"><CardContent className="p-5">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-10 h-10 rounded-xl ${card.color.split(' ')[0]} flex items-center justify-center`}><card.icon className={`w-5 h-5 ${card.color.split(' ')[1]}`} /></div>
                          <div className="flex items-center gap-1 text-[#2E7D32] text-xs font-medium"><ArrowUpRight className="w-3.5 h-3.5" />{card.change}</div>
                        </div>
                        <p className="font-poppins font-bold text-2xl text-[#111827]">{card.value}</p>
                        <p className="text-xs text-[#9CA3AF] mt-0.5">{card.label}</p>
                      </CardContent></Card>
                    </motion.div>
                  ))}
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <Card className="border-[#E5E7EB] shadow-none">
                    <CardHeader className="pb-2"><div className="flex items-center justify-between"><h3 className="font-poppins font-semibold text-base text-[#111827]">Pending Employee Applications</h3><button onClick={() => setActiveNav('applications')} className="text-xs text-[#2E7D32] font-medium hover:underline">View All</button></div></CardHeader>
                    <CardContent className="p-0">
                      {employeeApplications.filter(a => a.status === 'Pending').map(app => (
                        <div key={app.id} className="flex items-center gap-3 px-4 py-3 border-b border-[#E5E7EB] hover:bg-[#F8F9FA] transition-colors cursor-pointer" onClick={() => { setActiveNav('applications'); setSelectedApp(app); }}>
                          <div className={`w-8 h-8 rounded-full ${app.color} flex items-center justify-center text-white text-xs font-bold`}>{app.initials}</div>
                          <div className="flex-1 min-w-0"><p className="text-sm font-medium text-[#111827]">{app.name}</p><p className="text-[10px] text-[#9CA3AF]">{app.degree} | {app.degreeInstitution}</p></div>
                          <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-[10px]">Pending</Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                  <Card className="border-[#E5E7EB] shadow-none">
                    <CardHeader className="pb-2"><div className="flex items-center justify-between"><h3 className="font-poppins font-semibold text-base text-[#111827]">Marketing Approval Queue</h3><button onClick={() => setActiveNav('marketing')} className="text-xs text-[#2E7D32] font-medium hover:underline">View All</button></div></CardHeader>
                    <CardContent className="p-0">
                      {marketingQueue.filter(m => m.status === 'Pending').map(item => (
                        <div key={item.id} className="flex items-center gap-3 px-4 py-3 border-b border-[#E5E7EB] hover:bg-[#F8F9FA] transition-colors cursor-pointer" onClick={() => { setActiveNav('marketing'); setSelectedMarketing(item); }}>
                          <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center"><Megaphone className="w-4 h-4 text-purple-600" /></div>
                          <div className="flex-1 min-w-0"><p className="text-sm font-medium text-[#111827] truncate">{item.title}</p><p className="text-[10px] text-[#9CA3AF]">by {item.author} | {item.date}</p></div>
                          <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-[10px]">Pending</Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}

            {/* ====== APPLICATIONS ====== */}
            {activeNav === 'applications' && (
              <motion.div key="applications" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="space-y-6">
                {!selectedApp ? (
                  <>
                    <div className="flex items-center gap-2">
                      {['all', 'pending', 'approved', 'rejected'].map(f => (
                        <button key={f} onClick={() => setAppFilter(f)} className={`px-4 py-2 rounded-xl text-xs font-medium capitalize transition-all ${appFilter === f ? 'bg-[#2E7D32] text-white' : 'bg-white border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F8F9FA]'}`}>{f} ({f === 'all' ? employeeApplications.length : employeeApplications.filter(a => a.status.toLowerCase() === f).length})</button>
                      ))}
                    </div>
                    <div className="space-y-3">
                      {filteredApps.map(app => (
                        <Card key={app.id} className="border-[#E5E7EB] shadow-none hover:shadow-sm transition-all cursor-pointer" onClick={() => setSelectedApp(app)}>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-full ${app.color} flex items-center justify-center text-white font-bold`}>{app.initials}</div>
                              <div className="flex-1"><p className="font-semibold text-sm text-[#111827]">{app.name}</p><p className="text-xs text-[#6B7280]">{app.degree} | {app.degreeInstitution}</p></div>
                              <Badge className={`text-[10px] ${app.status === 'Approved' ? 'bg-green-50 text-green-700' : app.status === 'Rejected' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>{app.status}</Badge>
                              <ChevronRight className="w-4 h-4 text-[#9CA3AF]" />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <button onClick={() => setSelectedApp(null)} className="text-sm text-[#2E7D32] font-medium flex items-center gap-1 mb-4"><ChevronRight className="w-4 h-4 rotate-180" /> Back to Applications</button>
                    <Card className="border-[#E5E7EB] shadow-none">
                      <CardContent className="p-6 space-y-5">
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-full ${selectedApp.color} flex items-center justify-center text-white text-lg font-bold`}>{selectedApp.initials}</div>
                          <div><h3 className="font-poppins font-bold text-lg text-[#111827]">{selectedApp.name}</h3><p className="text-sm text-[#6B7280]">{selectedApp.degree} | {selectedApp.degreeInstitution}</p></div>
                          <Badge className={`ml-auto text-xs ${selectedApp.status === 'Approved' ? 'bg-green-50 text-green-700' : selectedApp.status === 'Rejected' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>{selectedApp.status}</Badge>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-[#F8F9FA] rounded-xl p-4">
                          <div><p className="text-[10px] text-[#9CA3AF]">Age</p><p className="text-sm font-medium text-[#111827]">{selectedApp.age} years</p></div>
                          <div><p className="text-[10px] text-[#9CA3AF]">Date of Birth</p><p className="text-sm font-medium text-[#111827]">{selectedApp.dob}</p></div>
                          <div><p className="text-[10px] text-[#9CA3AF]">Mobile</p><p className="text-sm font-medium text-[#111827]">{selectedApp.mobile}</p></div>
                          <div><p className="text-[10px] text-[#9CA3AF]">Email</p><p className="text-sm font-medium text-[#111827]">{selectedApp.email}</p></div>
                          <div><p className="text-[10px] text-[#9CA3AF]">Degree Year</p><p className="text-sm font-medium text-[#111827]">{selectedApp.degreeYear}</p></div>
                          <div><p className="text-[10px] text-[#9CA3AF]">Applied Date</p><p className="text-sm font-medium text-[#111827]">{selectedApp.appliedDate}</p></div>
                        </div>
                        {selectedApp.postGraduation && (
                          <div className="bg-purple-50 rounded-xl p-4">
                            <p className="text-xs font-semibold text-purple-700 mb-1">Post Graduation</p>
                            <p className="text-sm text-[#111827]">{selectedApp.postGraduation} | {selectedApp.pgInstitution} ({selectedApp.pgYear})</p>
                          </div>
                        )}
                        {selectedApp.status === 'Pending' && (
                          <div className="space-y-3">
                            <textarea value={comment} onChange={e => setComment(e.target.value)} className="w-full h-20 px-4 py-3 rounded-xl border border-[#E5E7EB] text-sm outline-none resize-none" placeholder="Add comments (optional)..." />
                            <div className="flex gap-3">
                              <Button onClick={() => { setSelectedApp({ ...selectedApp, status: 'Approved' }); setComment(''); }} className="flex-1 h-12 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl"><Check className="w-4 h-4 mr-2" /> Approve</Button>
                              <Button onClick={() => { setSelectedApp({ ...selectedApp, status: 'Rejected' }); setComment(''); }} variant="outline" className="flex-1 h-12 rounded-xl border-red-200 text-red-600 hover:bg-red-50"><X className="w-4 h-4 mr-2" /> Reject</Button>
                            </div>
                            <p className="text-[10px] text-[#9CA3AF] text-center">On approval, employee will receive Employee ID + temp password via email</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </>
                )}
              </motion.div>
            )}

            {/* ====== EMPLOYEES ====== */}
            {activeNav === 'employees' && (
              <motion.div key="employees" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                <Card className="border-[#E5E7EB] shadow-none">
                  <CardHeader className="pb-2"><div className="flex items-center justify-between"><h3 className="font-poppins font-semibold text-base text-[#111827]">All Employees</h3><Badge className="bg-[#2E7D32]/10 text-[#2E7D32] text-[10px]">{employees.length}</Badge></div></CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead><tr className="border-b border-[#E5E7EB] bg-[#F8F9FA]"><th className="text-left px-4 py-3 text-xs font-medium text-[#9CA3AF]">Employee</th><th className="text-left px-4 py-3 text-xs font-medium text-[#9CA3AF]">Department</th><th className="text-left px-4 py-3 text-xs font-medium text-[#9CA3AF] hidden md:table-cell">Location</th><th className="text-left px-4 py-3 text-xs font-medium text-[#9CA3AF]">Farmers</th><th className="text-left px-4 py-3 text-xs font-medium text-[#9CA3AF]">Points</th><th className="text-left px-4 py-3 text-xs font-medium text-[#9CA3AF]">Status</th></tr></thead>
                        <tbody>
                          {employees.map(emp => (
                            <tr key={emp.id} className="border-b border-[#E5E7EB] hover:bg-[#F8F9FA] transition-colors">
                              <td className="px-4 py-3"><div className="flex items-center gap-2.5"><div className={`w-8 h-8 rounded-full ${emp.color} flex items-center justify-center text-white text-xs font-bold`}>{emp.initials}</div><div><p className="text-sm font-medium text-[#111827]">{emp.name}</p><p className="text-[10px] text-[#9CA3AF] font-mono">{emp.id}</p></div></div></td>
                              <td className="px-4 py-3 text-xs text-[#6B7280]">{emp.department}</td>
                              <td className="px-4 py-3 text-xs text-[#6B7280] hidden md:table-cell">{emp.location}</td>
                              <td className="px-4 py-3 text-sm font-medium text-[#111827]">{emp.farmers}</td>
                              <td className="px-4 py-3"><span className="text-sm font-semibold text-[#2E7D32]">{emp.points.toLocaleString()}</span></td>
                              <td className="px-4 py-3"><Badge className={`text-[10px] h-5 ${emp.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>{emp.status}</Badge></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* ====== FARMERS ====== */}
            {activeNav === 'farmers' && (
              <motion.div key="farmers" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                <Card className="border-[#E5E7EB] shadow-none">
                  <CardHeader className="pb-2"><div className="flex items-center justify-between"><h3 className="font-poppins font-semibold text-base text-[#111827]">All Farmers</h3><div className="flex items-center gap-2"><div className="flex items-center bg-[#F3F4F6] rounded-lg px-3 h-9"><Search className="w-4 h-4 text-[#9CA3AF] mr-2" /><input type="text" placeholder="Search farmers..." className="bg-transparent text-sm outline-none w-32 placeholder:text-[#9CA3AF]" /></div><Badge className="bg-[#2E7D32]/10 text-[#2E7D32] text-[10px]">{allFarmers.length}</Badge></div></div></CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead><tr className="border-b border-[#E5E7EB] bg-[#F8F9FA]"><th className="text-left px-4 py-3 text-xs font-medium text-[#9CA3AF]">Farmer</th><th className="text-left px-4 py-3 text-xs font-medium text-[#9CA3AF] hidden sm:table-cell">Location</th><th className="text-left px-4 py-3 text-xs font-medium text-[#9CA3AF]">Area</th><th className="text-left px-4 py-3 text-xs font-medium text-[#9CA3AF] hidden md:table-cell">Crops</th><th className="text-left px-4 py-3 text-xs font-medium text-[#9CA3AF]">Status</th><th className="text-left px-4 py-3 text-xs font-medium text-[#9CA3AF]">Emp</th></tr></thead>
                        <tbody>
                          {allFarmers.map(f => (
                            <tr key={f.id} className="border-b border-[#E5E7EB] hover:bg-[#F8F9FA] transition-colors">
                              <td className="px-4 py-3"><div className="flex items-center gap-2.5"><div className={`w-8 h-8 rounded-full ${f.color} flex items-center justify-center text-white text-xs font-bold`}>{f.initials}</div><p className="text-sm font-medium text-[#111827]">{f.name}</p></div></td>
                              <td className="px-4 py-3 text-xs text-[#6B7280] hidden sm:table-cell">{f.location}</td>
                              <td className="px-4 py-3 text-sm text-[#111827]">{f.area}</td>
                              <td className="px-4 py-3 text-xs text-[#6B7280] hidden md:table-cell">{f.crops}</td>
                              <td className="px-4 py-3"><Badge className={`text-[10px] h-5 ${f.status === 'Active' ? 'bg-green-50 text-green-700' : f.status === 'Inactive' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>{f.status}</Badge></td>
                              <td className="px-4 py-3 text-xs text-[#6B7280]">{f.emp}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* ====== STAKEHOLDERS ====== */}
            {activeNav === 'stakeholders' && (
              <motion.div key="stakeholders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="space-y-4">
                {stakeholders.map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <Card className="border-[#E5E7EB] shadow-none hover:shadow-sm transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-[#F3F4F6] flex items-center justify-center"><Store className="w-5 h-5 text-[#6B7280]" /></div>
                          <div className="flex-1"><p className="text-sm font-medium text-[#111827]">{s.name}</p><p className="text-xs text-[#9CA3AF]">{s.type} | {s.location} | {s.contact}</p></div>
                          <Badge className="text-[10px] bg-green-50 text-green-700">{s.status}</Badge>
                          <span className="text-xs text-[#9CA3AF]">{s.emp}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* ====== MARKETING ====== */}
            {activeNav === 'marketing' && (
              <motion.div key="marketing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="space-y-6">
                {!selectedMarketing ? (
                  <>
                    <div className="flex items-center gap-2">
                      {['pending', 'approved', 'rejected', 'all'].map(f => (
                        <button key={f} onClick={() => setMarketingFilter(f)} className={`px-4 py-2 rounded-xl text-xs font-medium capitalize transition-all ${marketingFilter === f ? 'bg-[#2E7D32] text-white' : 'bg-white border border-[#E5E7EB] text-[#6B7280]'}`}>{f} ({f === 'all' ? marketingQueue.length : marketingQueue.filter(m => m.status.toLowerCase() === f).length})</button>
                      ))}
                    </div>
                    <div className="space-y-3">
                      {filteredMarketing.map(item => (
                        <Card key={item.id} className="border-[#E5E7EB] shadow-none hover:shadow-sm transition-all cursor-pointer" onClick={() => setSelectedMarketing(item)}>
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center shrink-0"><Megaphone className="w-5 h-5 text-purple-600" /></div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1"><h4 className="font-semibold text-sm text-[#111827]">{item.title}</h4><Badge className={`text-[10px] h-5 ${item.status === 'Approved' ? 'bg-green-50 text-green-700' : item.status === 'Rejected' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>{item.status}</Badge></div>
                                <p className="text-xs text-[#6B7280] line-clamp-2">{item.desc}</p>
                                <div className="flex items-center gap-3 mt-2"><span className="text-[10px] text-[#9CA3AF]">by {item.author}</span><span className="text-[10px] text-[#9CA3AF]">{item.date}</span><Badge variant="outline" className="text-[10px] h-4">{item.category}</Badge></div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <button onClick={() => setSelectedMarketing(null)} className="text-sm text-[#2E7D32] font-medium flex items-center gap-1 mb-4"><ChevronRight className="w-4 h-4 rotate-180" /> Back to Queue</button>
                    <Card className="border-[#E5E7EB] shadow-none">
                      <CardContent className="p-6 space-y-5">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center"><Megaphone className="w-6 h-6 text-purple-600" /></div>
                          <div className="flex-1"><h3 className="font-poppins font-bold text-lg text-[#111827]">{selectedMarketing.title}</h3><div className="flex items-center gap-2 mt-1"><Badge className={`text-[10px] ${selectedMarketing.status === 'Approved' ? 'bg-green-50 text-green-700' : selectedMarketing.status === 'Rejected' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>{selectedMarketing.status}</Badge><span className="text-xs text-[#9CA3AF]">by {selectedMarketing.author} | {selectedMarketing.date}</span><Badge variant="outline" className="text-[10px]">{selectedMarketing.category}</Badge></div></div>
                        </div>
                        <div className="bg-[#F8F9FA] rounded-xl p-4"><p className="text-sm text-[#111827] leading-relaxed">{selectedMarketing.desc}</p></div>
                        {selectedMarketing.status === 'Pending' && (
                          <div className="space-y-3">
                            <textarea value={comment} onChange={e => setComment(e.target.value)} className="w-full h-24 px-4 py-3 rounded-xl border border-[#E5E7EB] text-sm outline-none resize-none" placeholder="Add your comments, suggestions for changes, or reason for rejection..." />
                            <div className="flex gap-3">
                              <Button onClick={() => { setSelectedMarketing({ ...selectedMarketing, status: 'Approved' }); setComment(''); }} className="flex-1 h-12 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl"><Check className="w-4 h-4 mr-2" /> Approve & Post</Button>
                              <Button onClick={() => { setSelectedMarketing({ ...selectedMarketing, status: 'Rejected' }); setComment(''); }} variant="outline" className="flex-1 h-12 rounded-xl border-red-200 text-red-600 hover:bg-red-50"><X className="w-4 h-4 mr-2" /> Reject</Button>
                            </div>
                            <Button onClick={() => { alert('Comments sent to employee for changes!'); setComment(''); }} variant="outline" className="w-full h-12 rounded-xl border-amber-200 text-amber-600 hover:bg-amber-50"><MessageSquare className="w-4 h-4 mr-2" /> Ask for Changes</Button>
                            <div className="bg-blue-50 rounded-xl p-3"><p className="text-xs text-blue-700"><strong>Workflow:</strong> Approve = Directly posted | Reject = Notification sent to employee | Ask for Changes = Sent back with your comments</p></div>
                          </div>
                        )}
                        {selectedMarketing.status !== 'Pending' && (
                          <div className="bg-gray-50 rounded-xl p-4"><p className="text-xs text-[#6B7280]">This post has been <strong>{selectedMarketing.status.toLowerCase()}</strong>. No further action required.</p></div>
                        )}
                      </CardContent>
                    </Card>
                  </>
                )}
              </motion.div>
            )}

            {/* ====== ANALYTICS ====== */}
            {activeNav === 'analytics' && (
              <motion.div key="analytics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Employee Onboarding', value: '24', sub: '18 active, 3 pending, 3 rejected' },
                    { label: 'Farmer Onboarding', value: '1,240', sub: '1,180 active, 45 inactive, 15 pending KYC' },
                    { label: 'Marketing Posts', value: '156', sub: '142 approved, 8 pending, 6 rejected' },
                  ].map((item, i) => (
                    <Card key={i} className="border-[#E5E7EB] shadow-none"><CardContent className="p-5"><p className="text-xs text-[#9CA3AF] mb-1">{item.label}</p><p className="font-poppins font-bold text-2xl text-[#111827]">{item.value}</p><p className="text-[10px] text-[#6B7280] mt-1">{item.sub}</p></CardContent></Card>
                  ))}
                </div>
                <Card className="border-[#E5E7EB] shadow-none"><CardHeader><h3 className="font-poppins font-semibold text-base text-[#111827]">Platform Growth</h3></CardHeader><CardContent><div className="h-64 flex items-end justify-around gap-2">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((m, i) => (<div key={m} className="flex flex-col items-center gap-2 flex-1"><div className="w-full max-w-[50px] bg-[#2E7D32]/20 rounded-t-lg relative" style={{ height: `${(i + 1) * 30 + 30}px` }}><div className="absolute bottom-0 left-0 right-0 bg-[#2E7D32] rounded-t-lg transition-all" style={{ height: `${(i + 1) * 20 + 15}%` }} /></div><span className="text-xs text-[#9CA3AF]">{m}</span></div>))}</div></CardContent></Card>
              </motion.div>
            )}

            {/* ====== SETTINGS ====== */}
            {activeNav === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="max-w-2xl">
                <Card className="border-[#E5E7EB] shadow-none"><CardHeader><h3 className="font-poppins font-semibold text-base text-[#111827] flex items-center gap-2"><Settings className="w-5 h-5 text-[#2E7D32]" /> Admin Settings</h3></CardHeader>
                  <CardContent className="space-y-5">
                    {[
                      { label: 'Platform Name', value: 'KRISHIVA', desc: 'Public facing platform name' },
                      { label: 'Support Email', value: 'support@krishiva.com', desc: 'Customer support email' },
                      { label: 'Support Phone', value: '1800-123-4567', desc: 'Toll-free number' },
                      { label: 'Commission Rate', value: '2%', desc: 'Default commission on deals' },
                      { label: 'Employee Approval Auto', value: 'false', desc: 'Auto-approve employee applications' },
                      { label: 'Marketing Auto-Post', value: 'false', desc: 'Auto-post approved marketing content' },
                    ].map(s => (
                      <div key={s.label} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E5E7EB] last:border-0">
                        <div><p className="text-sm font-medium text-[#111827]">{s.label}</p><p className="text-xs text-[#9CA3AF]">{s.desc}</p></div>
                        <input defaultValue={s.value} className="h-10 px-4 rounded-xl border border-[#E5E7EB] text-sm outline-none w-full sm:w-56" />
                      </div>
                    ))}
                    <div className="flex justify-end gap-3"><Button variant="outline" className="rounded-xl h-11 px-6">Reset</Button><Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl h-11 px-6">Save Changes</Button></div>
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
