import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, ArrowLeft, CheckCircle2, Camera, IndianRupee, Clock, MapPin, Phone, User, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function DroneOnboard() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-[100dvh] bg-[#F8F9FA] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4"><CheckCircle2 className="w-8 h-8 text-[#2E7D32]" /></div>
          <h2 className="font-poppins font-bold text-xl text-[#111827] mb-2">Drone Operator Registered!</h2>
          <p className="text-sm text-[#6B7280] mb-4">The drone service provider has been registered successfully.</p>
          <p className="text-xs text-[#9CA3AF] mb-6">+30 points added</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => navigate('/employee/dashboard')} variant="outline" className="h-11 rounded-xl">Dashboard</Button>
            <Button onClick={() => setSubmitted(false)} className="h-11 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl">Register Another</Button>
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
          <div className="flex items-center gap-2"><Plane className="w-5 h-5 text-[#2E7D32]" /><h1 className="font-poppins font-semibold text-lg text-[#111827]">Register Drone Service</h1></div>
        </div>
      </header>
      <div className="max-w-3xl mx-auto px-4 py-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-[#E5E7EB] shadow-none">
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center"><User className="w-5 h-5 text-cyan-600" /></div><div><h3 className="font-poppins font-semibold text-base text-[#111827]">Operator Details</h3><p className="text-xs text-[#9CA3AF]">Drone pilot/company information</p></div></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Operator/Company Name *</label><input type="text" className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none" placeholder="e.g., AgriDrone Solutions" /></div>
                <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Contact Person *</label><input type="text" className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none" placeholder="Name" /></div>
                <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Mobile *</label><input type="tel" className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none" placeholder="+91 98765 43210" /></div>
                <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Email</label><input type="email" className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none" placeholder="email@company.com" /></div>
                <div className="sm:col-span-2"><label className="text-xs font-medium text-[#6B7280] mb-1 block">Service Area *</label><textarea className="w-full h-16 px-4 py-3 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none resize-none" placeholder="List mandals/districts covered" /></div>
              </div>
              <div className="border-t border-[#E5E7EB] pt-5">
                <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center"><Plane className="w-5 h-5 text-amber-600" /></div><div><h3 className="font-poppins font-semibold text-base text-[#111827]">Drone & Service Details</h3><p className="text-xs text-[#9CA3AF]">Equipment and pricing</p></div></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Drone Model</label><input type="text" className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none" placeholder="e.g., DJI Agras T30" /></div>
                  <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Number of Drones</label><input type="number" className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none" placeholder="e.g., 3" /></div>
                  <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Services Offered</label><div className="space-y-2"><label className="flex items-center gap-2 text-sm"><input type="checkbox" className="rounded" /> Pesticide Spraying</label><label className="flex items-center gap-2 text-sm"><input type="checkbox" className="rounded" /> Fertilizer Spreading</label><label className="flex items-center gap-2 text-sm"><input type="checkbox" className="rounded" /> Seed Sowing</label><label className="flex items-center gap-2 text-sm"><input type="checkbox" className="rounded" /> Crop Monitoring</label></div></div>
                  <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Pricing (per acre)</label><div className="space-y-2">
                    <div className="flex items-center gap-2"><IndianRupee className="w-3 h-3 text-[#9CA3AF]" /><input type="number" className="flex-1 h-9 px-3 rounded-lg border border-[#E5E7EB] text-sm outline-none" placeholder="Spray: Rs 250" /></div>
                    <div className="flex items-center gap-2"><IndianRupee className="w-3 h-3 text-[#9CA3AF]" /><input type="number" className="flex-1 h-9 px-3 rounded-lg border border-[#E5E7EB] text-sm outline-none" placeholder="Spread: Rs 200" /></div>
                    <div className="flex items-center gap-2"><IndianRupee className="w-3 h-3 text-[#9CA3AF]" /><input type="number" className="flex-1 h-9 px-3 rounded-lg border border-[#E5E7EB] text-sm outline-none" placeholder="Sow: Rs 300" /></div>
                  </div></div>
                  <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">DGCA License Number</label><input type="text" className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm outline-none" placeholder="License number" /></div>
                  <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Insurance</label><select className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm outline-none bg-white"><option>Insured</option><option>Not Insured</option></select></div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button onClick={() => navigate('/employee/dashboard')} variant="outline" className="flex-1 h-12 rounded-xl">Cancel</Button>
                <Button onClick={() => setSubmitted(true)} className="flex-1 h-12 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl font-medium">Register Operator</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
