import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Sample data - replace with actual data from your backend
const inventoryData = [
  {
    id: "PRD001",
    name: "Fresh Tomatoes",
    category: "Vegetables",
    quantity: 150,
    listPrice: 6.99,
    costPrice: 4.99,
    status: "In Stock"
  },
  {
    id: "PRD002",
    name: "Organic Potatoes",
    category: "Root Vegetables",
    quantity: 100,
    listPrice: 5.99,
    costPrice: 3.99,
    status: "Low Stock"
  },
  {
    id: "PRD003",
    name: "Green Lettuce",
    category: "Leafy Greens",
    quantity: 50,
    listPrice: 4.99,
    costPrice: 2.99,
    status: "Critical"
  },
  {
    id: "PRD004",
    name: "Fresh Carrots",
    category: "Root Vegetables",
    quantity: 200,
    listPrice: 4.99,
    costPrice: 3.49,
    status: "In Stock"
  },
  {
    id: "PRD005",
    name: "Sweet Corn",
    category: "Grains",
    quantity: 125,
    listPrice: 7.99,
    costPrice: 5.99,
    status: "In Stock"
  }
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'in stock':
      return 'bg-success/20 text-success';
    case 'low stock':
      return 'bg-warning/20 text-warning';
    case 'critical':
      return 'bg-destructive/20 text-destructive';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const RetailerInventory = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Retailer Inventory Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>
      
      <Card className="p-6">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Product ID</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">List Price</TableHead>
                <TableHead className="text-right">Cost Price</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="text-right">{item.quantity} kg</TableCell>
                  <TableCell className="text-right">${item.listPrice.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${item.costPrice.toFixed(2)}</TableCell>
                  <TableCell className="text-center">
                    <Badge className={`${getStatusColor(item.status)}`}>
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default RetailerInventory;
