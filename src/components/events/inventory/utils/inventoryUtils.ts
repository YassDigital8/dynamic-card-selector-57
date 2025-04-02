
import { Event, TicketInfo } from '@/models/EventModel';

/**
 * Calculate inventory percentage (remaining/total)
 */
export const calculateInventoryPercentage = (remaining?: number, total?: number) => {
  if (!remaining || !total || total === 0) return 0;
  return (remaining / total) * 100;
};

/**
 * Calculate tickets sold (total - remaining)
 */
export const calculateTicketsSold = (total?: number, remaining?: number) => {
  if (!total || !remaining) return 0;
  return total - remaining;
};

/**
 * Format date for transaction display
 */
export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

/**
 * Generate mock transaction data for an event
 */
export const generateTransactions = (event: Event) => {
  const now = new Date();
  const transactions = [];
  
  for (let i = 0; i < 5; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    transactions.push({
      id: `txn-${i}`,
      date,
      ticketType: event.ticketInfo?.[i % (event.ticketInfo?.length || 1)]?.name || 'Standard',
      quantity: Math.floor(Math.random() * 3) + 1,
      total: Math.floor(Math.random() * 200) + 50,
      status: i % 4 === 0 ? 'Refunded' : 'Completed'
    });
  }
  
  return transactions;
};
