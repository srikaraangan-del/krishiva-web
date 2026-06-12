import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Sprout,
  Users,
  Settings,
  CheckCircle2,
  Star,
  Edit3,
  Phone,
  Mail,
  CreditCard,
  Globe,
  Calendar,
  Clock,
  ArrowRight,
  Plus,
  MapPin,
  Droplets,
  Tractor,
  TrendingUp,
  Shield,
  Bell,
  MessageSquare,
  Smartphone,
  Eye,
  Lock,
  Fingerprint,
  Trash2,
  LogOut,
  ChevronRight,
  HelpCircle,
  MessageCircle,
  Award,
  X,
  Camera,
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '@/components/DashboardLayout';

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const languages = [
  'English', 'Telugu', 'Hindi', 'Tamil', 'Kannada', 'Marathi',
  'Gujarati', 'Bengali', 'Punjabi', 'Odia', 'Malayalam', 'Assamese',
];

const personalInfo = [
  { label: 'Full Name', value: 'Rajesh Kumar', icon: User, editable: true },
  { label: 'Phone', value: '+91 98765 43210', icon: Phone, editable: false },
  { label: 'Email', value: 'rajesh.kumar@email.com', icon: Mail, editable: true },
  { label: 'Aadhaar', value: '**** **** 1234', icon: CreditCard, editable: false },
  { label: 'Language', value: 'Telugu, English', icon: Globe, editable: true },
];

const kycDocs = [
  { name: 'Aadhaar Card', status: 'Verified', last4: '1234' },
  { name: 'PAN Card', status: 'Verified', last4: 'AB12' },
  { name: 'Land Document', status: 'Verified', last4: '' },
  { name: 'Bank Details', status: 'Verified', last4: '4521' },
];

const farms = [
  {
    id: 1,
    name: 'Farm 1',
    area: 15,
    unit: 'acres',
    crops: ['Cotton', 'Chili'],
    location: 'Guntur, Andhra Pradesh',
    soilType: 'Red Soil',
    waterSource: 'Borewell + Canal',
  },
  {
    id: 2,
    name: 'Farm 2',
    area: 10,
    unit: 'acres',
    crops: ['Paddy'],
    location: 'Prakasam, Andhra Pradesh',
    soilType: 'Alluvial Soil',
    waterSource: 'River + Rainfed',
  },
];

const familyMembers = [
  {
    id: 1,
    name: 'Sita Devi',
    relation: 'Wife',
    phone: '+91 98765 43211',
    role: 'Viewer',
    status: 'Active',
    initials: 'SD',
    color: 'bg-[#E91E63]',
  },
  {
    id: 2,
    name: 'Ravi Kumar',
    relation: 'Son',
    phone: '+91 98765 43212',
    role: 'Admin',
    status: 'Active',
    initials: 'RK',
    color: 'bg-[#3B82F6]',
  },
];

const rolePermissions = [
  { role: 'Admin', desc: 'Can do everything — manage farm, add expenses, book services, invite members.' },
  { role: 'Viewer', desc: 'Can view all data but cannot make changes or approve transactions.' },
  { role: 'Worker', desc: 'Can see assigned tasks, log work hours, and update task status.' },
];

const notificationSettings = [
  { key: 'push', label: 'Push Notifications', desc: 'Get notified about important updates', defaultOn: true },
  { key: 'sms', label: 'SMS Alerts', desc: 'Receive critical alerts via SMS', defaultOn: true },
  { key: 'email', label: 'Email Updates', desc: 'Weekly summary and updates via email', defaultOn: false },
  { key: 'whatsapp', label: 'WhatsApp Messages', desc: 'Get alerts on WhatsApp', defaultOn: true },
];

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
/* ------------------------------------------------------------------ */

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
};

/* ------------------------------------------------------------------ */
/*  Helper Components                                                  */
/* ------------------------------------------------------------------ */

function RoleBadge({ role }: { role: string }) {
  if (role === 'Admin') return <Badge className="bg-krishiva-green text-white hover:bg-krishiva-green text-[10px]">{role}</Badge>;
  if (role === 'Viewer') return <Badge className="bg-[#3B82F6] text-white hover:bg-[#3B82F6] text-[10px]">{role}</Badge>;
  if (role === 'Worker') return <Badge className="bg-harvest-gold text-text-primary hover:bg-harvest-gold text-[10px]">{role}</Badge>;
  return <Badge variant="secondary" className="text-[10px]">{role}</Badge>;
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function Profile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [editProfile, setEditProfile] = useState(false);
  const [addFarmOpen, setAddFarmOpen] = useState(false);
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);
  const [appLang, setAppLang] = useState('Telugu');

  return (
    <DashboardLayout>
      <div className="max-w-[1200px] mx-auto space-y-6 pb-6">
        {/* ---- Profile Header ---- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-border-light shadow-card rounded-3xl">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                {/* Avatar */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.4, duration: 0.5 }}
                  className="relative self-center sm:self-start"
                >
                  <div className="w-24 h-24 rounded-full bg-krishiva-green flex items-center justify-center text-white text-3xl font-bold font-poppins shadow-lg">
                    RK
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-krishiva-green text-white flex items-center justify-center border-3 border-white shadow-md hover:bg-[#1B5E20] transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </motion.div>

                {/* Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-text-primary mb-1">Rajesh Kumar</h1>
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-text-secondary text-sm mb-3">
                    <MapPin className="w-4 h-4 text-krishiva-green" />
                    <span>Guntur, Andhra Pradesh</span>
                  </div>

                  {/* Badges */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-4"
                  >
                    <Badge className="bg-success-green text-white hover:bg-success-green gap-1">
                      <CheckCircle2 className="w-3 h-3" /> KYC Verified
                    </Badge>
                    <Badge className="bg-harvest-gold text-text-primary hover:bg-harvest-gold gap-1">
                      <Star className="w-3 h-3" /> Premium
                    </Badge>
                    <Badge variant="outline" className="border-[#3B82F6] text-[#3B82F6] gap-1">
                      <Shield className="w-3 h-3" /> Trusted Seller
                    </Badge>
                  </motion.div>

                  {/* Stats */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-text-secondary"
                  >
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Member since Jan 2024</span>
                    <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> 156 deals</span>
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-harvest-gold" /> 4.9 rating</span>
                    <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-krishiva-green" /> Trust: 92</span>
                  </motion.div>
                </div>

                {/* Edit Button */}
                <div className="self-center sm:self-start">
                  <Button
                    variant="outline"
                    className="border-krishiva-green text-krishiva-green hover:bg-krishiva-green/5 rounded-xl"
                    onClick={() => setEditProfile(!editProfile)}
                  >
                    <Edit3 className="w-4 h-4 mr-1.5" />
                    {editProfile ? 'Save' : 'Edit Profile'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ---- Tabs ---- */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-white border border-border-light p-1 rounded-xl h-auto flex flex-wrap gap-1 w-fit">
              {[
                { value: 'profile', label: 'Profile', icon: User },
                { value: 'farm', label: 'Farm', icon: Sprout },
                { value: 'family', label: 'Family', icon: Users },
                { value: 'settings', label: 'Settings', icon: Settings },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="data-[state=active]:bg-krishiva-green data-[state=active]:text-white rounded-lg px-4 py-2.5 text-sm font-medium text-text-secondary flex items-center gap-2 transition-all"
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <AnimatePresence mode="wait">
              {/* ====== PROFILE TAB ====== */}
              <TabsContent value="profile" className="space-y-6 mt-0">
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Personal Information */}
                  <Card className="border-border-light shadow-card mb-6">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <h3 className="font-poppins font-semibold text-lg text-text-primary">Personal Information</h3>
                      <Button variant="ghost" size="sm" className="text-krishiva-green text-xs" onClick={() => setEditProfile(!editProfile)}>
                        {editProfile ? 'Done' : <><Edit3 className="w-3 h-3 mr-1" /> Edit</>}
                      </Button>
                    </CardHeader>
                    <CardContent className="p-5">
                      <div className="divide-y divide-border-light">
                        {personalInfo.map((field, i) => (
                          <motion.div
                            key={field.label}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.03 }}
                            className="flex items-center gap-3 py-3.5"
                          >
                            <div className="w-9 h-9 rounded-lg bg-krishiva-green/10 flex items-center justify-center shrink-0">
                              <field.icon className="w-4 h-4 text-krishiva-green" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs text-text-muted">{field.label}</p>
                              {editProfile && field.editable ? (
                                <Input defaultValue={field.value} className="h-8 mt-0.5 text-sm rounded-lg border-border-light" />
                              ) : (
                                <p className="text-sm font-medium text-text-primary">{field.value}</p>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* KYC Status */}
                  <Card className="border-border-light shadow-card bg-success-green/5 border-success-green/20 mb-6">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-success-green/15 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-success-green" />
                        </div>
                        <div>
                          <p className="font-poppins font-semibold text-base text-text-primary">KYC Verified</p>
                          <p className="text-xs text-text-secondary">Verified on 15 March 2024</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {kycDocs.map((doc) => (
                          <div key={doc.name} className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3.5 h-3.5 text-success-green shrink-0" />
                            <span className="text-text-secondary">{doc.name}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Activity Summary */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {[
                      { label: 'Member Since', value: 'Jan 2024', icon: Calendar },
                      { label: 'Last Active', value: 'Today, 10:30 AM', icon: Clock },
                      { label: 'Total Transactions', value: '156', icon: TrendingUp },
                    ].map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.06, duration: 0.25 }}
                      >
                        <Card className="border-border-light shadow-card">
                          <CardContent className="p-4 flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-krishiva-green/10 flex items-center justify-center">
                              <stat.icon className="w-4 h-4 text-krishiva-green" />
                            </div>
                            <div>
                              <p className="text-[11px] text-text-muted">{stat.label}</p>
                              <p className="text-sm font-semibold text-text-primary">{stat.value}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

              {/* ====== FARM TAB ====== */}
              <TabsContent value="farm" className="space-y-6 mt-0">
                <motion.div
                  key="farm"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Farm Summary */}
                  <Card className="border-border-light shadow-card mb-6 hero-gradient text-white">
                    <CardContent className="p-5">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                        <div>
                          <p className="text-white/60 text-xs mb-0.5">Total Farms</p>
                          <p className="font-poppins font-bold text-2xl">{farms.length}</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-xs mb-0.5">Total Area</p>
                          <p className="font-poppins font-bold text-2xl">25 acres</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-xs mb-0.5">Active Crops</p>
                          <p className="font-poppins font-bold text-2xl">3</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-xs mb-0.5">Expected Harvest</p>
                          <p className="font-poppins font-bold text-2xl">Dec</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Farm Cards */}
                  <div className="space-y-4 mb-6">
                    {farms.map((farm, i) => (
                      <motion.div
                        key={farm.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.25 }}
                      >
                        <Card className="border-border-light shadow-card hover:shadow-card-hover transition-all">
                          <CardContent className="p-5">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-krishiva-green/10 flex items-center justify-center">
                                  <Sprout className="w-5 h-5 text-krishiva-green" />
                                </div>
                                <div>
                                  <p className="font-poppins font-semibold text-base text-text-primary">{farm.name}</p>
                                  <p className="text-xs text-text-muted flex items-center gap-1"><MapPin className="w-3 h-3" />{farm.location}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" className="text-text-secondary text-xs h-8">Edit</Button>
                                <Button variant="ghost" size="sm" className="text-error-red text-xs h-8">Delete</Button>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                              <div className="bg-bg-primary rounded-lg p-2.5">
                                <p className="text-[10px] text-text-muted">Area</p>
                                <p className="text-sm font-semibold text-text-primary">{farm.area} {farm.unit}</p>
                              </div>
                              <div className="bg-bg-primary rounded-lg p-2.5">
                                <p className="text-[10px] text-text-muted">Soil</p>
                                <p className="text-sm font-semibold text-text-primary">{farm.soilType}</p>
                              </div>
                              <div className="bg-bg-primary rounded-lg p-2.5">
                                <p className="text-[10px] text-text-muted">Water</p>
                                <p className="text-sm font-semibold text-text-primary">{farm.waterSource}</p>
                              </div>
                              <div className="bg-bg-primary rounded-lg p-2.5">
                                <p className="text-[10px] text-text-muted">Crops</p>
                                <div className="flex flex-wrap gap-1 mt-0.5">
                                  {farm.crops.map((crop) => (
                                    <Badge key={crop} variant="outline" className="text-[9px] h-4 px-1 border-krishiva-green text-krishiva-green">{crop}</Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  {/* Add Farm Button */}
                  <Button
                    variant="outline"
                    className="w-full border-dashed border-2 border-border-light hover:border-krishiva-green hover:text-krishiva-green hover:bg-krishiva-green/5 rounded-xl h-14 text-sm"
                    onClick={() => setAddFarmOpen(true)}
                  >
                    <Plus className="w-5 h-5 mr-2" /> Add Another Farm
                  </Button>
                </motion.div>
              </TabsContent>

              {/* ====== FAMILY TAB ====== */}
              <TabsContent value="family" className="space-y-6 mt-0">
                <motion.div
                  key="family"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Info */}
                  <div className="mb-4">
                    <h3 className="font-poppins font-semibold text-lg text-text-primary">Family Dashboard</h3>
                    <p className="text-sm text-text-secondary">Add family members to share farm access, assign tasks, and manage activities together.</p>
                  </div>

                  {/* Members */}
                  <div className="space-y-4 mb-6">
                    {familyMembers.map((member, i) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.25 }}
                      >
                        <Card className="border-border-light shadow-card">
                          <CardContent className="p-5">
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-full ${member.color} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                                {member.initials}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <p className="font-poppins font-semibold text-sm text-text-primary">{member.name}</p>
                                  <RoleBadge role={member.role} />
                                </div>
                                <p className="text-xs text-text-muted">{member.relation} &middot; {member.phone}</p>
                                <div className="flex items-center gap-1.5 mt-1">
                                  <div className="w-1.5 h-1.5 rounded-full bg-success-green" />
                                  <span className="text-[11px] text-success-green">{member.status}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 shrink-0">
                                <Button variant="ghost" size="sm" className="text-text-secondary text-xs h-8">Edit Role</Button>
                                <Button variant="ghost" size="sm" className="text-error-red text-xs h-8">Remove</Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  {/* Role Info */}
                  <Card className="border-border-light shadow-card bg-bg-primary border-dashed mb-6">
                    <CardContent className="p-5">
                      <h4 className="font-medium text-sm text-text-primary mb-3">Role Permissions</h4>
                      <div className="space-y-2.5">
                        {rolePermissions.map((rp) => (
                          <div key={rp.role} className="flex items-start gap-2">
                            <RoleBadge role={rp.role} />
                            <p className="text-xs text-text-secondary flex-1">{rp.desc}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Add Member Button */}
                  <Button
                    variant="outline"
                    className="w-full border-dashed border-2 border-border-light hover:border-krishiva-green hover:text-krishiva-green hover:bg-krishiva-green/5 rounded-xl h-14 text-sm"
                    onClick={() => setAddMemberOpen(true)}
                  >
                    <Plus className="w-5 h-5 mr-2" /> Add Family Member
                  </Button>
                </motion.div>
              </TabsContent>

              {/* ====== SETTINGS TAB ====== */}
              <TabsContent value="settings" className="space-y-6 mt-0">
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Language Selection */}
                  <Card className="border-border-light shadow-card">
                    <CardHeader className="pb-2">
                      <h3 className="font-poppins font-semibold text-base text-text-primary flex items-center gap-2">
                        <Globe className="w-4 h-4 text-krishiva-green" /> Language & Region
                      </h3>
                    </CardHeader>
                    <CardContent className="p-5">
                      <div className="mb-4">
                        <label className="text-sm font-medium text-text-primary mb-2 block">App Language</label>
                        <div className="flex flex-wrap gap-2">
                          {languages.map((lang) => (
                            <button
                              key={lang}
                              onClick={() => setAppLang(lang)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                                appLang === lang
                                  ? 'bg-krishiva-green text-white border-krishiva-green'
                                  : 'bg-white text-text-secondary border-border-light hover:border-border-green'
                              }`}
                            >
                              {lang}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-3 border-t border-border-light">
                        <div>
                          <p className="text-sm font-medium text-text-primary">Region</p>
                          <p className="text-xs text-text-muted">Affects mandi prices, schemes, weather</p>
                        </div>
                        <Badge variant="outline" className="border-krishiva-green text-krishiva-green">Andhra Pradesh</Badge>
                      </div>
                      <div className="flex items-center justify-between py-3 border-t border-border-light">
                        <div>
                          <p className="text-sm font-medium text-text-primary">Currency</p>
                          <p className="text-xs text-text-muted">Fixed for your region</p>
                        </div>
                        <Badge variant="outline">&#x20B9; INR</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Notification Preferences */}
                  <Card className="border-border-light shadow-card">
                    <CardHeader className="pb-2">
                      <h3 className="font-poppins font-semibold text-base text-text-primary flex items-center gap-2">
                        <Bell className="w-4 h-4 text-krishiva-green" /> Notifications
                      </h3>
                    </CardHeader>
                    <CardContent className="p-5 space-y-4">
                      {notificationSettings.map((notif, i) => (
                        <motion.div
                          key={notif.key}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.04 }}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <p className="text-sm font-medium text-text-primary">{notif.label}</p>
                            <p className="text-xs text-text-muted">{notif.desc}</p>
                          </div>
                          <Switch defaultChecked={notif.defaultOn} />
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Privacy & Security */}
                  <Card className="border-border-light shadow-card">
                    <CardHeader className="pb-2">
                      <h3 className="font-poppins font-semibold text-base text-text-primary flex items-center gap-2">
                        <Lock className="w-4 h-4 text-krishiva-green" /> Privacy & Security
                      </h3>
                    </CardHeader>
                    <CardContent className="p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Eye className="w-4 h-4 text-text-secondary" />
                          <div>
                            <p className="text-sm font-medium text-text-primary">Profile Visibility</p>
                            <p className="text-xs text-text-muted">Who can see your profile</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-[10px]">Public</Badge>
                      </div>
                      <div className="flex items-center justify-between border-t border-border-light pt-3">
                        <div className="flex items-center gap-3">
                          <TrendingUp className="w-4 h-4 text-text-secondary" />
                          <div>
                            <p className="text-sm font-medium text-text-primary">Activity Sharing</p>
                            <p className="text-xs text-text-muted">Share activity with community</p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between border-t border-border-light pt-3">
                        <div className="flex items-center gap-3">
                          <Lock className="w-4 h-4 text-text-secondary" />
                          <div>
                            <p className="text-sm font-medium text-text-primary">Change Password</p>
                            <p className="text-xs text-text-muted">Update your login password</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-krishiva-green text-xs h-8">Change</Button>
                      </div>
                      <div className="flex items-center justify-between border-t border-border-light pt-3">
                        <div className="flex items-center gap-3">
                          <Fingerprint className="w-4 h-4 text-text-secondary" />
                          <div>
                            <p className="text-sm font-medium text-text-primary">Biometric Login</p>
                            <p className="text-xs text-text-muted">Use fingerprint or face unlock</p>
                          </div>
                        </div>
                        <Switch />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Support */}
                  <Card className="border-border-light shadow-card">
                    <CardHeader className="pb-2">
                      <h3 className="font-poppins font-semibold text-base text-text-primary flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-krishiva-green" /> Support
                      </h3>
                    </CardHeader>
                    <CardContent className="p-5 space-y-3">
                      {[
                        { label: 'Help Center', desc: 'Browse FAQs and guides', icon: HelpCircle },
                        { label: 'Contact Support', desc: 'Call 1800-KRISHIVA', icon: MessageCircle },
                        { label: 'Rate the App', desc: 'Give us your feedback', icon: Star },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between py-2 cursor-pointer hover:bg-bg-primary rounded-lg px-2 -mx-2 transition-colors">
                          <div className="flex items-center gap-3">
                            <item.icon className="w-4 h-4 text-text-secondary" />
                            <div>
                              <p className="text-sm font-medium text-text-primary">{item.label}</p>
                              <p className="text-xs text-text-muted">{item.desc}</p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-text-muted" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Danger Zone */}
                  <Card className="border-error-red/30 shadow-card bg-error-red/5">
                    <CardHeader className="pb-2">
                      <h3 className="font-poppins font-semibold text-base text-error-red flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> Danger Zone
                      </h3>
                    </CardHeader>
                    <CardContent className="p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-text-primary">Log Out</p>
                          <p className="text-xs text-text-muted">Sign out from all devices</p>
                        </div>
                        <Button variant="outline" className="border-error-red text-error-red hover:bg-error-red hover:text-white rounded-xl text-xs h-9">
                          <LogOut className="w-3.5 h-3.5 mr-1.5" /> Log Out
                        </Button>
                      </div>
                      <div className="h-px bg-error-red/20" />
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-error-red">Delete Account</p>
                          <p className="text-xs text-text-muted">Permanently delete your account and data. 30-day grace period applies.</p>
                        </div>
                        <Button
                          className="bg-error-red hover:bg-red-700 text-white rounded-xl text-xs h-9"
                          onClick={() => setDeleteAccountOpen(true)}
                        >
                          <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </motion.div>

        {/* ---- Add Farm Dialog ---- */}
        <Dialog open={addFarmOpen} onOpenChange={setAddFarmOpen}>
          <DialogContent className="sm:max-w-[480px] rounded-2xl">
            <DialogHeader>
              <DialogTitle className="font-poppins text-xl flex items-center gap-2">
                <Sprout className="w-5 h-5 text-krishiva-green" /> Add New Farm
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <label className="text-sm font-medium text-text-primary mb-1.5 block">Farm Name</label>
                <Input placeholder="e.g., Greenfield Farm" className="h-12 rounded-xl border-border-light" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-text-primary mb-1.5 block">Area</label>
                  <Input type="number" placeholder="e.g., 10" className="h-12 rounded-xl border-border-light" />
                </div>
                <div>
                  <label className="text-sm font-medium text-text-primary mb-1.5 block">Unit</label>
                  <Select defaultValue="acres">
                    <SelectTrigger className="h-12 rounded-xl border-border-light">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acres">Acres</SelectItem>
                      <SelectItem value="hectares">Hectares</SelectItem>
                      <SelectItem value="guntha">Guntha</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-text-primary mb-1.5 block">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <Input placeholder="Village, District, State" className="h-12 rounded-xl border-border-light pl-10" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-text-primary mb-1.5 block">Soil Type</label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-xl border-border-light">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="red">Red Soil</SelectItem>
                      <SelectItem value="black">Black Cotton Soil</SelectItem>
                      <SelectItem value="alluvial">Alluvial Soil</SelectItem>
                      <SelectItem value="sandy">Sandy Soil</SelectItem>
                      <SelectItem value="clay">Clay Soil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-text-primary mb-1.5 block">Water Source</label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-xl border-border-light">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="borewell">Borewell</SelectItem>
                      <SelectItem value="canal">Canal</SelectItem>
                      <SelectItem value="river">River</SelectItem>
                      <SelectItem value="rainfed">Rainfed</SelectItem>
                      <SelectItem value="multiple">Multiple</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="w-full bg-krishiva-green hover:bg-[#1B5E20] text-white h-12 rounded-xl">
                Add Farm
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* ---- Add Member Dialog ---- */}
        <Dialog open={addMemberOpen} onOpenChange={setAddMemberOpen}>
          <DialogContent className="sm:max-w-[440px] rounded-2xl">
            <DialogHeader>
              <DialogTitle className="font-poppins text-xl flex items-center gap-2">
                <Users className="w-5 h-5 text-krishiva-green" /> Add Family Member
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <label className="text-sm font-medium text-text-primary mb-1.5 block">Full Name</label>
                <Input placeholder="Enter member name" className="h-12 rounded-xl border-border-light" />
              </div>
              <div>
                <label className="text-sm font-medium text-text-primary mb-1.5 block">Relationship</label>
                <Select>
                  <SelectTrigger className="h-12 rounded-xl border-border-light">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spouse">Spouse</SelectItem>
                    <SelectItem value="son">Son</SelectItem>
                    <SelectItem value="daughter">Daughter</SelectItem>
                    <SelectItem value="father">Father</SelectItem>
                    <SelectItem value="mother">Mother</SelectItem>
                    <SelectItem value="brother">Brother</SelectItem>
                    <SelectItem value="sister">Sister</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-text-primary mb-1.5 block">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <Input placeholder="+91" className="h-12 rounded-xl border-border-light pl-10" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-text-primary mb-1.5 block">Role</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Admin', 'Viewer', 'Worker'].map((role) => (
                    <button
                      key={role}
                      className="p-3 rounded-xl border border-border-light hover:border-krishiva-green hover:bg-krishiva-green/5 transition-all text-sm text-text-secondary font-medium"
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
              <Button className="w-full bg-krishiva-green hover:bg-[#1B5E20] text-white h-12 rounded-xl">
                Send Invite
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* ---- Delete Account Dialog ---- */}
        <Dialog open={deleteAccountOpen} onOpenChange={setDeleteAccountOpen}>
          <DialogContent className="sm:max-w-[400px] rounded-2xl">
            <DialogHeader>
              <DialogTitle className="font-poppins text-xl text-error-red flex items-center gap-2">
                <Trash2 className="w-5 h-5" /> Delete Account
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="bg-error-red/5 border border-error-red/20 rounded-xl p-4">
                <p className="text-sm text-text-primary font-medium mb-1">Warning</p>
                <p className="text-xs text-text-secondary">Deleting your account will permanently remove all your data, including farm details, transactions, and family member access. This action cannot be undone.</p>
              </div>
              <div className="bg-warning-amber/5 border border-warning-amber/20 rounded-xl p-4">
                <p className="text-xs text-text-secondary"><strong>30-day grace period:</strong> Your account will be deactivated immediately but all data will be retained for 30 days. You can reactivate by logging in during this period.</p>
              </div>
              <div>
                <label className="text-sm font-medium text-text-primary mb-1.5 block">Type &quot;DELETE&quot; to confirm</label>
                <Input placeholder="DELETE" className="h-12 rounded-xl border-error-red/30 focus:border-error-red" />
              </div>
              <Button className="w-full bg-error-red hover:bg-red-700 text-white h-12 rounded-xl">
                Permanently Delete Account
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
