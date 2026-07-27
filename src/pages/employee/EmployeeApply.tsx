import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Phone, Mail, GraduationCap, BookOpen, FileText, Upload, CheckCircle2, ArrowRight, ArrowLeft, Briefcase } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FormData {
  fullName: string;
  age: string;
  dateOfBirth: string;
  mobile: string;
  email: string;
  degree: string;
  degreeInstitution: string;
  degreeYear: string;
  postGraduation: string;
  pgInstitution: string;
  pgYear: string;
  previousExperience: string;
  skills: string;
  address: string;
  emergencyContact: string;
  idProof: File | null;
  photo: File | null;
  resume: File | null;
}

const initialForm: FormData = {
  fullName: '', age: '', dateOfBirth: '', mobile: '', email: '',
  degree: '', degreeInstitution: '', degreeYear: '',
  postGraduation: '', pgInstitution: '', pgYear: '',
  previousExperience: '', skills: '', address: '', emergencyContact: '',
  idProof: null, photo: null, resume: null,
};

export default function EmployeeApply() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>(initialForm);

  const update = (field: keyof FormData, value: string | File | null) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const totalSteps = 4;

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
    else setSubmitted(true);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  if (submitted) {
    return (
      <div className="min-h-[100dvh] bg-[#F8F9FA] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="max-w-md w-full">
          <Card className="border-[#E5E7EB] shadow-card">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-[#2E7D32]" strokeWidth={2} />
              </div>
              <h2 className="font-poppins font-bold text-xl text-[#111827] mb-2">Application Submitted!</h2>
              <p className="text-sm text-[#6B7280] mb-4">
                Your application has been received and is under review. You will receive an email with your Employee ID and temporary password once the admin approves your application.
              </p>
              <div className="bg-[#F3F4F6] rounded-xl p-4 mb-4">
                <p className="text-xs text-[#9CA3AF] mb-1">Application Reference</p>
                <p className="font-mono font-semibold text-sm text-[#111827]">KRISHIVA-EMP-{Math.floor(Math.random() * 9000) + 1000}</p>
              </div>
              <p className="text-xs text-[#9CA3AF]">Expected response time: 24-48 hours</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-[#F8F9FA]">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-30">
        <div className="max-w-3xl mx-auto h-14 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#2E7D32] flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-white" strokeWidth={2} />
            </div>
            <span className="font-poppins font-bold text-lg text-[#111827]">KRISHIVA</span>
          </div>
          <span className="text-xs text-[#9CA3AF]">Internal Employee Application</span>
        </div>
      </header>

      {/* Progress */}
      <div className="max-w-3xl mx-auto px-4 pt-6">
        <div className="flex items-center justify-between mb-2">
          {['Personal Info', 'Education', 'Experience', 'Documents'].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                step > i + 1 ? 'bg-[#2E7D32] text-white' : step === i + 1 ? 'bg-[#2E7D32] text-white' : 'bg-[#E5E7EB] text-[#9CA3AF]'
              }`}>
                {step > i + 1 ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-xs hidden sm:inline ${step === i + 1 ? 'font-semibold text-[#111827]' : 'text-[#9CA3AF]'}`}>{label}</span>
            </div>
          ))}
        </div>
        <div className="h-1.5 bg-[#E5E7EB] rounded-full mb-6">
          <motion.div className="h-full bg-[#2E7D32] rounded-full" initial={{ width: 0 }} animate={{ width: `${(step / totalSteps) * 100}%` }} transition={{ duration: 0.3 }} />
        </div>
      </div>

      {/* Form */}
      <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="max-w-3xl mx-auto px-4 pb-8">
        <Card className="border-[#E5E7EB] shadow-card">
          <CardContent className="p-6">
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center"><User className="w-5 h-5 text-blue-600" /></div>
                  <div><h3 className="font-poppins font-semibold text-base text-[#111827]">Personal Information</h3><p className="text-xs text-[#9CA3AF]">Enter your basic details</p></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Full Name *</label><input type="text" value={form.fullName} onChange={e => update('fullName', e.target.value)} className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32] outline-none" placeholder="Enter your full name" /></div>
                  <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Age *</label><input type="number" value={form.age} onChange={e => update('age', e.target.value)} className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32] outline-none" placeholder="Enter age" /></div>
                  <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Date of Birth *</label><input type="date" value={form.dateOfBirth} onChange={e => update('dateOfBirth', e.target.value)} className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32] outline-none" /></div>
                  <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Mobile Number *</label><input type="tel" value={form.mobile} onChange={e => update('mobile', e.target.value)} className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32] outline-none" placeholder="+91 98765 43210" /></div>
                  <div className="sm:col-span-2"><label className="text-xs font-medium text-[#6B7280] mb-1 block">Email ID *</label><input type="email" value={form.email} onChange={e => update('email', e.target.value)} className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32] outline-none" placeholder="your.email@example.com" /></div>
                  <div className="sm:col-span-2"><label className="text-xs font-medium text-[#6B7280] mb-1 block">Address *</label><textarea value={form.address} onChange={e => update('address', e.target.value)} className="w-full h-20 px-4 py-3 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32] outline-none resize-none" placeholder="Enter your full address" /></div>
                  <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Emergency Contact *</label><input type="tel" value={form.emergencyContact} onChange={e => update('emergencyContact', e.target.value)} className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32] outline-none" placeholder="+91 98765 43210" /></div>
                </div>
              </div>
            )}

            {/* Step 2: Education */}
            {step === 2 && (
              <div className="space-y-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center"><GraduationCap className="w-5 h-5 text-purple-600" /></div>
                  <div><h3 className="font-poppins font-semibold text-base text-[#111827]">Education Details</h3><p className="text-xs text-[#9CA3AF]">Enter your degree and post-graduation details</p></div>
                </div>
                <div className="bg-[#F8F9FA] rounded-xl p-5 space-y-4">
                  <h4 className="font-semibold text-sm text-[#111827] flex items-center gap-2"><BookOpen className="w-4 h-4 text-[#2E7D32]" /> Bachelor's Degree *</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-1"><label className="text-xs font-medium text-[#6B7280] mb-1 block">Degree Name</label><input type="text" value={form.degree} onChange={e => update('degree', e.target.value)} className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none" placeholder="B.Sc Agriculture" /></div>
                    <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Institution</label><input type="text" value={form.degreeInstitution} onChange={e => update('degreeInstitution', e.target.value)} className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none" placeholder="University Name" /></div>
                    <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Year of Passing</label><input type="number" value={form.degreeYear} onChange={e => update('degreeYear', e.target.value)} className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none" placeholder="2022" /></div>
                  </div>
                </div>
                <div className="bg-[#F8F9FA] rounded-xl p-5 space-y-4">
                  <h4 className="font-semibold text-sm text-[#111827] flex items-center gap-2"><GraduationCap className="w-4 h-4 text-purple-600" /> Post Graduation (Optional)</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-1"><label className="text-xs font-medium text-[#6B7280] mb-1 block">PG Degree</label><input type="text" value={form.postGraduation} onChange={e => update('postGraduation', e.target.value)} className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none" placeholder="M.Sc Agriculture" /></div>
                    <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Institution</label><input type="text" value={form.pgInstitution} onChange={e => update('pgInstitution', e.target.value)} className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none" placeholder="University Name" /></div>
                    <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Year of Passing</label><input type="number" value={form.pgYear} onChange={e => update('pgYear', e.target.value)} className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none" placeholder="2024" /></div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Experience & Skills */}
            {step === 3 && (
              <div className="space-y-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center"><FileText className="w-5 h-5 text-amber-600" /></div>
                  <div><h3 className="font-poppins font-semibold text-base text-[#111827]">Experience & Skills</h3><p className="text-xs text-[#9CA3AF]">Tell us about your previous work</p></div>
                </div>
                <div className="space-y-4">
                  <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Previous Experience *</label><textarea value={form.previousExperience} onChange={e => update('previousExperience', e.target.value)} className="w-full h-28 px-4 py-3 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none resize-none" placeholder="Describe your previous work experience, companies worked with, roles handled, achievements..." /></div>
                  <div><label className="text-xs font-medium text-[#6B7280] mb-1 block">Skills & Expertise *</label><textarea value={form.skills} onChange={e => update('skills', e.target.value)} className="w-full h-24 px-4 py-3 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] outline-none resize-none" placeholder="List your skills: Farmer onboarding, Crop management, Digital marketing, Data analysis, etc." /></div>
                </div>
              </div>
            )}

            {/* Step 4: Documents */}
            {step === 4 && (
              <div className="space-y-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center"><Upload className="w-5 h-5 text-[#2E7D32]" /></div>
                  <div><h3 className="font-poppins font-semibold text-base text-[#111827]">Upload Documents</h3><p className="text-xs text-[#9CA3AF]">Upload required documents for verification</p></div>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'ID Proof (Aadhar/PAN/Driving License) *', key: 'idProof' as const, icon: FileText },
                    { label: 'Passport Size Photo *', key: 'photo' as const, icon: User },
                    { label: 'Resume / CV *', key: 'resume' as const, icon: FileText },
                  ].map(doc => (
                    <div key={doc.key} className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-6 hover:border-[#2E7D32] transition-colors cursor-pointer" onClick={() => document.getElementById(doc.key)?.click()}>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-[#F3F4F6] flex items-center justify-center"><doc.icon className="w-6 h-6 text-[#6B7280]" /></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[#111827]">{form[doc.key] ? (form[doc.key] as File).name : doc.label}</p>
                          <p className="text-xs text-[#9CA3AF]">{form[doc.key] ? 'File selected' : 'Click to upload or drag and drop'}</p>
                        </div>
                        {form[doc.key] && <CheckCircle2 className="w-5 h-5 text-[#2E7D32]" />}
                      </div>
                      <input id={doc.key} type="file" className="hidden" onChange={e => update(doc.key, e.target.files?.[0] || null)} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#E5E7EB]">
              <Button variant="outline" onClick={prevStep} disabled={step === 1} className="h-11 rounded-xl px-6">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              <Button onClick={nextStep} className="h-11 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl px-6">
                {step === totalSteps ? 'Submit Application' : 'Next'} {step !== totalSteps && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
