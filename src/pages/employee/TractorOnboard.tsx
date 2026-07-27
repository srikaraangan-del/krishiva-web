import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tractor, ArrowLeft, CheckCircle2, Camera, IndianRupee, MapPin, Phone, User, Calendar, Settings } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function TractorOnboard() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) return (
    <div className="min-h-[100dvh] bg-[#F8F9FA] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4"><CheckCircle2 className="w-8 h-8 text-[#2E7D32]" /></div>
        <h2 className="font-poppins font-bold text-xl text-[#111827] mb-2">Tractor Owner Registered!</h2>
        <p className="text-sm text-[#6B7280] mb-4">The tractor rental service has been registered successfully.</p>
        <p className="text-xs text-[#9CA3AF] mb-6">+25 points added</p>
        <div className="flex gap-3 justify-center">
          <Button onClick={() => navigate('/employee/dashboard')} variant="outline" className="h-11 rounded-xl">Dashboard</Button>
          <Button onClick={() => setSubmitted(false)} className="h-11 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl">Register Another</Button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-[100dvh] bg-[#F8F9FA]">
      <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-30">
        <div className="max-w-3xl mx-auto h-14 flex items-center px-4">
          <button onClick={() => navigate('/employee/dashboard')} className="p-2 rounded-lg hover:bg-[#F3F4F6] mr-2"><ArrowLeft className="w-5 h-5 text-[#6B7280]" /></button>
          <div className="flex items-center gap-2"><Tractor className="w-5 h-5 text-[#2E7D32]" /><h1 className="font-poppins font-semibold text-lg text-[#111827]">Register Tractor Owner</h1></div>
        </div>
      </header>
      <div className="max-w-3xl mx-auto px-4 py-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-[#E5E7EB] shadow-none">
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center"><User className="w-5 h-5 text-orange-600" /></div><div><h3 className="font-poppins font-semibold text-base text-[#111827]">Owner Details</h3><p className="text-xs text-[#9CA3AF]">Tractor owner information</p></div></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Owner Name *</label><input type="text" className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm outline-none" placeholder="Full name" /></div>
                <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Mobile *</label><input type="tel" className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm outline-none" placeholder="+91 98765 43210" /></div>
                <div className="sm:col-span-2"><label className="text-xs font-medium text-[#6B7280] mb-1 block">Address *</label><textarea className="w-full h-16 px-4 py-3 rounded-xl border border-[#E5E7EB] text-sm outline-none resize-none" placeholder="Full address" /></div>
              </div>
              <div className="border-t border-[#E5E7EB] pt-5">
                <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center"><Tractor className="w-5 h-5 text-green-600" /></div><div><h3 className="font-poppins font-semibold text-base text-[#111827]">Tractor Details</h3><p className="text-xs text-[#9CA3AF]">Equipment information</p></div></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Tractor Brand/Model *</label><input type="text" className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm outline-none" placeholder="e.g., Mahindra 575 DI" /></div>
                  <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">HP Rating</label><input type="text" className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm outline-none" placeholder="e.g., 47 HP" /></div>
                  <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Year of Purchase</label><input type="number" className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm outline-none" placeholder="2022" /></div>
                  <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Registration Number</label><input type="text" className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm outline-none" placeholder="AP XX XX XXXX" /></div>
                  <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Services Available</label><div className="space-y-1"><label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Ploughing</label><label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Harrowing</label><label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Cultivation</label><label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Transport</label></div></div>
                  <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Pricing (per hour)</label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2"><IndianRupee className="w-3 h-3 text-[#9CA3AF]" /><input type="number" className="flex-1 h-9 px-3 rounded-lg border border-[#E5E7EB] text-sm outline-none" placeholder="Plough: Rs 800" /></div>
                      <div className="flex items-center gap-2"><IndianRupee className="w-3 h-3 text-[#9CA3AF]" /><input type="number" className="flex-1 h-9 px-3 rounded-lg border border-[#E5E7EB] text-sm outline-none" placeholder="Harrow: Rs 700" /></div>
                      <div className="flex items-center gap-2"><IndianRupee className="w-3 h-3 text-[#9CA3AF]" /><input type="number" className="flex-1 h-9 px-3 rounded-lg border border-[#E5E7EB] text-sm outline-none" placeholder="Cultivate: Rs 900" /></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3"><Button onClick={() => navigate('/employee/dashboard')} variant="outline" className="flex-1 h-12 rounded-xl">Cancel</Button><Button onClick={() => setSubmitted(true)} className="flex-1 h-12 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl font-medium">Register Tractor</Button></div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
