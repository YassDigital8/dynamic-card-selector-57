
import React from 'react';
import { DollarSign } from 'lucide-react';

interface ExtraBedPriceProps {
  price: number;
}

const ExtraBedPrice: React.FC<ExtraBedPriceProps> = ({ price }) => {
  return (
    <div className="text-sm bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 flex items-center rounded-full px-2 py-0.5 ml-2">
      <DollarSign className="h-3.5 w-3.5 mr-0.5" />
      {price}
    </div>
  );
};

export default ExtraBedPrice;
