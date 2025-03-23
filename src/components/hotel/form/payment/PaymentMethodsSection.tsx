
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  FormField, 
  FormItem,
  FormControl,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { FormValues } from '../formSchema';
import { CreditCard, Plus, X, Building, Bank, CreditCard as CardIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { defaultBankAccountDetails } from '../formDefaults';

const DEFAULT_PAYMENT_METHODS = [
  { id: 'cash', name: 'Cash', enabled: true },
  { id: 'credit-card', name: 'Credit Card', enabled: false },
  { id: 'debit-card', name: 'Debit Card', enabled: false },
  { id: 'bank-transfer', name: 'Bank Transfer', enabled: false },
  { id: 'paypal', name: 'PayPal', enabled: false },
  { id: 'mobile-payment', name: 'Mobile Payment', enabled: false },
  { id: 'crypto', name: 'Cryptocurrency', enabled: false }
];

const PaymentMethodsSection: React.FC = () => {
  const form = useFormContext<FormValues>();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'paymentMethods'
  });

  // Initialize payment methods if empty
  React.useEffect(() => {
    if (fields.length === 0) {
      DEFAULT_PAYMENT_METHODS.forEach(method => {
        if (method.id === 'bank-transfer') {
          append({
            ...method,
            bankAccountDetails: defaultBankAccountDetails
          });
        } else {
          append(method);
        }
      });
    }
  }, [fields.length, append]);

  const [newMethodName, setNewMethodName] = useState('');

  const handleAddPaymentMethod = () => {
    if (newMethodName.trim()) {
      append({
        id: `method-${Date.now()}`,
        name: newMethodName.trim(),
        enabled: true
      });
      setNewMethodName('');
    }
  };

  const bankTransferIndex = fields.findIndex(field => field.id === 'bank-transfer');
  const isBankTransferEnabled = bankTransferIndex !== -1 ? 
    form.getValues(`paymentMethods.${bankTransferIndex}.enabled`) : false;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-blue-500" />
          Payment Methods
        </CardTitle>
        <CardDescription>
          Select the payment methods your hotel accepts and provide necessary details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id}>
              <FormField
                control={form.control}
                name={`paymentMethods.${index}.enabled`}
                render={({ field: checkboxField }) => (
                  <FormItem className="flex flex-row items-center justify-between space-x-3 space-y-0 rounded-md border p-4">
                    <div className="flex items-center space-x-3">
                      <FormControl>
                        <Checkbox
                          checked={checkboxField.value}
                          onCheckedChange={checkboxField.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        {form.getValues(`paymentMethods.${index}.name`)}
                      </FormLabel>
                    </div>
                    {!['cash', 'credit-card', 'debit-card', 'bank-transfer'].includes(field.id) && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    )}
                  </FormItem>
                )}
              />

              {/* Bank Transfer Details */}
              {field.id === 'bank-transfer' && form.getValues(`paymentMethods.${index}.enabled`) && (
                <div className="mt-2 ml-8 mr-2">
                  <Accordion type="single" collapsible defaultValue="bank-details">
                    <AccordionItem value="bank-details">
                      <AccordionTrigger className="py-2">
                        <div className="flex items-center text-sm font-medium">
                          <Bank className="h-4 w-4 mr-2 text-blue-500" />
                          Bank Account Details
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3">
                          <FormField
                            control={form.control}
                            name={`paymentMethods.${index}.bankAccountDetails.accountName`}
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
                            name={`paymentMethods.${index}.bankAccountDetails.accountNumber`}
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
                            name={`paymentMethods.${index}.bankAccountDetails.bankName`}
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
                            name={`paymentMethods.${index}.bankAccountDetails.branchName`}
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
                            name={`paymentMethods.${index}.bankAccountDetails.swiftCode`}
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
                            name={`paymentMethods.${index}.bankAccountDetails.iban`}
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
                              name={`paymentMethods.${index}.bankAccountDetails.additionalInfo`}
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
              )}
            </div>
          ))}

          <Separator className="my-4" />

          <div className="flex items-center space-x-2">
            <Input
              placeholder="Add new payment method"
              value={newMethodName}
              onChange={e => setNewMethodName(e.target.value)}
              className="flex-1"
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddPaymentMethod();
                }
              }}
            />
            <Button 
              type="button" 
              onClick={handleAddPaymentMethod}
              disabled={!newMethodName.trim()}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodsSection;
