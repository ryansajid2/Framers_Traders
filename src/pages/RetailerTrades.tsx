import { useTradeHistoryData } from "@/hooks/useGoogleSheets";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

const RetailerTrades = () => {
  const { data: trades, isLoading } = useTradeHistoryData();

  // Filter trades for retailers only
  const retailerTrades = trades?.filter((trade) => trade.buyer_type === 'retailer') || [];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-[200px]" />
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Trade History</h1>
        <div className="space-x-2">
          <Button variant="outline">Daily</Button>
          <Button variant="outline">Monthly</Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Trade ID</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Amount (BDT)</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {retailerTrades.map((trade) => (
              <TableRow key={trade.trade_id}>
                <TableCell>
                  {format(new Date(trade.date), 'MMM dd, yyyy')}
                </TableCell>
                <TableCell>{trade.trade_id}</TableCell>
                <TableCell>{trade.seller_name}</TableCell>
                <TableCell>{trade.product_name}</TableCell>
                <TableCell>{trade.quantity} {trade.unit}</TableCell>
                <TableCell>{trade.amount} BDT</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    trade.status === 'completed' ? 'bg-green-100 text-green-800' :
                    trade.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {trade.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RetailerTrades;
