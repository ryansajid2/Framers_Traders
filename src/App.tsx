import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
            <Route path="/farmer" element={<FarmerDashboard />} />
            <Route path="/retailer" element={<RetailerDashboard />} />
            <Route path="/" element={<FarmerDashboard />} />
            <Route path="/farmer/inventory" element={<FarmerInventory />} />
            <Route path="/retailer/inventory" element={<RetailerInventory />} />
            <Route path="/farmer/products" element={<FarmerProducts />} />
            <Route path="/retailer/products" element={<RetailerProducts />} />
            <Route path="/farmer/trades" element={<FarmerTrades />} />
            <Route path="/retailer/trades" element={<RetailerTrades />} />
            <Route path="/farmer/new-trade" element={<FarmerNewTrade />} />
            <Route path="/retailer/new-trade" element={<RetailerNewTrade />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;