
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FormField, 
  FormItem,
  FormControl,
  FormLabel
} from '@/components/ui/form';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { FormValues } from '../formSchema';
import { CreditCard, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

const DEFAULT_PAYMENT_METHODS = [
  { id: 'cash', name: 'Cash', enabled: true },
  { id: 'credit-card', name: 'Credit Card', enabled: false },
  { id: 'debit-card', name: 'Debit Card', enabled: false },
  { id: 'paypal', name: 'PayPal', enabled: false },
  { id: 'bank-transfer', name: 'Bank Transfer', enabled: false },
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
        append(method);
      });
    }
  }, [fields.length, append]);

  const [newMethodName, setNewMethodName] = React.useState('');

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-blue-500" />
          Payment Methods
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {fields.map((field, index) => (
            <FormField
              key={field.id}
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
                  {!['cash', 'credit-card', 'debit-card'].includes(field.id) && (
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
          ))}

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
