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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
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
    </Routes>
  )
}
