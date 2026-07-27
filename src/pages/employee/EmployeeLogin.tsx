import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function EmployeeLogin() {
  const [empId, setEmpId] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!empId.trim() || !password.trim()) {
      setError('Please enter both Employee ID and Password');
      return;
    }
    // Mock login - in real app, verify with backend
    if (empId === 'KRISHIVA-EMP-1001' && password === 'TempPass@123') {
      navigate('/employee/setup');
    } else if (empId.length > 5 && password.length > 3) {
      navigate('/employee/dashboard');
    } else {
      setError('Invalid Employee ID or Password');
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#F8F9FA] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-md w-full">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#2E7D32] flex items-center justify-center mx-auto mb-3">
            <Briefcase className="w-7 h-7 text-white" strokeWidth={2} />
          </div>
          <h1 className="font-poppins font-bold text-2xl text-[#111827]">Employee Login</h1>
          <p className="text-sm text-[#6B7280] mt-1">Access your KRISHIVA employee portal</p>
        </div>

        <Card className="border-[#E5E7EB] shadow-card">
          <CardContent className="p-6 space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-700">{error}</div>
            )}
            <div>
              <label className="text-xs font-medium text-[#6B7280] mb-1 block">Employee ID</label>
              <input
                type="text"
                value={empId}
                onChange={e => setEmpId(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32] outline-none font-mono"
                placeholder="KRISHIVA-EMP-XXXX"
              />
              <p className="text-[10px] text-[#9CA3AF] mt-1">Enter the Employee ID received in your email</p>
            </div>
            <div>
              <label className="text-xs font-medium text-[#6B7280] mb-1 block">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full h-12 px-4 pr-12 rounded-xl border border-[#E5E7EB] text-sm focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32] outline-none"
                  placeholder="Enter your password"
                />
                <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1">
                  {showPass ? <EyeOff className="w-4 h-4 text-[#9CA3AF]" /> : <Eye className="w-4 h-4 text-[#9CA3AF]" />}
                </button>
              </div>
            </div>
            <Button onClick={handleLogin} className="w-full h-12 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl font-medium">
              Login <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <div className="text-center pt-2">
              <p className="text-xs text-[#9CA3AF]">Don't have an account? <button onClick={() => navigate('/employee/apply')} className="text-[#2E7D32] font-medium hover:underline">Apply here</button></p>
              <p className="text-xs text-[#9CA3AF] mt-1"><button className="text-[#2E7D32] font-medium hover:underline">Forgot Password?</button></p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-[10px] text-[#9CA3AF] mt-4">
          Demo: Use <span className="font-mono font-medium">KRISHIVA-EMP-1001</span> / <span className="font-mono font-medium">TempPass@123</span>
        </p>
      </motion.div>
    </div>
  );
}
