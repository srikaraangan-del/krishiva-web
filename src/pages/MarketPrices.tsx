import { useState, useMemo } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Search,
  MapPin,
  Filter,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  Wheat,
  BarChart3,
  Calendar,
  Info,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

/* ──────────────────────────── types ──────────────────────────── */

interface PriceSummary {
  crop: string;
  price: number;
  trend: 'up' | 'down';
  change: string;
  changeValue: number;
  bgColor: string;
}

interface PriceRow {
  id: string;
  crop: string;
  market: string;
  state: string;
  price: number;
  change: number;
  changePercent: string;
  trend: 'up' | 'down';
  insight: string;
}

interface TrendDay {
  day: string;
  price: number;
}

/* ──────────────────────────── mock data ──────────────────────────── */

const PRICE_SUMMARIES: PriceSummary[] = [
  { crop: 'Cotton', price: 6420, trend: 'up', change: '3.2%', changeValue: 3.2, bgColor: 'bg-blue-50 border-blue-200' },
  { crop: 'Chili', price: 12800, trend: 'up', change: '5.1%', changeValue: 5.1, bgColor: 'bg-red-50 border-red-200' },
  { crop: 'Tomato', price: 2400, trend: 'down', change: '2.8%', changeValue: -2.8, bgColor: 'bg-green-50 border-green-200' },
  { crop: 'Paddy', price: 2040, trend: 'up', change: '0.5%', changeValue: 0.5, bgColor: 'bg-yellow-50 border-yellow-200' },
  { crop: 'Onion', price: 3200, trend: 'up', change: '4.2%', changeValue: 4.2, bgColor: 'bg-purple-50 border-purple-200' },
  { crop: 'Turmeric', price: 7800, trend: 'down', change: '1.5%', changeValue: -1.5, bgColor: 'bg-orange-50 border-orange-200' },
];

const ALL_PRICE_ROWS: PriceRow[] = [
  // Cotton
  { id: 'R1', crop: 'Cotton', market: 'Guntur', state: 'Andhra Pradesh', price: 6420, change: 200, changePercent: '+3.2%', trend: 'up', insight: 'Prices rising due to export demand' },
  { id: 'R2', crop: 'Cotton', market: 'Vijayawada', state: 'Andhra Pradesh', price: 6350, change: 150, changePercent: '+2.4%', trend: 'up', insight: 'Stable market' },
  { id: 'R3', crop: 'Cotton', market: 'Nizamabad', state: 'Telangana', price: 6380, change: 180, changePercent: '+2.9%', trend: 'up', insight: 'Good demand from mills' },
  { id: 'R4', crop: 'Cotton', market: 'Warangal', state: 'Telangana', price: 6300, change: 120, changePercent: '+1.9%', trend: 'up', insight: 'Slight correction expected' },
  { id: 'R5', crop: 'Cotton', market: 'Adoni', state: 'Andhra Pradesh', price: 6280, change: 90, changePercent: '+1.5%', trend: 'up', insight: 'Normal seasonal trend' },
  { id: 'R6', crop: 'Cotton', market: 'Raichur', state: 'Karnataka', price: 6240, change: 60, changePercent: '+1.0%', trend: 'up', insight: 'Stable supply' },
  // Chili
  { id: 'R7', crop: 'Chili', market: 'Guntur', state: 'Andhra Pradesh', price: 12800, change: 620, changePercent: '+5.1%', trend: 'up', insight: 'Strong export demand' },
  { id: 'R8', crop: 'Chili', market: 'Warangal', state: 'Telangana', price: 13100, change: 740, changePercent: '+6.0%', trend: 'up', insight: 'Prices rising due to limited supply' },
  { id: 'R9', crop: 'Chili', market: 'Khammam', state: 'Telangana', price: 12600, change: 480, changePercent: '+4.0%', trend: 'up', insight: 'Good quality arrivals' },
  { id: 'R10', crop: 'Chili', market: 'Byadgi', state: 'Karnataka', price: 12500, change: 350, changePercent: '+2.9%', trend: 'up', insight: 'Steady demand' },
  { id: 'R11', crop: 'Chili', market: 'Nandyal', state: 'Andhra Pradesh', price: 12700, change: 550, changePercent: '+4.5%', trend: 'up', insight: 'Premium variety in demand' },
  // Tomato
  { id: 'R12', crop: 'Tomato', market: 'Hyderabad', state: 'Telangana', price: 2400, change: -70, changePercent: '-2.8%', trend: 'down', insight: 'Increased arrivals' },
  { id: 'R13', crop: 'Tomato', market: 'Visakhapatnam', state: 'Andhra Pradesh', price: 2350, change: -90, changePercent: '-3.7%', trend: 'down', insight: 'Higher supply from farms' },
  { id: 'R14', crop: 'Tomato', market: 'Kurnool', state: 'Andhra Pradesh', price: 2450, change: -40, changePercent: '-1.6%', trend: 'down', insight: 'Slight correction' },
  { id: 'R15', crop: 'Tomato', market: 'Solapur', state: 'Maharashtra', price: 2500, change: -20, changePercent: '-0.8%', trend: 'down', insight: 'Stable market conditions' },
  { id: 'R16', crop: 'Tomato', market: 'Madanapalle', state: 'Andhra Pradesh', price: 2380, change: -80, changePercent: '-3.3%', trend: 'down', insight: 'Seasonal glut expected' },
  // Paddy
  { id: 'R17', crop: 'Paddy', market: 'Karimnagar', state: 'Telangana', price: 2040, change: 10, changePercent: '+0.5%', trend: 'up', insight: 'MSP support active' },
  { id: 'R18', crop: 'Paddy', market: 'East Godavari', state: 'Andhra Pradesh', price: 2030, change: 5, changePercent: '+0.2%', trend: 'up', insight: 'Government procurement ongoing' },
  { id: 'R19', crop: 'Paddy', market: 'Nellore', state: 'Andhra Pradesh', price: 2050, change: 15, changePercent: '+0.7%', trend: 'up', insight: 'Stable market' },
  { id: 'R20', crop: 'Paddy', market: 'Warangal', state: 'Telangana', price: 2025, change: -5, changePercent: '-0.2%', trend: 'down', insight: 'Ample supply' },
  // Onion
  { id: 'R21', crop: 'Onion', market: 'Hyderabad', state: 'Telangana', price: 3200, change: 130, changePercent: '+4.2%', trend: 'up', insight: 'Reduced arrivals' },
  { id: 'R22', crop: 'Onion', market: 'Nashik', state: 'Maharashtra', price: 3100, change: 100, changePercent: '+3.3%', trend: 'up', insight: 'Export demand rising' },
  { id: 'R23', crop: 'Onion', market: 'Kurnool', state: 'Andhra Pradesh', price: 3150, change: 120, changePercent: '+4.0%', trend: 'up', insight: 'Limited supply' },
  // Turmeric
  { id: 'R24', crop: 'Turmeric', market: 'Nizamabad', state: 'Telangana', price: 7800, change: -120, changePercent: '-1.5%', trend: 'down', insight: 'Higher arrivals expected' },
  { id: 'R25', crop: 'Turmeric', market: 'Erode', state: 'Tamil Nadu', price: 7900, change: -80, changePercent: '-1.0%', trend: 'down', insight: 'Stable demand' },
  { id: 'R26', crop: 'Turmeric', market: 'Sangli', state: 'Maharashtra', price: 7750, change: -150, changePercent: '-1.9%', trend: 'down', insight: 'Slight correction expected' },
];

const TREND_CHARTS: Record<string, TrendDay[]> = {
  Cotton: [
    { day: 'Mon', price: 5940 },
    { day: 'Tue', price: 6080 },
    { day: 'Wed', price: 6150 },
    { day: 'Thu', price: 6210 },
    { day: 'Fri', price: 6280 },
    { day: 'Sat', price: 6350 },
    { day: 'Sun', price: 6420 },
  ],
  Chili: [
    { day: 'Mon', price: 12180 },
    { day: 'Tue', price: 12300 },
    { day: 'Wed', price: 12450 },
    { day: 'Thu', price: 12580 },
    { day: 'Fri', price: 12650 },
    { day: 'Sat', price: 12720 },
    { day: 'Sun', price: 12800 },
  ],
  Tomato: [
    { day: 'Mon', price: 2470 },
    { day: 'Tue', price: 2460 },
    { day: 'Wed', price: 2440 },
    { day: 'Thu', price: 2420 },
    { day: 'Fri', price: 2410 },
    { day: 'Sat', price: 2410 },
    { day: 'Sun', price: 2400 },
  ],
  Paddy: [
    { day: 'Mon', price: 2030 },
    { day: 'Tue', price: 2032 },
    { day: 'Wed', price: 2035 },
    { day: 'Thu', price: 2036 },
    { day: 'Fri', price: 2038 },
    { day: 'Sat', price: 2039 },
    { day: 'Sun', price: 2040 },
  ],
  Onion: [
    { day: 'Mon', price: 3070 },
    { day: 'Tue', price: 3095 },
    { day: 'Wed', price: 3120 },
    { day: 'Thu', price: 3145 },
    { day: 'Fri', price: 3160 },
    { day: 'Sat', price: 3180 },
    { day: 'Sun', price: 3200 },
  ],
  Turmeric: [
    { day: 'Mon', price: 7920 },
    { day: 'Tue', price: 7900 },
    { day: 'Wed', price: 7880 },
    { day: 'Thu', price: 7860 },
    { day: 'Fri', price: 7840 },
    { day: 'Sat', price: 7820 },
    { day: 'Sun', price: 7800 },
  ],
};

const CROP_TABS = ['All Crops', 'Cotton', 'Chili', 'Tomato', 'Paddy', 'Onion', 'Turmeric'];
const LOCATIONS = ['All', 'Andhra Pradesh', 'Telangana', 'Karnataka', 'Maharashtra'];
const DATE_RANGES = ['Today', '1 Week', '1 Month', '3 Months'];

/* ──────────────────────────── animations ──────────────────────────── */

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.04, duration: 0.35, ease: [0, 0, 0.2, 1] as [number, number, number, number] },
  }),
};

/* ──────────────────────────── helpers ──────────────────────────── */

function TrendInsight({ crop }: { crop: string }) {
  const insights: Record<string, string> = {
    Cotton: 'Cotton prices have increased 8% over the last 7 days due to strong demand from textile mills.',
    Chili: 'Chili prices are surging on the back of strong export demand from Southeast Asian markets.',
    Tomato: 'Tomato prices have declined 3% due to increased arrivals from freshly harvested crops.',
    Paddy: 'Paddy prices remain stable with government MSP providing strong price floor support.',
    Onion: 'Onion prices are rising as supply tightens before the new harvest season.',
    Turmeric: 'Turmeric prices seeing a slight correction after a sustained rally over the past month.',
  };

  return (
    <div className="flex items-start gap-2 p-4 bg-bg-primary rounded-xl">
      <Info className="w-4 h-4 text-text-muted mt-0.5 shrink-0" />
      <p className="text-sm text-text-secondary">{insights[crop] || 'Market conditions are stable.'}</p>
    </div>
  );
}

function SimpleBarChart({ data, crop }: { data: TrendDay[]; crop: string }) {
  const maxPrice = Math.max(...data.map((d) => d.price));
  const minPrice = Math.min(...data.map((d) => d.price));
  const range = maxPrice - minPrice || 1;

  const barColor =
    data[data.length - 1].price >= data[0].price ? 'bg-krishiva-green' : 'bg-error-red';

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-2 h-[200px]">
        {data.map((day, i) => {
          const heightPercent = ((day.price - minPrice) / range) * 70 + 30;
          return (
            <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-semibold text-text-primary">
                ₹{(day.price / 1000).toFixed(1)}k
              </span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${heightPercent}%` }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
                className={`w-full max-w-[48px] rounded-t-lg ${barColor} opacity-80 hover:opacity-100 transition-opacity cursor-pointer`}
                style={{ minHeight: '20px' }}
              />
              <span className="text-xs text-text-muted font-medium">{day.day}</span>
            </div>
          );
        })}
      </div>
      <TrendInsight crop={crop} />
    </div>
  );
}

/* ──────────────────────────── main page ──────────────────────────── */

export default function MarketPrices() {
  const [activeTab, setActiveTab] = useState('All Crops');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');
  const [dateRange, setDateRange] = useState('Today');
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);

  const filteredRows = useMemo(() => {
    let rows = ALL_PRICE_ROWS;

    if (activeTab !== 'All Crops') {
      rows = rows.filter((r) => r.crop === activeTab);
    }

    if (locationFilter !== 'All') {
      rows = rows.filter((r) => r.state === locationFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.crop.toLowerCase().includes(q) ||
          r.market.toLowerCase().includes(q) ||
          r.state.toLowerCase().includes(q)
      );
    }

    return rows;
  }, [activeTab, locationFilter, searchQuery]);

  const handleRowClick = (crop: string) => {
    setSelectedCrop((prev) => (prev === crop ? null : crop));
  };

  return (
    <DashboardLayout>
      <div className="max-w-[1200px] mx-auto space-y-6 pb-8">
        {/* Top Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row sm:items-center gap-4"
        >
          <div className="flex-1">
            <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-text-primary mb-1">
              Market Prices
            </h1>
            <p className="text-text-secondary text-sm">
              Real-time mandi prices across India. Track trends and make informed decisions.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <Input
                placeholder="Search crop or market..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 w-[220px] rounded-xl border-border-light pl-10"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted z-10" />
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="h-11 w-[180px] rounded-xl border border-border-light bg-white pl-10 pr-8 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-krishiva-green/20 appearance-none cursor-pointer"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc === 'All' ? 'All Locations' : loc}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
            </div>
          </div>
        </motion.div>

        {/* Price Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
            {PRICE_SUMMARIES.map((item, i) => (
              <motion.div
                key={item.crop}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                onClick={() => setActiveTab(item.crop)}
                className={`min-w-[160px] rounded-xl px-4 py-4 border shadow-sm flex-shrink-0 cursor-pointer transition-all hover:shadow-md ${item.bgColor}`}
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <Wheat className="w-3.5 h-3.5 text-krishiva-green" />
                  <span className="text-sm font-semibold text-text-primary">{item.crop}</span>
                </div>
                <div className="text-lg font-bold text-text-primary">
                  ₹{item.price.toLocaleString('en-IN')}/q
                </div>
                <div
                  className={`flex items-center gap-0.5 text-xs font-medium mt-1 ${
                    item.trend === 'up' ? 'text-success-green' : 'text-error-red'
                  }`}
                >
                  {item.trend === 'up' ? (
                    <ArrowUp className="w-3 h-3" />
                  ) : (
                    <ArrowDown className="w-3 h-3" />
                  )}
                  {item.change}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Filter Options */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col sm:flex-row gap-3 items-start sm:items-center"
        >
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Filter className="w-4 h-4" />
            <span className="font-medium">Filters:</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {DATE_RANGES.map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  dateRange === range
                    ? 'bg-krishiva-green text-white'
                    : 'bg-white border border-border-light text-text-secondary hover:text-text-primary'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Calendar className="w-4 h-4 text-text-muted" />
            <span className="text-xs text-text-muted">Last updated: Today, 10:30 AM</span>
          </div>
        </motion.div>

        {/* Crop Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-1 bg-white rounded-xl border border-border-light p-1 overflow-x-auto"
        >
          {CROP_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSelectedCrop(null);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-krishiva-green text-white shadow-button'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Location-wise Price Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card className="border-border-light shadow-card overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 sm:p-5 border-b border-border-light flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-krishiva-green" />
                <h3 className="font-poppins font-semibold text-heading-sm text-text-primary">
                  Location-wise Prices
                </h3>
                <span className="text-xs text-text-muted ml-2">
                  ({filteredRows.length} results)
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-bg-primary border-b border-border-light">
                      <th className="text-left text-xs font-semibold text-text-secondary uppercase tracking-wider px-4 py-3">
                        Crop
                      </th>
                      <th className="text-left text-xs font-semibold text-text-secondary uppercase tracking-wider px-4 py-3">
                        Market (Mandi)
                      </th>
                      <th className="text-right text-xs font-semibold text-text-secondary uppercase tracking-wider px-4 py-3">
                        Price (₹/q)
                      </th>
                      <th className="text-right text-xs font-semibold text-text-secondary uppercase tracking-wider px-4 py-3 hidden sm:table-cell">
                        Change (₹)
                      </th>
                      <th className="text-right text-xs font-semibold text-text-secondary uppercase tracking-wider px-4 py-3">
                        Trend
                      </th>
                      <th className="text-left text-xs font-semibold text-text-secondary uppercase tracking-wider px-4 py-3 hidden md:table-cell">
                        Insight
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence mode="wait">
                      {filteredRows.map((row, i) => (
                        <motion.tr
                          key={row.id}
                          custom={i}
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          onClick={() => handleRowClick(row.crop)}
                          className="border-b border-border-light last:border-0 hover:bg-bg-primary/50 cursor-pointer transition-colors"
                        >
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-krishiva-green/10 flex items-center justify-center">
                                <Wheat className="w-4 h-4 text-krishiva-green" />
                              </div>
                              <span className="font-semibold text-text-primary text-sm">{row.crop}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3.5">
                            <div>
                              <p className="font-medium text-text-primary text-sm">{row.market}</p>
                              <p className="text-xs text-text-muted flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {row.state}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-3.5 text-right">
                            <span className="font-bold text-text-primary">
                              ₹{row.price.toLocaleString('en-IN')}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-right hidden sm:table-cell">
                            <span
                              className={`text-sm font-medium ${
                                row.change >= 0 ? 'text-success-green' : 'text-error-red'
                              }`}
                            >
                              {row.change >= 0 ? '+' : ''}
                              {row.change.toLocaleString('en-IN')}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-right">
                            <div className="flex items-center justify-end gap-1">
                              {row.trend === 'up' ? (
                                <TrendingUp className="w-4 h-4 text-success-green" />
                              ) : (
                                <TrendingDown className="w-4 h-4 text-error-red" />
                              )}
                              <span
                                className={`text-xs font-semibold ${
                                  row.trend === 'up' ? 'text-success-green' : 'text-error-red'
                                }`}
                              >
                                {row.changePercent}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3.5 hidden md:table-cell">
                            <span className="text-xs text-text-secondary">{row.insight}</span>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>

              {filteredRows.length === 0 && (
                <div className="py-12 text-center">
                  <Search className="w-10 h-10 text-text-muted mx-auto mb-3" />
                  <p className="text-text-secondary font-medium">No results found</p>
                  <p className="text-text-muted text-sm mt-1">Try adjusting your filters</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Trend Chart Section */}
        <AnimatePresence>
          {selectedCrop && TREND_CHARTS[selectedCrop] && (
            <motion.div
              key={selectedCrop}
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: 20, height: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Card className="border-border-light shadow-card overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-krishiva-green" />
                      <h3 className="font-poppins font-semibold text-heading-sm text-text-primary">
                        {selectedCrop} — 7 Day Price Trend
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedCrop(null)}
                      className="text-xs text-text-muted hover:text-text-primary transition-colors"
                    >
                      Close
                    </button>
                  </div>
                  <SimpleBarChart data={TREND_CHARTS[selectedCrop]} crop={selectedCrop} />
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Stats Footer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {[
            { label: 'Active Markets', value: '26', icon: MapPin },
            { label: 'Crops Tracked', value: '6', icon: Wheat },
            { label: 'Price Alerts Set', value: '3', icon: TrendingUp },
            { label: 'Avg. Change', value: '+2.1%', icon: BarChart3 },
          ].map((stat) => (
            <Card key={stat.label} className="border-border-light shadow-card">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-krishiva-green/10 flex items-center justify-center shrink-0">
                  <stat.icon className="w-5 h-5 text-krishiva-green" />
                </div>
                <div>
                  <p className="text-lg font-bold text-text-primary">{stat.value}</p>
                  <p className="text-xs text-text-muted">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
