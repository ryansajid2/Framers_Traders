import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const NewTrade = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-primary">New Trade</h1>
      
      <Card className="p-6">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Select Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="farmer">Farmer</SelectItem>
                  <SelectItem value="retailer">Retailer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Name</Label>
              <Input placeholder="Enter name" />
            </div>
            
            <div className="space-y-2">
              <Label>Location</Label>
              <Input placeholder="Enter location" />
            </div>
            
            <div className="space-y-2">
              <Label>User ID</Label>
              <Input placeholder="Enter user ID" />
            </div>
            
            <div className="space-y-2">
              <Label>Product Name</Label>
              <Input placeholder="Enter product name" />
            </div>
            
            <div className="space-y-2">
              <Label>Quantity</Label>
              <Input type="number" placeholder="Enter quantity" />
            </div>
            
            <div className="space-y-2">
              <Label>Price per Unit</Label>
              <Input type="number" placeholder="Enter price" />
            </div>
            
            <div className="space-y-2">
              <Label>Contact Information</Label>
              <Input placeholder="Enter contact details" />
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button variant="outline">Cancel</Button>
            <Button>Submit Trade</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default NewTrade;