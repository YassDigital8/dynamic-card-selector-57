
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface AddPaymentMethodProps {
  onAdd: (name: string) => void;
}

const AddPaymentMethod: React.FC<AddPaymentMethodProps> = ({ onAdd }) => {
  const [newMethodName, setNewMethodName] = useState('');

  const handleAddPaymentMethod = () => {
    if (newMethodName.trim()) {
      onAdd(newMethodName);
      setNewMethodName('');
    }
  };

  return (
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
  );
};

export default AddPaymentMethod;
