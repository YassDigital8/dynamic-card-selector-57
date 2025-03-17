
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
    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950 p-6 rounded-xl shadow-md border border-indigo-100 dark:border-indigo-900 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white dark:bg-indigo-900 rounded-full shadow-sm">
            <HotelIcon className="h-7 w-7 text-indigo-600 dark:text-indigo-300" />
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-300 dark:to-blue-300">
            Hotel Network
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-full sm:w-auto">
            <Select
              value={selectedPOS}
              onValueChange={onSelectPOS}
            >
              <SelectTrigger className="w-[200px] gap-2 border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-800 shadow-sm">
                <Flag className="h-4 w-4 text-indigo-500" />
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
          <Button onClick={onAddHotel} className="gap-2 w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-sm">
            <PlusCircle className="h-4 w-4" />
            Add Hotel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HotelPageHeader;
