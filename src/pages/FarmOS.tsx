import { useState } from 'react';
import {
  LayoutDashboard,
  Map,
  Sprout,
  ClipboardList,
  BarChart3,
  Plus,
  MapPin,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  Droplet,
  AlertCircle,
  Clock,
  ChevronRight,
  Check,
  Tractor,
  Package,
  Users,
  FileText,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Area,
  AreaChart,
} from 'recharts';
import DashboardLayout from '@/components/DashboardLayout';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

/* ─────────────────────── Toast Helper ─────────────────────── */
const showToast = (message: string) => {
  const toast = document.createElement('div');
  toast.className = 'fixed top-4 left-1/2 -translate-x-1/2 bg-krishiva-green text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm font-medium';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
};

/* ─────────────────────── Animation Helpers ─────────────────────── */
const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0, 0, 0.2, 1] as [number, number, number, number] },
  }),
};

const tabContentVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

/* ─────────────────────── Tab Config ─────────────────────── */
const tabs = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'fields', label: 'Fields', icon: Map },
  { key: 'crops', label: 'Crops', icon: Sprout },
  { key: 'activity', label: 'Activity', icon: ClipboardList },
  { key: 'analytics', label: 'Analytics', icon: BarChart3 },
];

type TabKey = 'overview' | 'fields' | 'crops' | 'activity' | 'analytics';

/* ═══════════════════════ OVERVIEW TAB ═══════════════════════ */

const overviewStats = [
  { icon: MapPin, value: '25', unit: 'acres', label: 'Total Land', color: 'text-krishiva-green', bg: 'bg-krishiva-green/10' },
  { icon: Sprout, value: '12', unit: '', label: 'Active Crops', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { icon: IndianRupee, value: '\u20b92,50,000', unit: '', label: 'Expected Revenue', color: 'text-success-green', bg: 'bg-success-green/10' },
  { icon: TrendingDown, value: '\u20b91,60,000', unit: '', label: 'Expenses', color: 'text-error-red', bg: 'bg-error-red/10' },
];

const revenueData = [
  { name: 'Jan', revenue: 30000, expenses: 25000 },
  { name: 'Feb', revenue: 35000, expenses: 22000 },
  { name: 'Mar', revenue: 45000, expenses: 28000 },
  { name: 'Apr', revenue: 40000, expenses: 30000 },
  { name: 'May', revenue: 50000, expenses: 25000 },
  { name: 'Jun', revenue: 50000, expenses: 30000 },
];

function OverviewTab({
  onAddField,
  onAddCrop,
  onLogExpense,
}: {
  onAddField: () => void;
  onAddCrop: () => void;
  onLogExpense: () => void;
}) {
  const actionMap: Record<string, () => void> = {
    'Add Field': onAddField,
    'Add Crop': onAddCrop,
    'Log Expense': onLogExpense,
  };

  return (
    <motion.div variants={tabContentVariant} initial="hidden" animate="visible" exit="exit" className="space-y-5">
      {/* Stat Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            custom={idx}
            variants={cardVariant}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-2xl p-5 border border-border-light shadow-card"
          >
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="font-poppins font-bold text-xl text-text-primary">{stat.value}{stat.unit && <span className="text-sm font-medium text-text-secondary ml-1">{stat.unit}</span>}</p>
            <p className="text-text-secondary text-sm mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Profit Summary + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Profit Summary Card */}
        <motion.div
          custom={4}
          variants={cardVariant}
          initial="hidden"
          animate="visible"
          className="lg:col-span-2 bg-white rounded-2xl p-5 border border-border-light shadow-card"
        >
          <h3 className="font-poppins font-semibold text-lg text-text-primary mb-1">Profit Summary</h3>
          <p className="text-text-secondary text-sm mb-4">Revenue vs Expenses (last 6 months)</p>

          <div className="flex items-center gap-2 mb-4">
            <span className="font-poppins font-bold text-2xl text-success-green">Net Profit: ₹90,000</span>
            <span className="flex items-center gap-0.5 text-success-green text-sm font-medium">
              <TrendingUp className="w-4 h-4" /> +12%
            </span>
          </div>

          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 13 }}
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, undefined]}
                />
                <Bar dataKey="revenue" fill="#2E7D32" radius={[4, 4, 0, 0]} name="Revenue" />
                <Bar dataKey="expenses" fill="#EF4444" radius={[4, 4, 0, 0]} name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          custom={5}
          variants={cardVariant}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl p-5 border border-border-light shadow-card"
        >
          <h3 className="font-poppins font-semibold text-lg text-text-primary mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {[
              { icon: Plus, label: 'Add Field', desc: 'Register a new field', color: 'bg-krishiva-green/10 text-krishiva-green' },
              { icon: Sprout, label: 'Add Crop', desc: 'Track a new crop', color: 'bg-blue-500/10 text-blue-500' },
              { icon: IndianRupee, label: 'Log Expense', desc: 'Record a farm expense', color: 'bg-error-red/10 text-error-red' },
            ].map((action) => (
              <button
                key={action.label}
                onClick={actionMap[action.label]}
                className="w-full flex items-center gap-3 p-3.5 rounded-xl border border-border-light hover:border-krishiva-green hover:bg-krishiva-green/5 transition-all duration-200 text-left"
              >
                <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center shrink-0`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">{action.label}</p>
                  <p className="text-text-muted text-xs">{action.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-text-muted" />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════ FIELDS TAB ═══════════════════════ */

const fields = [
  { name: 'Field A', size: 8, crop: 'Cotton', cropColor: '#2E7D32', status: 'Healthy', statusColor: 'bg-success-green', soilType: 'Loamy', waterSource: 'Drip Irrigation', x: 0, y: 0, w: 60, h: 45 },
  { name: 'Field B', size: 6, crop: 'Chili', cropColor: '#F9A825', status: 'Needs Water', statusColor: 'bg-warning-amber', soilType: 'Sandy Loam', waterSource: 'Sprinkler', x: 60, y: 0, w: 40, h: 45 },
  { name: 'Field C', size: 5, crop: 'Paddy', cropColor: '#66BB6A', status: 'Harvest Ready', statusColor: 'bg-blue-500', soilType: 'Clay', waterSource: 'Flood Irrigation', x: 0, y: 45, w: 40, h: 55 },
  { name: 'Field D', size: 6, crop: 'Tomato', cropColor: '#EC4899', status: 'Growing', statusColor: 'bg-krishiva-green', soilType: 'Silt Loam', waterSource: 'Drip Irrigation', x: 40, y: 45, w: 60, h: 55 },
];

const statusBadgeColors: Record<string, string> = {
  Healthy: 'bg-success-green/10 text-success-green',
  'Needs Water': 'bg-warning-amber/10 text-warning-amber',
  'Harvest Ready': 'bg-blue-500/10 text-blue-500',
  Growing: 'bg-krishiva-green/10 text-krishiva-green',
};

function FieldsTab({
  onViewDetails,
  onLogActivity,
}: {
  onViewDetails: (field: typeof fields[0]) => void;
  onLogActivity: () => void;
}) {
  return (
    <motion.div variants={tabContentVariant} initial="hidden" animate="visible" exit="exit" className="space-y-5">
      {/* Field Map Placeholder */}
      <motion.div
        custom={0}
        variants={cardVariant}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-2xl p-5 border border-border-light shadow-card"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-poppins font-semibold text-lg text-text-primary">Field Map</h3>
            <p className="text-text-secondary text-sm">Interactive farm layout</p>
          </div>
          <span className="text-krishiva-green text-sm font-medium cursor-pointer hover:underline">Open Full Map</span>
        </div>
        <div className="relative w-full h-[280px] bg-bg-primary rounded-xl overflow-hidden border border-border-light">
          {fields.map((field) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="absolute rounded-lg border-2 border-white/80 flex flex-col items-center justify-center cursor-pointer hover:brightness-110 transition-all shadow-sm"
              style={{
                left: `${field.x}%`,
                top: `${field.y}%`,
                width: `${field.w}%`,
                height: `${field.h}%`,
                backgroundColor: `${field.cropColor}20`,
                borderColor: field.cropColor,
              }}
              title={`${field.name}: ${field.crop} (${field.size} acres)`}
            >
              <span className="font-poppins font-semibold text-sm text-text-primary">{field.name}</span>
              <span className="text-[11px] text-text-secondary">{field.crop}</span>
              <span className="text-[11px] text-text-muted">{field.size} ac</span>
            </motion.div>
          ))}
        </div>
        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 mt-3">
          {fields.map((f) => (
            <div key={f.name} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: f.cropColor }} />
              <span className="text-text-secondary text-xs">{f.crop}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Field Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((field, idx) => (
          <motion.div
            key={field.name}
            custom={idx + 1}
            variants={cardVariant}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-2xl border border-border-light shadow-card overflow-hidden hover:shadow-card-hover transition-shadow duration-200"
          >
            <div className="h-1 w-full" style={{ backgroundColor: field.cropColor }} />
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-poppins font-semibold text-base text-text-primary">{field.name}</h4>
                <span className={`text-[11px] font-medium px-2.5 py-1 rounded-md ${statusBadgeColors[field.status] || 'bg-krishiva-green/10 text-krishiva-green'}`}>
                  {field.status}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary text-sm">Size</span>
                  <span className="text-text-primary text-sm font-medium">{field.size} acres</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary text-sm">Crop</span>
                  <span className="text-text-primary text-sm font-medium">{field.crop}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary text-sm">Soil Type</span>
                  <span className="text-text-primary text-sm font-medium">{field.soilType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary text-sm">Water Source</span>
                  <span className="text-text-primary text-sm font-medium">{field.waterSource}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border-light">
                <button
                  onClick={() => onViewDetails(field)}
                  className="text-krishiva-green text-sm font-medium hover:underline"
                >
                  View Details
                </button>
                <button
                  onClick={onLogActivity}
                  className="text-text-muted text-sm hover:text-text-primary"
                >
                  Log Activity
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════ CROPS TAB ═══════════════════════ */

interface CropData {
  name: string;
  variety: string;
  field: string;
  plantedDays: number;
  totalDays: number;
  growthPercent: number;
  stage: string;
  stageIndex: number;
  health: 'Good' | 'Fair' | 'Excellent';
  daysRemaining: number;
  color: string;
}

const crops: CropData[] = [
  { name: 'Cotton', variety: 'Bunny Bt', field: 'Field A', plantedDays: 45, totalDays: 150, growthPercent: 60, stage: 'Flowering', stageIndex: 3, health: 'Good', daysRemaining: 105, color: '#2E7D32' },
  { name: 'Chili', variety: 'Guntur Sannam', field: 'Field B', plantedDays: 30, totalDays: 120, growthPercent: 40, stage: 'Vegetative', stageIndex: 2, health: 'Fair', daysRemaining: 90, color: '#F9A825' },
  { name: 'Paddy', variety: 'Sona Masoori', field: 'Field C', plantedDays: 60, totalDays: 75, growthPercent: 80, stage: 'Maturity', stageIndex: 4, health: 'Excellent', daysRemaining: 15, color: '#66BB6A' },
  { name: 'Tomato', variety: 'Pusa Ruby', field: 'Field D', plantedDays: 20, totalDays: 90, growthPercent: 25, stage: 'Vegetative', stageIndex: 2, health: 'Good', daysRemaining: 70, color: '#EC4899' },
];

const growthStages = ['Sowing', 'Germination', 'Vegetative', 'Flowering', 'Fruiting', 'Harvest'];

function CropCard({
  crop,
  idx,
  onViewDetails,
  onAddNote,
  onMarkIssue,
}: {
  crop: CropData;
  idx: number;
  onViewDetails: (crop: CropData) => void;
  onAddNote: (crop: CropData) => void;
  onMarkIssue: (crop: CropData) => void;
}) {
  return (
    <motion.div
      custom={idx}
      variants={cardVariant}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-2xl border border-border-light shadow-card overflow-hidden hover:shadow-card-hover transition-shadow"
    >
      <div className="flex">
        {/* Left accent strip */}
        <div className="w-1.5 shrink-0" style={{ backgroundColor: crop.color }} />
        <div className="flex-1 p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${crop.color}15` }}>
                <Sprout className="w-5 h-5" style={{ color: crop.color }} />
              </div>
              <div>
                <h4 className="font-poppins font-semibold text-base text-text-primary">{crop.name}</h4>
                <p className="text-text-muted text-xs">{crop.variety} • {crop.field}</p>
              </div>
            </div>
            <span className={`text-[11px] font-medium px-2.5 py-1 rounded-md ${
              crop.health === 'Excellent' ? 'bg-success-green/10 text-success-green' :
              crop.health === 'Good' ? 'bg-krishiva-green/10 text-krishiva-green' :
              'bg-warning-amber/10 text-warning-amber'
            }`}>
              {crop.health}
            </span>
          </div>

          {/* Growth Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-text-secondary text-sm">Growth Progress</span>
              <span className="text-text-primary text-sm font-semibold">{crop.growthPercent}%</span>
            </div>
            <div className="w-full h-2.5 bg-bg-primary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${crop.growthPercent}%` }}
                transition={{ duration: 0.8, ease: [0, 0, 0.2, 1] as [number, number, number, number], delay: idx * 0.1 }}
                className="h-full rounded-full"
                style={{ backgroundColor: crop.color }}
              />
            </div>
            <p className="text-text-muted text-xs mt-1">{crop.plantedDays} of {crop.totalDays} days • {crop.daysRemaining} days remaining</p>
          </div>

          {/* Lifecycle Stage */}
          <div className="mb-4">
            <p className="text-text-secondary text-xs mb-2">Current Stage: <span className="font-medium text-text-primary">{crop.stage}</span></p>
            <div className="flex items-center gap-1">
              {growthStages.map((stage, sIdx) => (
                <div key={stage} className="flex-1 flex flex-col items-center gap-1">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 transition-colors ${
                    sIdx <= crop.stageIndex
                      ? 'border-krishiva-green bg-krishiva-green'
                      : 'border-border-light bg-white'
                  }`}>
                    {sIdx <= crop.stageIndex && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                  </div>
                  <span className={`text-[9px] font-medium text-center leading-tight hidden sm:block ${
                    sIdx === crop.stageIndex ? 'text-krishiva-green' : sIdx < crop.stageIndex ? 'text-text-muted' : 'text-text-muted'
                  }`}>
                    {stage}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-3 border-t border-border-light">
            <button
              onClick={() => onViewDetails(crop)}
              className="text-krishiva-green text-sm font-medium hover:underline"
            >
              View Details
            </button>
            <button
              onClick={() => onAddNote(crop)}
              className="text-text-muted text-sm hover:text-text-primary"
            >
              Add Note
            </button>
            <button
              onClick={() => onMarkIssue(crop)}
              className="text-error-red text-sm hover:text-error-red/80 ml-auto"
            >
              Mark Issue
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CropsTab({
  onViewDetails,
  onAddNote,
  onMarkIssue,
}: {
  onViewDetails: (crop: CropData) => void;
  onAddNote: (crop: CropData) => void;
  onMarkIssue: (crop: CropData) => void;
}) {
  return (
    <motion.div variants={tabContentVariant} initial="hidden" animate="visible" exit="exit" className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {crops.map((crop, idx) => (
          <CropCard
            key={crop.name}
            crop={crop}
            idx={idx}
            onViewDetails={onViewDetails}
            onAddNote={onAddNote}
            onMarkIssue={onMarkIssue}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════ ACTIVITY TAB ═══════════════════════ */

interface ActivityItem {
  date: string;
  dateLabel: string;
  items: {
    time: string;
    icon: typeof Sprout;
    iconColor: string;
    bgColor: string;
    description: string;
    detail?: string;
    amount?: string;
    fieldTag?: string;
  }[];
}

const activityData: ActivityItem[] = [
  {
    date: '2025-06-12',
    dateLabel: 'Today, 12 June 2025',
    items: [
      { time: '8:30 AM', icon: Package, iconColor: 'text-harvest-gold', bgColor: 'bg-harvest-gold/15', description: 'Applied fertilizer to Field A', detail: 'Urea — 50kg', fieldTag: 'Field A' },
      { time: '7:00 AM', icon: Droplet, iconColor: 'text-blue-500', bgColor: 'bg-blue-500/15', description: 'Irrigated Field B', detail: 'Drip irrigation — 2 hours', fieldTag: 'Field B' },
    ],
  },
  {
    date: '2025-06-11',
    dateLabel: 'Yesterday, 11 June 2025',
    items: [
      { time: '5:00 PM', icon: Sprout, iconColor: 'text-success-green', bgColor: 'bg-success-green/15', description: 'Harvested 200kg from Field C', detail: 'Paddy — Sona Masoori', amount: '₹16,000', fieldTag: 'Field C' },
      { time: '10:00 AM', icon: Tractor, iconColor: 'text-krishiva-green', bgColor: 'bg-krishiva-green/15', description: 'Sowed tomato seeds in Field D', detail: 'Pusa Ruby variety', fieldTag: 'Field D' },
      { time: '9:00 AM', icon: IndianRupee, iconColor: 'text-error-red', bgColor: 'bg-error-red/15', description: 'Purchased seeds', detail: 'Cotton seeds — Bunny Bt', amount: '₹4,500' },
    ],
  },
  {
    date: '2025-06-10',
    dateLabel: '10 June 2025',
    items: [
      { time: '4:30 PM', icon: Users, iconColor: 'text-purple-500', bgColor: 'bg-purple-500/15', description: 'Hired 2 laborers for weeding', detail: 'East Field — ₹600/day each', amount: '₹1,200', fieldTag: 'Field A' },
      { time: '11:00 AM', icon: AlertCircle, iconColor: 'text-warning-amber', bgColor: 'bg-warning-amber/15', description: 'Pest inspection completed', detail: 'No issues found in chili crop', fieldTag: 'Field B' },
    ],
  },
];

function ActivityTab() {
  return (
    <motion.div variants={tabContentVariant} initial="hidden" animate="visible" exit="exit" className="space-y-6">
      {activityData.map((group, gIdx) => (
        <div key={group.date}>
          {/* Date Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: gIdx * 0.1 }}
            className="sticky top-0 z-10 bg-bg-primary/95 backdrop-blur-sm py-2 mb-3"
          >
            <p className="text-text-secondary text-sm font-semibold">{group.dateLabel}</p>
          </motion.div>

          {/* Activity Items */}
          <div className="relative pl-6">
            {/* Timeline line */}
            <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-border-light" />

            <div className="space-y-4">
              {group.items.map((item, iIdx) => (
                <motion.div
                  key={`${group.date}-${iIdx}`}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: gIdx * 0.1 + iIdx * 0.04, duration: 0.3 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className={`absolute -left-6 top-1 w-5 h-5 rounded-full ${item.bgColor} flex items-center justify-center border-2 border-bg-primary`}>
                    <div className={`w-2 h-2 rounded-full ${item.iconColor.replace('text-', 'bg-')}`} />
                  </div>

                  <div className="bg-white rounded-xl p-4 border border-border-light shadow-card hover:shadow-card-hover transition-shadow">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <item.icon className={`w-4 h-4 ${item.iconColor}`} />
                          <p className="text-sm font-medium text-text-primary">{item.description}</p>
                        </div>
                        {item.detail && <p className="text-text-secondary text-xs ml-6">{item.detail}</p>}
                        <div className="flex items-center gap-2 mt-2 ml-6">
                          {item.fieldTag && (
                            <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-krishiva-green/10 text-krishiva-green">
                              {item.fieldTag}
                            </span>
                          )}
                          <div className="flex items-center gap-1 text-text-muted">
                            <Clock className="w-3 h-3" />
                            <span className="text-[11px]">{item.time}</span>
                          </div>
                        </div>
                      </div>
                      {item.amount && (
                        <span className="text-sm font-semibold text-text-primary shrink-0">{item.amount}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

/* ═══════════════════════ ANALYTICS TAB ═══════════════════════ */

const monthlyData = [
  { month: 'Jan', expenses: 28000, revenue: 35000 },
  { month: 'Feb', expenses: 22000, revenue: 32000 },
  { month: 'Mar', expenses: 35000, revenue: 48000 },
  { month: 'Apr', expenses: 30000, revenue: 42000 },
  { month: 'May', expenses: 25000, revenue: 50000 },
  { month: 'Jun', expenses: 32000, revenue: 55000 },
];

const cropDistribution = [
  { name: 'Cotton', value: 8, color: '#2E7D32' },
  { name: 'Chili', value: 6, color: '#F9A825' },
  { name: 'Paddy', value: 5, color: '#66BB6A' },
  { name: 'Tomato', value: 6, color: '#EC4899' },
];

const yieldTrend = [
  { season: 'Kharif 2022', cotton: 12, chili: 8, paddy: 18 },
  { season: 'Rabi 2022', cotton: 14, chili: 9, paddy: 20 },
  { season: 'Kharif 2023', cotton: 13, chili: 10, paddy: 19 },
  { season: 'Rabi 2023', cotton: 16, chili: 11, paddy: 22 },
  { season: 'Kharif 2024', cotton: 15, chili: 12, paddy: 21 },
  { season: 'Rabi 2024', cotton: 18, chili: 13, paddy: 24 },
];

function AnalyticsTab() {
  return (
    <motion.div variants={tabContentVariant} initial="hidden" animate="visible" exit="exit" className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Monthly Expenses vs Revenue */}
        <motion.div
          custom={0}
          variants={cardVariant}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl p-5 border border-border-light shadow-card"
        >
          <h3 className="font-poppins font-semibold text-base text-text-primary mb-1">Monthly Expenses vs Revenue</h3>
          <p className="text-text-muted text-xs mb-4">Last 6 months</p>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 13 }} formatter={(v: number) => `₹${v.toLocaleString()}`} />
                <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="revenue" fill="#2E7D32" radius={[4, 4, 0, 0]} name="Revenue" />
                <Bar dataKey="expenses" fill="#EF4444" radius={[4, 4, 0, 0]} name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Crop Distribution */}
        <motion.div
          custom={1}
          variants={cardVariant}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl p-5 border border-border-light shadow-card"
        >
          <h3 className="font-poppins font-semibold text-base text-text-primary mb-1">Crop Distribution by Area</h3>
          <p className="text-text-muted text-xs mb-4">Total: 25 acres</p>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cropDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {cropDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 13 }} formatter={(v: number, n: string) => [`${v} acres`, n]} />
                <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Yield Trend */}
        <motion.div
          custom={2}
          variants={cardVariant}
          initial="hidden"
          animate="visible"
          className="lg:col-span-2 bg-white rounded-2xl p-5 border border-border-light shadow-card"
        >
          <h3 className="font-poppins font-semibold text-base text-text-primary mb-1">Yield Trend Over Seasons</h3>
          <p className="text-text-muted text-xs mb-4">Quintals per acre</p>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yieldTrend}>
                <defs>
                  <linearGradient id="cottonGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#2E7D32" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="chiliGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F9A825" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#F9A825" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="paddyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#66BB6A" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#66BB6A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis dataKey="season" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 13 }} />
                <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="cotton" stroke="#2E7D32" strokeWidth={2} fill="url(#cottonGrad)" name="Cotton" />
                <Area type="monotone" dataKey="chili" stroke="#F9A825" strokeWidth={2} fill="url(#chiliGrad)" name="Chili" />
                <Area type="monotone" dataKey="paddy" stroke="#66BB6A" strokeWidth={2} fill="url(#paddyGrad)" name="Paddy" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════ MAIN PAGE ═══════════════════════ */

export default function FarmOS() {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');

  /* ── Dialog States ── */
  const [addFieldOpen, setAddFieldOpen] = useState(false);
  const [addCropOpen, setAddCropOpen] = useState(false);
  const [logExpenseOpen, setLogExpenseOpen] = useState(false);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [logActivityOpen, setLogActivityOpen] = useState(false);
  const [addNoteOpen, setAddNoteOpen] = useState(false);
  const [markIssueOpen, setMarkIssueOpen] = useState(false);

  /* ── Selected Data ── */
  const [selectedField, setSelectedField] = useState<typeof fields[0] | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<CropData | null>(null);

  /* ── Form States: Add Field ── */
  const [fieldName, setFieldName] = useState('');
  const [fieldArea, setFieldArea] = useState('');
  const [fieldCropType, setFieldCropType] = useState('');
  const [fieldSoilType, setFieldSoilType] = useState('');
  const [fieldWaterSource, setFieldWaterSource] = useState('');

  /* ── Form States: Add Crop ── */
  const [cropName, setCropName] = useState('');
  const [cropField, setCropField] = useState('');
  const [cropArea, setCropArea] = useState('');
  const [cropPlantingDate, setCropPlantingDate] = useState('');
  const [cropHarvestDate, setCropHarvestDate] = useState('');

  /* ── Form States: Log Expense ── */
  const [expenseType, setExpenseType] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState('');
  const [expenseNotes, setExpenseNotes] = useState('');

  /* ── Form States: Log Activity ── */
  const [activityType, setActivityType] = useState('');
  const [activityField, setActivityField] = useState('');
  const [activityDescription, setActivityDescription] = useState('');
  const [activityDate, setActivityDate] = useState('');

  /* ── Form States: Add Note ── */
  const [noteContent, setNoteContent] = useState('');

  /* ── Form States: Mark Issue ── */
  const [issueType, setIssueType] = useState('');
  const [issueSeverity, setIssueSeverity] = useState('');
  const [issueDescription, setIssueDescription] = useState('');

  /* ── Handlers ── */
  const openAddField = () => setAddFieldOpen(true);
  const openAddCrop = () => setAddCropOpen(true);
  const openLogExpense = () => setLogExpenseOpen(true);

  const openViewDetailsField = (field: typeof fields[0]) => {
    setSelectedField(field);
    setSelectedCrop(null);
    setViewDetailsOpen(true);
  };

  const openViewDetailsCrop = (crop: CropData) => {
    setSelectedCrop(crop);
    setSelectedField(null);
    setViewDetailsOpen(true);
  };

  const openLogActivity = () => setLogActivityOpen(true);

  const openAddNote = (crop: CropData) => {
    setSelectedCrop(crop);
    setAddNoteOpen(true);
  };

  const openMarkIssue = (crop: CropData) => {
    setSelectedCrop(crop);
    setMarkIssueOpen(true);
  };

  const handleAddField = () => {
    showToast(`Field "${fieldName || 'New Field'}" added successfully!`);
    setAddFieldOpen(false);
    setFieldName('');
    setFieldArea('');
    setFieldCropType('');
    setFieldSoilType('');
    setFieldWaterSource('');
  };

  const handleAddCrop = () => {
    showToast(`Crop "${cropName || 'New Crop'}" added successfully!`);
    setAddCropOpen(false);
    setCropName('');
    setCropField('');
    setCropArea('');
    setCropPlantingDate('');
    setCropHarvestDate('');
  };

  const handleLogExpense = () => {
    showToast(`Expense of ₹${expenseAmount || '0'} logged!`);
    setLogExpenseOpen(false);
    setExpenseType('');
    setExpenseAmount('');
    setExpenseDate('');
    setExpenseNotes('');
  };

  const handleLogActivity = () => {
    showToast('Activity logged successfully!');
    setLogActivityOpen(false);
    setActivityType('');
    setActivityField('');
    setActivityDescription('');
    setActivityDate('');
  };

  const handleAddNote = () => {
    showToast('Note added successfully!');
    setAddNoteOpen(false);
    setNoteContent('');
  };

  const handleMarkIssue = () => {
    showToast('Issue reported successfully!');
    setMarkIssueOpen(false);
    setIssueType('');
    setIssueSeverity('');
    setIssueDescription('');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewTab onAddField={openAddField} onAddCrop={openAddCrop} onLogExpense={openLogExpense} />;
      case 'fields': return <FieldsTab onViewDetails={openViewDetailsField} onLogActivity={openLogActivity} />;
      case 'crops': return <CropsTab onViewDetails={openViewDetailsCrop} onAddNote={openAddNote} onMarkIssue={openMarkIssue} />;
      case 'activity': return <ActivityTab />;
      case 'analytics': return <AnalyticsTab />;
      default: return <OverviewTab onAddField={openAddField} onAddCrop={openAddCrop} onLogExpense={openLogExpense} />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-5">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div>
            <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-text-primary">Farm OS</h1>
            <p className="text-text-secondary text-sm mt-1">Manage your farm</p>
          </div>
          <button
            onClick={openAddField}
            className="flex items-center gap-2 bg-krishiva-green hover:bg-[#1B5E20] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors self-start sm:self-auto shadow-button"
          >
            <Plus className="w-4 h-4" />
            Add Field
          </button>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-border-light shadow-card overflow-hidden"
        >
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as TabKey)}
                  className={`relative flex items-center gap-2 px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-colors shrink-0 ${
                    isActive
                      ? 'text-krishiva-green'
                      : 'text-text-secondary hover:text-text-primary hover:bg-krishiva-green/5'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-2 right-2 h-[3px] bg-krishiva-green rounded-t-full"
                      transition={{ type: 'tween', duration: 0.2 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ═══════════ DIALOGS ═══════════ */}

      {/* ── Add Field Dialog ── */}
      <Dialog open={addFieldOpen} onOpenChange={setAddFieldOpen}>
        <DialogContent className="sm:max-w-[460px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-poppins text-lg flex items-center gap-2">
              <Plus className="w-5 h-5 text-krishiva-green" /> Add New Field
            </DialogTitle>
            <DialogDescription className="text-text-muted text-sm font-inter">
              Register a new field on your farm with its details.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label className="text-sm font-medium font-inter">Field Name</Label>
              <Input
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                placeholder="e.g., Field E"
                className="mt-1.5 rounded-xl font-inter"
              />
            </div>
            <div>
              <Label className="text-sm font-medium font-inter">Area (acres)</Label>
              <Input
                value={fieldArea}
                onChange={(e) => setFieldArea(e.target.value)}
                placeholder="e.g., 5"
                type="number"
                className="mt-1.5 rounded-xl font-inter"
              />
            </div>
            <div>
              <Label className="text-sm font-medium font-inter">Crop Type</Label>
              <Select value={fieldCropType} onValueChange={setFieldCropType}>
                <SelectTrigger className="mt-1.5 rounded-xl font-inter">
                  <SelectValue placeholder="Select crop type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cotton">Cotton</SelectItem>
                  <SelectItem value="chili">Chili</SelectItem>
                  <SelectItem value="paddy">Paddy</SelectItem>
                  <SelectItem value="tomato">Tomato</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="sugarcane">Sugarcane</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium font-inter">Soil Type</Label>
              <Select value={fieldSoilType} onValueChange={setFieldSoilType}>
                <SelectTrigger className="mt-1.5 rounded-xl font-inter">
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="loamy">Loamy</SelectItem>
                  <SelectItem value="sandy">Sandy Loam</SelectItem>
                  <SelectItem value="clay">Clay</SelectItem>
                  <SelectItem value="silt">Silt Loam</SelectItem>
                  <SelectItem value="black">Black Soil</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium font-inter">Water Source</Label>
              <Select value={fieldWaterSource} onValueChange={setFieldWaterSource}>
                <SelectTrigger className="mt-1.5 rounded-xl font-inter">
                  <SelectValue placeholder="Select water source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="drip">Drip Irrigation</SelectItem>
                  <SelectItem value="sprinkler">Sprinkler</SelectItem>
                  <SelectItem value="flood">Flood Irrigation</SelectItem>
                  <SelectItem value=" borewell">Borewell</SelectItem>
                  <SelectItem value="canal">Canal Water</SelectItem>
                  <SelectItem value="rain">Rain Fed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <button
              onClick={handleAddField}
              className="flex items-center gap-2 bg-krishiva-green hover:bg-[#1B5E20] text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors shadow-button"
            >
              <Plus className="w-4 h-4" /> Add Field
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Add Crop Dialog ── */}
      <Dialog open={addCropOpen} onOpenChange={setAddCropOpen}>
        <DialogContent className="sm:max-w-[460px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-poppins text-lg flex items-center gap-2">
              <Sprout className="w-5 h-5 text-blue-500" /> Add New Crop
            </DialogTitle>
            <DialogDescription className="text-text-muted text-sm font-inter">
              Track a new crop planting on your farm.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label className="text-sm font-medium font-inter">Crop Name</Label>
              <Input
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                placeholder="e.g., Cotton"
                className="mt-1.5 rounded-xl font-inter"
              />
            </div>
            <div>
              <Label className="text-sm font-medium font-inter">Field</Label>
              <Select value={cropField} onValueChange={setCropField}>
                <SelectTrigger className="mt-1.5 rounded-xl font-inter">
                  <SelectValue placeholder="Select field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Field A">Field A</SelectItem>
                  <SelectItem value="Field B">Field B</SelectItem>
                  <SelectItem value="Field C">Field C</SelectItem>
                  <SelectItem value="Field D">Field D</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium font-inter">Area (acres)</Label>
              <Input
                value={cropArea}
                onChange={(e) => setCropArea(e.target.value)}
                placeholder="e.g., 5"
                type="number"
                className="mt-1.5 rounded-xl font-inter"
              />
            </div>
            <div>
              <Label className="text-sm font-medium font-inter">Planting Date</Label>
              <Input
                value={cropPlantingDate}
                onChange={(e) => setCropPlantingDate(e.target.value)}
                type="date"
                className="mt-1.5 rounded-xl font-inter"
              />
            </div>
            <div>
              <Label className="text-sm font-medium font-inter">Expected Harvest Date</Label>
              <Input
                value={cropHarvestDate}
                onChange={(e) => setCropHarvestDate(e.target.value)}
                type="date"
                className="mt-1.5 rounded-xl font-inter"
              />
            </div>
          </div>
          <DialogFooter>
            <button
              onClick={handleAddCrop}
              className="flex items-center gap-2 bg-krishiva-green hover:bg-[#1B5E20] text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors shadow-button"
            >
              <Sprout className="w-4 h-4" /> Add Crop
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Log Expense Dialog ── */}
      <Dialog open={logExpenseOpen} onOpenChange={setLogExpenseOpen}>
        <DialogContent className="sm:max-w-[460px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-poppins text-lg flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-error-red" /> Log Expense
            </DialogTitle>
            <DialogDescription className="text-text-muted text-sm font-inter">
              Record a farm expense for your records.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label className="text-sm font-medium font-inter">Expense Type</Label>
              <Select value={expenseType} onValueChange={setExpenseType}>
                <SelectTrigger className="mt-1.5 rounded-xl font-inter">
                  <SelectValue placeholder="Select expense type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seeds">Seeds</SelectItem>
                  <SelectItem value="fertilizer">Fertilizer</SelectItem>
                  <SelectItem value="labor">Labor</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="pesticide">Pesticide</SelectItem>
                  <SelectItem value="irrigation">Irrigation</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium font-inter">Amount (₹)</Label>
              <Input
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                placeholder="e.g., 5000"
                type="number"
                className="mt-1.5 rounded-xl font-inter"
              />
            </div>
            <div>
              <Label className="text-sm font-medium font-inter">Date</Label>
              <Input
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
                type="date"
                className="mt-1.5 rounded-xl font-inter"
              />
            </div>
            <div>
              <Label className="text-sm font-medium font-inter">Notes</Label>
              <Textarea
                value={expenseNotes}
                onChange={(e) => setExpenseNotes(e.target.value)}
                placeholder="Any additional details..."
                className="mt-1.5 rounded-xl font-inter"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <button
              onClick={handleLogExpense}
              className="flex items-center gap-2 bg-error-red hover:bg-red-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors shadow-button"
            >
              <IndianRupee className="w-4 h-4" /> Log Expense
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── View Details Dialog ── */}
      <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
        <DialogContent className="sm:max-w-[460px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-poppins text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-krishiva-green" /> Details
            </DialogTitle>
          </DialogHeader>
          {selectedField && (
            <div className="space-y-3 py-2">
              <div className="bg-krishiva-green/5 rounded-xl p-4">
                <h4 className="font-poppins font-semibold text-base text-text-primary">{selectedField.name}</h4>
                <p className="text-text-muted text-sm font-inter">{selectedField.crop} cultivation</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-bg-primary rounded-xl p-3">
                  <p className="text-text-muted text-xs font-inter">Size</p>
                  <p className="text-text-primary text-sm font-medium font-inter">{selectedField.size} acres</p>
                </div>
                <div className="bg-bg-primary rounded-xl p-3">
                  <p className="text-text-muted text-xs font-inter">Status</p>
                  <p className="text-text-primary text-sm font-medium font-inter">{selectedField.status}</p>
                </div>
                <div className="bg-bg-primary rounded-xl p-3">
                  <p className="text-text-muted text-xs font-inter">Soil Type</p>
                  <p className="text-text-primary text-sm font-medium font-inter">{selectedField.soilType}</p>
                </div>
                <div className="bg-bg-primary rounded-xl p-3">
                  <p className="text-text-muted text-xs font-inter">Water Source</p>
                  <p className="text-text-primary text-sm font-medium font-inter">{selectedField.waterSource}</p>
                </div>
              </div>
              <div className="bg-bg-primary rounded-xl p-3">
                <p className="text-text-muted text-xs font-inter mb-1">Crop Color Code</p>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: selectedField.cropColor }} />
                  <span className="text-text-primary text-sm font-inter">{selectedField.crop}</span>
                </div>
              </div>
            </div>
          )}
          {selectedCrop && (
            <div className="space-y-3 py-2">
              <div className="rounded-xl p-4" style={{ backgroundColor: `${selectedCrop.color}10` }}>
                <h4 className="font-poppins font-semibold text-base text-text-primary">{selectedCrop.name}</h4>
                <p className="text-text-muted text-sm font-inter">{selectedCrop.variety} • {selectedCrop.field}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-bg-primary rounded-xl p-3">
                  <p className="text-text-muted text-xs font-inter">Growth</p>
                  <p className="text-text-primary text-sm font-medium font-inter">{selectedCrop.growthPercent}%</p>
                </div>
                <div className="bg-bg-primary rounded-xl p-3">
                  <p className="text-text-muted text-xs font-inter">Stage</p>
                  <p className="text-text-primary text-sm font-medium font-inter">{selectedCrop.stage}</p>
                </div>
                <div className="bg-bg-primary rounded-xl p-3">
                  <p className="text-text-muted text-xs font-inter">Health</p>
                  <p className="text-text-primary text-sm font-medium font-inter">{selectedCrop.health}</p>
                </div>
                <div className="bg-bg-primary rounded-xl p-3">
                  <p className="text-text-muted text-xs font-inter">Days Remaining</p>
                  <p className="text-text-primary text-sm font-medium font-inter">{selectedCrop.daysRemaining}</p>
                </div>
              </div>
              <div className="bg-bg-primary rounded-xl p-3">
                <p className="text-text-muted text-xs font-inter mb-1">Growth Progress</p>
                <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${selectedCrop.growthPercent}%`, backgroundColor: selectedCrop.color }}
                  />
                </div>
                <p className="text-text-muted text-xs mt-1 font-inter">{selectedCrop.plantedDays} of {selectedCrop.totalDays} days planted</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Log Activity Dialog ── */}
      <Dialog open={logActivityOpen} onOpenChange={setLogActivityOpen}>
        <DialogContent className="sm:max-w-[460px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-poppins text-lg flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-krishiva-green" /> Log Activity
            </DialogTitle>
            <DialogDescription className="text-text-muted text-sm font-inter">
              Record a farming activity for your records.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label className="text-sm font-medium font-inter">Activity Type</Label>
              <Select value={activityType} onValueChange={setActivityType}>
                <SelectTrigger className="mt-1.5 rounded-xl font-inter">
                  <SelectValue placeholder="Select activity type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="irrigation">Irrigation</SelectItem>
                  <SelectItem value="fertilizing">Fertilizing</SelectItem>
                  <SelectItem value="pest_control">Pest Control</SelectItem>
                  <SelectItem value="weeding">Weeding</SelectItem>
                  <SelectItem value="harvesting">Harvesting</SelectItem>
                  <SelectItem value="sowing">Sowing</SelectItem>
                  <SelectItem value="pruning">Pruning</SelectItem>
                  <SelectItem value="inspection">Inspection</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium font-inter">Field</Label>
              <Select value={activityField} onValueChange={setActivityField}>
                <SelectTrigger className="mt-1.5 rounded-xl font-inter">
                  <SelectValue placeholder="Select field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Field A">Field A</SelectItem>
                  <SelectItem value="Field B">Field B</SelectItem>
                  <SelectItem value="Field C">Field C</SelectItem>
                  <SelectItem value="Field D">Field D</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium font-inter">Date</Label>
              <Input
                value={activityDate}
                onChange={(e) => setActivityDate(e.target.value)}
                type="date"
                className="mt-1.5 rounded-xl font-inter"
              />
            </div>
            <div>
              <Label className="text-sm font-medium font-inter">Description</Label>
              <Textarea
                value={activityDescription}
                onChange={(e) => setActivityDescription(e.target.value)}
                placeholder="Describe the activity..."
                className="mt-1.5 rounded-xl font-inter"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <button
              onClick={handleLogActivity}
              className="flex items-center gap-2 bg-krishiva-green hover:bg-[#1B5E20] text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors shadow-button"
            >
              <ClipboardList className="w-4 h-4" /> Log Activity
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Add Note Dialog ── */}
      <Dialog open={addNoteOpen} onOpenChange={setAddNoteOpen}>
        <DialogContent className="sm:max-w-[460px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-poppins text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-krishiva-green" /> Add Note
            </DialogTitle>
            <DialogDescription className="text-text-muted text-sm font-inter">
              {selectedCrop ? `Add a note for ${selectedCrop.name} (${selectedCrop.field})` : 'Add a note for your records.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label className="text-sm font-medium font-inter">Note Content</Label>
              <Textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Write your note here..."
                className="mt-1.5 rounded-xl font-inter"
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <button
              onClick={handleAddNote}
              className="flex items-center gap-2 bg-krishiva-green hover:bg-[#1B5E20] text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors shadow-button"
            >
              <FileText className="w-4 h-4" /> Add Note
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Mark Issue Dialog ── */}
      <Dialog open={markIssueOpen} onOpenChange={setMarkIssueOpen}>
        <DialogContent className="sm:max-w-[460px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-poppins text-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-error-red" /> Report Issue
            </DialogTitle>
            <DialogDescription className="text-text-muted text-sm font-inter">
              {selectedCrop ? `Report an issue for ${selectedCrop.name} (${selectedCrop.field})` : 'Report a farm issue.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label className="text-sm font-medium font-inter">Issue Type</Label>
              <Select value={issueType} onValueChange={setIssueType}>
                <SelectTrigger className="mt-1.5 rounded-xl font-inter">
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pest">Pest Infestation</SelectItem>
                  <SelectItem value="disease">Plant Disease</SelectItem>
                  <SelectItem value="water">Water Problem</SelectItem>
                  <SelectItem value="soil">Soil Issue</SelectItem>
                  <SelectItem value="weather">Weather Damage</SelectItem>
                  <SelectItem value="equipment">Equipment Failure</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium font-inter">Severity</Label>
              <Select value={issueSeverity} onValueChange={setIssueSeverity}>
                <SelectTrigger className="mt-1.5 rounded-xl font-inter">
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low — Minor concern</SelectItem>
                  <SelectItem value="medium">Medium — Needs attention</SelectItem>
                  <SelectItem value="high">High — Urgent action needed</SelectItem>
                  <SelectItem value="critical">Critical — Immediate action required</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium font-inter">Description</Label>
              <Textarea
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                placeholder="Describe the issue in detail..."
                className="mt-1.5 rounded-xl font-inter"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <button
              onClick={handleMarkIssue}
              className="flex items-center gap-2 bg-error-red hover:bg-red-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors shadow-button"
            >
              <AlertCircle className="w-4 h-4" /> Report Issue
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
