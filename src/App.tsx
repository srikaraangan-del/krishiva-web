import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Feed from './pages/Feed'
import FarmOS from './pages/FarmOS'
import Produce from './pages/Produce'
import MarketPrices from './pages/MarketPrices'
import CropDoctor from './pages/CropDoctor'
import BuyerConnect from './pages/BuyerConnect'
import Community from './pages/Community'
import Experts from './pages/Experts'
import Wallet from './pages/Wallet'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard'
import EmployeeApply from './pages/employee/EmployeeApply'
import EmployeeLogin from './pages/employee/EmployeeLogin'
import EmployeeSetup from './pages/employee/EmployeeSetup'
import EmployeeDashboard from './pages/employee/EmployeeDashboard'
import FarmerOnboard from './pages/employee/FarmerOnboard'
import FertilizerOnboard from './pages/employee/FertilizerOnboard'
import DroneOnboard from './pages/employee/DroneOnboard'
import TractorOnboard from './pages/employee/TractorOnboard'
import LaborOnboard from './pages/employee/LaborOnboard'
import PaddyBuyerOnboard from './pages/employee/PaddyBuyerOnboard'
import NewAdminDashboard from './pages/admin/AdminDashboard'

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />

      {/* Farmer Dashboard Routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/feed" element={<Feed />} />
      <Route path="/dashboard/farm" element={<FarmOS />} />
      <Route path="/dashboard/produce" element={<Produce />} />
      <Route path="/dashboard/market-prices" element={<MarketPrices />} />
      <Route path="/dashboard/crop-doctor" element={<CropDoctor />} />
      <Route path="/dashboard/buyer-connect" element={<BuyerConnect />} />
      <Route path="/dashboard/community" element={<Community />} />
      <Route path="/dashboard/experts" element={<Experts />} />
      <Route path="/dashboard/wallet" element={<Wallet />} />
      <Route path="/dashboard/profile" element={<Profile />} />

      {/* Employee Routes */}
      <Route path="/employee/apply" element={<EmployeeApply />} />
      <Route path="/employee/login" element={<EmployeeLogin />} />
      <Route path="/employee/setup" element={<EmployeeSetup />} />
      <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
      <Route path="/employee/onboard/farmer" element={<FarmerOnboard />} />
      <Route path="/employee/onboard/fertilizer" element={<FertilizerOnboard />} />
      <Route path="/employee/onboard/drone" element={<DroneOnboard />} />
      <Route path="/employee/onboard/tractor" element={<TractorOnboard />} />
      <Route path="/employee/onboard/labor" element={<LaborOnboard />} />
      <Route path="/employee/onboard/buyer" element={<PaddyBuyerOnboard />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<NewAdminDashboard />} />
      <Route path="/admin/old" element={<AdminDashboard />} />
    </Routes>
  )
}
