import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const Trades = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Trade History</h1>
        <div className="space-x-2">
          <Button variant="outline">Daily</Button>
          <Button variant="outline">Monthly</Button>
        </div>
      </div>
      
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Trade ID</TableHead>
              <TableHead>Farmer</TableHead>
              <TableHead>Retailer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((i) => (
              <TableRow key={i}>
                <TableCell>2024/03/{i}</TableCell>
                <TableCell>TRD-{i}234</TableCell>
                <TableCell>Farmer {i}</TableCell>
                <TableCell>Retailer {i}</TableCell>
                <TableCell>${i * 100}.00</TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-success/20 text-success rounded-full text-sm">
                    Completed
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

export default Trades;