import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  FileText,
  Shield,
  Landmark,
  Receipt,
  PiggyBank,
  Check,
  ArrowDown,
  Sprout,
  Tractor,
  Droplets,
  Users,
  Package,
  ArrowRight,
  Info,
  Lightbulb,
  Calendar,
  Percent,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar,
} from 'recharts';
import DashboardLayout from '@/components/DashboardLayout';

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const expenseData = [
  { name: 'Seeds', value: 4500, color: '#2E7D32' },
  { name: 'Fertilizers', value: 3200, color: '#66BB6A' },
  { name: 'Labor', value: 8000, color: '#F9A825' },
  { name: 'Machinery', value: 2500, color: '#8D6E63' },
  { name: 'Irrigation', value: 1800, color: '#3B82F6' },
];

const creditHistory = [
  { month: 'Jan', score: 710 },
  { month: 'Feb', score: 718 },
  { month: 'Mar', score: 725 },
  { month: 'Apr', score: 732 },
  { month: 'May', score: 738 },
  { month: 'Jun', score: 742 },
];

/* savings data */

const monthlySavings = [
  { month: 'Jan', saved: 5000 },
  { month: 'Feb', saved: 8000 },
  { month: 'Mar', saved: 6000 },
  { month: 'Apr', saved: 10000 },
  { month: 'May', saved: 7000 },
  { month: 'Jun', saved: 9500 },
];

const loans = [
  {
    id: 'kcc',
    type: 'KCC',
    lender: 'SBI Agriculture',
    name: 'Kisan Credit Card',
    amount: 'Up to \u20B93 Lakhs',
    interest: '7% per annum',
    tenure: '12 months renewable',
    features: ['No collateral up to \u20B93L', 'Interest subsidy available', 'Disbursal in 7 days'],
    eligible: true,
  },
  {
    id: 'personal',
    type: 'Personal',
    lender: 'HDFC Bank',
    name: 'Personal Loan',
    amount: 'Up to \u20B95 Lakhs',
    interest: '12% per annum',
    tenure: '24-60 months',
    features: ['Minimal documentation', 'Quick approval', 'Flexible repayment'],
    eligible: true,
  },
  {
    id: 'equipment',
    type: 'Equipment',
    lender: 'NABARD',
    name: 'Equipment Loan',
    amount: 'Up to \u20B910 Lakhs',
    interest: '9% per annum',
    tenure: '36-84 months',
    features: ['Buy tractor & tools', 'Subsidized rates', 'Grace period available'],
    eligible: true,
  },
];

const myLoans = [
  {
    id: 'LN-2847',
    type: 'KCC',
    lender: 'SBI Agriculture',
    amount: '\u20B91,50,000',
    emi: '\u20B92,500/mo',
    status: 'Under Review',
    appliedDate: 'May 15, 2025',
  },
];

const insurancePolicies = [
  {
    id: 'pmfby',
    provider: 'Govt of India',
    name: 'Pradhan Mantri Fasal Bima Yojana',
    shortName: 'PMFBY',
    premium: '2% of sum insured',
    coverage: '\u20B925,000/acre',
    description: 'Crop insurance covering yield loss due to natural calamities, pests & diseases.',
    features: ['50% government subsidy', 'Covers all crops', 'Easy claim process'],
    subsidy: true,
  },
  {
    id: 'iffco',
    provider: 'IFFCO Tokio',
    name: 'IFFCO Tokio Crop Insurance',
    shortName: 'ITGI Crop',
    premium: '\u20B9500/acre',
    coverage: '\u20B920,000/acre',
    description: 'Comprehensive crop coverage with quick claim settlement.',
    features: ['Doorstep service', 'Digital claims', 'Covers post-harvest loss'],
    subsidy: false,
  },
  {
    id: 'aic',
    provider: 'Agriculture Insurance Co.',
    name: 'AIC Comprehensive Crop Cover',
    shortName: 'AIC Crop',
    premium: '\u20B9350/acre',
    coverage: '\u20B918,000/acre',
    description: 'Specialized coverage for small and marginal farmers.',
    features: ['Low premium for small farms', 'Weather-based payouts', 'Add-on benefits'],
    subsidy: false,
  },
];

const myPolicies = [
  {
    id: 'POL-001',
    name: 'PMFBY',
    crop: 'Cotton',
    coverage: '\u20B950,000',
    status: 'Active',
    renewalDate: 'Nov 2025',
  },
];

const schemes = [
  {
    id: 'pmkisan',
    name: 'PM-KISAN',
    ministry: 'Ministry of Agriculture',
    benefit: '\u20B96,000/year in 3 installments',
    eligibility: 'All landholding farmers',
    status: 'Eligible',
    deadline: 'Next installment: Dec 2025',
    description: 'Direct income support of \u20B96,000 per year to farmer families.',
  },
  {
    id: 'shc',
    name: 'Soil Health Card',
    ministry: 'Ministry of Agriculture',
    benefit: 'Free soil testing & recommendations',
    eligibility: 'All farmers',
    status: 'Applied',
    deadline: 'Cards issued every 3 years',
    description: 'Free soil health testing with crop-wise nutrient recommendations.',
  },
  {
    id: 'mif',
    name: 'Micro Irrigation Fund',
    ministry: 'NABARD',
    benefit: 'Subsidy up to 55% on drip/sprinkler',
    eligibility: 'Farmers adopting micro irrigation',
    status: 'Eligible',
    deadline: 'Ongoing scheme',
    description: 'Financial assistance for adopting micro-irrigation systems.',
  },
  {
    id: 'nmsa',
    name: 'National Mission on Sustainable Agriculture',
    ministry: 'Ministry of Agriculture',
    benefit: 'Up to \u20B950,000 for sustainable practices',
    eligibility: 'Farmers adopting organic farming',
    status: 'Check Eligibility',
    deadline: 'Applications open year-round',
    description: 'Promotes sustainable agricultural practices including organic farming.',
  },
];

const recentTransactions = [
  { id: 1, name: 'Urea Fertilizer', category: 'Fertilizers', amount: 3200, date: '12 Jun 2025', type: 'expense' },
  { id: 2, name: 'Cotton Seeds (BT)', category: 'Seeds', amount: 4500, date: '10 Jun 2025', type: 'expense' },
  { id: 3, name: 'Tractor Rental', category: 'Machinery', amount: 2500, date: '8 Jun 2025', type: 'expense' },
  { id: 4, name: 'Labor Wages', category: 'Labor', amount: 8000, date: '5 Jun 2025', type: 'expense' },
  { id: 5, name: 'Borewell Repair', category: 'Irrigation', amount: 1800, date: '3 Jun 2025', type: 'expense' },
];

const creditFactors = [
  { name: 'Payment History', value: 85 },
  { name: 'Credit Utilization', value: 60 },
  { name: 'Credit Age', value: 70 },
  { name: 'Recent Inquiries', value: 90 },
];

const savingsGoals = [
  { name: 'New Tractor Fund', current: 150000, target: 500000, icon: Tractor },
  { name: 'Emergency Fund', current: 50000, target: 100000, icon: Shield },
  { name: 'Next Season Seeds', current: 20000, target: 30000, icon: Sprout },
];

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
};

/* ------------------------------------------------------------------ */
/*  Helper Components                                                  */
/* ------------------------------------------------------------------ */

function CircularProgress({ percentage, size = 56, strokeWidth = 5, color = '#2E7D32' }: { percentage: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} stroke="#E5E7EB" strokeWidth={strokeWidth} fill="none" />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
    </svg>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'Active' || status === 'Eligible' || status === 'On Track') {
    return <Badge className="bg-success-green text-white hover:bg-success-green">{status}</Badge>;
  }
  if (status === 'Under Review' || status === 'Applied' || status === 'Pending') {
    return <Badge className="bg-warning-amber text-white hover:bg-warning-amber">{status}</Badge>;
  }
  if (status === 'Check Eligibility') {
    return <Badge variant="outline" className="border-krishiva-green text-krishiva-green">{status}</Badge>;
  }
  return <Badge variant="secondary">{status}</Badge>;
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function Finance() {
  const [activeTab, setActiveTab] = useState('loans');
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<string>('');
  const [applyAmount, setApplyAmount] = useState('');

  const handleApplyClick = (loanId: string) => {
    setSelectedLoan(loanId);
    setApplyDialogOpen(true);
  };

  const expenseTotal = expenseData.reduce((sum, e) => sum + e.value, 0);

  return (
    <DashboardLayout>
      <div className="max-w-[1200px] mx-auto space-y-6 pb-6">
        {/* ---- Hero Banner ---- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="hero-gradient rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="relative z-10">
            <h1 className="font-poppins font-bold text-2xl sm:text-3xl mb-2">Financial Support for Farmers</h1>
            <p className="text-white/80 text-sm sm:text-base max-w-lg">Loans, insurance, and government schemes — all in one place</p>
          </div>
        </motion.div>

        {/* ---- Financial Health Overview ---- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Credit Score */}
          <motion.div variants={cardVariants}>
            <Card className="border-border-light shadow-card hover:shadow-card-hover transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <CircularProgress percentage={74.2} size={56} strokeWidth={5} color="#2E7D32" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-krishiva-green">742</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-text-secondary mb-0.5">Credit Score</p>
                    <p className="font-poppins font-bold text-xl text-text-primary">742</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <TrendingUp className="w-3 h-3 text-success-green" />
                      <span className="text-[11px] text-success-green">Good</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Outstanding Loan */}
          <motion.div variants={cardVariants}>
            <Card className="border-border-light shadow-card hover:shadow-card-hover transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-harvest-gold/10 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-harvest-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-text-secondary mb-0.5">Outstanding Loan</p>
                    <p className="font-poppins font-bold text-xl text-text-primary">&#x20B9;1,50,000</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <ArrowDown className="w-3 h-3 text-success-green" />
                      <span className="text-[11px] text-success-green">2% paid this month</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Insurance */}
          <motion.div variants={cardVariants}>
            <Card className="border-border-light shadow-card hover:shadow-card-hover transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-[#8B5CF6]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-text-secondary mb-0.5">Insurance Coverage</p>
                    <p className="font-poppins font-bold text-xl text-text-primary">&#x20B9;5,00,000</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-success-green" />
                      <span className="text-[11px] text-success-green">3 Policies Active</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Savings */}
          <motion.div variants={cardVariants}>
            <Card className="border-border-light shadow-card hover:shadow-card-hover transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center shrink-0">
                    <PiggyBank className="w-6 h-6 text-[#3B82F6]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-text-secondary mb-0.5">Savings</p>
                    <p className="font-poppins font-bold text-xl text-text-primary">&#x20B9;45,000</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <TrendingUp className="w-3 h-3 text-success-green" />
                      <span className="text-[11px] text-success-green">+&#x20B9;3,200 this month</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* ---- Tabs ---- */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-white border border-border-light p-1 rounded-xl h-auto flex flex-wrap gap-1 w-fit">
              {[
                { value: 'loans', label: 'Loans', icon: FileText },
                { value: 'insurance', label: 'Insurance', icon: Shield },
                { value: 'schemes', label: 'Schemes', icon: Landmark },
                { value: 'expenses', label: 'Expenses', icon: Receipt },
                { value: 'credit', label: 'Credit', icon: TrendingUp },
                { value: 'savings', label: 'Savings', icon: PiggyBank },
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
              {/* ====== LOANS TAB ====== */}
              <TabsContent value="loans" className="space-y-6 mt-0">
                <motion.div
                  key="loans"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Available Loans */}
                  <div className="mb-6">
                    <h3 className="font-poppins font-semibold text-lg text-text-primary mb-4">Available Loans</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {loans.map((loan, i) => (
                        <motion.div
                          key={loan.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08, duration: 0.4 }}
                        >
                          <Card className="border-border-light shadow-card hover:shadow-card-hover transition-all hover:-translate-y-0.5 h-full flex flex-col">
                            <CardContent className="p-5 flex flex-col flex-1">
                              <div className="flex items-center justify-between mb-3">
                                <Badge variant="outline" className="border-krishiva-green text-krishiva-green text-[10px]">{loan.type}</Badge>
                                {loan.eligible && (
                                  <Badge className="bg-success-green text-white text-[10px] hover:bg-success-green">
                                    <Check className="w-2.5 h-2.5 mr-0.5" />Eligible
                                  </Badge>
                                )}
                              </div>
                              <p className="font-poppins font-semibold text-base text-text-primary">{loan.lender}</p>
                              <p className="text-xs text-text-muted mb-3">{loan.name}</p>
                              <p className="font-poppins font-bold text-lg text-krishiva-green mb-1">{loan.amount}</p>
                              <div className="flex items-center gap-3 text-xs text-text-secondary mb-3">
                                <span className="flex items-center gap-1"><Percent className="w-3 h-3" />{loan.interest}</span>
                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{loan.tenure}</span>
                              </div>
                              <ul className="space-y-1.5 mb-4 flex-1">
                                {loan.features.map((f) => (
                                  <li key={f} className="flex items-start gap-1.5 text-xs text-text-secondary">
                                    <CheckCircle2 className="w-3 h-3 text-success-green shrink-0 mt-0.5" />
                                    {f}
                                  </li>
                                ))}
                              </ul>
                              <Button
                                onClick={() => handleApplyClick(loan.id)}
                                className="w-full bg-krishiva-green hover:bg-[#1B5E20] text-white rounded-xl"
                              >
                                Apply Now <ArrowRight className="w-4 h-4 ml-1" />
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* My Loans */}
                  <div>
                    <h3 className="font-poppins font-semibold text-lg text-text-primary mb-4">My Loans</h3>
                    {myLoans.map((loan) => (
                      <Card key={loan.id} className="border-border-light shadow-card">
                        <CardContent className="p-5">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-krishiva-green/10 flex items-center justify-center">
                                <FileText className="w-5 h-5 text-krishiva-green" />
                              </div>
                              <div>
                                <p className="font-medium text-sm text-text-primary">{loan.id} — {loan.type} Loan</p>
                                <p className="text-xs text-text-muted">{loan.lender} &middot; Applied on {loan.appliedDate}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="font-semibold text-sm text-text-primary">{loan.amount}</p>
                                <p className="text-xs text-text-secondary">{loan.emi}</p>
                              </div>
                              <StatusBadge status={loan.status} />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

              {/* ====== INSURANCE TAB ====== */}
              <TabsContent value="insurance" className="space-y-6 mt-0">
                <motion.div
                  key="insurance"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Available Policies */}
                  <div className="mb-6">
                    <h3 className="font-poppins font-semibold text-lg text-text-primary mb-4">Available Policies</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {insurancePolicies.map((policy, i) => (
                        <motion.div
                          key={policy.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08, duration: 0.4 }}
                        >
                          <Card className="border-border-light shadow-card hover:shadow-card-hover transition-all hover:-translate-y-0.5 h-full flex flex-col relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#8B5CF6]" />
                            <CardContent className="p-5 flex flex-col flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <p className="font-poppins font-semibold text-sm text-text-primary">{policy.provider}</p>
                                {policy.subsidy && (
                                  <Badge className="bg-harvest-gold text-text-primary text-[10px] hover:bg-harvest-gold">50% Govt Subsidy</Badge>
                                )}
                              </div>
                              <p className="font-poppins font-semibold text-base text-text-primary mb-1">{policy.name}</p>
                              <p className="text-xs text-text-secondary mb-3">{policy.description}</p>
                              <div className="flex items-center gap-3 text-xs mb-3">
                                <span className="font-semibold text-krishiva-green">{policy.premium}</span>
                                <span className="text-text-muted">|</span>
                                <span className="text-text-secondary">{policy.coverage}</span>
                              </div>
                              <ul className="space-y-1.5 mb-4 flex-1">
                                {policy.features.map((f) => (
                                  <li key={f} className="flex items-start gap-1.5 text-xs text-text-secondary">
                                    <CheckCircle2 className="w-3 h-3 text-success-green shrink-0 mt-0.5" />{f}
                                  </li>
                                ))}
                              </ul>
                              <Button variant="outline" className="w-full border-krishiva-green text-krishiva-green hover:bg-krishiva-green/5 rounded-xl">
                                Enroll Now
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* My Policies */}
                  <div>
                    <h3 className="font-poppins font-semibold text-lg text-text-primary mb-4">My Policies</h3>
                    {myPolicies.map((policy) => (
                      <Card key={policy.id} className="border-border-light shadow-card">
                        <CardContent className="p-5">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-[#8B5CF6]" />
                              </div>
                              <div>
                                <p className="font-medium text-sm text-text-primary">{policy.name} — {policy.crop} crop</p>
                                <p className="text-xs text-text-muted">Coverage: {policy.coverage} &middot; Renews: {policy.renewalDate}</p>
                              </div>
                            </div>
                            <StatusBadge status={policy.status} />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

              {/* ====== SCHEMES TAB ====== */}
              <TabsContent value="schemes" className="space-y-4 mt-0">
                <motion.div
                  key="schemes"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid md:grid-cols-2 gap-4"
                >
                  {schemes.map((scheme, i) => (
                    <motion.div
                      key={scheme.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.3 }}
                    >
                      <Card className="border-border-light shadow-card hover:shadow-card-hover transition-all relative overflow-hidden h-full">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#8B5CF6]" />
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-poppins font-semibold text-base text-text-primary">{scheme.name}</p>
                              <p className="text-xs text-text-muted">{scheme.ministry}</p>
                            </div>
                            <StatusBadge status={scheme.status} />
                          </div>
                          <p className="font-poppins font-semibold text-sm text-krishiva-green mb-2">{scheme.benefit}</p>
                          <p className="text-xs text-text-secondary mb-1">{scheme.description}</p>
                          <p className="text-xs text-text-secondary mb-1"><strong>Eligibility:</strong> {scheme.eligibility}</p>
                          <p className="text-xs text-warning-amber mb-3">{scheme.deadline}</p>
                          <Button variant="outline" size="sm" className="border-krishiva-green text-krishiva-green hover:bg-krishiva-green/5 rounded-lg text-xs">
                            {scheme.status === 'Eligible' ? 'Apply Now' : scheme.status === 'Applied' ? 'Check Status' : 'Check Eligibility'}
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              {/* ====== EXPENSES TAB ====== */}
              <TabsContent value="expenses" className="space-y-6 mt-0">
                <motion.div
                  key="expenses"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Pie Chart */}
                    <Card className="border-border-light shadow-card">
                      <CardHeader className="pb-2">
                        <h3 className="font-poppins font-semibold text-lg text-text-primary">Monthly Expense Breakdown</h3>
                        <p className="text-sm text-text-secondary">Total: <span className="font-bold text-krishiva-green">&#x20B9;{expenseTotal.toLocaleString()}</span></p>
                      </CardHeader>
                      <CardContent className="p-5">
                        <div className="h-[260px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={expenseData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={3}
                                dataKey="value"
                                animationBegin={0}
                                animationDuration={600}
                              >
                                {expenseData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip
                                formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                                contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 12 }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-3">
                          {expenseData.map((cat) => (
                            <div key={cat.name} className="flex items-center gap-1.5 text-xs text-text-secondary">
                              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                              {cat.name}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Recent Transactions */}
                    <Card className="border-border-light shadow-card">
                      <CardHeader className="pb-2">
                        <h3 className="font-poppins font-semibold text-lg text-text-primary">Recent Transactions</h3>
                      </CardHeader>
                      <CardContent className="p-5">
                        <div className="space-y-3">
                          {recentTransactions.map((tx, i) => (
                            <motion.div
                              key={tx.id}
                              initial={{ opacity: 0, x: -15 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.04, duration: 0.25 }}
                              className="flex items-center justify-between py-2.5 border-b border-border-light last:border-0"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-krishiva-green/10 flex items-center justify-center">
                                  {tx.category === 'Seeds' && <Sprout className="w-4 h-4 text-krishiva-green" />}
                                  {tx.category === 'Fertilizers' && <Package className="w-4 h-4 text-krishiva-green" />}
                                  {tx.category === 'Labor' && <Users className="w-4 h-4 text-harvest-gold" />}
                                  {tx.category === 'Machinery' && <Tractor className="w-4 h-4 text-soil-brown" />}
                                  {tx.category === 'Irrigation' && <Droplets className="w-4 h-4 text-[#3B82F6]" />}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-text-primary">{tx.name}</p>
                                  <p className="text-[11px] text-text-muted">{tx.category} &middot; {tx.date}</p>
                                </div>
                              </div>
                              <span className="text-sm font-semibold text-error-red">-&#x20B9;{tx.amount.toLocaleString()}</span>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Category Breakdown Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {expenseData.map((cat, i) => (
                      <motion.div
                        key={cat.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.04, duration: 0.25 }}
                      >
                        <Card className="border-border-light shadow-card">
                          <CardContent className="p-4 text-center">
                            <p className="text-xs text-text-secondary mb-1">{cat.name}</p>
                            <p className="font-poppins font-bold text-lg" style={{ color: cat.color }}>&#x20B9;{cat.value.toLocaleString()}</p>
                            <p className="text-[10px] text-text-muted">{Math.round((cat.value / expenseTotal) * 100)}% of total</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

              {/* ====== CREDIT TAB ====== */}
              <TabsContent value="credit" className="space-y-6 mt-0">
                <motion.div
                  key="credit"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Credit Score Display */}
                    <Card className="border-border-light shadow-card lg:col-span-1">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="relative mb-4">
                          <CircularProgress percentage={74.2} size={140} strokeWidth={10} color="#2E7D32" />
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="font-poppins font-bold text-3xl text-text-primary">742</span>
                            <span className="text-xs text-success-green font-medium">Good</span>
                          </div>
                        </div>
                        <p className="text-sm text-text-secondary mb-1">Your Credit Score</p>
                        <div className="flex items-center gap-1 text-xs text-success-green">
                          <TrendingUp className="w-3 h-3" />
                          <span>+15 pts this month</span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Score History Chart */}
                    <Card className="border-border-light shadow-card lg:col-span-2">
                      <CardHeader className="pb-2">
                        <h3 className="font-poppins font-semibold text-lg text-text-primary">6-Month Score Trend</h3>
                      </CardHeader>
                      <CardContent className="p-5">
                        <div className="h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={creditHistory}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                              <YAxis domain={[680, 760]} tick={{ fontSize: 12 }} />
                              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 12 }} />
                              <Line type="monotone" dataKey="score" stroke="#2E7D32" strokeWidth={3} dot={{ r: 4, fill: '#2E7D32' }} activeDot={{ r: 6 }} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Credit Factors */}
                  <Card className="border-border-light shadow-card">
                    <CardHeader className="pb-2">
                      <h3 className="font-poppins font-semibold text-lg text-text-primary">Score Factors</h3>
                    </CardHeader>
                    <CardContent className="p-5">
                      <div className="space-y-4">
                        {creditFactors.map((factor, i) => (
                          <motion.div
                            key={factor.name}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-sm text-text-primary">{factor.name}</span>
                              <span className="text-sm font-semibold text-text-primary">{factor.value}%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{
                                  backgroundColor: factor.value >= 80 ? '#22C55E' : factor.value >= 60 ? '#F9A825' : '#EF4444',
                                }}
                                initial={{ width: 0 }}
                                animate={{ width: `${factor.value}%` }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tips */}
                  <Card className="border-border-light shadow-card bg-krishiva-green/5 border-krishiva-green/20">
                    <CardContent className="p-5">
                      <h3 className="font-poppins font-semibold text-base text-text-primary mb-3 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-harvest-gold" /> Tips to Improve Your Score
                      </h3>
                      <ul className="space-y-2.5">
                        {[
                          'Pay all loan EMIs on time — set up auto-pay to never miss a due date.',
                          'Keep your credit utilization below 30% of your total limit.',
                          'Avoid multiple loan applications within a short period.',
                        ].map((tip, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="flex items-start gap-2 text-sm text-text-secondary"
                          >
                            <CheckCircle2 className="w-4 h-4 text-success-green shrink-0 mt-0.5" />
                            {tip}
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* ====== SAVINGS TAB ====== */}
              <TabsContent value="savings" className="space-y-6 mt-0">
                <motion.div
                  key="savings"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Savings Balance */}
                  <Card className="border-border-light shadow-card hero-gradient text-white">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                          <p className="text-white/70 text-sm mb-1">Total Savings</p>
                          <p className="font-poppins font-bold text-3xl">&#x20B9;45,000</p>
                          <p className="text-white/60 text-xs mt-1">+&#x20B9;3,200 this month</p>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="text-white/70 text-xs">Goal Target</p>
                          <p className="font-poppins font-semibold text-lg">&#x20B9;1,00,000 by Dec 2025</p>
                        </div>
                      </div>
                      <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-white rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: '45%' }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                        />
                      </div>
                      <p className="text-white/60 text-xs mt-2">45% of goal achieved</p>
                    </CardContent>
                  </Card>

                  {/* Monthly Savings Chart */}
                  <Card className="border-border-light shadow-card">
                    <CardHeader className="pb-2">
                      <h3 className="font-poppins font-semibold text-lg text-text-primary">Monthly Savings</h3>
                    </CardHeader>
                    <CardContent className="p-5">
                      <div className="h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={monthlySavings}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 12 }} formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Saved']} />
                            <Bar dataKey="saved" fill="#2E7D32" radius={[6, 6, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Savings Goals */}
                  <div>
                    <h3 className="font-poppins font-semibold text-lg text-text-primary mb-4">Savings Goals</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {savingsGoals.map((goal, i) => {
                        const pct = Math.round((goal.current / goal.target) * 100);
                        return (
                          <motion.div
                            key={goal.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.4 }}
                          >
                            <Card className="border-border-light shadow-card hover:shadow-card-hover transition-all">
                              <CardContent className="p-5">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 rounded-xl bg-krishiva-green/10 flex items-center justify-center">
                                    <goal.icon className="w-5 h-5 text-krishiva-green" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-sm text-text-primary">{goal.name}</p>
                                    <p className="text-xs text-text-muted">{pct}% achieved</p>
                                  </div>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                                  <motion.div
                                    className="h-full bg-krishiva-green rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${pct}%` }}
                                    transition={{ duration: 0.8, ease: 'easeOut' }}
                                  />
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="text-text-secondary">&#x20B9;{goal.current.toLocaleString()}</span>
                                  <span className="text-text-muted">&#x20B9;{goal.target.toLocaleString()}</span>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </motion.div>

        {/* ---- Apply Loan Dialog ---- */}
        <Dialog open={applyDialogOpen} onOpenChange={setApplyDialogOpen}>
          <DialogContent className="sm:max-w-[480px] rounded-2xl">
            <DialogHeader>
              <DialogTitle className="font-poppins text-xl">Apply for Loan</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <label className="text-sm font-medium text-text-primary mb-1.5 block">Loan Type</label>
                <Select defaultValue={selectedLoan || 'kcc'}>
                  <SelectTrigger className="h-12 rounded-xl border-border-light">
                    <SelectValue placeholder="Select loan type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kcc">Kisan Credit Card</SelectItem>
                    <SelectItem value="personal">Personal Loan</SelectItem>
                    <SelectItem value="equipment">Equipment Loan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-text-primary mb-1.5 block">Amount Needed (&#x20B9;)</label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={applyAmount}
                  onChange={(e) => setApplyAmount(e.target.value)}
                  className="h-12 rounded-xl border-border-light"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-text-primary mb-1.5 block">Purpose</label>
                <Select>
                  <SelectTrigger className="h-12 rounded-xl border-border-light">
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seeds">Seeds & Fertilizer</SelectItem>
                    <SelectItem value="equipment">Farm Equipment</SelectItem>
                    <SelectItem value="irrigation">Irrigation</SelectItem>
                    <SelectItem value="labor">Labor Wages</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-start gap-2 text-xs text-text-secondary bg-bg-primary p-3 rounded-xl">
                <Info className="w-4 h-4 shrink-0 text-krishiva-green" />
                <span>You will need to upload KYC documents, land records, and bank statements for verification.</span>
              </div>
              <Button className="w-full bg-krishiva-green hover:bg-[#1B5E20] text-white h-12 rounded-xl">
                Submit Application
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
