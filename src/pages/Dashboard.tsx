import { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun, Cloud, CloudRain, Wind, Droplets, CloudLightning, CloudSnow, CloudFog,
  Eye, Sunrise, Sunset, Gauge, CloudDrizzle, TrendingUp, TrendingDown,
  Sprout, ExternalLink, Newspaper, Landmark, CreditCard,
  Users, GraduationCap, Wallet, Mic, Zap,
  CheckCircle2, MapPin, Shield, Star, Trash2, Plus,
  Bell, Globe, Check, Thermometer,
  ShoppingCart, Stethoscope, BarChart3, Tractor, HandshakeIcon,
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import DashboardLayout from '@/components/DashboardLayout';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface WeatherDay {
  date: string; tempMax: number; tempMin: number; precipitation: number;
  windSpeed: number; weatherCode: number; humidity: number; uvIndex: number;
  visibility: number; sunrise: string; sunset: string; pressure: number; dewPoint: number;
}

interface MandiPrice { commodity: string; price: number; change: number; unit: string; }

interface NewsItem {
  id: number; title: string; summary: string; category: string;
  date: string; image: string; externalUrl: string;
}

interface Scheme { name: string; description: string; url: string; icon: typeof Landmark; borderColor: string; bgColor: string; }

interface Crop { id: number; name: string; variety: string; area: string; status: string; progress: number; sowingDate: string; expectedHarvest: string; avgQuantity: string; }

interface Buyer { id: number; name: string; company: string; location: string; cropsInterested: string[]; rating: number; ordersCompleted: number; recentOrder: string; }

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const MANDI_PRICES: MandiPrice[] = [
  { commodity: 'Wheat', price: 2420, change: 12, unit: 'per quintal' },
  { commodity: 'Rice (Paddy)', price: 2180, change: -8, unit: 'per quintal' },
  { commodity: 'Maize', price: 1950, change: 25, unit: 'per quintal' },
  { commodity: 'Cotton', price: 7620, change: 45, unit: 'per quintal' },
  { commodity: 'Soybean', price: 4520, change: -15, unit: 'per quintal' },
  { commodity: 'Tomato', price: 1850, change: 120, unit: 'per quintal' },
  { commodity: 'Onion', price: 2200, change: -60, unit: 'per quintal' },
  { commodity: 'Potato', price: 1580, change: 8, unit: 'per quintal' },
  { commodity: 'Chilli', price: 8500, change: 200, unit: 'per quintal' },
  { commodity: 'Groundnut', price: 6200, change: 30, unit: 'per quintal' },
];

const NEWS_ITEMS: NewsItem[] = [
  { id: 1, title: 'Government Announces New MSP for Kharif Crops 2025', summary: 'Minimum Support Prices for paddy, cotton, and soybean increased by 5-8%', category: 'Government', date: '2 hours ago', image: '/news-msp.jpg', externalUrl: 'https://www.pib.gov.in/' },
  { id: 2, title: 'Weather Alert: Monsoon Expected to Arrive Early This Year', summary: 'IMD predicts normal to above-normal rainfall across major agricultural regions', category: 'Weather', date: '4 hours ago', image: '/news-weather.jpg', externalUrl: 'https://mausam.imd.gov.in/' },
  { id: 3, title: 'New Drone Technology for Pesticide Application', summary: 'Agricultural drones can now reduce pesticide usage by 30% while improving coverage', category: 'Technology', date: '6 hours ago', image: '/news-drone.jpg', externalUrl: 'https://www.india.gov.in/' },
  { id: 4, title: 'Wheat Prices Rise in Delhi Mandi Due to Export Demand', summary: 'Domestic wheat prices increased by 2% following new export opportunities', category: 'Market', date: '8 hours ago', image: '/news-wheat.jpg', externalUrl: 'https://agmarknet.gov.in/' },
  { id: 5, title: 'PM-KISAN 15th Installment Released', summary: 'Over 11 crore farmers received Rs 2,000 in their accounts', category: 'Government', date: '12 hours ago', image: '/news-pm.jpg', externalUrl: 'https://pmkisan.gov.in/' },
];

const SCHEMES: Scheme[] = [
  { name: 'PM-KISAN', description: 'Rs 6,000/year income support', url: 'https://pmkisan.gov.in/', icon: Landmark, borderColor: 'border-green-500', bgColor: 'bg-green-50' },
  { name: 'Soil Health Card', description: 'Free soil testing & recommendations', url: 'https://soilhealth.dac.gov.in/', icon: Sprout, borderColor: 'border-amber-500', bgColor: 'bg-amber-50' },
  { name: 'KCC', description: 'Crop loans at 7% interest', url: 'https://www.nabard.org/', icon: CreditCard, borderColor: 'border-blue-500', bgColor: 'bg-blue-50' },
  { name: 'e-NAM', description: 'Online mandi trading platform', url: 'https://enam.gov.in/', icon: TrendingUp, borderColor: 'border-purple-500', bgColor: 'bg-purple-50' },
  { name: 'MIDH', description: 'Horticulture development subsidy', url: 'https://midh.gov.in/', icon: Star, borderColor: 'border-rose-500', bgColor: 'bg-rose-50' },
  { name: 'PMFBY', description: 'Crop insurance @1.5-5% premium', url: 'https://pmfby.gov.in/', icon: Shield, borderColor: 'border-cyan-500', bgColor: 'bg-cyan-50' },
];

const INITIAL_CROPS: Crop[] = [
  { id: 1, name: 'Wheat', variety: 'HD-2967', area: '12 acres', status: 'Growing', progress: 65, sowingDate: '2025-11-15', expectedHarvest: '2026-03-20', avgQuantity: '180 quintals' },
  { id: 2, name: 'Rice', variety: 'Pusa Basmati', area: '8 acres', status: 'Sowing Soon', progress: 10, sowingDate: '2026-06-20', expectedHarvest: '2026-10-25', avgQuantity: '120 quintals' },
  { id: 3, name: 'Tomato', variety: 'Pusa Ruby', area: '5 acres', status: 'Harvesting', progress: 90, sowingDate: '2025-08-10', expectedHarvest: '2026-01-15', avgQuantity: '200 quintals' },
];

const INITIAL_BUYERS: Buyer[] = [
  { id: 1, name: 'Agritech Foods Ltd', company: 'Agritech Foods', location: 'Hyderabad', cropsInterested: ['Wheat', 'Rice', 'Pulses'], rating: 4.8, ordersCompleted: 24, recentOrder: 'Wheat - 50 quintals' },
  { id: 2, name: 'Fresh Harvest Traders', company: 'Fresh Harvest', location: 'Delhi', cropsInterested: ['Tomato', 'Onion', 'Potato'], rating: 4.5, ordersCompleted: 18, recentOrder: 'Tomato - 30 quintals' },
  { id: 3, name: 'Organic Mart India', company: 'Organic Mart', location: 'Bangalore', cropsInterested: ['Organic Wheat', 'Rice', 'Spices'], rating: 4.9, ordersCompleted: 32, recentOrder: 'Organic Wheat - 20 quintals' },
];

const WEATHER_CODES: Record<number, { icon: typeof Sun; label: string }> = {
  0: { icon: Sun, label: 'Clear' }, 1: { icon: Sun, label: 'Mainly Clear' }, 2: { icon: Cloud, label: 'Partly Cloudy' },
  3: { icon: Cloud, label: 'Overcast' }, 45: { icon: CloudFog, label: 'Foggy' }, 48: { icon: CloudFog, label: 'Depositing Rime Fog' },
  51: { icon: CloudDrizzle, label: 'Light Drizzle' }, 53: { icon: CloudDrizzle, label: 'Drizzle' }, 55: { icon: CloudDrizzle, label: 'Heavy Drizzle' },
  61: { icon: CloudRain, label: 'Slight Rain' }, 63: { icon: CloudRain, label: 'Rain' }, 65: { icon: CloudRain, label: 'Heavy Rain' },
  71: { icon: CloudSnow, label: 'Slight Snow' }, 73: { icon: CloudSnow, label: 'Snow' }, 75: { icon: CloudSnow, label: 'Heavy Snow' },
  80: { icon: CloudRain, label: 'Slight Showers' }, 81: { icon: CloudRain, label: 'Showers' }, 82: { icon: CloudRain, label: 'Violent Showers' },
  95: { icon: CloudLightning, label: 'Thunderstorm' }, 96: { icon: CloudLightning, label: 'Thunderstorm + Hail' }, 99: { icon: CloudLightning, label: 'Heavy Thunderstorm' },
};

function getWeatherIcon(code: number) { return WEATHER_CODES[code] || { icon: Cloud, label: 'Unknown' }; }
function formatDate(dateStr: string) { const d = new Date(dateStr); return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric' }); }

const LANGUAGES = [
  { code: 'en', native: 'English' }, { code: 'hi', native: 'हिन्दी' }, { code: 'te', native: 'తెలుగు' },
  { code: 'ta', native: 'தமிழ்' }, { code: 'mr', native: 'मराठी' }, { code: 'gu', native: 'ગુજરાતી' },
  { code: 'bn', native: 'বাংলা' }, { code: 'kn', native: 'ಕನ್ನಡ' }, { code: 'ml', native: 'മലയാളം' },
  { code: 'pa', native: 'ਪੰਜਾਬੀ' }, { code: 'or', native: 'ଓଡ଼ିଆ' }, { code: 'as', native: 'অসমীয়া' },
];

const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: { today: 'Today', threeDays: '3 Days', oneWeek: '1 Week', tenDays: '10 Days', fifteenDays: '15 Days', weatherTitle: 'Weather Forecast', mandiTitle: 'Mandi Prices', newsTitle: 'Agriculture News', newsSubtitle: 'Latest updates from the farming world', schemesTitle: 'Government Schemes', myCropsTitle: 'My Crops', buyersTitle: 'Buyer Connections', quickActionsTitle: 'Quick Actions', listening: 'Listening...', speakNow: 'Speak now in your language', tapMic: 'Tap the microphone to start', all: 'All', myCrops: 'My Crops', government: 'Govt', technology: 'Tech', market: 'Market', weather: 'Weather', farmArea: 'Farm Area', activeCrops: 'Active Crops', mandiAlerts: 'Alerts', walletBalance: 'Wallet', addCrop: 'Add Crop', viewAll: 'View All', noCrops: 'No crops registered yet', registerFirst: 'Register your first crop to get started', },
  hi: { today: 'आज', threeDays: '3 दिन', oneWeek: '1 सप्ताह', tenDays: '10 दिन', fifteenDays: '15 दिन', weatherTitle: 'मौसम पूर्वानुमान', mandiTitle: 'मंडी भाव', newsTitle: 'कृषि समाचार', newsSubtitle: 'किसानी दुनिया की ताज़ा ख़बरें', schemesTitle: 'सरकारी योजनाएं', myCropsTitle: 'मेरी फसलें', buyersTitle: 'खरीदार संपर्क', quickActionsTitle: 'त्वरित कार्रवाई', listening: 'सुन रहा हूँ...', speakNow: 'अपनी भाषा में बोलें', tapMic: 'शुरू करने के लिए माइक टैप करें', all: 'सभी', myCrops: 'मेरी फसलें', government: 'सरकार', technology: 'तकनीक', market: 'बाजार', weather: 'मौसम', farmArea: 'खेत क्षेत्र', activeCrops: 'सक्रिय फसलें', mandiAlerts: 'अलर्ट', walletBalance: 'बटुआ', addCrop: 'फसल जोड़ें', viewAll: 'सभी देखें', noCrops: 'अभी तक कोई फसल पंजीकृत नहीं', registerFirst: 'शुरू करने के लिए अपनी पहली फसल पंजीकृत करें', },
  te: { today: 'ఈరోజు', threeDays: '3 రోజులు', oneWeek: '1 వారం', tenDays: '10 రోజులు', fifteenDays: '15 రోజులు', weatherTitle: 'వాతావరణ సూచన', mandiTitle: 'మార్కెట్ ధరలు', newsTitle: 'వ్యవసాయ వార్తలు', newsSubtitle: 'వ్యవసాయ ప్రపంచం నుండి తాజా అప్డేట్లు', schemesTitle: 'ప్రభుత్వ పథకాలు', myCropsTitle: 'నా పంటలు', buyersTitle: 'కొనుగోలుదారులు', quickActionsTitle: 'త్వరిత చర్యలు', listening: 'వింటున్నాను...', speakNow: 'మీ భాషలో మాట్లాడండి', tapMic: 'ప్రారంభించడానికి మైక్ నొక్కండి', all: 'అన్నీ', myCrops: 'నా పంటలు', government: 'ప్రభుత్వం', technology: 'టెక్నాలజీ', market: 'మార్కెట్', weather: 'వాతావరణం', farmArea: 'పొల విస్తీర్ణం', activeCrops: 'సక్రియ పంటలు', mandiAlerts: 'అలర్ట్లు', walletBalance: 'వాలెట్', addCrop: 'పంట జోడించండి', viewAll: 'అన్నీ చూడండి', noCrops: 'ఇంకా పంటలు నమోదు చేయలేదు', registerFirst: 'ప్రారంభించడానికి మీ మొదటి పంటను నమోదు చేయండి', },
};

/* ================================================================== */
/*  COMPONENT                                                          */
/* ================================================================== */

export default function Dashboard() {
  const { selectedLang, setLanguage } = useLanguage();
  const navigate = useNavigate();

  /* -- state -- */
  const [weatherDays, setWeatherDays] = useState<WeatherDay[]>([]);
  const [weatherFilter, setWeatherFilter] = useState('Today');
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [newsCategory, setNewsCategory] = useState('All');
  const [crops, setCrops] = useState<Crop[]>(INITIAL_CROPS);
  const [buyers] = useState<Buyer[]>(INITIAL_BUYERS);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  /* -- i18n helper -- */
  const t = (key: string) => TRANSLATIONS[selectedLang]?.[key] || TRANSLATIONS['en'][key];

  /* -- weather fetch -- */
  useEffect(() => {
    let cancelled = false;
    setWeatherLoading(true);
    (async () => {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=16.3067&longitude=80.4365&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode,windspeed_10m_max,uv_index_max,sunrise,sunset&current=relative_humidity_2m,surface_pressure,visibility,dew_point_2m&timezone=Asia/Kolkata&forecast_days=16'
        );
        if (!res.ok) throw new Error('Weather fetch failed');
        const data = await res.json();
        if (cancelled) return;
        const current = data.current || {};
        const daily = data.daily || {};
        const days: WeatherDay[] = daily.time.map((t: string, i: number) => ({
          date: t, tempMax: daily.temperature_2m_max[i], tempMin: daily.temperature_2m_min[i],
          precipitation: daily.precipitation_sum[i], windSpeed: daily.windspeed_10m_max[i],
          weatherCode: daily.weathercode[i],
          humidity: current.relative_humidity_2m ?? 65,
          uvIndex: daily.uv_index_max?.[i] ?? 5,
          visibility: current.visibility ? Math.round(current.visibility / 1000) : 10,
          sunrise: daily.sunrise?.[i] ? new Date(daily.sunrise[i]).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }) : '6:00 AM',
          sunset: daily.sunset?.[i] ? new Date(daily.sunset[i]).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }) : '6:30 PM',
          pressure: current.surface_pressure ? Math.round(current.surface_pressure) : 1013,
          dewPoint: current.dew_point_2m ? Math.round(current.dew_point_2m) : 24,
        }));
        setWeatherDays(days);
      } catch (err) { console.error('Weather error:', err); }
      setWeatherLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  const filteredDays = useCallback(() => {
    const map: Record<string, number> = { 'Today': 1, '3 Days': 3, '1 Week': 7, '10 Days': 10, '15 Days': 16 };
    return weatherDays.slice(0, map[weatherFilter] || 7);
  }, [weatherDays, weatherFilter]);

  /* -- mandi ticker scroll -- */
  useEffect(() => {
    const el = tickerRef.current; if (!el) return;
    let raf: number;
    const scroll = () => { el.scrollLeft += 0.5; if (el.scrollLeft >= el.scrollWidth - el.clientWidth) el.scrollLeft = 0; raf = requestAnimationFrame(scroll); };
    raf = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* -- crop handlers -- */
  const handleDeleteCrop = (id: number) => setCrops(prev => prev.filter(c => c.id !== id));
  const newsFiltered = newsCategory === 'All' ? NEWS_ITEMS : NEWS_ITEMS.filter(n => n.category === newsCategory);

  /* ================================================================= */
  /*  RENDER                                                           */
  /* ================================================================= */

  return (
    <DashboardLayout>
      <div className="min-h-full">
        {/* ====== STICKY HEADER ====== */}
        <header className="sticky top-0 z-30 bg-[#F8F9FA]/80 backdrop-blur-md border-b border-[#E5E7EB]">
          <div className="max-w-[1400px] mx-auto h-14 flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <h1 className="font-poppins font-bold text-xl text-[#111827]">Dashboard</h1>
              <span className="text-[#9CA3AF] text-sm">/</span>
              <span className="text-[#6B7280] text-sm">Overview</span>
            </div>
            <div className="flex items-center gap-2">
              {/* Language Selector */}
              <div className="relative" ref={langRef}>
                <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-1.5 bg-white border border-[#E5E7EB] hover:border-[#2E7D32] transition-colors rounded-lg px-2.5 py-1.5 text-xs text-[#6B7280]">
                  <Globe className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>{LANGUAGES.find(l => l.code === selectedLang)?.native}</span>
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div initial={{ opacity: 0, y: -4, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -4, scale: 0.97 }} transition={{ duration: 0.12 }}
                      className="absolute right-0 top-full mt-1.5 w-64 bg-white rounded-xl shadow-lg border border-[#E5E7EB] z-50 p-2.5">
                      <p className="text-[11px] text-[#9CA3AF] mb-1.5 px-1.5">Select Language</p>
                      <div className="grid grid-cols-3 gap-1">
                        {LANGUAGES.map(lang => (
                          <button key={lang.code} onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                            className={`flex items-center justify-center gap-1 px-1.5 py-1.5 rounded-md text-[11px] font-medium border transition-all ${selectedLang === lang.code ? 'border-[#2E7D32] bg-[#2E7D32] text-white' : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#2E7D32]'}`}>
                            {selectedLang === lang.code && <Check className="w-2.5 h-2.5" />}<span>{lang.native}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button className="p-2 rounded-lg hover:bg-[#E5E7EB]/50 transition-colors relative">
                <Bell className="w-[18px] h-[18px] text-[#6B7280]" strokeWidth={1.5} />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full border border-[#F8F9FA]" />
              </button>
              <div className="w-8 h-8 rounded-full bg-[#2E7D32] flex items-center justify-center text-white font-medium text-xs">RP</div>
            </div>
          </div>
        </header>

        {/* ====== MAIN CONTENT ====== */}
        <div className="max-w-[1400px] mx-auto px-6 py-5 space-y-5">

          {/* Welcome Banner */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
            className="bg-gradient-to-r from-[#2E7D32] to-[#43A047] rounded-xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-poppins font-bold text-lg">Welcome back, Rajesh!</h2>
                <p className="text-white/70 text-xs mt-0.5">Here&apos;s what&apos;s happening on your farm today</p>
              </div>
            </div>
            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-2 mt-3">
              {[
                { label: 'Farm Area', value: '25 acres', icon: Sprout, bg: 'bg-white/15' },
                { label: 'Active Crops', value: '3', icon: CheckCircle2, bg: 'bg-white/15' },
                { label: 'Alerts', value: '5 New', icon: Bell, bg: 'bg-white/15' },
                { label: 'Wallet', value: 'Rs 12,450', icon: Wallet, bg: 'bg-white/15' },
              ].map((stat) => (
                <div key={stat.label} className={`${stat.bg} rounded-lg p-2.5`}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <stat.icon className="w-3.5 h-3.5 text-white/60" strokeWidth={1.5} />
                    <span className="text-white/50 text-[10px]">{stat.label}</span>
                  </div>
                  <p className="font-poppins font-semibold text-sm">{stat.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Mandi Ticker */}
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.3 }}>
            <Card className="border-[#E5E7EB] shadow-none overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 px-4 py-2.5 border-b border-[#E5E7EB] bg-amber-50/40">
                  <TrendingUp className="w-4 h-4 text-amber-500 shrink-0" strokeWidth={2} />
                  <h3 className="font-poppins font-semibold text-xs text-[#111827] shrink-0">{t('mandiTitle')}</h3>
                  <div className="flex-1 overflow-hidden" ref={tickerRef}>
                    <div className="flex gap-6 whitespace-nowrap">
                      {[...MANDI_PRICES, ...MANDI_PRICES].map((item, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1.5 text-xs">
                          <span className="text-[#6B7280]">{item.commodity}</span>
                          <span className="font-semibold text-[#111827]">Rs {item.price}</span>
                          <span className={`flex items-center gap-0.5 text-[10px] font-medium ${item.change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {item.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {Math.abs(item.change)}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* ====== 2-COLUMN GRID ====== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* LEFT COLUMN */}
            <div className="space-y-5">

              {/* Weather Forecast */}
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.3 }}>
                <Card className="border-[#E5E7EB] shadow-none">
                  <CardHeader className="pb-3 pt-5 px-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                          <Cloud className="w-4 h-4 text-blue-500" strokeWidth={2} />
                        </div>
                        <div>
                          <h3 className="font-poppins font-semibold text-sm text-[#111827]">{t('weatherTitle')}</h3>
                          <p className="text-[10px] text-[#9CA3AF] flex items-center gap-1"><MapPin className="w-2.5 h-2.5" />Guntur, AP</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {['Today','3 Days','1 Week','10 Days','15 Days'].map(f => (
                          <button key={f} onClick={() => setWeatherFilter(f)}
                            className={`px-2 py-1 rounded-md text-[10px] font-medium transition-all ${weatherFilter === f ? 'bg-[#2E7D32] text-white' : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'}`}>{f}</button>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="px-5 pb-5">
                    {weatherLoading ? (
                      <div className="space-y-3">
                        <Skeleton className="h-14 w-full rounded-lg" />
                        <div className="grid grid-cols-7 gap-1"><Skeleton className="h-16 rounded-lg" /><Skeleton className="h-16 rounded-lg" /><Skeleton className="h-16 rounded-lg" /><Skeleton className="h-16 rounded-lg" /><Skeleton className="h-16 rounded-lg" /><Skeleton className="h-16 rounded-lg" /><Skeleton className="h-16 rounded-lg" /></div>
                      </div>
                    ) : (
                      <>
                        {/* Current */}
                        {weatherDays.length > 0 && (
                          <div className="flex items-center gap-3 bg-blue-50/50 rounded-lg p-2.5 mb-3">
                            <div className="text-center shrink-0 w-12">
                              {(() => { const Icon = getWeatherIcon(weatherDays[0].weatherCode).icon; return <Icon className="w-8 h-8 text-blue-500 mx-auto" strokeWidth={1.5} />; })()}
                              <p className="text-[10px] text-[#6B7280] mt-0.5">{getWeatherIcon(weatherDays[0].weatherCode).label}</p>
                            </div>
                            <div className="flex-1 grid grid-cols-4 gap-1.5">
                              {[
                                { icon: Thermometer, l: 'Max', v: `${weatherDays[0].tempMax}°C`, c: 'text-red-500' },
                                { icon: Thermometer, l: 'Min', v: `${weatherDays[0].tempMin}°C`, c: 'text-blue-500' },
                                { icon: Droplets, l: 'Rain', v: `${weatherDays[0].precipitation}mm`, c: 'text-cyan-500' },
                                { icon: Wind, l: 'Wind', v: `${weatherDays[0].windSpeed}km/h`, c: 'text-[#6B7280]' },
                              ].map(s => (
                                <div key={s.l} className="text-center bg-white/60 rounded-md py-1.5">
                                  <s.icon className={`w-3.5 h-3.5 ${s.c} mx-auto mb-0.5`} strokeWidth={2} />
                                  <p className="text-[9px] text-[#9CA3AF]">{s.l}</p>
                                  <p className="font-poppins font-semibold text-xs">{s.v}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {/* Secondary */}
                        {weatherDays.length > 0 && (
                          <div className="grid grid-cols-7 gap-1 mb-3">
                            {[
                              { icon: Droplets, l: 'Hum', v: `${weatherDays[0].humidity}%`, c: 'text-blue-500' },
                              { icon: Sun, l: 'UV', v: `${weatherDays[0].uvIndex}`, c: 'text-amber-500' },
                              { icon: Eye, l: 'Vis', v: `${weatherDays[0].visibility}km`, c: 'text-cyan-500' },
                              { icon: Sunrise, l: 'Rise', v: weatherDays[0].sunrise, c: 'text-amber-600' },
                              { icon: Sunset, l: 'Set', v: weatherDays[0].sunset, c: 'text-orange-600' },
                              { icon: Gauge, l: 'Pres', v: `${weatherDays[0].pressure}hPa`, c: 'text-purple-500' },
                              { icon: CloudDrizzle, l: 'Dew', v: `${weatherDays[0].dewPoint}°C`, c: 'text-indigo-500' },
                            ].map(m => (
                              <div key={m.l} className="bg-blue-50/50 rounded-md p-1 text-center">
                                <m.icon className={`w-3 h-3 ${m.c} mx-auto mb-0.5`} strokeWidth={2} />
                                <p className="text-[8px] text-[#9CA3AF]">{m.l}</p>
                                <p className="font-poppins font-semibold text-[11px] text-[#111827]">{m.v}</p>
                              </div>
                            ))}
                          </div>
                        )}
                        {/* Forecast */}
                        <div className="grid grid-cols-7 gap-1">
                          {filteredDays().slice(0, 7).map((day, i) => {
                            const wc = getWeatherIcon(day.weatherCode); const Icon = wc.icon;
                            return (
                              <div key={day.date} className="bg-[#F8F9FA] rounded-md p-1.5 text-center">
                                <p className="text-[9px] text-[#9CA3AF] mb-0.5">{i === 0 ? t('today') : formatDate(day.date)}</p>
                                <Icon className="w-4 h-4 mx-auto text-blue-500 mb-0.5" strokeWidth={1.5} />
                                <p className="font-semibold text-xs text-[#111827]">{day.tempMax}°</p>
                                <p className="text-[9px] text-[#9CA3AF]">{day.tempMin}°</p>
                                {day.precipitation > 0 && <p className="text-[8px] text-cyan-600">{day.precipitation}mm</p>}
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* My Crops */}
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.3 }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center"><Sprout className="w-4 h-4 text-green-600" strokeWidth={2} /></div>
                    <h3 className="font-poppins font-semibold text-sm text-[#111827]">{t('myCropsTitle')}</h3>
                  </div>
                  <Button size="sm" variant="outline" className="h-7 text-xs gap-1 border-[#E5E7EB]" onClick={() => navigate('/dashboard/produce')}><Plus className="w-3 h-3" />{t('addCrop')}</Button>
                </div>
                <div className="space-y-2">
                  <AnimatePresence>
                    {crops.map(crop => (
                      <motion.div key={crop.id} layout initial={{ opacity: 1 }} exit={{ opacity: 0, x: 50 }}>
                        <Card className="border-[#E5E7EB] shadow-none hover:shadow-sm transition-shadow cursor-pointer" onClick={() => navigate('/dashboard/farm')}>
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center"><Sprout className="w-4 h-4 text-green-600" strokeWidth={2} /></div>
                                <div>
                                  <h4 className="font-medium text-sm text-[#111827]">{crop.name} <span className="text-[#9CA3AF] font-normal">({crop.variety})</span></h4>
                                  <div className="flex items-center gap-3 mt-0.5 text-[10px] text-[#6B7280]">
                                    <span>{crop.area}</span><span>Sowed: {crop.sowingDate}</span><span>Harvest: {crop.expectedHarvest}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className={`text-[10px] h-5 ${crop.status === 'Growing' ? 'border-green-200 text-green-700 bg-green-50' : crop.status === 'Harvesting' ? 'border-amber-200 text-amber-700 bg-amber-50' : 'border-blue-200 text-blue-700 bg-blue-50'}`}>{crop.status}</Badge>
                                <button onClick={e => { e.stopPropagation(); handleDeleteCrop(crop.id); }} className="p-1 rounded hover:bg-red-50 text-[#9CA3AF] hover:text-red-500 transition-colors"><Trash2 className="w-3 h-3" /></button>
                              </div>
                            </div>
                            <div className="mt-2"><div className="h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-[#2E7D32] to-[#66BB6A] rounded-full transition-all" style={{ width: `${crop.progress}%` }} /></div></div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.3 }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center"><Zap className="w-4 h-4 text-[#6B7280]" strokeWidth={2} /></div>
                  <h3 className="font-poppins font-semibold text-sm text-[#111827]">{t('quickActionsTitle')}</h3>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { icon: ShoppingCart, label: 'Sell Crop', action: () => navigate('/dashboard/produce'), color: 'text-green-600', bg: 'bg-green-50' },
                    { icon: Tractor, label: 'Farm OS', action: () => navigate('/dashboard/farm'), color: 'text-blue-600', bg: 'bg-blue-50' },
                    { icon: Stethoscope, label: 'Crop Doctor', action: () => navigate('/dashboard/crop-doctor'), color: 'text-red-500', bg: 'bg-red-50' },
                    { icon: BarChart3, label: 'Market', action: () => navigate('/dashboard/market-prices'), color: 'text-amber-600', bg: 'bg-amber-50' },
                    { icon: HandshakeIcon, label: 'Buyers', action: () => navigate('/dashboard/buyer-connect'), color: 'text-purple-600', bg: 'bg-purple-50' },
                    { icon: Users, label: 'Community', action: () => navigate('/dashboard/community'), color: 'text-cyan-600', bg: 'bg-cyan-50' },
                    { icon: GraduationCap, label: 'Experts', action: () => navigate('/dashboard/experts'), color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { icon: Wallet, label: 'Wallet', action: () => navigate('/dashboard/wallet'), color: 'text-rose-600', bg: 'bg-rose-50' },
                  ].map(action => (
                    <button key={action.label} onClick={action.action} className="flex flex-col items-center gap-1 p-2.5 bg-white rounded-xl border border-[#E5E7EB] hover:shadow-sm hover:border-[#2E7D32]/30 transition-all group">
                      <div className={`w-9 h-9 rounded-lg ${action.bg} ${action.color} flex items-center justify-center`}><action.icon className="w-4 h-4" strokeWidth={2} /></div>
                      <span className="text-[10px] font-medium text-[#6B7280] group-hover:text-[#111827]">{action.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-5">

              {/* Agriculture News */}
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.3 }}>
                <Card className="border-[#E5E7EB] shadow-none">
                  <CardHeader className="pb-3 pt-5 px-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center"><Newspaper className="w-4 h-4 text-red-500" strokeWidth={2} /></div>
                        <div><h3 className="font-poppins font-semibold text-sm text-[#111827]">{t('newsTitle')}</h3><p className="text-[10px] text-[#9CA3AF]">{t('newsSubtitle')}</p></div>
                      </div>
                    </div>
                    <div className="flex gap-1 mt-2.5">
                      {['All','My Crops','Government','Technology','Market','Weather'].map(cat => (
                        <button key={cat} onClick={() => setNewsCategory(cat)}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-medium transition-all ${newsCategory === cat ? 'bg-[#2E7D32] text-white' : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'}`}>{t(cat.toLowerCase().replace(' ', '')) || cat}</button>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="px-5 pb-5 space-y-2.5">
                    {newsFiltered.map(item => (
                      <a key={item.id} href={item.externalUrl} target="_blank" rel="noopener noreferrer" className="flex gap-3 p-2.5 rounded-lg hover:bg-[#F8F9FA] transition-colors group">
                        <div className="w-16 h-16 rounded-lg bg-[#F3F4F6] shrink-0 overflow-hidden"><img src={item.image} alt={item.title} className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} /></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <Badge variant="outline" className="text-[9px] h-4 px-1 border-[#E5E7EB] text-[#6B7280]">{item.category}</Badge>
                            <span className="text-[9px] text-[#9CA3AF]">{item.date}</span>
                          </div>
                          <h4 className="text-xs font-medium text-[#111827] leading-snug group-hover:text-[#2E7D32] transition-colors line-clamp-2">{item.title}</h4>
                          <p className="text-[10px] text-[#6B7280] line-clamp-1 mt-0.5">{item.summary}</p>
                        </div>
                      </a>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Government Schemes */}
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22, duration: 0.3 }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center"><Landmark className="w-4 h-4 text-orange-500" strokeWidth={2} /></div>
                  <h3 className="font-poppins font-semibold text-sm text-[#111827]">{t('schemesTitle')}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SCHEMES.map(scheme => (
                    <a key={scheme.name} href={scheme.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 p-3 bg-white rounded-xl border border-[#E5E7EB] hover:shadow-sm hover:border-[#2E7D32]/20 transition-all group">
                      <div className={`w-8 h-8 rounded-lg ${scheme.bgColor} flex items-center justify-center shrink-0`}><scheme.icon className="w-4 h-4 text-[#111827]" strokeWidth={1.5} /></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between"><h4 className="font-medium text-xs text-[#111827]">{scheme.name}</h4><ExternalLink className="w-3 h-3 text-[#9CA3AF] group-hover:text-[#2E7D32]" /></div>
                        <p className="text-[10px] text-[#6B7280] mt-0.5">{scheme.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Buyer Connections */}
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26, duration: 0.3 }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center"><Users className="w-4 h-4 text-blue-500" strokeWidth={2} /></div>
                    <h3 className="font-poppins font-semibold text-sm text-[#111827]">{t('buyersTitle')}</h3>
                  </div>
                  <button onClick={() => navigate('/dashboard/buyer-connect')} className="text-[10px] font-medium text-[#2E7D32] hover:underline">{t('viewAll')}</button>
                </div>
                <div className="space-y-2">
                  {buyers.map(buyer => (
                    <Card key={buyer.id} className="border-[#E5E7EB] shadow-none hover:shadow-sm transition-shadow cursor-pointer" onClick={() => navigate('/dashboard/buyer-connect')}>
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-semibold text-xs">{buyer.name.charAt(0)}</div>
                            <div>
                              <h4 className="font-medium text-xs text-[#111827]">{buyer.name}</h4>
                              <div className="flex items-center gap-2 text-[10px] text-[#6B7280]">
                                <span className="flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5" />{buyer.location}</span>
                                <span className="flex items-center gap-0.5"><Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />{buyer.rating}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right"><p className="text-[9px] text-[#9CA3AF]">Recent</p><p className="text-[10px] font-medium text-[#111827]">{buyer.recentOrder}</p></div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {buyer.cropsInterested.map(c => <Badge key={c} variant="outline" className="text-[9px] h-4 px-1 border-[#E5E7EB] text-[#6B7280]">{c}</Badge>)}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* ====== VOICE FAB ====== */}
          <AnimatePresence>
            {voiceOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={() => setVoiceOpen(false)}>
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-2xl p-8 text-center max-w-sm mx-4" onClick={e => e.stopPropagation()}>
                  <div className="w-16 h-16 rounded-full bg-[#2E7D32]/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Mic className="w-8 h-8 text-[#2E7D32]" strokeWidth={2} />
                  </div>
                  <h3 className="font-poppins font-semibold text-lg text-[#111827] mb-1">{t('listening')}</h3>
                  <p className="text-sm text-[#6B7280] mb-1">{t('speakNow')}</p>
                  <p className="text-xs text-[#9CA3AF]">{t('tapMic')}</p>
                  <button onClick={() => setVoiceOpen(false)} className="mt-4 px-4 py-2 bg-[#F3F4F6] rounded-lg text-sm text-[#6B7280] hover:bg-[#E5E7EB] transition-colors">{t('all') === 'All' ? 'Close' : 'बंद करें'}</button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Voice FAB Button */}
          <button onClick={() => setVoiceOpen(true)} className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-[#2E7D32] text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all z-40 flex items-center justify-center lg:bottom-6 lg:right-6">
            <Mic className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
