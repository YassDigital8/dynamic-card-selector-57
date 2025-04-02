
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tag } from 'lucide-react';
import { categoryNames } from '@/data/eventCategoriesData';
import { categoryDescriptions } from '@/data/categoryDescriptions';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <div className="w-full max-w-[280px]">
      <Select
        value={selectedCategory}
        onValueChange={onSelectCategory}
      >
        <SelectTrigger className="w-full">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            <SelectValue placeholder="Filter by category" />
          </div>
        </SelectTrigger>
        <SelectContent className="max-h-[400px]">
          <SelectItem value="all" className="py-2">
            <div className="flex flex-col">
              <span>All Categories</span>
              <span className="text-xs text-muted-foreground">View events from all categories</span>
            </div>
          </SelectItem>
          
          {categoryNames.map(category => (
            <SelectItem key={category} value={category} className="py-2">
              <div className="flex flex-col">
                <span>{category}</span>
                {categoryDescriptions[category] && (
                  <span className="text-xs text-muted-foreground">
                    {categoryDescriptions[category]}
                  </span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoryFilter;
