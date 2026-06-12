import DashboardLayout from '@/components/DashboardLayout';
import { Newspaper } from 'lucide-react';

export default function Feed() {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 rounded-2xl bg-krishiva-green/10 flex items-center justify-center mb-4">
          <Newspaper className="w-8 h-8 text-krishiva-green" />
        </div>
        <h1 className="font-poppins font-bold text-2xl text-text-primary mb-2">Smart Feed</h1>
        <p className="text-text-secondary text-center max-w-sm">
          Personalized agricultural news, weather alerts, market prices, and expert tips — all in one place.
        </p>
      </div>
    </DashboardLayout>
  );
}
