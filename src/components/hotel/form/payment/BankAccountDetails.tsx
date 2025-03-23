
import React, { useEffect } from 'react';
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Building } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '../formSchema';

interface BankAccountDetailsProps {
  paymentMethodIndex: number;
}

const BankAccountDetails: React.FC<BankAccountDetailsProps> = ({ paymentMethodIndex }) => {
  const form = useFormContext<FormValues>();
  
  // Log when this component renders
  useEffect(() => {
    console.log(`BankAccountDetails rendering for payment method ${paymentMethodIndex}`);
    console.log('Bank Account Details:', form.getValues(`paymentMethods.${paymentMethodIndex}.bankAccountDetails`));
  }, [paymentMethodIndex, form]);

  return (
    <div className="mt-2 ml-8 mr-2 border p-4 rounded-md bg-blue-50 dark:bg-blue-950/30">
      <Accordion type="single" collapsible defaultValue="bank-details">
        <AccordionItem value="bank-details" className="border-none">
          <AccordionTrigger className="py-2 hover:no-underline">
            <div className="flex items-center text-sm font-medium">
              <Building className="h-4 w-4 mr-2 text-blue-500" />
              Bank Account Details
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3">
              <FormField
                control={form.control}
                name={`paymentMethods.${paymentMethodIndex}.bankAccountDetails.accountName`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Account holder name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`paymentMethods.${paymentMethodIndex}.bankAccountDetails.accountNumber`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number*</FormLabel>
                    <FormControl>
                      <Input placeholder="Bank account number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`paymentMethods.${paymentMethodIndex}.bankAccountDetails.bankName`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Name of the bank" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`paymentMethods.${paymentMethodIndex}.bankAccountDetails.branchName`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Branch name (optional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`paymentMethods.${paymentMethodIndex}.bankAccountDetails.swiftCode`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SWIFT/BIC Code</FormLabel>
                    <FormControl>
                      <Input placeholder="International bank code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`paymentMethods.${paymentMethodIndex}.bankAccountDetails.iban`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>IBAN</FormLabel>
                    <FormControl>
                      <Input placeholder="International account number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-1 md:col-span-2">
                <FormField
                  control={form.control}
                  name={`paymentMethods.${paymentMethodIndex}.bankAccountDetails.additionalInfo`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Information</FormLabel>
                      <FormControl>
                        <Input placeholder="Any additional payment instructions" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default BankAccountDetails;
