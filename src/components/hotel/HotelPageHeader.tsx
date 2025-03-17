
import React from 'react';
import { Flag, Hotel as HotelIcon, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePageSelectionViewModel } from '@/viewmodels/PageSelectionViewModel';

interface HotelPageHeaderProps {
  selectedPOS: string;
  onSelectPOS: (pos: string) => void;
  onAddHotel: () => void;
}

const HotelPageHeader: React.FC<HotelPageHeaderProps> = ({
  selectedPOS,
  onSelectPOS,
  onAddHotel
}) => {
  const { posOptions } = usePageSelectionViewModel();

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 p-6 rounded-xl shadow-sm mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <HotelIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Hotel Network
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-full sm:w-auto">
            <Select
              value={selectedPOS}
              onValueChange={onSelectPOS}
            >
              <SelectTrigger className="w-[200px] gap-2 border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-800">
                <Flag className="h-4 w-4 text-blue-500" />
                <SelectValue placeholder="Select Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {posOptions.map(pos => (
                  <SelectItem key={pos.id} value={pos.key.toLowerCase()}>
                    {pos.englishName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={onAddHotel} className="gap-2 w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            <PlusCircle className="h-4 w-4" />
            Add Hotel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HotelPageHeader;
