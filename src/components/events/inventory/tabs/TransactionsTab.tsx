
import React from 'react';
import { Event } from '@/models/EventModel';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, generateTransactions } from '../utils/inventoryUtils';

interface TransactionsTabProps {
  event: Event;
}

const TransactionsTab: React.FC<TransactionsTabProps> = ({ event }) => {
  const transactions = generateTransactions(event);
  
  return (
    <div className="py-4 space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <History className="h-5 w-5" />
          Recent Transactions
        </h3>
        
        <Card className="border border-muted overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Ticket Type</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                  <TableCell>{transaction.ticketType}</TableCell>
                  <TableCell>{transaction.quantity}</TableCell>
                  <TableCell>${transaction.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={transaction.status === 'Completed' ? "default" : "destructive"}>
                      {transaction.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        
        <div className="flex justify-end">
          <Button variant="outline" size="sm">
            View All Transactions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionsTab;
