import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";

// Sample trade data
const tradeData = [
  {
    date: "2024-01-25",
    tradeId: "TRD-001",
    farmerUid: "F-001",
    retailerUid: "R-001",
    amount: 1500,
    status: "Completed"
  },
  {
    date: "2024-01-24",
    tradeId: "TRD-002",
    farmerUid: "F-001",
    retailerUid: "R-002",
    amount: 2300,
    status: "Pending"
  },
  {
    date: "2024-01-23",
    tradeId: "TRD-003",
    farmerUid: "F-001",
    retailerUid: "R-003",
    amount: 1800,
    status: "Completed"
  },
  {
    date: "2024-01-22",
    tradeId: "TRD-004",
    farmerUid: "F-001",
    retailerUid: "R-001",
    amount: 3200,
    status: "Failed"
  },
  {
    date: "2024-01-21",
    tradeId: "TRD-005",
    farmerUid: "F-001",
    retailerUid: "R-004",
    amount: 2700,
    status: "Completed"
  }
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-success/20 text-success';
    case 'pending':
      return 'bg-warning/20 text-warning';
    case 'failed':
      return 'bg-destructive/20 text-destructive';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const FarmerTrades = () => {
  const [view, setView] = useState<'daily' | 'monthly'>('daily');
  const [date, setDate] = useState<Date>();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-primary">Trade History</h1>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Button 
              variant={view === 'daily' ? 'default' : 'outline'}
              onClick={() => setView('daily')}
            >
              Daily
            </Button>
            <Button 
              variant={view === 'monthly' ? 'default' : 'outline'}
              onClick={() => setView('monthly')}
            >
              Monthly
            </Button>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card className="p-6">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Trade ID</TableHead>
                <TableHead>Farmer UID</TableHead>
                <TableHead>Retailer UID</TableHead>
                <TableHead className="text-right">Amount (BDT)</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tradeData.map((trade) => (
                <TableRow key={trade.tradeId}>
                  <TableCell>{format(new Date(trade.date), 'MMM dd, yyyy')}</TableCell>
                  <TableCell className="font-medium">{trade.tradeId}</TableCell>
                  <TableCell>{trade.farmerUid}</TableCell>
                  <TableCell>{trade.retailerUid}</TableCell>
                  <TableCell className="text-right">{trade.amount.toLocaleString()} ৳</TableCell>
                  <TableCell className="text-center">
                    <Badge className={getStatusColor(trade.status)}>
                      {trade.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default FarmerTrades;
