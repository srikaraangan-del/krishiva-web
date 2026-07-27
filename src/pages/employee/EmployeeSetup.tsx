import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Upload, CheckCircle2, ArrowRight, User, CreditCard, FileCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function EmployeeSetup() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [docs, setDocs] = useState({
    aadharFront: null as File | null,
    aadharBack: null as File | null,
    panCard: null as File | null,
    degreeCertificate: null as File | null,
    photo: null as File | null,
    policeVerification: null as File | null,
  });

  const updateDoc = (key: keyof typeof docs, file: File | null) => {
    setDocs(prev => ({ ...prev, [key]: file }));
  };

  const allUploaded = Object.values(docs).every(d => d !== null);

  return (
    <div className="min-h-[100dvh] bg-[#F8F9FA]">
      <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-30">
        <div className="max-w-3xl mx-auto h-14 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#2E7D32] flex items-center justify-center"><ShieldCheck className="w-4 h-4 text-white" /></div>
            <span className="font-poppins font-bold text-lg text-[#111827]">Profile Setup</span>
          </div>
          <span className="text-xs text-[#9CA3AF]">Step {step} of 2</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          {step === 1 && (
            <Card className="border-[#E5E7EB] shadow-card">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-3"><CheckCircle2 className="w-8 h-8 text-[#2E7D32]" /></div>
                  <h2 className="font-poppins font-bold text-xl text-[#111827]">Welcome, Employee!</h2>
                  <p className="text-sm text-[#6B7280] mt-1">Your application has been approved. Complete your profile setup to start working.</p>
                </div>
                <div className="bg-[#F8F9FA] rounded-xl p-5 space-y-3 mb-6">
                  <div className="flex items-center justify-between"><span className="text-sm text-[#6B7280]">Employee ID</span><span className="font-mono font-semibold text-sm text-[#111827]">KRISHIVA-EMP-1001</span></div>
                  <div className="flex items-center justify-between"><span className="text-sm text-[#6B7280]">Name</span><span className="font-medium text-sm text-[#111827]">Ravi Teja Kondepudi</span></div>
                  <div className="flex items-center justify-between"><span className="text-sm text-[#6B7280]">Department</span><span className="font-medium text-sm text-[#111827]">Farmer Relations</span></div>
                  <div className="flex items-center justify-between"><span className="text-sm text-[#6B7280]">Reporting To</span><span className="font-medium text-sm text-[#111827]">District Manager - Guntur</span></div>
                </div>
                <Button onClick={() => setStep(2)} className="w-full h-12 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl font-medium">
                  Upload Documents <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card className="border-[#E5E7EB] shadow-card">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center"><FileCheck className="w-5 h-5 text-blue-600" /></div>
                  <div><h3 className="font-poppins font-semibold text-base text-[#111827]">Document Verification</h3><p className="text-xs text-[#9CA3AF]">Upload all required documents to complete your profile</p></div>
                </div>

                {[
                  { label: 'Aadhar Card - Front Side *', key: 'aadharFront' as const, icon: CreditCard, color: 'bg-orange-50 text-orange-600' },
                  { label: 'Aadhar Card - Back Side *', key: 'aadharBack' as const, icon: CreditCard, color: 'bg-orange-50 text-orange-600' },
                  { label: 'PAN Card *', key: 'panCard' as const, icon: CreditCard, color: 'bg-blue-50 text-blue-600' },
                  { label: 'Degree Certificate *', key: 'degreeCertificate' as const, icon: FileCheck, color: 'bg-purple-50 text-purple-600' },
                  { label: 'Passport Size Photo *', key: 'photo' as const, icon: User, color: 'bg-green-50 text-green-600' },
                  { label: 'Police Verification Certificate *', key: 'policeVerification' as const, icon: ShieldCheck, color: 'bg-red-50 text-red-600' },
                ].map(doc => (
                  <div key={doc.key} className={`border-2 ${docs[doc.key] ? 'border-[#2E7D32] bg-green-50/30' : 'border-dashed border-[#E5E7EB]'} rounded-xl p-4 hover:border-[#2E7D32] transition-colors cursor-pointer`} onClick={() => document.getElementById(doc.key)?.click()}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${doc.color.split(' ')[0]} flex items-center justify-center`}><doc.icon className={`w-5 h-5 ${doc.color.split(' ')[1]}`} /></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#111827]">{docs[doc.key] ? (docs[doc.key] as File).name : doc.label}</p>
                        <p className="text-[10px] text-[#9CA3AF]">{docs[doc.key] ? 'Uploaded' : 'Click to upload (PDF, JPG, PNG)'}</p>
                      </div>
                      {docs[doc.key] ? <CheckCircle2 className="w-5 h-5 text-[#2E7D32]" /> : <Upload className="w-4 h-4 text-[#9CA3AF]" />}
                    </div>
                    <input id={doc.key} type="file" className="hidden" onChange={e => updateDoc(doc.key, e.target.files?.[0] || null)} />
                  </div>
                ))}

                <Button
                  onClick={() => navigate('/employee/dashboard')}
                  disabled={!allUploaded}
                  className="w-full h-12 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl font-medium disabled:opacity-50"
                >
                  {allUploaded ? 'Complete Setup & Go to Dashboard' : `${Object.values(docs).filter(d => d).length}/6 documents uploaded`}
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}
