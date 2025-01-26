import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, ChevronRight, MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

// Sample data for farmers and their products
const farmersData = [
  {
    id: "F001",
    name: "Green Valley Farms",
    division: "North",
    location: "Northern Valley",
    rating: 4.8,
    products: [
      {
        id: "PRD001",
        name: "Fresh Tomatoes",
        category: "Vegetables",
        quantity: 500,
        price: 4.99,
        image: "/tomatoes.jpg"
      },
      {
        id: "PRD002",
        name: "Organic Potatoes",
        category: "Root Vegetables",
        quantity: 350,
        price: 3.99,
        image: "/potatoes.jpg"
      }
    ]
  },
  {
    id: "F002",
    name: "Sunrise Agriculture",
    division: "East",
    location: "Eastern Plains",
    rating: 4.5,
    products: [
      {
        id: "PRD003",
        name: "Green Lettuce",
        category: "Leafy Greens",
        quantity: 200,
        price: 2.99,
        image: "/lettuce.jpg"
      }
    ]
  },
  {
    id: "F003",
    name: "Western Harvest Co",
    division: "West",
    location: "Western Hills",
    rating: 4.9,
    products: [
      {
        id: "PRD004",
        name: "Fresh Carrots",
        category: "Root Vegetables",
        quantity: 600,
        price: 3.49,
        image: "/carrots.jpg"
      }
    ]
  }
];

const divisions = ["All Divisions", "North", "South", "East", "West", "Central"];
const locations = ["All Locations", "Northern Valley", "Eastern Plains", "Western Hills", "Southern Fields", "Central Basin"];

const RetailerProducts = () => {
  const [selectedFarmer, setSelectedFarmer] = useState<string | null>(null);
  const [selectedDivision, setSelectedDivision] = useState<string>("All Divisions");

  const filteredFarmers = selectedDivision === "All Divisions" 
    ? farmersData 
    : farmersData.filter(farmer => farmer.division === selectedDivision);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Browse Products</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input className="pl-10" placeholder="Search farmers or products..." />
        </div>
        
        <div className="flex gap-4">
          <Select value={selectedDivision} onValueChange={setSelectedDivision}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Division" />
            </SelectTrigger>
            <SelectContent>
              {divisions.map((division) => (
                <SelectItem key={division} value={division}>
                  {division}
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
                <SheetTitle>Filter Options</SheetTitle>
                <SheetDescription>
                  Filter farmers by location and price range
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Locations</h4>
                  {locations.map((location) => (
                    <div key={location} className="flex items-center space-x-2">
                      <input type="checkbox" id={location} />
                      <label htmlFor={location}>{location}</label>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Price Range</h4>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>$0</span>
                    <span>$100</span>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {filteredFarmers.map((farmer) => (
          <Card key={farmer.id} className="p-6">
            <Accordion type="single" collapsible>
              <AccordionItem value={farmer.id}>
                <AccordionTrigger>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      {farmer.name.charAt(0)}
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">{farmer.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{farmer.location}</span>
                        <span className="text-yellow-500">★</span>
                        <span>{farmer.rating}</span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                    {farmer.products.map((product) => (
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
                              <span className="text-muted-foreground">Available:</span>
                              <span>{product.quantity} kg</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Price:</span>
                              <span className="font-medium">${product.price.toFixed(2)}/kg</span>
                            </div>
                          </div>
                          <Button className="w-full mt-4">Add to Cart</Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RetailerProducts;
