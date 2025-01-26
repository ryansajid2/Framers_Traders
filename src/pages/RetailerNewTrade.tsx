import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample product data
const products = [
  { id: "P001", name: "Fresh Tomatoes", price: 4.99 },
  { id: "P002", name: "Organic Potatoes", price: 3.99 },
  { id: "P003", name: "Green Lettuce", price: 2.99 },
  { id: "P004", name: "Fresh Carrots", price: 3.49 },
];

interface FormData {
  name: string;
  location: string;
  userId: string;
  productId: string;
  productName: string;
  quantity: string;
  contact: string;
}

const RetailerNewTrade = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    location: "",
    userId: "",
    productId: "",
    productName: "",
    quantity: "",
    contact: "",
  });

  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  const handleProductSelect = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setFormData(prev => ({
        ...prev,
        productId: product.id,
        productName: product.name,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const calculateTotal = () => {
    if (selectedProduct && formData.quantity) {
      return (selectedProduct.price * Number(formData.quantity)).toFixed(2);
    }
    return "0.00";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">New Trade Request</h1>
      </div>
      
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your full name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Your location"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="userId">User ID</Label>
                <Input
                  id="userId"
                  value={formData.userId}
                  onChange={(e) => setFormData(prev => ({ ...prev, userId: e.target.value }))}
                  placeholder="Your user ID"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact">Contact Information</Label>
                <Textarea
                  id="contact"
                  value={formData.contact}
                  onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                  placeholder="Phone number, email, or other contact details"
                  required
                />
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Product Information</h2>
              
              <div className="space-y-2">
                <Label htmlFor="productId">Product</Label>
                <Select onValueChange={handleProductSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} - ৳{product.price}/unit
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                  placeholder="Enter quantity"
                  required
                />
              </div>

              {selectedProduct && formData.quantity && (
                <Card className="p-4 bg-muted">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Price per unit:</span>
                      <span>৳{selectedProduct.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quantity:</span>
                      <span>{formData.quantity} units</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total Amount:</span>
                      <span>৳{calculateTotal()}</span>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline">Cancel</Button>
            <Button type="submit">Submit Trade Request</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default RetailerNewTrade;
