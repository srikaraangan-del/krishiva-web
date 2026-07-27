import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, ArrowLeft, User, Phone, Mail, MapPin, Tractor, Wheat, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function FarmerOnboard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-[100dvh] bg-[#F8F9FA] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4"><CheckCircle2 className="w-8 h-8 text-[#2E7D32]" /></div>
          <h2 className="font-poppins font-bold text-xl text-[#111827] mb-2">Farmer Onboarded!</h2>
          <p className="text-sm text-[#6B7280] mb-4">The farmer has been successfully added to your list. They will receive an SMS with their login details.</p>
          <p className="text-xs text-[#9CA3AF] mb-6">+50 points added to your score</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => navigate('/employee/dashboard')} variant="outline" className="h-11 rounded-xl">Go to Dashboard</Button>
            <Button onClick={() => { setSubmitted(false); setStep(1); }} className="h-11 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl">Onboard Another</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-[#F8F9FA]">
      <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-30">
        <div className="max-w-3xl mx-auto h-14 flex items-center px-4">
          <button onClick={() => navigate('/employee/dashboard')} className="p-2 rounded-lg hover:bg-[#F3F4F6] mr-2"><ArrowLeft className="w-5 h-5 text-[#6B7280]" /></button>
          <div className="flex items-center gap-2"><UserPlus className="w-5 h-5 text-[#2E7D32]" /><h1 className="font-poppins font-semibold text-lg text-[#111827]">Onboard Farmer</h1></div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-[#E5E7EB] shadow-none">
            <CardContent className="p-6 space-y-5">
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <>
                  <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center"><User className="w-5 h-5 text-green-600" /></div><div><h3 className="font-poppins font-semibold text-base text-[#111827]">Farmer Details</h3><p className="text-xs text-[#9CA3AF]">Enter farmer's personal information</p></div></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Full Name *</label><input type="text" className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none" placeholder="Farmer's full name" /></div>
                    <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Mobile Number *</label><input type="tel" className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none" placeholder="+91 98765 43210" /></div>
                    <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Email ID</label><input type="email" className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none" placeholder="Optional" /></div>
                    <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Date of Birth</label><input type="date" className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none" /></div>
                    <div className="sm:col-span-2"><label className="text-xs font-medium text-[#6B7280] mb-1 block">Full Address *</label><textarea className="w-full h-20 px-4 py-3 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none resize-none" placeholder="Village, Mandal, District, State, PIN" /></div>
                  </div>
                  <Button onClick={() => setStep(2)} className="w-full h-12 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl font-medium">Next: Farm Details</Button>
                </>
              )}
              {/* Step 2: Farm Details */}
              {step === 2 && (
                <>
                  <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center"><Tractor className="w-5 h-5 text-amber-600" /></div><div><h3 className="font-poppins font-semibold text-base text-[#111827]">Farm Information</h3><p className="text-xs text-[#9CA3AF]">Enter farm and crop details</p></div></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Total Farm Area (acres) *</label><input type="number" className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none" placeholder="e.g., 25" /></div>
                    <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Land Type</label><select className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none bg-white"><option>Irrigated</option><option>Rain-fed</option><option>Mixed</option></select></div>
                    <div className="sm:col-span-2"><label className="text-xs font-medium text-[#6B7280] mb-1 block">Primary Crops *</label><input type="text" className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none" placeholder="e.g., Wheat, Rice, Cotton" /></div>
                    <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Soil Type</label><select className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none bg-white"><option>Black Soil</option><option>Red Soil</option><option>Alluvial</option><option>Laterite</option><option>Sandy</option></select></div>
                    <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Water Source</label><select className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none bg-white"><option>Borewell</option><option>Canal</option><option>Rain</option><option>Pond</option><option>River</option></select></div>
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={() => setStep(1)} variant="outline" className="flex-1 h-12 rounded-xl border-[#E5E7EB]">Back</Button>
                    <Button onClick={() => setStep(3)} className="flex-1 h-12 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl font-medium">Next: Documents</Button>
                  </div>
                </>
              )}
              {/* Step 3: Documents */}
              {step === 3 && (
                <>
                  <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center"><Wheat className="w-5 h-5 text-blue-600" /></div><div><h3 className="font-poppins font-semibold text-base text-[#111827]">Documents</h3><p className="text-xs text-[#9CA3AF]">Upload farmer's verification documents</p></div></div>
                  <div className="space-y-3">
                    {['Aadhar Card *', 'PAN Card', 'Land Document (Patta)', 'Bank Passbook', 'Passport Size Photo *'].map(doc => (
                      <div key={doc} className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-4 hover:border-[#2E7D32] transition-colors cursor-pointer">
                        <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-[#F3F4F6] flex items-center justify-center"><User className="w-5 h-5 text-[#6B7280]" /></div><div><p className="text-sm font-medium text-[#111827]">{doc}</p><p className="text-[10px] text-[#9CA3AF]">Click to upload (PDF, JPG, PNG)</p></div></div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={() => setStep(2)} variant="outline" className="flex-1 h-12 rounded-xl border-[#E5E7EB]">Back</Button>
                    <Button onClick={() => setSubmitted(true)} className="flex-1 h-12 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl font-medium">Complete Onboarding</Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
