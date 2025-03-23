
import { CreditCard, DollarSign, Building, Banknote } from 'lucide-react';

export const PAYMENT_METHOD_TYPES = [
  { value: 'creditCard', label: 'Credit Card', icon: CreditCard },
  { value: 'bankTransfer', label: 'Bank Transfer', icon: Building },
  { value: 'cash', label: 'Cash', icon: Banknote },
  { value: 'other', label: 'Other Payment Method', icon: DollarSign }
];

export const PAYMENT_METHODS = {
  creditCard: {
    name: 'Credit Card',
    icon: CreditCard,
    fields: [
      { name: 'acceptedCards', label: 'Accepted Cards' }
    ]
  },
  bankTransfer: {
    name: 'Bank Transfer',
    icon: Building,
    fields: [
      { name: 'bankAccountDetails', label: 'Bank Account Details', isComplex: true }
    ]
  },
  cash: {
    name: 'Cash',
    icon: Banknote,
    fields: [
      { name: 'cashInfo', label: 'Cash Payment Information' }
    ]
  },
  other: {
    name: 'Other',
    icon: DollarSign,
    fields: [
      { name: 'description', label: 'Description' }
    ]
  }
};

// Default payment methods to initialize the form with consistent IDs
export const DEFAULT_PAYMENT_METHODS = [
  { id: 'cash', name: 'Cash', enabled: true },
  { id: 'credit-card', name: 'Credit Card', enabled: false },
  { id: 'debit-card', name: 'Debit Card', enabled: false },
  { id: 'bank-transfer', name: 'Bank Transfer', enabled: false },
  { id: 'paypal', name: 'PayPal', enabled: false },
  { id: 'mobile-payment', name: 'Mobile Payment', enabled: false },
  { id: 'crypto', name: 'Cryptocurrency', enabled: false }
];
