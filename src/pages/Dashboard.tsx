import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Package, Users, DollarSign, TrendingUp } from "lucide-react";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-primary">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 flex items-center space-x-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Package className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Inventory</p>
            <h3 className="text-2xl font-bold">1,234</h3>
          </div>
        </Card>
        
        <Card className="p-4 flex items-center space-x-4">
          <div className="p-3 bg-secondary/10 rounded-full">
            <Users className="h-6 w-6 text-secondary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Connected Retailers</p>
            <h3 className="text-2xl font-bold">45</h3>
          </div>
        </Card>
        
        <Card className="p-4 flex items-center space-x-4">
          <div className="p-3 bg-success/10 rounded-full">
            <DollarSign className="h-6 w-6 text-success" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Revenue</p>
            <h3 className="text-2xl font-bold">$52,000</h3>
          </div>
        </Card>
        
        <Card className="p-4 flex items-center space-x-4">
          <div className="p-3 bg-warning/10 rounded-full">
            <TrendingUp className="h-6 w-6 text-warning" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Growth</p>
            <h3 className="text-2xl font-bold">+12.5%</h3>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#2D5A27" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Latest Transactions</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">Order #{i}234</p>
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
                <span className="text-primary font-semibold">$123.45</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;