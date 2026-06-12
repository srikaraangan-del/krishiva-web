import DashboardLayout from '@/components/DashboardLayout';
import { IndianRupee } from 'lucide-react';

export default function Finance() {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 rounded-2xl bg-krishiva-green/10 flex items-center justify-center mb-4">
          <IndianRupee className="w-8 h-8 text-krishiva-green" />
        </div>
        <h1 className="font-poppins font-bold text-2xl text-text-primary mb-2">Finance Hub</h1>
        <p className="text-text-secondary text-center max-w-sm">
          Access farm loans, crop insurance, government schemes, and track your expenses.
        </p>
      </div>
    </DashboardLayout>
  );
}
