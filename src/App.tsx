import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Feed from './pages/Feed';
import FarmOS from './pages/FarmOS';
import Labor from './pages/Labor';
import Machinery from './pages/Machinery';
import Drones from './pages/Drones';
import Produce from './pages/Produce';
import Inputs from './pages/Inputs';
import CropDoctor from './pages/CropDoctor';
import Finance from './pages/Finance';
import Community from './pages/Community';
import Experts from './pages/Experts';
import Wallet from './pages/Wallet';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import BuyerConnect from './pages/BuyerConnect';
import MarketPrices from './pages/MarketPrices';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
          
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/feed" element={<Feed />} />
        <Route path="/dashboard/farm" element={<FarmOS />} />
        <Route path="/dashboard/labor" element={<Labor />} />
        <Route path="/dashboard/machinery" element={<Machinery />} />
        <Route path="/dashboard/drones" element={<Drones />} />
        <Route path="/dashboard/produce" element={<Produce />} />
        <Route path="/dashboard/inputs" element={<Inputs />} />
        <Route path="/dashboard/crop-doctor" element={<CropDoctor />} />
        <Route path="/dashboard/finance" element={<Finance />} />
        <Route path="/dashboard/community" element={<Community />} />
        <Route path="/dashboard/experts" element={<Experts />} />
        <Route path="/dashboard/wallet" element={<Wallet />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/buyer-connect" element={<BuyerConnect />} />
        <Route path="/dashboard/market-prices" element={<MarketPrices />} />
      </Routes>
    </AuthProvider>
  );
}
