import { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun,
  Cloud,
  CloudRain,
  Wind,
  Droplets,
  CloudLightning,
  CloudSnow,
  CloudFog,
  Eye,
  Sunrise,
  Sunset,
  Gauge,
  CloudDrizzle,
  TrendingUp,
  TrendingDown,
  Minus,
  Sprout,
  IndianRupee,
  ExternalLink,
  Newspaper,
  Landmark,
  CreditCard,

  Users,
  MessageSquare,
  GraduationCap,
  Wallet,
  Mic,
  MicOff,
  ChevronRight,
  X,
  CheckCircle2,
  Clock,
  MapPin,
  Shield,
  Star,
  Edit3,
  Trash2,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  Globe,
  Check,
  Thermometer,
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
  date: string;
  tempMax: number;
  tempMin: number;
  precipitation: number;
  windSpeed: number;
  weatherCode: number;
  humidity: number;
  uvIndex: number;
  visibility: number;
  sunrise: string;
  sunset: string;
  pressure: number;
  dewPoint: number;
}

interface MandiPrice {
  commodity: string;
  price: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

interface NewsArticle {
  id: number;
  title: string;
  snippet: string;
  source: string;
  date: string;
  category: string;
  url: string;
}

interface Scheme {
  name: string;
  description: string;
  amount?: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  borderColor: string;
  bgColor: string;
}

interface Crop {
  id: number;
  name: string;
  acres: number;
  output: string;
  harvestDate: string;
  expectedHarvestDate: string;
  sowingDate: string;
  avgHarvestQuantity: string;
  price: string;
  status: string;
}

interface BuyerRequest {
  id: number;
  name: string;
  commodity: string;
  quantity: string;
  status: string;
}

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const WEATHER_CODES: Record<number, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
  0: { label: 'Clear Sky', icon: Sun },
  1: { label: 'Mainly Clear', icon: Sun },
  2: { label: 'Partly Cloudy', icon: Cloud },
  3: { label: 'Overcast', icon: Cloud },
  45: { label: 'Foggy', icon: CloudFog },
  48: { label: 'Foggy', icon: CloudFog },
  51: { label: 'Light Drizzle', icon: CloudRain },
  53: { label: 'Drizzle', icon: CloudRain },
  55: { label: 'Heavy Drizzle', icon: CloudRain },
  61: { label: 'Light Rain', icon: CloudRain },
  63: { label: 'Rain', icon: CloudRain },
  65: { label: 'Heavy Rain', icon: CloudRain },
  71: { label: 'Light Snow', icon: CloudSnow },
  73: { label: 'Snow', icon: CloudSnow },
  75: { label: 'Heavy Snow', icon: CloudSnow },
  80: { label: 'Rain Showers', icon: CloudRain },
  81: { label: 'Rain Showers', icon: CloudRain },
  82: { label: 'Heavy Showers', icon: CloudRain },
  95: { label: 'Thunderstorm', icon: CloudLightning },
  96: { label: 'Thunderstorm', icon: CloudLightning },
  99: { label: 'Thunderstorm', icon: CloudLightning },
};

const FALLBACK_WEATHER: WeatherDay[] = [
  { date: '2024-08-15', tempMax: 34, tempMin: 26, precipitation: 2.5, windSpeed: 12, weatherCode: 1, humidity: 68, uvIndex: 7, visibility: 10, sunrise: '06:12', sunset: '18:48', pressure: 1010, dewPoint: 24 },
  { date: '2024-08-16', tempMax: 33, tempMin: 25, precipitation: 5.0, windSpeed: 15, weatherCode: 61, humidity: 82, uvIndex: 3, visibility: 7, sunrise: '06:12', sunset: '18:47', pressure: 1008, dewPoint: 25 },
  { date: '2024-08-17', tempMax: 32, tempMin: 25, precipitation: 8.2, windSpeed: 18, weatherCode: 63, humidity: 90, uvIndex: 2, visibility: 4, sunrise: '06:13', sunset: '18:46', pressure: 1005, dewPoint: 26 },
  { date: '2024-08-18', tempMax: 31, tempMin: 24, precipitation: 12.0, windSpeed: 20, weatherCode: 80, humidity: 88, uvIndex: 2, visibility: 5, sunrise: '06:13', sunset: '18:46', pressure: 1006, dewPoint: 25 },
  { date: '2024-08-19', tempMax: 33, tempMin: 25, precipitation: 3.0, windSpeed: 10, weatherCode: 2, humidity: 72, uvIndex: 6, visibility: 9, sunrise: '06:14', sunset: '18:45', pressure: 1011, dewPoint: 24 },
  { date: '2024-08-20', tempMax: 35, tempMin: 27, precipitation: 0, windSpeed: 8, weatherCode: 0, humidity: 55, uvIndex: 9, visibility: 12, sunrise: '06:14', sunset: '18:44', pressure: 1014, dewPoint: 22 },
  { date: '2024-08-21', tempMax: 36, tempMin: 27, precipitation: 0, windSpeed: 10, weatherCode: 0, humidity: 52, uvIndex: 9, visibility: 12, sunrise: '06:14', sunset: '18:44', pressure: 1015, dewPoint: 21 },
];

const MANDI_PRICES: MandiPrice[] = [
  { commodity: 'Cotton', price: 6420, unit: 'q', trend: 'up', change: 120 },
  { commodity: 'Chili', price: 12800, unit: 'q', trend: 'up', change: 350 },
  { commodity: 'Tomato', price: 2400, unit: 'q', trend: 'down', change: 180 },
  { commodity: 'Paddy', price: 2040, unit: 'q', trend: 'stable', change: 0 },
  { commodity: 'Onion', price: 3200, unit: 'q', trend: 'up', change: 200 },
  { commodity: 'Turmeric', price: 7800, unit: 'q', trend: 'down', change: 150 },
  { commodity: 'Maize', price: 2150, unit: 'q', trend: 'up', change: 80 },
  { commodity: 'Groundnut', price: 5800, unit: 'q', trend: 'up', change: 220 },
];

const NEWS_ARTICLES: NewsArticle[] = [
  { id: 1, title: 'PM-KISAN 19th installment of Rs 22,000 crore released', snippet: 'The Centre has released the 19th installment of PM-KISAN, benefiting 9.8 crore farmer families across India...', source: 'PIB India', date: '2 days ago', category: 'Government', url: 'https://pib.gov.in/PressReleasePage.aspx?PRID=1928374' },
  { id: 2, title: 'Cotton prices hit 6-month high in Guntur mandi', snippet: 'Cotton prices surged to Rs 6,800 per quintal in Guntur market, the highest in six months, driven by strong export demand...', source: 'Business Standard', date: '1 day ago', category: 'Market', url: 'https://www.business-standard.com/article/markets/cotton-prices-hit-six-month-high-1240601001_1.html' },
  { id: 3, title: 'New drone spraying technique reduces pesticide use by 40%', snippet: 'Researchers at IARI have developed a precision drone spraying method that cuts pesticide usage by 40% while improving coverage...', source: 'Krishi Jagran', date: '3 days ago', category: 'Technology', url: 'https://krishijagran.com/agriculture-world/drone-spraying-technique-reduces-pesticide-use/' },
  { id: 4, title: 'Southwest monsoon to arrive 5 days early this year: IMD', snippet: 'The India Meteorological Department predicts the southwest monsoon will hit Kerala on May 29, five days ahead of normal...', source: 'The Hindu', date: '5 hours ago', category: 'Weather', url: 'https://www.thehindu.com/sci-tech/energy-and-environment/southwest-monsoon-to-arrive-5-days-early-imd/article6832101.ece' },
  { id: 5, title: 'Government announces 5% subsidy increase on drip irrigation', snippet: 'The Cabinet approved an additional 5% subsidy on drip and sprinkler irrigation systems under the PMKSY scheme...', source: 'AgriNews', date: '1 week ago', category: 'Government', url: 'https://www.agrinews.in/government-announces-subsidy-increase-drip-irrigation/' },
  { id: 6, title: 'Chili exports to rise 15% this quarter as global demand surges', snippet: 'Indian chili exports are expected to grow 15% in Q2 2025 due to increased demand from Southeast Asian markets...', source: 'Economic Times', date: '2 days ago', category: 'Market', url: 'https://economictimes.indiatimes.com/news/economy/exports/chili-exports-to-rise-15-this-quarter/articleshow/110928374.cms' },
  { id: 7, title: 'Organic farming: How these farmers doubled their income', snippet: 'A group of farmers in Andhra Pradesh switched to organic methods and saw their income double within two years...', source: 'Down to Earth', date: '4 days ago', category: 'Technology', url: 'https://www.downtoearth.org.in/agriculture/organic-farming-how-farmers-doubled-income-92348' },
  { id: 8, title: 'Soil Health Card portal reaches 25 crore registered farmers', snippet: 'The Soil Health Card scheme has achieved a major milestone with 25 crore farmers registered on the portal...', source: 'PIB India', date: '3 days ago', category: 'Government', url: 'https://pib.gov.in/PressReleasePage.aspx?PRID=1928456' },
];

const SCHEMES: Scheme[] = [
  { name: 'PM-KISAN', description: 'Rs 6,000 per year income support to farmer families', amount: 'Rs 6,000/year', url: 'https://pmkisan.gov.in', icon: Landmark, borderColor: 'border-orange-400', bgColor: 'bg-orange-50' },
  { name: 'PMFBY', description: 'Crop insurance against natural calamities, pests & diseases', url: 'https://pmfby.gov.in', icon: Shield, borderColor: 'border-blue-400', bgColor: 'bg-blue-50' },
  { name: 'Soil Health Card', description: 'Free soil testing and customized fertilizer recommendations', url: 'https://soilhealth.dac.gov.in', icon: Sprout, borderColor: 'border-green-400', bgColor: 'bg-green-50' },
  { name: 'KCC Loan', description: 'Kisan Credit Card - Short term credit up to Rs 3 lakh at 7%', amount: 'Up to Rs 3L @ 7%', url: '#', icon: CreditCard, borderColor: 'border-purple-400', bgColor: 'bg-purple-50' },
  { name: 'Micro Irrigation', description: '55% subsidy on drip and sprinkler irrigation systems', amount: '55% Subsidy', url: '#', icon: Droplets, borderColor: 'border-cyan-400', bgColor: 'bg-cyan-50' },
  { name: 'NMSA', description: 'National Mission for Sustainable Agriculture - soil & water conservation', url: '#', icon: Sprout, borderColor: 'border-emerald-400', bgColor: 'bg-emerald-50' },
];

const MY_CROPS: Crop[] = [
  { id: 1, name: 'Cotton', acres: 8, output: '40 q', harvestDate: 'Aug 15', expectedHarvestDate: 'Oct 10-20', sowingDate: 'Jun 1', avgHarvestQuantity: '5 q/acre', price: 'Rs 6,400/q', status: 'Growing' },
  { id: 2, name: 'Chili', acres: 5, output: '25 q', harvestDate: 'Jul 30', expectedHarvestDate: 'Aug 20-30', sowingDate: 'Feb 15', avgHarvestQuantity: '5 q/acre', price: 'Contact', status: 'Harvesting' },
  { id: 3, name: 'Paddy', acres: 6, output: '50 q', harvestDate: 'Sep 10', expectedHarvestDate: 'Nov 15-25', sowingDate: 'Jul 1', avgHarvestQuantity: '8.3 q/acre', price: 'Rs 2,050/q', status: 'Sowing' },
];

const BUYERS: BuyerRequest[] = [
  { id: 1, name: 'Agro Foods Ltd', commodity: 'Cotton', quantity: '20 q', status: 'New' },
  { id: 2, name: 'Venkatesh Traders', commodity: 'Chili', quantity: '10 q', status: 'Negotiating' },
  { id: 3, name: 'Srinivas Exports', commodity: 'Paddy', quantity: '30 q', status: 'Connected' },
];

const QUICK_ACTIONS = [
  { label: 'Register Crop', icon: Sprout, href: '/dashboard/produce', color: 'bg-green-50 text-green-600' },
  { label: 'Mandi Prices', icon: IndianRupee, href: '/dashboard/feed', color: 'bg-amber-50 text-amber-600' },
  { label: 'Weather', icon: Sun, href: '#weather', color: 'bg-blue-50 text-blue-600' },
  { label: 'Schemes', icon: Landmark, href: '#schemes', color: 'bg-orange-50 text-orange-600' },
  { label: 'Expert', icon: GraduationCap, href: '/dashboard/experts', color: 'bg-purple-50 text-purple-600' },
  { label: 'Bookings', icon: CalendarClock, href: '/dashboard/machinery', color: 'bg-pink-50 text-pink-600' },
  { label: 'Community', icon: MessageSquare, href: '/dashboard/community', color: 'bg-cyan-50 text-cyan-600' },
  { label: 'Wallet', icon: Wallet, href: '/dashboard/wallet', color: 'bg-emerald-50 text-emerald-600' },
];

// Wrapper component for Calendar + Clock combo
function CalendarClock(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <circle cx="12" cy="15" r="1" />
    </svg>
  );
}

const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: '\u0939\u093f\u0928\u094d\u0926\u0940' },
  { code: 'te', name: 'Telugu', native: '\u0c24\u0c46\u0c32\u0c41\u0c17\u0c41' },
  { code: 'ta', name: 'Tamil', native: '\u0ba4\u0bae\u0bbf\u0bb4\u0bcd' },
  { code: 'kn', name: 'Kannada', native: '\u0c95\u0ca8\u0ccd\u0ca8\u0ca1' },
  { code: 'mr', name: 'Marathi', native: '\u092e\u0930\u093e\u0920\u0940' },
  { code: 'gu', name: 'Gujarati', native: '\u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0aa4\u0ac0' },
  { code: 'bn', name: 'Bengali', native: '\u09ac\u09be\u0982\u09b2\u09be' },
  { code: 'pa', name: 'Punjabi', native: '\u0a2a\u0a70\u0a1c\u0a3e\u0a2c\u0a40' },
  { code: 'or', name: 'Odia', native: '\u0b13\u0b21\u0b3c\u0b3f\u0b06' },
  { code: 'ml', name: 'Malayalam', native: '\u0d2e\u0d32\u0d2f\u0d3e\u0d33\u0d02' },
  { code: 'as', name: 'Assamese', native: '\u0985\u09b8\u09ae\u09c0\u09af\u09bc\u09be' },
];

/* ------------------------------------------------------------------ */
/*  Translations                                                       */
/* ------------------------------------------------------------------ */

const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: { weatherTitle: 'Weather Forecast', mandiTitle: 'Live Mandi Prices', newsTitle: 'Agriculture News', schemesTitle: 'Government Schemes', myCropsTitle: 'My Registered Crops', buyersTitle: 'Buyer Connections', quickActionsTitle: 'Quick Actions', expertTitle: 'Connect with Experts', today: 'Today', threeDays: '3 Days', oneWeek: '1 Week', tenDays: '10 Days', fifteenDays: '15 Days', readFull: 'Read Full Article', applyNow: 'Apply Now', viewDetails: 'View Details', connect: 'Connect', registerCrop: 'Register New Crop', all: 'All', myCrops: 'My Crops', government: 'Government', technology: 'Technology', market: 'Market', weather: 'Weather', noArticles: 'No articles found', loading: 'Loading', listening: 'Listening...', tapToSpeak: 'Tap to speak', knowMore: 'Know More', setPrice: 'Set Price', contactForPrice: 'Contact for Price', pricePerQuintal: 'Price per Quintal', expectedOutput: 'Expected Output', harvestDate: 'Harvest Date', acres: 'Acres', statusGrowing: 'Growing', statusHarvest: 'Harvest Ready', buyerNew: 'New', buyerNegotiating: 'Negotiating', buyerConnected: 'Connected', cropType: 'Crop Type', farmLocation: 'Farm Location', area: 'Area', expectedProduceDate: 'Expected Produce Date', cancel: 'Cancel', register: 'Register', edit: 'Edit', delete: 'Delete', close: 'Close' },
  hi: { weatherTitle: 'मौसम पूर्वानुमान', mandiTitle: 'लाइव मंडी भाव', newsTitle: 'कृषि समाचार', schemesTitle: 'सरकारी योजनाएं', myCropsTitle: 'मेरी पंजीकृत फसलें', buyersTitle: 'खरीदार संपर्क', quickActionsTitle: 'त्वरित कार्रवाई', expertTitle: 'विशेषज्ञों से संपर्क करें', today: 'आज', threeDays: '3 दिन', oneWeek: '1 सप्ताह', tenDays: '10 दिन', fifteenDays: '15 दिन', readFull: 'पूरा लेख पढ़ें', applyNow: 'अभी आवेदन करें', viewDetails: 'विवरण देखें', connect: 'संपर्क करें', registerCrop: 'नई फसल पंजीकृत करें', all: 'सभी', myCrops: 'मेरी फसलें', government: 'सरकार', technology: 'प्रौद्योगिकी', market: 'बाजार', weather: 'मौसम', noArticles: 'कोई लेख नहीं मिला', loading: 'लोड हो रहा है', listening: 'सुन रहा है...', tapToSpeak: 'बोलने के लिए टैप करें', knowMore: 'और जानें', setPrice: 'मूल्य निर्धारित करें', contactForPrice: 'मूल्य के लिए संपर्क करें', pricePerQuintal: 'प्रति क्विंटल मूल्य', expectedOutput: 'अपेक्षित उपज', harvestDate: 'कटाई की तारीख', acres: 'एकड़', statusGrowing: 'बढ़ रही है', statusHarvest: 'कटाई के लिए तैयार', buyerNew: 'नया', buyerNegotiating: 'बातचीत चल रही है', buyerConnected: 'जुड़ा हुआ', cropType: 'फसल का प्रकार', farmLocation: 'खेत का स्थान', area: 'क्षेत्र', expectedProduceDate: 'अपेक्षित उत्पादन तिथि', cancel: 'रद्द करें', register: 'पंजीकृत करें', edit: 'संपादित करें', delete: 'हटाएं', close: 'बंद करें' },
  te: { weatherTitle: 'వాతావరణ అంచనా', mandiTitle: 'ప్రత్యక్ష మార్కెట్ ధరలు', newsTitle: 'వ్యవసాయ వార్తలు', schemesTitle: 'ప్రభుత్వ పథకాలు', myCropsTitle: 'నా నమోదిత పంటలు', buyersTitle: 'కొనుగోలుదారు కనెక్షన్లు', quickActionsTitle: 'త్వరిత చర్యలు', expertTitle: 'నిపుణులను సంప్రదించండి', today: 'ఈరోజు', threeDays: '3 రోజులు', oneWeek: '1 వారం', tenDays: '10 రోజులు', fifteenDays: '15 రోజులు', readFull: 'పూర్తి వ్యాసం చదవండి', applyNow: 'ఇప్పుడే దరఖాస్తు చేయండి', viewDetails: 'వివరాలు చూడండి', connect: 'కనెక్ట్ చేయండి', registerCrop: 'కొత్త పంటను నమోదు చేయండి', all: 'అన్నీ', myCrops: 'నా పంటలు', government: 'ప్రభుత్వం', technology: 'సాంకేతికత', market: 'మార్కెట్', weather: 'వాతావరణం', noArticles: 'వ్యాసాలు లేవు', loading: 'లోడ్ అవుతోంది', listening: 'వింటున్నాం...', tapToSpeak: 'మాట్లాడటానికి ట్యాప్ చేయండి', knowMore: 'మరింత తెలుసుకోండి', setPrice: 'ధర నిర్ణయించండి', contactForPrice: 'ధర కోసం సంప్రదించండి', pricePerQuintal: 'క్వింటాల్‌కు ధర', expectedOutput: 'అంచనా దిగుబడి', harvestDate: 'కోత తేదీ', acres: 'ఎకరాలు', statusGrowing: 'పెరుగుతోంది', statusHarvest: 'కోతకు సిద్ధం', buyerNew: 'కొత్తది', buyerNegotiating: 'చర్చలు జరుగుతున్నాయి', buyerConnected: 'కనెక్ట్ అయ్యింది', cropType: 'పంట రకం', farmLocation: 'పొలం స్థానం', area: 'ప్రాంతం', expectedProduceDate: 'అంచనా దిగుబడి తేదీ', cancel: 'రద్దు చేయండి', register: 'నమోదు చేయండి', edit: 'సవరించండి', delete: 'తొలగించండి', close: 'మూసివేయండి' },
  ta: { weatherTitle: 'வானிலை முன்னறிவிப்பு', mandiTitle: 'நேரடி மண்டி விலைகள்', newsTitle: 'விவசாய செய்திகள்', schemesTitle: 'அரசு திட்டங்கள்', myCropsTitle: 'எனது பதிவு செய்யப்பட்ட பயிர்கள்', buyersTitle: 'வாங்குநர் இணைப்புகள்', quickActionsTitle: 'விரைவு செயல்கள்', expertTitle: 'நிபுணர்களை அணுகவும்', today: 'இன்று', threeDays: '3 நாட்கள்', oneWeek: '1 வாரம்', tenDays: '10 நாட்கள்', fifteenDays: '15 நாட்கள்', readFull: 'முழு கட்டுரையைப் படிக்கவும்', applyNow: 'இப்போது விண்ணப்பிக்கவும்', viewDetails: 'விவரங்களைக் காண்க', connect: 'இணைக்கவும்', registerCrop: 'புதிய பயிரைப் பதிவு செய்யவும்', all: 'அனைத்தும்', myCrops: 'எனது பயிர்கள்', government: 'அரசு', technology: 'தொழில்நுட்பம்', market: 'சந்தை', weather: 'வானிலை', noArticles: 'கட்டுரைகள் எதுவும் இல்லை', loading: 'ஏற்றுகிறது', listening: 'கேட்கிறது...', tapToSpeak: 'பேச தட்டவும்', knowMore: 'மேலும் அறிய', setPrice: 'விலை நிர்ணயிக்கவும்', contactForPrice: 'விலைக்கு தொடர்பு கொள்ளவும்', pricePerQuintal: 'குவின்டாலுக்கு விலை', expectedOutput: 'எதிர்பார்க்கப்படும் விளைச்சல்', harvestDate: 'அறுவடை தேதி', acres: 'ஏக்கர்', statusGrowing: 'வளர்கிறது', statusHarvest: 'அறுவடைக்கு தயார்', buyerNew: 'புதியது', buyerNegotiating: 'பேச்சுவார்த்தை நடந்து வருகிறது', buyerConnected: 'இணைக்கப்பட்டது', cropType: 'பயிரின் வகை', farmLocation: 'பண்ணை இடம்', area: 'பகுதி', expectedProduceDate: 'எதிர்பார்க்கப்படும் விளைச்சல் தேதி', cancel: 'ரத்து செய்யவும்', register: 'பதிவு செய்யவும்', edit: 'திருத்தவும்', delete: 'நீக்கவும்', close: 'மூடு' },
  kn: { weatherTitle: 'ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ', mandiTitle: 'ಲೈವ್ ಮಂಡಿ ಬೆಲೆಗಳು', newsTitle: 'ಕೃಷಿ ಸುದ್ದಿಗಳು', schemesTitle: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು', myCropsTitle: 'ನೋಂದಾಯಿಸಿದ ಬೆಳೆಗಳು', buyersTitle: 'ಖರೀದಿದಾರರ ಸಂಪರ್ಕಗಳು', quickActionsTitle: 'ತ್ವರಿತ ಕ್ರಿಯೆಗಳು', expertTitle: 'ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ', today: 'ಇಂದು', threeDays: '3 ದಿನಗಳು', oneWeek: '1 ವಾರ', tenDays: '10 ದಿನಗಳು', fifteenDays: '15 ದಿನಗಳು', readFull: 'ಪೂರ್ಣ ಲೇಖನ ಓದಿ', applyNow: 'ಇದೀಗ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ', viewDetails: 'ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ', connect: 'ಸಂಪರ್ಕಿಸಿ', registerCrop: 'ಹೊಸ ಬೆಳೆ ನೋಂದಾಯಿಸಿ', all: 'ಎಲ್ಲಾ', myCrops: 'ನನ್ನ ಬೆಳೆಗಳು', government: 'ಸರ್ಕಾರ', technology: 'ತಂತ್ರಜ್ಞಾನ', market: 'ಮಾರುಕಟ್ಟೆ', weather: 'ಹವಾಮಾನ', noArticles: 'ಲೇಖನಗಳು ಕಂಡುಬಂದಿಲ್ಲ', loading: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ', listening: 'ಆಲಿಸುತ್ತಿದೆ...', tapToSpeak: 'ಮಾತನಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ', knowMore: 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ', setPrice: 'ಬೆಲೆ ನಿರ್ಧರಿಸಿ', contactForPrice: 'ಬೆಲೆಗಾಗಿ ಸಂಪರ್ಕಿಸಿ', pricePerQuintal: 'ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್ ಬೆಲೆ', expectedOutput: 'ನಿರೀಕ್ಷಿತ ಉತ್ಪನ್ನ', harvestDate: 'ಕಟಾವಿನ ದಿನಾಂಕ', acres: 'ಎಕರೆ', statusGrowing: 'ಬೆಳೆಯುತ್ತಿದೆ', statusHarvest: 'ಕಟಾವಿಗೆ ಸಿದ್ಧ', buyerNew: 'ಹೊಸದು', buyerNegotiating: 'ಮಾತುಕತೆ ನಡೆಯುತ್ತಿದೆ', buyerConnected: 'ಸಂಪರ್ಕಿತವಾಗಿದೆ', cropType: 'ಬೆಳೆಯ ಪ್ರಕಾರ', farmLocation: 'farm ಸ್ಥಳ', area: 'ವಿಸ್ತೀರ್ಣ', expectedProduceDate: 'ನಿರೀಕ್ಷಿತ ಉತ್ಪನ್ನ ದಿನಾಂಕ', cancel: 'ರದ್ದುಮಾಡಿ', register: 'ನೋಂದಾಯಿಸಿ', edit: 'ಸಂಪಾದಿಸಿ', delete: 'ಅಳಿಸಿ', close: 'ಮುಚ್ಚಿ' },
  mr: { weatherTitle: 'हवामान अंदाज', mandiTitle: 'लाइव मंडी भाव', newsTitle: 'शेती बातम्या', schemesTitle: 'सरकारी योजना', myCropsTitle: 'माझी नोंदणीकृत पिके', buyersTitle: 'खरेदीदार संपर्क', quickActionsTitle: 'झटपट क्रिया', expertTitle: 'तज्ञांशी संपर्क साधा', today: 'आज', threeDays: '3 दिवस', oneWeek: '1 आठवडा', tenDays: '10 दिवस', fifteenDays: '15 दिवस', readFull: 'संपूर्ण लेख वाचा', applyNow: 'आता अर्ज करा', viewDetails: 'तपशील पहा', connect: 'संपर्क साधा', registerCrop: 'नवीन पीक नोंदणी करा', all: 'सर्व', myCrops: 'माझी पिके', government: 'सरकार', technology: 'तंत्रज्ञान', market: 'बाजार', weather: 'हवामान', noArticles: 'लेख सापडले नाहीत', loading: 'लोड होत आहे', listening: 'ऐकत आहे...', tapToSpeak: 'बोलण्यासाठी टॅप करा', knowMore: 'अधिक जाणून घ्या', setPrice: 'किंमत निश्चित करा', contactForPrice: 'किंमतीसाठी संपर्क साधा', pricePerQuintal: 'प्रति क्विंटल किंमत', expectedOutput: 'अपेक्षित उत्पादन', harvestDate: 'कापणीची तारीख', acres: 'एकरी', statusGrowing: 'वाढते आहे', statusHarvest: 'कापणीस तयार', buyerNew: 'नवीन', buyerNegotiating: 'चर्चा सुरू आहे', buyerConnected: 'जोडलेले', cropType: 'पिकाचा प्रकार', farmLocation: 'शेताचे ठिकाण', area: 'क्षेत्रफळ', expectedProduceDate: 'अपेक्षित उत्पादन तारीख', cancel: 'रद्द करा', register: 'नोंदणी करा', edit: 'संपादित करा', delete: 'हटवा', close: 'बंद करा' },
  gu: { weatherTitle: 'વાતાવરણ અંદાજ', mandiTitle: 'લાઇવ મંડી ભાવ', newsTitle: 'કૃષિ સમાચાર', schemesTitle: 'સરકારી યોજનાઓ', myCropsTitle: 'મારી નોંધાયેલ પાક', buyersTitle: 'ખરીદદાર કનેક્શન્સ', quickActionsTitle: 'ઝડપી ક્રિયાઓ', expertTitle: 'તજ્ઞોનો સંપર્ક કરો', today: 'આજે', threeDays: '3 દિવસ', oneWeek: '1 અઠવાડિયું', tenDays: '10 દિવસ', fifteenDays: '15 દિવસ', readFull: 'સંપૂર્ણ લેખ વાંચો', applyNow: 'હવે અરજી કરો', viewDetails: 'વિગતો જુઓ', connect: 'કનેક્ટ કરો', registerCrop: 'નવો પાક નોંધાવો', all: 'બધા', myCrops: 'મારા પાક', government: 'સરકાર', technology: 'ટેકનોલોજી', market: 'બજાર', weather: 'વાતાવરણ', noArticles: 'કોઈ લેખ મળ્યો નથી', loading: 'લોડ થઈ રહ્યું છે', listening: 'સાંભળી રહ્યું છે...', tapToSpeak: 'બોલવા માટે ટેપ કરો', knowMore: 'વધુ જાણો', setPrice: 'કીમત નક્કી કરો', contactForPrice: 'કીમત માટે સંપર્ક કરો', pricePerQuintal: 'પ્રતિ ક્વિન્ટલ કીમત', expectedOutput: 'અપેક્ષિત ઉત્પાદન', harvestDate: 'કાપણીની તારીખ', acres: 'એકર', statusGrowing: 'વધી રહ્યું છે', statusHarvest: 'કાપણી માટે તૈયાર', buyerNew: 'નવું', buyerNegotiating: 'વાટાઘાટ ચાલી રહી છે', buyerConnected: 'કનેક્ટેડ', cropType: 'પાકનો પ્રકાર', farmLocation: 'ખેતરનું સ્થાન', area: 'વિસ્તાર', expectedProduceDate: 'અપેક્ષિત ઉત્પાદન તારીખ', cancel: 'રદ કરો', register: 'નોંધાવો', edit: 'સંપાદિત કરો', delete: 'કાઢી નાખો', close: 'બંધ કરો' },
  bn: { weatherTitle: 'আবহাওয়ার পূর্বাভাস', mandiTitle: 'সরাসরি মণ্ডি দর', newsTitle: 'কৃষি সংবাদ', schemesTitle: 'সরকারি প্রকল্প', myCropsTitle: 'আমার নিবন্ধিত ফসল', buyersTitle: 'ক্রেতা সংযোগ', quickActionsTitle: 'দ্রুত কর্ম', expertTitle: 'বিশেষজ্ঞদের সাথে যোগাযোগ করুন', today: 'আজ', threeDays: '3 দিন', oneWeek: '1 সপ্তাহ', tenDays: '10 দিন', fifteenDays: '15 দিন', readFull: 'সম্পূর্ণ নিবন্ধ পড়ুন', applyNow: 'এখন আবেদন করুন', viewDetails: 'বিশদ দেখুন', connect: 'সংযোগ করুন', registerCrop: 'নতুন ফসল নিবন্ধন করুন', all: 'সব', myCrops: 'আমার ফসল', government: 'সরকার', technology: 'প্রযুক্তি', market: 'বাজার', weather: 'আবহাওয়া', noArticles: 'কোনো নিবন্ধ পাওয়া যায়নি', loading: 'লোড হচ্ছে', listening: 'শুনছি...', tapToSpeak: 'বলতে ট্যাপ করুন', knowMore: 'আরও জানুন', setPrice: 'মূল্য নির্ধারণ করুন', contactForPrice: 'মূল্যের জন্য যোগাযোগ করুন', pricePerQuintal: 'প্রতি কুইন্টাল মূল্য', expectedOutput: 'প্রত্যাশিত ফলন', harvestDate: 'কাটার তারিখ', acres: 'একর', statusGrowing: 'বৃদ্ধি পাচ্ছে', statusHarvest: 'কাটার জন্য প্রস্তুত', buyerNew: 'নতুন', buyerNegotiating: 'আলোচনা চলছে', buyerConnected: 'সংযুক্ত', cropType: 'ফসলের প্রকার', farmLocation: 'খামারের অবস্থান', area: 'এলাকা', expectedProduceDate: 'প্রত্যাশিত উৎপাদনের তারিখ', cancel: 'বাতিল করুন', register: 'নিবন্ধন করুন', edit: 'সম্পাদনা করুন', delete: 'মুছুন', close: 'বন্ধ করুন' },
  pa: { weatherTitle: 'ਮੌਸਮ ਦੀ ਭਵਿੱਖਬਾਣੀ', mandiTitle: 'ਲਾਈਵ ਮੰਡੀ ਰੇਟ', newsTitle: 'ਖੇਤੀਬਾੜੀ ਖ਼ਬਰਾਂ', schemesTitle: 'ਸਰਕਾਰੀ ਸਕੀਮਾਂ', myCropsTitle: 'ਮੇਰੀ ਰਜਿਸਟਰਡ ਫਸਲਾਂ', buyersTitle: 'ਖ਼ਰੀਦਦਾਰ ਕਨੈਕਸ਼ਨ', quickActionsTitle: 'ਤੁਰੰਤ ਐਕਸ਼ਨ', expertTitle: 'ਮਾਹਿਰਾਂ ਨਾਲ ਸੰਪਰਕ ਕਰੋ', today: 'ਅੱਜ', threeDays: '3 ਦਿਨ', oneWeek: '1 ਹਫ਼ਤਾ', tenDays: '10 ਦਿਨ', fifteenDays: '15 ਦਿਨ', readFull: 'ਪੂਰਾ ਲੇਖ ਪੜ੍ਹੋ', applyNow: 'ਹੁਣੇ ਅਪਲਾਈ ਕਰੋ', viewDetails: 'ਵੇਰਵੇ ਵੇਖੋ', connect: 'ਜੁੜੋ', registerCrop: 'ਨਵੀਂ ਫਸਲ ਰਜਿਸਟਰ ਕਰੋ', all: 'ਸਾਰੇ', myCrops: 'ਮੇਰੀਆਂ ਫਸਲਾਂ', government: 'ਸਰਕਾਰ', technology: 'ਟੈਕਨੋਲੋਜੀ', market: 'ਮੰਡੀ', weather: 'ਮੌਸਮ', noArticles: 'ਕੋਈ ਲੇਖ ਨਹੀਂ ਮਿਲਿਆ', loading: 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ', listening: 'ਸੁਣ ਰਿਹਾ ਹੈ...', tapToSpeak: 'ਬੋਲਣ ਲਈ ਟੈਪ ਕਰੋ', knowMore: 'ਹੋਰ ਜਾਣੋ', setPrice: 'ਕੀਮਤ ਨਿਰਧਾਰਤ ਕਰੋ', contactForPrice: 'ਕੀਮਤ ਲਈ ਸੰਪਰਕ ਕਰੋ', pricePerQuintal: 'ਪ੍ਰਤੀ ਕੁਇੰਟਲ ਕੀਮਤ', expectedOutput: 'ਅਨੁਮਾਨਿਤ ਪੈਦਾਵਾਰ', harvestDate: 'ਵਾਢੀ ਦੀ ਮਿਤੀ', acres: 'ਏਕੜ', statusGrowing: 'ਵਧ ਰਹੀ ਹੈ', statusHarvest: 'ਵਾਢੀ ਲਈ ਤਿਆਰ', buyerNew: 'ਨਵਾਂ', buyerNegotiating: 'ਗੱਲਬਾਤ ਚੱਲ ਰਹੀ ਹੈ', buyerConnected: 'ਜੁੜਿਆ ਹੋਇਆ', cropType: 'ਫਸਲ ਦੀ ਕਿਸਮ', farmLocation: 'ਖੇਤ ਦੀ ਥਾਂ', area: 'ਖੇਤਰ', expectedProduceDate: 'ਅਨੁਮਾਨਿਤ ਪੈਦਾਵਾਰ ਮਿਤੀ', cancel: 'ਰੱਦ ਕਰੋ', register: 'ਰਜਿਸਟਰ ਕਰੋ', edit: 'ਸੋਧੋ', delete: 'ਹਟਾਓ', close: 'ਬੰਦ ਕਰੋ' },
  or: { weatherTitle: 'ପାଣିପାଗ ପୂର୍ବାଭାସ', mandiTitle: 'ଲାଇଭ୍ ମଣ୍ଡି ଦର', newsTitle: 'କୃଷି ସମାଚାର', schemesTitle: 'ସରକାରୀ ଯୋଜନା', myCropsTitle: 'ମୋର ପଞ୍ଜୀକୃତ ଫସଲ', buyersTitle: 'କ୍ରେତା ସଂଯୋଗ', quickActionsTitle: 'ଶୀଘ୍ର କାର୍ଯ୍ୟ', expertTitle: 'ବିଶେଷଜ୍ଞଙ୍କ ସହ ଯୋଗାଯୋଗ କରନ୍ତୁ', today: 'ଆଜି', threeDays: '3 ଦିନ', oneWeek: '1 ସପ୍ତାହ', tenDays: '10 ଦିନ', fifteenDays: '15 ଦିନ', readFull: 'ସମ୍ପୂର୍ଣ୍ଣ ପ୍ରବନ୍ଧ ପଢନ୍ତୁ', applyNow: 'ଏବେ ଆବେଦନ କରନ୍ତୁ', viewDetails: 'ବିବରଣୀ ଦେଖନ୍ତୁ', connect: 'ସଂଯୋଗ କରନ୍ତୁ', registerCrop: 'ନୂଆ ଫସଲ ପଞ୍ଜୀକରଣ କରନ୍ତୁ', all: 'ସମସ୍ତ', myCrops: 'ମୋର ଫସଲ', government: 'ସରକାର', technology: 'ପ୍ରଯୁକ୍ତିବିଦ୍ୟା', market: 'ବଜାର', weather: 'ପାଣିପାଗ', noArticles: 'କୌଣସି ପ୍ରବନ୍ଧ ମିଳିଲା ନାହିଁ', loading: 'ଲୋଡ୍ ହେଉଛି', listening: 'ଶୁଣୁଛି...', tapToSpeak: 'କହିବାକୁ ଟ୍ୟାପ୍ କରନ୍ତୁ', knowMore: 'ଅଧିକ ଜାଣନ୍ତୁ', setPrice: 'ମୂଲ୍ୟ ନିର୍ଧାରଣ କରନ୍ତୁ', contactForPrice: 'ମୂଲ୍ୟ ପାଇଁ ସମ୍ପର୍କ କରନ୍ତୁ', pricePerQuintal: 'ପ୍ରତି କ୍ବିଣ୍ଟାଲ୍ ମୂଲ୍ୟ', expectedOutput: 'ପ୍ରତ୍ୟାଶିତ ଫଳନ', harvestDate: 'କାଟଣୀ ତାରିଖ', acres: 'ଏକର', statusGrowing: 'ବଢ଼ୁଛି', statusHarvest: 'କାଟଣୀ ପାଇଁ ପ୍ରସ୍ତୁତ', buyerNew: 'ନୂଆ', buyerNegotiating: 'ଆଲୋଚନା ଚାଲିଛି', buyerConnected: 'ସଂଯୁକ୍ତ', cropType: 'ଫସଲ ପ୍ରକାର', farmLocation: 'ଫାର୍ମ ସ୍ଥାନ', area: 'କ୍ଷେତ୍ର', expectedProduceDate: 'ପ୍ରତ୍ୟାଶିତ ଉତ୍ପାଦନ ତାରିଖ', cancel: 'ବାତିଲ୍ କରନ୍ତୁ', register: 'ପଞ୍ଜୀକରଣ କରନ୍ତୁ', edit: 'ସମ୍ପାଦନା କରନ୍ତୁ', delete: 'ବିଲୋପ କରନ୍ତୁ', close: 'ବନ୍ଦ କରନ୍ତୁ' },
  ml: { weatherTitle: 'കാലാവസ്ഥാ പ്രവചനം', mandiTitle: 'തത്സമയ മണ്ഡി വിലകൾ', newsTitle: 'കൃഷി വാർത്തകൾ', schemesTitle: 'സർക്കാർ പദ്ധതികൾ', myCropsTitle: 'എന്റെ രജിസ്റ്റർ ചെയ്ത വിളകൾ', buyersTitle: 'വാങ്ങുന്നവരുടെ ബന്ധങ്ങൾ', quickActionsTitle: 'ദ്രുത പ്രവർത്തനങ്ങൾ', expertTitle: 'വിദഗ്ധരുമായി ബന്ധപ്പെടുക', today: 'ഇന്ന്', threeDays: '3 ദിവസം', oneWeek: '1 ആഴ്ച', tenDays: '10 ദിവസം', fifteenDays: '15 ദിവസം', readFull: 'പൂർണ്ണ ലേഖനം വായിക്കുക', applyNow: 'ഇപ്പോൾ അപേക്ഷിക്കുക', viewDetails: 'വിശദാംശങ്ങൾ കാണുക', connect: 'ബന്ധപ്പെടുക', registerCrop: 'പുതിയ വിള രജിസ്റ്റർ ചെയ്യുക', all: 'എല്ലാം', myCrops: 'എന്റെ വിളകൾ', government: 'സർക്കാർ', technology: 'സാങ്കേതികവിദ്യ', market: 'വിപണി', weather: 'കാലാവസ്ഥ', noArticles: 'ലേഖനങ്ങളൊന്നും കണ്ടെത്തിയില്ല', loading: 'ലോഡ് ചെയ്യുന്നു', listening: 'ശ്രദ്ധിക്കുന്നു...', tapToSpeak: 'സംസാരിക്കാൻ ടാപ്പ് ചെയ്യുക', knowMore: 'കൂടുതൽ അറിയുക', setPrice: 'വില നിശ്ചയിക്കുക', contactForPrice: 'വിലയ്ക്കായി ബന്ധപ്പെടുക', pricePerQuintal: 'ഓരോ ക്വിന്റലിനും വില', expectedOutput: 'പ്രതീക്ഷിക്കുന്ന വിളവ്', harvestDate: 'കൊയ്ത്ത് തീയതി', acres: 'ഏക്കർ', statusGrowing: 'വളരുന്നു', statusHarvest: 'കൊയ്ത്തിന് തയ്യാർ', buyerNew: 'പുതിയത്', buyerNegotiating: 'ചർച്ച നടക്കുന്നു', buyerConnected: 'ബന്ധിപ്പിച്ചു', cropType: 'വിളയുടെ തരം', farmLocation: 'വളപ്പിന്റെ സ്ഥലം', area: 'സ്ഥലം', expectedProduceDate: 'പ്രതീക്ഷിക്കുന്ന വിളവിന്റെ തീയതി', cancel: 'റദ്ദാക്കുക', register: 'രജിസ്റ്റർ ചെയ്യുക', edit: 'എഡിറ്റ് ചെയ്യുക', delete: 'നീക്കം ചെയ്യുക', close: 'അടയ്ക്കുക' },
  as: { weatherTitle: 'বতৰ পূৰ্বাণী', mandiTitle: 'লাইভ মণ্ডী মূল্য', newsTitle: 'কৃষি সংবাদ', schemesTitle: 'চৰকাৰী আঁচনি', myCropsTitle: 'মোৰ পঞ্জীয়ন কৃত শস্য', buyersTitle: 'ক্ৰেতা সংযোগ', quickActionsTitle: 'দ্রুত কাৰ্য্য', expertTitle: 'বিশেষজ্ঞৰ সৈতে সংযোগ কৰক', today: 'আজি', threeDays: '3 দিন', oneWeek: '1 সপ্তাহ', tenDays: '10 দিন', fifteenDays: '15 দিন', readFull: 'সম্পূৰ্ণ প্ৰবন্ধ পঢ়ক', applyNow: 'এতিয়া আবেদন কৰক', viewDetails: 'বিবৰণ চাওক', connect: 'সংযোগ কৰক', registerCrop: 'নতুন শস্য পঞ্জীয়ন কৰক', all: 'সকলো', myCrops: 'মোৰ শস্য', government: 'চৰকাৰ', technology: 'প্ৰযুক্তি', market: 'বজাৰ', weather: 'বতৰ', noArticles: 'কোনো প্ৰবন্ধ পোৱা নগ’ল', loading: 'লোড হৈ আছে', listening: 'শুনিছে...', tapToSpeak: 'ক’বলৈ টেপ কৰক', knowMore: 'আৰু জানক', setPrice: 'মূল্য নিৰ্ধাৰণ কৰক', contactForPrice: 'মূল্যৰ বাবে সংযোগ কৰক', pricePerQuintal: 'প্ৰতি কুইন্টাল মূল্য', expectedOutput: 'প্ৰত্যাশিত উৎপাদন', harvestDate: 'দায়া তাৰিখ', acres: 'একৰ', statusGrowing: 'বঢ়ি আছে', statusHarvest: 'দায়াৰ বাবে সাজু', buyerNew: 'নতুন', buyerNegotiating: 'আলোচনা চলি আছে', buyerConnected: 'সংযুক্ত', cropType: 'শস্যৰ প্ৰকাৰ', farmLocation: 'খেতিৰ স্থান', area: 'ক্ষেত্ৰ', expectedProduceDate: 'প্ৰত্যাশিত উৎপাদন তাৰিখ', cancel: 'বাতিল কৰক', register: 'পঞ্জীয়ন কৰক', edit: 'সম্পাদনা কৰক', delete: 'বিলোপ কৰক', close: 'বন্ধ কৰক' },
};

/* ------------------------------------------------------------------ */
/*  Helper Functions                                                   */
/* ------------------------------------------------------------------ */

function getWeatherIcon(code: number) {
  const entry = WEATHER_CODES[code];
  return entry || { label: 'Unknown', icon: Cloud };
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
}

function getStatusBadgeColor(status: string) {
  switch (status) {
    case 'Growing': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Harvesting': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'Sowing': return 'bg-green-100 text-green-700 border-green-200';
    case 'New': return 'bg-green-100 text-green-700 border-green-200';
    case 'Negotiating': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'Connected': return 'bg-blue-100 text-blue-700 border-blue-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function Dashboard() {
  const navigate = useNavigate();

  /* -- Weather State -- */
  const [weatherData, setWeatherData] = useState<WeatherDay[]>([]);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherFilter, setWeatherFilter] = useState('1 Week');

  /* -- Mandi Ticker -- */
  const [selectedMandi, setSelectedMandi] = useState<MandiPrice | null>(null);

  /* -- News -- */
  const [newsCategory, setNewsCategory] = useState('All');

  /* -- Language -- */
  const { selectedLang, setLanguage } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);

  /* -- Voice Search -- */
  const [voiceListening, setVoiceListening] = useState(false);

  /* -- Crops -- */
  const [crops, setCrops] = useState(MY_CROPS);

  /* -- Refs -- */
  const tickerRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  /* ---------------------------------------------------------------- */
  /*  Fetch Weather                                                    */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    let cancelled = false;
    async function fetchWeather() {
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
          date: t,
          tempMax: daily.temperature_2m_max[i],
          tempMin: daily.temperature_2m_min[i],
          precipitation: daily.precipitation_sum[i],
          windSpeed: daily.windspeed_10m_max[i],
          weatherCode: daily.weathercode[i],
          humidity: current.relative_humidity_2m ?? 65,
          uvIndex: daily.uv_index_max?.[i] ?? 5,
          visibility: current.visibility ? Math.round(current.visibility / 1000) : 10,
          sunrise: daily.sunrise?.[i] ? new Date(daily.sunrise[i]).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }) : '6:00 AM',
          sunset: daily.sunset?.[i] ? new Date(daily.sunset[i]).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }) : '6:30 PM',
          pressure: current.surface_pressure ? Math.round(current.surface_pressure) : 1013,
          dewPoint: current.dew_point_2m ? Math.round(current.dew_point_2m) : 24,
        }));
        setWeatherData(days);
      } catch {
        setWeatherData(FALLBACK_WEATHER);
      } finally {
        setWeatherLoading(false);
      }
    }
    fetchWeather();
    return () => { cancelled = true; };
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Click outside for language dropdown                              */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Filtered weather                                                 */
  /* ---------------------------------------------------------------- */

  const filteredWeather = useCallback(() => {
    if (!weatherData.length) return [];
    const map: Record<string, number> = { 'Today': 1, '3 Days': 3, '1 Week': 7, '10 Days': 10, '15 Days': 15 };
    const days = map[weatherFilter] || 7;
    return weatherData.slice(0, days);
  }, [weatherData, weatherFilter]);

  const filteredNews = newsCategory === 'All'
    ? NEWS_ARTICLES
    : NEWS_ARTICLES.filter(n => n.category === newsCategory);

  const weatherDays = filteredWeather();

  /* ---------------------------------------------------------------- */
  /*  Voice search toggle                                              */
  /* ---------------------------------------------------------------- */

  const toggleVoice = () => {
    setVoiceListening(prev => !prev);
    if (!voiceListening) {
      setTimeout(() => setVoiceListening(false), 5000);
    }
  };

  /* ---------------------------------------------------------------- */
  /*  Delete crop handler                                              */
  /* ---------------------------------------------------------------- */

  const handleDeleteCrop = (id: number) => {
    setCrops(prev => prev.filter(c => c.id !== id));
  };

  /* ---------------------------------------------------------------- */
  /*  Translation helper                                               */
  /* ---------------------------------------------------------------- */

  const t = (key: string) => TRANSLATIONS[selectedLang]?.[key] || TRANSLATIONS['en'][key];

  return (
    <DashboardLayout>
      <div className="space-y-3">

        {/* ====== HERO: Welcome + Quick Summary ====== */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden rounded-xl bg-krishiva-green p-3 text-white"
        >
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="font-poppins font-bold text-lg leading-tight">Welcome back, Rajesh!</h1>
                <p className="text-white/70 text-[11px]">Here&apos;s what&apos;s happening on your farm</p>
              </div>
              <div className="flex items-center gap-2">
                {/* Language Selector */}
                <div className="relative" ref={langRef}>
                  <button
                    onClick={() => setLangOpen(!langOpen)}
                    className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 transition-colors rounded-lg px-2.5 py-1.5 text-xs"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>{LANGUAGES.find(l => l.code === selectedLang)?.native}</span>
                  </button>
                  <AnimatePresence>
                    {langOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -5, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-border-light z-50 p-3"
                      >
                        <p className="text-[8px] text-text-muted leading-none mb-2 px-2">{t('all') === 'All' ? 'Select Language' : t('all') === 'सभी' ? 'भाषा चुनें' : 'Select Language'}</p>
                        <div className="grid grid-cols-3 gap-1.5">
                          {LANGUAGES.map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                              className={`flex items-center justify-center gap-1 px-2 py-2 rounded-lg text-xs font-medium border transition-all ${
                                selectedLang === lang.code
                                  ? 'border-krishiva-green bg-krishiva-green text-white'
                                  : 'border-border-light text-text-secondary hover:border-border-green'
                              }`}
                            >
                              {selectedLang === lang.code && <Check className="w-3 h-3" />}
                              <span>{lang.native}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-4 gap-1.5 mt-2">
              {[
                { label: 'Area', value: '25ac', icon: Sprout },
                { label: 'Crops', value: '3', icon: CheckCircle2 },
                { label: 'Alerts', value: '5', icon: Bell },
                { label: 'Wallet', value: '12.4k', icon: Wallet },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.04 }}
                  className="bg-white/10 backdrop-blur-sm rounded-md p-1.5"
                >
                  <div className="flex items-center gap-1 mb-0">
                    <stat.icon className="w-2.5 h-2.5 text-white/50" />
                    <span className="text-white/40 text-[9px]">{stat.label}</span>
                  </div>
                  <p className="font-poppins font-semibold text-xs">{stat.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ====== MANDI TICKER ====== */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.3 }}
        >
          <Card className="border-border-light shadow-card overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center gap-2 px-3 py-2 border-b border-border-light bg-amber-50/50">
                <TrendingUp className="w-4 h-4 text-harvest-gold shrink-0" />
                <h3 className="font-poppins font-semibold text-xs text-text-primary shrink-0">{t('mandiTitle')}</h3>
                <div className="flex-1 overflow-hidden" ref={tickerRef}>
                  <div className="flex gap-6 animate-scroll-x whitespace-nowrap" style={{ animation: 'scroll-x 30s linear infinite' }}>
                    {[...MANDI_PRICES, ...MANDI_PRICES].map((item, idx) => (
                      <button
                        key={`${item.commodity}-${idx}`}
                        onClick={() => setSelectedMandi(item)}
                        className="flex items-center gap-1.5 text-sm hover:bg-amber-100/50 px-2 py-1 rounded-lg transition-colors shrink-0"
                      >
                        <span className="font-medium text-text-primary">{item.commodity}</span>
                        <span className="text-text-secondary">Rs {item.price.toLocaleString()}/{item.unit}</span>
                        {item.trend === 'up' && <ArrowUpRight className="w-3.5 h-3.5 text-success-green" />}
                        {item.trend === 'down' && <ArrowDownRight className="w-3.5 h-3.5 text-error-red" />}
                        {item.trend === 'stable' && <Minus className="w-3.5 h-3.5 text-text-muted" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mandi Detail */}
              <AnimatePresence>
                {selectedMandi && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-bg-primary">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-poppins font-semibold text-lg text-text-primary">{selectedMandi.commodity}</p>
                          <p className="text-[7px] text-text-muted leading-none">Current market rate across major mandis</p>
                        </div>
                        <button onClick={() => setSelectedMandi(null)} className="p-1.5 rounded-lg hover:bg-white transition-colors">
                          <X className="w-4 h-4 text-text-muted" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                          { mandi: 'Guntur', price: selectedMandi.price, change: selectedMandi.change },
                          { mandi: 'Vijayawada', price: selectedMandi.price - 80, change: selectedMandi.change - 30 },
                          { mandi: 'Nellore', price: selectedMandi.price + 40, change: selectedMandi.change + 15 },
                          { mandi: 'Kurnool', price: selectedMandi.price - 50, change: selectedMandi.change - 20 },
                        ].map((m) => (
                          <div key={m.mandi} className="bg-white rounded-xl p-3 border border-border-light">
                            <p className="text-[7px] text-text-muted leading-none">{m.mandi}</p>
                            <p className="font-semibold text-[10px] leading-none text-text-primary">Rs {m.price.toLocaleString()}/q</p>
                            <div className="flex items-center gap-1 mt-0.5">
                              {m.change >= 0 ? (
                                <TrendingUp className="w-3 h-3 text-success-green" />
                              ) : (
                                <TrendingDown className="w-3 h-3 text-error-red" />
                              )}
                              <span className={`text-xs ${m.change >= 0 ? 'text-success-green' : 'text-error-red'}`}>
                                {m.change >= 0 ? '+' : ''}{m.change}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* ====== WEATHER WIDGET ====== */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          id="weather"
        >
          <Card className="border-border-light shadow-card">
            <CardHeader className="pb-2 pt-4 px-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Cloud className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-semibold text-[10px] text-text-primary leading-tight">{t('weatherTitle')}</h3>
                    <p className="text-[10px] text-text-muted flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5" /> Guntur, AP
                    </p>
                  </div>
                </div>
                {/* Filter Pills */}
                <div className="flex gap-1">
                  {[
                    { key: 'Today', tKey: 'today' },
                    { key: '3 Days', tKey: 'threeDays' },
                    { key: '1 Week', tKey: 'oneWeek' },
                    { key: '10 Days', tKey: 'tenDays' },
                    { key: '15 Days', tKey: 'fifteenDays' },
                  ].map((filter) => (
                    <button
                      key={filter.key}
                      onClick={() => setWeatherFilter(filter.key)}
                      className={`px-2 py-1 rounded-md text-[10px] font-medium transition-all ${
                        weatherFilter === filter.key
                          ? 'bg-krishiva-green text-white'
                          : 'bg-bg-primary text-text-secondary hover:bg-krishiva-green/10'
                      }`}
                    >
                      {t(filter.tKey)}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-3">
              {weatherLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-12 w-full rounded-lg" />
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <Skeleton key={i} className="h-14 rounded-md" />
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {/* Current Conditions */}
                  {weatherDays.length > 0 && (
                    <div className="flex items-center gap-2 bg-blue-50/50 rounded-lg p-2 mb-2">
                      <div className="text-center shrink-0 w-10">
                        {(() => {
                          const Icon = getWeatherIcon(weatherDays[0].weatherCode).icon;
                          return <Icon className="w-7 h-7 text-blue-500 mx-auto" />;
                        })()}
                        <p className="text-[9px] text-text-secondary leading-tight">{getWeatherIcon(weatherDays[0].weatherCode).label}</p>
                      </div>
                      <div className="flex-1 grid grid-cols-4 gap-1">
                        {[
                          { icon: Thermometer, label: 'Max', value: `${weatherDays[0].tempMax}°C`, color: 'text-error-red' },
                          { icon: Thermometer, label: 'Min', value: `${weatherDays[0].tempMin}°C`, color: 'text-blue-500' },
                          { icon: Droplets, label: 'Rain', value: `${weatherDays[0].precipitation}mm`, color: 'text-cyan-500' },
                          { icon: Wind, label: 'Wind', value: `${weatherDays[0].windSpeed}km/h`, color: 'text-text-secondary' },
                        ].map((s) => (
                          <div key={s.label} className="text-center bg-white/60 rounded-md py-1">
                            <s.icon className={`w-3 h-3 ${s.color} mx-auto`} />
                            <p className="text-[8px] text-text-muted leading-none">{s.label}</p>
                            <p className="font-poppins font-semibold text-[11px] leading-tight">{s.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Enhanced Weather Metrics */}
                  {weatherDays.length > 0 && (
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {[
                        { icon: Droplets, label: 'Hum', value: `${weatherDays[0].humidity}%`, color: 'text-blue-500' },
                        { icon: Sun, label: 'UV', value: `${weatherDays[0].uvIndex}`, color: 'text-amber-500' },
                        { icon: Eye, label: 'Vis', value: `${weatherDays[0].visibility}km`, color: 'text-cyan-500' },
                        { icon: Sunrise, label: 'Rise', value: weatherDays[0].sunrise, color: 'text-harvest-gold' },
                        { icon: Sunset, label: 'Set', value: weatherDays[0].sunset, color: 'text-soil-brown' },
                        { icon: Gauge, label: 'Pres', value: `${weatherDays[0].pressure}hPa`, color: 'text-purple-500' },
                        { icon: CloudDrizzle, label: 'Dew', value: `${weatherDays[0].dewPoint}°C`, color: 'text-indigo-500' },
                      ].map((m) => (
                        <div key={m.label} className="bg-blue-50/50 rounded-md p-1 text-center">
                          <m.icon className={`w-3 h-3 ${m.color} mx-auto`} />
                          <p className="text-[7px] text-text-muted leading-none">{m.label}</p>
                          <p className="font-poppins font-semibold text-[10px] text-text-primary leading-tight">{m.value}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Forecast Cards */}
                  <div className="grid grid-cols-7 gap-1">
                    {weatherDays.slice(0, 7).map((day, i) => {
                      const wc = getWeatherIcon(day.weatherCode);
                      const Icon = wc.icon;
                      return (
                        <motion.div
                          key={day.date}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.02 }}
                          className="bg-bg-primary rounded-md p-1 text-center"
                        >
                          <p className="text-[8px] text-text-muted mb-0">{i === 0 ? t('today') : formatDate(day.date)}</p>
                          <Icon className="w-4 h-4 mx-auto text-blue-500" />
                          <p className="font-semibold text-[11px] text-text-primary leading-tight">{day.tempMax}&deg;</p>
                          <p className="text-[9px] text-text-muted">{day.tempMin}&deg;</p>
                          {day.precipitation > 0 && (
                            <div className="flex items-center justify-center gap-0">
                              <Droplets className="w-2 h-2 text-cyan-500" />
                              <span className="text-[8px] text-cyan-600">{day.precipitation}mm</span>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* ====== AGRICULTURE NEWS FEED ====== */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
        >
          <Card className="border-border-light shadow-card">
            <CardHeader className="pb-1 pt-2 px-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
                    <Newspaper className="w-3.5 h-3.5 text-red-500" />
                  </div>
                  <h3 className="font-poppins font-semibold text-xs leading-tight text-text-primary">{t('newsTitle')}</h3>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {[
                    { key: 'All', tKey: 'all' },
                    { key: 'My Crops', tKey: 'myCrops' },
                    { key: 'Government', tKey: 'government' },
                    { key: 'Technology', tKey: 'technology' },
                    { key: 'Market', tKey: 'market' },
                    { key: 'Weather', tKey: 'weather' },
                  ].map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setNewsCategory(cat.key)}
                      className={`px-1.5 py-0.5 rounded text-[9px] font-medium transition-all ${
                        newsCategory === cat.key
                          ? 'bg-krishiva-green text-white'
                          : 'bg-bg-primary text-text-secondary hover:bg-krishiva-green/10'
                      }`}
                    >
                      {t(cat.tKey)}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={newsCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3"
                >
                  {filteredNews.map((article) => (
                    <div
                      key={article.id}
                      className="flex flex-col sm:flex-row sm:items-start gap-3 p-4 bg-bg-primary rounded-xl hover:bg-krishiva-green/5 transition-colors group cursor-pointer"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-[10px] h-5 px-1.5 border-krishiva-green text-krishiva-green">
                            {article.source}
                          </Badge>
                          <span className="text-[10px] text-text-muted flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {article.date}
                          </span>
                        </div>
                        <h4 className="font-medium text-sm text-text-primary group-hover:text-krishiva-green transition-colors mb-1">
                          {article.title}
                        </h4>
                        <p className="text-xs text-text-secondary line-clamp-2">{article.snippet}</p>
                      </div>
                      <div
                        className="shrink-0 flex items-center gap-1 text-krishiva-green text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        onClick={() => window.open(article.url, '_blank')}
                      >
                        <span>{t('readFull')}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* ====== GOVERNMENT SCHEMES ====== */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          id="schemes"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center">
              <Landmark className="w-3.5 h-3.5 text-orange-500" />
            </div>
            <h3 className="font-poppins font-semibold text-xs leading-tight text-text-primary">{t('schemesTitle')}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SCHEMES.map((scheme, i) => (
              <motion.a
                key={scheme.name}
                href={scheme.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.06 }}
                className={`block bg-white rounded-xl p-3 border-l-4 ${scheme.borderColor} shadow-card hover:shadow-card-hover transition-all group`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-7 h-7 rounded-lg ${scheme.bgColor} flex items-center justify-center`}>
                    <scheme.icon className="w-3.5 h-3.5 text-text-primary" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-krishiva-green transition-colors" />
                </div>
                <h4 className="font-poppins font-semibold text-[10px] leading-none text-text-primary mb-1">{scheme.name}</h4>
                <p className="text-xs text-text-secondary mb-3">{scheme.description}</p>
                {scheme.amount && (
                  <Badge className="bg-krishiva-green/10 text-krishiva-green border-krishiva-green/20 text-[10px]">
                    {scheme.amount}
                  </Badge>
                )}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* ====== MY REGISTERED CROPS ====== */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center">
              <Sprout className="w-3.5 h-3.5 text-green-500" />
            </div>
            <h3 className="font-poppins font-semibold text-xs leading-tight text-text-primary">{t('myCropsTitle')}</h3>
          </div>
          <div className="space-y-3">
            {crops.map((crop, i) => (
              <motion.div
                key={crop.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.06 }}
              >
                <Card className="border-border-light shadow-card hover:shadow-card-hover transition-all">
                  <CardContent className="p-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center">
                          <Sprout className="w-3.5 h-3.5 text-green-500" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-poppins font-semibold text-[10px] leading-none text-text-primary">{crop.name}</p>
                            <Badge variant="outline" className={`text-[10px] h-5 ${getStatusBadgeColor(crop.status)}`}>
                              {crop.status}
                            </Badge>
                          </div>
                          <p className="text-[7px] text-text-muted leading-none">{crop.acres} acres &middot; Expected: {crop.output} &middot; Harvest: {crop.harvestDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-[7px] text-text-muted leading-none">Price</p>
                          <p className="font-semibold text-[10px] leading-none text-text-primary">{crop.price}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="text-text-secondary text-xs h-8 px-2">
                            <Edit3 className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-error-red text-xs h-8 px-2"
                            onClick={() => handleDeleteCrop(crop.id)}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            <Button
              variant="outline"
              className="w-full border-dashed border-2 border-border-light hover:border-krishiva-green hover:text-krishiva-green hover:bg-krishiva-green/5 rounded-xl h-12 text-sm"
            >
              <Plus className="w-4 h-4 mr-2" /> {t('registerCrop')}
            </Button>
          </div>
        </motion.div>

        {/* ====== BUYER CONNECTIONS ====== */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-md bg-blue-50 flex items-center justify-center">
              <Users className="w-3.5 h-3.5 text-blue-500" />
            </div>
            <h3 className="font-poppins font-semibold text-xs leading-tight text-text-primary">{t('buyersTitle')}</h3>
          </div>
          <div className="space-y-3">
            {BUYERS.map((buyer, i) => (
              <motion.div
                key={buyer.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.06 }}
              >
                <Card className="border-border-light shadow-card hover:shadow-card-hover transition-all">
                  <CardContent className="p-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-semibold text-[10px] leading-none">
                          {buyer.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-poppins font-semibold text-[10px] leading-none text-text-primary">{buyer.name}</p>
                            <Badge variant="outline" className={`text-[10px] h-5 ${getStatusBadgeColor(buyer.status)}`}>
                              {buyer.status}
                            </Badge>
                          </div>
                          <p className="text-[7px] text-text-muted leading-none">Interested in: {buyer.commodity} &middot; Qty: {buyer.quantity}</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-krishiva-green hover:bg-[#1B5E20] text-white rounded-xl h-9 text-xs px-4"
                        onClick={() => {
                          const toastEl = document.createElement('div');
                          toastEl.className = 'fixed top-4 left-1/2 -translate-x-1/2 bg-krishiva-green text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm font-medium';
                          toastEl.textContent = `Connection request sent to ${buyer.name}!`;
                          document.body.appendChild(toastEl);
                          setTimeout(() => toastEl.remove(), 2000);
                        }}
                      >
                        {t('connect')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ====== QUICK ACTIONS GRID ====== */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center">
              <Star className="w-5 h-5 text-gray-500" />
            </div>
            <h3 className="font-poppins font-semibold text-xs leading-tight text-text-primary">{t('quickActionsTitle')}</h3>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {QUICK_ACTIONS.map((action, i) => (
              <motion.button
                key={action.label}
                onClick={() => {
                  if (action.href.startsWith('#')) {
                    const el = document.getElementById(action.href.slice(1));
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate(action.href);
                  }
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.04 }}
                className="flex flex-col items-center gap-1 p-2 bg-white rounded-xl border border-border-light shadow-card hover:shadow-card-hover transition-all group cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-text-primary group-hover:text-krishiva-green transition-colors text-center">
                  {action.label}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ====== VOICE SEARCH FLOATING BUTTON ====== */}
        <div className="fixed bottom-24 right-5 z-40 lg:bottom-8">
          <motion.button
            onClick={toggleVoice}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-14 h-14 rounded-full shadow-voice flex items-center justify-center transition-all ${
              voiceListening ? 'bg-error-red animate-pulse' : 'bg-krishiva-green hover:bg-[#1B5E20]'
            }`}
          >
            {voiceListening ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}
          </motion.button>
          {/* Pulse rings when listening */}
          {voiceListening && (
            <>
              <span className="absolute inset-0 rounded-full bg-error-red/30 animate-ping" />
              <span className="absolute inset-0 rounded-full bg-error-red/20 animate-pulse" />
            </>
          )}
        </div>

        {/* Voice Listening Overlay */}
        <AnimatePresence>
          {voiceListening && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
              onClick={() => setVoiceListening(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-3xl p-8 text-center max-w-sm mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-20 h-20 rounded-full bg-krishiva-green/10 flex items-center justify-center mx-auto mb-4 relative">
                  <Mic className="w-8 h-8 text-krishiva-green" />
                  <span className="absolute inset-0 rounded-full bg-krishiva-green/20 animate-ping" />
                </div>
                <h3 className="font-poppins font-semibold text-xs leading-tight text-text-primary mb-2">{t('listening')}</h3>
                <p className="text-[8px] text-text-secondary leading-none mb-4">{t('tapToSpeak')}</p>
                <Button
                  variant="outline"
                  className="rounded-xl border-error-red text-error-red hover:bg-error-red hover:text-white"
                  onClick={() => setVoiceListening(false)}
                >
                  <X className="w-4 h-4 mr-1.5" /> {t('cancel')}
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      {/* CSS keyframes for mandi ticker scroll */}
      <style>{`
        @keyframes scroll-x {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      </div>
    </DashboardLayout>
  );
}
