
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Building, CreditCard, Bank } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '../form/formSchema';
import BankAccountDetails from './BankAccountDetails';
import { motion } from 'framer-motion';

interface BankDetailsSectionProps {
  bankTransferMethod: any;
}

const BankDetailsSection: React.FC<BankDetailsSectionProps> = ({ bankTransferMethod }) => {
  const form = useFormContext<FormValues>();
  
  // Find the index of the bank transfer method in the payment methods array
  const paymentMethods = form.getValues('paymentMethods') || [];
  const bankMethodIndex = paymentMethods.findIndex(method => method.id === 'bank-transfer');
  
  return (
    <Card className="border-indigo-100 dark:border-indigo-900 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-b border-indigo-100 dark:border-indigo-900">
        <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
          <motion.div
            whileHover={{ y: [0, -2, 0, -2, 0] }}
            transition={{ duration: 0.5 }}
          >
            <Bank className="h-5 w-5 text-blue-500" />
          </motion.div>
          Bank Account Information
        </CardTitle>
        <CardDescription className="text-blue-600/70 dark:text-blue-400/70">
          These bank details will be shown to customers who want to pay via bank transfer
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {bankMethodIndex >= 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <BankAccountDetails paymentMethodIndex={bankMethodIndex} />
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center p-8 space-y-4"
          >
            <div className="inline-flex items-center justify-center p-8 bg-blue-50 dark:bg-blue-950/30 rounded-full">
              <CreditCard className="h-12 w-12 text-blue-300 dark:text-blue-700" />
            </div>
            <div className="text-muted-foreground max-w-md mx-auto">
              <h3 className="text-lg font-medium mb-2 text-blue-700 dark:text-blue-300">Bank Transfer Not Enabled</h3>
              <p className="text-sm">Please enable Bank Transfer in the Payment tab first before configuring bank details.</p>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default BankDetailsSection;
