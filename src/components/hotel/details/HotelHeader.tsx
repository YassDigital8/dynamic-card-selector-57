
import React from 'react';
import { Flag, ArrowLeft, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HotelHeaderProps {
  name: string;
  posKey: string;
  country: string;
  governorate: string;
  onEdit: () => void;
  onBack?: () => void;
}

const HotelHeader: React.FC<HotelHeaderProps> = ({ 
  name, 
  posKey, 
  country, 
  governorate, 
  onEdit, 
  onBack 
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 p-6 rounded-xl -m-6 mb-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">{name}</h2>
            <Badge variant="outline" className="uppercase text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
              {posKey}
            </Badge>
          </div>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <Flag className="mr-1 h-3.5 w-3.5 text-indigo-500" />
            <span>{country}</span>
            <span className="px-1">•</span>
            <span>{governorate}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {onBack && (
            <Button 
              variant="outline" 
              onClick={onBack} 
              size="sm"
              className="group border-blue-200 dark:border-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/30"
            >
              <ArrowLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back
            </Button>
          )}
          <Button 
            onClick={onEdit} 
            className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <Pencil className="h-4 w-4" />
            Edit Hotel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HotelHeader;
