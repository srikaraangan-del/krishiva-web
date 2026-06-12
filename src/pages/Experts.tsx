import DashboardLayout from '@/components/DashboardLayout';
import { GraduationCap } from 'lucide-react';

export default function Experts() {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 rounded-2xl bg-krishiva-green/10 flex items-center justify-center mb-4">
          <GraduationCap className="w-8 h-8 text-krishiva-green" />
        </div>
        <h1 className="font-poppins font-bold text-2xl text-text-primary mb-2">Expert Connect</h1>
        <p className="text-text-secondary text-center max-w-sm">
          Book consultations with agronomists, veterinarians, and soil scientists.
        </p>
      </div>
    </DashboardLayout>
  );
}
