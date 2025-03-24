
import React from 'react';
import { DollarSign } from 'lucide-react';

interface ExtraBedPriceProps {
  price: number;
}

const ExtraBedPrice: React.FC<ExtraBedPriceProps> = ({ price }) => {
  return (
    <div className="text-sm text-blue-600 dark:text-blue-400 flex items-center ml-2">
      <DollarSign className="h-3.5 w-3.5 mr-0.5" />
      {price}
    </div>
  );
};

export default ExtraBedPrice;
