import { useState } from 'react';
import { motion } from 'framer-motion';
import { Store, ArrowLeft, CheckCircle2, Camera, Tag, FileText, IndianRupee, Percent, Package, MapPin, Phone, User, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function FertilizerOnboard() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-[100dvh] bg-[#F8F9FA] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4"><CheckCircle2 className="w-8 h-8 text-[#2E7D32]" /></div>
          <h2 className="font-poppins font-bold text-xl text-[#111827] mb-2">Fertilizer Shop Registered!</h2>
          <p className="text-sm text-[#6B7280] mb-4">The fertilizer dealer has been successfully registered. Admin will review and approve within 24 hours.</p>
          <p className="text-xs text-[#9CA3AF] mb-6">+30 points added to your score</p>
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
          <div className="flex items-center gap-2"><Store className="w-5 h-5 text-[#2E7D32]" /><h1 className="font-poppins font-semibold text-lg text-[#111827]">Register Fertilizer Shop</h1></div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-[#E5E7EB] shadow-none">
            <CardContent className="p-6 space-y-5">
              {/* Shop Basic Info */}
              <div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center"><Store className="w-5 h-5 text-blue-600" /></div><div><h3 className="font-poppins font-semibold text-base text-[#111827]">Shop Information</h3><p className="text-xs text-[#9CA3AF]">Enter shop and owner details</p></div></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2"><label className="text-xs font-medium text-[#6B7280] mb-1 block">Shop Name *</label><input type="text" className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none" placeholder="e.g., Sri Lakshmi Fertilizers" /></div>
                <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Owner Name *</label><input type="text" className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none" placeholder="Owner's full name" /></div>
                <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">GST Number</label><input type="text" className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none" placeholder="22AAAAA0000A1Z5" /></div>
                <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Mobile *</label><div className="relative"><Phone className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" /><input type="tel" className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none" placeholder="98765 43210" /></div></div>
                <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Email</label><input type="email" className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none" placeholder="shop@email.com" /></div>
                <div className="sm:col-span-2"><label className="text-xs font-medium text-[#6B7280] mb-1 block">Full Address *</label><textarea className="w-full h-16 px-4 py-3 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none resize-none" placeholder="Shop address with landmark" /></div>
              </div>

              {/* Product Details */}
              <div className="border-t border-[#E5E7EB] pt-5">
                <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center"><Package className="w-5 h-5 text-purple-600" /></div><div><h3 className="font-poppins font-semibold text-base text-[#111827]">Product Catalog</h3><p className="text-xs text-[#9CA3AF]">Add fertilizers and products with pricing</p></div></div>
                <div className="space-y-3">
                  {['Urea (45kg)', 'DAP (50kg)', 'NPK 20-20-20 (50kg)', 'Potash (50kg)', 'Organic Compost (25kg)'].map((product, i) => (
                    <div key={product} className="grid grid-cols-12 gap-2 items-end bg-[#F8F9FA] rounded-xl p-3">
                      <div className="col-span-4"><label className="text-[10px] font-medium text-[#9CA3AF] mb-1 block">Product</label><p className="text-xs font-medium text-[#111827]">{product}</p></div>
                      <div className="col-span-3"><label className="text-[10px] font-medium text-[#9CA3AF] mb-1 block">MRP (Rs)</label><input type="number" className="w-full h-9 px-2 rounded-lg border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none" placeholder={['350', '1450', '1800', '950', '400'][i]} /></div>
                      <div className="col-span-3"><label className="text-[10px] font-medium text-[#9CA3AF] mb-1 block">Offer Price (Rs)</label><input type="number" className="w-full h-9 px-2 rounded-lg border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none text-[#2E7D32]" placeholder={['320', '1350', '1650', '880', '350'][i]} /></div>
                      <div className="col-span-2"><label className="text-[10px] font-medium text-[#9CA3AF] mb-1 block">Disc.</label><input type="number" className="w-full h-9 px-2 rounded-lg border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none" placeholder={['10', '8', '12', '15', '20'][i]} /></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shop Photo & Brief */}
              <div className="border-t border-[#E5E7EB] pt-5">
                <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center"><Camera className="w-5 h-5 text-green-600" /></div><div><h3 className="font-poppins font-semibold text-base text-[#111827]">Shop Profile</h3><p className="text-xs text-[#9CA3AF]">Add shop photo and description</p></div></div>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-6 text-center hover:border-[#2E7D32] transition-colors cursor-pointer">
                    <Camera className="w-6 h-6 text-[#9CA3AF] mx-auto mb-2" />
                    <p className="text-xs text-[#9CA3AF]">Upload shop exterior photo</p>
                  </div>
                  <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Brief Description *</label><textarea className="w-full h-20 px-4 py-3 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none resize-none" placeholder="Describe the shop, services offered, special deals, home delivery availability, etc." /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Shop Rating</label><select className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none bg-white"><option>Not Rated</option><option>1 Star</option><option>2 Stars</option><option>3 Stars</option><option>4 Stars</option><option>5 Stars</option></select></div>
                    <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Home Delivery</label><select className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none bg-white"><option>Available</option><option>Not Available</option><option>Only Bulk Orders</option></select></div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button onClick={() => navigate('/employee/dashboard')} variant="outline" className="flex-1 h-12 rounded-xl border-[#E5E7EB]">Cancel</Button>
                <Button onClick={() => setSubmitted(true)} className="flex-1 h-12 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl font-medium">Submit for Approval</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
