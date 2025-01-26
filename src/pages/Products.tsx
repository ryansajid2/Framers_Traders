import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Products = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Products</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input className="pl-10" placeholder="Search products..." />
          </div>
          <Button>Filter</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="p-4">
            <div className="aspect-square bg-muted rounded-lg mb-4"></div>
            <h3 className="font-semibold">Product {i}</h3>
            <p className="text-sm text-muted-foreground mb-4">Category {i}</p>
            <div className="flex justify-between items-center">
              <span className="font-bold">${i * 10}.00</span>
              <Button variant="outline" size="sm">Add to Cart</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Products;