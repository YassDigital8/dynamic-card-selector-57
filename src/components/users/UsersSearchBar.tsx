
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, X } from 'lucide-react';

interface UsersSearchBarProps {
  nameFilter: string;
  emailFilter: string;
  departmentFilter: string;
  statusFilter: string;
  departments: string[];
  onUpdateFilter: (key: string, value: string) => void;
  onResetFilters: () => void;
}

const UsersSearchBar: React.FC<UsersSearchBarProps> = ({
  nameFilter,
  emailFilter,
  departmentFilter,
  statusFilter,
  departments,
  onUpdateFilter,
  onResetFilters
}) => {
  const hasFilters = nameFilter || emailFilter || departmentFilter || statusFilter;

  return (
    <div className="border rounded-md p-4 mb-6 bg-card">
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <div className="flex-1">
          <div className="text-sm font-medium mb-1">Name</div>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name"
              value={nameFilter}
              onChange={(e) => onUpdateFilter('name', e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="text-sm font-medium mb-1">Email</div>
          <Input
            placeholder="Search by email"
            value={emailFilter}
            onChange={(e) => onUpdateFilter('email', e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-[180px]">
          <div className="text-sm font-medium mb-1">Department</div>
          <Select 
            value={departmentFilter}
            onValueChange={(value) => onUpdateFilter('department', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-[180px]">
          <div className="text-sm font-medium mb-1">Status</div>
          <Select
            value={statusFilter}
            onValueChange={(value) => onUpdateFilter('status', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {hasFilters && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={onResetFilters}
            className="text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default UsersSearchBar;
