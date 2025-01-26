import { Home, Package, Store, FileText, UserCircle, BarChart3, SwitchCamera } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const getFarmerMenuItems = () => [
  { title: "Dashboard", path: "/farmer", icon: Home },
  { title: "Inventory", path: "/farmer/inventory", icon: Package },
  { title: "Products", path: "/farmer/products", icon: Store },
  { title: "Trades", path: "/farmer/trades", icon: BarChart3 },
  { title: "New Trade", path: "/farmer/new-trade", icon: FileText },
  { title: "Profile", path: "/farmer/profile", icon: UserCircle },
];

const getRetailerMenuItems = () => [
  { title: "Dashboard", path: "/retailer", icon: Home },
  { title: "Inventory", path: "/retailer/inventory", icon: Package },
  { title: "Products", path: "/retailer/products", icon: Store },
  { title: "Trades", path: "/retailer/trades", icon: BarChart3 },
  { title: "New Trade", path: "/retailer/new-trade", icon: FileText },
  { title: "Profile", path: "/retailer/profile", icon: UserCircle },
];

export function AppSidebar() {
  const location = useLocation();
  const isFarmerDashboard = location.pathname.startsWith('/farmer');
  const menuItems = isFarmerDashboard ? getFarmerMenuItems() : getRetailerMenuItems();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center justify-between px-4 py-2">
            <SidebarGroupLabel>AgriTrade</SidebarGroupLabel>
            <Link to={isFarmerDashboard ? "/retailer" : "/farmer"}>
              <Button variant="ghost" size="icon">
                <SwitchCamera className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="px-4 py-2">
            <p className="text-sm font-medium text-muted-foreground">
              {isFarmerDashboard ? "Farmer Dashboard" : "Retailer Dashboard"}
            </p>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={location.pathname === item.path ? "bg-accent/20" : ""}
                  >
                    <Link to={item.path} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}