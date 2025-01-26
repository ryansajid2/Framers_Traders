import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Inventory = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Inventory Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Item
        </Button>
      </div>
      
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((i) => (
              <TableRow key={i}>
                <TableCell>Product {i}</TableCell>
                <TableCell>Category {i}</TableCell>
                <TableCell>{i * 100}</TableCell>
                <TableCell>${i * 10}.00</TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-success/20 text-success rounded-full text-sm">
                    In Stock
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Inventory;