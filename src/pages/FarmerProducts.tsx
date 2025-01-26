import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Slider
} from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Sample product data
const products = [
  {
    id: "PRD001",
    name: "Fresh Tomatoes",
    category: "Vegetables",
    quantity: 500,
    listPrice: 4.99,
    costPrice: 2.50,
    image: "/tomatoes.jpg"
  },
  {
    id: "PRD002",
    name: "Organic Potatoes",
    category: "Root Vegetables",
    quantity: 350,
    listPrice: 3.99,
    costPrice: 1.75,
    image: "/potatoes.jpg"
  },
  {
    id: "PRD003",
    name: "Green Lettuce",
    category: "Leafy Greens",
    quantity: 200,
    listPrice: 2.99,
    costPrice: 1.25,
    image: "/lettuce.jpg"
  },
  {
    id: "PRD004",
    name: "Fresh Carrots",
    category: "Root Vegetables",
    quantity: 600,
    listPrice: 3.49,
    costPrice: 1.50,
    image: "/carrots.jpg"
  }
];

const categories = [
  "All Categories",
  "Vegetables",
  "Root Vegetables",
  "Leafy Greens",
  "Fruits",
  "Grains"
];

const FarmerProducts = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">My Products</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input className="pl-10" placeholder="Search products..." />
        </div>
        
        <div className="flex gap-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category.toLowerCase()}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Products</SheetTitle>
                <SheetDescription>
                  Adjust the filters to find specific products
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Price Range</h4>
                  <Slider
                    defaultValue={[0, 100]}
                    max={100}
                    step={1}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>$0</span>
                    <span>$100</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Categories</h4>
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <input type="checkbox" id={category} />
                      <label htmlFor={category}>{category}</label>
                    </div>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-square bg-muted relative">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/400x400?text=Product+Image';
                }}
              />
              <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                {product.id}
              </div>
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.category}</p>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Quantity:</span>
                  <span>{product.quantity} kg</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">List Price:</span>
                  <span className="font-medium">${product.listPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Cost Price:</span>
                  <span className="font-medium">${product.costPrice.toFixed(2)}</span>
                </div>
              </div>
              <Button className="w-full mt-4">Edit Product</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FarmerProducts;
