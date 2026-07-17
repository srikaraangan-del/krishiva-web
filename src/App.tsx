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
import DashboardLayout from './components/DashboardLayout'

function DashboardWrapper({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<DashboardWrapper><Dashboard /></DashboardWrapper>} />
      <Route path="/dashboard/feed" element={<DashboardWrapper><Feed /></DashboardWrapper>} />
      <Route path="/dashboard/farm" element={<DashboardWrapper><FarmOS /></DashboardWrapper>} />
      <Route path="/dashboard/produce" element={<DashboardWrapper><Produce /></DashboardWrapper>} />
      <Route path="/dashboard/market-prices" element={<DashboardWrapper><MarketPrices /></DashboardWrapper>} />
      <Route path="/dashboard/crop-doctor" element={<DashboardWrapper><CropDoctor /></DashboardWrapper>} />
      <Route path="/dashboard/buyer-connect" element={<DashboardWrapper><BuyerConnect /></DashboardWrapper>} />
      <Route path="/dashboard/community" element={<DashboardWrapper><Community /></DashboardWrapper>} />
      <Route path="/dashboard/experts" element={<DashboardWrapper><Experts /></DashboardWrapper>} />
      <Route path="/dashboard/wallet" element={<DashboardWrapper><Wallet /></DashboardWrapper>} />
      <Route path="/dashboard/profile" element={<DashboardWrapper><Profile /></DashboardWrapper>} />
    </Routes>
  )
}
