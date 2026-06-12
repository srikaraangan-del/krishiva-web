import DashboardLayout from '@/components/DashboardLayout';
import { LayoutDashboard, TrendingUp, Cloud, Calendar } from 'lucide-react';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-krishiva-green/10 flex items-center justify-center">
            <LayoutDashboard className="w-6 h-6 text-krishiva-green" />
          </div>
          <div>
            <h1 className="font-poppins font-bold text-2xl text-text-primary">Daily Companion</h1>
            <p className="text-text-secondary text-sm">Your personalized farming dashboard</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: TrendingUp, label: 'Market Trends', value: '+12%', sub: 'Wheat prices rising' },
            { icon: Cloud, label: 'Weather', value: '32°C', sub: 'Sunny, 0% rain' },
            { icon: Calendar, label: 'Tasks Today', value: '5', sub: '2 pending' },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-2xl p-5 border border-border-light shadow-card"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-krishiva-green/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-krishiva-green" />
                </div>
                <span className="text-text-secondary text-sm font-medium">{item.label}</span>
              </div>
              <p className="font-poppins font-bold text-3xl text-text-primary">{item.value}</p>
              <p className="text-text-muted text-xs mt-1">{item.sub}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white rounded-2xl p-6 border border-border-light shadow-card">
          <h2 className="font-poppins font-semibold text-lg text-text-primary mb-3">
            Welcome to your Dashboard
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            This is your central hub for managing your farm. Access all 13 services from the sidebar,
            track your daily activities, and stay updated with the latest market prices and weather.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
