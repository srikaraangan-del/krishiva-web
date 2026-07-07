import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wallet,
  Plus,
  ArrowDownToLine,
  Send,
  QrCode,
  Eye,
  EyeOff,
  ArrowDownLeft,
  ArrowUpRight,
  Shield,
  CreditCard,
  Building2,
  Smartphone,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  ShieldAlert,
  IndianRupee,
  Tractor,
  Wheat,
  Users,
  MoreHorizontal,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import DashboardLayout from '@/components/DashboardLayout';

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const transactions = [
  {
    id: 1,
    title: 'Received from Raju',
    description: 'Tomato sale payment',
    amount: 2000,
    type: 'received' as const,
    date: '10 Jun 2025',
    category: 'Marketplace',
    icon: Wheat,
  },
  {
    id: 2,
    title: 'Sent to Tractor Owner',
    description: 'Tractor rental — 2 days',
    amount: 1500,
    type: 'sent' as const,
    date: '9 Jun 2025',
    category: 'Machinery',
    icon: Tractor,
  },
  {
    id: 3,
    title: 'Escrow: Chili purchase',
    description: 'Payment held in escrow',
    amount: 5000,
    type: 'escrow' as const,
    date: '8 Jun 2025',
    category: 'Escrow',
    status: 'Pending',
    icon: Shield,
  },
  {
    id: 4,
    title: 'Received from FreshMart',
    description: 'Wheat — 50kg sale',
    amount: 2500,
    type: 'received' as const,
    date: '8 Jun 2025',
    category: 'Marketplace',
    icon: Wheat,
  },
  {
    id: 5,
    title: 'Sent to Ramesh Yadav',
    description: 'Labor payment — weekly',
    amount: 1200,
    type: 'sent' as const,
    date: '7 Jun 2025',
    category: 'Labor',
    icon: Users,
  },
  {
    id: 6,
    title: 'Refund received',
    description: 'Cancelled drone booking',
    amount: 500,
    type: 'received' as const,
    date: '6 Jun 2025',
    category: 'Refund',
    icon: IndianRupee,
  },
  {
    id: 7,
    title: 'Added Money',
    description: 'From SBI ****4521',
    amount: 1500,
    type: 'received' as const,
    date: '5 Jun 2025',
    category: 'Top-up',
    icon: Building2,
  },
];

const escrowDeals = [
  {
    id: 'ESC-284756',
    title: 'Chili Sale',
    type: 'Produce Sale',
    party: 'FreshMart Pvt Ltd',
    amount: 5000,
    status: 'Awaiting Delivery',
    progress: 60,
    currentStep: 3,
    totalSteps: 5,
    steps: ['Order Placed', 'Payment Confirmed', 'Awaiting Delivery', 'Confirm Receipt', 'Release Payment'],
  },
  {
    id: 'ESC-284757',
    title: 'Labor Booking',
    type: 'Labor Contract',
    party: 'Suresh Yadav',
    amount: 1200,
    status: 'Work Completed',
    progress: 80,
    currentStep: 4,
    totalSteps: 5,
    steps: ['Booking Placed', 'Payment Confirmed', 'Work Started', 'Work Completed', 'Release Payment'],
  },
];

const paymentMethods = [
  { id: 1, type: 'upi', name: 'ramu@okaxis', label: 'UPI', default: true },
  { id: 2, type: 'upi', name: 'rajesh@okicici', label: 'UPI', default: false },
  { id: 3, type: 'card', name: '**** 4242', label: 'Visa Debit Card', default: false, expiry: '09/27' },
  { id: 4, type: 'bank', name: 'SBI — Savings', label: 'Bank Account', default: false, account: '****4521', ifsc: 'SBIN0001234' },
];

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
/* ------------------------------------------------------------------ */


/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function WalletPage() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('transactions');
  const [txFilter, setTxFilter] = useState('all');
  const [addMoneyOpen, setAddMoneyOpen] = useState(false);
  const [addAmount, setAddAmount] = useState('');
  const [disputeOpen, setDisputeOpen] = useState(false);
  const [selectedEscrow, setSelectedEscrow] = useState<string>('');

  const filteredTransactions = transactions.filter((tx) => {
    if (txFilter === 'all') return true;
    if (txFilter === 'received') return tx.type === 'received';
    if (txFilter === 'sent') return tx.type === 'sent';
    if (txFilter === 'escrow') return tx.type === 'escrow';
    return true;
  });

  const escrowAmount = 8200;
  const available = 16300;
  const lifetimeEarned = 145000;

  const quickActions = [
    { label: 'Add Money', icon: Plus, color: 'bg-krishiva-green', action: () => setAddMoneyOpen(true) },
    { label: 'Withdraw', icon: ArrowDownToLine, color: 'bg-[#3B82F6]' },
    { label: 'Send', icon: Send, color: 'bg-harvest-gold' },
    { label: 'Scan & Pay', icon: QrCode, color: 'bg-[#8B5CF6]' },
  ];

  const handleDisputeClick = (escrowId: string) => {
    setSelectedEscrow(escrowId);
    setDisputeOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="max-w-[1200px] mx-auto space-y-6 pb-6">
        {/* ---- Balance Overview Card ---- */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="hero-gradient text-white border-0 shadow-[0_8px_24px_rgba(46,125,50,0.25)] rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-72 h-72 bg-white rounded-full -translate-y-1/3 translate-x-1/4" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/3 -translate-x-1/4" />
            </div>
            <CardContent className="p-6 sm:p-8 relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Wallet className="w-7 h-7 text-white" />
                  <h2 className="font-poppins font-semibold text-xl text-white">My Wallet</h2>
                </div>
                <button
                  onClick={() => setBalanceVisible(!balanceVisible)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {balanceVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Balance Columns */}
              <div className="grid sm:grid-cols-3 gap-6">
                {/* Available */}
                <div>
                  <p className="text-white/70 text-sm mb-1">Available</p>
                  <p className="font-poppins font-bold text-3xl sm:text-4xl">
                    {balanceVisible ? `\u20B9${available.toLocaleString()}` : '\u20B9\u2022\u2022\u2022\u2022'}
                  </p>
                  <p className="text-white/60 text-xs mt-1">Ready to use</p>
                </div>

                {/* Escrow */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white/70 text-sm">In Escrow</p>
                    <div className="group relative">
                      <Shield className="w-3.5 h-3.5 text-white/50 cursor-help" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-text-primary text-white text-[11px] rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                        Money held securely until deal is complete
                      </div>
                    </div>
                  </div>
                  <p className="font-poppins font-bold text-3xl sm:text-4xl">
                    {balanceVisible ? `\u20B9${escrowAmount.toLocaleString()}` : '\u20B9\u2022\u2022\u2022\u2022'}
                  </p>
                  <p className="text-white/60 text-xs mt-1">3 active deals</p>
                </div>

                {/* Lifetime */}
                <div>
                  <p className="text-white/70 text-sm mb-1">Lifetime</p>
                  <p className="font-poppins font-bold text-3xl sm:text-4xl">
                    {balanceVisible ? `\u20B9${lifetimeEarned.toLocaleString()}` : '\u20B9\u2022\u2022\u2022\u2022'}
                  </p>
                  <p className="text-white/60 text-xs mt-1">Since Jan 2025</p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/20 my-5" />

              {/* Recent Activity */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Recent: +&#x20B9;2,500 from tomato sale</p>
                  <p className="text-white/50 text-[11px]">2 hours ago</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/30 text-white bg-transparent hover:bg-white/10 rounded-xl text-xs"
                  onClick={() => setActiveTab('transactions')}
                >
                  View All
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ---- Quick Actions ---- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="grid grid-cols-4 gap-3"
        >
          {quickActions.map((action, i) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.06, duration: 0.3 }}
              whileTap={{ scale: 0.95 }}
              onClick={action.action}
              className="flex flex-col items-center gap-2 p-4 sm:p-5 bg-white border border-border-light rounded-2xl hover:border-border-green hover:bg-krishiva-green/5 transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center shadow-md`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-[11px] sm:text-xs font-medium text-text-secondary group-hover:text-krishiva-green transition-colors">{action.label}</span>
            </motion.button>
          ))}
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
                { value: 'transactions', label: 'Transactions', icon: IndianRupee },
                { value: 'escrow', label: 'Escrow', icon: Shield },
                { value: 'payment-methods', label: 'Payment Methods', icon: CreditCard },
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
              {/* ====== TRANSACTIONS TAB ====== */}
              <TabsContent value="transactions" className="space-y-4 mt-0">
                <motion.div
                  key="transactions"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Filter */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {[
                      { value: 'all', label: 'All' },
                      { value: 'received', label: 'Received' },
                      { value: 'sent', label: 'Sent' },
                      { value: 'escrow', label: 'Escrow' },
                    ].map((filter) => (
                      <button
                        key={filter.value}
                        onClick={() => setTxFilter(filter.value)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          txFilter === filter.value
                            ? 'bg-krishiva-green text-white'
                            : 'bg-white border border-border-light text-text-secondary hover:border-border-green'
                        }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>

                  {/* Transaction List */}
                  <Card className="border-border-light shadow-card">
                    <CardContent className="p-0">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={txFilter}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {filteredTransactions.map((tx, i) => (
                            <motion.div
                              key={tx.id}
                              initial={{ opacity: 0, x: -15 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.04, duration: 0.25 }}
                              className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3.5 border-b border-border-light last:border-0 hover:bg-bg-primary/50 transition-colors cursor-pointer"
                            >
                              {/* Icon */}
                              <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                                tx.type === 'received' ? 'bg-success-green/15' :
                                tx.type === 'sent' ? 'bg-error-red/15' :
                                'bg-harvest-gold/15'
                              }`}>
                                {tx.type === 'received' && <ArrowDownLeft className="w-5 h-5 text-success-green" />}
                                {tx.type === 'sent' && <ArrowUpRight className="w-5 h-5 text-error-red" />}
                                {tx.type === 'escrow' && <Shield className="w-5 h-5 text-harvest-gold" />}
                              </div>

                              {/* Details */}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-text-primary truncate">{tx.title}</p>
                                <p className="text-xs text-text-muted">{tx.description}</p>
                                <Badge variant="outline" className="text-[10px] mt-1 h-5 px-1.5">{tx.category}</Badge>
                              </div>

                              {/* Amount */}
                              <div className="text-right shrink-0">
                                <p className={`text-sm font-semibold ${
                                  tx.type === 'received' ? 'text-success-green' :
                                  tx.type === 'sent' ? 'text-error-red' :
                                  'text-harvest-gold'
                                }`}>
                                  {tx.type === 'received' ? '+' : tx.type === 'sent' ? '-' : ''}
                                  &#x20B9;{tx.amount.toLocaleString()}
                                </p>
                                <p className="text-[11px] text-text-muted">{tx.date}</p>
                                {tx.type === 'escrow' && (
                                  <Badge className="bg-warning-amber text-white text-[10px] h-5 mt-0.5 hover:bg-warning-amber">{tx.status}</Badge>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* ====== ESCROW TAB ====== */}
              <TabsContent value="escrow" className="space-y-4 mt-0">
                <motion.div
                  key="escrow"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {escrowDeals.map((deal, i) => (
                    <motion.div
                      key={deal.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                    >
                      <Card className="border-border-light shadow-card relative overflow-hidden">
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                          deal.status === 'Work Completed' ? 'bg-success-green' : 'bg-warning-amber'
                        }`} />
                        <CardContent className="p-5">
                          {/* Header */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <p className="text-[11px] text-text-muted font-mono">{deal.id}</p>
                                <Badge className={`text-[10px] h-5 ${
                                  deal.status === 'Work Completed'
                                    ? 'bg-success-green text-white hover:bg-success-green'
                                    : 'bg-warning-amber text-white hover:bg-warning-amber'
                                }`}>
                                  {deal.status}
                                </Badge>
                              </div>
                              <p className="font-poppins font-semibold text-base text-text-primary">{deal.title}</p>
                              <p className="text-xs text-text-secondary">With: {deal.party}</p>
                            </div>
                            <div className="text-left sm:text-right">
                              <p className="font-poppins font-semibold text-lg text-text-primary">&#x20B9;{deal.amount.toLocaleString()}</p>
                              <p className="text-xs text-text-muted">held in escrow</p>
                            </div>
                          </div>

                          {/* Progress Steps */}
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              {deal.steps.map((step, idx) => (
                                <div key={step} className="flex flex-col items-center flex-1 relative">
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                    idx < deal.currentStep
                                      ? 'bg-success-green text-white'
                                      : idx === deal.currentStep
                                      ? 'bg-warning-amber text-white'
                                      : 'bg-gray-200 text-text-muted'
                                  }`}>
                                    {idx < deal.currentStep ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                                  </div>
                                  <span className={`text-[9px] mt-1 text-center leading-tight hidden sm:block ${
                                    idx <= deal.currentStep ? 'text-text-secondary' : 'text-text-muted'
                                  }`}>
                                    {step}
                                  </span>
                                  {idx < deal.steps.length - 1 && (
                                    <div className={`absolute top-3 left-1/2 w-full h-0.5 ${
                                      idx < deal.currentStep ? 'bg-success-green' : 'bg-gray-200'
                                    }`} />
                                  )}
                                </div>
                              ))}
                            </div>
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mt-2">
                              <motion.div
                                className="h-full bg-krishiva-green rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${deal.progress}%` }}
                                transition={{ duration: 0.8, ease: 'easeOut', delay: i * 0.1 }}
                              />
                            </div>
                            <p className="text-[11px] text-text-muted mt-1">{deal.progress}% complete — {deal.currentStep + 1} of {deal.totalSteps} steps</p>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-wrap items-center gap-3">
                            {deal.status === 'Work Completed' && (
                              <Button className="bg-krishiva-green hover:bg-[#1B5E20] text-white rounded-xl text-sm">
                                <CheckCircle2 className="w-4 h-4 mr-1.5" />
                                Release Payment
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-error-red hover:text-error-red hover:bg-error-red/5 text-xs"
                              onClick={() => handleDisputeClick(deal.id)}
                            >
                              <ShieldAlert className="w-3.5 h-3.5 mr-1" />
                              Raise a Dispute
                            </Button>
                            <Button variant="ghost" size="sm" className="text-text-secondary text-xs ml-auto">
                              View Details <ChevronRight className="w-3 h-3 ml-0.5" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}

                  {/* Info Card */}
                  <Card className="border-border-light shadow-card bg-bg-primary border-dashed">
                    <CardContent className="p-4 flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-krishiva-green shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-text-primary">Escrow Protection</p>
                        <p className="text-xs text-text-secondary mt-0.5">Your money is held securely until both parties confirm the deal is complete. If there&apos;s any issue, you can raise a dispute within 7 days.</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* ====== PAYMENT METHODS TAB ====== */}
              <TabsContent value="payment-methods" className="space-y-4 mt-0">
                <motion.div
                  key="payment-methods"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-3">
                    {paymentMethods.map((method, i) => (
                      <motion.div
                        key={method.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.25 }}
                      >
                        <Card className="border-border-light shadow-card hover:shadow-card-hover transition-all">
                          <CardContent className="p-4 flex items-center gap-4">
                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                              method.type === 'upi' ? 'bg-[#8B5CF6]/10' :
                              method.type === 'card' ? 'bg-[#3B82F6]/10' :
                              'bg-krishiva-green/10'
                            }`}>
                              {method.type === 'upi' && <Smartphone className="w-5 h-5 text-[#8B5CF6]" />}
                              {method.type === 'card' && <CreditCard className="w-5 h-5 text-[#3B82F6]" />}
                              {method.type === 'bank' && <Building2 className="w-5 h-5 text-krishiva-green" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-medium text-text-primary">{method.name}</p>
                                {method.default && (
                                  <Badge className="bg-success-green text-white text-[10px] h-5 hover:bg-success-green">Default</Badge>
                                )}
                              </div>
                              <p className="text-xs text-text-muted">{method.label}</p>
                              {method.type === 'card' && method.expiry && (
                                <p className="text-xs text-text-muted">Exp: {method.expiry}</p>
                              )}
                              {method.type === 'bank' && method.ifsc && (
                                <p className="text-xs text-text-muted">{method.ifsc}</p>
                              )}
                            </div>
                            <Button variant="ghost" size="sm" className="text-text-muted hover:text-text-primary shrink-0">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  {/* Add New */}
                  <div className="flex flex-wrap gap-3 mt-4">
                    <Button variant="outline" className="border-krishiva-green text-krishiva-green hover:bg-krishiva-green/5 rounded-xl text-sm">
                      <Plus className="w-4 h-4 mr-1.5" /> Add UPI ID
                    </Button>
                    <Button variant="outline" className="border-krishiva-green text-krishiva-green hover:bg-krishiva-green/5 rounded-xl text-sm">
                      <Plus className="w-4 h-4 mr-1.5" /> Add Bank Account
                    </Button>
                    <Button variant="outline" className="border-krishiva-green text-krishiva-green hover:bg-krishiva-green/5 rounded-xl text-sm">
                      <Plus className="w-4 h-4 mr-1.5" /> Add Debit Card
                    </Button>
                  </div>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </motion.div>

        {/* ---- Add Money Dialog ---- */}
        <Dialog open={addMoneyOpen} onOpenChange={setAddMoneyOpen}>
          <DialogContent className="sm:max-w-[440px] rounded-2xl">
            <DialogHeader>
              <DialogTitle className="font-poppins text-xl flex items-center gap-2">
                <Plus className="w-5 h-5 text-krishiva-green" /> Add Money
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <label className="text-sm font-medium text-text-primary mb-1.5 block">Enter Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-lg">&#x20B9;</span>
                  <Input
                    type="number"
                    placeholder="0"
                    value={addAmount}
                    onChange={(e) => setAddAmount(e.target.value)}
                    className="h-14 rounded-xl border-border-light pl-10 text-lg font-semibold"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {[500, 1000, 2000, 5000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setAddAmount(amt.toString())}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                      addAmount === amt.toString()
                        ? 'bg-krishiva-green text-white border-krishiva-green'
                        : 'bg-white text-text-secondary border-border-light hover:border-border-green'
                    }`}
                  >
                    &#x20B9;{amt.toLocaleString()}
                  </button>
                ))}
              </div>
              <div>
                <label className="text-sm font-medium text-text-primary mb-1.5 block">Payment Method</label>
                <div className="space-y-2">
                  {[
                    { id: 'upi', label: 'UPI', desc: 'Instant via any UPI app' },
                    { id: 'card', label: 'Debit Card', desc: '**** 4242' },
                    { id: 'netbanking', label: 'Net Banking', desc: 'SBI — ****4521' },
                  ].map((method) => (
                    <div key={method.id} className="flex items-center gap-3 p-3 rounded-xl border border-border-light hover:border-border-green cursor-pointer transition-colors">
                      <div className="w-5 h-5 rounded-full border-2 border-krishiva-green flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-krishiva-green" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">{method.label}</p>
                        <p className="text-xs text-text-muted">{method.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Button
                className="w-full bg-krishiva-green hover:bg-[#1B5E20] text-white h-12 rounded-xl"
                disabled={!addAmount}
              >
                Add &#x20B9;{addAmount ? parseInt(addAmount).toLocaleString() : '0'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* ---- Dispute Dialog ---- */}
        <Dialog open={disputeOpen} onOpenChange={setDisputeOpen}>
          <DialogContent className="sm:max-w-[440px] rounded-2xl">
            <DialogHeader>
              <DialogTitle className="font-poppins text-xl flex items-center gap-2 text-error-red">
                <ShieldAlert className="w-5 h-5" /> Raise a Dispute
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-2 text-xs text-text-secondary bg-error-red/5 p-3 rounded-xl">
                <AlertTriangle className="w-4 h-4 text-error-red shrink-0 mt-0.5" />
                <span>Only raise a dispute if there is a genuine issue with the transaction. False disputes may affect your trust score.</span>
              </div>
              <div>
                <label className="text-sm font-medium text-text-primary mb-1.5 block">Escrow ID</label>
                <Input value={selectedEscrow} readOnly className="h-12 rounded-xl border-border-light bg-bg-primary" />
              </div>
              <div>
                <label className="text-sm font-medium text-text-primary mb-1.5 block">Reason</label>
                <div className="space-y-2">
                  {['Item not delivered', 'Quality issue', 'Wrong item received', 'Payment not released', 'Other'].map((reason) => (
                    <div key={reason} className="flex items-center gap-3 p-2.5 rounded-xl border border-border-light hover:border-border-green cursor-pointer transition-colors">
                      <div className="w-4 h-4 rounded-full border-2 border-border-light flex items-center justify-center" />
                      <span className="text-sm text-text-secondary">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-text-primary mb-1.5 block">Description</label>
                <textarea
                  placeholder="Describe the issue in detail..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-border-light text-sm resize-none focus:outline-none focus:ring-2 focus:ring-krishiva-green/20 focus:border-krishiva-green"
                />
              </div>
              <Button className="w-full bg-error-red hover:bg-red-700 text-white h-12 rounded-xl">
                Submit Dispute
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
