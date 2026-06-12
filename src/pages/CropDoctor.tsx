import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Upload,
  Mic,
  Leaf,
  Check,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  Phone,
  ImageIcon,
  Sun,
  Focus,
  Hand,
  Stethoscope,
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';


/* ───────── mock data ───────── */

const scanHistory = [
  { id: 1, crop: 'Cotton', diagnosis: 'Healthy', date: 'June 1', status: 'healthy', confidence: 96 },
  { id: 2, crop: 'Tomato', diagnosis: 'Early Blight', date: 'June 10', status: 'warning', confidence: 87 },
  { id: 3, crop: 'Chili', diagnosis: 'Aphids', date: 'June 5', status: 'alert', confidence: 92 },
];

const commonDiseases = [
  { name: 'Early Blight', crop: 'Tomato, Potato', severity: 'High' as const },
  { name: 'Leaf Spot', crop: 'Multiple crops', severity: 'Medium' as const },
  { name: 'Aphids', crop: 'Most vegetables', severity: 'Medium' as const },
  { name: 'Root Rot', crop: 'Pulses, Cotton', severity: 'High' as const },
  { name: 'Powdery Mildew', crop: 'Cucurbits, Grapes', severity: 'Medium' as const },
];

const treatmentSteps = [
  'Remove and destroy infected leaves immediately',
  'Apply Mancozeb 75% WP @ 2.5g/liter of water',
  'Ensure proper plant spacing for air circulation',
  'Avoid overhead irrigation — water at the base',
];

const preventiveMeasures = [
  'Rotate crops — avoid solanaceous family next season',
  'Use disease-resistant varieties',
  'Apply neem cake to soil during preparation',
  'Monitor regularly during humid weather',
];

const symptomsList = [
  'Dark brown spots with concentric rings on leaves',
  'Yellowing and chlorosis around the spots',
  'Symptoms start from older lower leaves',
  'Gradual upward spread if untreated',
];

/* ───────── animation helpers ───────── */

const easeOut = [0, 0, 0.2, 1] as [number, number, number, number];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: easeOut } },
};

/* ───────── component ───────── */

export default function CropDoctor() {
  const [analyzing, setAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(() => {
    setAnalyzing(true);
    setShowResult(false);
    // Simulate analysis
    setTimeout(() => {
      setAnalyzing(false);
      setShowResult(true);
    }, 2500);
  }, []);

  const handleReset = useCallback(() => {
    setAnalyzing(false);
    setShowResult(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const severityColor = (s: string) => {
    if (s === 'High') return 'bg-error-red/10 text-error-red border-error-red/20';
    if (s === 'Medium') return 'bg-warning-amber/10 text-warning-amber border-warning-amber/20';
    return 'bg-success-green/10 text-success-green border-success-green/20';
  };

  const statusIcon = (status: string) => {
    if (status === 'healthy') return <Check className="w-4 h-4 text-success-green" />;
    if (status === 'warning') return <AlertTriangle className="w-4 h-4 text-warning-amber" />;
    return <AlertTriangle className="w-4 h-4 text-error-red" />;
  };

  const statusBadge = (status: string) => {
    if (status === 'healthy') return 'bg-success-green/10 text-success-green';
    if (status === 'warning') return 'bg-warning-amber/10 text-warning-amber';
    return 'bg-error-red/10 text-error-red';
  };

  return (
    <DashboardLayout>
      <div className="max-w-[1000px] mx-auto space-y-6 pb-8">
        {/* ─── Hero Banner ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-krishiva-green via-leaf-green to-border-green"
        >
          <div className="absolute inset-0 bg-[url('/crop-doctor-hero.jpg')] bg-cover bg-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-krishiva-green/90 to-leaf-green/70" />
          <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-10">
            <div className="flex items-center gap-2 mb-2">
              <Stethoscope className="w-5 h-5 text-white/90" />
              <span className="text-white/80 text-sm font-medium font-inter">AI-Powered Diagnosis</span>
            </div>
            <h1 className="font-poppins font-bold text-[32px] text-white leading-tight mb-2">
              AI Crop Doctor
            </h1>
            <p className="text-white/85 text-base font-inter max-w-md">
              Upload a photo of your crop and get instant diagnosis with treatment recommendations
            </p>
          </div>
        </motion.div>

        {/* ─── Upload Section ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
        >
          <Card className="border-2 border-dashed border-border-green bg-gradient-to-b from-krishiva-green/[0.03] to-bg-primary rounded-[20px] p-8 sm:p-12">
            <div className="text-center max-w-[500px] mx-auto">
              {/* Upload illustration */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="mb-6"
              >
                <div className="w-[120px] h-[120px] rounded-full bg-krishiva-green/10 flex items-center justify-center mx-auto">
                  <div className="relative">
                    <Leaf className="w-14 h-14 text-krishiva-green" />
                    <Sparkles className="w-6 h-6 text-harvest-gold absolute -top-2 -right-2" />
                  </div>
                </div>
              </motion.div>

              <h2 className="font-poppins font-bold text-[24px] sm:text-[32px] text-text-primary mb-2">
                Upload a Photo of Your Crop
              </h2>
              <p className="text-text-secondary text-base mb-8">
                Our AI will analyze the image and tell you what&apos;s wrong within seconds.
              </p>

              {/* Input Methods */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Button
                  onClick={handleUploadClick}
                  className="w-full sm:w-auto bg-krishiva-green hover:bg-[#1B5E20] text-white font-inter font-medium text-base px-6 py-6 rounded-xl shadow-button transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Take Photo
                </Button>
                <Button
                  onClick={handleUploadClick}
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-krishiva-green text-krishiva-green hover:bg-krishiva-green/5 font-inter font-medium text-base px-6 py-6 rounded-xl transition-all"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Image
                </Button>
              </div>

              {/* Voice describe */}
              <button
                onClick={() => {}}
                className="inline-flex items-center gap-2 text-text-secondary hover:text-krishiva-green transition-colors text-sm font-inter mb-4"
              >
                <Mic className="w-4 h-4" />
                Or describe symptoms by voice
              </button>

              {/* Supported formats */}
              <p className="text-text-muted text-xs font-inter">
                Supports: JPG, PNG &bull; Max 10MB &bull; Clear, well-lit photos work best
              </p>

              {/* Tips */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                {[
                  { icon: Sun, text: 'Take photo in daylight' },
                  { icon: Focus, text: 'Focus on affected area' },
                  { icon: Hand, text: 'Include healthy part for comparison' },
                ].map((tip) => (
                  <div
                    key={tip.text}
                    className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 text-xs font-medium text-text-secondary border border-border-light"
                  >
                    <tip.icon className="w-3.5 h-3.5 text-krishiva-green" />
                    {tip.text}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* ─── Analysis Loading ─── */}
        <AnimatePresence>
          {analyzing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-center py-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 border-4 border-krishiva-green/20 border-t-krishiva-green rounded-full mx-auto mb-4"
              />
              <p className="text-text-primary font-medium font-inter">Analyzing your crop...</p>
              <p className="text-text-muted text-sm mt-1">Identifying symptoms and matching disease patterns</p>
              <div className="max-w-xs mx-auto mt-4 h-2 bg-border-light rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.5, ease: easeOut }}
                  className="h-full bg-krishiva-green rounded-full"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Diagnosis Result ─── */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: easeOut }}
            >
              <Card className="rounded-[20px] border-border-light p-6 sm:p-7 space-y-6">
                {/* Result Header */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-success-green/10 text-success-green border-success-green/20 font-medium">
                      <Check className="w-3 h-3 mr-1" /> Analysis Complete
                    </Badge>
                    <span className="text-text-secondary text-sm font-inter">Tomato Plant</span>
                  </div>
                  <span className="text-text-muted text-xs font-inter">Analyzed just now</span>
                </div>

                {/* Diagnosis Card */}
                <div className="bg-warning-amber/[0.05] border border-warning-amber/10 rounded-2xl p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                    {/* Confidence Circle */}
                    <div className="flex flex-col items-center shrink-0">
                      <div className="relative w-24 h-24">
                        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
                          <circle cx="48" cy="48" r="40" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                          <motion.circle
                            cx="48" cy="48" r="40"
                            fill="none"
                            stroke="#2E7D32"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 40}`}
                            initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                            animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - 0.87) }}
                            transition={{ duration: 0.8, ease: easeOut }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="font-poppins font-bold text-xl text-krishiva-green">87%</span>
                        </div>
                      </div>
                      <span className="text-xs text-success-green font-medium mt-2">High confidence</span>
                    </div>

                    {/* Diagnosis Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-poppins font-bold text-xl sm:text-2xl text-text-primary mb-2">
                        Early Blight <span className="text-text-secondary font-normal text-lg">(Alternaria solani)</span>
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge className="bg-warning-amber/10 text-warning-amber border-warning-amber/20">
                          Moderate Severity
                        </Badge>
                        <Badge variant="outline" className="text-text-secondary border-border-light">
                          Fungal Disease
                        </Badge>
                      </div>
                      <p className="text-text-secondary text-sm leading-relaxed font-inter">
                        Early blight is a common fungal disease affecting tomato plants. It appears as dark brown spots
                        with concentric rings on lower leaves, gradually spreading upward. If untreated, it can cause
                        significant yield loss of up to 50%.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Symptom Comparison */}
                <div>
                  <h4 className="font-poppins font-semibold text-lg text-text-primary mb-3">Symptom Match</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-text-muted text-xs mb-2 font-inter">Your crop photo</p>
                      <div className="aspect-[4/3] rounded-xl bg-krishiva-green/5 border border-border-light flex items-center justify-center">
                        <div className="text-center">
                          <ImageIcon className="w-10 h-10 text-krishiva-green/40 mx-auto mb-2" />
                          <span className="text-text-muted text-xs font-inter">Uploaded image</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-text-muted text-xs mb-2 font-inter">Reference: Early Blight</p>
                      <div className="aspect-[4/3] rounded-xl bg-warning-amber/5 border border-warning-amber/20 flex items-center justify-center">
                        <div className="text-center">
                          <Leaf className="w-10 h-10 text-warning-amber/60 mx-auto mb-2" />
                          <span className="text-text-muted text-xs font-inter">Early Blight symptoms</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-success-green text-sm font-medium mt-2 font-inter">
                    Symptom match: 90%
                  </p>
                </div>

                {/* Symptoms List */}
                <div>
                  <h4 className="font-poppins font-semibold text-lg text-text-primary mb-3">Identified Symptoms</h4>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="space-y-2"
                  >
                    {symptomsList.map((symptom) => (
                      <motion.div
                        key={symptom}
                        variants={cardVariants}
                        className="flex items-start gap-3 p-3 bg-bg-primary rounded-xl"
                      >
                        <Check className="w-5 h-5 text-krishiva-green shrink-0 mt-0.5" />
                        <span className="text-text-secondary text-sm font-inter">{symptom}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Treatment Recommendations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Immediate Actions */}
                  <div className="bg-bg-primary rounded-2xl p-5">
                    <h4 className="font-poppins font-semibold text-base text-text-primary mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-warning-amber" /> Immediate Actions
                    </h4>
                    <motion.ol
                      variants={containerVariants}
                      initial="hidden"
                      animate="show"
                      className="space-y-3"
                    >
                      {treatmentSteps.map((step, i) => (
                        <motion.li
                          key={step}
                          variants={cardVariants}
                          className="flex items-start gap-3 text-sm text-text-secondary font-inter"
                        >
                          <span className="w-6 h-6 rounded-full bg-krishiva-green/10 text-krishiva-green flex items-center justify-center text-xs font-bold shrink-0">
                            {i + 1}
                          </span>
                          {step}
                        </motion.li>
                      ))}
                    </motion.ol>
                  </div>

                  {/* Preventive Measures */}
                  <div className="bg-bg-primary rounded-2xl p-5">
                    <h4 className="font-poppins font-semibold text-base text-text-primary mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-leaf-green" /> Preventive Measures
                    </h4>
                    <motion.ul
                      variants={containerVariants}
                      initial="hidden"
                      animate="show"
                      className="space-y-3"
                    >
                      {preventiveMeasures.map((item) => (
                        <motion.li
                          key={item}
                          variants={cardVariants}
                          className="flex items-start gap-3 text-sm text-text-secondary font-inter"
                        >
                          <Check className="w-5 h-5 text-leaf-green shrink-0" />
                          {item}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                </div>

                {/* Expert CTA within result */}
                <div className="bg-krishiva-green/5 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-krishiva-green/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-krishiva-green" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-text-primary font-medium font-inter">Not sure about the diagnosis?</p>
                    <p className="text-text-secondary text-sm font-inter">Consult an expert for a second opinion</p>
                  </div>
                  <Button
                    onClick={() => setShowBooking(true)}
                    className="bg-krishiva-green hover:bg-[#1B5E20] text-white rounded-xl px-5 py-5 font-medium shadow-button"
                  >
                    Connect Now
                  </Button>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-3">
                    <Button variant="outline" className="border-krishiva-green text-krishiva-green hover:bg-krishiva-green/5 rounded-xl">
                      Save Diagnosis
                    </Button>
                    <Button variant="ghost" className="text-text-secondary hover:text-text-primary rounded-xl">
                      Share
                    </Button>
                  </div>
                  <button onClick={handleReset} className="text-krishiva-green text-sm font-medium hover:underline font-inter">
                    New Scan
                  </button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Crop Health Monitoring ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: easeOut }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-poppins font-semibold text-xl text-text-primary">Crop Health Monitoring</h2>
            <button className="text-krishiva-green text-sm font-medium flex items-center gap-1 hover:underline font-inter">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {scanHistory.map((scan) => (
              <motion.div key={scan.id} variants={cardVariants}>
                <Card className="rounded-2xl border-border-light p-5 hover:shadow-card-hover transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-krishiva-green/10 flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-krishiva-green" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-poppins font-semibold text-base text-text-primary">{scan.crop}</h3>
                      <p className="text-text-muted text-xs font-inter">{scan.date}</p>
                    </div>
                    {statusIcon(scan.status)}
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge className={statusBadge(scan.status)}>
                      {scan.diagnosis}
                    </Badge>
                    <span className="text-text-muted text-xs font-inter">{scan.confidence}% confidence</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ─── Common Diseases ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: easeOut }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-poppins font-semibold text-xl text-text-primary">Common Diseases</h2>
            <span className="text-text-muted text-xs font-inter">In your region</span>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
          >
            {commonDiseases.map((disease) => (
              <motion.div key={disease.name} variants={cardVariants}>
                <Card className="rounded-2xl border-border-light p-4 hover:shadow-card-hover hover:border-border-green transition-all cursor-pointer text-center">
                  <div className="w-12 h-12 rounded-xl bg-krishiva-green/5 flex items-center justify-center mx-auto mb-3">
                    <Leaf className="w-6 h-6 text-krishiva-green" />
                  </div>
                  <h3 className="font-poppins font-semibold text-sm text-text-primary mb-1">{disease.name}</h3>
                  <p className="text-text-muted text-xs font-inter mb-2">{disease.crop}</p>
                  <Badge variant="outline" className={severityColor(disease.severity)}>
                    {disease.severity}
                  </Badge>
                  <button className="block w-full text-krishiva-green text-xs font-medium mt-3 hover:underline font-inter">
                    Learn More
                  </button>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ─── Expert Consultation CTA ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: easeOut }}
          className="bg-gradient-to-br from-krishiva-green to-leaf-green rounded-[20px] p-8 text-center text-white"
        >
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-poppins font-bold text-[28px] mb-2">Need Expert Advice?</h2>
          <p className="text-white/85 text-base font-inter max-w-md mx-auto mb-6">
            Our agricultural experts are available for video consultations. Get personalized guidance for your crop issues.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 mb-6 text-sm text-white/80 font-inter">
            <span className="flex items-center gap-1.5"><Camera className="w-4 h-4" /> Video Call</span>
            <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4" /> Instant Connect</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4" /> Prescription Included</span>
          </div>
          <Button
            onClick={() => setShowBooking(true)}
            className="bg-white text-krishiva-green hover:bg-white/90 font-inter font-semibold text-base px-8 py-6 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Book a Consultation
          </Button>
          <p className="text-white/70 text-xs mt-3 font-inter">Starting from just ₹99</p>
        </motion.div>

        {/* ─── Scan History (Recent Scans) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5, ease: easeOut }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-poppins font-semibold text-xl text-text-primary">Recent Scans</h2>
            <button className="text-krishiva-green text-sm font-medium flex items-center gap-1 hover:underline font-inter">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <Card className="rounded-2xl border-border-light overflow-hidden divide-y divide-border-light">
            {scanHistory.map((scan, i) => (
              <motion.div
                key={scan.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: i * 0.04, ease: easeOut }}
                className="flex items-center gap-4 p-4 hover:bg-bg-primary/50 transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-krishiva-green/5 flex items-center justify-center shrink-0">
                  <Leaf className="w-5 h-5 text-krishiva-green" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-text-primary font-inter">{scan.crop}</h4>
                  <p className="text-text-muted text-xs font-inter">
                    {scan.diagnosis} &mdash; {scan.confidence}% confidence
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-text-muted text-xs font-inter">{scan.date}</p>
                  <Badge className={`text-[10px] mt-1 ${statusBadge(scan.status)}`}>
                    {scan.status === 'healthy' ? 'Resolved' : scan.status === 'warning' ? 'Monitoring' : 'Action Needed'}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </Card>
        </motion.div>
      </div>

      {/* ─── Booking Dialog ─── */}
      <Dialog open={showBooking} onOpenChange={setShowBooking}>
        <DialogContent className="sm:max-w-[480px] rounded-[20px] p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="font-poppins font-semibold text-xl">Book Consultation</DialogTitle>
          </DialogHeader>
          <div className="p-6 space-y-5">
            <div>
              <label className="text-sm font-medium text-text-primary mb-2 block font-inter">Select Date</label>
              <div className="grid grid-cols-4 gap-2">
                {['Today', 'Tomorrow', 'Jun 18', 'Jun 19'].map((d, i) => (
                  <button
                    key={d}
                    className={`py-2 px-1 rounded-xl text-xs font-medium transition-all border ${
                      i === 0
                        ? 'bg-krishiva-green text-white border-krishiva-green'
                        : 'bg-white text-text-secondary border-border-light hover:border-border-green'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-text-primary mb-2 block font-inter">Time Slot</label>
              <div className="grid grid-cols-3 gap-2">
                {['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'].map((t, i) => (
                  <button
                    key={t}
                    className={`py-2 rounded-xl text-xs font-medium transition-all border ${
                      i === 1
                        ? 'bg-krishiva-green text-white border-krishiva-green'
                        : 'bg-white text-text-secondary border-border-light hover:border-border-green'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-text-primary mb-2 block font-inter">Problem Description</label>
              <Textarea
                placeholder="Describe your crop issue..."
                className="rounded-xl border-border-light focus:border-krishiva-green focus:ring-krishiva-green/15 resize-none"
                rows={3}
              />
            </div>
            <div className="bg-bg-primary rounded-xl p-4 flex items-center justify-between">
              <span className="text-sm text-text-secondary font-inter">Est. Price</span>
              <span className="font-poppins font-bold text-krishiva-green font-inter">20 min &times; ₹20/min = ₹400</span>
            </div>
            <Button
              onClick={() => setShowBooking(false)}
              className="w-full bg-krishiva-green hover:bg-[#1B5E20] text-white rounded-xl py-6 font-medium shadow-button"
            >
              Confirm Booking
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
