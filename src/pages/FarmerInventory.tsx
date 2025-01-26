import { useInventoryData } from "@/hooks/useGoogleSheets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FarmerInventory() {
  const { data: inventory, isLoading } = useInventoryData();

  // Filter inventory for farmers only
  const farmerInventory = inventory?.filter((item) => item.owner_type === 'farmer') || [];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-[200px]" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
        </div>
      </div>
    );
  }

  // Calculate inventory statistics
  const totalItems = farmerInventory.length;
  const totalValue = farmerInventory.reduce((sum, item) => sum + (Number(item.quantity) * Number(item.price_per_unit)), 0);
  const lowStock = farmerInventory.filter(item => Number(item.quantity) < Number(item.min_stock_level)).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Inventory Management</h1>
        <Button>Add New Item</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Items</CardTitle>
            <CardDescription>Number of unique products</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalItems}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Value</CardTitle>
            <CardDescription>Current inventory value</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalValue.toLocaleString()} BDT</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Low Stock Items</CardTitle>
            <CardDescription>Items below minimum level</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{lowStock}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input placeholder="Search items..." />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="fruits">Fruits</SelectItem>
                <SelectItem value="grains">Grains</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {farmerInventory.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <CardTitle>{item.product_name}</CardTitle>
                  <CardDescription>{item.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Quantity:</span>
                      <span className="font-medium">{item.quantity} {item.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price per unit:</span>
                      <span className="font-medium">{item.price_per_unit} BDT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Value:</span>
                      <span className="font-medium">
                        {(Number(item.quantity) * Number(item.price_per_unit)).toLocaleString()} BDT
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        Number(item.quantity) > Number(item.min_stock_level)
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {Number(item.quantity) > Number(item.min_stock_level) ? 'In Stock' : 'Low Stock'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
