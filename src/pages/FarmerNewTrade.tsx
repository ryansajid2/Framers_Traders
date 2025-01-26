import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { useState } from "react";

// Sample order data
const orders = [
  {
    id: "ORD001",
    date: new Date(),
    retailerId: "R001",
    retailerName: "Metro Supermarket",
    productId: "P001",
    productName: "Fresh Tomatoes",
    quantity: 100,
    pricePerUnit: 4.99,
    status: "Pending",
    contact: "+880 1234567890",
    location: "Dhaka, Bangladesh"
  },
  {
    id: "ORD002",
    date: new Date(),
    retailerId: "R002",
    retailerName: "Fresh Mart",
    productId: "P002",
    productName: "Organic Potatoes",
    quantity: 150,
    pricePerUnit: 3.99,
    status: "Pending",
    contact: "+880 1234567891",
    location: "Chittagong, Bangladesh"
  },
  {
    id: "ORD003",
    date: new Date(),
    retailerId: "R003",
    retailerName: "Green Grocers",
    productId: "P003",
    productName: "Green Lettuce",
    quantity: 75,
    pricePerUnit: 2.99,
    status: "Pending",
    contact: "+880 1234567892",
    location: "Sylhet, Bangladesh"
  }
];

interface Order {
  id: string;
  date: Date;
  retailerId: string;
  retailerName: string;
  productId: string;
  productName: string;
  quantity: number;
  pricePerUnit: number;
  status: string;
  contact: string;
  location: string;
}

const FarmerNewTrade = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingOrders, setPendingOrders] = useState(orders);

  const handleAction = (orderId: string, action: 'accept' | 'reject') => {
    setPendingOrders(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { ...order, status: action === 'accept' ? 'Accepted' : 'Rejected' }
          : order
      )
    );
    setIsDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'bg-success/20 text-success';
      case 'rejected':
        return 'bg-destructive/20 text-destructive';
      default:
        return 'bg-warning/20 text-warning';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Pending Trade Requests</h1>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-warning">
            {pendingOrders.filter(o => o.status === 'Pending').length} Pending
          </Badge>
          <Badge variant="outline" className="text-success">
            {pendingOrders.filter(o => o.status === 'Accepted').length} Accepted
          </Badge>
          <Badge variant="outline" className="text-destructive">
            {pendingOrders.filter(o => o.status === 'Rejected').length} Rejected
          </Badge>
        </div>
      </div>
      
      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Retailer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Total Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{format(order.date, 'MMM dd, yyyy')}</TableCell>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.retailerName}</TableCell>
                <TableCell>{order.productName}</TableCell>
                <TableCell className="text-right">{order.quantity}</TableCell>
                <TableCell className="text-right">
                  ৳{(order.quantity * order.pricePerUnit).toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {order.status === 'Pending' && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedOrder(order);
                        setIsDialogOpen(true);
                      }}
                    >
                      Review
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedOrder && (
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Review Trade Request</DialogTitle>
              <DialogDescription>
                Order ID: {selectedOrder.id}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Retailer Information</h4>
                  <p className="text-sm">{selectedOrder.retailerName}</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.location}</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.contact}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Order Details</h4>
                  <p className="text-sm">{selectedOrder.productName}</p>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {selectedOrder.quantity} units
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Price: ৳{selectedOrder.pricePerUnit}/unit
                  </p>
                  <p className="text-sm font-medium mt-2">
                    Total: ৳{(selectedOrder.quantity * selectedOrder.pricePerUnit).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter className="sm:justify-end">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleAction(selectedOrder.id, 'reject')}
                  className="w-[100px]"
                >
                  Reject
                </Button>
                <Button
                  onClick={() => handleAction(selectedOrder.id, 'accept')}
                  className="w-[100px]"
                >
                  Accept
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default FarmerNewTrade;
