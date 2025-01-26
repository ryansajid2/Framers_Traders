import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Package, Users, DollarSign, TrendingUp } from "lucide-react";

const purchaseData = [
  { name: "Jan", value: 300 },
  { name: "Feb", value: 400 },
  { name: "Mar", value: 550 },
  { name: "Apr", value: 700 },
  { name: "May", value: 600 },
];

const orderCompletionData = [
  { name: "Completed", value: 85 },
  { name: "Pending", value: 15 },
];

const COLORS = ['#2D5A27', '#e11d48'];

const RetailerDashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-primary">Retailer Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 flex items-center space-x-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Package className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Current Inventory</p>
            <h3 className="text-2xl font-bold">856</h3>
          </div>
        </Card>
        
        <Card className="p-4 flex items-center space-x-4">
          <div className="p-3 bg-secondary/10 rounded-full">
            <Users className="h-6 w-6 text-secondary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Connected Farmers</p>
            <h3 className="text-2xl font-bold">28</h3>
          </div>
        </Card>
        
        <Card className="p-4 flex items-center space-x-4">
          <div className="p-3 bg-success/10 rounded-full">
            <DollarSign className="h-6 w-6 text-success" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Purchases</p>
            <h3 className="text-2xl font-bold">$38,500</h3>
          </div>
        </Card>
        
        <Card className="p-4 flex items-center space-x-4">
          <div className="p-3 bg-warning/10 rounded-full">
            <TrendingUp className="h-6 w-6 text-warning" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Monthly Growth</p>
            <h3 className="text-2xl font-bold">+8.3%</h3>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Purchase Graph</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={purchaseData}>
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
          <h3 className="text-lg font-semibold mb-4">Order Completion</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderCompletionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {orderCompletionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {orderCompletionData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-sm">{entry.name}: {entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Latest Transactions</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">Purchase #{i}567</p>
                  <p className="text-sm text-muted-foreground">3 hours ago</p>
                </div>
                <span className="text-primary font-semibold">$98.75</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Inventory List</h3>
          <div className="space-y-4">
            {[
              { name: "Tomatoes", quantity: "200 kg", status: "In Stock" },
              { name: "Potatoes", quantity: "150 kg", status: "Low Stock" },
              { name: "Onions", quantity: "100 kg", status: "In Stock" },
              { name: "Carrots", quantity: "50 kg", status: "Critical" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.quantity}</p>
                </div>
                <span className={`text-sm font-medium ${
                  item.status === "In Stock" ? "text-success" :
                  item.status === "Low Stock" ? "text-warning" :
                  "text-destructive"
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RetailerDashboard;
