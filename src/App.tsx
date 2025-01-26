import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import FarmerDashboard from "./pages/FarmerDashboard";
import RetailerDashboard from "./pages/RetailerDashboard";
import FarmerInventory from "./pages/FarmerInventory";
import RetailerInventory from "./pages/RetailerInventory";
import FarmerProducts from "./pages/FarmerProducts";
import RetailerProducts from "./pages/RetailerProducts";
import FarmerTrades from "./pages/FarmerTrades";
import RetailerTrades from "./pages/RetailerTrades";
import FarmerNewTrade from "./pages/FarmerNewTrade";
import RetailerNewTrade from "./pages/RetailerNewTrade";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/farmer" replace />} />

            {/* Farmer Routes */}
            <Route path="/farmer" element={<FarmerDashboard />} />
            <Route path="/farmer/inventory" element={<FarmerInventory />} />
            <Route path="/farmer/products" element={<FarmerProducts />} />
            <Route path="/farmer/trades" element={<FarmerTrades />} />
            <Route path="/farmer/new-trade" element={<FarmerNewTrade />} />
            <Route path="/farmer/profile" element={<Profile />} />

            {/* Retailer Routes */}
            <Route path="/retailer" element={<RetailerDashboard />} />
            <Route path="/retailer/inventory" element={<RetailerInventory />} />
            <Route path="/retailer/products" element={<RetailerProducts />} />
            <Route path="/retailer/trades" element={<RetailerTrades />} />
            <Route path="/retailer/new-trade" element={<RetailerNewTrade />} />
            <Route path="/retailer/profile" element={<Profile />} />

            {/* Catch all redirect */}
            <Route path="*" element={<Navigate to="/farmer" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;